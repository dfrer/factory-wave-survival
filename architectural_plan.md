# High-Level Architectural Plan

## 1. Introduction
This document outlines the high-level software architecture for the Factorio-inspired zombie survival game. It details the major components, their responsibilities, and their interactions. This plan is derived from the technical design concepts presented in the project whitepaper.

## 2. Core Philosophy
The architecture will prioritize modularity and clear separation of concerns to facilitate parallel development (if applicable), testing, debugging, and future expansions, including potential modding support. An event-driven approach will be utilized where appropriate to decouple systems.

## 3. Proposed Game Engine
*   *(To be finalized, but initial leaning is towards Unity, as noted in the whitepaper). The choice of engine will dictate the specifics of some core functionalities (rendering, physics, input handling).*

## 4. Major System Components

    *   **A. Game Engine Core Services (Provided by chosen engine like Unity/Unreal)**
        *   **Responsibilities:** Low-level rendering, physics simulation, audio processing, input handling, scene management.
        *   **Interactions:** Provides foundational services to all other game systems.

    *   **B. Game Orchestration Layer**
        *   **B1. Game Manager / Main Loop**
            *   **Responsibilities:** Manages the overall game state (e.g., main menu, loading, playing, paused, game over). Controls transitions between states. Initializes and coordinates other managers.
            *   **Interactions:** Interfaces with UI System, Save/Load Manager, and initializes other core gameplay managers.
        *   **B2. Save/Load Manager**
            *   **Responsibilities:** Handles serialization and deserialization of game state (world, player, factory). Manages save files and versions.
            *   **Interactions:** Interacts with World Manager, Player Manager, Factory Manager to gather/distribute data.

    *   **C. World & Environment Systems**
        *   **C1. World Manager**
            *   **Responsibilities:** Manages procedural world generation, chunk loading/unloading (if applicable), biome data, time of day, weather systems (if implemented). Stores the state of persistent world objects.
            *   **Interactions:** Provides world data to Player Manager, AI Manager, Factory Manager. Interfaces with Game Engine for rendering terrain/objects.
        *   **C2. Points of Interest (POI) & Dungeon Manager**
            *   **Responsibilities:** Manages the spawning, state, and logic for specific POIs and Dungeons, including unique enemies, loot, and event triggers within them.
            *   **Interactions:** Works with World Manager for placement, AI Manager for populating with entities, and Loot Generation System.

    *   **D. Player & Survival Systems**
        *   **D1. Player Manager & Controller**
            *   **Responsibilities:** Handles player input, character movement, combat actions, interactions with objects. Manages player inventory, equipment, and stats (health, hunger, thirst, energy).
            *   **Interactions:** Receives input from Engine Core. Interacts with Inventory System, Survival Needs Manager, UI System.
        *   **D2. Survival Needs Manager**
            *   **Responsibilities:** Tracks and updates player's vital statistics (hunger, thirst, sleep, shelter status). Applies buffs/debuffs based on these needs.
            *   **Interactions:** Reads player stats from Player Manager, triggers events for UI updates or critical state changes (e.g., starvation).
        *   **D3. Skills & Progression Manager (Optional/Future)**
            *   **Responsibilities:** Manages player skills, experience points, ability unlocks, and artifact effects.
            *   **Interactions:** Interfaces with Player Manager, UI System, and potentially triggered by events from Combat or Crafting systems.

    *   **E. Automation & Factory Systems**
        *   **E1. Factory Manager**
            *   **Responsibilities:** Oversees all factory entities (machines, belts, inserters, pipes, power generators/network). Manages crafting recipes, production chains, resource flow, and power grid logic.
            *   **Interactions:** Interacts with World Manager (for resource nodes), Inventory System (for machine I/O), Player Manager (for player-initiated crafting/building).
        *   **E2. Crafting & Recipe System**
            *   **Responsibilities:** Defines all craftable items, their recipes, crafting times, and requirements. Handles execution of crafting tasks (both player and machine).
            *   **Interactions:** Used by Player Manager (manual crafting) and Factory Manager (automated crafting).
        *   **E3. Inventory System**
            *   **Responsibilities:** Provides a generic inventory component for players, machines, and storage containers. Manages item stacks, transfers, and capacity.
            *   **Interactions:** Used by Player Manager, Factory Manager, Loot Generation.

    *   **F. AI & Combat Systems**
        *   **F1. AI Director / Wave Manager**
            *   **Responsibilities:** Controls zombie wave spawning (timing, composition, location). Manages overall threat level and difficulty scaling (e.g., based on time, "pollution", player progression). Triggers special events (e.g., boss spawns).
            *   **Interactions:** Spawns AI Entities via the AI Entity Manager. Receives data from Factory Manager (pollution), Game Manager (time, progression).
        *   **F2. AI Entity Manager & Pathfinding**
            *   **Responsibilities:** Manages individual AI agents (zombies, wildlife). Implements behavior trees or state machines for different AI types. Handles pathfinding requests and execution using engine navigation capabilities or custom solutions.
            *   **Interactions:** Receives commands from AI Director. Interacts with World Manager for navigation data. Engages with Player Manager or factory structures during combat.
        *   **F3. Combat Manager**
            *   **Responsibilities:** Resolves combat calculations (damage, resistances, critical hits). Manages weapon effects, projectile logic, and status effects.
            *   **Interactions:** Used by Player Manager (player attacks) and AI Entity Manager (enemy attacks).

    *   **G. UI/UX System**
        *   **G1. UI Manager**
            *   **Responsibilities:** Manages all UI screens (HUD, inventory, crafting, map, menus, build interface). Handles UI input and updates UI elements based on game state changes.
            *   **Interactions:** Interfaces with almost all other systems to display data and receive user input.

    *   **H. Utility Systems**
        *   **H1. Event System**
            *   **Responsibilities:** Facilitates decoupled communication between different game systems using a publish-subscribe model.
            *   **Interactions:** Used by many systems to announce changes or trigger actions in other systems without direct dependencies.
        *   **H2. Data & Configuration Loader**
            *   **Responsibilities:** Loads game data (item stats, recipes, entity definitions, etc.) from configuration files (e.g., JSON, XML, ScriptableObjects).
            *   **Interactions:** Provides data to all relevant systems upon initialization.
        *   **H3. Loot Generation System**
            *   **Responsibilities:** Manages loot tables and generates loot for containers, defeated enemies, and quest rewards.
            *   **Interactions:** Used by POI/Dungeon Manager, AI Entity Manager (on enemy death), Quest Manager (if implemented).

## 5. Component Interaction Diagram (Descriptive)

*Imagine a diagram where the Game Engine Core is at the base, providing services to all.*
*   The **Game Manager** sits above it, orchestrating the main game flow.*
*   **World Manager, Player Manager, Factory Manager, and AI Director** are major pillars, each managing their core domain.*
    *   **Player Manager** communicates with **Inventory, Survival Needs, UI.**
    *   **Factory Manager** uses **Crafting System, Inventory System.**
    *   **AI Director** commands **AI Entity Manager**, which interacts with the **World** for pathfinding and **Player/Factory** for targeting.
    *   **World Manager** provides data to all these pillars.
*   **UI System** interfaces broadly to display information from and send input to many managers.*
*   **Save/Load Manager** interacts with the primary state-holding managers (World, Player, Factory).*
*   **Event System** acts as a central bus allowing many systems to communicate indirectly.*

## 6. Technology Stack (Preliminary)
*   **Game Engine:** Unity (preferred), Unreal Engine, or Godot.
*   **Programming Language:** C# (if Unity/Godot), C++ (if Unreal/Godot), GDScript (if Godot).
*   **Data Formats:** JSON or XML for configuration files. Binary or compressed JSON for save games.
*   **Version Control:** Git.
*   **(Future - Server-Side, if multiplayer):** Node.js, Python, or C# with a relevant networking framework. Database like PostgreSQL or MongoDB.

## 7. Modularity and Extensibility
*   Emphasis on coding to interfaces where appropriate.
*   Event-driven architecture to reduce tight coupling.
*   Clear separation of data (using config files) from logic.
*   Consideration for future modding support by exposing certain APIs or data structures if feasible.

This document will serve as a living blueprint and will be updated as development progresses and more detailed design decisions are made.
