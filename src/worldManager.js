export class WorldManager {
    constructor(scene) {
        this.scene = scene;
        console.log("WorldManager initialized");
        this.resources = []; // Will hold world resources that this manager owns/tracks
    }

    initializeWorld(resourceMeshes = []) {
        // This manager now takes ownership of the resource meshes from sceneSetup
        this.resources = resourceMeshes;
        console.log(`WorldManager: World initialized with ${this.resources.length} resources.`);
        // Future: procedural generation logic here, creating resources and adding them to this.resources
    }

    getGatherableResources() {
        // Return only resources that are still active/enabled in the scene
        return this.resources.filter(r => r && r.isEnabled());
    }

    removeResource(resourceMesh) {
        const index = this.resources.indexOf(resourceMesh);
        if (index > -1) {
            this.resources.splice(index, 1);
            // The mesh itself is disposed by the Player, WorldManager just stops tracking it.
            console.log("WorldManager: Resource untracked.");
        }
    }

    addResource(resourceMesh) {
        // For dynamically adding resources later, e.g. procedural generation or respawning
        if (resourceMesh && this.resources.indexOf(resourceMesh) === -1) {
            this.resources.push(resourceMesh);
            console.log("WorldManager: Resource added to tracking.");
        }
    }

    update(deltaTime) {
        // Future: dynamic world events, resource respawning, environmental effects, etc.
    }
}
