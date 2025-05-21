const pressedKeys = new Set();

function handleKeyDown(event) {
    pressedKeys.add(event.key.toLowerCase());
}

function handleKeyUp(event) {
    pressedKeys.delete(event.key.toLowerCase());
}

export function initializeInput() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    console.log("Input manager initialized.");
}

export function isKeyDown(key) {
    return pressedKeys.has(key.toLowerCase());
}
