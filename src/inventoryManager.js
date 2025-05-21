const inventory = new Map();
// let uiUpdateCallback = (data) => console.log("Inventory updated (default log):", data);
let uiUpdateCallback = null;


export function initializeInventoryManager(uiCallback) {
    if (uiCallback) {
        uiUpdateCallback = uiCallback;
    }
    // displayInventory(); // Initial display called by main now if needed
}

export function addResource(resourceType, amount) {
    if (!resourceType || amount <= 0) return;
    inventory.set(resourceType, (inventory.get(resourceType) || 0) + amount);
    const currentInventory = getInventory();
    console.log(`InventoryManager: Added ${amount} ${resourceType}.`); // Keep this log for dev clarity
    if (uiUpdateCallback) {
        uiUpdateCallback(currentInventory);
    } else {
        displayInventory(); // Fallback to console if no callback
    }
}

export function getInventory() {
    return Object.fromEntries(inventory);
}

export function displayInventory() {
    console.log("--- Inventory (Console Fallback) ---");
    if (inventory.size === 0) {
        console.log("Empty");
    } else {
        for (const [resource, count] of inventory) {
            console.log(`${resource}: ${count}`);
        }
    }
    console.log("------------------------------------");
}
