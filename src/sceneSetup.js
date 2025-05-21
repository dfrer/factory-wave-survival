import { Scene, ArcRotateCamera, Vector3, MeshBuilder, HemisphericLight, StandardMaterial, Color3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials/grid';
// Player is no longer imported or created here

export function initializeSceneGraphics(engine) { // Renamed function
    const scene = new Scene(engine);
    const canvas = engine.getRenderingCanvas();

    const camera = new ArcRotateCamera("isoCamera", 0, 0, 0, Vector3.Zero(), scene);
    camera.alpha = -Math.PI / 2 + Math.PI / 6; 
    camera.beta = Math.PI / 4; 
    camera.radius = 30;

    camera.lowerBetaLimit = camera.beta;
    camera.upperBetaLimit = camera.beta;
    camera.lowerAlphaLimit = camera.alpha;
    camera.upperAlphaLimit = camera.alpha;

    camera.attachControl(canvas, true);
    camera.wheelPrecision = 10;

    new HemisphericLight("light1", new Vector3(0.5, 1, 0.5), scene);

    const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    const groundMaterial = new GridMaterial("groundMat", scene);
    groundMaterial.mainColor = new Color3(0.2, 0.2, 0.2);
    groundMaterial.lineColor = new Color3(0.5, 0.5, 0.5);
    ground.material = groundMaterial;

    const resourceMeshes = [];

    const treeMaterial = new StandardMaterial("treeMat", scene);
    treeMaterial.diffuseColor = new Color3(0.2, 0.8, 0.2);
    const tree = MeshBuilder.CreateCylinder("tree", { height: 5, diameter: 1.5, tessellation: 8 }, scene);
    tree.material = treeMaterial;
    tree.position = new Vector3(10, 2.5, 5);
    tree.metadata = { resourceType: "wood", amount: 1, health: 3 };
    tree.checkCollisions = true;
    resourceMeshes.push(tree);

    const rockMaterial = new StandardMaterial("rockMat", scene);
    rockMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
    const rock = MeshBuilder.CreateBox("rock", { width: 2, height: 1.5, depth: 2.5 }, scene);
    rock.material = rockMaterial;
    rock.position = new Vector3(-8, 0.75, -10);
    rock.metadata = { resourceType: "stone", amount: 1, health: 5 };
    rock.checkCollisions = true;
    resourceMeshes.push(rock);

    const oreMaterial = new StandardMaterial("oreMat", scene);
    oreMaterial.diffuseColor = new Color3(0.8, 0.4, 0.1);
    const ore = MeshBuilder.CreateBox("ore", {size: 2}, scene);
    ore.material = oreMaterial;
    ore.position = new Vector3(5, 1, 10);
    ore.metadata = { resourceType: "copper", amount: 1, health: 4 };
    ore.checkCollisions = true;
    resourceMeshes.push(ore);

    const defaultSphere = scene.getMeshByName("sphere");
    if (defaultSphere) {
        defaultSphere.dispose();
    }

    // Player is no longer created here
    // Scene, camera and the created resource meshes are returned
    return { scene, camera, resourceMeshes }; 
}
