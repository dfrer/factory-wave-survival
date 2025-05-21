import { Engine } from '@babylonjs/core';
import { initializeSceneGraphics } from './sceneSetup.js';
import { initializeInput } from './inputManager.js';
import * as inventoryManager from './inventoryManager.js'; // Import the module
import { UIManager } from './uiManager.js';
import { WorldManager } from './worldManager.js';
import { Player } from './player.js';
import { FactoryManager } from './factoryManager.js';

const canvas = document.getElementById('renderCanvas');
if (!canvas) {
    throw new Error("Render canvas not found!");
}

const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

// 1. Initialize Graphics (Scene, Camera, Lights, Ground, Resource Meshes)
const { scene, camera, resourceMeshes } = initializeSceneGraphics(engine);

// 2. Initialize Input
initializeInput();

// 3. Initialize UI Manager
const uiManager = new UIManager();
// uiManager.initializeSimpleOverlay(); // Uncomment if you want the basic HTML overlay

// 4. Initialize Inventory Manager (passing the UI update callback)
inventoryManager.initializeInventoryManager(uiManager.updateInventoryDisplay.bind(uiManager));

// 5. Initialize World Manager
const worldManager = new WorldManager(scene);

// 6. Populate World Manager with initial resources from sceneSetup
worldManager.initializeWorld(resourceMeshes);

// 7. Initialize Player (passing scene and worldManager)
const player = new Player(scene, worldManager); // Player's default initial position is used

// 8. Initialize Factory Manager (passing scene and the inventoryManager module)
const factoryManager = new FactoryManager(scene, inventoryManager);

// 9. Initialize the Factory
factoryManager.initializeFactory();

// Display initial inventory (will be empty, but confirms UI connection)
console.log("Main: Game setup complete. Initializing inventory display via UIManager callback:");
inventoryManager.displayInventory(); // Can be called to force a console log if needed, or rely on UI

engine.runRenderLoop(() => {
    const deltaTime = engine.getDeltaTime() / 1000.0; // Time in seconds

    player.update(deltaTime, camera);
    worldManager.update(deltaTime);
    factoryManager.update(deltaTime);
    
    if (camera && player.mesh) {
        camera.target = player.mesh.position; 
    }

    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});
