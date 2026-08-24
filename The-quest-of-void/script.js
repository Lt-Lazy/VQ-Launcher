"use strict";


/* =========================================================
   THE QUEST OF VOID
   Main game script
   ========================================================= */


/* =========================================================
   CANVAS
   ========================================================= */

const canvas =
    document.getElementById("game-canvas");

const ctx =
    canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

const categoryBuildButton =
    document.getElementById("category-build");

const settlementCenterButton =
    document.getElementById("tool-settlement-center");

const houseButton =
    document.getElementById("tool-house");

const chopTreeButton =
    document.getElementById("tool-chop-tree");

const buildCategoryHousingButton =
    document.getElementById(
        "build-category-housing"
    );

const roadButton =
    document.getElementById("tool-road");

const buildCategoryFoodButton =
    document.getElementById(
        "build-category-food"
    );

const buildCategoryInfrastructureButton =
    document.getElementById(
        "build-category-infrastructure"
    );

const buildToolbarBackButton =
    document.getElementById(
        "build-toolbar-back"
    );


const settlementNameText =
    document.getElementById("settlement-name");

const settlementPopulationText =
    document.getElementById("settlement-population");


const resourceFoodText =
    document.getElementById("resource-food");

const resourceWoodText =
    document.getElementById("resource-wood");

const resourceStoneText =
    document.getElementById("resource-stone");



const settingsButton =
    document.getElementById("settings-button");

const settingsOverlay =
    document.getElementById("settings-overlay");

const saveGameButton =
    document.getElementById("save-game-button");

const loadGameButton =
    document.getElementById("load-game-button");

const closeSettingsButton =
    document.getElementById("close-settings-button");

const saveStatusText =
    document.getElementById("save-status");

const newGameButton =
    document.getElementById("new-game-button");


const settlementNameOverlay =
    document.getElementById("settlement-name-overlay");

const settlementNameInput =
    document.getElementById("settlement-name-input");

const confirmSettlementNameButton =
    document.getElementById("confirm-settlement-name");

const farmButton =
    document.getElementById("tool-farm");

const marketHallButton =
    document.getElementById(
        "tool-market-hall"
    );

const gameDayText =
    document.getElementById("game-day");

const gameTimeText =
    document.getElementById("game-time");

const timePauseButton =
    document.getElementById(
        "time-pause-button"
    );

const timeSpeedRealButton =
    document.getElementById(
        "time-speed-real"
    );

const timeSpeed1Button =
    document.getElementById(
        "time-speed-1"
    );

const timeSpeed2Button =
    document.getElementById(
        "time-speed-2"
    );

const timeSpeed5Button =
    document.getElementById(
        "time-speed-5"
    );

const timeSpeed10Button =
    document.getElementById(
        "time-speed-10"
    );

const buildingInfoPopup =
    document.getElementById(
        "building-info-popup"
    );

const buildingInfoTitle =
    document.getElementById(
        "building-info-title"
    );

const buildingInfoContent =
    document.getElementById(
        "building-info-content"
    );

const buildCategoryResourcesButton =
    document.getElementById(
        "build-category-resources"
    );

const lumberMillButton =
    document.getElementById(
        "tool-lumber-mill"
    );

const stoneQuarryButton =
    document.getElementById(
        "tool-stone-quarry"
    );

const peopleToolbarButton =
    document.getElementById(
        "toolbar-people"
    );

const peopleMenuLayer =
    document.getElementById(
        "people-menu-layer"
    );

const peopleMenuTitle =
    document.getElementById(
        "people-menu-title"
    );

const peopleMenuBackButton =
    document.getElementById(
        "people-menu-back"
    );

const peopleMenuCloseButton =
    document.getElementById(
        "people-menu-close"
    );

const peopleMenuSearchWrap =
    document.getElementById(
        "people-menu-search-wrap"
    );

const peopleMenuSearchInput =
    document.getElementById(
        "people-menu-search"
    );

const peopleMenuContent =
    document.getElementById(
        "people-menu-content"
    );

const economyToolbarButton =
    document.getElementById(
        "toolbar-economy"
    );

const economyMenuLayer =
    document.getElementById(
        "economy-menu-layer"
    );

const economyMenuCloseButton =
    document.getElementById(
        "economy-menu-close"
    );

const economyMenuContent =
    document.getElementById(
        "economy-menu-content"
    );

/* =========================================================
   INVENTORY MENU
   ========================================================= */

const inventoryToolbarButton =
    document.getElementById(
        "toolbar-inventory"
    );

const inventoryMenuLayer =
    document.getElementById(
        "inventory-menu-layer"
    );

const inventoryMenuTitle =
    document.getElementById(
        "inventory-menu-title"
    );

const inventoryMenuBackButton =
    document.getElementById(
        "inventory-menu-back"
    );

const inventoryMenuCloseButton =
    document.getElementById(
        "inventory-menu-close"
    );

const inventoryMenuContent =
    document.getElementById(
        "inventory-menu-content"
    );


/* =========================================================
   CHARACTER MENU
   ========================================================= */

const characterToolbarButton =
    document.getElementById(
        "toolbar-character"
    );

const characterMenuLayer =
    document.getElementById(
        "character-menu-layer"
    );

const characterMenuCloseButton =
    document.getElementById(
        "character-menu-close"
    );

const characterMenuContent =
    document.getElementById(
        "character-menu-content"
    );

let activeInfoBuildingId =
    null;

let buildingInfoSignature =
    null;

let peopleMenuOpen =
    false;

let peopleMenuView =
    "families";

let selectedPeopleFamilyId =
    null;

let selectedPeopleSettlerId =
    null;

let peopleMenuSignature =
    null;

let peopleMenuRefreshAccumulator =
    0;

/* =========================================================
   WORLD INTERACTION MENU
   ========================================================= */

const worldInteractionMenu =
    document.getElementById(
        "interaction-menu"
    );


const worldInteractionContent =
    document.getElementById(
        "interaction-menu-actions"
    );


const worldInteractionTitle =
    document.getElementById(
        "interaction-menu-title"
    );


let interactionTarget =
    null;

/* =========================================================
   DEBUG UI
   ========================================================= */

const debugTile =
    document.getElementById("debug-tile");

const debugZoom =
    document.getElementById("debug-zoom");

const debugGround =
    document.getElementById("debug-ground");

const debugWater =
    document.getElementById("debug-water");

const debugNature =
    document.getElementById("debug-nature");


const debugPlayer =
    document.getElementById("debug-player");


/* =========================================================
   MAP
   ========================================================= */

const MAP_URL =
    "assets/maps/settlement-map.tmj";

const NAMES_URL =
    "assets/data/names.json";


let nameData = {

    male: [],

    female: [],

    surnames: []

};


let tiledMap = null;

let mapWidth = 0;
let mapHeight = 0;

let tileWidth = 32;
let tileHeight = 32;

let mapLoaded = false;


/* =========================================================
   RPG PLAYER
   ========================================================= */

const RPG_MODE =
    true;

const PLAYER_MOVE_SPEED =
    5;

const player = {

    initialized:
        false,

    tileX:
        0,

    tileY:
        0,

    x:
        0.5,

    y:
        0.5,

    moving:
        false,

    fromX:
        0.5,

    fromY:
        0.5,

    toX:
        0.5,

    toY:
        0.5,

    moveProgress:
        0,

    facing:
        "south"

};

/* =========================================================
   RPG CHARACTER DATA
   ========================================================= */

function createDefaultPlayerCharacter() {

    return {

        name:
            "Player",

        race:
            "Human",

        background:
            "Wanderer",

        level:
            1,

        experience:
            0,

        experienceToNextLevel:
            100,

        coins:
            20,

        health: {

            current:
                100,

            max:
                100

        },

        attributes: {

            strength:
                10,

            agility:
                10,

            endurance:
                10,

            intelligence:
                10,

            willpower:
                10

        },

        inventory: {

            wood:
                0,

            crude_axe:
                1

        },

        equipment: {

            head:
                null,

            body:
                null,

            mainHand:
                null,

            offHand:
                null,

            legs:
                null,

            feet:
                null

        },

        skills: {}

    };

}


function normalizePlayerCharacter(
    savedCharacter
) {

    const defaults =
        createDefaultPlayerCharacter();


    /*
        Gamle saves har ikke
        playerCharacter.

        Da får spilleren bare
        standardverdiene.
    */

    if (
        !savedCharacter ||
        typeof savedCharacter !==
            "object"
    ) {

        return defaults;

    }


    /*
        Vi merger hver underkategori
        separat.

        Dermed kan nye stats/items
        legges til senere uten at gamle
        save-filer går i stykker.
    */

    const character = {

        ...defaults,
        ...savedCharacter,

        health: {

            ...defaults.health,

            ...(
                savedCharacter.health ||
                {}
            )

        },

        attributes: {

            ...defaults.attributes,

            ...(
                savedCharacter.attributes ||
                {}
            )

        },

        inventory:
            (
                savedCharacter.inventory &&
                typeof savedCharacter.inventory ===
                    "object" &&
                !Array.isArray(
                    savedCharacter.inventory
                )
            )
                ? {
                    ...savedCharacter.inventory
                }
                : {
                    ...defaults.inventory
                },

        equipment: {

            ...defaults.equipment,

            ...(
                savedCharacter.equipment ||
                {}
            )

        },

        skills: {

            ...defaults.skills,

            ...(
                savedCharacter.skills ||
                {}
            )

        }

    };


    /*
        Level / XP
    */

    character.level =
        Math.max(
            1,
            Math.floor(
                Number(
                    character.level
                ) ||
                1
            )
        );


    character.experience =
        Math.max(
            0,
            Number(
                character.experience
            ) ||
            0
        );


    character.experienceToNextLevel =
        Math.max(
            1,
            Number(
                character.experienceToNextLevel
            ) ||
            100
        );

    /*
        Currency
    */

    character.coins =
        Math.max(
            0,
            Math.floor(
                Number(
                    character.coins
                ) ||
                0
            )
        );

    /*
        Health
    */

    character.health.max =
        Math.max(
            1,
            Number(
                character.health.max
            ) ||
            100
        );


    character.health.current =
        Math.max(
            0,
            Math.min(
                character.health.max,

                Number(
                    character.health.current
                ) ||
                0
            )
        );


    /*
        Attributes
    */

    for (
        const attributeName
        of Object.keys(
            defaults.attributes
        )
    ) {

        character.attributes[
            attributeName
        ] =
            Math.max(
                1,
                Math.floor(
                    Number(
                        character.attributes[
                            attributeName
                        ]
                    ) ||
                    defaults.attributes[
                        attributeName
                    ]
                )
            );

    }


    /*
        Inventory amounts skal alltid
        være hele positive tall.
    */

    for (
        const itemId
        of Object.keys(
            character.inventory
        )
    ) {

        character.inventory[
            itemId
        ] =
            Math.max(
                0,
                Math.floor(
                    Number(
                        character.inventory[
                            itemId
                        ]
                    ) ||
                    0
                )
            );

    }


    return character;

}


let playerCharacter =
    createDefaultPlayerCharacter();

/* =========================================================
   RPG ITEM DEFINITIONS
   ========================================================= */

const ITEM_DEFS = {

    wood: {

        name:
            "Wood",

        category:
            "Material",

        description:
            "A piece of workable timber.",

        stackable:
            true,

        maxStack:
            99,

        weight:
            1,

        value:
            1,

        tags: [
            "material",
            "wood"
        ]

    },


    crude_axe: {

        name:
            "Crude Axe",

        category:
            "Tool",

        description:
            "A rough axe. Good enough for chopping trees.",

        stackable:
            false,

        maxStack:
            1,

        weight:
            3,

        value:
            8,

        equipSlot:
            "mainHand",

        toolPower:
            1,

        tags: [
            "tool",
            "axe",
            "weapon"
        ]

    },


    stone: {

        name:
            "Stone",

        category:
            "Material",

        description:
            "A chunk of ordinary stone.",

        stackable:
            true,

        maxStack:
            99,

        weight:
            2,

        value:
            1,

        tags: [
            "material",
            "stone"
        ]

    },


    bread: {

        name:
            "Bread",

        category:
            "Food",

        description:
            "A simple loaf of bread.",

        stackable:
            true,

        maxStack:
            20,

        weight:
            0.5,

        value:
            2,

        tags: [
            "food"
        ]

    }

};


function getItemDef(
    itemId
) {

    return (
        ITEM_DEFS[itemId] ||
        null
    );

}


function getItemDisplayName(
    itemId
) {

    const def =
        getItemDef(
            itemId
        );


    return (
        def?.name ||
        itemId ||
        "Unknown Item"
    );

}


function itemHasTag(
    itemId,
    tag
) {

    const def =
        getItemDef(
            itemId
        );


    return (
        Array.isArray(
            def?.tags
        ) &&
        def.tags.includes(
            tag
        )
    );

}


function getEquipmentDisplayName(
    slotName
) {

    const itemId =
        playerCharacter.equipment[
            slotName
        ];


    if (!itemId) {

        return "Empty";

    }


    return getItemDisplayName(
        itemId
    );

}


function canPlayerUseToolTag(
    tag
) {

    const mainHandItemId =
        playerCharacter.equipment
            .mainHand;


    if (!mainHandItemId) {

        return false;

    }


    return itemHasTag(
        mainHandItemId,
        tag
    );

}

const playerInput = {

    pressed:
        new Set(),

    lastDirection:
        null

};


const loadedTilesets = [];

const LUMBER_TREE_GROW_MIN_HOURS =
    72;

const LUMBER_TREE_GROW_MAX_HOURS =
    168;

const LUMBER_WOOD_PER_TREE =
    5;

const QUARRY_HARVEST_INTERVAL_HOURS =
    2;

const QUARRY_STONE_PER_HARVEST =
    3;

const WORK_START_HOUR =
    8;

const WORK_END_HOUR =
    16;

const LUMBER_HARVEST_INTERVAL_HOURS =
    2;

const FARM_HARVEST_INTERVAL_HOURS =
    2;

const FARM_FOOD_PER_HARVEST =
    2;

const MARKET_HALL_FOOD_CAPACITY =
    100;

const HOUSEHOLD_FOOD_DAYS =
    3;

const SETTLEMENT_CENTER_FOOD_CAPACITY =
    30;

const HOUSEHOLD_REFILL_THRESHOLD_DAYS =
    2;

const NPC_GRASS_MOVE_SPEED =
    3;

const NPC_ROAD_MOVE_SPEED =
    4.5

const NPC_COMMUTE_BUFFER_MINUTES =
    5;

const GAME_MINUTES_PER_DAY =
    1440;

const WORK_SHIFT_DURATION_MINUTES =
    (
        WORK_END_HOUR -
        WORK_START_HOUR
    ) * 60;


const NPC_STATE_HOME =
    "HOME";

const NPC_STATE_COMMUTING_TO_WORK =
    "COMMUTING_TO_WORK";

const NPC_STATE_WORKING =
    "WORKING";

const NPC_STATE_COMMUTING_HOME =
    "COMMUTING_HOME";

const NPC_STATE_BLOCKED =
    "BLOCKED";

const NPC_ROUTE_RETRY_MINUTES =
    15;

const NPC_STATE_WANDERING =
    "WANDERING";

const NPC_STATE_COMMUTING_TO_FOOD =
    "COMMUTING_TO_FOOD";

const NPC_STATE_RETURNING_WITH_FOOD =
    "RETURNING_WITH_FOOD";


/*
    Mathenting skal ikke skje på
    nøyaktig samme tidspunkt for alle.
*/

const FOOD_RUN_HOME_DELAY_MIN_MINUTES =
    30;

const FOOD_RUN_HOME_DELAY_MAX_MINUTES =
    300;

const FOOD_RUN_AFTER_WORK_DELAY_MIN_MINUTES =
    10;

const FOOD_RUN_AFTER_WORK_DELAY_MAX_MINUTES =
    60;

const FOOD_RUN_RETRY_MIN_MINUTES =
    20;

const FOOD_RUN_RETRY_MAX_MINUTES =
    45;


const NPC_VISUAL_OFFSET_MAX =
    0.10;


/*
    Barn kan være ute mellom
    09:00 og 19:00.

    En simulation-day begynner
    08:00, derfor er disse offsets.
*/

const CHILD_WANDER_START_OFFSET_MINUTES =
    60;

const CHILD_WANDER_END_OFFSET_MINUTES =
    660;


const CHILD_WANDER_RADIUS_MIN =
    4;

const CHILD_WANDER_RADIUS_MAX =
    7;


const CHILD_WANDER_FIRST_DELAY_MAX_MINUTES =
    30;


const CHILD_WANDER_PAUSE_MIN_MINUTES =
    20;

const CHILD_WANDER_PAUSE_MAX_MINUTES =
    60;


const BLOCKED_WANDER_RADIUS =
    3;

const BLOCKED_WANDER_PAUSE_MIN_MINUTES =
    5;

const BLOCKED_WANDER_PAUSE_MAX_MINUTES =
    20;


const WANDER_ROUTE_ATTEMPTS =
    12;

let economyMenuOpen =
    false;

let economyMenuSignature =
    null;

let economyMenuRefreshAccumulator =
    0;

let inventoryMenuOpen =
    false;

let inventoryMenuView =
    "list";

let selectedInventoryItemId =
    null;

let characterMenuOpen =
    false;

/* =========================================================
   CAMERA
   ========================================================= */

const camera = {

    x: 0,
    y: 0,

    zoom: 1,

    minZoom: 0.4,
    maxZoom: 3,

    speed: 500

};


/* =========================================================
   MOUSE
   ========================================================= */

const mouse = {

    screenX: 0,
    screenY: 0,

    worldX: 0,
    worldY: 0,

    tileX: 0,
    tileY: 0,

    insideCanvas: false

};

const cameraDrag = {

    active: false,

    lastX: 0,
    lastY: 0

};


/* =========================================================
   SELECTED TILE
   ========================================================= */

let selectedTile = null;


/* =========================================================
   BUILD SYSTEM
   ========================================================= */

const BUILDING_DEFS = {

    settlementCenter: {

        name: "Settlement Center",

        label: "CENTER",

        width: 3,
        height: 3,

        cost: {},

        housingCapacity: 5,


        foodStorageCapacity:
            SETTLEMENT_CENTER_FOOD_CAPACITY

    },


    house: {

        name: "House",

        label: "HOUSE",

        width: 1,
        height: 1,

        cost: {

            wood: 20

        },

        housingCapacity: 5

    },

    farm: {

        name: "Farm",

        label: "FARM",

        width: 2,
        height: 2,

        cost: {

            wood: 30

        },

        jobType:
            "Farmer",

        workerSlots:
            1

    },

    marketHall: {

        name: "Market Hall",

        label: "MARKET",

        width: 2,
        height: 2,

        cost: {

            wood: 40

        },

        jobType:
            "Market Worker",

        workerSlots:
            3,

        foodStorageCapacity:
            MARKET_HALL_FOOD_CAPACITY

    },

    lumberMill: {

        name: "Lumber Mill",

        label: "LUMBER",

        width: 1,
        height: 1,

        cost: {

            wood: 30

        },

        jobType:
            "Lumberjack",

        workerSlots:
            1,

        forestryRadius:
            2

    },

    stoneQuarry: {

        name: "Stone Quarry",

        label: "QUARRY",

        width: 2,
        height: 2,

        cost: {

            wood: 40

        },

        jobType:
            "Stonecutter",

        workerSlots:
            1

    }

};


const worldState = {

    settlement: {

        founded: false,

        name: "Not founded",

        population: 0

    },


    resources: {

        food: 0,

        wood: 0,

        stone: 0

    },

    production: {

        foodToday: 0,

        foodWastedToday: 0,

        woodToday: 0,

        stoneToday: 0,

        manualWoodToday: 0

    },

    foodStatus: {

        /*
            shortageActive betyr nå:
            folk fikk faktisk ikke nok
            mat til dagens måltid.
        */

        shortageActive: false,

        shortageAmount: 0,

        lastRequired: 0,

        lastConsumed: 0,

        consecutiveShortageDays: 0,

        distributionShortageActive:
            false,

        unfilledHouseholdFood:
            0,

        householdsUnableToRefill:
            0,

        hungryHouseholds:
            0,

        hungryResidents:
            0

    },

    time: {

        day: 1,

        elapsed: 0,

        lastProcessedHourIndex: null

    },


    /*
        Tiled-defined towns/cities.
        These are discovered automatically from
        rectangle objects with Class = settlement.
    */
    settlements: [],

    buildings: [],

    settlers: [],
    nextSettlerId: 1,
    families: [],
    nextFamilyId: 1,

    roads: {},
    grownTrees: {},

    removedNature: {}

};

const npcRuntime =
    new Map();

let navigationRevision =
    0;


function markNavigationChanged() {

    navigationRevision +=
        1;

}

let buildModeActive =
    false;

let activeBuildCategory =
    null;

let buildMode = null;

let harvestMode = null;

/*
    RPG time:
    720 real seconds = 24 in-game hours.
    Det betyr 2 game-minutter per real-sekund på 1x.
*/
const SECONDS_PER_DAY =
    720;

const REAL_TIME_SCALE =
    1 / 1440;

let timeScale =
    1;

let lastRunningTimeScale =
    1;

const MIN_FOOD_FOR_POPULATION_GROWTH =
    10;

const MIN_WORKING_AGE =
    16;

const DEFAULT_SETTLER_HAPPINESS =
    60;

const HAPPINESS_DAILY_CHANGE_MAX =
    5;

const SAVE_KEY =
    "the-quest-of-void-save-v1";


let settingsOpen =
    false;

let namingSettlement =
    false;

function updateTimeControlsUI() {

    timePauseButton.classList.toggle(
        "active",
        timeScale === 0
    );

    timeSpeedRealButton.classList.toggle(
        "active",
        timeScale === REAL_TIME_SCALE
    );


    timeSpeed1Button.classList.toggle(
        "active",
        timeScale === 1
    );

    timeSpeed2Button.classList.toggle(
        "active",
        timeScale === 2
    );

    timeSpeed5Button.classList.toggle(
        "active",
        timeScale === 5
    );


    timeSpeed10Button.classList.toggle(
        "active",
        timeScale === 10
    );


    timePauseButton.textContent =
        timeScale === 0
            ? "Play"
            : "Pause";

}

function setTimeScale(
    newTimeScale
) {

    if (
        newTimeScale !== 0 &&
        newTimeScale !== REAL_TIME_SCALE &&
        newTimeScale !== 1 &&
        newTimeScale !== 2 &&
        newTimeScale !== 5 &&
        newTimeScale !== 10
    ) {

        return;

    }


    if (
        newTimeScale > 0
    ) {

        lastRunningTimeScale =
            newTimeScale;

    }


    timeScale =
        newTimeScale;


    updateTimeControlsUI();

}

timePauseButton.addEventListener(
    "click",
    () => {

        if (
            timeScale === 0
        ) {

            setTimeScale(
                lastRunningTimeScale
            );

        }
        else {

            setTimeScale(
                0
            );

        }

    }
);

timeSpeedRealButton.addEventListener(
    "click",
    () => {

        setTimeScale(
            REAL_TIME_SCALE
        );

    }
);

timeSpeed1Button.addEventListener(
    "click",
    () => {

        setTimeScale(
            1
        );

    }
);

timeSpeed2Button.addEventListener(
    "click",
    () => {

        setTimeScale(
            2
        );

    }
);

timeSpeed5Button.addEventListener(
    "click",
    () => {

        setTimeScale(
            5
        );

    }
);

timeSpeed10Button.addEventListener(
    "click",
    () => {

        setTimeScale(
            10
        );

    }
);

function getEffectiveTimeScale() {

    if (
        settingsOpen ||
        namingSettlement ||
        buildModeActive
    ) {

        return 0;

    }

    return timeScale;

}

/* =========================================================
   HELP FUNCTIONS
   ========================================================= */

function randomInteger(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}

function getStableNpcVisualOffset(
    settlerId
) {

    /*
        Pseudo-random basert på ID.

        Dermed får NPC-en samme offset
        etter reload også.
    */

    const seedX =
        Math.sin(
            settlerId *
            12.9898
        ) *
        43758.5453;


    const seedY =
        Math.sin(
            (
                settlerId +
                37
            ) *
            78.233
        ) *
        43758.5453;


    const randomX =
        seedX -
        Math.floor(
            seedX
        );


    const randomY =
        seedY -
        Math.floor(
            seedY
        );


    return {

        x:
            (
                randomX *
                2 -
                1
            ) *
            NPC_VISUAL_OFFSET_MAX,

        y:
            (
                randomY *
                2 -
                1
            ) *
            NPC_VISUAL_OFFSET_MAX

    };

}

function getLoadedTileByName(
    name
) {

    for (
        const tileset
        of loadedTilesets
    ) {

        for (
            const tile
            of tileset.tiles.values()
        ) {

            if (
                tile.properties.name ===
                name
            ) {

                return tile;

            }

        }

    }


    return null;

}


function drawGrownTrees() {

    const treeTile =
        getLoadedTileByName(
            "tree"
        );


    if (!treeTile) {
        return;
    }


    for (
        const key
        of Object.keys(
            worldState.grownTrees
        )
    ) {

        if (
            worldState.grownTrees[key] !==
            true
        ) {

            continue;

        }


        const [
            x,
            y
        ] =
            key
                .split(",")
                .map(Number);


        ctx.drawImage(
            treeTile.image,

            x * tileWidth,

            y * tileHeight,

            treeTile.width,

            treeTile.height
        );

    }

}

function getAbsoluteGameHourIndex() {

    const hoursIntoDay =
        Math.floor(
            (
                worldState.time.elapsed /
                SECONDS_PER_DAY
            ) *
            24
        );


    return (
        (
            worldState.time.day - 1
        ) *
        24
    ) + hoursIntoDay;

}


function getClockHourFromIndex(
    hourIndex
) {

    return (
        8 +
        (
            hourIndex %
            24
        )
    ) % 24;

}


function isLumberHarvestHour(
    hour
) {

    /*
        Arbeidet starter 08:00.

        Første ferdige tre kommer
        etter to timers arbeid,
        altså 10:00.
    */

    if (
        hour <= WORK_START_HOUR ||
        hour > WORK_END_HOUR
    ) {

        return false;

    }


    return (
        (
            hour -
            WORK_START_HOUR
        ) %
        LUMBER_HARVEST_INTERVAL_HOURS
    ) === 0;

}


function processLumberHarvest(
    hour
) {

    if (
        !isLumberHarvestHour(
            hour
        )
    ) {

        return;

    }


    let woodProduced =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "lumberMill"
        ) {

            continue;

        }


        const workers =
            getActiveBuildingWorkers(
                building.id
            );


        /*
            Ingen Lumberjack =
            ingen hogst.
        */

        if (
            workers.length <= 0
        ) {

            continue;

        }


        if (
            !building.treeGrowth ||
            typeof building.treeGrowth !==
            "object"
        ) {

            building.treeGrowth =
                {};

        }


        const availableTrees =
            getLumberZoneTiles(
                building
            ).filter(
                tile =>
                    hasTreeAt(
                        tile.x,
                        tile.y
                    )
            );


        if (
            availableTrees.length <= 0
        ) {

            continue;

        }


        /*
            Velg ett tilfeldig tre.
        */

        const tree =
            availableTrees[
                Math.floor(
                    Math.random() *
                    availableTrees.length
                )
            ];


        removeTreeAt(
            tree.x,
            tree.y
        );


        const key =
            getTileKey(
                tree.x,
                tree.y
            );


        /*
            Den tomme plassen får
            senere en ny growth timer.
        */

        delete building.treeGrowth[
            key
        ];


        /*
            Wood går direkte til
            settlement storage.
        */

        worldState.resources.wood +=
            LUMBER_WOOD_PER_TREE;


        worldState.production.woodToday +=
            LUMBER_WOOD_PER_TREE;


        woodProduced +=
            LUMBER_WOOD_PER_TREE;


        console.log(
            `${String(hour).padStart(2, "0")}:00 - Lumberjack cut a tree. +${LUMBER_WOOD_PER_TREE} Wood`
        );

    }


    if (
        woodProduced > 0
    ) {

        updateSettlementUI();

    }

}


function processLumberTreeGrowthHour() {

    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "lumberMill"
        ) {

            continue;

        }


        if (
            !building.treeGrowth ||
            typeof building.treeGrowth !==
            "object"
        ) {

            building.treeGrowth =
                {};

        }


        const tiles =
            getLumberZoneTiles(
                building
            );


        for (
            const tile
            of tiles
        ) {

            /*
                Eksisterende tre trenger
                ingen growth timer.
            */

            if (
                hasTreeAt(
                    tile.x,
                    tile.y
                )
            ) {

                continue;

            }


            /*
                Stein, vann, vei,
                bygning osv.
            */

            if (
                !canGrowTreeAt(
                    tile.x,
                    tile.y
                )
            ) {

                continue;

            }


            const key =
                getTileKey(
                    tile.x,
                    tile.y
                );


            /*
                Ny ledig tile får sin
                egen tilfeldige veksttid.
            */

            if (
                !Number.isFinite(
                    building.treeGrowth[
                        key
                    ]
                )
            ) {

                building.treeGrowth[
                    key
                ] =
                    randomInteger(
                        LUMBER_TREE_GROW_MIN_HOURS,
                        LUMBER_TREE_GROW_MAX_HOURS
                    );


                continue;

            }


            building.treeGrowth[
                key
            ] -=
                1;


            /*
                Ferdig utvokst.
            */

            if (
                building.treeGrowth[
                    key
                ] <= 0
            ) {

                worldState.grownTrees[
                    key
                ] =
                    true;


                delete building.treeGrowth[
                    key
                ];

                markNavigationChanged();

            }

        }

    }

}

function isFarmHarvestHour(
    hour
) {

    /*
        Første harvest kommer
        etter to timers arbeid:
        10:00.
    */

    if (
        hour <= WORK_START_HOUR ||
        hour > WORK_END_HOUR
    ) {

        return false;

    }


    return (
        (
            hour -
            WORK_START_HOUR
        ) %
        FARM_HARVEST_INTERVAL_HOURS
    ) === 0;

}


function processFarmHarvest(
    hour
) {

    if (
        !isFarmHarvestHour(
            hour
        )
    ) {

        return;

    }


    let foodProduced =
        0;


    let foodStored =
        0;


    let foodLost =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "farm"
        ) {

            continue;

        }


        const workers =
            getActiveBuildingWorkers(
                building.id
            );


        if (
            workers.length <= 0
        ) {

            continue;

        }


        const result =
            storeFoodInDepots(
                FARM_FOOD_PER_HARVEST
            );


        /*
            Production teller det farmen
            faktisk produserte, også hvis
            lageret var fullt.
        */

        worldState.production
            .foodToday +=
                FARM_FOOD_PER_HARVEST;


        worldState.production
            .foodWastedToday +=
                result.lost;


        foodProduced +=
            FARM_FOOD_PER_HARVEST;


        foodStored +=
            result.stored;


        foodLost +=
            result.lost;


        console.log(
            `${String(hour).padStart(2, "0")}:00 - Farm produced ${FARM_FOOD_PER_HARVEST} Food. Stored ${result.stored}, lost ${result.lost}.`
        );

    }


    if (
        foodProduced > 0
    ) {

        updateSettlementUI();

    }

}

function isQuarryHarvestHour(
    hour
) {

    if (
        hour <= WORK_START_HOUR ||
        hour > WORK_END_HOUR
    ) {

        return false;

    }


    return (
        (
            hour -
            WORK_START_HOUR
        ) %
        QUARRY_HARVEST_INTERVAL_HOURS
    ) === 0;

}


function processQuarryHarvest(
    hour
) {

    if (
        !isQuarryHarvestHour(
            hour
        )
    ) {

        return;

    }


    let stoneProduced =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "stoneQuarry"
        ) {

            continue;

        }


        const workers =
            getActiveBuildingWorkers(
                building.id
            );


        /*
            Ingen Stonecutter på jobb =
            ingen produksjon.
        */

        if (
            workers.length <= 0
        ) {

            continue;

        }


        worldState.resources.stone +=
            QUARRY_STONE_PER_HARVEST;


        /*
            Economy-systemet fra
            forrige steg.
        */

        worldState.production.stoneToday +=
            QUARRY_STONE_PER_HARVEST;


        stoneProduced +=
            QUARRY_STONE_PER_HARVEST;


        console.log(
            `${String(hour).padStart(2, "0")}:00 - Quarry produced stone. +${QUARRY_STONE_PER_HARVEST} Stone`
        );

    }


    if (
        stoneProduced > 0
    ) {

        updateSettlementUI();

    }

}

function processGameHours() {

    const currentHourIndex =
        getAbsoluteGameHourIndex();


    /*
        Første gang:
        start fra nåværende klokkeslett.

        Dette hindrer at gamle timer
        kjøres på nytt når save lastes.
    */

    if (
        !Number.isInteger(
            worldState.time
                .lastProcessedHourIndex
        )
    ) {

        worldState.time
            .lastProcessedHourIndex =
                currentHourIndex;

        return;

    }


    while (
        worldState.time
            .lastProcessedHourIndex <
        currentHourIndex
    ) {

        worldState.time
            .lastProcessedHourIndex +=
                1;


        const hour =
            getClockHourFromIndex(
                worldState.time
                    .lastProcessedHourIndex
            );

        processFarmHarvest(
            hour
        );

        processLumberHarvest(
            hour
        );

        processQuarryHarvest(
            hour
        );

        processLumberTreeGrowthHour();

    }

}

function hasTreeAt(
    x,
    y
) {

    const key =
        getTileKey(
            x,
            y
        );


    if (
        worldState.grownTrees[key] ===
        true
    ) {

        return true;

    }


    if (
        isNatureRemoved(
            x,
            y
        )
    ) {

        return false;

    }


    return (
        getTileName(
            "nature",
            x,
            y
        ) === "tree"
    );

}


function removeTreeAt(
    x,
    y
) {

    const key =
        getTileKey(
            x,
            y
        );


    if (
        worldState.grownTrees[key] ===
        true
    ) {

        delete worldState.grownTrees[
            key
        ];

        markNavigationChanged();

        return;

    }


    if (
        getTileName(
            "nature",
            x,
            y
        ) === "tree"
    ) {

        removeNatureAt(
            x,
            y
        );

    }

}

function getLumberZoneTiles(
    building
) {

    const zone =
        getLumberZoneBounds(
            building
        );


    const tiles =
        [];


    for (
        let y = zone.minY;
        y <= zone.maxY;
        y++
    ) {

        for (
            let x = zone.minX;
            x <= zone.maxX;
            x++
        ) {

            tiles.push({
                x,
                y
            });

        }

    }


    return tiles;

}

function canGrowTreeAt(
    x,
    y
) {

    /*
        Bygninger blokkerer.
    */

    if (
        tileHasBuilding(
            x,
            y
        )
    ) {

        return false;

    }

    if (
        isLumberMillEntranceTile(
            x,
            y
        )
    ) {

        return false;

    }

    /*
        Roads blokkerer tree growth.
    */

    if (
        tileHasRoad(
            x,
            y
        )
    ) {

        return false;

    }


    /*
        Water blokkerer.
    */

    if (
        getTileName(
            "water",
            x,
            y
        )
    ) {

        return false;

    }


    /*
        Eksisterende stein / annen nature
        blokkerer growth.

        Et eksisterende tree er derimot OK.
    */

    if (
        !isNatureRemoved(
            x,
            y
        )
    ) {

        const nature =
            getTileName(
                "nature",
                x,
                y
            );


        if (
            nature &&
            nature !== "tree"
        ) {

            return false;

        }

    }


    return true;

}

function generateAgeForRelation(
    relation
) {

    if (
        relation === "Son" ||
        relation === "Daughter"
    ) {

        return randomInteger(
            2,
            15
        );

    }


    if (
        relation === "Father" ||
        relation === "Mother"
    ) {

        return randomInteger(
            25,
            55
        );

    }


    return randomInteger(
        18,
        60
    );

}


function canSettlerWork(
    settler
) {

    return (
        settler.age >=
        MIN_WORKING_AGE
    );

}

function clampHappiness(
    value
) {

    return Math.max(
        0,
        Math.min(
            100,
            value
        )
    );

}


function getHappinessLabel(
    happiness
) {

    if (
        happiness < 25
    ) {

        return "Miserable";

    }


    if (
        happiness < 45
    ) {

        return "Unhappy";

    }


    if (
        happiness < 65
    ) {

        return "Content";

    }


    if (
        happiness < 85
    ) {

        return "Happy";

    }


    return "Thriving";

}


function getSettlerHappinessTarget(
    settler
) {

    let target =
        50;


    const family =
        getFamilyById(
            settler.familyId
        );


    /* =============================================
       FOOD
       ============================================= */

    if (
        family &&
        family.lastMealRequired > 0
    ) {

        if (
            family.lastMealMissing > 0
        ) {

            /*
                Et household som ikke fikk
                nok mat får en kraftig penalty.
            */

            target -=
                25;

        }
        else {

            target +=
                20;

        }

    }


    /* =============================================
       HOUSING
       ============================================= */

    const home =
        getBuildingById(
            settler.homeId
        );


    if (home) {

        target +=
            15;

    }
    else {

        target -=
            20;

    }


    /* =============================================
       FAMILY
       ============================================= */

    if (family) {

        const members =
            getFamilyMembers(
                family
            );


        if (
            members.length > 1
        ) {

            target +=
                5;

        }

    }


    /* =============================================
       EMPLOYMENT
       ============================================= */

    if (
        canSettlerWork(
            settler
        )
    ) {

        if (
            settler.workplaceId !==
            null
        ) {

            target +=
                10;

        }
        else {

            target -=
                5;

        }

    }


    return clampHappiness(
        target
    );

}


function updateDailySettlerHappiness() {

    for (
        const settler
        of worldState.settlers
    ) {

        if (
            !Number.isFinite(
                settler.happiness
            )
        ) {

            settler.happiness =
                DEFAULT_SETTLER_HAPPINESS;

        }


        const target =
            getSettlerHappinessTarget(
                settler
            );


        const previous =
            settler.happiness;


        const difference =
            target -
            previous;


        const change =
            Math.max(
                -HAPPINESS_DAILY_CHANGE_MAX,
                Math.min(
                    HAPPINESS_DAILY_CHANGE_MAX,
                    difference
                )
            );


        settler.happiness =
            clampHappiness(
                previous +
                change
            );


        settler.happinessTarget =
            target;


        settler.happinessChangeToday =
            settler.happiness -
            previous;

    }

}

function drawRoads() {

    for (
        const key
        of Object.keys(
            worldState.roads
        )
    ) {

        if (
            worldState.roads[key] !== true
        ) {

            continue;

        }

        const [
            x,
            y
        ] =
            key
                .split(",")
                .map(Number);

        ctx.fillStyle =
            "#777777";

        ctx.fillRect(
            x * tileWidth + 1,
            y * tileHeight + 1,
            tileWidth - 2,
            tileHeight - 2
        );

    }

}

function getRandomArrayItem(
    array
) {

    if (
        !Array.isArray(array) ||
        array.length === 0
    ) {

        return null;

    }


    const index =
        Math.floor(
            Math.random() *
            array.length
        );


    return array[index];

}


function getRandomGender() {

    return (
        Math.random() < 0.5
            ? "male"
            : "female"
    );

}


function generateSettlerIdentity(
    id,
    gender = null,
    lastName = null
) {

    const selectedGender =
        gender ||
        getRandomGender();


    const firstNamePool =
        selectedGender === "female"
            ? nameData.female
            : nameData.male;


    const firstName =
        getRandomArrayItem(
            firstNamePool
        ) ||
        `Settler ${id}`;


    const selectedLastName =
        lastName ||
        getRandomArrayItem(
            nameData.surnames
        ) ||
        "";


    const fullName =
        selectedLastName
            ? `${firstName} ${selectedLastName}`
            : firstName;


    return {

        gender:
            selectedGender,

        firstName:
            firstName,

        lastName:
            selectedLastName,

        fullName:
            fullName

    };

}

function openSettingsMenu() {

    closePeopleMenu();

    closeEconomyMenu();

    closeInventoryMenu();

    closeCharacterMenu();

    settingsOpen =
        true;

    settingsOverlay.classList.add(
        "open"
    );

    updateSaveStatus();

}


function closeSettingsMenu() {

    settingsOpen =
        false;

    settingsOverlay.classList.remove(
        "open"
    );

}

function openSettlementNameMenu() {

    namingSettlement =
        true;


    settlementNameOverlay.classList.add(
        "open"
    );


    settlementNameInput.value =
        "";


    /*
        Fokus etter at vinduet har blitt synlig.
    */

    setTimeout(
        () => {

            settlementNameInput.focus();

        },
        0
    );

}

function activateBuildMode(
    type,
    button
) {

    if (!buildModeActive) {
        return;
    }


    cancelHarvestMode();


    buildMode =
        type;


    settlementCenterButton.classList.remove(
        "active"
    );

    marketHallButton.classList.remove(
        "active"
    );

    houseButton.classList.remove(
        "active"
    );

    farmButton.classList.remove(
        "active"
    );

    roadButton.classList.remove(
        "active"
    );

    lumberMillButton.classList.remove(
        "active"
    );

    stoneQuarryButton.classList.remove(
        "active"
    );

    button.classList.add(
        "active"
    );


    canvas.style.cursor =
        "crosshair";

}

function confirmSettlementName() {

    if (!namingSettlement) {
        return;
    }


    const name =
        settlementNameInput.value.trim();


    if (!name) {

        settlementNameInput.focus();

        return;

    }


    worldState.settlement.name =
        name;


    namingSettlement =
        false;


    settlementNameOverlay.classList.remove(
        "open"
    );

    updateSettlementUI();

    console.log(
        `Settlement founded: ${name}`
    );

}

confirmSettlementNameButton.addEventListener(
    "click",
    () => {

        confirmSettlementName();

    }
);

roadButton.addEventListener(
    "click",
    () => {

        if (
            !worldState.settlement.founded
        ) {

            return;

        }

        if (
            buildMode === "road"
        ) {

            cancelBuildMode();

            return;

        }

        activateBuildMode(
            "road",
            roadButton
        );

    }
);

farmButton.addEventListener(
    "click",
    () => {

        if (
            !worldState.settlement.founded
        ) {

            return;

        }

        if (
            buildMode === "farm"
        ) {

            cancelBuildMode();

            return;

        }

        activateBuildMode(
            "farm",
            farmButton
        );

    }
);

buildCategoryResourcesButton.addEventListener(
    "click",
    () => {

        openBuildCategory(
            "resources"
        );

    }
);

settlementNameInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            confirmSettlementName();

        }

    }
);

function updateSaveStatus() {

    const rawSave =
        localStorage.getItem(
            SAVE_KEY
        );


    if (!rawSave) {

        saveStatusText.textContent =
            "No save found.";

        loadGameButton.disabled =
            true;

        return;

    }


    loadGameButton.disabled =
        false;


    try {

        const saveData =
            JSON.parse(rawSave);


        if (saveData.savedAt) {

            const date =
                new Date(
                    saveData.savedAt
                );


            saveStatusText.textContent =
                `Save found\n${date.toLocaleString()}`;

        }
        else {

            saveStatusText.textContent =
                "Save found.";

        }

    }
    catch {

        saveStatusText.textContent =
            "Save data could not be read.";

        loadGameButton.disabled =
            true;

    }

}

function canAffordBuilding(
    buildingDef
) {

    const cost =
        buildingDef.cost || {};


    for (
        const [resource, amount]
        of Object.entries(cost)
    ) {

        const available =
            worldState.resources[resource] || 0;


        if (
            available < amount
        ) {

            return false;

        }

    }


    return true;

}


function payBuildingCost(
    buildingDef
) {

    const cost =
        buildingDef.cost || {};


    for (
        const [resource, amount]
        of Object.entries(cost)
    ) {

        worldState.resources[resource] -=
            amount;

    }

}

/* =========================================================
   SAVE / LOAD
   ========================================================= */

function saveGame() {

    const saveData = {

        version: 5,

        savedAt:
            new Date().toISOString(),


        settlement: {
            ...worldState.settlement
        },

        time: {
            ...worldState.time
        },

        resources: {
            ...worldState.resources
        },

        production: {
            ...worldState.production
        },

        foodStatus: {
            ...worldState.foodStatus
        },

        roads: {
            ...worldState.roads
        },

        grownTrees: {
            ...worldState.grownTrees
        },

        buildings:
            worldState.buildings.map(
                building => ({
                    ...building
                })
            ),


        removedNature: {
            ...worldState.removedNature
        },

        settlers:
            worldState.settlers.map(
                settler => ({
                    ...settler
                })
            ),

        nextSettlerId:
            worldState.nextSettlerId,

        families:
            worldState.families.map(
                family => ({
                    ...family,

                    memberIds: [
                        ...family.memberIds
                    ]
                })
            ),

        nextFamilyId:
            worldState.nextFamilyId,

        player: {

            tileX:
                player.tileX,

            tileY:
                player.tileY,

            facing:
                player.facing

        },


        playerCharacter: {

            ...playerCharacter,

            health: {
                ...playerCharacter.health
            },

            attributes: {
                ...playerCharacter.attributes
            },

            inventory: {
                ...playerCharacter.inventory
            },

            equipment: {
                ...playerCharacter.equipment
            },

            skills: {
                ...playerCharacter.skills
            }

        },

        camera: {

            x:
                camera.x,

            y:
                camera.y,

            zoom:
                camera.zoom

        }

    };


    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );


    console.log(
        "Game saved.",
        saveData
    );


    updateSaveStatus();

}

function loadGame() {

    const rawSave =
        localStorage.getItem(
            SAVE_KEY
        );


    if (!rawSave) {

        console.log(
            "No save found."
        );

        return;

    }


    try {

        const saveData =
            JSON.parse(rawSave);

        const legacySavedFood =
            Number.isFinite(
                saveData.resources?.food
            )
                ? saveData.resources.food
                : 0;

        /*
            Settlement
        */

        if (saveData.settlement) {

            worldState.settlement = {
                ...worldState.settlement,
                ...saveData.settlement
            };

        }

        worldState.time = {

            day: 1,

            elapsed: 0,

            lastProcessedHourIndex: null

        };


        if (saveData.time) {

            worldState.time = {
                ...worldState.time,
                ...saveData.time
            };

        }

        if (saveData.resources) {

            worldState.resources = {
                ...worldState.resources,
                ...saveData.resources
            };

        }

        worldState.production = {

            foodToday: 0,

            foodWastedToday: 0,

            woodToday: 0,

            stoneToday: 0,

            manualWoodToday: 0

        };


        if (
            saveData.production &&
            typeof saveData.production ===
            "object"
        ) {

            worldState.production = {
                ...worldState.production,
                ...saveData.production
            };

        }

        worldState.foodStatus = {

            shortageActive: false,

            shortageAmount: 0,

            lastRequired: 0,

            lastConsumed: 0,

            consecutiveShortageDays: 0,

            distributionShortageActive:
                false,

            unfilledHouseholdFood:
                0,

            householdsUnableToRefill:
                0,

            hungryHouseholds:
                0,

            hungryResidents:
                0

        };


        if (
            saveData.foodStatus &&
            typeof saveData.foodStatus ===
            "object"
        ) {

            worldState.foodStatus = {
                ...worldState.foodStatus,
                ...saveData.foodStatus
            };

        }

        worldState.roads =
            saveData.roads &&
            typeof saveData.roads === "object"
                ? {
                    ...saveData.roads
                }
                : {};

        worldState.grownTrees =
            saveData.grownTrees &&
            typeof saveData.grownTrees === "object"
                ? {
                    ...saveData.grownTrees
                }
                : {};

        /*
            Buildings
        */

        worldState.buildings =
            Array.isArray(
                saveData.buildings
            )
                ? saveData.buildings
                : [];

        for (
            const building
            of worldState.buildings
        ) {

            if (
                building.type !==
                    "settlementCenter" &&
                building.type !==
                    "marketHall"
            ) {

                continue;

            }


            if (
                !Number.isFinite(
                    building.foodStorage
                )
            ) {

                building.foodStorage =
                    0;

            }

        }


        worldState.settlers =
            Array.isArray(
                saveData.settlers
            )
                ? saveData.settlers.map(
                    settler => ({
                        ...settler
                    })
                )
                : [];

        for (
            const settler
            of worldState.settlers
        ) {

            if (
                !settler.firstName ||
                !settler.gender
            ) {

                const identity =
                    generateSettlerIdentity(
                        settler.id
                    );


                settler.firstName =
                    identity.firstName;

                settler.lastName =
                    identity.lastName;

                settler.name =
                    identity.fullName;

                settler.gender =
                    identity.gender;

            }

            if (
                !Number.isFinite(
                    settler.age
                )
            ) {

                settler.age =
                    generateAgeForRelation(
                        settler.relation
                    );

            }


            if (
                !Number.isFinite(
                    settler.carriedFood
                )
            ) {

                settler.carriedFood =
                    0;

            }

            if (
                !Number.isFinite(
                    settler.happiness
                )
            ) {

                settler.happiness =
                    DEFAULT_SETTLER_HAPPINESS;

            }


            if (
                !Number.isFinite(
                    settler.happinessTarget
                )
            ) {

                settler.happinessTarget =
                    settler.happiness;

            }


            if (
                !Number.isFinite(
                    settler.happinessChangeToday
                )
            ) {

                settler.happinessChangeToday =
                    0;

            }

            /*
                RPG actor data.

                Gamle saves får dette
                automatisk.
            */

            ensureSettlerRpgData(
                settler
            );

        }

        for (
            const building
            of worldState.buildings
        ) {

            if (
                building.type !==
                "lumberMill"
            ) {

                continue;

            }


            if (
                Number.isInteger(
                    building.entranceX
                ) &&
                Number.isInteger(
                    building.entranceY
                )
            ) {

                continue;

            }


            const entrance =
                findLumberMillEntrance(
                    building.x,
                    building.y
                );


            if (entrance) {

                building.entranceX =
                    entrance.x;


                building.entranceY =
                    entrance.y;

            }

        }

        worldState.nextSettlerId =
            Number.isInteger(
                saveData.nextSettlerId
            )
                ? saveData.nextSettlerId
                : 1;

        for (
            const settler
            of worldState.settlers
        ) {

            if (
                settler.id >=
                worldState.nextSettlerId
            ) {

                worldState.nextSettlerId =
                    settler.id + 1;

            }

        }

        worldState.families =
            Array.isArray(
                saveData.families
            )
                ? saveData.families.map(
                    family => ({
                        ...family,

                        memberIds:
                            Array.isArray(
                                family.memberIds
                            )
                                ? [...family.memberIds]
                                : []
                    })
                )
                : [];


        worldState.nextFamilyId =
            Number.isInteger(
                saveData.nextFamilyId
            )
                ? saveData.nextFamilyId
                : 1;

        for (
            const family
            of worldState.families
        ) {

            if (
                !Number.isFinite(
                    family.foodStorage
                )
            ) {

                family.foodStorage =
                    0;

            }

            if (
                !Number.isFinite(
                    family.lastMealRequired
                )
            ) {

                family.lastMealRequired =
                    0;

            }


            if (
                !Number.isFinite(
                    family.lastMealConsumed
                )
            ) {

                family.lastMealConsumed =
                    0;

            }


            if (
                !Number.isFinite(
                    family.lastMealMissing
                )
            ) {

                family.lastMealMissing =
                    0;

            }


            if (
                !Number.isInteger(
                    family.foodRunSettlerId
                )
            ) {

                family.foodRunSettlerId =
                    null;

            }


            if (
                !Number.isFinite(
                    family.foodRunDueMinute
                )
            ) {

                family.foodRunDueMinute =
                    null;

            }


            if (
                family.foodRunSettlerId !==
                    null &&
                !getSettlerById(
                    family.foodRunSettlerId
                )
            ) {

                family.foodRunSettlerId =
                    null;

                family.foodRunDueMinute =
                    null;

            }

            if (
                family.id >=
                worldState.nextFamilyId
            ) {

                worldState.nextFamilyId =
                    family.id + 1;

            }

        }

        /*
            Migrer Food fra gamle saves.

            Gamle saves hadde maten direkte
            i resources.food og ikke i
            fysiske lagre.
        */

        if (
            getTotalFoodAvailable() === 0 &&
            legacySavedFood > 0
        ) {

            storeFoodInDepots(
                legacySavedFood
            );

        }


        syncLegacyFoodResource();

        npcRuntime.clear();

        normalizeJobAssignments();

        syncPopulationCount();

        /*
            Removed nature
        */

        worldState.removedNature =
            saveData.removedNature &&
            typeof saveData.removedNature === "object"
                ? {
                    ...saveData.removedNature
                }
                : {};


        /*
            Re-sync Tiled buildings after loading.
            Existing saved state is preserved and newly
            added Tiled buildings appear automatically.
        */
        if (mapLoaded) {

            syncTiledWorldEntities();

        }


        /*
            RPG Character

            Gamle saves hadde ikke
            playerCharacter. Da brukes
            standardverdiene automatisk.
        */

        playerCharacter =
            normalizePlayerCharacter(
                saveData.playerCharacter
            );


        /*
            Player position / movement
        */

        if (
            saveData.player &&
            Number.isInteger(
                saveData.player.tileX
            ) &&
            Number.isInteger(
                saveData.player.tileY
            )
        ) {

            setPlayerTile(
                saveData.player.tileX,
                saveData.player.tileY
            );


            player.facing =
                saveData.player.facing ||
                "south";


            player.initialized =
                true;

        }
        else if (mapLoaded) {

            initializePlayerFromMap();

        }


        /*
            Camera
        */

        if (saveData.camera) {

            if (
                Number.isFinite(
                    saveData.camera.x
                )
            ) {

                camera.x =
                    saveData.camera.x;

            }


            if (
                Number.isFinite(
                    saveData.camera.y
                )
            ) {

                camera.y =
                    saveData.camera.y;

            }


            if (
                Number.isFinite(
                    saveData.camera.zoom
                )
            ) {

                camera.zoom =
                    Math.max(
                        camera.minZoom,
                        Math.min(
                            camera.maxZoom,
                            saveData.camera.zoom
                        )
                    );

            }

        }


        /*
            Vi skal ikke laste inn et gammelt
            aktivt tool/build mode.
        */

        cancelBuildMode();

        cancelHarvestMode();


        selectedTile =
            null;


        /*
            Center kan ikke bygges igjen
            dersom settlement allerede finnes.
        */

        settlementCenterButton.disabled =
            worldState.settlement.founded;

        houseButton.disabled =
            !worldState.settlement.founded;

        farmButton.disabled =
            !worldState.settlement.founded;

        marketHallButton.disabled =
            !worldState.settlement.founded;

        roadButton.disabled =
            !worldState.settlement.founded;

        lumberMillButton.disabled =
            !worldState.settlement.founded;

        stoneQuarryButton.disabled =
            !worldState.settlement.founded;

        updateSettlementUI();


        console.log(
            "Game loaded.",
            saveData
        );


        closeSettingsMenu();

    }
    catch (error) {

        console.error(
            "Failed to load save:",
            error
        );


        saveStatusText.textContent =
            "Save could not be loaded.";

    }

}

function newGame() {


    worldState.settlement = {

        founded: false,

        name: "Not founded",

        population: 0

    };


    worldState.time = {

        day: 1,

        elapsed: 0,

        lastProcessedHourIndex: null

    };

    worldState.resources = {

        food: 0,

        wood: 0,

        stone: 0

    };

    worldState.production = {

        foodToday: 0,

        foodWastedToday: 0,

        woodToday: 0,

        stoneToday: 0,

        manualWoodToday: 0

    };

    worldState.foodStatus = {

        shortageActive: false,

        shortageAmount: 0,

        lastRequired: 0,

        lastConsumed: 0,

        consecutiveShortageDays: 0,

        distributionShortageActive:
            false,

        unfilledHouseholdFood:
            0,

        householdsUnableToRefill:
            0,

        hungryHouseholds:
            0,

        hungryResidents:
            0

    };

    worldState.roads =
        {};

    worldState.grownTrees =
        {};

    worldState.buildings =
        [];

    worldState.settlers =
        [];

    worldState.nextSettlerId =
        1;

    worldState.families =
        [];

    worldState.nextFamilyId =
        1;

    worldState.removedNature =
        {};


    playerCharacter =
        createDefaultPlayerCharacter();

 
    npcRuntime.clear();

    setTimeScale(
        1
    );

    cancelBuildMode();

    cancelHarvestMode();


    selectedTile =
        null;


    /*
        Settlement Center kan bygges igjen.
    */

    settlementCenterButton.disabled =
        false;

    houseButton.disabled =
        true;

    farmButton.disabled =
        true;

    marketHallButton.disabled =
        true;

    roadButton.disabled =
        true;

    lumberMillButton.disabled =
        true;

    stoneQuarryButton.disabled =
        true;

    /*
        Sett kamera tilbake til midten.
    */

    camera.zoom =
        1;


    centerCameraOnMap();


    if (mapLoaded) {

        syncTiledWorldEntities();
        initializeTiledSettlementPopulation();

        initializePlayerFromMap();

    }


    updateSettlementUI();


    closeSettingsMenu();


    console.log(
        "New game started."
    );

}

newGameButton.addEventListener(
    "click",
    () => {

        const confirmed =
            window.confirm(
                "Start a new game? Unsaved progress will be lost."
            );


        if (!confirmed) {
            return;
        }


        newGame();

    }
);


/* =========================================================
   CANVAS RESIZE
   ========================================================= */

function resizeCanvas() {

    const dpr =
        window.devicePixelRatio || 1;

    const rect =
        canvas.getBoundingClientRect();

    const width =
        Math.max(1, rect.width);

    const height =
        Math.max(1, rect.height);


    canvas.width =
        Math.floor(width * dpr);

    canvas.height =
        Math.floor(height * dpr);


    ctx.imageSmoothingEnabled =
        false;

}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();

const mapFrame =
    document.getElementById("map-frame");


const mapResizeObserver =
    new ResizeObserver(() => {

        resizeCanvas();

    });


mapResizeObserver.observe(
    mapFrame
);


/* =========================================================
   LOAD JSON
   ========================================================= */

async function loadJSON(url) {

    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            `Could not load JSON: ${url}`
        );

    }


    return await response.json();

}

async function loadNameData() {

    try {

        const namesURL =
            new URL(
                NAMES_URL,
                window.location.href
            ).href;


        const loaded =
            await loadJSON(
                namesURL
            );


        nameData.male =
            Array.isArray(loaded.male)
                ? loaded.male
                : [];


        nameData.female =
            Array.isArray(loaded.female)
                ? loaded.female
                : [];


        nameData.surnames =
            Array.isArray(loaded.surnames)
                ? loaded.surnames
                : [];


        console.log(
            "Names loaded:",
            nameData
        );

    }
    catch (error) {

        console.error(
            "Could not load names:",
            error
        );

    }

}


/* =========================================================
   LOAD IMAGE
   ========================================================= */

function loadImage(url) {

    return new Promise(
        (resolve, reject) => {

            const image =
                new Image();


            image.onload = () => {

                resolve(image);

            };


            image.onerror = () => {

                reject(
                    new Error(
                        `Could not load image: ${url}`
                    )
                );

            };


            image.src = url;

        }
    );

}


/* =========================================================
   LOAD MAP
   ========================================================= */

async function loadTiledMap() {

    try {

        console.log(
            "Loading Tiled map..."
        );


        const mapURL =
            new URL(
                MAP_URL,
                window.location.href
            ).href;


        tiledMap =
            await loadJSON(mapURL);


        mapWidth =
            tiledMap.width;

        mapHeight =
            tiledMap.height;

        tileWidth =
            tiledMap.tilewidth;

        tileHeight =
            tiledMap.tileheight;


        /*
            Load external tilesets.
        */

        for (
            const tilesetReference
            of tiledMap.tilesets
        ) {

            await loadTileset(
                tilesetReference,
                mapURL
            );

        }


        mapLoaded = true;


        centerCameraOnMap();


        console.log(
            "Map loaded."
        );


        console.log(
            "Map:",
            mapWidth,
            "x",
            mapHeight
        );


        console.log(
            "Tilesets:",
            loadedTilesets
        );

    }
    catch (error) {

        console.error(
            "Failed to load map:",
            error
        );

    }

}


/* =========================================================
   LOAD TILESET
   ========================================================= */

async function loadTileset(
    tilesetReference,
    mapURL
) {

    if (!tilesetReference.source) {

        console.warn(
            "Embedded tilesets are not currently supported."
        );

        return;

    }


    const tilesetURL =
        new URL(
            tilesetReference.source,
            mapURL
        ).href;


    const tilesetData =
        await loadJSON(
            tilesetURL
        );


    const loadedTileset = {

        firstgid:
            tilesetReference.firstgid,

        url:
            tilesetURL,

        data:
            tilesetData,

        tiles:
            new Map()

    };


    /*
        Collection of Images
    */

    if (tilesetData.tiles) {

        for (
            const tileData
            of tilesetData.tiles
        ) {

            if (!tileData.image) {
                continue;
            }


            const imageURL =
                new URL(
                    tileData.image,
                    tilesetURL
                ).href;


            const image =
                await loadImage(
                    imageURL
                );


            /*
                Convert Tiled properties:

                [
                    {
                        name: "name",
                        value: "tree"
                    }
                ]

                becomes:

                {
                    name: "tree"
                }
            */

            const properties = {};


            if (tileData.properties) {

                for (
                    const property
                    of tileData.properties
                ) {

                    properties[
                        property.name
                    ] =
                        property.value;

                }

            }


            loadedTileset.tiles.set(
                tileData.id,
                {

                    id:
                        tileData.id,

                    image:
                        image,

                    width:
                        tileData.imagewidth ||
                        tileWidth,

                    height:
                        tileData.imageheight ||
                        tileHeight,

                    properties:
                        properties

                }
            );

        }

    }


    loadedTilesets.push(
        loadedTileset
    );

}


/* =========================================================
   GID → TILE
   ========================================================= */

function getTileFromGid(gid) {

    if (!gid) {
        return null;
    }


    /*
        Remove Tiled flip flags.
    */

    const cleanGid =
        gid & 0x0fffffff;


    let selectedTileset =
        null;


    for (
        const tileset
        of loadedTilesets
    ) {

        if (
            cleanGid >=
            tileset.firstgid
        ) {

            if (
                !selectedTileset ||
                tileset.firstgid >
                selectedTileset.firstgid
            ) {

                selectedTileset =
                    tileset;

            }

        }

    }


    if (!selectedTileset) {
        return null;
    }


    const localId =
        cleanGid -
        selectedTileset.firstgid;


    const tile =
        selectedTileset.tiles.get(
            localId
        );


    if (!tile) {
        return null;
    }


    return {

        tile:
            tile,

        tileset:
            selectedTileset

    };

}


/* =========================================================
   GET LAYER
   ========================================================= */

function getLayer(name) {

    if (!tiledMap) {
        return null;
    }


    return tiledMap.layers.find(
        layer =>
            layer.name.toLowerCase() ===
            name.toLowerCase()
    );

}


/* =========================================================
   GET TILE GID FROM LAYER
   ========================================================= */

function getLayerGidAt(
    layerName,
    x,
    y
) {

    if (!mapLoaded) {
        return 0;
    }


    if (
        x < 0 ||
        y < 0 ||
        x >= mapWidth ||
        y >= mapHeight
    ) {

        return 0;

    }


    const layer =
        getLayer(layerName);


    if (
        !layer ||
        layer.type !== "tilelayer"
    ) {

        return 0;

    }


    const index =
        y * layer.width +
        x;


    return (
        layer.data[index] || 0
    );

}


/* =========================================================
   GET TILE DATA FROM LAYER
   ========================================================= */

function getLayerTileAt(
    layerName,
    x,
    y
) {

    const gid =
        getLayerGidAt(
            layerName,
            x,
            y
        );


    if (!gid) {
        return null;
    }


    const result =
        getTileFromGid(gid);


    if (!result) {
        return null;
    }


    return result.tile;

}


/* =========================================================
   GET TILE NAME
   ========================================================= */

function getTileName(
    layerName,
    x,
    y
) {

    const tile =
        getLayerTileAt(
            layerName,
            x,
            y
        );


    if (!tile) {
        return null;
    }


    /*
        This is the custom property
        you added in Tiled:

        name = grass
        name = tree
        etc.
    */

    return (
        tile.properties.name ||
        null
    );

}


/* =========================================================
   GET COMPLETE WORLD TILE INFO
   ========================================================= */

function getTileInfo(
    x,
    y
) {

    if (
        x < 0 ||
        y < 0 ||
        x >= mapWidth ||
        y >= mapHeight
    ) {

        return null;

    }


    const ground =
        getTileName(
            "ground",
            x,
            y
        );


    const water =
        getTileName(
            "water",
            x,
            y
        );


    const key =
        getTileKey(
            x,
            y
        );


    const grownTree =
        worldState.grownTrees[key] === true;


    const nature =
        grownTree
            ? "tree"
            : (
                isNatureRemoved(x, y)
                    ? null
                    : getTileName(
                        "nature",
                        x,
                        y
                    )
            );


    return {

        x:
            x,

        y:
            y,

        ground:
            ground,

        water:
            water,

        nature:
            nature,

        hasWater:
            water !== null,

        hasNature:
            nature !== null

    };

}


/* =========================================================
   TILED OBJECTS / RPG PLAYER
   ========================================================= */

function getTiledObjectProperties(
    object
) {

    const result =
        {};


    if (
        !object ||
        !Array.isArray(
            object.properties
        )
    ) {

        return result;

    }


    for (
        const property
        of object.properties
    ) {

        result[
            property.name
        ] =
            property.value;

    }


    return result;

}


function getObjectLayer(
    name = "objects"
) {

    const layer =
        getLayer(
            name
        );


    if (
        !layer ||
        layer.type !==
            "objectgroup"
    ) {

        return null;

    }


    return layer;

}


/* =========================================================
   TILED WORLD ENTITIES
   ========================================================= */

const TILED_BUILDING_CLASS_ALIASES = {

    house:
        "house",

    farm:
        "farm",

    market:
        "marketHall",

    markethall:
        "marketHall",

    lumber:
        "lumberMill",

    lumbermill:
        "lumberMill",

    quarry:
        "stoneQuarry",

    stonequarry:
        "stoneQuarry",

    center:
        "settlementCenter",

    settlementcenter:
        "settlementCenter"

};


function getTiledObjectClass(
    object
) {

    if (!object) {
        return "";
    }


    const properties =
        getTiledObjectProperties(
            object
        );


    const customClass =
        properties.Class ??
        properties.class ??
        properties.CLASS ??
        "";


    return String(
        object.class ||
        object.type ||
        customClass ||
        ""
    )
        .trim()
        .toLowerCase();

}


function pointInsideTiledObject(
    pixelX,
    pixelY,
    object
) {

    if (!object) {
        return false;
    }


    return (
        pixelX >= object.x &&
        pixelX < object.x + object.width &&
        pixelY >= object.y &&
        pixelY < object.y + object.height
    );

}


function getTiledSettlementForObject(
    object,
    settlementObjects
) {

    const centerX =
        object.x +
        object.width / 2;

    const centerY =
        object.y +
        object.height / 2;


    return (
        settlementObjects.find(
            settlement =>
                pointInsideTiledObject(
                    centerX,
                    centerY,
                    settlement
                )
        ) ||
        null
    );

}


function createTiledBuildingData(
    object,
    buildingType,
    settlementId
) {

    const def =
        BUILDING_DEFS[
            buildingType
        ];


    if (!def) {
        return null;
    }


    const width =
        Math.max(
            1,
            Math.ceil(
                object.width /
                tileWidth
            )
        );


    const height =
        Math.max(
            1,
            Math.ceil(
                object.height /
                tileHeight
            )
        );


    const building = {

        id:
            `tiled:${object.id}`,

        tiledObjectId:
            object.id,

        source:
            "tiled",

        type:
            buildingType,

        name:
            String(
                object.name ||
                def.name
            ),

        settlementId:
            settlementId,

        x:
            Math.floor(
                object.x /
                tileWidth
            ),

        y:
            Math.floor(
                object.y /
                tileHeight
            ),

        width:
            width,

        height:
            height

    };


    if (
        def.foodStorageCapacity
    ) {

        building.foodStorage =
            0;

    }


    if (
        buildingType ===
        "lumberMill"
    ) {

        building.treeGrowth =
            {};

    }


    return building;

}


function syncTiledWorldEntities() {

    const layer =
        getObjectLayer(
            "objects"
        );


    if (
        !layer ||
        !Array.isArray(
            layer.objects
        )
    ) {

        console.warn(
            'No Tiled object layer named "objects" was found.'
        );

        worldState.settlements =
            [];

        return;

    }


    const settlementObjects =
        layer.objects.filter(
            object =>
                getTiledObjectClass(
                    object
                ) ===
                "settlement"
        );


    worldState.settlements =
        settlementObjects.map(
            object => ({

                id:
                    `settlement:${object.id}`,

                tiledObjectId:
                    object.id,

                name:
                    String(
                        object.name ||
                        `Settlement ${object.id}`
                    ),

                x:
                    object.x /
                    tileWidth,

                y:
                    object.y /
                    tileHeight,

                width:
                    object.width /
                    tileWidth,

                height:
                    object.height /
                    tileHeight

            })
        );


    const existingTiledBuildings =
        new Map(
            worldState.buildings
                .filter(
                    building =>
                        building.source ===
                        "tiled"
                )
                .map(
                    building => [
                        building.tiledObjectId,
                        building
                    ]
                )
        );


    const dynamicBuildings =
        worldState.buildings.filter(
            building =>
                building.source !==
                "tiled"
        );


    const tiledBuildings =
        [];


    for (
        const object
        of layer.objects
    ) {

        const objectClass =
            getTiledObjectClass(
                object
            );


        const buildingType =
            TILED_BUILDING_CLASS_ALIASES[
                objectClass
            ];


        if (!buildingType) {
            continue;
        }


        if (
            object.width <= 0 ||
            object.height <= 0
        ) {

            console.warn(
                `Tiled ${objectClass} object #${object.id} must be a rectangle with width and height.`
            );

            continue;

        }


        const settlementObject =
            getTiledSettlementForObject(
                object,
                settlementObjects
            );


        const settlementId =
            settlementObject
                ? `settlement:${settlementObject.id}`
                : null;


        const freshBuilding =
            createTiledBuildingData(
                object,
                buildingType,
                settlementId
            );


        if (!freshBuilding) {
            continue;
        }


        const existing =
            existingTiledBuildings.get(
                object.id
            );


        if (existing) {

            tiledBuildings.push({

                ...existing,
                ...freshBuilding,

                /*
                    Bevar runtime/save state som
                    ikke kommer fra Tiled.
                */
                foodStorage:
                    Number.isFinite(
                        existing.foodStorage
                    )
                        ? existing.foodStorage
                        : freshBuilding.foodStorage

            });

        }
        else {

            tiledBuildings.push(
                freshBuilding
            );

        }

    }


    worldState.buildings = [
        ...dynamicBuildings,
        ...tiledBuildings
    ];


    /*
        Compatibility bridge for the old settlement
        simulation while we convert it to multi-town.
    */
    if (
        worldState.settlements.length > 0
    ) {

        worldState.settlement.founded =
            true;

        worldState.settlement.name =
            worldState.settlements[0].name;

    }


    markNavigationChanged();


    console.log(
        `Tiled world entities: ${worldState.settlements.length} settlement(s), ${tiledBuildings.length} building(s).`
    );


    if (
        worldState.settlements.length === 0 &&
        tiledBuildings.length === 0
    ) {

        console.log(
            "Tiled object classes found:",
            layer.objects.map(
                object => ({
                    id: object.id,
                    name: object.name || "",
                    class: getTiledObjectClass(object)
                })
            )
        );

    }

}


function getSettlementById(
    settlementId
) {

    return (
        worldState.settlements.find(
            settlement =>
                settlement.id ===
                settlementId
        ) ||
        null
    );

}


function getSettlementBuildings(
    settlementId
) {

    return worldState.buildings.filter(
        building =>
            building.settlementId ===
            settlementId
    );

}


function getSettlementSettlers(
    settlementId
) {

    return worldState.settlers.filter(
        settler =>
            settler.settlementId ===
            settlementId
    );

}


function initializeTiledSettlementPopulation() {

    for (
        const settlement
        of worldState.settlements
    ) {

        const existingResidents =
            getSettlementSettlers(
                settlement.id
            );


        if (
            existingResidents.length > 0
        ) {

            continue;

        }


        const houses =
            getSettlementBuildings(
                settlement.id
            ).filter(
                building =>
                    building.type ===
                    "house"
            );


        for (
            const house
            of houses
        ) {

            const def =
                BUILDING_DEFS.house;


            const familySize =
                randomInteger(
                    1,
                    Math.max(
                        1,
                        def.housingCapacity || 1
                    )
                );


            const family =
                createFamily(
                    familySize,
                    house.id,
                    settlement.id
                );


            /*
                Start med fullt household pantry.
                Dette hindrer at en ferdiglaget by
                sulter øyeblikkelig før vi har gjort
                multi-settlement food simulation.
            */
            family.foodStorage =
                getFamilyFoodCapacity(
                    family
                );

        }


        assignAvailableJobs(
            settlement.id
        );


        console.log(
            `${settlement.name}: ${getSettlementSettlers(settlement.id).length} residents initialized.`
        );

    }


    syncPopulationCount();

}


function findPlayerSpawnObject() {

    const layer =
        getObjectLayer(
            "objects"
        );


    if (
        !layer ||
        !Array.isArray(
            layer.objects
        )
    ) {

        return null;

    }


    for (
        const object
        of layer.objects
    ) {

        const properties =
            getTiledObjectProperties(
                object
            );


        const name =
            String(
                object.name || ""
            )
                .trim()
                .toLowerCase();


        const objectClass =
            String(
                object.class ||
                object.type ||
                ""
            )
                .trim()
                .toLowerCase();


        const role =
            String(
                properties.role ||
                properties.type ||
                ""
            )
                .trim()
                .toLowerCase();


        if (
            name ===
                "player spawn" ||
            name ===
                "playerspawn" ||
            objectClass ===
                "player_spawn" ||
            objectClass ===
                "playerspawn" ||
            role ===
                "player_spawn" ||
            role ===
                "playerspawn"
        ) {

            return object;

        }

    }


    return null;

}


function getPlayerSpawnTile() {

    const spawnObject =
        findPlayerSpawnObject();


    if (spawnObject) {

        const tileX =
            Math.floor(
                spawnObject.x /
                tileWidth
            );


        const tileY =
            Math.floor(
                spawnObject.y /
                tileHeight
            );


        return {

            x:
                Math.max(
                    0,
                    Math.min(
                        mapWidth - 1,
                        tileX
                    )
                ),

            y:
                Math.max(
                    0,
                    Math.min(
                        mapHeight - 1,
                        tileY
                    )
                )

        };

    }


    /*
        Fallback hvis Player Spawn ikke
        er lagt inn i Tiled ennå.
    */

    return {

        x:
            Math.floor(
                mapWidth / 2
            ),

        y:
            Math.floor(
                mapHeight / 2
            )

    };

}


function setPlayerTile(
    tileX,
    tileY
) {

    player.tileX =
        tileX;

    player.tileY =
        tileY;


    player.x =
        tileX + 0.5;

    player.y =
        tileY + 0.5;


    player.fromX =
        player.x;

    player.fromY =
        player.y;

    player.toX =
        player.x;

    player.toY =
        player.y;


    player.moveProgress =
        0;

    player.moving =
        false;

}


function initializePlayerFromMap() {

    if (!mapLoaded) {
        return;
    }


    const spawn =
        getPlayerSpawnTile();


    setPlayerTile(
        spawn.x,
        spawn.y
    );


    player.initialized =
        true;


    if (
        !findPlayerSpawnObject()
    ) {

        console.warn(
            'No "Player Spawn" object found on the Tiled "objects" layer. Using map center as fallback.'
        );

    }


    updateCameraFollowPlayer(
        true
    );


    console.log(
        "Player spawned at:",
        player.tileX,
        player.tileY
    );

}


function tileHasCollisionMarker(
    x,
    y
) {

    return (
        getLayerGidAt(
            "collision",
            x,
            y
        ) !== 0
    );

}


function tilePropertyBlocksMovement(
    layerName,
    x,
    y
) {

    const tile =
        getLayerTileAt(
            layerName,
            x,
            y
        );


    if (!tile) {
        return false;
    }


    const properties =
        tile.properties || {};


    if (
        properties.walkable ===
            false ||
        properties.blocked ===
            true ||
        properties.collision ===
            true
    ) {

        return true;

    }


    return false;

}


function isPlayerWalkableTile(
    x,
    y
) {

    if (
        x < 0 ||
        y < 0 ||
        x >= mapWidth ||
        y >= mapHeight
    ) {

        return false;

    }


    /*
        Collision-laget er den eksplisitte
        blokkeringen vi maler i Tiled.
    */

    if (
        tileHasCollisionMarker(
            x,
            y
        )
    ) {

        return false;

    }


    const hasGround =
        getLayerGidAt(
            "ground",
            x,
            y
        ) !== 0;


    const hasWater =
        getLayerGidAt(
            "water",
            x,
            y
        ) !== 0;


    /*
        Verdenen din er bygget med water som
        base og ground malt over land.

        Derfor er water bare faktisk vann når
        det IKKE finnes ground på samme tile.
    */

    if (
        hasWater &&
        !hasGround
    ) {

        return false;

    }


    /*
        Foreløpig krever player movement land.
        Dette gjør walkability forutsigbar mens
        vi bygger world-systemet videre.
    */

    if (!hasGround) {

        return false;

    }


    const natureName =
        isNatureRemoved(
            x,
            y
        )
            ? null
            : getTileName(
                "nature",
                x,
                y
            );


    if (
        natureName === "tree" ||
        natureName === "stone"
    ) {

        return false;

    }


    /*
        Buildings blokkeres av de egne Tiled
        rectangle-objektene via worldState.buildings.

        Vi sjekker ikke gamle tile-properties her
        lenger. Collision skal være eksplisitt og
        lett å kontrollere i Tiled.
    */

    for (
        const building
        of worldState.buildings
    ) {

        if (
            buildingOccupiesTile(
                building,
                x,
                y
            )
        ) {

            return false;

        }

    }


    return true;

}

function getRequestedPlayerDirection() {

    const directions = {

        ArrowUp: {
            x: 0,
            y: -1,
            facing: "north"
        },

        KeyW: {
            x: 0,
            y: -1,
            facing: "north"
        },

        ArrowDown: {
            x: 0,
            y: 1,
            facing: "south"
        },

        KeyS: {
            x: 0,
            y: 1,
            facing: "south"
        },

        ArrowLeft: {
            x: -1,
            y: 0,
            facing: "west"
        },

        KeyA: {
            x: -1,
            y: 0,
            facing: "west"
        },

        ArrowRight: {
            x: 1,
            y: 0,
            facing: "east"
        },

        KeyD: {
            x: 1,
            y: 0,
            facing: "east"
        }

    };


    if (
        playerInput.lastDirection &&
        playerInput.pressed.has(
            playerInput.lastDirection
        )
    ) {

        return (
            directions[
                playerInput.lastDirection
            ] ||
            null
        );

    }


    for (
        const code
        of playerInput.pressed
    ) {

        if (directions[code]) {

            return directions[code];

        }

    }


    return null;

}


let lastPlayerBlockedDebug =
    null;


function getPlayerBlockedReason(
    x,
    y
) {

    if (
        x < 0 ||
        y < 0 ||
        x >= mapWidth ||
        y >= mapHeight
    ) {
        return "outside map";
    }

    if (tileHasCollisionMarker(x, y)) {
        return "collision layer";
    }

    const hasGround =
        getLayerGidAt("ground", x, y) !== 0;

    const hasWater =
        getLayerGidAt("water", x, y) !== 0;

    if (hasWater && !hasGround) {
        return "water";
    }

    if (!hasGround) {
        return "no ground";
    }

    const natureName =
        isNatureRemoved(x, y)
            ? null
            : getTileName("nature", x, y);

    if (
        natureName === "tree" ||
        natureName === "stone"
    ) {
        return natureName;
    }

    for (const building of worldState.buildings) {
        if (buildingOccupiesTile(building, x, y)) {
            return `building:${building.type}`;
        }
    }

    return "unknown";
}


function tryStartPlayerMove() {

    if (
        !player.initialized ||
        player.moving
    ) {

        return false;

    }


    const direction =
        getRequestedPlayerDirection();


    if (!direction) {
        return false;
    }


    player.facing =
        direction.facing;


    const targetX =
        player.tileX +
        direction.x;


    const targetY =
        player.tileY +
        direction.y;


    if (
        !isPlayerWalkableTile(
            targetX,
            targetY
        )
    ) {

        const blockedKey =
            `${targetX},${targetY}:${getPlayerBlockedReason(targetX, targetY)}`;


        if (
            blockedKey !==
            lastPlayerBlockedDebug
        ) {

            lastPlayerBlockedDebug =
                blockedKey;


            console.log(
                `Player movement blocked at ${targetX}, ${targetY}: ${getPlayerBlockedReason(targetX, targetY)}`
            );

        }


        return false;

    }


    lastPlayerBlockedDebug =
        null;


    player.fromX =
        player.tileX +
        0.5;

    player.fromY =
        player.tileY +
        0.5;


    player.toX =
        targetX +
        0.5;

    player.toY =
        targetY +
        0.5;


    player.moveProgress =
        0;

    player.moving =
        true;


    return true;

}


function updatePlayerMovement(
    deltaTime
) {

    if (
        !RPG_MODE ||
        !player.initialized
    ) {

        return;

    }


    if (!player.moving) {

        tryStartPlayerMove();

        return;

    }


    player.moveProgress +=
        deltaTime *
        PLAYER_MOVE_SPEED;


    const progress =
        Math.min(
            1,
            player.moveProgress
        );


    player.x =
        player.fromX +
        (
            player.toX -
            player.fromX
        ) *
        progress;


    player.y =
        player.fromY +
        (
            player.toY -
            player.fromY
        ) *
        progress;


    if (
        progress < 1
    ) {

        return;

    }


    player.tileX =
        Math.floor(
            player.toX
        );

    player.tileY =
        Math.floor(
            player.toY
        );


    player.x =
        player.tileX +
        0.5;

    player.y =
        player.tileY +
        0.5;


    player.moving =
        false;

    player.moveProgress =
        0;


    /*
        Hvis spilleren fortsatt holder en
        retning inne, starter neste tile
        umiddelbart.
    */

    tryStartPlayerMove();

}


function updateCameraFollowPlayer(
    instant = false
) {

    if (
        !RPG_MODE ||
        !mapLoaded ||
        !player.initialized
    ) {

        return;

    }


    const viewportWidth =
        canvas.clientWidth /
        camera.zoom;


    const viewportHeight =
        canvas.clientHeight /
        camera.zoom;


    let targetX =
        player.x *
        tileWidth -
        viewportWidth /
        2;


    let targetY =
        player.y *
        tileHeight -
        viewportHeight /
        2;


    const worldWidth =
        mapWidth *
        tileWidth;


    const worldHeight =
        mapHeight *
        tileHeight;


    const maxX =
        Math.max(
            0,
            worldWidth -
            viewportWidth
        );


    const maxY =
        Math.max(
            0,
            worldHeight -
            viewportHeight
        );


    targetX =
        Math.max(
            0,
            Math.min(
                maxX,
                targetX
            )
        );


    targetY =
        Math.max(
            0,
            Math.min(
                maxY,
                targetY
            )
        );


    if (instant) {

        camera.x =
            targetX;

        camera.y =
            targetY;

        return;

    }


    /*
        Litt mykere kamerafølge.
    */

    const followStrength =
        0.22;


    camera.x +=
        (
            targetX -
            camera.x
        ) *
        followStrength;


    camera.y +=
        (
            targetY -
            camera.y
        ) *
        followStrength;

}


function drawPlayer() {

    if (
        !RPG_MODE ||
        !player.initialized
    ) {

        return;

    }


    const worldX =
        player.x *
        tileWidth;


    const worldY =
        player.y *
        tileHeight;


    const size =
        Math.max(
            8,
            Math.floor(
                tileWidth *
                0.38
            )
        );


    ctx.save();


    ctx.fillStyle =
        "#f1e6ca";


    ctx.fillRect(
        worldX -
        size / 2,

        worldY -
        size / 2,

        size,
        size
    );


    ctx.strokeStyle =
        "#29251e";


    ctx.lineWidth =
        2 /
        camera.zoom;


    ctx.strokeRect(
        worldX -
        size / 2,

        worldY -
        size / 2,

        size,
        size
    );


    /*
        Enkel retningsmarkør så vi allerede
        har en facing-verdi til Interact senere.
    */

    let markerX =
        worldX;

    let markerY =
        worldY;


    if (
        player.facing ===
        "north"
    ) {

        markerY -=
            size * 0.75;

    }
    else if (
        player.facing ===
        "south"
    ) {

        markerY +=
            size * 0.75;

    }
    else if (
        player.facing ===
        "west"
    ) {

        markerX -=
            size * 0.75;

    }
    else {

        markerX +=
            size * 0.75;

    }


    ctx.fillStyle =
        "#29251e";


    ctx.fillRect(
        markerX - 2,
        markerY - 2,
        4,
        4
    );


    ctx.restore();

}


function shouldIgnorePlayerKeyboardInput(
    event
) {

    const target =
        event.target;


    return (
        target instanceof
            HTMLInputElement ||
        target instanceof
            HTMLTextAreaElement ||
        target instanceof
            HTMLSelectElement ||
        target instanceof
            HTMLButtonElement ||
        target?.isContentEditable ||
        settingsOpen ||
        namingSettlement
    );

}


window.addEventListener(
    "keydown",
    (event) => {

        if (!RPG_MODE) {
            return;
        }


        const movementCodes =
            new Set([
                "KeyW",
                "KeyA",
                "KeyS",
                "KeyD",
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight"
            ]);


        if (
            !movementCodes.has(
                event.code
            )
        ) {

            return;

        }


        if (
            shouldIgnorePlayerKeyboardInput(
                event
            )
        ) {

            return;

        }


        event.preventDefault();


        playerInput.pressed.add(
            event.code
        );


        playerInput.lastDirection =
            event.code;

    }
);


window.addEventListener(
    "keyup",
    (event) => {

        if (!RPG_MODE) {
            return;
        }


        playerInput.pressed.delete(
            event.code
        );


        if (
            playerInput.lastDirection ===
            event.code
        ) {

            playerInput.lastDirection =
                null;

        }

    }
);


/* =========================================================
   CAMERA
   ========================================================= */

function centerCameraOnMap() {

    if (!mapLoaded) {
        return;
    }


    const worldWidth =
        mapWidth *
        tileWidth;

    const worldHeight =
        mapHeight *
        tileHeight;


    camera.x =
        worldWidth / 2 -
        canvas.clientWidth /
        camera.zoom /
        2;


    camera.y =
        worldHeight / 2 -
        canvas.clientHeight /
        camera.zoom /
        2;

}



/* =========================================================
   MOUSE MOVEMENT
   ========================================================= */

canvas.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            canvas.getBoundingClientRect();


        mouse.screenX =
            event.clientX -
            rect.left;

        mouse.screenY =
            event.clientY -
            rect.top;


        mouse.insideCanvas =
            true;


        /*
            Hvis scroll-knappen holdes inne,
            dra kameraet sammen med musen.
        */

        if (cameraDrag.active) {

            const deltaX =
                event.clientX -
                cameraDrag.lastX;

            const deltaY =
                event.clientY -
                cameraDrag.lastY;


            camera.x -=
                deltaX /
                camera.zoom;

            camera.y -=
                deltaY /
                camera.zoom;


            cameraDrag.lastX =
                event.clientX;

            cameraDrag.lastY =
                event.clientY;

        }

    }
);



canvas.addEventListener(
    "mousedown",
    (event) => {

        /*
            Middle mouse button / scroll button
        */

        if (event.button !== 1) {
            return;
        }


        if (RPG_MODE) {
            return;
        }


        if (
            settingsOpen ||
            namingSettlement
        ) {

            return;

        }


        event.preventDefault();


        cameraDrag.active =
            true;


        cameraDrag.lastX =
            event.clientX;

        cameraDrag.lastY =
            event.clientY;


        canvas.style.cursor =
            "grabbing";

    }
);

window.addEventListener(
    "mouseup",
    (event) => {

        if (event.button !== 1) {
            return;
        }


        cameraDrag.active =
            false;


        canvas.style.cursor =
            (
                buildMode ||
                harvestMode
            )
                ? "crosshair"
                : "grab";

    }
);

canvas.addEventListener(
    "auxclick",
    (event) => {

        if (event.button === 1) {

            event.preventDefault();

        }

    }
);


canvas.addEventListener(
    "mouseenter",
    () => {

        mouse.insideCanvas =
            true;

    }
);


canvas.addEventListener(
    "mouseleave",
    () => {

        mouse.insideCanvas =
            false;

    }
);


/* =========================================================
   SELECT TILE
   ========================================================= */

canvas.addEventListener(
    "mousedown",
    (event) => {

        /*
            Left mouse button only.
        */

        if (event.button !== 0) {
            return;
        }



        if (
            settingsOpen ||
            namingSettlement
        ) {

            return;

        }

        if (buildMode) {

            if (
                buildMode === "road"
            ) {

                placeRoad(
                    mouse.tileX,
                    mouse.tileY
                );

            }
            else {

                placeBuilding(
                    buildMode,
                    mouse.tileX,
                    mouse.tileY
                );

            }

            return;

        }

        if (
            harvestMode === "tree"
        ) {

            harvestTree(
                mouse.tileX,
                mouse.tileY
            );

            return;

        }

        if (!mapLoaded) {
            return;
        }


        const tileInfo =
            getTileInfo(
                mouse.tileX,
                mouse.tileY
            );


        if (!tileInfo) {
            return;
        }


        selectedTile = {

            x:
                mouse.tileX,

            y:
                mouse.tileY

        };


        console.log(
            "Selected tile:",
            tileInfo
        );

    }
);


/* =========================================================
   ZOOM
   ========================================================= */

canvas.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();


        if (!mapLoaded) {
            return;
        }


        const worldBeforeZoomX =
            camera.x +
            mouse.screenX /
            camera.zoom;


        const worldBeforeZoomY =
            camera.y +
            mouse.screenY /
            camera.zoom;


        if (event.deltaY < 0) {

            camera.zoom *=
                1.1;

        }
        else {

            camera.zoom /=
                1.1;

        }


        camera.zoom =
            Math.max(
                camera.minZoom,
                Math.min(
                    camera.maxZoom,
                    camera.zoom
                )
            );


        camera.x =
            worldBeforeZoomX -
            mouse.screenX /
            camera.zoom;


        camera.y =
            worldBeforeZoomY -
            mouse.screenY /
            camera.zoom;

    },
    {
        passive: false
    }
);

/* =========================================================
   PEOPLE MENU
   ========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            "\"",
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


function getSettlerById(
    settlerId
) {

    return (
        worldState.settlers.find(
            settler =>
                settler.id ===
                settlerId
        ) || null
    );

}


function getFamilyMembers(
    family
) {

    if (!family) {
        return [];
    }


    const members =
        [];


    for (
        const memberId
        of family.memberIds
    ) {

        const settler =
            getSettlerById(
                memberId
            );


        if (settler) {

            members.push(
                settler
            );

        }

    }


    return members;

}


function getPeopleBuildingName(
    buildingId
) {

    if (
        buildingId === null ||
        buildingId === undefined
    ) {

        return "None";

    }


    const building =
        getBuildingById(
            buildingId
        );


    if (!building) {

        return "Unknown";

    }


    const def =
        BUILDING_DEFS[
            building.type
        ];


    return (
        def?.name ||
        building.type
    );

}


function getSettlerPeopleStatus(
    settler
) {

    const runtime =
        npcRuntime.get(
            settler.id
        );


    if (!runtime) {

        return "At home";

    }


    return getSettlerWorkStatus(
        settler
    );

}


function openPeopleMenu() {

    if (
        settingsOpen ||
        namingSettlement ||
        buildModeActive
    ) {

        return;

    }

    closeEconomyMenu();

    closeInventoryMenu();

    closeCharacterMenu();

    closeBuildingInfo();

    cancelHarvestMode();


    peopleMenuOpen =
        true;


    peopleMenuView =
        "families";


    selectedPeopleFamilyId =
        null;


    selectedPeopleSettlerId =
        null;


    peopleMenuSearchInput.value =
        "";


    peopleMenuSignature =
        null;


    peopleMenuRefreshAccumulator =
        0;


    peopleToolbarButton.classList.add(
        "active"
    );


    peopleMenuLayer.classList.add(
        "open"
    );


    renderPeopleMenu();

}


function closePeopleMenu() {

    peopleMenuOpen =
        false;


    selectedPeopleFamilyId =
        null;


    selectedPeopleSettlerId =
        null;


    peopleMenuSignature =
        null;


    peopleToolbarButton.classList.remove(
        "active"
    );


    peopleMenuLayer.classList.remove(
        "open"
    );

}


function renderPeopleFamilyList() {

    peopleMenuTitle.textContent =
        "People";


    peopleMenuBackButton.hidden =
        true;


    peopleMenuSearchWrap.hidden =
        false;


    const search =
        peopleMenuSearchInput
            .value
            .trim()
            .toLowerCase();


    const families =
        [...worldState.families]
            .filter(
                family => {

                    if (!search) {
                        return true;
                    }


                    return (
                        family.lastName
                            .toLowerCase()
                            .includes(
                                search
                            )
                    );

                }
            )
            .sort(
                (a, b) =>
                    a.lastName.localeCompare(
                        b.lastName
                    )
            );


    if (
        families.length === 0
    ) {

        peopleMenuContent.innerHTML =
            `
            <div class="people-menu-empty">
                No families found.
            </div>
            `;


        return;

    }


    let html =
        "";


    for (
        const family
        of families
    ) {

        const members =
            getFamilyMembers(
                family
            );


        const memberText =
            members.length === 1
                ? "1 member"
                : `${members.length} members`;


        html +=
            `
            <button
                class="people-list-entry"
                data-family-id="${family.id}"
            >

                <span class="people-entry-name">
                    ${escapeHTML(
                        family.lastName
                    )} Family
                </span>

                <span class="people-entry-secondary">
                    ${memberText}
                </span>

            </button>
            `;

    }


    peopleMenuContent.innerHTML =
        html;

}


function renderPeopleFamilyView() {

    const family =
        getFamilyById(
            selectedPeopleFamilyId
        );


    if (!family) {

        peopleMenuView =
            "families";


        selectedPeopleFamilyId =
            null;


        renderPeopleMenu();

        return;

    }


    peopleMenuTitle.textContent =
        `${family.lastName} Family`;


    peopleMenuBackButton.hidden =
        false;


    peopleMenuSearchWrap.hidden =
        true;


    const members =
        getFamilyMembers(
            family
        );


    let html =
        `
        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Family:
                </span>

                ${escapeHTML(
                    family.lastName
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Home:
                </span>

                ${escapeHTML(
                    getPeopleBuildingName(
                        family.homeId
                    )
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Arrived:
                </span>

                Day ${family.foundedDay}
            </div>

            <div>
                <span class="people-info-label">
                    Members:
                </span>

                ${members.length}
            </div>

        </div>
        `;


    if (
        members.length === 0
    ) {

        html +=
            `
            <div class="people-menu-empty">
                No family members.
            </div>
            `;

    }


    for (
        const settler
        of members
    ) {

        const relation =
            settler.relation ||
            "Member";


        html +=
            `
            <button
                class="people-list-entry"
                data-settler-id="${settler.id}"
            >

                <span class="people-entry-name">
                    ${escapeHTML(
                        settler.name
                    )}
                </span>

                <span class="people-entry-secondary">
                    ${escapeHTML(
                        relation
                    )}<br>
                    Age ${settler.age}
                </span>

            </button>
            `;

    }


    peopleMenuContent.innerHTML =
        html;

}


function renderPeopleSettlerView() {

    const settler =
        getSettlerById(
            selectedPeopleSettlerId
        );


    if (!settler) {

        peopleMenuView =
            "families";


        selectedPeopleSettlerId =
            null;


        renderPeopleMenu();

        return;

    }


    const family =
        getFamilyById(
            settler.familyId
        );


    peopleMenuTitle.textContent =
        settler.name;


    peopleMenuBackButton.hidden =
        false;


    peopleMenuSearchWrap.hidden =
        true;


    const job =
        settler.job ||
        (
            canSettlerWork(
                settler
            )
                ? "Unemployed"
                : "Child"
        );


    const workplace =
        settler.workplaceId !==
        null
            ? getPeopleBuildingName(
                settler.workplaceId
            )
            : "None";


    const home =
        getPeopleBuildingName(
            settler.homeId
        );


    const familyName =
        family
            ? `${family.lastName} Family`
            : "None";


    const status =
        getSettlerPeopleStatus(
            settler
        );

    const happiness =
        Number.isFinite(
            settler.happiness
        )
            ? settler.happiness
            : DEFAULT_SETTLER_HAPPINESS;


    const happinessLabel =
        getHappinessLabel(
            happiness
        );


    const happinessChange =
        Number.isFinite(
            settler.happinessChangeToday
        )
            ? settler.happinessChangeToday
            : 0;


    const happinessChangeText =
        happinessChange > 0
            ? `+${happinessChange}`
            : `${happinessChange}`;


    const foodNeed =
        family &&
        family.lastMealRequired > 0
            ? (
                family.lastMealMissing > 0
                    ? "Household shortage"
                    : "Fed"
            )
            : "Not evaluated yet";


    const housingNeed =
        settler.homeId !== null
            ? "Housed"
            : "Homeless";


    const familyNeed =
        family &&
        getFamilyMembers(
            family
        ).length > 1
            ? "Living with family"
            : "Single household";


    const employmentNeed =
        !canSettlerWork(
            settler
        )
            ? "Child"
            : (
                settler.workplaceId !==
                null
                    ? "Employed"
                    : "Unemployed"
            );

    peopleMenuContent.innerHTML =
        `
        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Name:
                </span>

                ${escapeHTML(
                    settler.name
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Age:
                </span>

                ${settler.age}
            </div>

            <div>
                <span class="people-info-label">
                    Gender:
                </span>

                ${escapeHTML(
                    settler.gender
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Family:
                </span>

                ${escapeHTML(
                    familyName
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Family role:
                </span>

                ${escapeHTML(
                    settler.relation ||
                    "Member"
                )}
            </div>

        </div>

        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Happiness:
                </span>

                ${happiness} / 100
                — ${escapeHTML(
                    happinessLabel
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Daily change:
                </span>

                ${happinessChangeText}
            </div>

            <br>

            <div>
                <span class="people-info-label">
                    Food:
                </span>

                ${escapeHTML(
                    foodNeed
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Housing:
                </span>

                ${escapeHTML(
                    housingNeed
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Family:
                </span>

                ${escapeHTML(
                    familyNeed
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Employment:
                </span>

                ${escapeHTML(
                    employmentNeed
                )}
            </div>

        </div>

        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Home:
                </span>

                ${escapeHTML(
                    home
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Job:
                </span>

                ${escapeHTML(
                    job
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Workplace:
                </span>

                ${escapeHTML(
                    workplace
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Status:
                </span>

                ${escapeHTML(
                    status
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Arrived:
                </span>

                Day ${settler.arrivedDay}
            </div>

        </div>
        `;

}


function renderPeopleMenu() {

    if (!peopleMenuOpen) {
        return;
    }


    if (
        peopleMenuView ===
        "family"
    ) {

        renderPeopleFamilyView();

    }
    else if (
        peopleMenuView ===
        "settler"
    ) {

        renderPeopleSettlerView();

    }
    else {

        renderPeopleFamilyList();

    }


    peopleMenuSignature =
        getPeopleMenuSignature();

}


function getPeopleMenuSignature() {

    const familyData =
        worldState.families.map(
            family => [

                family.id,

                family.lastName,

                family.homeId,

                family.foundedDay,

                family.memberIds.join(
                    ","
                )

            ]
        );


    const settlerData =
        worldState.settlers.map(
            settler => {

                const runtime =
                    npcRuntime.get(
                        settler.id
                    );


                return [

                    settler.id,

                    settler.name,

                    settler.age,

                    settler.familyId,

                    settler.homeId,

                    settler.relation,

                    settler.job,

                    settler.workplaceId,

                    settler.happiness,

                    settler.happinessTarget,

                    settler.happinessChangeToday,

                    getFamilyById(
                        settler.familyId
                    )?.lastMealMissing || 0,

                    runtime
                        ? runtime.state
                        : null,

                    runtime
                        ? runtime.blockedFromState
                        : null

                ];

            }
        );


    return JSON.stringify({

        view:
            peopleMenuView,

        familyId:
            selectedPeopleFamilyId,

        settlerId:
            selectedPeopleSettlerId,

        search:
            peopleMenuSearchInput.value,

        families:
            familyData,

        settlers:
            settlerData

    });

}


function refreshPeopleMenu(
    deltaTime
) {

    if (!peopleMenuOpen) {
        return;
    }


    peopleMenuRefreshAccumulator +=
        deltaTime;


    /*
        Fire ganger i sekundet holder
        mer enn nok for denne typen UI.
    */

    if (
        peopleMenuRefreshAccumulator <
        0.25
    ) {

        return;

    }


    peopleMenuRefreshAccumulator =
        0;


    const newSignature =
        getPeopleMenuSignature();


    if (
        newSignature ===
        peopleMenuSignature
    ) {

        return;

    }


    renderPeopleMenu();

}


peopleToolbarButton.addEventListener(
    "click",
    () => {

        if (peopleMenuOpen) {

            closePeopleMenu();

        }
        else {

            openPeopleMenu();

        }

    }
);


peopleMenuCloseButton.addEventListener(
    "click",
    () => {

        closePeopleMenu();

    }
);


peopleMenuBackButton.addEventListener(
    "click",
    () => {

        if (
            peopleMenuView ===
            "settler"
        ) {

            peopleMenuView =
                "family";


            selectedPeopleSettlerId =
                null;

        }
        else if (
            peopleMenuView ===
            "family"
        ) {

            peopleMenuView =
                "families";


            selectedPeopleFamilyId =
                null;

        }


        peopleMenuSignature =
            null;


        renderPeopleMenu();

    }
);


peopleMenuSearchInput.addEventListener(
    "input",
    () => {

        peopleMenuSignature =
            null;


        renderPeopleMenu();

    }
);


peopleMenuContent.addEventListener(
    "click",
    (event) => {

        const familyButton =
            event.target.closest(
                "[data-family-id]"
            );


        if (familyButton) {

            selectedPeopleFamilyId =
                Number(
                    familyButton.dataset.familyId
                );


            selectedPeopleSettlerId =
                null;


            peopleMenuView =
                "family";


            peopleMenuSignature =
                null;


            renderPeopleMenu();

            return;

        }


        const settlerButton =
            event.target.closest(
                "[data-settler-id]"
            );


        if (settlerButton) {

            selectedPeopleSettlerId =
                Number(
                    settlerButton.dataset.settlerId
                );


            peopleMenuView =
                "settler";


            peopleMenuSignature =
                null;


            renderPeopleMenu();

        }

    }
);

/* =========================================================
   INVENTORY MENU
   ========================================================= */
function getPlayerInventoryAmount(
    itemId
) {

    return Math.max(
        0,
        Number(
            playerCharacter.inventory[
                itemId
            ]
        ) ||
        0
    );

}


function addPlayerInventoryItem(
    itemId,
    amount = 1
) {

    if (
        !itemId ||
        amount <= 0
    ) {

        return false;

    }


    const amountToAdd =
        Math.floor(
            amount
        );


    if (
        amountToAdd <= 0
    ) {

        return false;

    }


    const currentAmount =
        getPlayerInventoryAmount(
            itemId
        );


    playerCharacter.inventory[
        itemId
    ] =
        currentAmount +
        amountToAdd;


    if (inventoryMenuOpen) {

        renderInventoryMenu();

    }


    return true;

}


function removePlayerInventoryItem(
    itemId,
    amount = 1
) {

    const currentAmount =
        getPlayerInventoryAmount(
            itemId
        );


    const amountToRemove =
        Math.max(
            0,
            Math.floor(
                amount
            )
        );


    if (
        amountToRemove <= 0 ||
        currentAmount <
            amountToRemove
    ) {

        return false;

    }


    const remaining =
        currentAmount -
        amountToRemove;


    if (
        remaining > 0
    ) {

        playerCharacter.inventory[
            itemId
        ] =
            remaining;

    }
    else {

        delete playerCharacter.inventory[
            itemId
        ];


        /*
            Hvis siste eksemplar av et item
            forsvinner, kan det heller ikke
            forbli equipped.
        */

        for (
            const slotName
            of Object.keys(
                playerCharacter.equipment
            )
        ) {

            if (
                playerCharacter.equipment[
                    slotName
                ] === itemId
            ) {

                playerCharacter.equipment[
                    slotName
                ] =
                    null;

            }

        }

    }


    if (inventoryMenuOpen) {

        renderInventoryMenu();

    }


    if (characterMenuOpen) {

        renderCharacterMenu();

    }


    return true;

}


function equipPlayerItem(
    itemId
) {

    const def =
        getItemDef(
            itemId
        );


    if (
        !def ||
        !def.equipSlot ||
        getPlayerInventoryAmount(
            itemId
        ) <= 0
    ) {

        return false;

    }


    const slotName =
        def.equipSlot;


    if (
        !Object.hasOwn(
            playerCharacter.equipment,
            slotName
        )
    ) {

        return false;

    }


    playerCharacter.equipment[
        slotName
    ] =
        itemId;


    if (inventoryMenuOpen) {

        renderInventoryMenu();

    }


    if (characterMenuOpen) {

        renderCharacterMenu();

    }


    return true;

}


function unequipPlayerItem(
    itemId
) {

    let changed =
        false;


    for (
        const slotName
        of Object.keys(
            playerCharacter.equipment
        )
    ) {

        if (
            playerCharacter.equipment[
                slotName
            ] === itemId
        ) {

            playerCharacter.equipment[
                slotName
            ] =
                null;


            changed =
                true;

        }

    }


    if (
        changed &&
        inventoryMenuOpen
    ) {

        renderInventoryMenu();

    }


    if (
        changed &&
        characterMenuOpen
    ) {

        renderCharacterMenu();

    }


    return changed;

}


function isPlayerItemEquipped(
    itemId
) {

    return Object.values(
        playerCharacter.equipment
    ).includes(
        itemId
    );

}


function getPlayerInventoryEntries() {

    const entries =
        [];


    for (
        const [itemId, rawAmount]
        of Object.entries(
            playerCharacter.inventory
        )
    ) {

        const amount =
            Math.max(
                0,
                Math.floor(
                    Number(
                        rawAmount
                    ) ||
                    0
                )
            );


        if (
            amount <= 0
        ) {

            continue;

        }


        const def =
            getItemDef(
                itemId
            );


        entries.push({

            id:
                itemId,

            amount:
                amount,

            def:
                def

        });

    }


    /*
        Inventory sorteres alfabetisk
        etter faktisk item-navn.
    */

    entries.sort(
        (a, b) =>
            getItemDisplayName(
                a.id
            ).localeCompare(
                getItemDisplayName(
                    b.id
                )
            )
    );


    return entries;

}


function closeAllSideMenus() {

    closePeopleMenu();

    closeEconomyMenu();

    closeInventoryMenu();

    closeCharacterMenu();

}


function openInventoryMenu() {

    if (
        settingsOpen ||
        namingSettlement ||
        buildModeActive
    ) {

        return;

    }


    closePeopleMenu();

    closeEconomyMenu();

    closeCharacterMenu();

    closeBuildingInfo();

    cancelHarvestMode();


    inventoryMenuOpen =
        true;


    inventoryMenuView =
        "list";


    selectedInventoryItemId =
        null;


    inventoryToolbarButton.classList.add(
        "active"
    );


    inventoryMenuLayer.classList.add(
        "open"
    );


    renderInventoryMenu();

}


function closeInventoryMenu() {

    inventoryMenuOpen =
        false;


    inventoryMenuView =
        "list";


    selectedInventoryItemId =
        null;


    inventoryToolbarButton.classList.remove(
        "active"
    );


    inventoryMenuLayer.classList.remove(
        "open"
    );

}


function renderInventoryList() {

    inventoryMenuTitle.textContent =
        "Inventory";


    inventoryMenuBackButton.hidden =
        true;


    const items =
        getPlayerInventoryEntries();


    if (
        items.length === 0
    ) {

        inventoryMenuContent.innerHTML =
            `
            <div class="inventory-empty">
                Inventory is empty.
            </div>
            `;


        return;

    }


    let html =
        "";


    for (
        const item
        of items
    ) {

        const itemName =
            getItemDisplayName(
                item.id
            );


        const equippedText =
            isPlayerItemEquipped(
                item.id
            )
                ? "Equipped"
                : `x${item.amount}`;


        html +=
            `
            <button
                class="inventory-item"
                data-inventory-item-id="${escapeHTML(
                    item.id
                )}"
            >

                <span class="inventory-item-name">
                    ${escapeHTML(
                        itemName
                    )}
                </span>

                <span class="inventory-item-amount">
                    ${escapeHTML(
                        equippedText
                    )}
                </span>

            </button>
            `;

    }


    inventoryMenuContent.innerHTML =
        html;

}


function renderInventoryItemView() {

    const itemId =
        selectedInventoryItemId;


    if (
        !itemId ||
        getPlayerInventoryAmount(
            itemId
        ) <= 0
    ) {

        inventoryMenuView =
            "list";


        selectedInventoryItemId =
            null;


        renderInventoryList();

        return;

    }


    const def =
        getItemDef(
            itemId
        );


    const itemName =
        getItemDisplayName(
            itemId
        );


    const amount =
        getPlayerInventoryAmount(
            itemId
        );


    inventoryMenuTitle.textContent =
        itemName;


    inventoryMenuBackButton.hidden =
        false;


    const category =
        def?.category ||
        "Unknown";


    const description =
        def?.description ||
        "No description available.";


    const weight =
        Number.isFinite(
            def?.weight
        )
            ? def.weight
            : "-";


    const value =
        Number.isFinite(
            def?.value
        )
            ? def.value
            : "-";


    const equipped =
        isPlayerItemEquipped(
            itemId
        );


    let actionHTML =
        "";


    if (
        def?.equipSlot
    ) {

        actionHTML =
            `
            <button
                class="inventory-action-button"
                data-inventory-action="${
                    equipped
                        ? "unequip"
                        : "equip"
                }"
                data-inventory-item-id="${escapeHTML(
                    itemId
                )}"
            >
                ${
                    equipped
                        ? "Unequip"
                        : "Equip"
                }
            </button>
            `;

    }


    inventoryMenuContent.innerHTML =
        `
        <div class="inventory-info-section">

            <div class="inventory-info-name">
                ${escapeHTML(
                    itemName
                )}
            </div>

            <div class="inventory-info-description">
                ${escapeHTML(
                    description
                )}
            </div>

        </div>


        <div class="inventory-info-section">

            <div>
                <span class="inventory-info-label">
                    Type:
                </span>

                ${escapeHTML(
                    category
                )}
            </div>

            <div>
                <span class="inventory-info-label">
                    Amount:
                </span>

                ${amount}
            </div>

            <div>
                <span class="inventory-info-label">
                    Weight:
                </span>

                ${weight}
            </div>

            <div>
                <span class="inventory-info-label">
                    Value:
                </span>

                ${value}
            </div>

            ${
                def?.equipSlot
                    ? `
                    <div>
                        <span class="inventory-info-label">
                            Equipment Slot:
                        </span>

                        ${escapeHTML(
                            def.equipSlot
                        )}
                    </div>

                    <div>
                        <span class="inventory-info-label">
                            Equipped:
                        </span>

                        ${
                            equipped
                                ? "Yes"
                                : "No"
                        }
                    </div>
                    `
                    : ""
            }

        </div>

        ${actionHTML}
        `;

}


function renderInventoryMenu() {

    if (!inventoryMenuOpen) {
        return;
    }


    if (
        inventoryMenuView ===
        "item"
    ) {

        renderInventoryItemView();

    }
    else {

        renderInventoryList();

    }

}


inventoryToolbarButton.addEventListener(
    "click",
    () => {

        if (inventoryMenuOpen) {

            closeInventoryMenu();

        }
        else {

            openInventoryMenu();

        }

    }
);


inventoryMenuCloseButton.addEventListener(
    "click",
    () => {

        closeInventoryMenu();

    }
);


inventoryMenuBackButton.addEventListener(
    "click",
    () => {

        inventoryMenuView =
            "list";


        selectedInventoryItemId =
            null;


        renderInventoryMenu();

    }
);


inventoryMenuContent.addEventListener(
    "click",
    (event) => {

        const itemButton =
            event.target.closest(
                "[data-inventory-item-id]"
            );


        if (!itemButton) {

            return;

        }


        const itemId =
            itemButton.dataset
                .inventoryItemId;


        const action =
            itemButton.dataset
                .inventoryAction ||
            null;


        if (
            action === "equip"
        ) {

            equipPlayerItem(
                itemId
            );


            renderInventoryItemView();

            return;

        }


        if (
            action === "unequip"
        ) {

            unequipPlayerItem(
                itemId
            );


            renderInventoryItemView();

            return;

        }


        selectedInventoryItemId =
            itemId;


        inventoryMenuView =
            "item";


        renderInventoryItemView();

    }
);

/* =========================================================
   CHARACTER MENU
   ========================================================= */

function openCharacterMenu() {

    if (
        settingsOpen ||
        namingSettlement ||
        buildModeActive
    ) {

        return;

    }


    closePeopleMenu();

    closeEconomyMenu();

    closeInventoryMenu();

    closeBuildingInfo();

    cancelHarvestMode();


    characterMenuOpen =
        true;


    characterToolbarButton.classList.add(
        "active"
    );


    characterMenuLayer.classList.add(
        "open"
    );


    renderCharacterMenu();

}


function closeCharacterMenu() {

    characterMenuOpen =
        false;


    characterToolbarButton.classList.remove(
        "active"
    );


    characterMenuLayer.classList.remove(
        "open"
    );

}


function renderCharacterMenu() {

    if (!characterMenuOpen) {
        return;
    }


    const health =
        playerCharacter.health;


    const attributes =
        playerCharacter.attributes;


    characterMenuContent.innerHTML =
        `
        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Name:
                </span>

                ${escapeHTML(
                    playerCharacter.name
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Race:
                </span>

                ${escapeHTML(
                    playerCharacter.race
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Background:
                </span>

                ${escapeHTML(
                    playerCharacter.background
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Level:
                </span>

                ${playerCharacter.level}
            </div>

            <div>
                <span class="people-info-label">
                    Experience:
                </span>

                ${playerCharacter.experience}
                /
                ${playerCharacter.experienceToNextLevel}
            </div>

            <div>
                <span class="people-info-label">
                    Coins:
                </span>

                ${playerCharacter.coins}
            </div>

        </div>


        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Health:
                </span>

                ${health.current}
                /
                ${health.max}
            </div>

        </div>


        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Strength:
                </span>

                ${attributes.strength}
            </div>

            <div>
                <span class="people-info-label">
                    Agility:
                </span>

                ${attributes.agility}
            </div>

            <div>
                <span class="people-info-label">
                    Endurance:
                </span>

                ${attributes.endurance}
            </div>

            <div>
                <span class="people-info-label">
                    Intelligence:
                </span>

                ${attributes.intelligence}
            </div>

            <div>
                <span class="people-info-label">
                    Willpower:
                </span>

                ${attributes.willpower}
            </div>

        </div>


        <div class="people-info-section">

            <div>
                <span class="people-info-label">
                    Head:
                </span>

                ${escapeHTML(
                    getEquipmentDisplayName(
                        "head"
                    )
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Body:
                </span>

                ${escapeHTML(
                    getEquipmentDisplayName(
                        "body"
                    )
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Main Hand:
                </span>

                ${escapeHTML(
                    getEquipmentDisplayName(
                        "mainHand"
                    )
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Off Hand:
                </span>

                ${escapeHTML(
                    getEquipmentDisplayName(
                        "offHand"
                    )
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Legs:
                </span>

                ${escapeHTML(
                    getEquipmentDisplayName(
                        "legs"
                    )
                )}
            </div>

            <div>
                <span class="people-info-label">
                    Feet:
                </span>

                ${escapeHTML(
                    getEquipmentDisplayName(
                        "feet"
                    )
                )}
            </div>

        </div>
        `;

}


characterToolbarButton.addEventListener(
    "click",
    () => {

        if (characterMenuOpen) {

            closeCharacterMenu();

        }
        else {

            openCharacterMenu();

        }

    }
);


characterMenuCloseButton.addEventListener(
    "click",
    () => {

        closeCharacterMenu();

    }
);

/* =========================================================
   ECONOMY MENU
   ========================================================= */

function openEconomyMenu() {

    if (
        settingsOpen ||
        namingSettlement ||
        buildModeActive
    ) {

        return;

    }


    closePeopleMenu();

    closeInventoryMenu();

    closeCharacterMenu();

    closeBuildingInfo();

    cancelHarvestMode();


    economyMenuOpen =
        true;


    economyMenuSignature =
        null;


    economyMenuRefreshAccumulator =
        0;


    economyToolbarButton.classList.add(
        "active"
    );


    economyMenuLayer.classList.add(
        "open"
    );


    renderEconomyMenu();

}


function closeEconomyMenu() {

    economyMenuOpen =
        false;


    economyMenuSignature =
        null;


    economyToolbarButton.classList.remove(
        "active"
    );


    economyMenuLayer.classList.remove(
        "open"
    );

}


function getEconomyMenuSignature() {

    return JSON.stringify({

        population:
            getPopulation(),

        totalFood:
            getTotalFoodAvailable(),

        marketFood:
            getTotalMarketFood(),

        centerFood:
            getTotalCenterFood(),

        householdFood:
            getTotalHouseholdFood(),

        foodInTransit:
            getTotalFoodInTransit(),

        wood:
            worldState.resources.wood,

        stone:
            worldState.resources.stone,

        production:
            worldState.production,

        foodStatus:
            worldState.foodStatus

    });

}


function renderEconomyMenu() {

    if (!economyMenuOpen) {
        return;
    }


    const population =
        getPopulation();


    const foodProduced =
        worldState.production
            .foodToday;


    const foodWasted =
        worldState.production
            .foodWastedToday || 0;


    const foodBalance =
        foodProduced -
        population;


    const marketFood =
        getTotalMarketFood();


    const marketCapacity =
        getTotalMarketFoodCapacity();


    const centerFood =
        getTotalCenterFood();


    const centerCapacity =
        getTotalCenterFoodCapacity();


    const householdFood =
        getTotalHouseholdFood();


    const householdCapacity =
        getTotalHouseholdFoodCapacity();


    const foodInTransit =
        getTotalFoodInTransit();


    const totalFood =
        getTotalFoodAvailable();


    let foodStatusText =
        "Stable";


    let foodStatusClass =
        "economy-positive";


    if (
        worldState.foodStatus
            .shortageActive
    ) {

        foodStatusText =
            "HUNGER";


        foodStatusClass =
            "economy-negative";

    }
    else if (
        worldState.foodStatus
            .distributionShortageActive
    ) {

        foodStatusText =
            "SUPPLY SHORTAGE";


        foodStatusClass =
            "economy-negative";

    }


    const balanceClass =
        foodBalance >= 0
            ? "economy-positive"
            : "economy-negative";


    const woodProduced =
        worldState.production
            .woodToday;


    const manualWood =
        worldState.production
            .manualWoodToday;


    const totalWood =
        woodProduced +
        manualWood;


    const stoneProduced =
        worldState.production
            .stoneToday;


    economyMenuContent.innerHTML =
        `
        <div class="economy-resource">

            <div class="economy-resource-title">
                Population
            </div>

            Residents:
            ${population}

            <br>

            Food consumption:
            ${population} / day

        </div>


        <div class="economy-resource">

            <div class="economy-resource-title">
                Food
            </div>

            Status:
            <span class="${foodStatusClass}">
                ${foodStatusText}
            </span>

            <br><br>

            Total food:
            ${totalFood}

            <br>

            Settlement Center:
            ${centerFood}
            /
            ${centerCapacity}

            <br>

            Market Hall:
            ${marketFood}
            /
            ${marketCapacity}

            <br>

            Households:
            ${householdFood}
            /
            ${householdCapacity}

            <br>

            Being carried home:
            ${foodInTransit}

            <br><br>

            Produced today:
            <span class="economy-positive">
                +${foodProduced}
            </span>

            <br>

            Food wasted today:
            <span class="${
                foodWasted > 0
                    ? "economy-negative"
                    : ""
            }">
                ${foodWasted}
            </span>

            <br>

            Consumption / day:
            <span class="economy-negative">
                -${population}
            </span>

            <br>

            Production balance:
            <span class="${balanceClass}">
                ${foodBalance >= 0 ? "+" : ""}
                ${foodBalance}
            </span>

            <br><br>

            Last daily meal:
            ${worldState.foodStatus.lastConsumed}
            /
            ${worldState.foodStatus.lastRequired}

            <br>

            Hungry residents:
            ${worldState.foodStatus.hungryResidents}

            <br>

            Households unable to refill:
            ${worldState.foodStatus.householdsUnableToRefill}

            <br>

            Missing household food:
            ${worldState.foodStatus.unfilledHouseholdFood}

            <br>

            Consecutive hunger days:
            ${worldState.foodStatus.consecutiveShortageDays}

        </div>


        <div class="economy-resource">

            <div class="economy-resource-title">
                Wood
            </div>

            Stored:
            ${worldState.resources.wood}

            <br>

            Lumber Mills today:
            <span class="economy-positive">
                +${woodProduced}
            </span>

            <br>

            Gathered manually:
            <span class="economy-positive">
                +${manualWood}
            </span>

            <br>

            Total gained today:
            <span class="economy-positive">
                +${totalWood}
            </span>

        </div>


        <div class="economy-resource">

            <div class="economy-resource-title">
                Stone
            </div>

            Stored:
            ${worldState.resources.stone}

            <br>

            Produced today:
            <span class="economy-positive">
                +${stoneProduced}
            </span>

        </div>
        `;


    economyMenuSignature =
        getEconomyMenuSignature();

}


function refreshEconomyMenu(
    deltaTime
) {

    if (!economyMenuOpen) {
        return;
    }


    economyMenuRefreshAccumulator +=
        deltaTime;


    if (
        economyMenuRefreshAccumulator <
        0.25
    ) {

        return;

    }


    economyMenuRefreshAccumulator =
        0;


    const signature =
        getEconomyMenuSignature();


    if (
        signature ===
        economyMenuSignature
    ) {

        return;

    }


    renderEconomyMenu();

}


economyToolbarButton.addEventListener(
    "click",
    () => {

        if (economyMenuOpen) {

            closeEconomyMenu();

        }
        else {

            openEconomyMenu();

        }

    }
);


economyMenuCloseButton.addEventListener(
    "click",
    () => {

        closeEconomyMenu();

    }
);

/* =========================================================
   BUILD / BUTTONS
   ========================================================= */

function updateBuildToolbar() {

    const items =
        document.querySelectorAll(
            ".build-toolbar-item"
        );

    const normalItems =
        document.querySelectorAll(
            ".normal-toolbar-item"
        );


    for (
        const item
        of normalItems
    ) {

        item.hidden =
            buildModeActive;

    }


    /*
        Skjul alt først.
    */

    for (
        const item
        of items
    ) {

        item.hidden =
            true;

    }


    /*
        Utenfor Build Mode skal
        toolbaren være tom.
    */

    if (!buildModeActive) {
        return;
    }


    /*
        Ingen kategori valgt:
        vis kategoriene.
    */

    if (!activeBuildCategory) {

        buildCategoryHousingButton.hidden =
            false;

        buildCategoryFoodButton.hidden =
            false;

        buildCategoryInfrastructureButton.hidden =
            false;

        buildCategoryResourcesButton.hidden =
            false;

        return;

    }


    /*
        Inne i en kategori:
        vis Back.
    */

    buildToolbarBackButton.hidden =
        false;


    /*
        Vis bygningene som tilhører
        valgt kategori.
    */

    const categoryButtons =
        document.querySelectorAll(
            `[data-build-category="${activeBuildCategory}"]`
        );


    for (
        const button
        of categoryButtons
    ) {

        button.hidden =
            false;

    }

}


function enterBuildMode() {

    closePeopleMenu();

    closeEconomyMenu();

    closeInventoryMenu();

    closeCharacterMenu();

    buildModeActive =
        true;


    activeBuildCategory =
        null;


    /*
        Harvest og building placement
        kan ikke være aktive samtidig.
    */

    cancelHarvestMode();

    cancelBuildMode();


    categoryBuildButton.classList.add(
        "active"
    );


    canvas.style.cursor =
        "grab";


    updateBuildToolbar();

}


function exitBuildMode() {

    buildModeActive =
        false;


    activeBuildCategory =
        null;


    cancelBuildMode();


    categoryBuildButton.classList.remove(
        "active"
    );


    updateBuildToolbar();

}


function openBuildCategory(
    category
) {

    cancelBuildMode();


    activeBuildCategory =
        category;


    updateBuildToolbar();

}

categoryBuildButton.addEventListener(
    "click",
    () => {

        if (buildModeActive) {

            exitBuildMode();

        }
        else {

            enterBuildMode();

        }

    }
);

buildCategoryHousingButton.addEventListener(
    "click",
    () => {

        openBuildCategory(
            "housing"
        );

    }
);


buildCategoryFoodButton.addEventListener(
    "click",
    () => {

        openBuildCategory(
            "food"
        );

    }
);


buildCategoryInfrastructureButton.addEventListener(
    "click",
    () => {

        openBuildCategory(
            "infrastructure"
        );

    }
);


buildToolbarBackButton.addEventListener(
    "click",
    () => {

        cancelBuildMode();


        activeBuildCategory =
            null;


        updateBuildToolbar();

    }
);


settlementCenterButton.addEventListener(
    "click",
    () => {

        if (
            buildMode ===
            "settlementCenter"
        ) {

            cancelBuildMode();

            return;

        }


        activateBuildMode(
            "settlementCenter",
            settlementCenterButton
        );

    }
);

houseButton.addEventListener(
    "click",
    () => {

        if (
            !worldState.settlement.founded
        ) {

            console.log(
                "Build the Settlement Center first."
            );

            return;

        }


        if (
            buildMode === "house"
        ) {

            cancelBuildMode();

            return;

        }


        activateBuildMode(
            "house",
            houseButton
        );

    }
);

settingsButton.addEventListener(
    "click",
    () => {

        openSettingsMenu();

    }
);


closeSettingsButton.addEventListener(
    "click",
    () => {

        closeSettingsMenu();

    }
);


saveGameButton.addEventListener(
    "click",
    () => {

        saveGame();

    }
);


loadGameButton.addEventListener(
    "click",
    () => {

        loadGame();

    }
);

settingsOverlay.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.target ===
            settingsOverlay
        ) {

            closeSettingsMenu();

        }

    }
);

lumberMillButton.addEventListener(
    "click",
    () => {

        if (
            !worldState.settlement.founded
        ) {

            return;

        }


        if (
            buildMode ===
            "lumberMill"
        ) {

            cancelBuildMode();

            return;

        }


        activateBuildMode(
            "lumberMill",
            lumberMillButton
        );

    }
);

stoneQuarryButton.addEventListener(
    "click",
    () => {

        if (
            !worldState.settlement.founded
        ) {

            return;

        }


        if (
            buildMode ===
            "stoneQuarry"
        ) {

            cancelBuildMode();

            return;

        }


        activateBuildMode(
            "stoneQuarry",
            stoneQuarryButton
        );

    }
);

marketHallButton.addEventListener(
    "click",
    () => {

        if (
            !worldState.settlement.founded
        ) {

            return;

        }


        if (
            buildMode ===
            "marketHall"
        ) {

            cancelBuildMode();

            return;

        }


        activateBuildMode(
            "marketHall",
            marketHallButton
        );

    }
);

function cancelBuildMode() {

    buildMode = null;

    farmButton.classList.remove(
        "active"
    );

    marketHallButton.classList.remove(
        "active"
    );

    settlementCenterButton.classList.remove(
        "active"
    );

    houseButton.classList.remove(
        "active"
    );

    roadButton.classList.remove(
        "active"
    );

    lumberMillButton.classList.remove(
        "active"
    );

    stoneQuarryButton.classList.remove(
        "active"
    );

    canvas.style.cursor =
        "grab";

}

function cancelHarvestMode() {

    harvestMode = null;


    chopTreeButton.classList.remove(
        "active"
    );


    canvas.style.cursor =
        "grab";

}

function harvestTree(x, y) {

    if (
        !worldState.settlement.founded
    ) {

        return;

    }


    const tile =
        getTileInfo(
            x,
            y
        );


    if (!tile) {
        return;
    }


    if (
        tile.nature !== "tree"
    ) {

        console.log(
            "There is no tree here."
        );

        return;

    }


    /*
        Fjern treet fra runtime-verdenen.
    */

    removeNatureAt(
        x,
        y
    );


    /*
        Foreløpig gir hvert tre 5 Wood.
        Dette balanserer vi senere.
    */

    worldState.resources.wood +=
        5;


    worldState.production.manualWoodToday +=
        5;


    updateSettlementUI();


    console.log(
        "Tree chopped. +5 Wood"
    );

}

window.addEventListener(
    "keydown",
    (event) => {

        /* =============================================
           SPACEBAR - PAUSE / PLAY
           ============================================= */

        if (
            event.code === "Space"
        ) {

            /*
                Ikke bruk Space som pause dersom
                spilleren skriver i et felt eller
                har fokus på en knapp.
            */

            const target =
                event.target;


            const usingUIControl =
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                target instanceof HTMLSelectElement ||
                target instanceof HTMLButtonElement ||
                target?.isContentEditable;


            if (
                usingUIControl ||
                settingsOpen ||
                namingSettlement ||
                buildModeActive
            ) {

                return;

            }


            /*
                Hindrer at Space toggler mange
                ganger hvis knappen holdes inne.
            */

            if (event.repeat) {
                return;
            }


            event.preventDefault();


            if (
                timeScale === 0
            ) {

                setTimeScale(
                    lastRunningTimeScale
                );

            }
            else {

                setTimeScale(
                    0
                );

            }


            return;

        }

        if (
            event.key === "Escape"
        ) {

            if (peopleMenuOpen) {

                closePeopleMenu();

                return;

            }

            if (economyMenuOpen) {

                closeEconomyMenu();

                return;

            }

            if (inventoryMenuOpen) {

                closeInventoryMenu();

                return;

            }


            if (characterMenuOpen) {

                closeCharacterMenu();

                return;

            }

            if (namingSettlement) {

                settlementNameInput.focus();

                return;

            }

            if (settingsOpen) {

                closeSettingsMenu();

                return;

            }

            if (buildModeActive) {

                if (buildMode) {

                    cancelBuildMode();

                    return;

                }

                if (activeBuildCategory) {

                    activeBuildCategory =
                        null;


                    updateBuildToolbar();

                    return;

                }


                exitBuildMode();

                return;

            }


            if (buildMode) {

                cancelBuildMode();

            }


            if (harvestMode) {

                cancelHarvestMode();

            }

        }

    }
);

/* =========================================================
   RPG WORLD INTERACTIONS
   ========================================================= */

function closeWorldInteractionMenu() {

    interactionTarget =
        null;

    worldInteractionMenu.classList.remove(
        "trade-view"
    );

    worldInteractionMenu.classList.remove(
        "open"
    );


    worldInteractionContent.innerHTML =
        "";


    worldInteractionTitle.textContent =
        "Interaction";

}


function isPlayerAdjacentToTile(
    tileX,
    tileY
) {

    if (!player.initialized) {
        return false;
    }


    const distance =
        Math.abs(
            player.tileX -
            tileX
        ) +
        Math.abs(
            player.tileY -
            tileY
        );


    return distance === 1;

}

/* =========================================================
   RPG NPC INTERACTIONS
   ========================================================= */

function getSettlerRenderedPosition(
    settler
) {

    if (!settler) {
        return null;
    }


    const runtime =
        npcRuntime.get(
            settler.id
        );


    if (!runtime) {
        return null;
    }


    const position =
        getSettlerVisiblePosition(
            settler,
            runtime
        );


    if (!position) {
        return null;
    }


    return {

        x:
            position.x +
            (
                runtime.renderOffsetX ||
                0
            ),

        y:
            position.y +
            (
                runtime.renderOffsetY ||
                0
            ),

        runtime:
            runtime

    };

}


function getSettlerAtScreenPosition(
    screenX,
    screenY
) {

    /*
        Treffer NPC-en i screen-space.

        Dette gjør høyreklikk mye lettere
        enn å kreve at vi treffer eksakt
        samme tile/pixel som NPC-en.
    */

    const hitRadius =
        12;


    let closestSettler =
        null;


    let closestDistance =
        Infinity;


    for (
        const settler
        of worldState.settlers
    ) {

        const position =
            getSettlerRenderedPosition(
                settler
            );


        if (!position) {
            continue;
        }


        const npcWorldX =
            position.x *
            tileWidth;


        const npcWorldY =
            position.y *
            tileHeight;


        const npcScreenX =
            (
                npcWorldX -
                camera.x
            ) *
            camera.zoom;


        const npcScreenY =
            (
                npcWorldY -
                camera.y
            ) *
            camera.zoom;


        const deltaX =
            screenX -
            npcScreenX;


        const deltaY =
            screenY -
            npcScreenY;


        const distance =
            Math.sqrt(
                deltaX * deltaX +
                deltaY * deltaY
            );


        if (
            distance <= hitRadius &&
            distance <
                closestDistance
        ) {

            closestSettler =
                settler;


            closestDistance =
                distance;

        }

    }


    return closestSettler;

}


function isPlayerAdjacentToSettler(
    settler
) {

    if (
        !player.initialized ||
        !settler
    ) {

        return false;

    }


    const runtime =
        npcRuntime.get(
            settler.id
        );


    if (!runtime) {
        return false;
    }


    const position =
        getSettlerVisiblePosition(
            settler,
            runtime
        );


    if (!position) {
        return false;
    }


    const npcTileX =
        Math.floor(
            position.x
        );


    const npcTileY =
        Math.floor(
            position.y
        );


    const distance =
        Math.abs(
            player.tileX -
            npcTileX
        ) +
        Math.abs(
            player.tileY -
            npcTileY
        );


    /*
        0 tillates også dersom player
        og NPC på et tidspunkt havner
        på samme tile.
    */

    return distance <= 1;

}


function getSettlerTalkLine(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    const runtime =
        npcRuntime.get(
            settler.id
        );


    const relationship =
        getSettlerPlayerRelationshipScore(
            settler
        );


    /*
        Sterkt negativt forhold
        overstyrer vanlig small-talk.
    */

    if (
        relationship <= -50
    ) {

        return "I have nothing to say to you.";

    }


    /*
        Hva NPC-en faktisk gjør akkurat nå
        har høy prioritet.
    */

    if (runtime) {

        if (
            runtime.state ===
            NPC_STATE_BLOCKED
        ) {

            return "The road is blocked. I cannot get where I need to go.";

        }


        if (
            runtime.state ===
            NPC_STATE_WORKING
        ) {

            if (
                settlerHasPersonalityTrait(
                    settler,
                    "diligent"
                )
            ) {

                return "There is still work to be done.";

            }


            return "I should get back to work.";

        }


        if (
            runtime.state ===
            NPC_STATE_COMMUTING_TO_WORK
        ) {

            return "I am on my way to work.";

        }


        if (
            runtime.state ===
            NPC_STATE_COMMUTING_HOME
        ) {

            return "Work is done. I am heading home.";

        }


        if (
            runtime.state ===
            NPC_STATE_COMMUTING_TO_FOOD
        ) {

            return "I need to fetch food for my household.";

        }


        if (
            runtime.state ===
            NPC_STATE_RETURNING_WITH_FOOD
        ) {

            return "I need to get this food home.";

        }

    }


    /*
        Når ingenting viktig skjer,
        får personligheten styre.
    */

    if (
        settlerHasPersonalityTrait(
            settler,
            "irritable"
        )
    ) {

        return "What is it?";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "kind"
        )
    ) {

        return "I hope the day treats you well.";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "curious"
        )
    ) {

        return "Have you seen anything interesting beyond the settlement?";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "cautious"
        )
    ) {

        return "These are uncertain times. Keep your eyes open.";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "proud"
        )
    ) {

        return "This settlement will endure.";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "optimistic"
        )
    ) {

        return "Things could be worse. I think we will manage.";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "reserved"
        )
    ) {

        return "Yes?";

    }


    if (
        settlerHasPersonalityTrait(
            settler,
            "diligent"
        )
    ) {

        return "There is always something that needs doing.";

    }


    return "Good day.";

}

/* =========================================================
   RPG TRADE
   ========================================================= */

function getSettlerTradeData(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    return settler.rpg.trade;

}


function getSettlerInventoryAmount(
    settler,
    itemId
) {

    const trade =
        getSettlerTradeData(
            settler
        );


    return Math.max(
        0,
        Number(
            trade.inventory[
                itemId
            ]
        ) ||
        0
    );

}


function addSettlerInventoryItem(
    settler,
    itemId,
    amount = 1
) {

    const trade =
        getSettlerTradeData(
            settler
        );


    const current =
        getSettlerInventoryAmount(
            settler,
            itemId
        );


    trade.inventory[
        itemId
    ] =
        current +
        Math.max(
            0,
            Math.floor(
                amount
            )
        );

}


function removeSettlerInventoryItem(
    settler,
    itemId,
    amount = 1
) {

    const trade =
        getSettlerTradeData(
            settler
        );


    const current =
        getSettlerInventoryAmount(
            settler,
            itemId
        );


    const removeAmount =
        Math.max(
            0,
            Math.floor(
                amount
            )
        );


    if (
        current <
        removeAmount
    ) {

        return false;

    }


    const remaining =
        current -
        removeAmount;


    if (
        remaining <= 0
    ) {

        delete trade.inventory[
            itemId
        ];

    }
    else {

        trade.inventory[
            itemId
        ] =
            remaining;

    }


    return true;

}


function getPlayerBuyPrice(
    settler,
    itemId
) {

    const def =
        getItemDef(
            itemId
        );


    const baseValue =
        Math.max(
            1,
            Number(
                def?.value
            ) ||
            1
        );


    const relationship =
        getSettlerPlayerRelationshipScore(
            settler
        );


    /*
        +100 relationship =
        omtrent 25% billigere.

        -100 =
        omtrent 25% dyrere.
    */

    const modifier =
        1 -
        relationship *
        0.0025;


    return Math.max(
        1,
        Math.ceil(
            baseValue *
            modifier
        )
    );

}


function getPlayerSellPrice(
    settler,
    itemId
) {

    const def =
        getItemDef(
            itemId
        );


    const baseValue =
        Math.max(
            1,
            Number(
                def?.value
            ) ||
            1
        );


    const relationship =
        getSettlerPlayerRelationshipScore(
            settler
        );


    const modifier =
        0.5 +
        relationship *
        0.0015;


    return Math.max(
        1,
        Math.floor(
            baseValue *
            modifier
        )
    );

}


function registerPlayerTradeWithSettler(
    settler
) {

    addSettlerMemory(
        settler,
        {

            type:
                "player_traded",

            text:
                "Traded with the player.",

            relationshipChange:
                1,

            oncePerDay:
                true

        }
    );

}


function buyItemFromSettler(
    settler,
    itemId
) {

    if (
        !isPlayerAdjacentToSettler(
            settler
        )
    ) {

        return false;

    }


    const amount =
        getSettlerInventoryAmount(
            settler,
            itemId
        );


    if (
        amount <= 0
    ) {

        return false;

    }


    const price =
        getPlayerBuyPrice(
            settler,
            itemId
        );


    if (
        playerCharacter.coins <
        price
    ) {

        return false;

    }


    if (
        !removeSettlerInventoryItem(
            settler,
            itemId,
            1
        )
    ) {

        return false;

    }


    playerCharacter.coins -=
        price;


    getSettlerTradeData(
        settler
    ).coins +=
        price;


    addPlayerInventoryItem(
        itemId,
        1
    );


    registerPlayerTradeWithSettler(
        settler
    );


    return true;

}


function sellItemToSettler(
    settler,
    itemId
) {

    if (
        !isPlayerAdjacentToSettler(
            settler
        )
    ) {

        return false;

    }


    if (
        getPlayerInventoryAmount(
            itemId
        ) <= 0
    ) {

        return false;

    }


    const price =
        getPlayerSellPrice(
            settler,
            itemId
        );


    const trade =
        getSettlerTradeData(
            settler
        );


    if (
        trade.coins <
        price
    ) {

        return false;

    }


    if (
        !removePlayerInventoryItem(
            itemId,
            1
        )
    ) {

        return false;

    }


    trade.coins -=
        price;


    playerCharacter.coins +=
        price;


    addSettlerInventoryItem(
        settler,
        itemId,
        1
    );


    registerPlayerTradeWithSettler(
        settler
    );


    return true;

}


function renderSettlerTradeView(
    settler
) {

    if (
        !settler ||
        !isPlayerAdjacentToSettler(
            settler
        ) ||
        !canSettlerWork(
            settler
        )
    ) {

        renderSettlerInteractionRoot(
            settler
        );

        return;

    }


    ensureSettlerRpgData(
        settler
    );


    worldInteractionMenu.classList.add(
        "trade-view"
    );


    worldInteractionTitle.textContent =
        `Trade — ${settler.name}`;


    const trade =
        getSettlerTradeData(
            settler
        );


    let buyHTML =
        "";


    for (
        const [
            itemId,
            amount
        ]
        of Object.entries(
            trade.inventory
        )
    ) {

        if (
            amount <= 0
        ) {

            continue;

        }


        const price =
            getPlayerBuyPrice(
                settler,
                itemId
            );


        const canAfford =
            playerCharacter.coins >=
            price;


        buyHTML +=
            `
            <button
                class="interaction-menu-button trade-item-button"
                data-trade-action="buy"
                data-trade-item="${escapeHTML(
                    itemId
                )}"
                ${canAfford ? "" : "disabled"}
            >
                <span>
                    ${escapeHTML(
                        getItemDisplayName(
                            itemId
                        )
                    )}
                    x${amount}
                </span>

                <span>
                    ${price} coins
                </span>
            </button>
            `;

    }


    if (!buyHTML) {

        buyHTML =
            `
            <div class="interaction-menu-message">
                Nothing for sale.
            </div>
            `;

    }


    let sellHTML =
        "";


    const playerItems =
        getPlayerInventoryEntries();


    for (
        const item
        of playerItems
    ) {

        const price =
            getPlayerSellPrice(
                settler,
                item.id
            );


        const canNpcAfford =
            trade.coins >=
            price;


        sellHTML +=
            `
            <button
                class="interaction-menu-button trade-item-button"
                data-trade-action="sell"
                data-trade-item="${escapeHTML(
                    item.id
                )}"
                ${canNpcAfford ? "" : "disabled"}
            >
                <span>
                    ${escapeHTML(
                        getItemDisplayName(
                            item.id
                        )
                    )}
                    x${item.amount}
                </span>

                <span>
                    +${price} coins
                </span>
            </button>
            `;

    }


    if (!sellHTML) {

        sellHTML =
            `
            <div class="interaction-menu-message">
                You have nothing to sell.
            </div>
            `;

    }


    worldInteractionContent.innerHTML =
        `
        <div class="trade-wallets">

            You:
            ${playerCharacter.coins}
            coins

            <br>

            ${escapeHTML(
                settler.name
            )}:
            ${trade.coins}
            coins

        </div>


        <div class="trade-section">

            <div class="trade-section-title">
                Buy
            </div>

            ${buyHTML}

        </div>


        <div class="trade-section">

            <div class="trade-section-title">
                Sell
            </div>

            ${sellHTML}

        </div>


        <button
            class="interaction-menu-button"
            id="interaction-settler-back"
        >
            Back
        </button>
        `;


    const tradeButtons =
        worldInteractionContent
            .querySelectorAll(
                "[data-trade-action]"
            );


    for (
        const button
        of tradeButtons
    ) {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset
                        .tradeAction;


                const itemId =
                    button.dataset
                        .tradeItem;


                if (
                    action ===
                    "buy"
                ) {

                    buyItemFromSettler(
                        settler,
                        itemId
                    );

                }
                else if (
                    action ===
                    "sell"
                ) {

                    sellItemToSettler(
                        settler,
                        itemId
                    );

                }


                renderSettlerTradeView(
                    settler
                );

            }
        );

    }


    document
        .getElementById(
            "interaction-settler-back"
        )
        ?.addEventListener(
            "click",
            () => {

                renderSettlerInteractionRoot(
                    settler
                );

            }
        );

}

function renderSettlerInteractionRoot(
    settler
) {

    if (!settler) {

        closeWorldInteractionMenu();

        return;

    }

    worldInteractionMenu.classList.remove(
        "trade-view"
    );


    const canTalk =
        isPlayerAdjacentToSettler(
            settler
        );


    const canTrade =
        canTalk &&
        canSettlerWork(
            settler
        );


    worldInteractionTitle.textContent =
        settler.name;


    worldInteractionContent.innerHTML =
        `
        <button
            class="interaction-menu-button"
            id="interaction-look-settler"
        >
            Look
        </button>

        <button
            class="interaction-menu-button"
            id="interaction-talk-settler"
            ${canTalk ? "" : "disabled"}
        >
            Talk
        </button>

        <button
            class="interaction-menu-button"
            id="interaction-trade-settler"
            ${canTrade ? "" : "disabled"}
        >
            Trade
        </button>

        ${
            canTalk
                ? ""
                : `
                <div class="interaction-menu-message">
                    Move next to them to talk.
                </div>
                `
        }
        `;


    const lookButton =
        document.getElementById(
            "interaction-look-settler"
        );


    const talkButton =
        document.getElementById(
            "interaction-talk-settler"
        );

    const tradeButton =
        document.getElementById(
            "interaction-trade-settler"
        );

    lookButton?.addEventListener(
        "click",
        () => {

            renderSettlerLookView(
                settler
            );

        }
    );


    if (
        talkButton &&
        !talkButton.disabled
    ) {

        talkButton.addEventListener(
            "click",
            () => {

                /*
                    Sjekk avstand igjen fordi
                    NPC-en kan ha beveget seg
                    mens menyen sto åpen.
                */

                if (
                    !isPlayerAdjacentToSettler(
                        settler
                    )
                ) {

                    renderSettlerInteractionRoot(
                        settler
                    );

                    return;

                }


                renderSettlerTalkView(
                    settler
                );

            }
        );

    }

    if (
        tradeButton &&
        !tradeButton.disabled
    ) {

        tradeButton.addEventListener(
            "click",
            () => {

                renderSettlerTradeView(
                    settler
                );

            }
        );

    }

}


function renderSettlerLookView(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    const family =
        getFamilyById(
            settler.familyId
        );


    const familyName =
        family
            ? `${family.lastName} Family`
            : "None";


    const job =
        settler.job ||
        (
            canSettlerWork(
                settler
            )
                ? "Unemployed"
                : "Child"
        );


    const home =
        getPeopleBuildingName(
            settler.homeId
        );


    const workplace =
        settler.workplaceId !==
            null
            ? getPeopleBuildingName(
                settler.workplaceId
            )
            : "None";


    const status =
        getSettlerWorkStatus(
            settler
        );


    const happiness =
        Number.isFinite(
            settler.happiness
        )
            ? settler.happiness
            : DEFAULT_SETTLER_HAPPINESS;


    const personality =
        getSettlerPersonalityText(
            settler
        );


    const relationshipLabel =
        getSettlerPlayerRelationshipLabel(
            settler
        );


    const relationshipScore =
        getSettlerPlayerRelationshipScore(
            settler
        );


    const latestMemory =
        getSettlerLatestMemory(
            settler
        );


    const memoryHTML =
        latestMemory
            ? `
                <br><br>

                Latest memory:
                ${escapeHTML(
                    latestMemory.text
                )}

                <br>

                Day:
                ${latestMemory.day}
            `
            : `
                <br><br>

                Latest memory:
                None
            `;


    worldInteractionTitle.textContent =
        settler.name;


    worldInteractionContent.innerHTML =
        `
        <div class="interaction-menu-message">

            <strong>
                ${escapeHTML(
                    settler.name
                )}
            </strong>

            <br><br>

            Age:
            ${settler.age}

            <br>

            Gender:
            ${escapeHTML(
                settler.gender
            )}

            <br>

            Family:
            ${escapeHTML(
                familyName
            )}

            <br>

            Role:
            ${escapeHTML(
                settler.relation ||
                "Member"
            )}

            <br><br>

            Personality:
            ${escapeHTML(
                personality
            )}

            <br>

            Opinion of you:
            ${escapeHTML(
                relationshipLabel
            )}
            (${relationshipScore})

            <br><br>

            Job:
            ${escapeHTML(
                job
            )}

            <br>

            Status:
            ${escapeHTML(
                status
            )}

            <br>

            Home:
            ${escapeHTML(
                home
            )}

            <br>

            Workplace:
            ${escapeHTML(
                workplace
            )}

            <br><br>

            Happiness:
            ${Math.round(
                happiness
            )}
            / 100

            ${memoryHTML}

        </div>

        <button
            class="interaction-menu-button"
            id="interaction-settler-back"
        >
            Back
        </button>
        `;


    document
        .getElementById(
            "interaction-settler-back"
        )
        ?.addEventListener(
            "click",
            () => {

                renderSettlerInteractionRoot(
                    settler
                );

            }
        );

}


function renderSettlerTalkView(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    /*
        Første samtale med denne NPC-en
        per dag blir et ekte minne.

        Man kan derfor ikke spamme Talk
        for uendelig relationship.
    */

    registerPlayerTalkWithSettler(
        settler
    );


    const line =
        getSettlerTalkLine(
            settler
        );


    const relationshipLabel =
        getSettlerPlayerRelationshipLabel(
            settler
        );


    const relationshipScore =
        getSettlerPlayerRelationshipScore(
            settler
        );


    worldInteractionTitle.textContent =
        settler.name;


    worldInteractionContent.innerHTML =
        `
        <div class="interaction-menu-message">

            "${escapeHTML(
                line
            )}"

            <br><br>

            Opinion of you:
            ${escapeHTML(
                relationshipLabel
            )}
            (${relationshipScore})

        </div>

        <button
            class="interaction-menu-button"
            id="interaction-settler-back"
        >
            Back
        </button>
        `;


    document
        .getElementById(
            "interaction-settler-back"
        )
        ?.addEventListener(
            "click",
            () => {

                renderSettlerInteractionRoot(
                    settler
                );

            }
        );

}


function openSettlerInteractionMenu(
    settler,
    screenX,
    screenY
) {

    interactionTarget = {

        type:
            "settler",

        settlerId:
            settler.id

    };


    renderSettlerInteractionRoot(
        settler
    );


    worldInteractionMenu.style.left =
        `${screenX + 8}px`;


    worldInteractionMenu.style.top =
        `${screenY + 8}px`;


    worldInteractionMenu.classList.add(
        "open"
    );

}

function canPlayerChopTree(
    tileX,
    tileY
) {

    if (
        !hasTreeAt(
            tileX,
            tileY
        )
    ) {

        return false;

    }


    return (
        isPlayerAdjacentToTile(
            tileX,
            tileY
        ) &&
        canPlayerUseToolTag(
            "axe"
        )
    );

}


function chopTreeByPlayer(
    tileX,
    tileY
) {

    if (
        !hasTreeAt(
            tileX,
            tileY
        )
    ) {

        closeWorldInteractionMenu();

        return;

    }


    if (
        !isPlayerAdjacentToTile(
            tileX,
            tileY
        )
    ) {

        console.log(
            "You must stand next to the tree."
        );


        closeWorldInteractionMenu();

        return;

    }


    if (
        !canPlayerUseToolTag(
            "axe"
        )
    ) {

        console.log(
            "You need to equip an axe first."
        );


        closeWorldInteractionMenu();

        return;

    }


    removeTreeAt(
        tileX,
        tileY
    );


    addPlayerInventoryItem(
        "wood",
        1
    );


    console.log(
        "Tree chopped. +1 Wood"
    );


    closeWorldInteractionMenu();

}


function openTreeInteractionMenu(
    tileX,
    tileY,
    screenX,
    screenY
) {

    interactionTarget = {

        type:
            "tree",

        x:
            tileX,

        y:
            tileY

    };


    const adjacent =
        isPlayerAdjacentToTile(
            tileX,
            tileY
        );


    const hasAxeEquipped =
        canPlayerUseToolTag(
            "axe"
        );


    worldInteractionTitle.textContent =
        "Tree";


    if (
        adjacent &&
        hasAxeEquipped
    ) {

        worldInteractionContent.innerHTML =
            `
            <button
                class="interaction-menu-button"
                id="interaction-chop-tree"
            >
                Chop
            </button>
            `;

    }
    else {

        const message =
            !adjacent
                ? "Move next to the tree."
                : "Equip an axe to chop this tree.";


        worldInteractionContent.innerHTML =
            `
            <div class="interaction-menu-message">
                ${escapeHTML(
                    message
                )}
            </div>

            <button
                class="interaction-menu-button"
                id="interaction-chop-tree"
                disabled
            >
                Chop
            </button>
            `;

    }


    worldInteractionMenu.style.left =
        `${screenX + 8}px`;


    worldInteractionMenu.style.top =
        `${screenY + 8}px`;


    worldInteractionMenu.classList.add(
        "open"
    );


    const chopButton =
        document.getElementById(
            "interaction-chop-tree"
        );


    if (
        chopButton &&
        !chopButton.disabled
    ) {

        chopButton.addEventListener(
            "click",
            () => {

                chopTreeByPlayer(
                    tileX,
                    tileY
                );

            }
        );

    }

}

canvas.addEventListener(
    "contextmenu",
    (event) => {

        event.preventDefault();

        /*
            Bruk posisjonen fra selve
            høyreklikk-eventen.

            Da er interaction-systemet ikke
            avhengig av siste mousemove-frame.
        */

        const rect =
            canvas.getBoundingClientRect();


        const screenX =
            event.clientX -
            rect.left;


        const screenY =
            event.clientY -
            rect.top;


        const worldX =
            camera.x +
            screenX /
            camera.zoom;


        const worldY =
            camera.y +
            screenY /
            camera.zoom;


        const clickedTileX =
            Math.floor(
                worldX /
                tileWidth
            );


        const clickedTileY =
            Math.floor(
                worldY /
                tileHeight
            );

        if (
            settingsOpen ||
            namingSettlement
        ) {

            return;

        }


        /*
            Build Mode beholder gammel
            høyreklikk = cancel.
        */

        if (buildMode) {

            cancelBuildMode();

            closeBuildingInfo();

            closeWorldInteractionMenu();

            return;

        }


        if (harvestMode) {

            cancelHarvestMode();

            closeBuildingInfo();

            closeWorldInteractionMenu();

            return;

        }


        if (buildModeActive) {

            closeBuildingInfo();

            closeWorldInteractionMenu();

            return;

        }


        /*
            Først: synlige NPC-er.

            En person får prioritet foran
            tree/building dersom spilleren
            faktisk høyreklikker på NPC-en.
        */

        const clickedSettler =
            getSettlerAtScreenPosition(
                screenX,
                screenY
            );


        if (clickedSettler) {

            closeBuildingInfo();


            openSettlerInteractionMenu(
                clickedSettler,
                screenX,
                screenY
            );


            return;

        }


        /*
            Deretter andre world interactions.
        */

        if (
            hasTreeAt(
                clickedTileX,
                clickedTileY
            )
        ) {

            closeBuildingInfo();


            openTreeInteractionMenu(
                clickedTileX,
                clickedTileY,
                screenX,
                screenY
            );


            return;

        }


        /*
            Deretter buildings.
        */

        const building =
            getBuildingAtTile(
                clickedTileX,
                clickedTileY
            );


        if (building) {

            closeWorldInteractionMenu();


        openBuildingInfo(
            building,
            screenX,
            screenY
        );


            return;

        }


        /*
            Ingenting interessant
            på denne tile-en.
        */

        closeBuildingInfo();

        closeWorldInteractionMenu();

    }
);

document.addEventListener(
    "mousedown",
    (event) => {

        if (
            event.button !== 0
        ) {

            return;

        }


        if (
            activeInfoBuildingId !==
            null
        ) {

            closeBuildingInfo();

        }


        /*
            Ikke lukk interaction menu
            dersom klikket faktisk skjer
            inne i menyen.
        */

        if (
            worldInteractionMenu.classList.contains(
                "open"
            ) &&
            !worldInteractionMenu.contains(
                event.target
            )
        ) {

            closeWorldInteractionMenu();

        }

    }
);

chopTreeButton.addEventListener(
    "click",
    () => {

        /*
            Man må først grunnlegge settlementen.
        */

        if (
            !worldState.settlement.founded
        ) {

            console.log(
                "Build the Settlement Center first."
            );

            return;

        }


        /*
            Hvis Chop allerede er valgt,
            slå det av.
        */

        if (
            harvestMode === "tree"
        ) {

            cancelHarvestMode();

            return;

        }


        /*
            Slå av building mode.
        */

        cancelBuildMode();


        harvestMode =
            "tree";


        chopTreeButton.classList.add(
            "active"
        );


        canvas.style.cursor =
            "crosshair";

    }
);

function buildingOccupiesTile(
    building,
    tileX,
    tileY
) {

    return (
        tileX >= building.x &&
        tileX < building.x + building.width &&
        tileY >= building.y &&
        tileY < building.y + building.height
    );

}

function getBuildingAtTile(
    tileX,
    tileY
) {

    return (
        worldState.buildings.find(
            building =>
                buildingOccupiesTile(
                    building,
                    tileX,
                    tileY
                )
        ) || null
    );

}

function closeBuildingInfo() {

    activeInfoBuildingId =
        null;


    buildingInfoSignature =
        null;


    buildingInfoPopup.classList.remove(
        "open"
    );

}

function renderBuildingInfoContent(
    building
) {

    const def =
        BUILDING_DEFS[
            building.type
        ];


    if (!def) {
        return;
    }


    buildingInfoTitle.textContent =
        def.name;


    const residents =
        worldState.settlers.filter(
            settler =>
                settler.homeId ===
                building.id
        );


    let html =
        "";


    /* =============================================
       RESIDENTS
       ============================================= */

    if (
        def.housingCapacity
    ) {

        html +=
            `Residents: ${residents.length} / ${def.housingCapacity}`;


        if (
            residents.length > 0
        ) {

            const familyGroups =
                new Map();


            for (
                const settler
                of residents
            ) {

                const familyId =
                    settler.familyId ??
                    `single-${settler.id}`;


                if (
                    !familyGroups.has(
                        familyId
                    )
                ) {

                    familyGroups.set(
                        familyId,
                        []
                    );

                }


                familyGroups
                    .get(familyId)
                    .push(settler);

            }


            for (
                const [
                    familyId,
                    members
                ]
                of familyGroups
            ) {

                html +=
                    `<div class="building-info-family">`;


                if (
                    typeof familyId ===
                    "number"
                ) {

                    const family =
                        getFamilyById(
                            familyId
                        );


                    const familyName =
                        family
                            ? `${family.lastName} Family`
                            : "Family";


                    html +=
                        `<div class="building-info-family-name">${familyName}</div>`;

                }
                else {

                    html +=
                        `<div class="building-info-family-name">Resident</div>`;

                }


                for (
                    const settler
                    of members
                ) {

                    const relation =
                        settler.relation
                            ? ` — ${settler.relation}`
                            : "";


                    const age =
                        Number.isFinite(
                            settler.age
                        )
                            ? ` — Age ${settler.age}`
                            : "";


                    html +=
                        `
                        <div class="building-info-resident">
                            ${settler.name}
                            <span class="building-info-relation">
                                ${relation}${age}
                            </span>
                        </div>
                        `;

                }


                html +=
                    `</div>`;

            }

        }
        else {

            html +=
                "<br><br>No residents.";

        }

    }


    /* =============================================
       PLACEHOLDERS
       ============================================= */


    html +=
        "<br><br>Built: -";


    if (
        building.type ===
            "marketHall" ||
        building.type ===
            "settlementCenter"
    ) {

        const storedFood =
            Number.isFinite(
                building.foodStorage
            )
                ? building.foodStorage
                : 0;


        const capacity =
            getFoodStorageCapacity(
                building
            );


        html +=
            `<br>Food Storage: ${storedFood} / ${capacity}`;

    }
    else if (
        building.type ===
        "house"
    ) {

        const families =
            worldState.families.filter(
                family =>
                    family.homeId ===
                    building.id
            );


        let storedFood =
            0;


        let capacity =
            0;


        for (
            const family
            of families
        ) {

            storedFood +=
                Number.isFinite(
                    family.foodStorage
                )
                    ? family.foodStorage
                    : 0;


            capacity +=
                getFamilyFoodCapacity(
                    family
                );

        }


        html +=
            `<br>Food Storage: ${storedFood} / ${capacity}`;

    }
    else {

        html +=
            "<br>Food Storage: -";

    }


    if (
        residents.length > 0
    ) {

        let totalHappiness =
            0;


        for (
            const resident
            of residents
        ) {

            totalHappiness +=
                Number.isFinite(
                    resident.happiness
                )
                    ? resident.happiness
                    : DEFAULT_SETTLER_HAPPINESS;

        }


        const averageHappiness =
            Math.round(
                totalHappiness /
                residents.length
            );


        html +=
            `<br>Happiness: ${averageHappiness} / 100 — ${getHappinessLabel(
                averageHappiness
            )}`;

    }
    else {

        html +=
            "<br>Happiness: -";

    }


    /* =============================================
       WORKPLACE
       ============================================= */

    if (
        def.workerSlots
    ) {

        const workers =
            getBuildingWorkers(
                building.id
            );


        const activeWorkers =
            getActiveBuildingWorkers(
                building.id
            );


        html +=
            `<br><br>Workers: ${workers.length} / ${def.workerSlots}`;


        html +=
            `<br>At work: ${activeWorkers.length}`;


        if (
            workers.length === 0
        ) {

            html +=
                `
                <div class="building-info-resident">
                    No workers assigned.
                </div>
                `;

        }


        for (
            const worker
            of workers
        ) {

            const status =
                getSettlerWorkStatus(
                    worker
                );


            html +=
                `
                <div class="building-info-family">

                    <div class="building-info-resident">
                        ${worker.name} — ${worker.job}
                    </div>

                    <div class="building-info-relation">
                        Status: ${status}
                    </div>

                </div>
                `;

        }

    }


    buildingInfoContent.innerHTML =
        html;

}

function getBuildingInfoSignature(
    building
) {

    const def =
        BUILDING_DEFS[
            building.type
        ];


    if (!def) {
        return "";
    }


    const parts = [

        building.id,

        building.type,

        Number.isFinite(
            building.foodStorage
        )
            ? building.foodStorage
            : "NO_FOOD_STORAGE"

    ];

    /*
        Household food storage.

        Houses lagrer mat på family,
        ikke direkte på building.
    */

    if (
        building.type ===
        "house"
    ) {

        const families =
            worldState.families.filter(
                family =>
                    family.homeId ===
                    building.id
            );


        for (
            const family
            of families
        ) {

            parts.push(
                `F:${family.id}:${family.foodStorage}`
            );

        }

    }


    /*
        Residents.
    */

    const residents =
        getBuildingResidents(
            building.id
        );


    for (
        const resident
        of residents
    ) {

        parts.push(
            `R:${resident.id}:${resident.homeId}:${resident.age}:${resident.happiness}`
        );

    }


    /*
        Workers og deres faktiske
        runtime-status.
    */

    if (
        def.workerSlots
    ) {

        const workers =
            getBuildingWorkers(
                building.id
            );


        for (
            const worker
            of workers
        ) {

            const runtime =
                npcRuntime.get(
                    worker.id
                );


            parts.push(
                [
                    "W",
                    worker.id,
                    worker.workplaceId,
                    worker.job,

                    runtime
                        ? runtime.state
                        : "NO_RUNTIME",

                    runtime
                        ? runtime.blockedFromState
                        : "NO_BLOCK_STATE",

                    runtime &&
                    runtime.commutePlan
                        ? "HAS_ROUTE"
                        : "NO_ROUTE"

                ].join(":")
            );

        }

    }


    return parts.join(
        "|"
    );

}

function refreshOpenBuildingInfo() {

    if (
        activeInfoBuildingId ===
        null
    ) {

        return;

    }


    const building =
        getBuildingById(
            activeInfoBuildingId
        );


    /*
        Hvis bygningen en dag blir
        slettet mens vinduet er åpent.
    */

    if (!building) {

        closeBuildingInfo();

        return;

    }


    const newSignature =
        getBuildingInfoSignature(
            building
        );


    /*
        Ingenting har endret seg.
        Ikke gjør noe med DOM-en.
    */

    if (
        newSignature ===
        buildingInfoSignature
    ) {

        return;

    }


    buildingInfoSignature =
        newSignature;


    renderBuildingInfoContent(
        building
    );

}

function openBuildingInfo(
    building,
    screenX,
    screenY
) {

    const def =
        BUILDING_DEFS[
            building.type
        ];


    if (!def) {
        return;
    }


    /*
        Høyreklikk samme bygning
        igjen lukker popupen.
    */

    if (
        activeInfoBuildingId ===
        building.id
    ) {

        closeBuildingInfo();

        return;

    }


    activeInfoBuildingId =
        building.id;


    /*
        Tving første render.
    */

    buildingInfoSignature =
        null;


    renderBuildingInfoContent(
        building
    );


    buildingInfoPopup.style.left =
        `${screenX + 12}px`;


    buildingInfoPopup.style.top =
        `${screenY + 12}px`;


    buildingInfoPopup.classList.add(
        "open"
    );


    buildingInfoSignature =
        getBuildingInfoSignature(
            building
        );

}

function tileHasBuilding(
    tileX,
    tileY
) {

    return worldState.buildings.some(
        building =>
            buildingOccupiesTile(
                building,
                tileX,
                tileY
            )
    );

}

function tileHasRoad(
    tileX,
    tileY
) {

    const key =
        getTileKey(
            tileX,
            tileY
        );


    return (
        worldState.roads[key] === true ||
        getLayerGidAt(
            "roads",
            tileX,
            tileY
        ) !== 0
    );

}


function canPlaceRoad(
    x,
    y
) {

    const tile =
        getTileInfo(
            x,
            y
        );

    if (!tile) {
        return false;
    }

    if (tile.hasWater) {
        return false;
    }

    if (tile.hasNature) {
        return false;
    }

    if (
        tileHasBuilding(
            x,
            y
        )
    ) {

        return false;

    }

    if (
        tileHasRoad(
            x,
            y
        )
    ) {

        return false;

    }

    if (
        worldState.resources.wood < 2
    ) {

        return false;

    }

    return true;

}


function placeRoad(
    x,
    y
) {

    if (
        !worldState.settlement.founded
    ) {

        return;

    }

    if (
        !canPlaceRoad(
            x,
            y
        )
    ) {

        console.log(
            "Cannot build road here."
        );

        return;

    }

    const key =
        getTileKey(
            x,
            y
        );

    worldState.roads[key] =
        true;

    markNavigationChanged();

    worldState.resources.wood -=
        2;

    updateSettlementUI();

    console.log(
        `Road built at ${x}, ${y}. -2 Wood`
    );

}

function canPlaceBuilding(
    buildingDef,
    startX,
    startY
) {

    for (
        let offsetY = 0;
        offsetY < buildingDef.height;
        offsetY++
    ) {

        for (
            let offsetX = 0;
            offsetX < buildingDef.width;
            offsetX++
        ) {

            const x =
                startX + offsetX;

            const y =
                startY + offsetY;


            const tile =
                getTileInfo(
                    x,
                    y
                );


            /*
                Utenfor kartet.
            */

            if (!tile) {
                return false;
            }

            /*
                Vanlige bygninger kan ikke bygges
                inne i en Lumber Mill forestry zone.
            */

            if (
                tileInsideLumberZone(
                    x,
                    y
                )
            ) {

                return false;

            }


            /*
                Vann blokkerer.
            */

            if (tile.hasWater) {
                return false;
            }


            /*
                Trær / steiner blokkerer.
            */

            if (tile.hasNature) {
                return false;
            }


            /*
                Eksisterende bygning blokkerer.
            */

            if (
                tileHasBuilding(
                    x,
                    y
                )
            ) {

                return false;

            }

            /*
                Veier blokkerer bygninger.
            */

            if (
                tileHasRoad(
                    x,
                    y
                )
            ) {

                return false;

            }

        }

    }


    return true;

}

function placeBuilding(
    type,
    x,
    y
) {

    const def =
        BUILDING_DEFS[type];


    if (!def) {
        return;
    }

    if (
        type === "settlementCenter" &&
        worldState.settlement.founded
    ) {

        console.log(
            "A Settlement Center already exists."
        );

        return;

    }


    if (
        type !== "settlementCenter" &&
        !worldState.settlement.founded
    ) {

        console.log(
            "Found the settlement first."
        );

        return;

    }

    if (
        !canAffordBuilding(def)
    ) {

        console.log(
            `Not enough resources to build ${def.name}.`
        );

        return;

    }

    let validPlacement;


    if (
        type === "lumberMill"
    ) {

        validPlacement =
            canPlaceLumberMill(
                def,
                x,
                y
            );

    }
    else if (
        type === "stoneQuarry"
    ) {

        validPlacement =
            canPlaceStoneQuarry(
                def,
                x,
                y
            );

    }
    else {

        validPlacement =
            canPlaceBuilding(
                def,
                x,
                y
            );

    }


    if (!validPlacement) {

        console.log(
            "Cannot build here."
        );

        return;

    }


    const building = {

        id:
            Date.now(),

        type:
            type,

        x:
            x,

        y:
            y,

        width:
            def.width,

        height:
            def.height

    };

    if (
        type === "marketHall" ||
        type === "settlementCenter"
    ) {

        building.foodStorage =
            0;

    }

    if (
        type === "lumberMill"
    ) {

        building.treeGrowth =
            {};


        const entrance =
            findLumberMillEntrance(
                x,
                y
            );


        building.entranceX =
            entrance.x;


        building.entranceY =
            entrance.y;

    }


    worldState.buildings.push(
        building
    );

    markNavigationChanged();

    if (
        type === "stoneQuarry"
    ) {

        for (
            let offsetY = 0;
            offsetY < def.height;
            offsetY++
        ) {

            for (
                let offsetX = 0;
                offsetX < def.width;
                offsetX++
            ) {

                const stoneX =
                    x +
                    offsetX;


                const stoneY =
                    y +
                    offsetY;


                if (
                    tileHasNaturalStone(
                        stoneX,
                        stoneY
                    )
                ) {

                    removeNatureAt(
                        stoneX,
                        stoneY
                    );

                }

            }

        }

    }

    assignAvailableJobs();

    assignHomesToUnhousedSettlers();

    payBuildingCost(
        def
    );

    if (
        type === "settlementCenter"
    ) {

        worldState.settlement.founded =
            true;


        worldState.settlement.name =
            "Unnamed Settlement";


        /*
            Startmaten ligger fysisk
            i Settlement Center.
        */

        building.foodStorage =
            25;


        const foundingFamily =
            createFamily(
                5,
                building.id
            );


        /*
            Første familie fyller opp
            hjemmelageret fra Center.
        */

        refillFamilyFoodStorage(
            foundingFamily
        );


        syncLegacyFoodResource();

        settlementCenterButton.disabled =
            true;

        houseButton.disabled =
            false;

        farmButton.disabled =
            false;

        marketHallButton.disabled =
            false;

        roadButton.disabled =
            false;

        lumberMillButton.disabled =
            false;

        stoneQuarryButton.disabled =
            false;

        settlementCenterButton.classList.remove(
            "active"
        );


        buildMode =
            null;


        canvas.style.cursor =
            "grab";


        updateSettlementUI();


        openSettlementNameMenu();

    }

    updateSettlementUI();

    console.log(
        "Building placed:",
        building
    );

}

function getLumberZoneBounds(
    buildingOrX,
    y = null
) {

    const x =
        typeof buildingOrX === "object"
            ? buildingOrX.x
            : buildingOrX;


    const centerY =
        typeof buildingOrX === "object"
            ? buildingOrX.y
            : y;


    return {

        minX:
            x - 2,

        maxX:
            x + 2,

        minY:
            centerY - 2,

        maxY:
            centerY + 2

    };

}


function tileInsideLumberZone(
    tileX,
    tileY
) {

    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "lumberMill"
        ) {

            continue;

        }


        const zone =
            getLumberZoneBounds(
                building
            );


        if (
            tileX >= zone.minX &&
            tileX <= zone.maxX &&
            tileY >= zone.minY &&
            tileY <= zone.maxY
        ) {

            return true;

        }

    }


    return false;

}


function lumberZonesOverlap(
    x,
    y
) {

    const newZone =
        getLumberZoneBounds(
            x,
            y
        );


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "lumberMill"
        ) {

            continue;

        }


        const zone =
            getLumberZoneBounds(
                building
            );


        const overlaps =
            !(
                newZone.maxX < zone.minX ||
                newZone.minX > zone.maxX ||
                newZone.maxY < zone.minY ||
                newZone.minY > zone.maxY
            );


        if (overlaps) {
            return true;
        }

    }


    return false;

}

function findLumberMillEntrance(
    x,
    y
) {

    const candidates = [

        {
            x:
                x,

            y:
                y + 1
        },

        {
            x:
                x + 1,

            y:
                y
        },

        {
            x:
                x - 1,

            y:
                y
        },

        {
            x:
                x,

            y:
                y - 1
        }

    ];


    for (
        const tile
        of candidates
    ) {

        const info =
            getTileInfo(
                tile.x,
                tile.y
            );


        if (!info) {
            continue;
        }


        if (
            info.hasWater
        ) {

            continue;

        }


        /*
            Stein eller annen nature
            er ikke gyldig inngang.

            Eksisterende tree godtas ikke
            heller akkurat nå.
        */

        if (
            info.hasNature
        ) {

            continue;

        }


        if (
            tileHasBuilding(
                tile.x,
                tile.y
            )
        ) {

            continue;

        }


        return tile;

    }


    return null;

}

function isLumberMillEntranceTile(
    x,
    y
) {

    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "lumberMill"
        ) {

            continue;

        }


        if (
            building.entranceX === x &&
            building.entranceY === y
        ) {

            return true;

        }

    }


    return false;

}

function canPlaceLumberMill(
    def,
    x,
    y
) {

    /*
        Selve bygningen må stå på
        en vanlig gyldig tile.
    */

    if (
        !canPlaceBuilding(
            def,
            x,
            y
        )
    ) {

        return false;

    }


    const zone =
        getLumberZoneBounds(
            x,
            y
        );


    /*
        Hele 5x5-området må være
        innenfor kartet.
    */

    if (
        zone.minX < 0 ||
        zone.minY < 0 ||
        zone.maxX >= mapWidth ||
        zone.maxY >= mapHeight
    ) {

        return false;

    }


    /*
        Ingen bygninger kan eksistere
        inne i forestry-området.
    */

    for (
        let tileY = zone.minY;
        tileY <= zone.maxY;
        tileY++
    ) {

        for (
            let tileX = zone.minX;
            tileX <= zone.maxX;
            tileX++
        ) {

            if (
                tileHasBuilding(
                    tileX,
                    tileY
                )
            ) {

                return false;

            }

        }

    }


    /*
        To forestry-områder kan
        ikke overlappe.
    */

    if (
        lumberZonesOverlap(
            x,
            y
        )
    ) {

        return false;

    }

    const entrance =
        findLumberMillEntrance(
            x,
            y
        );


    if (!entrance) {

        return false;

    }

    return true;

}

function tileHasNaturalStone(
    x,
    y
) {

    if (
        isNatureRemoved(
            x,
            y
        )
    ) {

        return false;

    }


    return (
        getTileName(
            "nature",
            x,
            y
        ) === "stone"
    );

}


function canPlaceStoneQuarry(
    def,
    startX,
    startY
) {

    let foundStone =
        false;


    for (
        let offsetY = 0;
        offsetY < def.height;
        offsetY++
    ) {

        for (
            let offsetX = 0;
            offsetX < def.width;
            offsetX++
        ) {

            const x =
                startX +
                offsetX;


            const y =
                startY +
                offsetY;


            const tile =
                getTileInfo(
                    x,
                    y
                );


            if (!tile) {

                return false;

            }


            if (
                tile.hasWater
            ) {

                return false;

            }


            if (
                tileHasBuilding(
                    x,
                    y
                ) ||
                tileHasRoad(
                    x,
                    y
                ) ||
                tileInsideLumberZone(
                    x,
                    y
                )
            ) {

                return false;

            }


            /*
                Trær og annen nature
                blokkerer Quarry.

                Stone er det eneste
                nature-elementet vi tillater.
            */

            if (
                tile.hasNature
            ) {

                if (
                    tile.nature !==
                    "stone"
                ) {

                    return false;

                }


                foundStone =
                    true;

            }

        }

    }


    /*
        Minst én stone-tile må ligge
        under footprinten.
    */

    return foundStone;

}

function drawBuildings() {

    for (
        const building
        of worldState.buildings
    ) {

        /*
            Tiled-bygninger er allerede tegnet på
            buildings tile layer. Rectangle-objectet
            er bare gameplay/collision/data.
        */
        if (
            building.source ===
            "tiled"
        ) {

            continue;

        }


        const def =
            BUILDING_DEFS[
                building.type
            ];

        const x =
            building.x *
            tileWidth;

        const y =
            building.y *
            tileHeight;


        const width =
            building.width *
            tileWidth;

        const height =
            building.height *
            tileHeight;


        /*
            Midlertidig placeholder.
            Senere blir dette en PNG.
        */

        ctx.fillStyle =
            "#b59a63";


        ctx.fillRect(
            x + 2,
            y + 2,
            width - 4,
            height - 4
        );


        ctx.strokeStyle =
            "#332716";


        ctx.lineWidth =
            2 /
            camera.zoom;


        ctx.strokeRect(
            x + 2,
            y + 2,
            width - 4,
            height - 4
        );


        ctx.fillStyle =
            "#111";


        ctx.font =
            "10px monospace";


        ctx.fillText(
            def?.label ||
            building.type,

            x + 6,
            y + 18
        );

    }

}

function drawBuildPreview() {

    if (!buildMode) {
        return;
    }

    if (
        buildMode === "lumberMill"
    ) {

        const def =
            BUILDING_DEFS.lumberMill;


        const valid =
            canPlaceLumberMill(
                def,
                mouse.tileX,
                mouse.tileY
            ) &&
            canAffordBuilding(
                def
            );


        const zoneX =
            (
                mouse.tileX - 2
            ) *
            tileWidth;


        const zoneY =
            (
                mouse.tileY - 2
            ) *
            tileHeight;


        ctx.fillStyle =
            valid
                ? "rgba(100, 200, 80, 0.16)"
                : "rgba(220, 50, 50, 0.16)";


        ctx.strokeStyle =
            valid
                ? "rgba(140, 255, 120, 0.9)"
                : "rgba(255, 80, 80, 0.9)";


        ctx.fillRect(
            zoneX,
            zoneY,
            tileWidth * 5,
            tileHeight * 5
        );


        ctx.lineWidth =
            2 /
            camera.zoom;


        ctx.strokeRect(
            zoneX,
            zoneY,
            tileWidth * 5,
            tileHeight * 5
        );


        /*
            Selve mill-bygningen.
        */

        ctx.fillStyle =
            valid
                ? "rgba(70, 220, 90, 0.55)"
                : "rgba(220, 50, 50, 0.55)";


        ctx.fillRect(
            mouse.tileX *
            tileWidth,

            mouse.tileY *
            tileHeight,

            tileWidth,

            tileHeight
        );


        return;

    }

    if (
        buildMode === "road"
    ) {

        const valid =
            canPlaceRoad(
                mouse.tileX,
                mouse.tileY
            );

        const x =
            mouse.tileX *
            tileWidth;

        const y =
            mouse.tileY *
            tileHeight;

        ctx.fillStyle =
            valid
                ? "rgba(120, 120, 120, 0.65)"
                : "rgba(220, 50, 50, 0.35)";

        ctx.strokeStyle =
            valid
                ? "rgba(220, 220, 220, 1)"
                : "rgba(255, 80, 80, 1)";

        ctx.fillRect(
            x,
            y,
            tileWidth,
            tileHeight
        );

        ctx.lineWidth =
            2 /
            camera.zoom;

        ctx.strokeRect(
            x,
            y,
            tileWidth,
            tileHeight
        );

        return;

    }

    const def =
        BUILDING_DEFS[
            buildMode
        ];


    if (!def) {
        return;
    }


    const validPlacement =
        buildMode ===
            "stoneQuarry"
            ? canPlaceStoneQuarry(
                def,
                mouse.tileX,
                mouse.tileY
            )
            : canPlaceBuilding(
                def,
                mouse.tileX,
                mouse.tileY
            );


    const valid =
        validPlacement &&
        canAffordBuilding(
            def
        );


    const x =
        mouse.tileX *
        tileWidth;


    const y =
        mouse.tileY *
        tileHeight;


    const width =
        def.width *
        tileWidth;


    const height =
        def.height *
        tileHeight;


    if (valid) {

        ctx.fillStyle =
            "rgba(70, 220, 90, 0.35)";

        ctx.strokeStyle =
            "rgba(100, 255, 120, 1)";

    }
    else {

        ctx.fillStyle =
            "rgba(220, 50, 50, 0.35)";

        ctx.strokeStyle =
            "rgba(255, 80, 80, 1)";

    }


    ctx.fillRect(
        x,
        y,
        width,
        height
    );


    ctx.lineWidth =
        2 /
        camera.zoom;


    ctx.strokeRect(
        x,
        y,
        width,
        height
    );

}


/* =========================================================
   UPDATE MOUSE WORLD POSITION
   ========================================================= */

function updateMouseWorldPosition() {

    mouse.worldX =
        camera.x +
        mouse.screenX /
        camera.zoom;


    mouse.worldY =
        camera.y +
        mouse.screenY /
        camera.zoom;


    mouse.tileX =
        Math.floor(
            mouse.worldX /
            tileWidth
        );


    mouse.tileY =
        Math.floor(
            mouse.worldY /
            tileHeight
        );

}


/* =========================================================
   DRAW BACKGROUND
   ========================================================= */

function drawBackground() {

    ctx.fillStyle =
        "#111111";


    ctx.fillRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
    );

}


/* =========================================================
   DRAW TILE LAYER
   ========================================================= */

function drawTileLayer(
    layer
) {

    if (
        !layer ||
        layer.type !== "tilelayer" ||
        !layer.visible
    ) {

        return;

    }


    const startX =
        Math.max(
            0,
            Math.floor(
                camera.x /
                tileWidth
            ) - 1
        );


    const startY =
        Math.max(
            0,
            Math.floor(
                camera.y /
                tileHeight
            ) - 1
        );


    const endX =
        Math.min(
            layer.width,
            Math.ceil(
                (
                    camera.x +
                    canvas.clientWidth /
                    camera.zoom
                ) /
                tileWidth
            ) + 1
        );


    const endY =
        Math.min(
            layer.height,
            Math.ceil(
                (
                    camera.y +
                    canvas.clientHeight /
                    camera.zoom
                ) /
                tileHeight
            ) + 1
        );


    for (
        let y = startY;
        y < endY;
        y++
    ) {

        for (
            let x = startX;
            x < endX;
            x++
        ) {

            if (
                layer.name.toLowerCase() === "nature" &&
                isNatureRemoved(x, y)
            ) {

                continue;

            }

            const index =
                y *
                layer.width +
                x;


            const gid =
                layer.data[index];


            if (!gid) {
                continue;
            }


            const result =
                getTileFromGid(
                    gid
                );


            if (!result) {
                continue;
            }


            const tile =
                result.tile;


            const layerName =
                layer.name.toLowerCase();


            const overlap =
                layerName === "ground"
                    ? 1 / camera.zoom
                    : 0;


            const drawX =
                x * tileWidth;


            const drawY =
                y * tileHeight +
                (
                    tileHeight -
                    tile.height
                );


            ctx.drawImage(
                tile.image,

                drawX,

                drawY,

                tile.width + overlap,

                tile.height + overlap
            );

        }

    }

}

function getTileKey(x, y) {

    return `${x},${y}`;

}


function isNatureRemoved(x, y) {

    const key =
        getTileKey(x, y);


    return (
        worldState.removedNature[key] === true
    );

}


function removeNatureAt(
    x,
    y
) {

    const key =
        getTileKey(
            x,
            y
        );


    if (
        worldState.removedNature[
            key
        ] === true
    ) {

        return;

    }


    worldState.removedNature[
        key
    ] =
        true;


    markNavigationChanged();

}


/* =========================================================
   DRAW MAP
   ========================================================= */

function drawMap() {

    /*
        Tiled er nå den faste verdenen.

        Lagrekkefølge:
        water -> ground -> roads -> nature -> buildings

        collision og objects er datalag og tegnes ikke.
    */

    const visibleWorldLayers = [
        "water",
        "ground",
        "roads",
        "nature",
        "buildings"
    ];


    for (
        const layerName
        of visibleWorldLayers
    ) {

        drawTileLayer(
            getLayer(
                layerName
            )
        );

    }

}

function drawBuildGrid() {

    if (
        !buildModeActive ||
        !mapLoaded
    ) {

        return;

    }

    const startX =
        Math.max(
            0,
            Math.floor(
                camera.x /
                tileWidth
            )
        );


    const startY =
        Math.max(
            0,
            Math.floor(
                camera.y /
                tileHeight
            )
        );

    const endX =
        Math.min(
            mapWidth,
            Math.ceil(
                (
                    camera.x +
                    canvas.clientWidth /
                    camera.zoom
                ) /
                tileWidth
            )
        );

    const endY =
        Math.min(
            mapHeight,
            Math.ceil(
                (
                    camera.y +
                    canvas.clientHeight /
                    camera.zoom
                ) /
                tileHeight
            )
        );


    ctx.save();

    ctx.beginPath();

    for (
        let x = startX;
        x <= endX;
        x++
    ) {

        const worldX =
            x * tileWidth;


        ctx.moveTo(
            worldX,
            startY * tileHeight
        );


        ctx.lineTo(
            worldX,
            endY * tileHeight
        );

    }

    for (
        let y = startY;
        y <= endY;
        y++
    ) {

        const worldY =
            y * tileHeight;


        ctx.moveTo(
            startX * tileWidth,
            worldY
        );


        ctx.lineTo(
            endX * tileWidth,
            worldY
        );

    }

    ctx.strokeStyle =
        "rgba(255, 255, 255, 0.45)";


    ctx.lineWidth =
        1 /
        camera.zoom;


    ctx.stroke();

    ctx.restore();

}

/* =========================================================
   DRAW SETTLERS
   ========================================================= */

function isSettlerSelectedInPeopleMenu(
    settler
) {

    return (
        peopleMenuOpen &&
        peopleMenuView ===
            "settler" &&
        selectedPeopleSettlerId ===
            settler.id
    );

}


function drawSelectedSettlerHighlight(
    settler,
    runtime
) {

    if (
        !isSettlerSelectedInPeopleMenu(
            settler
        )
    ) {

        return;

    }


    let markerX =
        null;

    let markerY =
        null;


    /*
        Hvis NPC-en faktisk er ute
        på kartet bruker vi den ekte
        posisjonen.
    */

    if (
        runtime &&
        Number.isFinite(
            runtime.x
        ) &&
        Number.isFinite(
            runtime.y
        )
    ) {

        markerX =
            runtime.x +
            (
                runtime.renderOffsetX ||
                0
            );


        markerY =
            runtime.y +
            (
                runtime.renderOffsetY ||
                0
            );

    }
    else {

        /*
            NPC-er som er HOME eller WORKING
            er "inne" i bygningen og har derfor
            ingen fysisk runtime-posisjon.

            Vis markøren på bygningen de
            befinner seg i.
        */

        let locationBuilding =
            null;


        if (
            runtime &&
            runtime.state ===
                NPC_STATE_WORKING
        ) {

            locationBuilding =
                getBuildingById(
                    settler.workplaceId
                );

        }


        if (!locationBuilding) {

            locationBuilding =
                getBuildingById(
                    settler.homeId
                );

        }


        if (!locationBuilding) {

            return;

        }


        markerX =
            locationBuilding.x +
            locationBuilding.width /
            2;


        markerY =
            locationBuilding.y +
            locationBuilding.height /
            2;

    }


    const worldX =
        markerX *
        tileWidth;


    const worldY =
        markerY *
        tileHeight;


    /*
        Liten pulserende markør.
    */

    const pulse =
        (
            Math.sin(
                performance.now() /
                180
            ) +
            1
        ) /
        2;


    const radius =
        10 +
        pulse * 3;


    ctx.save();


    ctx.beginPath();


    ctx.arc(
        worldX,
        worldY,
        radius,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "#fff4a3";


    ctx.lineWidth =
        2.5 /
        camera.zoom;


    ctx.stroke();


    /*
        En svak ekstra ring gjør
        markøren lettere å se mot
        både grass og buildings.
    */

    ctx.beginPath();


    ctx.arc(
        worldX,
        worldY,
        radius + 3,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(20, 20, 20, 0.75)";


    ctx.lineWidth =
        1 /
        camera.zoom;


    ctx.stroke();


    ctx.restore();

}

function getSettlerVisiblePosition(
    settler,
    runtime
) {

    if (!runtime) {
        return null;
    }


    /*
        HOME betyr at NPC-en befinner seg
        fysisk inne i hjemmet.

        Den skal aldri tegnes ute på kartet,
        selv om runtime ved en feil fortsatt
        skulle inneholde en gammel x/y-posisjon.
    */

    if (
        runtime.state ===
        NPC_STATE_HOME
    ) {

        return null;

    }


    /*
        NPC-er som faktisk er ute bruker
        sin virkelige runtime-posisjon.
    */

    if (
        Number.isFinite(runtime.x) &&
        Number.isFinite(runtime.y)
    ) {

        return {
            x: runtime.x,
            y: runtime.y
        };

    }


    /*
        WORKING kan foreløpig være uten en
        fysisk x/y-posisjon fra den gamle
        settlement-simuleringen.

        I RPG-versjonen viser vi da arbeideren
        ved en access-tile til arbeidsplassen.
    */

    if (
        runtime.state !==
            NPC_STATE_WORKING ||
        settler.workplaceId ===
            null
    ) {

        return null;

    }


    const building =
        getBuildingById(
            settler.workplaceId
        );


    if (!building) {
        return null;
    }


    const accessTiles =
        getBuildingAccessTiles(
            building
        );


    if (
        accessTiles.length > 0
    ) {

        const index =
            Math.abs(
                Number(settler.id) || 0
            ) %
            accessTiles.length;


        return {
            x:
                accessTiles[index].x +
                0.5,

            y:
                accessTiles[index].y +
                0.5
        };

    }


    return {
        x:
            building.x +
            building.width / 2,

        y:
            building.y +
            building.height / 2
    };

}


function drawSettlers() {

    for (
        const settler
        of worldState.settlers
    ) {

        const runtime =
            npcRuntime.get(
                settler.id
            );


        if (!runtime) {
            continue;
        }


        drawSelectedSettlerHighlight(
            settler,
            runtime
        );


        /*
            HOME-NPC-er er inne i huset og tegnes
            derfor ikke.

            WANDERING / commuting bruker den ekte
            runtime-posisjonen. WORKING kan foreløpig
            vises ved arbeidsplassens access-tile dersom
            den gamle simulation-state mangler x/y.
        */

        const position =
            getSettlerVisiblePosition(
                settler,
                runtime
            );


        if (!position) {
            continue;
        }


        const worldX =
            (
                position.x +
                (
                    runtime.renderOffsetX ||
                    0
                )
            ) *
            tileWidth;


        const worldY =
            (
                position.y +
                (
                    runtime.renderOffsetY ||
                    0
                )
            ) *
            tileHeight;


        const size =
            9;


        ctx.fillStyle =
            "#f0d27a";


        ctx.fillRect(
            worldX - size / 2,
            worldY - size / 2,
            size,
            size
        );


        ctx.strokeStyle =
            "#222";


        ctx.lineWidth =
            1 /
            camera.zoom;


        ctx.strokeRect(
            worldX - size / 2,
            worldY - size / 2,
            size,
            size
        );

    }

}

/* =========================================================
   DRAW HOVER TILE
   ========================================================= */

function drawTileHighlight() {

    if (
        !mapLoaded ||
        !mouse.insideCanvas
    ) {

        return;

    }


    if (
        mouse.tileX < 0 ||
        mouse.tileY < 0 ||
        mouse.tileX >= mapWidth ||
        mouse.tileY >= mapHeight
    ) {

        return;

    }


    const x =
        mouse.tileX *
        tileWidth;


    const y =
        mouse.tileY *
        tileHeight;


    ctx.fillStyle =
        "rgba(255,255,255,0.14)";


    ctx.fillRect(
        x,
        y,
        tileWidth,
        tileHeight
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";


    ctx.lineWidth =
        2 /
        camera.zoom;


    ctx.strokeRect(
        x,
        y,
        tileWidth,
        tileHeight
    );

}


/* =========================================================
   DRAW SELECTED TILE
   ========================================================= */

function drawSelectedTile() {

    if (!selectedTile) {
        return;
    }


    const x =
        selectedTile.x *
        tileWidth;


    const y =
        selectedTile.y *
        tileHeight;


    ctx.strokeStyle =
        "rgba(255, 220, 80, 1)";


    ctx.lineWidth =
        3 /
        camera.zoom;


    ctx.strokeRect(
        x + 1,
        y + 1,
        tileWidth - 2,
        tileHeight - 2
    );

}


/* =========================================================
   DEBUG UI
   ========================================================= */

function updateDebugUI() {

    debugTile.textContent =
        `${mouse.tileX}, ${mouse.tileY}`;


    debugZoom.textContent =
        `${Math.round(
            camera.zoom * 100
        )}%`;


    if (
        debugPlayer &&
        player.initialized
    ) {

        debugPlayer.textContent =
            `${player.tileX}, ${player.tileY}`;

    }


    const info =
        getTileInfo(
            mouse.tileX,
            mouse.tileY
        );


    if (!info) {

        debugGround.textContent =
            "-";

        debugWater.textContent =
            "-";

        debugNature.textContent =
            "-";

        return;

    }


    debugGround.textContent =
        info.ground || "-";


    debugWater.textContent =
        info.water || "-";


    debugNature.textContent =
        info.nature || "-";

}


/* =========================================================
   UPDATE
   ========================================================= */

function processNewDay() {

    worldState.production.foodToday =
        0;

    worldState.production.foodWastedToday =
        0;

    worldState.production.woodToday =
        0;

    worldState.production.stoneToday =
        0;

    worldState.production.manualWoodToday =
        0;


    let totalRequired =
        0;


    let totalConsumed =
        0;


    let totalMissing =
        0;


    let hungryHouseholds =
        0;


    /*
        Hver familie spiser fra sitt
        eget pantry.
    */

    for (
        const family
        of worldState.families
    ) {

        if (
            !Number.isFinite(
                family.foodStorage
            )
        ) {

            family.foodStorage =
                0;

        }


        const required =
            getFamilyDailyFoodNeed(
                family
            );


        const consumed =
            Math.min(
                required,
                family.foodStorage
            );


        const missing =
            Math.max(
                0,
                required -
                consumed
            );

        family.lastMealRequired =
            required;


        family.lastMealConsumed =
            consumed;


        family.lastMealMissing =
            missing;

        family.foodStorage -=
            consumed;


        totalRequired +=
            required;


        totalConsumed +=
            consumed;


        totalMissing +=
            missing;


        if (
            missing > 0
        ) {

            hungryHouseholds +=
                1;

        }

    }


    /*
        Faktisk hunger.
    */

    worldState.foodStatus.lastRequired =
        totalRequired;


    worldState.foodStatus.lastConsumed =
        totalConsumed;


    worldState.foodStatus.shortageAmount =
        totalMissing;


    worldState.foodStatus.shortageActive =
        totalMissing > 0;


    worldState.foodStatus.hungryHouseholds =
        hungryHouseholds;


    worldState.foodStatus.hungryResidents =
        totalMissing;


    if (
        worldState.foodStatus.shortageActive
    ) {

        worldState.foodStatus
            .consecutiveShortageDays +=
                1;

    }
    else {

        worldState.foodStatus
            .consecutiveShortageDays =
                0;

    }

    /*
        Happiness vurderes 1 gang
        per dag etter dagens måltid.
    */

    updateDailySettlerHappiness();


    /*
        Etter dagens måltid opprettes
        eventuelle mathentingsoppgaver.

        Mat flyttes ikke lenger automatisk
        fra Market / Settlement Center
        til husholdningen.
    */

    scheduleHouseholdFoodRuns();

    updateFoodDistributionStatus();


    /*
        Immigration vurderes først etter
        at matforsyningen er vurdert.
    */

    processPopulationGrowth();


    syncLegacyFoodResource();


    if (
        worldState.foodStatus.shortageActive
    ) {

        console.log(
            `Day ${worldState.time.day}: Hunger! ${totalConsumed}/${totalRequired} meals available. ${totalMissing} resident(s) missed food.`
        );

    }
    else if (
        worldState.foodStatus
            .distributionShortageActive
    ) {

        console.log(
            `Day ${worldState.time.day}: Food supply shortage. Households could not fully refill their food storage.`
        );

    }
    else {

        console.log(
            `Day ${worldState.time.day}: ${totalConsumed}/${totalRequired} Food consumed.`
        );

    }


    updateSettlementUI();

}

function getPopulation() {

    return worldState.settlers.length;

}


function syncPopulationCount() {

    /*
        Beholder population-feltet foreløpig
        for kompatibilitet med resten av spillet.
    */

    worldState.settlement.population =
        getPopulation();

}

/* =========================================================
   SETTLER RPG DATA
   ========================================================= */

const MAX_SETTLER_MEMORIES =
    20;


const NPC_PERSONALITY_TRAITS = [

    {
        id: "kind",
        name: "Kind"
    },

    {
        id: "reserved",
        name: "Reserved"
    },

    {
        id: "diligent",
        name: "Diligent"
    },

    {
        id: "curious",
        name: "Curious"
    },

    {
        id: "cautious",
        name: "Cautious"
    },

    {
        id: "proud",
        name: "Proud"
    },

    {
        id: "irritable",
        name: "Irritable"
    },

    {
        id: "optimistic",
        name: "Optimistic"
    }

];

function createDefaultSettlerTradeData(
    settlerId
) {

    const inventory =
        {};


    const breadAmount =
        Math.floor(
            getStableSettlerRandom(
                settlerId,
                20
            ) *
            4
        );


    const woodAmount =
        Math.floor(
            getStableSettlerRandom(
                settlerId,
                21
            ) *
            3
        );


    const stoneAmount =
        Math.floor(
            getStableSettlerRandom(
                settlerId,
                22
            ) *
            3
        );


    if (
        breadAmount > 0
    ) {

        inventory.bread =
            breadAmount;

    }


    if (
        woodAmount > 0
    ) {

        inventory.wood =
            woodAmount;

    }


    if (
        stoneAmount > 0
    ) {

        inventory.stone =
            stoneAmount;

    }


    return {

        coins:
            8 +
            Math.floor(
                getStableSettlerRandom(
                    settlerId,
                    23
                ) *
                28
            ),

        inventory:
            inventory

    };

}


function getStableSettlerRandom(
    settlerId,
    salt = 0
) {

    const value =
        Math.sin(
            (
                Number(settlerId) +
                1
            ) *
            12.9898 +
            salt *
            78.233
        ) *
        43758.5453;


    return (
        value -
        Math.floor(
            value
        )
    );

}


function createSettlerRpgData(
    settlerId
) {

    const traitCount =
        NPC_PERSONALITY_TRAITS.length;


    const firstIndex =
        Math.floor(
            getStableSettlerRandom(
                settlerId,
                1
            ) *
            traitCount
        );


    let secondIndex =
        Math.floor(
            getStableSettlerRandom(
                settlerId,
                2
            ) *
            traitCount
        );


    if (
        secondIndex ===
        firstIndex
    ) {

        secondIndex =
            (
                secondIndex +
                1
            ) %
            traitCount;

    }


    return {

        personalityTraits: [

            NPC_PERSONALITY_TRAITS[
                firstIndex
            ].id,

            NPC_PERSONALITY_TRAITS[
                secondIndex
            ].id

        ],

        playerRelationship:
            0,

        memories:
            [],

        trade:
            createDefaultSettlerTradeData(
                settlerId
            )

    };

}


function ensureSettlerRpgData(
    settler
) {

    if (!settler) {
        return;
    }


    const defaults =
        createSettlerRpgData(
            settler.id
        );


    if (
        !settler.rpg ||
        typeof settler.rpg !==
            "object"
    ) {

        settler.rpg =
            defaults;

        return;

    }


    settler.rpg = {

        ...defaults,

        ...settler.rpg

    };


    if (
        !Array.isArray(
            settler.rpg
                .personalityTraits
        ) ||
        settler.rpg
            .personalityTraits
            .length === 0
    ) {

        settler.rpg
            .personalityTraits =
                [
                    ...defaults
                        .personalityTraits
                ];

    }


    settler.rpg
        .playerRelationship =
            Math.max(
                -100,
                Math.min(
                    100,
                    Number(
                        settler.rpg
                            .playerRelationship
                    ) ||
                    0
                )
            );


    if (
        !Array.isArray(
            settler.rpg.memories
        )
    ) {

        settler.rpg.memories =
            [];

    }


    if (
        settler.rpg.memories.length >
        MAX_SETTLER_MEMORIES
    ) {

        settler.rpg.memories =
            settler.rpg.memories.slice(
                -MAX_SETTLER_MEMORIES
            );

    }

    /*
        Personal inventory / currency
    */

    const defaultTrade =
        createDefaultSettlerTradeData(
            settler.id
        );


    const existingTrade =
        settler.rpg.trade;


    settler.rpg.trade = {

        coins:
            Math.max(
                0,
                Math.floor(
                    Number(
                        existingTrade?.coins ??
                        defaultTrade.coins
                    ) ||
                    0
                )
            ),

        inventory:
            (
                existingTrade?.inventory &&
                typeof existingTrade.inventory ===
                    "object" &&
                !Array.isArray(
                    existingTrade.inventory
                )
            )
                ? {
                    ...existingTrade.inventory
                }
                : {
                    ...defaultTrade.inventory
                }

    };


    for (
        const itemId
        of Object.keys(
            settler.rpg.trade.inventory
        )
    ) {

        const amount =
            Math.max(
                0,
                Math.floor(
                    Number(
                        settler.rpg.trade
                            .inventory[
                                itemId
                            ]
                    ) ||
                    0
                )
            );


        if (
            amount <= 0
        ) {

            delete settler.rpg.trade
                .inventory[
                    itemId
                ];

        }
        else {

            settler.rpg.trade
                .inventory[
                    itemId
                ] =
                    amount;

        }

    }

}


function getNpcPersonalityTraitDef(
    traitId
) {

    return (
        NPC_PERSONALITY_TRAITS.find(
            trait =>
                trait.id ===
                traitId
        ) ||
        null
    );

}


function settlerHasPersonalityTrait(
    settler,
    traitId
) {

    ensureSettlerRpgData(
        settler
    );


    return settler.rpg
        .personalityTraits
        .includes(
            traitId
        );

}


function getSettlerPersonalityText(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    return settler.rpg
        .personalityTraits
        .map(
            traitId => {

                return (
                    getNpcPersonalityTraitDef(
                        traitId
                    )?.name ||
                    traitId
                );

            }
        )
        .join(
            ", "
        );

}


function getSettlerPlayerRelationshipScore(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    return settler.rpg
        .playerRelationship;

}


function getSettlerPlayerRelationshipLabel(
    settler
) {

    const score =
        getSettlerPlayerRelationshipScore(
            settler
        );


    if (
        score <= -50
    ) {

        return "Hostile";

    }


    if (
        score <= -15
    ) {

        return "Dislikes you";

    }


    if (
        score < 15
    ) {

        return "Neutral";

    }


    if (
        score < 35
    ) {

        return "Familiar";

    }


    if (
        score < 65
    ) {

        return "Likes you";

    }


    return "Trusts you";

}


function changeSettlerPlayerRelationship(
    settler,
    amount
) {

    ensureSettlerRpgData(
        settler
    );


    settler.rpg
        .playerRelationship =
            Math.max(
                -100,
                Math.min(
                    100,

                    settler.rpg
                        .playerRelationship +
                    amount
                )
            );

}


function settlerHasMemoryOnDay(
    settler,
    type,
    day
) {

    ensureSettlerRpgData(
        settler
    );


    return settler.rpg
        .memories
        .some(
            memory =>
                memory.type ===
                    type &&
                memory.day ===
                    day
        );

}


function addSettlerMemory(
    settler,
    {
        type,
        text,
        relationshipChange = 0,
        oncePerDay = false
    }
) {

    ensureSettlerRpgData(
        settler
    );


    if (
        oncePerDay &&
        settlerHasMemoryOnDay(
            settler,
            type,
            worldState.time.day
        )
    ) {

        return false;

    }


    settler.rpg.memories.push({

        type:
            type,

        text:
            text,

        day:
            worldState.time.day,

        relationshipChange:
            relationshipChange

    });


    if (
        relationshipChange !== 0
    ) {

        changeSettlerPlayerRelationship(
            settler,
            relationshipChange
        );

    }


    if (
        settler.rpg.memories.length >
        MAX_SETTLER_MEMORIES
    ) {

        settler.rpg.memories.shift();

    }


    return true;

}


function registerPlayerTalkWithSettler(
    settler
) {

    return addSettlerMemory(
        settler,
        {

            type:
                "player_talked",

            text:
                "Spoke with the player.",

            relationshipChange:
                1,

            oncePerDay:
                true

        }
    );

}


function getSettlerLatestMemory(
    settler
) {

    ensureSettlerRpgData(
        settler
    );


    if (
        settler.rpg.memories.length ===
        0
    ) {

        return null;

    }


    return settler.rpg.memories[
        settler.rpg.memories.length -
        1
    ];

}

function createSettler(
    options = {}
) {

    const id =
        worldState.nextSettlerId;


    worldState.nextSettlerId +=
        1;


    const identity =
        generateSettlerIdentity(
            id,
            options.gender || null,
            options.lastName || null
        );


    const settler = {

        id:
            id,

        firstName:
            identity.firstName,

        lastName:
            identity.lastName,

        name:
            identity.fullName,

        gender:
            identity.gender,

        homeId:
            options.homeId ?? null,

        familyId:
            options.familyId ?? null,

        settlementId:
            options.settlementId ?? null,

        relation:
            options.relation ?? null,

        age:
            options.age ??
            generateAgeForRelation(
                options.relation ?? null
            ),

        job:
            null,

        workplaceId:
            null,

        carriedFood:
            0,

        happiness:
            DEFAULT_SETTLER_HAPPINESS,

        happinessTarget:
            DEFAULT_SETTLER_HAPPINESS,

        happinessChangeToday:
            0,


        rpg:
            createSettlerRpgData(
                id
            ),


        arrivedDay:
            worldState.time.day

    };


    worldState.settlers.push(
        settler
    );


    assignHomeToSettler(
        settler
    );


    syncPopulationCount();


    console.log(
        "Settler created:",
        settler
    );


    return settler;

}

function getBuildingWorkers(
    buildingId
) {

    return worldState.settlers.filter(
        settler =>
            settler.workplaceId ===
            buildingId
    );

}

function getActiveBuildingWorkers(
    buildingId
) {

    return worldState.settlers.filter(
        settler => {

            if (
                settler.workplaceId !==
                buildingId
            ) {

                return false;

            }


            const runtime =
                npcRuntime.get(
                    settler.id
                );


            return (
                runtime &&
                runtime.state ===
                    NPC_STATE_WORKING
            );

        }
    );

}

function getSettlerWorkStatus(
    settler
) {

    const runtime =
        npcRuntime.get(
            settler.id
        );


    if (!runtime) {

        return "Not at work";

    }


    if (
        runtime.state ===
        NPC_STATE_BLOCKED
    ) {

        if (
            runtime.blockedFromState ===
            NPC_STATE_COMMUTING_TO_WORK
        ) {

            return "Route blocked - wandering";

        }


        if (
            runtime.blockedFromState ===
            NPC_STATE_COMMUTING_HOME
        ) {

            return "Route blocked going home";

        }


        if (
            runtime.blockedFromState ===
            NPC_STATE_COMMUTING_TO_FOOD
        ) {

            return "Route blocked fetching food";

        }


        if (
            runtime.blockedFromState ===
            NPC_STATE_RETURNING_WITH_FOOD
        ) {

            return "Route blocked returning with food";

        }


        return "Route blocked";

    }


    if (
        settler.workplaceId !== null &&
        !runtime.commutePlan &&
        runtime.state ===
            NPC_STATE_HOME
    ) {

        return "No route to work";

    }


    if (
        runtime.state ===
        NPC_STATE_WORKING
    ) {

        return "At work";

    }


    if (
        runtime.state ===
        NPC_STATE_COMMUTING_TO_WORK
    ) {

        if (
            Number.isFinite(
                runtime.currentShiftStart
            ) &&
            getAbsoluteGameMinute() >
                runtime.currentShiftStart
        ) {

            return "Late - on the way";

        }


        return "On the way";

    }


    if (
        runtime.state ===
        NPC_STATE_COMMUTING_HOME
    ) {

        return "Going home";

    }


    if (
        runtime.state ===
        NPC_STATE_COMMUTING_TO_FOOD
    ) {

        return "Fetching food";

    }


    if (
        runtime.state ===
        NPC_STATE_RETURNING_WITH_FOOD
    ) {

        return "Bringing food home";

    }


    if (
        runtime.state ===
        NPC_STATE_HOME
    ) {

        return "At home";

    }

    if (
        runtime.state ===
        NPC_STATE_WANDERING
    ) {

        return "Wandering";

    }

    return "Unknown";

}

function getBuildingFreeWorkerSlots(
    building
) {

    const def =
        BUILDING_DEFS[
            building.type
        ];


    if (
        !def ||
        !def.workerSlots
    ) {

        return 0;

    }


    const workers =
        getBuildingWorkers(
            building.id
        );


    return Math.max(
        0,
        def.workerSlots -
        workers.length
    );

}


function assignAvailableJobs(
    settlementId = null
) {

    /*
        Finn voksne uten jobb.
        Hvis settlementId er oppgitt, kan de bare
        få arbeid i sin egen by.
    */

    const unemployed =
        worldState.settlers.filter(
            settler =>
                canSettlerWork(settler) &&
                settler.workplaceId === null &&
                (
                    settlementId === null ||
                    settler.settlementId === settlementId
                )
        );


    for (
        const settler
        of unemployed
    ) {

        for (
            const building
            of worldState.buildings
        ) {

            if (
                settlementId !== null &&
                building.settlementId !==
                    settlementId
            ) {

                continue;

            }


            const def =
                BUILDING_DEFS[
                    building.type
                ];


            if (
                !def ||
                !def.workerSlots ||
                !def.jobType
            ) {

                continue;

            }


            if (
                getBuildingFreeWorkerSlots(
                    building
                ) <= 0
            ) {

                continue;

            }


            settler.job =
                def.jobType;


            settler.workplaceId =
                building.id;


            console.log(
                `${settler.name} is now working as ${def.jobType}.`
            );


            break;

        }

    }

}

function normalizeJobAssignments() {

    const usedSlots =
        new Map();


    for (
        const settler
        of worldState.settlers
    ) {

        /*
            Barn skal aldri ha jobb.
        */

        if (
            !canSettlerWork(
                settler
            )
        ) {

            settler.job =
                null;

            settler.workplaceId =
                null;

            continue;

        }


        /*
            Ingen jobb fra før.
        */

        if (
            settler.workplaceId ===
            null
        ) {

            continue;

        }


        const building =
            worldState.buildings.find(
                building =>
                    building.id ===
                    settler.workplaceId
            );


        const def =
            building
                ? BUILDING_DEFS[
                    building.type
                ]
                : null;


        /*
            Workplace finnes ikke lenger
            eller tilbyr ikke denne jobben.
        */

        if (
            !building ||
            !def ||
            !def.workerSlots ||
            !def.jobType
        ) {

            settler.job =
                null;

            settler.workplaceId =
                null;

            continue;

        }


        const currentWorkers =
            usedSlots.get(
                building.id
            ) || 0;


        /*
            Workplace er allerede fullt.
        */

        if (
            currentWorkers >=
            def.workerSlots
        ) {

            settler.job =
                null;

            settler.workplaceId =
                null;

            continue;

        }


        /*
            Sørg også for at jobbtittelen
            stemmer med workplace.
        */

        settler.job =
            def.jobType;


        usedSlots.set(
            building.id,
            currentWorkers + 1
        );

    }


    /*
        Settlers som akkurat mistet en
        ugyldig jobb kan fylle andre
        ledige arbeidsplasser.
    */

    assignAvailableJobs();

}

function getFamilyById(
    familyId
) {

    return (
        worldState.families.find(
            family =>
                family.id === familyId
        ) || null
    );

}

/* =========================================================
   FOOD STORAGE
   ========================================================= */

function getFoodStorageCapacity(
    building
) {

    if (!building) {
        return 0;
    }


    const def =
        BUILDING_DEFS[
            building.type
        ];


    return (
        def?.foodStorageCapacity ||
        0
    );

}


function getFoodDepotBuildings() {

    /*
        Market Hall brukes først.

        Settlement Center fungerer
        som mindre reserve-lager.
    */

    const markets =
        worldState.buildings.filter(
            building =>
                building.type ===
                "marketHall"
        );


    const centers =
        worldState.buildings.filter(
            building =>
                building.type ===
                "settlementCenter"
        );


    return [
        ...markets,
        ...centers
    ];

}


function getFamilyFoodCapacity(
    family
) {

    if (!family) {
        return 0;
    }


    const members =
        getFamilyMembers(
            family
        );


    return (
        members.length *
        HOUSEHOLD_FOOD_DAYS
    );

}


function getFamilyDailyFoodNeed(
    family
) {

    if (!family) {
        return 0;
    }


    return getFamilyMembers(
        family
    ).length;

}


function getTotalMarketFood() {

    let total =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "marketHall"
        ) {

            continue;

        }


        total +=
            Number.isFinite(
                building.foodStorage
            )
                ? building.foodStorage
                : 0;

    }


    return total;

}


function getTotalMarketFoodCapacity() {

    let total =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "marketHall"
        ) {

            continue;

        }


        total +=
            getFoodStorageCapacity(
                building
            );

    }


    return total;

}


function getTotalCenterFood() {

    let total =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "settlementCenter"
        ) {

            continue;

        }


        total +=
            Number.isFinite(
                building.foodStorage
            )
                ? building.foodStorage
                : 0;

    }


    return total;

}


function getTotalCenterFoodCapacity() {

    let total =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            building.type !==
            "settlementCenter"
        ) {

            continue;

        }


        total +=
            getFoodStorageCapacity(
                building
            );

    }


    return total;

}


function getTotalHouseholdFood() {

    let total =
        0;


    for (
        const family
        of worldState.families
    ) {

        total +=
            Number.isFinite(
                family.foodStorage
            )
                ? family.foodStorage
                : 0;

    }


    return total;

}


function getTotalHouseholdFoodCapacity() {

    let total =
        0;


    for (
        const family
        of worldState.families
    ) {

        total +=
            getFamilyFoodCapacity(
                family
            );

    }


    return total;

}


function getTotalFoodInTransit() {

    let total =
        0;


    for (
        const settler
        of worldState.settlers
    ) {

        total +=
            Number.isFinite(
                settler.carriedFood
            )
                ? settler.carriedFood
                : 0;

    }


    return total;

}


function getFamilyFoodInTransit(
    family
) {

    if (!family) {
        return 0;
    }


    let total =
        0;


    for (
        const member
        of getFamilyMembers(
            family
        )
    ) {

        total +=
            Number.isFinite(
                member.carriedFood
            )
                ? member.carriedFood
                : 0;

    }


    return total;

}


function getFamilyFoodPickupAmount(
    family
) {

    if (!family) {
        return 0;
    }


    const capacity =
        getFamilyFoodCapacity(
            family
        );


    const alreadyAvailable =
        (
            Number.isFinite(
                family.foodStorage
            )
                ? family.foodStorage
                : 0
        ) +
        getFamilyFoodInTransit(
            family
        );


    return Math.max(
        0,
        capacity -
            alreadyAvailable
    );

}


function familyNeedsFoodPickup(
    family
) {

    if (!family) {
        return false;
    }


    const dailyNeed =
        getFamilyDailyFoodNeed(
            family
        );


    if (
        dailyNeed <= 0
    ) {

        return false;

    }


    const effectiveFood =
        (
            Number.isFinite(
                family.foodStorage
            )
                ? family.foodStorage
                : 0
        ) +
        getFamilyFoodInTransit(
            family
        );


    const threshold =
        dailyNeed *
        HOUSEHOLD_REFILL_THRESHOLD_DAYS;


    return (
        effectiveFood <=
            threshold &&
        getFamilyFoodPickupAmount(
            family
        ) > 0
    );

}


function clearFamilyFoodRun(
    family
) {

    if (!family) {
        return;
    }


    family.foodRunSettlerId =
        null;

    family.foodRunDueMinute =
        null;

}


function chooseFamilyFoodRunner(
    family
) {

    const adults =
        getFamilyMembers(
            family
        ).filter(
            settler =>
                canSettlerWork(
                    settler
                )
        );


    if (
        adults.length === 0
    ) {

        return null;

    }


    /*
        Hvis noen voksne er hjemme uten jobb,
        lar vi dem vanligvis ta turen.

        Hvis alle jobber, velges en tilfeldig
        voksen som henter mat etter arbeid.
    */

    const adultsAtHome =
        adults.filter(
            settler =>
                settler.workplaceId ===
                null
        );


    const pool =
        adultsAtHome.length > 0
            ? adultsAtHome
            : adults;


    return pool[
        randomInteger(
            0,
            pool.length - 1
        )
    ];

}


function scheduleFamilyFoodRun(
    family,
    currentMinute =
        getAbsoluteGameMinute()
) {

    if (
        !familyNeedsFoodPickup(
            family
        )
    ) {

        clearFamilyFoodRun(
            family
        );

        return false;

    }


    if (
        Number.isInteger(
            family.foodRunSettlerId
        ) &&
        getSettlerById(
            family.foodRunSettlerId
        )
    ) {

        return true;

    }


    const settler =
        chooseFamilyFoodRunner(
            family
        );


    if (!settler) {
        return false;
    }


    let dueMinute =
        currentMinute;


    if (
        settler.workplaceId ===
        null
    ) {

        dueMinute +=
            randomInteger(
                FOOD_RUN_HOME_DELAY_MIN_MINUTES,
                FOOD_RUN_HOME_DELAY_MAX_MINUTES
            );

    }
    else {

        const dayStart =
            getSimulationDayStartMinute(
                currentMinute
            );


        const plan =
            buildSettlerCommutePlan(
                settler
            );


        if (!plan) {

            /*
                Har personen en jobb, men ingen
                faktisk vei dit, behandles personen
                som hjemme for denne mathentingen.
            */

            dueMinute =
                currentMinute +
                randomInteger(
                    FOOD_RUN_HOME_DELAY_MIN_MINUTES,
                    FOOD_RUN_HOME_DELAY_MAX_MINUTES
                );

        }
        else {

            /*
                Arbeidere får ikke et fast klokkeslett
                her. Timeren startes først når de
                faktisk har kommet hjem fra jobb.
            */

            dueMinute =
                null;

        }


        if (
            Number.isFinite(
                dueMinute
            ) &&
            dueMinute <=
                currentMinute
        ) {

            dueMinute =
                currentMinute +
                randomInteger(
                    FOOD_RUN_RETRY_MIN_MINUTES,
                    FOOD_RUN_RETRY_MAX_MINUTES
                );

        }

    }


    family.foodRunSettlerId =
        settler.id;

    family.foodRunDueMinute =
        dueMinute;


    return true;

}


function scheduleHouseholdFoodRuns() {

    const currentMinute =
        getAbsoluteGameMinute();


    for (
        const family
        of worldState.families
    ) {

        scheduleFamilyFoodRun(
            family,
            currentMinute
        );

    }

}


function updateFoodDistributionStatus() {

    let totalWanted =
        0;


    let householdsUnableToRefill =
        0;


    let availableDepotFood =
        getTotalMarketFood() +
        getTotalCenterFood();


    for (
        const family
        of worldState.families
    ) {

        if (
            !familyNeedsFoodPickup(
                family
            )
        ) {

            continue;

        }


        const wanted =
            getFamilyFoodPickupAmount(
                family
            );


        totalWanted +=
            wanted;


        const supplied =
            Math.min(
                wanted,
                availableDepotFood
            );


        availableDepotFood -=
            supplied;


        if (
            supplied <
            wanted
        ) {

            householdsUnableToRefill +=
                1;

        }

    }


    const depotFood =
        getTotalMarketFood() +
        getTotalCenterFood();


    worldState.foodStatus
        .unfilledHouseholdFood =
            Math.max(
                0,
                totalWanted -
                depotFood
            );


    worldState.foodStatus
        .householdsUnableToRefill =
            householdsUnableToRefill;


    worldState.foodStatus
        .distributionShortageActive =
            (
                totalWanted > 0 &&
                depotFood <
                    totalWanted
            );

}


function getTotalFoodAvailable() {

    return (
        getTotalMarketFood() +
        getTotalCenterFood() +
        getTotalHouseholdFood() +
        getTotalFoodInTransit()
    );

}


function syncLegacyFoodResource() {

    /*
        resources.food beholdes foreløpig
        for save-kompatibilitet.

        Det er IKKE lenger et ekte lager.
    */

    worldState.resources.food =
        getTotalFoodAvailable();

}


function storeFoodInDepots(
    amount
) {

    let remaining =
        Math.max(
            0,
            amount
        );


    let stored =
        0;


    const depots =
        getFoodDepotBuildings();


    for (
        const building
        of depots
    ) {

        if (
            remaining <= 0
        ) {

            break;

        }


        if (
            !Number.isFinite(
                building.foodStorage
            )
        ) {

            building.foodStorage =
                0;

        }


        const capacity =
            getFoodStorageCapacity(
                building
            );


        const freeSpace =
            Math.max(
                0,
                capacity -
                building.foodStorage
            );


        const amountToStore =
            Math.min(
                remaining,
                freeSpace
            );


        building.foodStorage +=
            amountToStore;


        remaining -=
            amountToStore;


        stored +=
            amountToStore;

    }


    syncLegacyFoodResource();


    return {

        stored:
            stored,

        lost:
            remaining

    };

}


function takeFoodFromBuilding(
    building,
    amount
) {

    if (
        !building ||
        !Number.isFinite(
            building.foodStorage
        )
    ) {

        return 0;

    }


    const taken =
        Math.min(
            Math.max(
                0,
                amount
            ),
            building.foodStorage
        );


    building.foodStorage -=
        taken;


    syncLegacyFoodResource();


    return taken;

}


function takeFoodFromDepots(
    amount
) {

    let remaining =
        Math.max(
            0,
            amount
        );


    let taken =
        0;


    /*
        Foretrekk Market Hall.

        Hvis den er tom brukes
        Settlement Center.
    */

    const depots =
        getFoodDepotBuildings();


    for (
        const building
        of depots
    ) {

        if (
            remaining <= 0
        ) {

            break;

        }


        if (
            !Number.isFinite(
                building.foodStorage
            )
        ) {

            building.foodStorage =
                0;

        }


        const amountToTake =
            Math.min(
                remaining,
                building.foodStorage
            );


        building.foodStorage -=
            amountToTake;


        remaining -=
            amountToTake;


        taken +=
            amountToTake;

    }


    return taken;

}


function refillFamilyFoodStorage(
    family
) {

    if (!family) {
        return 0;
    }


    if (
        !Number.isFinite(
            family.foodStorage
        )
    ) {

        family.foodStorage =
            0;

    }


    const dailyNeed =
        getFamilyDailyFoodNeed(
            family
        );


    if (
        dailyNeed <= 0
    ) {

        return 0;

    }


    const refillThreshold =
        dailyNeed *
        HOUSEHOLD_REFILL_THRESHOLD_DAYS;


    /*
        Har familien fortsatt mer enn
        to dager med mat, trenger de
        ikke hente noe.
    */

    if (
        family.foodStorage >
        refillThreshold
    ) {

        return 0;

    }


    const capacity =
        getFamilyFoodCapacity(
            family
        );


    const wanted =
        Math.max(
            0,
            capacity -
            family.foodStorage
        );


    const received =
        takeFoodFromDepots(
            wanted
        );


    family.foodStorage +=
        received;


    syncLegacyFoodResource();


    return received;

}


function refillAllHouseholdsFromDepots() {

    let totalWanted =
        0;


    let totalReceived =
        0;


    let householdsUnableToRefill =
        0;


    for (
        const family
        of worldState.families
    ) {

        const dailyNeed =
            getFamilyDailyFoodNeed(
                family
            );


        if (
            dailyNeed <= 0
        ) {

            continue;

        }


        if (
            !Number.isFinite(
                family.foodStorage
            )
        ) {

            family.foodStorage =
                0;

        }


        const threshold =
            dailyNeed *
            HOUSEHOLD_REFILL_THRESHOLD_DAYS;


        if (
            family.foodStorage >
            threshold
        ) {

            continue;

        }


        const capacity =
            getFamilyFoodCapacity(
                family
            );


        const wanted =
            Math.max(
                0,
                capacity -
                family.foodStorage
            );


        totalWanted +=
            wanted;


        const received =
            takeFoodFromDepots(
                wanted
            );


        family.foodStorage +=
            received;


        totalReceived +=
            received;


        if (
            received <
            wanted
        ) {

            householdsUnableToRefill +=
                1;

        }

    }


    worldState.foodStatus
        .unfilledHouseholdFood =
            Math.max(
                0,
                totalWanted -
                totalReceived
            );


    worldState.foodStatus
        .householdsUnableToRefill =
            householdsUnableToRefill;


    worldState.foodStatus
        .distributionShortageActive =
            (
                totalWanted > 0 &&
                totalReceived <
                    totalWanted
            );


    syncLegacyFoodResource();

}


function getMarketHalls() {

    return worldState.buildings.filter(
        building =>
            building.type ===
            "marketHall"
    );

}


function getTotalMarketFood() {

    let total =
        0;


    for (
        const building
        of getMarketHalls()
    ) {

        total +=
            Number.isFinite(
                building.foodStorage
            )
                ? building.foodStorage
                : 0;

    }


    return total;

}


function getTotalMarketFoodCapacity() {

    return (
        getMarketHalls().length *
        MARKET_HALL_FOOD_CAPACITY
    );

}

function getTotalHouseholdFood() {

    let total =
        0;


    for (
        const family
        of worldState.families
    ) {

        total +=
            Number.isFinite(
                family.foodStorage
            )
                ? family.foodStorage
                : 0;

    }


    return total;

}

function getTotalHouseholdFoodCapacity() {

    let total =
        0;


    for (
        const family
        of worldState.families
    ) {

        total +=
            getFamilyFoodCapacity(
                family
            );

    }


    return total;

}

function findHomeForFamily(
    familySize,
    settlementId = null
) {

    for (
        const building
        of worldState.buildings
    ) {

        if (
            settlementId !== null &&
            building.settlementId !==
                settlementId
        ) {

            continue;

        }

        const freeHousing =
            getBuildingFreeHousing(
                building
            );


        if (
            freeHousing >= familySize
        ) {

            return building;

        }

    }


    return null;

}


function getLargestAvailableHome(
    settlementId = null
) {

    let largest =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        if (
            settlementId !== null &&
            building.settlementId !==
                settlementId
        ) {

            continue;

        }

        const freeHousing =
            getBuildingFreeHousing(
                building
            );


        largest =
            Math.max(
                largest,
                freeHousing
            );

    }


    return largest;

}


function createFamily(
    size,
    homeId,
    settlementId = null
) {

    const familyId =
        worldState.nextFamilyId;


    worldState.nextFamilyId +=
        1;


    const lastName =
        getRandomArrayItem(
            nameData.surnames
        ) ||
        `Family${familyId}`;


    const family = {

        id:
            familyId,

        lastName:
            lastName,

        homeId:
            homeId,

        settlementId:
            settlementId,

        memberIds: [],

        foundedDay:
            worldState.time.day,

        foodStorage:
            0,

        lastMealRequired:
            0,

        lastMealConsumed:
            0,

        lastMealMissing:
            0,

        foodRunSettlerId:
            null,

        foodRunDueMinute:
            null

    };


    worldState.families.push(
        family
    );

    /*
        Én person = single household.
    */

    if (
        size === 1
    ) {

        const gender =
            getRandomGender();


        const settler =
            createSettler({

                gender:
                    gender,

                lastName:
                    lastName,

                familyId:
                    familyId,

                homeId:
                    homeId,

                settlementId:
                    settlementId,

                relation:
                    "Head"

            });


        family.memberIds.push(
            settler.id
        );

        assignAvailableJobs(
            settlementId
        );

        return family;

    }

    /*
        To voksne.
    */

    const father =
        createSettler({

            gender:
                "male",

            lastName:
                lastName,

            familyId:
                familyId,

            homeId:
                homeId,

            settlementId:
                settlementId,

            relation:
                "Father"

        });

    family.memberIds.push(
        father.id
    );

    const mother =
        createSettler({

            gender:
                "female",

            lastName:
                lastName,

            familyId:
                familyId,

            homeId:
                homeId,

            settlementId:
                settlementId,

            relation:
                "Mother"

        });

    family.memberIds.push(
        mother.id
    );

    /*
        Eventuelle barn.
    */

    for (
        let i = 2;
        i < size;
        i++
    ) {

        const gender =
            getRandomGender();


        const child =
            createSettler({

                gender:
                    gender,

                lastName:
                    lastName,

                familyId:
                    familyId,

                homeId:
                    homeId,

                settlementId:
                    settlementId,

                relation:
                    gender === "male"
                        ? "Son"
                        : "Daughter"

            });

        family.memberIds.push(
            child.id
        );

    }

    assignAvailableJobs(
            settlementId
        );

    console.log(
        `${lastName} family created:`,
        family
    );


    return family;

}



function processPopulationGrowth() {

    /*
        Ingen nye familier flytter inn
        på en dag der settlementet ikke
        klarte å mate dagens befolkning.
    */

    if (
        worldState.foodStatus
            .shortageActive ||
        worldState.foodStatus
            .distributionShortageActive
    ) {

        console.log(
            "Immigration stopped because of food shortage."
        );

        return;

    }

    const largestAvailableHome =
        getLargestAvailableHome();

    /*
        Ingen ledig bolig.
    */

    if (
        largestAvailableHome <= 0
    ) {

        return;

    }

    /*
        Krev fortsatt litt mat
        før nye folk flytter inn.
    */

    if (
        getTotalFoodAvailable() <
        MIN_FOOD_FOR_POPULATION_GROWTH
    ) {

        return;

    }

    /*
        Household kan bestå av
        1 til 5 personer.

        Det blir aldri større enn
        boligen vi faktisk har plass i.
    */

    const maxFamilySize =
        Math.min(
            5,
            largestAvailableHome
        );

    const familySize =
        1 +
        Math.floor(
            Math.random() *
            maxFamilySize
        );

    const home =
        findHomeForFamily(
            familySize
        );

    if (!home) {
        return;
    }

    const family =
        createFamily(
            familySize,
            home.id
        );

    refillFamilyFoodStorage(
        family
    );


    scheduleFamilyFoodRun(
        family
    );


    updateFoodDistributionStatus();


    console.log(
        `${family.lastName} family has arrived with ${familySize} member(s).`
    );

}

function updateSimulation(
    deltaTime
) {

    /*
        I RPG-modus går verdensklokken selv om
        det ikke finnes en player-founded settlement.
    */

    worldState.time.elapsed +=
        deltaTime;


    while (
        worldState.time.elapsed >=
        SECONDS_PER_DAY
    ) {

        worldState.time.elapsed -=
            SECONDS_PER_DAY;


        worldState.time.day +=
            1;


        processNewDay();

    }

    processGameHours();


}

function update(
    deltaTime
) {

    updateMouseWorldPosition();

    updatePlayerMovement(
        deltaTime
    );

    updateCameraFollowPlayer();

    updateDebugUI();

    const effectiveTimeScale =
        getEffectiveTimeScale();


    const simulationDeltaTime =
        deltaTime *
        effectiveTimeScale;


    if (
        simulationDeltaTime > 0
    ) {

        updateSimulation(
            simulationDeltaTime
        );


        updateSettlerMovement(
            simulationDeltaTime
        );

    }

    updateClockUI();

    refreshOpenBuildingInfo();

    refreshPeopleMenu(
        deltaTime
    );

    refreshEconomyMenu(
        deltaTime
    );

}

function getPopulationCapacity() {

    let capacity =
        0;


    for (
        const building
        of worldState.buildings
    ) {

        const def =
            BUILDING_DEFS[
                building.type
            ];


        if (!def) {
            continue;
        }


        capacity +=
            def.housingCapacity || 0;

    }


    return capacity;

}

function getBuildingResidents(
    buildingId
) {

    return worldState.settlers.filter(
        settler =>
            settler.homeId === buildingId
    );

}


function getBuildingFreeHousing(
    building
) {

    const def =
        BUILDING_DEFS[
            building.type
        ];


    if (
        !def ||
        !def.housingCapacity
    ) {

        return 0;

    }


    const residents =
        getBuildingResidents(
            building.id
        );


    return Math.max(
        0,
        def.housingCapacity -
        residents.length
    );

}

function assignHomeToSettler(
    settler
) {

    /*
        Har allerede et hjem.
    */

    if (
        settler.homeId !== null
    ) {

        return true;

    }

    for (
        const building
        of worldState.buildings
    ) {

        const freeHousing =
            getBuildingFreeHousing(
                building
            );

        if (
            freeHousing <= 0
        ) {

            continue;

        }

        settler.homeId =
            building.id;

        console.log(
            `${settler.name} moved into ${building.type} #${building.id}`
        );

        return true;

    }

    console.log(
        `${settler.name} has no home.`
    );

    return false;

}

function assignHomesToUnhousedSettlers() {

    for (
        const settler
        of worldState.settlers
    ) {

        if (
            settler.homeId === null
        ) {

            assignHomeToSettler(
                settler
            );

        }

    }

}

function getBuildingById(
    buildingId
) {

    return (
        worldState.buildings.find(
            building =>
                building.id === buildingId
        ) || null
    );

}

function getAbsoluteGameMinute() {

    const minutesIntoDay =
        Math.floor(
            (
                worldState.time.elapsed /
                SECONDS_PER_DAY
            ) *
            GAME_MINUTES_PER_DAY
        );


    return (
        (
            worldState.time.day - 1
        ) *
        GAME_MINUTES_PER_DAY
    ) + minutesIntoDay;

}

function getCurrentGameClock() {

    const dayProgress =
        worldState.time.elapsed /
        SECONDS_PER_DAY;


    const minutesPassed =
        Math.floor(
            dayProgress *
            24 *
            60
        );


    const startMinutes =
        8 * 60;


    const clockMinutes =
        (
            startMinutes +
            minutesPassed
        ) %
        (
            24 * 60
        );


    const hour =
        Math.floor(
            clockMinutes /
            60
        );


    const minute =
        clockMinutes %
        60;


    return {

        hour:
            hour,

        minute:
            minute,

        clockMinutes:
            clockMinutes

    };

}


function getCurrentGameHour() {

    return (
        getCurrentGameClock()
            .hour
    );

}

function getNpcMoveSpeedForTile(
    x,
    y
) {

    if (
        tileHasRoad(
            x,
            y
        )
    ) {

        return NPC_ROAD_MOVE_SPEED;

    }


    return NPC_GRASS_MOVE_SPEED;

}

function isNpcWalkableTile(
    x,
    y
) {

    /*
        Player og NPC-er bruker nå samme faste
        Tiled collision/world rules.
    */
    return isPlayerWalkableTile(
        x,
        y
    );

}


function getBuildingAccessTiles(
    building
) {

    const tiles =
        [];

    if (
        building.type ===
            "lumberMill" &&
        Number.isInteger(
            building.entranceX
        ) &&
        Number.isInteger(
            building.entranceY
        )
    ) {

        if (
            isNpcWalkableTile(
                building.entranceX,
                building.entranceY
            )
        ) {

            return [
                {
                    x:
                        building.entranceX,

                    y:
                        building.entranceY
                }
            ];

        }

    }


    const used =
        new Set();


    function addTile(
        x,
        y
    ) {

        const key =
            getTileKey(
                x,
                y
            );


        if (
            used.has(key)
        ) {

            return;

        }


        used.add(key);


        if (
            !isNpcWalkableTile(
                x,
                y
            )
        ) {

            return;

        }


        tiles.push({
            x,
            y
        });

    }


    /*
        Tiles over og under bygningen.
    */

    for (
        let x = building.x;
        x <
        building.x +
        building.width;
        x++
    ) {

        addTile(
            x,
            building.y - 1
        );


        addTile(
            x,
            building.y +
            building.height
        );

    }


    /*
        Tiles på venstre og høyre side.
    */

    for (
        let y = building.y;
        y <
        building.y +
        building.height;
        y++
    ) {

        addTile(
            building.x - 1,
            y
        );


        addTile(
            building.x +
            building.width,
            y
        );

    }


    return tiles;

}


function getBestBuildingAccessTile(
    building,
    fromX,
    fromY
) {

    const tiles =
        getBuildingAccessTiles(
            building
        );


    if (
        tiles.length === 0
    ) {

        return null;

    }


    tiles.sort(
        (a, b) => {

            const distanceA =
                Math.abs(
                    a.x - fromX
                ) +
                Math.abs(
                    a.y - fromY
                );


            const distanceB =
                Math.abs(
                    b.x - fromX
                ) +
                Math.abs(
                    b.y - fromY
                );


            return (
                distanceA -
                distanceB
            );

        }
    );


    return tiles[0];

}


function findNpcPath(
    startX,
    startY,
    targetX,
    targetY,
    bounds = null
) {

    if (
        startX === targetX &&
        startY === targetY
    ) {

        return [];

    }


    const startKey =
        getTileKey(
            startX,
            startY
        );


    const targetKey =
        getTileKey(
            targetX,
            targetY
        );


    const queue = [
        {
            x:
                startX,

            y:
                startY
        }
    ];


    let queueIndex =
        0;


    const visited =
        new Set([
            startKey
        ]);


    const cameFrom =
        new Map();


    const positions =
        new Map();


    positions.set(
        startKey,
        {
            x:
                startX,

            y:
                startY
        }
    );


    const directions = [

        {
            x: 1,
            y: 0
        },

        {
            x: -1,
            y: 0
        },

        {
            x: 0,
            y: 1
        },

        {
            x: 0,
            y: -1
        }

    ];


    while (
        queueIndex <
        queue.length
    ) {

        const current =
            queue[
                queueIndex
            ];


        queueIndex +=
            1;


        for (
            const direction
            of directions
        ) {

            const nextX =
                current.x +
                direction.x;


            const nextY =
                current.y +
                direction.y;

            if (
                bounds &&
                (
                    nextX <
                        bounds.minX ||
                    nextX >
                        bounds.maxX ||
                    nextY <
                        bounds.minY ||
                    nextY >
                        bounds.maxY
                )
            ) {

                continue;

            }


            const nextKey =
                getTileKey(
                    nextX,
                    nextY
                );


            if (
                visited.has(
                    nextKey
                )
            ) {

                continue;

            }


            if (
                !isNpcWalkableTile(
                    nextX,
                    nextY
                )
            ) {

                continue;

            }


            visited.add(
                nextKey
            );


            cameFrom.set(
                nextKey,
                getTileKey(
                    current.x,
                    current.y
                )
            );


            positions.set(
                nextKey,
                {
                    x:
                        nextX,

                    y:
                        nextY
                }
            );


            if (
                nextKey ===
                targetKey
            ) {

                const path =
                    [];


                let key =
                    targetKey;


                while (
                    key !==
                    startKey
                ) {

                    const position =
                        positions.get(
                            key
                        );


                    path.push(
                        position
                    );


                    key =
                        cameFrom.get(
                            key
                        );

                }


                path.reverse();


                return path;

            }


            queue.push({
                x:
                    nextX,

                y:
                    nextY
            });

        }

    }


    return null;

}

function findNpcRouteBetweenBuildings(
    fromBuilding,
    toBuilding
) {

    const startTiles =
        getBuildingAccessTiles(
            fromBuilding
        );


    const targetTiles =
        getBuildingAccessTiles(
            toBuilding
        );


    if (
        startTiles.length === 0 ||
        targetTiles.length === 0
    ) {

        return null;

    }


    const targetKeys =
        new Set(
            targetTiles.map(
                tile =>
                    getTileKey(
                        tile.x,
                        tile.y
                    )
            )
        );


    /*
        Dijkstra.

        Cost er faktisk reisetid,
        ikke bare antall tiles.
    */

    const open =
        [];


    const bestCost =
        new Map();


    const cameFrom =
        new Map();


    const positions =
        new Map();


    for (
        const tile
        of startTiles
    ) {

        const key =
            getTileKey(
                tile.x,
                tile.y
            );


        open.push({

            x:
                tile.x,

            y:
                tile.y,

            cost:
                0

        });


        bestCost.set(
            key,
            0
        );


        positions.set(
            key,
            {
                x:
                    tile.x,

                y:
                    tile.y
            }
        );

    }


    const directions = [

        {
            x: 1,
            y: 0
        },

        {
            x: -1,
            y: 0
        },

        {
            x: 0,
            y: 1
        },

        {
            x: 0,
            y: -1
        }

    ];


    while (
        open.length > 0
    ) {

        /*
            Laveste travel cost først.
        */

        open.sort(
            (a, b) =>
                a.cost -
                b.cost
        );


        const current =
            open.shift();


        const currentKey =
            getTileKey(
                current.x,
                current.y
            );


        /*
            Fant arbeidsplassen.
        */

        if (
            targetKeys.has(
                currentKey
            )
        ) {

            const route =
                [];


            let key =
                currentKey;


            while (key) {

                route.push(
                    positions.get(
                        key
                    )
                );


                key =
                    cameFrom.get(
                        key
                    );

            }


            route.reverse();


            return route;

        }


        for (
            const direction
            of directions
        ) {

            const nextX =
                current.x +
                direction.x;


            const nextY =
                current.y +
                direction.y;


            if (
                !isNpcWalkableTile(
                    nextX,
                    nextY
                )
            ) {

                continue;

            }


            const nextKey =
                getTileKey(
                    nextX,
                    nextY
                );


            /*
                Kostnaden for én tile
                er tiden det tar å gå dit.
            */

            const speed =
                getNpcMoveSpeedForTile(
                    nextX,
                    nextY
                );


            const stepCost =
                1 /
                speed;


            const newCost =
                current.cost +
                stepCost;


            const oldCost =
                bestCost.get(
                    nextKey
                );


            if (
                oldCost !== undefined &&
                newCost >= oldCost
            ) {

                continue;

            }


            bestCost.set(
                nextKey,
                newCost
            );


            cameFrom.set(
                nextKey,
                currentKey
            );


            positions.set(
                nextKey,
                {
                    x:
                        nextX,

                    y:
                        nextY
                }
            );


            open.push({

                x:
                    nextX,

                y:
                    nextY,

                cost:
                    newCost

            });

        }

    }


    return null;

}

function getNpcRouteSimulationSeconds(
    route
) {

    if (
        !route ||
        route.length <= 1
    ) {

        return 0;

    }


    let seconds =
        0;


    for (
        let i = 1;
        i < route.length;
        i++
    ) {

        const tile =
            route[i];


        const speed =
            getNpcMoveSpeedForTile(
                tile.x,
                tile.y
            );


        seconds +=
            1 /
            speed;

    }


    return seconds;

}

function getNpcRouteGameMinutes(
    route
) {

    const simulationSeconds =
        getNpcRouteSimulationSeconds(
            route
        );


    const gameMinutesPerSimulationSecond =
        GAME_MINUTES_PER_DAY /
        SECONDS_PER_DAY;


    return Math.ceil(
        simulationSeconds *
        gameMinutesPerSimulationSecond
    );

}

function getWanderBounds(
    anchorX,
    anchorY,
    radius
) {

    return {

        minX:
            Math.max(
                0,
                anchorX -
                radius -
                1
            ),

        maxX:
            Math.min(
                mapWidth - 1,
                anchorX +
                radius +
                1
            ),

        minY:
            Math.max(
                0,
                anchorY -
                radius -
                1
            ),

        maxY:
            Math.min(
                mapHeight - 1,
                anchorY +
                radius +
                1
            )

    };

}


function findRandomWanderRoute(
    runtime
) {

    if (
        !Number.isFinite(
            runtime.x
        ) ||
        !Number.isFinite(
            runtime.y
        ) ||
        !Number.isInteger(
            runtime.wanderAnchorX
        ) ||
        !Number.isInteger(
            runtime.wanderAnchorY
        ) ||
        !Number.isInteger(
            runtime.wanderRadius
        )
    ) {

        return null;

    }


    const startX =
        Math.floor(
            runtime.x
        );


    const startY =
        Math.floor(
            runtime.y
        );


    const anchorX =
        runtime.wanderAnchorX;


    const anchorY =
        runtime.wanderAnchorY;


    const radius =
        runtime.wanderRadius;


    const bounds =
        getWanderBounds(
            anchorX,
            anchorY,
            radius
        );


    for (
        let attempt = 0;
        attempt <
            WANDER_ROUTE_ATTEMPTS;
        attempt++
    ) {

        const targetX =
            randomInteger(
                Math.max(
                    0,
                    anchorX -
                    radius
                ),
                Math.min(
                    mapWidth - 1,
                    anchorX +
                    radius
                )
            );


        const targetY =
            randomInteger(
                Math.max(
                    0,
                    anchorY -
                    radius
                ),
                Math.min(
                    mapHeight - 1,
                    anchorY +
                    radius
                )
            );


        /*
            Hold området omtrent
            sirkelformet.
        */

        const anchorDistance =
            Math.hypot(
                targetX -
                    anchorX,
                targetY -
                    anchorY
            );


        if (
            anchorDistance >
            radius
        ) {

            continue;

        }


        if (
            targetX ===
                startX &&
            targetY ===
                startY
        ) {

            continue;

        }


        if (
            !isNpcWalkableTile(
                targetX,
                targetY
            )
        ) {

            continue;

        }


        const path =
            findNpcPath(
                startX,
                startY,
                targetX,
                targetY,
                bounds
            );


        if (
            !path ||
            path.length === 0
        ) {

            continue;

        }


        return [

            {
                x:
                    startX,

                y:
                    startY
            },

            ...path

        ];

    }


    return null;

}


function chooseNextWanderPath(
    runtime,
    currentMinute,
    pauseMin,
    pauseMax
) {

    const route =
        findRandomWanderRoute(
            runtime
        );


    if (!route) {

        runtime.path =
            [];


        runtime.nextWanderDecisionMinute =
            currentMinute +
            randomInteger(
                pauseMin,
                pauseMax
            );


        return false;

    }


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    return true;

}

function getSimulationDayStartMinute(
    currentMinute
) {

    return (
        Math.floor(
            currentMinute /
            GAME_MINUTES_PER_DAY
        ) *
        GAME_MINUTES_PER_DAY
    );

}

function isChildWanderTime(
    currentMinute
) {

    const dayStart =
        getSimulationDayStartMinute(
            currentMinute
        );


    const minuteIntoDay =
        currentMinute -
        dayStart;


    return (
        minuteIntoDay >=
            CHILD_WANDER_START_OFFSET_MINUTES &&
        minuteIntoDay <
            CHILD_WANDER_END_OFFSET_MINUTES
    );

}

function startChildWandering(
    settler,
    runtime,
    currentMinute
) {

    const home =
        getBuildingById(
            settler.homeId
        );


    if (!home) {

        return false;

    }


    const accessTiles =
        getBuildingAccessTiles(
            home
        );


    if (
        accessTiles.length === 0
    ) {

        runtime.nextWanderDecisionMinute =
            currentMinute +
            30;


        return false;

    }


    const spawnTile =
        accessTiles[
            randomInteger(
                0,
                accessTiles.length - 1
            )
        ];


    runtime.state =
        NPC_STATE_WANDERING;


    runtime.x =
        spawnTile.x +
        0.5;


    runtime.y =
        spawnTile.y +
        0.5;


    runtime.path =
        [];


    runtime.wanderAnchorX =
        Math.floor(
            home.x +
            home.width /
            2
        );


    runtime.wanderAnchorY =
        Math.floor(
            home.y +
            home.height /
            2
        );


    runtime.wanderRadius =
        randomInteger(
            CHILD_WANDER_RADIUS_MIN,
            CHILD_WANDER_RADIUS_MAX
        );


    runtime.wanderReturningHome =
        false;


    runtime.nextWanderDecisionMinute =
        currentMinute;


    chooseNextWanderPath(
        runtime,
        currentMinute,
        CHILD_WANDER_PAUSE_MIN_MINUTES,
        CHILD_WANDER_PAUSE_MAX_MINUTES
    );


    return true;

}

function finishWanderingSettlerAtHome(
    runtime
) {

    runtime.state =
        NPC_STATE_HOME;


    runtime.x =
        null;


    runtime.y =
        null;


    runtime.path =
        [];


    clearSettlerWanderState(
        runtime
    );

}

function tryGiveWanderingSettlerHomePath(
    settler,
    runtime,
    currentMinute
) {

    const home =
        getBuildingById(
            settler.homeId
        );


    if (!home) {

        return false;

    }


    if (
        !Number.isFinite(
            runtime.x
        ) ||
        !Number.isFinite(
            runtime.y
        )
    ) {

        finishWanderingSettlerAtHome(
            runtime
        );


        return true;

    }


    const route =
        findNpcRouteFromTileToBuilding(
            Math.floor(
                runtime.x
            ),
            Math.floor(
                runtime.y
            ),
            home
        );


    if (!route) {

        runtime.path =
            [];


        runtime.wanderReturningHome =
            true;


        runtime.nextWanderDecisionMinute =
            currentMinute +
            NPC_ROUTE_RETRY_MINUTES;


        return false;

    }


    /*
        NPC står allerede ved
        husets access tile.
    */

    if (
        route.length <= 1
    ) {

        finishWanderingSettlerAtHome(
            runtime
        );


        return true;

    }


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    runtime.wanderReturningHome =
        true;


    return true;

}

function updateChildWander(
    settler,
    runtime,
    currentMinute,
    deltaTime
) {

    const wanderTime =
        isChildWanderTime(
            currentMinute
        );


    /* =============================================
       HOME
       ============================================= */

    if (
        runtime.state ===
        NPC_STATE_HOME
    ) {

        /*
            HOME = inne i huset.

            Sørg for at barnet ikke blir stående
            synlig på en gammel access-tile mens
            det venter på å gå ut og leke.
        */

        runtime.x =
            null;

        runtime.y =
            null;

        runtime.path =
            [];


        if (!wanderTime) {

            runtime.nextWanderDecisionMinute =
                null;


            return;

        }


        /*
            Ikke la alle barna gå ut
            på nøyaktig samme minutt.
        */

        if (
            !Number.isFinite(
                runtime.nextWanderDecisionMinute
            )
        ) {

            runtime.nextWanderDecisionMinute =
                currentMinute +
                randomInteger(
                    0,
                    CHILD_WANDER_FIRST_DELAY_MAX_MINUTES
                );


            return;

        }


        if (
            currentMinute <
            runtime.nextWanderDecisionMinute
        ) {

            return;

        }


        /*
            Først her forlater barnet huset.
            startChildWandering() setter state til
            WANDERING og gir en fysisk posisjon.
        */

        startChildWandering(
            settler,
            runtime,
            currentMinute
        );


        return;

    }


    if (
        runtime.state !==
        NPC_STATE_WANDERING
    ) {

        return;

    }


    /* =============================================
       SKAL HJEM
       ============================================= */

    if (
        !wanderTime ||
        runtime.wanderReturningHome
    ) {

        runtime.wanderReturningHome =
            true;


        /*
            Trenger ny hjem-rute.
        */

        if (
            runtime.path.length === 0
        ) {

            if (
                Number.isFinite(
                    runtime.nextWanderDecisionMinute
                ) &&
                currentMinute <
                    runtime.nextWanderDecisionMinute
            ) {

                return;

            }


            const gotHomePath =
                tryGiveWanderingSettlerHomePath(
                    settler,
                    runtime,
                    currentMinute
                );


            if (
                runtime.state ===
                NPC_STATE_HOME
            ) {

                return;

            }


            if (!gotHomePath) {
                return;
            }

        }


        if (
            runtime.path.length > 0
        ) {

            const nextTile =
                runtime.path[0];


            if (
                !isNpcWalkableTile(
                    nextTile.x,
                    nextTile.y
                )
            ) {

                runtime.path =
                    [];


                runtime.nextWanderDecisionMinute =
                    currentMinute +
                    5;


                return;

            }

        }


        const arrived =
            moveSettlerAlongPath(
                runtime,
                deltaTime
            );


        if (arrived) {

            finishWanderingSettlerAtHome(
                runtime
            );

        }


        return;

    }


    /* =============================================
       VANLIG WANDERING
       ============================================= */

    if (
        runtime.path.length > 0
    ) {

        const nextTile =
            runtime.path[0];


        if (
            !isNpcWalkableTile(
                nextTile.x,
                nextTile.y
            )
        ) {

            runtime.path =
                [];


            runtime.nextWanderDecisionMinute =
                currentMinute +
                randomInteger(
                    5,
                    15
                );


            return;

        }


        const arrived =
            moveSettlerAlongPath(
                runtime,
                deltaTime
            );


        if (arrived) {

            runtime.nextWanderDecisionMinute =
                currentMinute +
                randomInteger(
                    CHILD_WANDER_PAUSE_MIN_MINUTES,
                    CHILD_WANDER_PAUSE_MAX_MINUTES
                );

        }


        return;

    }


    /*
        NPC står og ser seg rundt /
        leker / gjør ingenting litt.
    */

    if (
        Number.isFinite(
            runtime.nextWanderDecisionMinute
        ) &&
        currentMinute <
            runtime.nextWanderDecisionMinute
    ) {

        return;

    }


    chooseNextWanderPath(
        runtime,
        currentMinute,
        CHILD_WANDER_PAUSE_MIN_MINUTES,
        CHILD_WANDER_PAUSE_MAX_MINUTES
    );

}

function buildSettlerCommutePlan(
    settler
) {

    if (
        settler.homeId === null ||
        settler.workplaceId === null
    ) {

        return null;

    }


    const home =
        getBuildingById(
            settler.homeId
        );


    const workplace =
        getBuildingById(
            settler.workplaceId
        );


    if (
        !home ||
        !workplace
    ) {

        return null;

    }


    const route =
        findNpcRouteBetweenBuildings(
            home,
            workplace
        );


    if (!route) {

        console.warn(
            `${settler.name} cannot find a route to work.`
        );

        return null;

    }


    const distanceTiles =
        Math.max(
            0,
            route.length - 1
        );


    /*
        NPC_MOVE_SPEED er tiles per
        simulation-second.

        Regn dette om til game-minutter.
    */

    const simulationSeconds =
        getNpcRouteSimulationSeconds(
            route
        );

    const gameMinutesPerSimulationSecond =
        GAME_MINUTES_PER_DAY /
        SECONDS_PER_DAY;


    const travelMinutes =
        Math.ceil(
            simulationSeconds *
            gameMinutesPerSimulationSecond
        );


    return {

        homeId:
            settler.homeId,

        workplaceId:
            settler.workplaceId,

        route:
            route,

        distanceTiles:
            distanceTiles,

        travelMinutes:
            travelMinutes

    };

}

function refreshSettlerCommutePlan(
    settler,
    runtime
) {

    const hadPlan =
        runtime.commutePlan !==
        null;


    const plan =
        buildSettlerCommutePlan(
            settler
        );


    runtime.commutePlan =
        plan;


    runtime.lastRouteCheckDay =
        worldState.time.day;


    runtime.lastRouteCheckRevision =
        navigationRevision;


    /*
        Ny rute dukket opp etter
        at NPC-en tidligere var fast.
    */

    if (
        !hadPlan &&
        plan
    ) {

        console.log(
            `${settler.name} found a route to work.`
        );

    }


    return plan;

}


function ensureSettlerRuntime(
    settler
) {

    const visualOffset =
        getStableNpcVisualOffset(
            settler.id
        );

    let runtime =
        npcRuntime.get(
            settler.id
        );


    /*
        Runtime finnes allerede,
        men Home eller Work kan ha endret seg.
    */

    if (runtime) {

        if (
            runtime.homeId !==
                settler.homeId ||
            runtime.workplaceId !==
                settler.workplaceId
        ) {

            runtime =
                null;


            npcRuntime.delete(
                settler.id
            );

        }
        else {

            return runtime;

        }

    }


    const commutePlan =
        buildSettlerCommutePlan(
            settler
        );


    const currentMinute =
        getAbsoluteGameMinute();


    const currentDayStart =
        Math.floor(
            currentMinute /
            GAME_MINUTES_PER_DAY
        ) *
        GAME_MINUTES_PER_DAY;


    const currentShiftEnd =
        currentDayStart +
        WORK_SHIFT_DURATION_MINUTES;


    let state =
        NPC_STATE_HOME;


    let currentShiftStart =
        null;


    /*
        Hvis vi f.eks. loader spillet
        midt i arbeidsdagen, antar vi at
        ansatte allerede er på jobb.
    */

    if (
        commutePlan &&
        currentMinute >=
            currentDayStart &&
        currentMinute <
            currentShiftEnd
    ) {

        state =
            NPC_STATE_WORKING;


        currentShiftStart =
            currentDayStart;

    }


    runtime = {

        state:
            state,

        x:
            null,

        y:
            null,

        path: [],

        renderOffsetX:
            visualOffset.x,

        renderOffsetY:
            visualOffset.y,

        wanderAnchorX:
            null,

        wanderAnchorY:
            null,

        wanderRadius:
            null,

        nextWanderDecisionMinute:
            null,

        wanderReturningHome:
            false,

        homeId:
            settler.homeId,

        workplaceId:
            settler.workplaceId,

        commutePlan:
            commutePlan,

        foodDepotId:
            null,

        currentShiftStart:
            currentShiftStart,

        /*
            Husk når vi sist
            undersøkte ruten.
        */

        lastRouteCheckDay:
            worldState.time.day,

        lastRouteCheckRevision:
            navigationRevision

    };


    npcRuntime.set(
        settler.id,
        runtime
    );


    return runtime;

}

function clearSettlerWanderState(
    runtime
) {

    runtime.wanderAnchorX =
        null;

    runtime.wanderAnchorY =
        null;

    runtime.wanderRadius =
        null;

    runtime.nextWanderDecisionMinute =
        null;

    runtime.wanderReturningHome =
        false;

}

function startSettlerCommuteToWork(
    runtime,
    shiftStart
) {

    const plan =
        runtime.commutePlan;


    if (
        !plan ||
        plan.route.length === 0
    ) {

        return false;

    }


    const route =
        plan.route;


    runtime.state =
        NPC_STATE_COMMUTING_TO_WORK;


    runtime.currentShiftStart =
        shiftStart;


    runtime.x =
        route[0].x +
        0.5;


    runtime.y =
        route[0].y +
        0.5;


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x: tile.x,
                    y: tile.y
                })
            );

    clearSettlerWanderState(
        runtime
    );

    return true;

}


function startSettlerCommuteHome(
    runtime
) {

    const plan =
        runtime.commutePlan;


    if (
        !plan ||
        plan.route.length === 0
    ) {

        return false;

    }


    const route =
        [
            ...plan.route
        ].reverse();


    runtime.state =
        NPC_STATE_COMMUTING_HOME;


    runtime.x =
        route[0].x +
        0.5;


    runtime.y =
        route[0].y +
        0.5;


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x: tile.x,
                    y: tile.y
                })
            );

    clearSettlerWanderState(
        runtime
    );

    return true;

}

function moveSettlerAlongPath(
    runtime,
    deltaTime
) {

    let timeRemaining =
        deltaTime;


    while (
        timeRemaining > 0 &&
        runtime.path.length > 0
    ) {

        const nextTile =
            runtime.path[0];


        const targetX =
            nextTile.x +
            0.5;


        const targetY =
            nextTile.y +
            0.5;


        const deltaX =
            targetX -
            runtime.x;


        const deltaY =
            targetY -
            runtime.y;


        const distance =
            Math.hypot(
                deltaX,
                deltaY
            );


        const speed =
            getNpcMoveSpeedForTile(
                nextTile.x,
                nextTile.y
            );


        const timeNeeded =
            distance /
            speed;


        /*
            Vi rekker helt fram til
            neste tile denne framen.
        */

        if (
            timeNeeded <=
            timeRemaining
        ) {

            runtime.x =
                targetX;


            runtime.y =
                targetY;


            runtime.path.shift();


            timeRemaining -=
                timeNeeded;


            continue;

        }


        /*
            Vi kommer bare deler
            av veien.
        */

        const movement =
            speed *
            timeRemaining;


        runtime.x +=
            (
                deltaX /
                distance
            ) *
            movement;


        runtime.y +=
            (
                deltaY /
                distance
            ) *
            movement;


        timeRemaining =
            0;

    }


    return (
        runtime.path.length === 0
    );

}

function findNpcRouteFromTileToBuilding(
    startX,
    startY,
    targetBuilding
) {

    const targetTiles =
        getBuildingAccessTiles(
            targetBuilding
        );


    if (
        targetTiles.length === 0
    ) {

        return null;

    }


    let bestRoute =
        null;


    let bestTime =
        Infinity;


    for (
        const target
        of targetTiles
    ) {

        const route =
            findNpcPath(
                startX,
                startY,
                target.x,
                target.y
            );


        if (!route) {
            continue;
        }


        const fullRoute = [

            {
                x:
                    startX,

                y:
                    startY
            },

            ...route

        ];


        const travelTime =
            getNpcRouteSimulationSeconds(
                fullRoute
            );


        if (
            travelTime <
            bestTime
        ) {

            bestTime =
                travelTime;


            bestRoute =
                fullRoute;

        }

    }


    return bestRoute;

}

function findBestFoodDepotRouteFromHome(
    home,
    wanted
) {

    if (!home) {
        return null;
    }


    const depots =
        getFoodDepotBuildings();


    const marketDepots =
        depots.filter(
            building =>
                building.type ===
                    "marketHall" &&
                Number.isFinite(
                    building.foodStorage
                ) &&
                building.foodStorage > 0
        );


    const centerDepots =
        depots.filter(
            building =>
                building.type ===
                    "settlementCenter" &&
                Number.isFinite(
                    building.foodStorage
                ) &&
                building.foodStorage > 0
        );


    function findBestInGroup(
        group
    ) {

        if (
            group.length === 0
        ) {

            return null;

        }


        const enoughFood =
            group.filter(
                building =>
                    building.foodStorage >=
                    wanted
            );


        const candidates =
            enoughFood.length > 0
                ? enoughFood
                : group;


        let best =
            null;


        for (
            const depot
            of candidates
        ) {

            const route =
                findNpcRouteBetweenBuildings(
                    home,
                    depot
                );


            if (
                !route ||
                route.length === 0
            ) {

                continue;

            }


            const travelSeconds =
                getNpcRouteSimulationSeconds(
                    route
                );


            if (
                !best ||
                travelSeconds <
                    best.travelSeconds
            ) {

                best = {

                    depot:
                        depot,

                    route:
                        route,

                    travelSeconds:
                        travelSeconds

                };

            }

        }


        return best;

    }


    /*
        Market Hall prioriteres.
        Center er reserve-lager.
    */

    return (
        findBestInGroup(
            marketDepots
        ) ||
        findBestInGroup(
            centerDepots
        )
    );

}


function startSettlerFoodRun(
    settler,
    runtime,
    family,
    currentMinute
) {

    const home =
        getBuildingById(
            settler.homeId
        );


    if (!home) {
        return false;
    }


    const wanted =
        getFamilyFoodPickupAmount(
            family
        );


    if (
        wanted <= 0
    ) {

        clearFamilyFoodRun(
            family
        );

        return false;

    }


    const result =
        findBestFoodDepotRouteFromHome(
            home,
            wanted
        );


    if (!result) {

        family.foodRunDueMinute =
            currentMinute +
            randomInteger(
                FOOD_RUN_RETRY_MIN_MINUTES,
                FOOD_RUN_RETRY_MAX_MINUTES
            );


        return false;

    }


    runtime.state =
        NPC_STATE_COMMUTING_TO_FOOD;


    runtime.foodDepotId =
        result.depot.id;


    runtime.x =
        result.route[0].x +
        0.5;


    runtime.y =
        result.route[0].y +
        0.5;


    runtime.path =
        result.route
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    clearSettlerWanderState(
        runtime
    );


    return true;

}


function startFoodRunReturnHome(
    settler,
    runtime,
    currentMinute
) {

    const home =
        getBuildingById(
            settler.homeId
        );


    if (!home) {
        return false;
    }


    const routeHome =
        findNpcRouteFromTileToBuilding(
            Math.floor(
                runtime.x
            ),
            Math.floor(
                runtime.y
            ),
            home
        );


    if (
        !routeHome ||
        routeHome.length === 0
    ) {

        setSettlerBlocked(
            runtime,
            NPC_STATE_RETURNING_WITH_FOOD,
            currentMinute
        );


        return false;

    }


    runtime.state =
        NPC_STATE_RETURNING_WITH_FOOD;


    runtime.path =
        routeHome
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    runtime.blockedFromState =
        null;


    runtime.nextRouteRetryMinute =
        null;


    clearSettlerWanderState(
        runtime
    );


    return true;

}


function finishSettlerFoodRunAtHome(
    settler,
    runtime,
    family,
    currentMinute
) {

    const carried =
        Number.isFinite(
            settler.carriedFood
        )
            ? settler.carriedFood
            : 0;


    if (
        family &&
        carried > 0
    ) {

        const capacity =
            getFamilyFoodCapacity(
                family
            );


        const freeSpace =
            Math.max(
                0,
                capacity -
                    family.foodStorage
            );


        const delivered =
            Math.min(
                carried,
                freeSpace
            );


        family.foodStorage +=
            delivered;


        const excess =
            carried -
            delivered;


        if (
            excess > 0
        ) {

            storeFoodInDepots(
                excess
            );

        }

    }


    settler.carriedFood =
        0;


    if (family) {

        clearFamilyFoodRun(
            family
        );

    }


    runtime.state =
        NPC_STATE_HOME;


    runtime.x =
        null;


    runtime.y =
        null;


    runtime.path =
        [];


    runtime.foodDepotId =
        null;


    runtime.blockedFromState =
        null;


    runtime.nextRouteRetryMinute =
        null;


    clearSettlerWanderState(
        runtime
    );


    if (
        family &&
        familyNeedsFoodPickup(
            family
        )
    ) {

        scheduleFamilyFoodRun(
            family,
            currentMinute +
                randomInteger(
                    FOOD_RUN_RETRY_MIN_MINUTES,
                    FOOD_RUN_RETRY_MAX_MINUTES
                )
        );

    }


    syncLegacyFoodResource();

    updateFoodDistributionStatus();

    updateSettlementUI();

}


function rerouteFoodRun(
    settler,
    runtime,
    targetBuilding,
    blockedFromState,
    currentMinute
) {

    if (
        !targetBuilding ||
        !Number.isFinite(
            runtime.x
        ) ||
        !Number.isFinite(
            runtime.y
        )
    ) {

        setSettlerBlocked(
            runtime,
            blockedFromState,
            currentMinute
        );


        return false;

    }


    const route =
        findNpcRouteFromTileToBuilding(
            Math.floor(
                runtime.x
            ),
            Math.floor(
                runtime.y
            ),
            targetBuilding
        );


    if (
        !route ||
        route.length === 0
    ) {

        setSettlerBlocked(
            runtime,
            blockedFromState,
            currentMinute
        );


        return false;

    }


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    return true;

}


function armFoodRunAfterWorkArrival(
    settler,
    currentMinute
) {

    const family =
        getFamilyById(
            settler.familyId
        );


    if (
        !family ||
        family.foodRunSettlerId !==
            settler.id ||
        Number.isFinite(
            family.foodRunDueMinute
        ) ||
        !familyNeedsFoodPickup(
            family
        )
    ) {

        return;

    }


    family.foodRunDueMinute =
        currentMinute +
        randomInteger(
            FOOD_RUN_AFTER_WORK_DELAY_MIN_MINUTES,
            FOOD_RUN_AFTER_WORK_DELAY_MAX_MINUTES
        );

}


function updateSettlerFoodRun(
    settler,
    runtime,
    currentMinute,
    deltaTime
) {

    const family =
        getFamilyById(
            settler.familyId
        );


    const isAssignedRunner =
        family &&
        family.foodRunSettlerId ===
            settler.id;


    /*
        Save/load kan plassere NPC-en hjemme
        igjen mens maten fortsatt er markert
        som båret. Lever den da trygt hjem.
    */

    if (
        isAssignedRunner &&
        runtime.state ===
            NPC_STATE_HOME &&
        Number.isFinite(
            settler.carriedFood
        ) &&
        settler.carriedFood > 0
    ) {

        finishSettlerFoodRunAtHome(
            settler,
            runtime,
            family,
            currentMinute
        );


        return true;

    }


    if (
        runtime.state ===
        NPC_STATE_COMMUTING_TO_FOOD
    ) {

        const depot =
            getBuildingById(
                runtime.foodDepotId
            );


        if (!depot) {

            setSettlerBlocked(
                runtime,
                NPC_STATE_COMMUTING_TO_FOOD,
                currentMinute
            );


            return true;

        }


        if (
            runtime.path.length > 0
        ) {

            const nextTile =
                runtime.path[0];


            if (
                !isNpcWalkableTile(
                    nextTile.x,
                    nextTile.y
                )
            ) {

                rerouteFoodRun(
                    settler,
                    runtime,
                    depot,
                    NPC_STATE_COMMUTING_TO_FOOD,
                    currentMinute
                );


                return true;

            }

        }


        const arrived =
            moveSettlerAlongPath(
                runtime,
                deltaTime
            );


        if (arrived) {

            const wanted =
                family
                    ? getFamilyFoodPickupAmount(
                        family
                    )
                    : 0;


            const taken =
                takeFoodFromBuilding(
                    depot,
                    wanted
                );


            settler.carriedFood =
                (
                    Number.isFinite(
                        settler.carriedFood
                    )
                        ? settler.carriedFood
                        : 0
                ) +
                taken;


            syncLegacyFoodResource();

            updateFoodDistributionStatus();


            startFoodRunReturnHome(
                settler,
                runtime,
                currentMinute
            );

        }


        return true;

    }


    if (
        runtime.state ===
        NPC_STATE_RETURNING_WITH_FOOD
    ) {

        const home =
            getBuildingById(
                settler.homeId
            );


        if (
            runtime.path.length > 0
        ) {

            const nextTile =
                runtime.path[0];


            if (
                !isNpcWalkableTile(
                    nextTile.x,
                    nextTile.y
                )
            ) {

                rerouteFoodRun(
                    settler,
                    runtime,
                    home,
                    NPC_STATE_RETURNING_WITH_FOOD,
                    currentMinute
                );


                return true;

            }

        }


        const arrived =
            moveSettlerAlongPath(
                runtime,
                deltaTime
            );


        if (arrived) {

            finishSettlerFoodRunAtHome(
                settler,
                runtime,
                family,
                currentMinute
            );

        }


        return true;

    }


    if (
        isAssignedRunner &&
        runtime.state ===
            NPC_STATE_HOME &&
        !Number.isFinite(
            family.foodRunDueMinute
        )
    ) {

        const dayStart =
            getSimulationDayStartMinute(
                currentMinute
            );


        const minuteIntoDay =
            currentMinute -
            dayStart;


        if (
            minuteIntoDay >=
            WORK_SHIFT_DURATION_MINUTES
        ) {

            armFoodRunAfterWorkArrival(
                settler,
                currentMinute
            );

        }

    }


    if (
        !isAssignedRunner ||
        runtime.state !==
            NPC_STATE_HOME ||
        !Number.isFinite(
            family.foodRunDueMinute
        ) ||
        currentMinute <
            family.foodRunDueMinute
    ) {

        return false;

    }


    if (
        !familyNeedsFoodPickup(
            family
        )
    ) {

        clearFamilyFoodRun(
            family
        );


        return false;

    }


    return startSettlerFoodRun(
        settler,
        runtime,
        family,
        currentMinute
    );

}


function rerouteSettler(
    runtime
) {

    let targetBuilding =
        null;


    if (
        runtime.state ===
        NPC_STATE_COMMUTING_TO_WORK
    ) {

        targetBuilding =
            getBuildingById(
                runtime.workplaceId
            );

    }
    else if (
        runtime.state ===
        NPC_STATE_COMMUTING_HOME
    ) {

        targetBuilding =
            getBuildingById(
                runtime.homeId
            );

    }


    if (!targetBuilding) {

        return false;

    }


    const currentX =
        Math.floor(
            runtime.x
        );


    const currentY =
        Math.floor(
            runtime.y
        );


    const route =
        findNpcRouteFromTileToBuilding(
            currentX,
            currentY,
            targetBuilding
        );


    if (
        !route ||
        route.length === 0
    ) {

        return false;

    }


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    return true;

}

function setSettlerBlocked(
    runtime,
    previousState,
    currentMinute
) {

    runtime.state =
        NPC_STATE_BLOCKED;


    runtime.blockedFromState =
        previousState;


    runtime.path =
        [];


    runtime.nextRouteRetryMinute =
        currentMinute;


    runtime.lastBlockedRouteRevision =
        navigationRevision;


    /*
        Husk hvor NPC-en opprinnelig
        ble sittende fast.

        Wandering får ikke dra langt
        fra dette området.
    */

    if (
        Number.isFinite(
            runtime.x
        ) &&
        Number.isFinite(
            runtime.y
        )
    ) {

        runtime.wanderAnchorX =
            Math.floor(
                runtime.x
            );


        runtime.wanderAnchorY =
            Math.floor(
                runtime.y
            );


        runtime.wanderRadius =
            BLOCKED_WANDER_RADIUS;


        runtime.nextWanderDecisionMinute =
            currentMinute +
                randomInteger(
                    5,
                    15
                );

    }

}

function updateBlockedWander(
    runtime,
    currentMinute,
    deltaTime
) {

    if (
        !Number.isFinite(
            runtime.x
        ) ||
        !Number.isFinite(
            runtime.y
        )
    ) {

        return;

    }


    if (
        !Number.isInteger(
            runtime.wanderAnchorX
        ) ||
        !Number.isInteger(
            runtime.wanderAnchorY
        )
    ) {

        runtime.wanderAnchorX =
            Math.floor(
                runtime.x
            );


        runtime.wanderAnchorY =
            Math.floor(
                runtime.y
            );


        runtime.wanderRadius =
            BLOCKED_WANDER_RADIUS;

    }


    /*
        Har en lokal wander-path.
    */

    if (
        runtime.path.length > 0
    ) {

        const nextTile =
            runtime.path[0];


        if (
            !isNpcWalkableTile(
                nextTile.x,
                nextTile.y
            )
        ) {

            runtime.path =
                [];


            runtime.nextWanderDecisionMinute =
                currentMinute +
                5;


            return;

        }


        const arrived =
            moveSettlerAlongPath(
                runtime,
                deltaTime
            );


        if (arrived) {

            runtime.nextWanderDecisionMinute =
                currentMinute +
                randomInteger(
                    BLOCKED_WANDER_PAUSE_MIN_MINUTES,
                    BLOCKED_WANDER_PAUSE_MAX_MINUTES
                );

        }


        return;

    }


    /*
        Stå litt stille før
        neste lokale tur.
    */

    if (
        Number.isFinite(
            runtime.nextWanderDecisionMinute
        ) &&
        currentMinute <
            runtime.nextWanderDecisionMinute
    ) {

        return;

    }


    chooseNextWanderPath(
        runtime,
        currentMinute,
        BLOCKED_WANDER_PAUSE_MIN_MINUTES,
        BLOCKED_WANDER_PAUSE_MAX_MINUTES
    );

}

function startSettlerRouteFromCurrentPosition(
    runtime,
    targetBuilding,
    nextState
) {

    if (
        !targetBuilding ||
        !Number.isFinite(
            runtime.x
        ) ||
        !Number.isFinite(
            runtime.y
        )
    ) {

        return null;

    }


    const currentX =
        Math.floor(
            runtime.x
        );


    const currentY =
        Math.floor(
            runtime.y
        );


    const route =
        findNpcRouteFromTileToBuilding(
            currentX,
            currentY,
            targetBuilding
        );


    if (
        !route ||
        route.length === 0
    ) {

        return null;

    }


    runtime.state =
        nextState;


    runtime.path =
        route
            .slice(1)
            .map(
                tile => ({
                    x:
                        tile.x,

                    y:
                        tile.y
                })
            );


    runtime.blockedFromState =
        null;


    runtime.nextRouteRetryMinute =
        null;


    clearSettlerWanderState(
        runtime
    );


    return route;

}

function tryRecoverBlockedSettler(
    settler,
    runtime,
    currentMinute
) {

    /*
        Ikke kjør pathfinding hver frame.

        Prøv dersom:
        - kartet har endret seg
        - eller 15 game-minutter har gått.
    */

    const navigationChanged =
        runtime.lastBlockedRouteRevision !==
        navigationRevision;


    const retryDue =
        !Number.isFinite(
            runtime.nextRouteRetryMinute
        ) ||
        currentMinute >=
            runtime.nextRouteRetryMinute;


    if (
        !navigationChanged &&
        !retryDue
    ) {

        return;

    }


    runtime.lastBlockedRouteRevision =
        navigationRevision;


    runtime.nextRouteRetryMinute =
        currentMinute +
        NPC_ROUTE_RETRY_MINUTES;


    const home =
        getBuildingById(
            settler.homeId
        );


    const workplace =
        getBuildingById(
            settler.workplaceId
        );


    /* =============================================
       FOOD RUN RECOVERY
       ============================================= */

    if (
        runtime.blockedFromState ===
        NPC_STATE_COMMUTING_TO_FOOD
    ) {

        const depot =
            getBuildingById(
                runtime.foodDepotId
            );


        if (depot) {

            const route =
                findNpcRouteFromTileToBuilding(
                    Math.floor(
                        runtime.x
                    ),
                    Math.floor(
                        runtime.y
                    ),
                    depot
                );


            if (
                route &&
                route.length > 0
            ) {

                runtime.state =
                    NPC_STATE_COMMUTING_TO_FOOD;


                runtime.path =
                    route
                        .slice(1)
                        .map(
                            tile => ({
                                x:
                                    tile.x,

                                y:
                                    tile.y
                            })
                        );


                runtime.blockedFromState =
                    null;


                runtime.nextRouteRetryMinute =
                    null;


                clearSettlerWanderState(
                    runtime
                );


                return;

            }

        }


        return;

    }


    if (
        runtime.blockedFromState ===
        NPC_STATE_RETURNING_WITH_FOOD
    ) {

        if (home) {

            const route =
                findNpcRouteFromTileToBuilding(
                    Math.floor(
                        runtime.x
                    ),
                    Math.floor(
                        runtime.y
                    ),
                    home
                );


            if (
                route &&
                route.length > 0
            ) {

                runtime.state =
                    NPC_STATE_RETURNING_WITH_FOOD;


                runtime.path =
                    route
                        .slice(1)
                        .map(
                            tile => ({
                                x:
                                    tile.x,

                                y:
                                    tile.y
                            })
                        );


                runtime.blockedFromState =
                    null;


                runtime.nextRouteRetryMinute =
                    null;


                clearSettlerWanderState(
                    runtime
                );


                return;

            }

        }


        return;

    }


    /*
        Dersom NPC-en ble blokkert
        på vei TIL jobb, prøv først
        å fortsette til jobb.
    */

    if (
        runtime.blockedFromState ===
            NPC_STATE_COMMUTING_TO_WORK &&
        workplace &&
        Number.isFinite(
            runtime.currentShiftStart
        )
    ) {

        const shiftEnd =
            runtime.currentShiftStart +
            WORK_SHIFT_DURATION_MINUTES;


        /*
            Arbeidsdagen må fortsatt
            være i gang.
        */

        if (
            currentMinute <
            shiftEnd
        ) {

            const routeToWork =
                findNpcRouteFromTileToBuilding(
                    Math.floor(
                        runtime.x
                    ),
                    Math.floor(
                        runtime.y
                    ),
                    workplace
                );


            if (
                routeToWork &&
                routeToWork.length > 0
            ) {

                const travelMinutes =
                    getNpcRouteGameMinutes(
                        routeToWork
                    );


                /*
                    Ikke dra videre dersom
                    arbeidsdagen rekker å slutte
                    før NPC-en kommer fram.
                */

                if (
                    currentMinute +
                        travelMinutes <
                    shiftEnd
                ) {

                    runtime.state =
                        NPC_STATE_COMMUTING_TO_WORK;


                    runtime.path =
                        routeToWork
                            .slice(1)
                            .map(
                                tile => ({
                                    x:
                                        tile.x,

                                    y:
                                        tile.y
                                })
                            );


                    runtime.blockedFromState =
                        null;


                    runtime.nextRouteRetryMinute =
                        null;

                    clearSettlerWanderState(
                        runtime
                    );


                    return;

                }

            }

        }

    }


    /*
        Kan ikke fortsette til jobb,
        eller arbeidsdagen er ferdig.

        Prøv å komme hjem.
    */

    if (home) {

        const routeHome =
            startSettlerRouteFromCurrentPosition(
                runtime,
                home,
                NPC_STATE_COMMUTING_HOME
            );


        if (routeHome) {

            return;

        }

    }


    /*
        Ingen vei verken videre
        eller hjem.

        NPC-en blir stående og prøver
        igjen senere.
    */

}

function updateSettlerMovement(
    deltaTime
) {

    if (
        !worldState.settlement.founded
    ) {

        return;

    }


    const currentMinute =
        getAbsoluteGameMinute();


    for (
        const settler
        of worldState.settlers
    ) {

        const runtime =
            ensureSettlerRuntime(
                settler
            );


        if (!runtime) {
            continue;
        }


        /* =============================================
           FOOD RUN
           ============================================= */

        if (
            updateSettlerFoodRun(
                settler,
                runtime,
                currentMinute,
                deltaTime
            )
        ) {

            continue;

        }


        /* =============================================
           INGEN JOBB
           ============================================= */

        if (
            settler.workplaceId ===
            null
        ) {

            /*
                Barn bruker Wander-systemet.

                Voksne uten jobb holder seg
                foreløpig hjemme.
            */

            if (
                !canSettlerWork(
                    settler
                ) &&
                settler.homeId !==
                    null
            ) {

                updateChildWander(
                    settler,
                    runtime,
                    currentMinute,
                    deltaTime
                );


                continue;

            }


            runtime.state =
                NPC_STATE_HOME;


            runtime.x =
                null;


            runtime.y =
                null;


            runtime.path =
                [];


            clearSettlerWanderState(
                runtime
            );


            continue;

        }


        /* =============================================
           HOME
           ============================================= */

        if (
            runtime.state ===
            NPC_STATE_HOME
        ) {

            /*
                Ruten kontrolleres igjen når:

                - ny dag starter
                - navigationRevision endres
            */

            const routeNeedsRefresh =
                runtime.lastRouteCheckDay !==
                    worldState.time.day ||
                runtime.lastRouteCheckRevision !==
                    navigationRevision;


            if (
                routeNeedsRefresh
            ) {

                refreshSettlerCommutePlan(
                    settler,
                    runtime
                );

            }


            /*
                Fortsatt ingen rute.

                NPC-en er trygt hjemme og
                prøver igjen senere.
            */

            if (
                !runtime.commutePlan
            ) {

                runtime.x =
                    null;


                runtime.y =
                    null;


                continue;

            }


            const plan =
                runtime.commutePlan;


            let shiftStart =
                Math.floor(
                    currentMinute /
                    GAME_MINUTES_PER_DAY
                ) *
                GAME_MINUTES_PER_DAY;


            let shiftEnd =
                shiftStart +
                WORK_SHIFT_DURATION_MINUTES;


            /*
                Dagens arbeidstid er over.
            */

            if (
                currentMinute >=
                shiftEnd
            ) {

                shiftStart +=
                    GAME_MINUTES_PER_DAY;


                shiftEnd =
                    shiftStart +
                    WORK_SHIFT_DURATION_MINUTES;

            }


            /*
                Vi er allerede inne i arbeidsdagen,
                men NPC-en rekker ikke jobb før
                arbeidsdagen slutter.

                Vent til neste dag.
            */

            if (
                currentMinute >=
                    shiftStart &&
                currentMinute +
                    plan.travelMinutes >=
                    shiftEnd
            ) {

                shiftStart +=
                    GAME_MINUTES_PER_DAY;


                shiftEnd =
                    shiftStart +
                    WORK_SHIFT_DURATION_MINUTES;

            }


            const departureMinute =
                shiftStart -
                plan.travelMinutes -
                NPC_COMMUTE_BUFFER_MINUTES;


            if (
                currentMinute >=
                    departureMinute &&
                currentMinute <
                    shiftEnd
            ) {

                startSettlerCommuteToWork(
                    runtime,
                    shiftStart
                );

            }


            continue;

        }


        /* =============================================
           BLOCKED
           ============================================= */

        if (
            runtime.state ===
            NPC_STATE_BLOCKED
        ) {

            /*
                Først forsøker NPC-en fortsatt
                å løse det egentlige problemet.
            */

            tryRecoverBlockedSettler(
                settler,
                runtime,
                currentMinute
            );


            /*
                Recovery kan ha funnet
                jobb/hjem-rute.
            */

            if (
                runtime.state !==
                NPC_STATE_BLOCKED
            ) {

                continue;

            }


            /*
                Fortsatt blocked:
                gå litt rundt lokalt mens
                NPC-en venter på neste retry.
            */

            updateBlockedWander(
                runtime,
                currentMinute,
                deltaTime
            );


            continue;

        }


        /* =============================================
           COMMUTING TO WORK
           ============================================= */

        if (
            runtime.state ===
            NPC_STATE_COMMUTING_TO_WORK
        ) {

            /*
                Arbeidsdagen har rukket å bli
                ferdig mens NPC-en fortsatt går.

                Ikke gå helt fram til jobb bare
                for å snu med en gang.
            */

            if (
                Number.isFinite(
                    runtime.currentShiftStart
                )
            ) {

                const shiftEnd =
                    runtime.currentShiftStart +
                    WORK_SHIFT_DURATION_MINUTES;


                if (
                    currentMinute >=
                    shiftEnd
                ) {

                    const home =
                        getBuildingById(
                            settler.homeId
                        );


                    const routeHome =
                        startSettlerRouteFromCurrentPosition(
                            runtime,
                            home,
                            NPC_STATE_COMMUTING_HOME
                        );


                    if (!routeHome) {

                        setSettlerBlocked(
                            runtime,
                            NPC_STATE_COMMUTING_HOME,
                            currentMinute
                        );

                    }


                    continue;

                }

            }


            /*
                Neste tile har blitt blokkert.
            */

            if (
                runtime.path.length > 0
            ) {

                const nextTile =
                    runtime.path[0];


                if (
                    !isNpcWalkableTile(
                        nextTile.x,
                        nextTile.y
                    )
                ) {

                    const rerouted =
                        rerouteSettler(
                            runtime
                        );


                    if (!rerouted) {

                        setSettlerBlocked(
                            runtime,
                            NPC_STATE_COMMUTING_TO_WORK,
                            currentMinute
                        );


                        continue;

                    }

                }

            }


            const arrived =
                moveSettlerAlongPath(
                    runtime,
                    deltaTime
                );


            if (arrived) {

                runtime.state =
                    NPC_STATE_WORKING;


                runtime.x =
                    null;


                runtime.y =
                    null;


                runtime.path =
                    [];

            }


            continue;

        }


        /* =============================================
           WORKING
           ============================================= */

        if (
            runtime.state ===
            NPC_STATE_WORKING
        ) {

            /*
                Safety dersom runtime av en eller
                annen grunn mangler shiftStart.
            */

            if (
                !Number.isFinite(
                    runtime.currentShiftStart
                )
            ) {

                runtime.currentShiftStart =
                    Math.floor(
                        currentMinute /
                        GAME_MINUTES_PER_DAY
                    ) *
                    GAME_MINUTES_PER_DAY;

            }


            const shiftEnd =
                runtime.currentShiftStart +
                WORK_SHIFT_DURATION_MINUTES;


            if (
                currentMinute >=
                shiftEnd
            ) {

                startSettlerCommuteHome(
                    runtime
                );

            }


            continue;

        }


        /* =============================================
           COMMUTING HOME
           ============================================= */

        if (
            runtime.state ===
            NPC_STATE_COMMUTING_HOME
        ) {

            if (
                runtime.path.length > 0
            ) {

                const nextTile =
                    runtime.path[0];


                if (
                    !isNpcWalkableTile(
                        nextTile.x,
                        nextTile.y
                    )
                ) {

                    const rerouted =
                        rerouteSettler(
                            runtime
                        );


                    if (!rerouted) {

                        setSettlerBlocked(
                            runtime,
                            NPC_STATE_COMMUTING_HOME,
                            currentMinute
                        );


                        continue;

                    }

                }

            }


            const arrived =
                moveSettlerAlongPath(
                    runtime,
                    deltaTime
                );


            if (arrived) {

                runtime.state =
                    NPC_STATE_HOME;


                runtime.x =
                    null;


                runtime.y =
                    null;


                runtime.path =
                    [];


                runtime.currentShiftStart =
                    null;


                runtime.blockedFromState =
                    null;


                runtime.nextRouteRetryMinute =
                    null;


                /*
                    Dersom denne voksne er valgt til
                    familiens mathenting, starter den
                    tilfeldige ventetiden NÅ - etter
                    at personen faktisk kom hjem.
                */

                armFoodRunAfterWorkArrival(
                    settler,
                    currentMinute
                );


                /*
                    Lag fersk arbeidsrute
                    for neste arbeidsdag.
                */

                refreshSettlerCommutePlan(
                    settler,
                    runtime
                );

            }


            continue;

        }


        /* =============================================
           SAFETY FALLBACK
           ============================================= */

        /*
            Dersom en ugyldig state på et tidspunkt
            havner i runtime-data, skal ikke NPC-en
            bli permanent ødelagt.
        */

        console.warn(
            `${settler.name} had invalid NPC state:`,
            runtime.state
        );


        runtime.state =
            NPC_STATE_HOME;


        runtime.x =
            null;


        runtime.y =
            null;


        runtime.path =
            [];


        runtime.currentShiftStart =
            null;


        refreshSettlerCommutePlan(
            settler,
            runtime
        );

    }

}

function updateClockUI() {

    const clock =
        getCurrentGameClock();


    const hourText =
        String(
            clock.hour
        ).padStart(
            2,
            "0"
        );


    const minuteText =
        String(
            clock.minute
        ).padStart(
            2,
            "0"
        );


    gameTimeText.textContent =
        `${hourText}:${minuteText}`;

}

function updateSettlementUI() {

    gameDayText.textContent =
        worldState.time.day;

    settlementNameText.textContent =
        worldState.settlement.name;


    const populationCapacity =
        getPopulationCapacity();


    settlementPopulationText.textContent =
        `${getPopulation()} / ${populationCapacity}`;


    syncLegacyFoodResource();


    resourceFoodText.textContent =
        getTotalFoodAvailable();


    resourceWoodText.textContent =
        worldState.resources.wood;


    resourceStoneText.textContent =
        worldState.resources.stone;

}

/* =========================================================
   RENDER
   ========================================================= */

function render() {

    const dpr =
        window.devicePixelRatio || 1;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    drawBackground();


    if (!mapLoaded) {

        ctx.fillStyle =
            "white";


        ctx.font =
            "16px monospace";


        ctx.fillText(
            "Loading world...",
            20,
            90
        );


        return;

    }


    ctx.save();


    ctx.translate(
        -camera.x *
        camera.zoom,

        -camera.y *
        camera.zoom
    );


    ctx.scale(
        camera.zoom,
        camera.zoom
    );


    drawMap();

    drawGrownTrees();

    drawRoads();

    drawBuildings();

    drawSettlers();

    drawPlayer();

    drawBuildGrid();

    drawBuildPreview();


    drawSelectedTile();

    drawTileHighlight();


    ctx.restore();

}


/* =========================================================
   GAME LOOP
   ========================================================= */

let lastTime =
    performance.now();


function gameLoop(
    currentTime
) {

    const deltaTime =
        Math.min(
            (
                currentTime -
                lastTime
            ) /
            1000,

            0.1
        );


    lastTime =
        currentTime;


    update(
        deltaTime
    );


    render();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================================
   START
   ========================================================= */

async function startGame() {

    console.log(
        "Starting The Quest of Void..."
    );

    await loadNameData();
    await loadTiledMap();

    syncTiledWorldEntities();
    initializeTiledSettlementPopulation();

    initializePlayerFromMap();

    updateSettlementUI();
    updateSaveStatus();
    updateTimeControlsUI();

    requestAnimationFrame(
        gameLoop
    );

}


startGame();