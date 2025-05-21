import { MeshBuilder, StandardMaterial, Color3, Vector3 } from '@babylonjs/core';
import * as inputManager from './inputManager.js';
import * as inventoryManager from './inventoryManager.js';

const PLAYER_SPEED = 5; // Units per second
const PLAYER_HEIGHT = 1.0;
const PLAYER_RADIUS = 0.25;

export class Player {
    constructor(scene, worldManager, initialPosition = new Vector3(0, PLAYER_HEIGHT / 2, 0)) {
        this.scene = scene;
        this.worldManager = worldManager; // Store WorldManager instance
        this.mesh = MeshBuilder.CreateCapsule("player", { height: PLAYER_HEIGHT, radius: PLAYER_RADIUS }, scene);
        this.mesh.position = initialPosition;
        const playerMaterial = new StandardMaterial("playerMat", scene);
        playerMaterial.diffuseColor = new Color3(0.8, 0.2, 0.2);
        this.mesh.material = playerMaterial;

        this.mesh.ellipsoid = new Vector3(PLAYER_RADIUS, PLAYER_HEIGHT / 2, PLAYER_RADIUS);
        this.mesh.checkCollisions = true;

        this.gatherCooldown = 0;
        this.lastGatherTime = 0;
        this.GATHER_COOLDOWN_MS = 500;
    }

    update(deltaTime, camera) {
        if (!camera) {
            console.warn("Player update called without a camera.");
            return;
        }
        const currentTime = performance.now();

        // --- Movement Logic (existing) ---
        const moveDirection = Vector3.Zero();
        const cameraForward = camera.getForwardRay().direction.clone();
        cameraForward.y = 0;
        cameraForward.normalize();
        const cameraRight = camera.getRightVector().clone();
        cameraRight.normalize();

        if (inputManager.isKeyDown('w') || inputManager.isKeyDown('arrowup')) {
            moveDirection.addInPlace(cameraForward);
        }
        if (inputManager.isKeyDown('s') || inputManager.isKeyDown('arrowdown')) {
            moveDirection.subtractInPlace(cameraForward);
        }
        if (inputManager.isKeyDown('a') || inputManager.isKeyDown('arrowleft')) {
            moveDirection.addInPlace(cameraRight.scale(-1));
        }
        if (inputManager.isKeyDown('d') || inputManager.isKeyDown('arrowright')) {
            moveDirection.addInPlace(cameraRight);
        }

        if (moveDirection.lengthSquared() > 0) {
            moveDirection.normalize();
            const scaledMove = moveDirection.scale(PLAYER_SPEED * deltaTime);
            this.mesh.position.addInPlace(scaledMove);
        }
        // --- End Movement Logic ---

        // --- Resource Gathering Logic ---
        if (currentTime - this.lastGatherTime > this.GATHER_COOLDOWN_MS) {
            const gatherableResources = this.worldManager.getGatherableResources(); // Get resources from WorldManager

            for (let i = gatherableResources.length - 1; i >= 0; i--) {
                const resourceMesh = gatherableResources[i];

                if (resourceMesh && resourceMesh.isEnabled() && this.mesh.intersectsMesh(resourceMesh, false)) {
                    if (resourceMesh.metadata && resourceMesh.metadata.resourceType) {
                        resourceMesh.metadata.health -= 1;
                        console.log(`Player: Hit ${resourceMesh.metadata.resourceType}, health: ${resourceMesh.metadata.health}`);
                        
                        if (resourceMesh.metadata.health <= 0) {
                            inventoryManager.addResource(resourceMesh.metadata.resourceType, resourceMesh.metadata.amount || 1);
                            console.log(`Player: Gathered ${resourceMesh.metadata.resourceType}`);
                            this.worldManager.removeResource(resourceMesh); // Notify WorldManager
                            resourceMesh.dispose(); // Remove the mesh from scene
                        }
                        
                        this.lastGatherTime = currentTime;
                        break; 
                    }
                }
            }
        }
    }
}
