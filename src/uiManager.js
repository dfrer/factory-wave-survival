export class UIManager {
    constructor() {
        console.log("UIManager initialized");
        this.inventoryDisplayElement = null; // Placeholder for actual HTML element
        // this.initializeSimpleOverlay(); // Optional: for very basic HTML display
    }

    // Optional: Basic HTML overlay for inventory
    // initializeSimpleOverlay() {
    //     const overlay = document.createElement('div');
    //     overlay.id = 'gameOverlay';
    //     overlay.style.position = 'absolute';
    //     overlay.style.top = '10px';
    //     overlay.style.left = '10px';
    //     overlay.style.padding = '10px';
    //     overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    //     overlay.style.color = 'white';
    //     overlay.style.fontFamily = 'Arial, sans-serif';
    //     document.body.appendChild(overlay);
    //     this.inventoryDisplayElement = document.createElement('div');
    //     this.inventoryDisplayElement.id = 'inventoryDisplay';
    //     overlay.appendChild(this.inventoryDisplayElement);
    //     this.updateInventoryDisplay({}); // Initial empty display
    // }

    updateInventoryDisplay(inventoryData) {
        console.log("UIManager: Updating inventory display (stub)", inventoryData);
        // if (this.inventoryDisplayElement) {
        //     let text = "Inventory:<br>";
        //     for (const [item, count] of Object.entries(inventoryData)) {
        //         text += `${item}: ${count}<br>`;
        //     }
        //     if (Object.keys(inventoryData).length === 0) text += "Empty";
        //     this.inventoryDisplayElement.innerHTML = text;
        // }
    }

    showGameMessage(message) {
        console.log(`UIManager: Message - ${message}`);
        // Later, this could update a message area in the HTML UI
    }
}
