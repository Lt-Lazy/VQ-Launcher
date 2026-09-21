// ============================================================
// VQ RPG
// BASE GAME
// ============================================================


// ============================================================
// CANVAS
// ============================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ============================================================
// UI
// ============================================================

const mapNameDisplay =
    document.getElementById("mapName");

const playerPositionDisplay =
    document.getElementById("playerPosition");

const contextMenu =
    document.getElementById("contextMenu");

const contextTitle =
    document.getElementById("contextTitle");

const contextActions =
    document.getElementById("contextActions");

const sidebarPositionDisplay =
    document.getElementById(
        "sidebarPosition"
    );

const inventoryButton =
    document.getElementById(
        "inventoryButton"
    );

const inventoryWindow =
    document.getElementById(
        "inventoryWindow"
    );


const closeInventoryButton =
    document.getElementById(
        "closeInventoryButton"
    );

const inventoryList =
    document.getElementById(
        "inventoryList"
    );

const craftingButton =
    document.getElementById(
        "craftingButton"
    );


const craftingWindow =
    document.getElementById(
        "craftingWindow"
    );


const closeCraftingButton =
    document.getElementById(
        "closeCraftingButton"
    );


const craftingList =
    document.getElementById(
        "craftingList"
    );

const playerHealthDisplay =
    document.getElementById(
        "playerHealth"
    );

const gameLog =
    document.getElementById(
        "gameLog"
    );

const characterButton =
    document.getElementById(
        "characterButton"
    );


const characterWindow =
    document.getElementById(
        "characterWindow"
    );


const closeCharacterButton =
    document.getElementById(
        "closeCharacterButton"
    );


const handEquipmentName =
    document.getElementById(
        "handEquipmentName"
    );


const armorEquipmentName =
    document.getElementById(
        "armorEquipmentName"
    );


const unequipHandButton =
    document.getElementById(
        "unequipHandButton"
    );


const unequipArmorButton =
    document.getElementById(
        "unequipArmorButton"
    );

// ============================================================
// GAME LOG
// ============================================================

const MAX_LOG_ENTRIES = 60;


function addGameLog(
    message,
    type = "normal"
) {

    if (!gameLog) {

        return;

    }


    const entry =
        document.createElement(
            "div"
        );


    entry.className =
        "logEntry";


    if (
        type !== "normal"
    ) {

        entry.classList.add(
            `log-${type}`
        );

    }


    entry.textContent =
        message;


    // Newest message goes at the top.
    gameLog.prepend(
        entry
    );


    // Remove the oldest message
    // when the log exceeds the limit.

    while (
        gameLog.children.length >
        MAX_LOG_ENTRIES
    ) {

        gameLog.removeChild(
            gameLog.lastChild
        );

    }


    gameLog.scrollTop = 0;
}

// ============================================================
// SETTINGS
// ============================================================

const MAP_URL = "world.tmj";

const PLAYER_IMAGE_URL =
    "assets/player.png";


// Initial zoom.
//
// 16x16 tile * 3 = 48px on screen.

let zoom = 3;

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;


// ============================================================
// MAP DATA
// ============================================================

let mapData = null;

let mapUrl = null;

let loadedTilesets = [];

let tileLayers = [];

let objectLayers = [];


// ============================================================
// PLAYER
// ============================================================

const player = {

    x: 0,
    y: 0,

    facing: "south",

    health: 100,
    maxHealth: 100,

    unarmedDamage: 2,

    damageFlashUntil: 0,

    image: new Image(),

    imageLoaded: false

};


player.image.onload = () => {

    player.imageLoaded = true;

};


player.image.onerror = () => {

    player.imageLoaded = false;

};


player.image.src =
    PLAYER_IMAGE_URL;


// ============================================================
// INVENTORY
// ============================================================


const inventory = {};

// ============================================================
// EQUIPMENT
// ============================================================

const equipment = {

    hand: null,

    armor: null

};

// ============================================================
// INVENTORY UI
// ============================================================

function updateInventoryUI() {

    inventoryList.innerHTML =
        "";


    const entries =
        Object.entries(
            inventory
        );


    // ========================================================
    // EMPTY INVENTORY
    // ========================================================

    if (
        entries.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "inventoryEmpty";


        empty.textContent =
            "Inventory is empty.";


        inventoryList.appendChild(
            empty
        );


        return;
    }


    // ========================================================
    // SORT ITEMS
    // ========================================================

    entries.sort(
        ([itemIdA], [itemIdB]) => {

            const itemA =
                window.ITEMS[
                    itemIdA
                ];


            const itemB =
                window.ITEMS[
                    itemIdB
                ];


            if (
                !itemA ||
                !itemB
            ) {

                return 0;
            }


            return itemA.name.localeCompare(
                itemB.name
            );
        }
    );


    // ========================================================
    // BUILD ITEM ROWS
    // ========================================================

    for (
        const [
            itemId,
            amount
        ]
        of entries
    ) {

        const item =
            window.ITEMS[
                itemId
            ];


        if (!item) {

            console.warn(
                `Inventory contains unknown item: ${itemId}`
            );

            continue;
        }


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "inventoryItem";


        row.dataset.itemId =
            itemId;


        // -------------------------
        // NAME
        // -------------------------

        const name =
            document.createElement(
                "span"
            );


        name.className =
            "inventoryItemName";


        name.textContent =
            item.name;


        // -------------------------
        // AMOUNT
        // -------------------------

        const quantity =
            document.createElement(
                "span"
            );


        quantity.className =
            "inventoryItemAmount";


        quantity.textContent =
            `x${amount}`;


        // -------------------------
        // TOOLTIP
        // -------------------------

        row.title =
            item.description || "";


        // -------------------------
        // ADD TO ROW
        // -------------------------

        row.appendChild(
            name
        );


        // ========================================================
        // RIGHT SIDE
        // ========================================================

        const actions =
            document.createElement(
                "div"
            );


        actions.className =
            "inventoryItemActions";


        actions.appendChild(
            quantity
        );


        // Equip button only for equipment.

        if (
            item.equipSlot
        ) {

            const equipButton =
                document.createElement(
                    "button"
                );


            equipButton.className =
                "inventoryEquipButton";


            equipButton.textContent =
                "Equip";


            equipButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    equipItem(
                        itemId
                    );

                }
            );


            actions.appendChild(
                equipButton
            );
        }


        row.appendChild(
            actions
        );


        inventoryList.appendChild(
            row
        );
    }
}

function toggleInventory() {

    const opening =
        inventoryWindow.classList.contains(
            "hidden"
        );


    if (opening) {

        craftingWindow.classList.add(
            "hidden"
        );

        characterWindow.classList.add(
            "hidden"
        );

        inventoryWindow.classList.remove(
            "hidden"
        );


        updateInventoryUI();

    } else {

        inventoryWindow.classList.add(
            "hidden"
        );

    }
}

// ============================================================
// GET EQUIPPED ITEM
// ============================================================

function getEquippedItem(
    slot
) {

    const itemId =
        equipment[
            slot
        ];


    if (!itemId) {

        return null;
    }


    return (
        window.ITEMS[
            itemId
        ] || null
    );
}


// ============================================================
// EQUIP ITEM
// ============================================================

function equipItem(
    itemId
) {

    const item =
        window.ITEMS[
            itemId
        ];


    if (
        !item ||
        !item.equipSlot
    ) {

        return false;
    }


    if (
        getItemAmount(
            itemId
        ) <= 0
    ) {

        return false;
    }


    const slot =
        item.equipSlot;


    // ========================================================
    // RETURN OLD ITEM TO INVENTORY
    // ========================================================

    const oldItemId =
        equipment[
            slot
        ];


    if (oldItemId) {

        addItem(
            oldItemId,
            1
        );

    }


    // ========================================================
    // REMOVE NEW ITEM FROM INVENTORY
    // ========================================================

    if (
        !removeItem(
            itemId,
            1
        )
    ) {

        return false;
    }


    equipment[
        slot
    ] = itemId;


    addGameLog(
        `You equip ${item.name}.`,
        "success"
    );


    updateInventoryUI();

    updateCharacterUI();


    return true;
}


// ============================================================
// UNEQUIP
// ============================================================

function unequipItem(
    slot
) {

    const itemId =
        equipment[
            slot
        ];


    if (!itemId) {

        return;
    }


    const item =
        window.ITEMS[
            itemId
        ];


    equipment[
        slot
    ] = null;


    addItem(
        itemId,
        1
    );


    if (item) {

        addGameLog(
            `You unequip ${item.name}.`,
            "action"
        );

    }


    updateInventoryUI();

    updateCharacterUI();
}

// ============================================================
// CHECK EQUIPPED TOOL
// ============================================================

function hasEquippedTool(
    toolType
) {

    const handItem =
        getEquippedItem(
            "hand"
        );


    if (!handItem) {

        return false;
    }


    return (
        handItem.toolType ===
        toolType
    );
}


// ============================================================
// CHARACTER UI
// ============================================================

function updateCharacterUI() {

    const handItem =
        getEquippedItem(
            "hand"
        );


    const armorItem =
        getEquippedItem(
            "armor"
        );


    // HAND

    if (handItem) {

        handEquipmentName.textContent =
            handItem.name;


        unequipHandButton.disabled =
            false;

    } else {

        handEquipmentName.textContent =
            "Empty";


        unequipHandButton.disabled =
            true;

    }


    // ARMOR

    if (armorItem) {

        armorEquipmentName.textContent =
            armorItem.name;


        unequipArmorButton.disabled =
            false;

    } else {

        armorEquipmentName.textContent =
            "Empty";


        unequipArmorButton.disabled =
            true;

    }
}

// ============================================================
// CRAFTING
// ============================================================

function canCraftRecipe(
    recipe
) {

    if (
        !recipe ||
        !recipe.ingredients
    ) {

        return false;
    }


    for (
        const ingredient
        of recipe.ingredients
    ) {

        if (
            getItemAmount(
                ingredient.itemId
            ) <
            ingredient.amount
        ) {

            return false;
        }
    }


    return true;
}


// ============================================================
// CRAFT RECIPE
// ============================================================

function craftRecipe(
    recipeId
) {

    const recipe =
        window.CRAFTING_RECIPES[
            recipeId
        ];


    if (!recipe) {

        console.error(
            `Unknown recipe: ${recipeId}`
        );

        return;
    }


    if (
        !canCraftRecipe(
            recipe
        )
    ) {

        addGameLog(
            "You do not have the required materials.",
            "action"
        );


        return;
    }


    // ========================================================
    // REMOVE INGREDIENTS
    // ========================================================

    for (
        const ingredient
        of recipe.ingredients
    ) {

        removeItem(
            ingredient.itemId,
            ingredient.amount
        );

    }


    // ========================================================
    // GIVE CRAFTED ITEM
    // ========================================================

    addItem(
        recipe.output.itemId,
        recipe.output.amount
    );


    const outputItem =
        window.ITEMS[
            recipe.output.itemId
        ];


    if (outputItem) {

        addGameLog(
            `You craft ${outputItem.name}.`,
            "success"
        );

    }


    updateCraftingUI();


    // Crafting counts as one player turn.

    runEnemyTurn();
}


// ============================================================
// CRAFTING UI
// ============================================================

function updateCraftingUI() {

    craftingList.innerHTML =
        "";


    if (
        !window.CRAFTING_RECIPES
    ) {

        return;
    }


    const recipes =
        Object.values(
            window.CRAFTING_RECIPES
        ).filter(recipe =>
            canCraftRecipe(recipe)
        );


    // Hvis ingen recipes kan lages akkurat nå

    if (
        recipes.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "inventoryEmpty";


        empty.textContent =
            "You do not have materials for any recipes.";


        craftingList.appendChild(
            empty
        );


        return;
    }


    for (
        const recipe
        of recipes
    ) {

        const outputItem =
            window.ITEMS[
                recipe.output.itemId
            ];


        if (!outputItem) {

            continue;
        }


        const recipeElement =
            document.createElement(
                "div"
            );


        recipeElement.className =
            "craftingRecipe";


        const name =
            document.createElement(
                "div"
            );


        name.className =
            "craftingRecipeName";


        name.textContent =
            outputItem.name;


        recipeElement.appendChild(
            name
        );


        const ingredients =
            document.createElement(
                "div"
            );


        ingredients.className =
            "craftingIngredients";


        for (
            const ingredient
            of recipe.ingredients
        ) {

            const item =
                window.ITEMS[
                    ingredient.itemId
                ];


            if (!item) {

                continue;
            }


            const ownedAmount =
                getItemAmount(
                    ingredient.itemId
                );


            const ingredientRow =
                document.createElement(
                    "div"
                );


            ingredientRow.textContent =
                `${item.name}: ${ownedAmount}/${ingredient.amount}`;


            ingredientRow.classList.add(
                "craftingIngredientOwned"
            );


            ingredients.appendChild(
                ingredientRow
            );

        }


        recipeElement.appendChild(
            ingredients
        );


        const button =
            document.createElement(
                "button"
            );


        button.className =
            "craftButton";


        button.textContent =
            "Craft";


        button.addEventListener(
            "click",
            () => {

                craftRecipe(
                    recipe.id
                );

            }
        );


        recipeElement.appendChild(
            button
        );


        craftingList.appendChild(
            recipeElement
        );
    }
}


// ============================================================
// TOGGLE CRAFTING
// ============================================================

function toggleCrafting() {

    const opening =
        craftingWindow.classList.contains(
            "hidden"
        );


    if (opening) {

        // Don't overlap Inventory.

        inventoryWindow.classList.add(
            "hidden"
        );

        characterWindow.classList.add(
            "hidden"
        );

        craftingWindow.classList.remove(
            "hidden"
        );


        updateCraftingUI();

    } else {

        craftingWindow.classList.add(
            "hidden"
        );

    }
}

// ============================================================
// ADD ITEM
// ============================================================

function addItem(
    itemId,
    amount = 1
) {

    const item =
        window.ITEMS[itemId];


    if (!item) {

        console.error(
            `Unknown item: ${itemId}`
        );

        return false;
    }


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        return false;
    }


    if (
        inventory[itemId] === undefined
    ) {

        inventory[itemId] = 0;
    }


    inventory[itemId] +=
        amount;


    updateInventoryUI();


    console.log(
        `Added ${amount}x ${item.name}`
    );


    return true;
}

// ============================================================
// REMOVE ITEM
// ============================================================

function removeItem(
    itemId,
    amount = 1
) {

    if (
        inventory[itemId] === undefined
    ) {

        return false;
    }


    if (
        inventory[itemId] <
        amount
    ) {

        return false;
    }


    inventory[itemId] -=
        amount;


    if (
        inventory[itemId] <= 0
    ) {

        delete inventory[itemId];

    }


    updateInventoryUI();


    return true;
}

// ============================================================
// GET ITEM AMOUNT
// ============================================================

function getItemAmount(
    itemId
) {

    return (
        inventory[itemId] ||
        0
    );
}

// ============================================================
// CONTEXT MENU
// ============================================================

let contextTarget = null;

// ============================================================
// WORLD CHANGES
// ============================================================
//
// Denne blir viktig senere.
//
// Eksempel:
//
// Et tre eksisterer i Tiled.
// Spilleren hugger det ned.
// Vi trenger IKKE endre world.tmj.
//
// Vi kan i stedet lagre:
//
// nature:54,21 -> 0
//
// Dermed ligger originalverdenen fortsatt i Tiled,
// mens spillerens endringer legges over.
//

const worldChanges =
    new Map();


// ============================================================
// LOAD JSON
// ============================================================

async function loadJSON(url) {

    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            `Could not load ${url}`
        );
    }


    return await response.json();
}


// ============================================================
// LOAD IMAGE
// ============================================================

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


// ============================================================
// PROPERTIES
// ============================================================

function propertiesToObject(properties) {

    const result = {};


    if (!properties) {

        return result;

    }


    for (const property of properties) {

        result[property.name] =
            property.value;

    }


    return result;
}


// ============================================================
// CLEAN TILED GID
// ============================================================
//
// Tiled bruker noen av de øverste bitene i GID
// til flipping / rotation.
//

function cleanGid(gid) {

    return (
        (gid >>> 0) &
        0x0fffffff
    );
}


// ============================================================
// LOAD TILESET
// ============================================================

async function loadTileset(
    tilesetReference,
    parentUrl
) {

    let data;

    let tilesetUrl;


    // -------------------------
    // EXTERNAL TSJ
    // -------------------------

    if (tilesetReference.source) {

        tilesetUrl =
            new URL(
                tilesetReference.source,
                parentUrl
            ).href;


        data =
            await loadJSON(
                tilesetUrl
            );

    } else {

        // Embedded tileset

        data =
            tilesetReference;

        tilesetUrl =
            parentUrl;

    }


    const tileset = {

        firstgid:
            tilesetReference.firstgid,

        data:
            data,

        url:
            tilesetUrl,

        atlasImage:
            null,

        tileImages:
            new Map(),

        tileProperties:
            new Map()

    };


    // ========================================================
    // TILESET PROPERTIES
    // ========================================================

    if (data.tiles) {

        for (const tile of data.tiles) {

            tileset.tileProperties.set(
                tile.id,
                propertiesToObject(
                    tile.properties
                )
            );

        }

    }


    // ========================================================
    // NORMAL SPRITESHEET TILESET
    // ========================================================

    if (data.image) {

        const imageUrl =
            new URL(
                data.image,
                tilesetUrl
            ).href;


        try {

            tileset.atlasImage =
                await loadImage(
                    imageUrl
                );

        } catch (error) {

            console.error(error);

        }

    }


    // ========================================================
    // COLLECTION OF IMAGES TILESET
    // ========================================================

    if (data.tiles) {

        const promises = [];


        for (const tile of data.tiles) {

            if (!tile.image) {

                continue;

            }


            const imageUrl =
                new URL(
                    tile.image,
                    tilesetUrl
                ).href;


            const promise =
                loadImage(imageUrl)

                    .then(image => {

                        tileset.tileImages.set(
                            tile.id,
                            image
                        );

                    })

                    .catch(error => {

                        console.error(error);

                    });


            promises.push(
                promise
            );

        }


        await Promise.all(
            promises
        );

    }


    return tileset;
}


// ============================================================
// FIND TILESET FROM GID
// ============================================================

function getTilesetForGid(gid) {

    gid =
        cleanGid(gid);


    let result = null;


    for (
        const tileset
        of loadedTilesets
    ) {

        if (
            gid >=
            tileset.firstgid
        ) {

            result =
                tileset;

        } else {

            break;

        }

    }


    return result;
}


// ============================================================
// TILE PROPERTIES
// ============================================================

function getTileProperties(gid) {

    gid =
        cleanGid(gid);


    if (gid === 0) {

        return {};

    }


    const tileset =
        getTilesetForGid(
            gid
        );


    if (!tileset) {

        return {};

    }


    const localId =
        gid -
        tileset.firstgid;


    return (
        tileset.tileProperties.get(
            localId
        ) || {}
    );
}

// ============================================================
// PLAYER DISTANCE
// ============================================================

function isPlayerAdjacentTo(
    x,
    y
) {

    const distance =
        Math.abs(
            player.x - x
        ) +
        Math.abs(
            player.y - y
        );


    return distance === 1;
}

// ============================================================
// FLATTEN MAP LAYERS
// ============================================================
//
// Tiled kan ha Group Layers.
//
// Vi finner alle Tile Layers og Object Layers
// uansett om de ligger direkte i kartet eller i groups.
//

function collectLayers(layers) {

    for (const layer of layers) {

        if (
            layer.type ===
            "tilelayer"
        ) {

            tileLayers.push(
                layer
            );

        }


        if (
            layer.type ===
            "objectgroup"
        ) {

            objectLayers.push(
                layer
            );

        }


        if (
            layer.type ===
            "group" &&
            layer.layers
        ) {

            collectLayers(
                layer.layers
            );

        }

    }

}


// ============================================================
// LOAD MAP
// ============================================================

async function loadMap() {

    try {

        mapNameDisplay.textContent =
            "Loading world...";


        mapUrl =
            new URL(
                MAP_URL,
                window.location.href
            ).href;


        mapData =
            await loadJSON(
                mapUrl
            );


        loadedTilesets = [];

        tileLayers = [];

        objectLayers = [];


        // -------------------------
        // LOAD TILESETS
        // -------------------------

        for (
            const tilesetReference
            of mapData.tilesets
        ) {

            const tileset =
                await loadTileset(
                    tilesetReference,
                    mapUrl
                );


            loadedTilesets.push(
                tileset
            );

        }


        loadedTilesets.sort(
            (a, b) =>
                a.firstgid -
                b.firstgid
        );


        // -------------------------
        // LAYERS
        // -------------------------

        collectLayers(
            mapData.layers
        );


        // -------------------------
        // PLAYER SPAWN
        // -------------------------

        findPlayerSpawn();


        // -------------------------
        // ENEMIES
        // -------------------------

        loadEnemiesFromMap();


        mapNameDisplay.textContent =
            mapData.name ||
            "VQ RPG World";


        updateUI();


        console.log(
            "Map loaded:",
            mapData
        );


    } catch (error) {

        console.error(error);


        mapNameDisplay.textContent =
            "ERROR LOADING WORLD";


        alert(
            "Kunne ikke laste world.tmj.\n\n" +
            "Pass på at du bruker Live Server i VS Code."
        );

    }

}


// ============================================================
// PLAYER SPAWN
// ============================================================

function findPlayerSpawn() {

    const tileWidth =
        mapData.tilewidth;

    const tileHeight =
        mapData.tileheight;


    for (
        const layer
        of objectLayers
    ) {

        for (
            const object
            of layer.objects
        ) {

            const objectClass =
                object.class ||
                object.type;


            if (
                objectClass ===
                "player_spawn"
            ) {

                player.x =
                    Math.floor(
                        object.x /
                        tileWidth
                    );


                player.y =
                    Math.floor(
                        object.y /
                        tileHeight
                    );


                return;

            }

        }

    }


    // Hvis ingen spawn finnes,
    // start på 0,0.

    player.x = 0;
    player.y = 0;

}


// ============================================================
// GET BASE TILE GID
// ============================================================

function getBaseTileGid(
    layer,
    x,
    y
) {

    const layerX =
        layer.x || 0;

    const layerY =
        layer.y || 0;


    const localX =
        x - layerX;

    const localY =
        y - layerY;


    // ========================================================
    // NORMAL FINITE MAP
    // ========================================================

    if (!layer.chunks) {

        if (
            localX < 0 ||
            localY < 0 ||
            localX >= layer.width ||
            localY >= layer.height
        ) {

            return 0;

        }


        const index =
            localY *
            layer.width +
            localX;


        return (
            layer.data[index] ||
            0
        );

    }


    // ========================================================
    // INFINITE TILED MAP
    // ========================================================

    for (
        const chunk
        of layer.chunks
    ) {

        if (
            x < chunk.x ||
            y < chunk.y ||
            x >=
                chunk.x +
                chunk.width ||
            y >=
                chunk.y +
                chunk.height
        ) {

            continue;

        }


        const chunkX =
            x -
            chunk.x;

        const chunkY =
            y -
            chunk.y;


        const index =
            chunkY *
            chunk.width +
            chunkX;


        return (
            chunk.data[index] ||
            0
        );

    }


    return 0;
}


// ============================================================
// WORLD CHANGE KEY
// ============================================================

function worldChangeKey(
    layer,
    x,
    y
) {

    return (
        `${layer.id}:${x},${y}`
    );

}


// ============================================================
// GET TILE GID
// ============================================================
//
// Først sjekker vi om spilleren har endret verden.
//
// Hvis ikke bruker vi original tile fra Tiled.
//

function getTileGid(
    layer,
    x,
    y
) {

    const key =
        worldChangeKey(
            layer,
            x,
            y
        );


    if (
        worldChanges.has(key)
    ) {

        return (
            worldChanges.get(key)
        );

    }


    return getBaseTileGid(
        layer,
        x,
        y
    );
}


// ============================================================
// CHANGE TILE
// ============================================================
//
// Denne skal vi bruke senere til:
//
// chop tree
// mining
// destroyed walls
// opened doors
// construction
// osv.
//

function setTile(
    layer,
    x,
    y,
    gid
) {

    const key =
        worldChangeKey(
            layer,
            x,
            y
        );


    worldChanges.set(
        key,
        gid
    );

}


// ============================================================
// COLLISION
// ============================================================

function isTileBlocked(
    x,
    y
) {

    for (
        const layer
        of tileLayers
    ) {

        if (
            layer.visible ===
            false
        ) {

            continue;

        }


        const gid =
            getTileGid(
                layer,
                x,
                y
            );


        if (!gid) {

            continue;

        }


        const properties =
            getTileProperties(
                gid
            );


        if (
            properties.blocked ===
            true
        ) {

            return true;

        }

    }


    return false;
}


// ============================================================
// PLAYER MOVEMENT
// ============================================================

function movePlayer(
    dx,
    dy
) {

    if (!mapData) {

        return;

    }


    if (dx > 0) {

        player.facing =
            "east";

    }


    if (dx < 0) {

        player.facing =
            "west";

    }


    if (dy > 0) {

        player.facing =
            "south";

    }


    if (dy < 0) {

        player.facing =
            "north";

    }


    const targetX =
        player.x + dx;

    const targetY =
        player.y + dy;


    if (
        isTileBlocked(
            targetX,
            targetY
        )
    ) {

        return;
    }


    const enemy =
        getEnemyAt(
            targetX,
            targetY
        );


    if (enemy) {

        const enemyDefinition =
            window.ENEMY_TYPES[
                enemy.type
            ];


        if (
            enemyDefinition &&
            enemyDefinition.blocksMovement
        ) {

            return;
        }
    }


    player.x =
        targetX;

    player.y =
        targetY;


    updateUI();


    // Player used one turn.
    // Enemies now get their turn.

    runEnemyTurn();

}

// ============================================================
// DAMAGE FLASH
// ============================================================

function drawDamageFlash(
    damageFlashUntil,
    screenX,
    screenY,
    tileWidth,
    tileHeight
) {

    if (
        performance.now() >=
        damageFlashUntil
    ) {

        return;
    }


    ctx.save();


    ctx.fillStyle =
        "rgba(255, 0, 0, 0.45)";


    ctx.fillRect(
        screenX,
        screenY,
        tileWidth,
        tileHeight
    );


    ctx.restore();
}

// ============================================================
// ENEMY PLACEHOLDER
// ============================================================

function drawEnemyPlaceholder(
    enemy,
    screenX,
    screenY,
    tileWidth,
    tileHeight
) {

    if (
        enemy.type === "spider"
    ) {

        // Body

        ctx.fillStyle =
            "#682f8f";


        ctx.fillRect(
            screenX +
                tileWidth * 0.32,

            screenY +
                tileHeight * 0.32,

            tileWidth * 0.36,

            tileHeight * 0.36
        );


        // Legs

        ctx.fillStyle =
            "#b457ea";


        const legWidth =
            Math.max(
                1,
                Math.floor(
                    tileWidth * 0.08
                )
            );


        // Left legs

        ctx.fillRect(
            screenX +
                tileWidth * 0.12,

            screenY +
                tileHeight * 0.25,

            tileWidth * 0.25,

            legWidth
        );


        ctx.fillRect(
            screenX +
                tileWidth * 0.08,

            screenY +
                tileHeight * 0.48,

            tileWidth * 0.3,

            legWidth
        );


        ctx.fillRect(
            screenX +
                tileWidth * 0.12,

            screenY +
                tileHeight * 0.7,

            tileWidth * 0.25,

            legWidth
        );


        // Right legs

        ctx.fillRect(
            screenX +
                tileWidth * 0.63,

            screenY +
                tileHeight * 0.25,

            tileWidth * 0.25,

            legWidth
        );


        ctx.fillRect(
            screenX +
                tileWidth * 0.62,

            screenY +
                tileHeight * 0.48,

            tileWidth * 0.3,

            legWidth
        );


        ctx.fillRect(
            screenX +
                tileWidth * 0.63,

            screenY +
                tileHeight * 0.7,

            tileWidth * 0.25,

            legWidth
        );


        return;
    }


    // Generic enemy fallback

    ctx.fillStyle =
        "#ff4444";


    ctx.font =
        `${Math.floor(
            tileHeight * 0.8
        )}px monospace`;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(
        "E",

        screenX +
            tileWidth / 2,

        screenY +
            tileHeight / 2
    );
}

// ============================================================
// DRAW ENEMIES
// ============================================================

function drawEnemies(
    camera
) {

    const tileWidth =
        mapData.tilewidth *
        zoom;

    const tileHeight =
        mapData.tileheight *
        zoom;


    for (
        const enemy
        of enemies
    ) {

        if (
            !enemy.alive
        ) {

            continue;
        }


        const screenX =
            enemy.x *
            tileWidth +
            camera.x;


        const screenY =
            enemy.y *
            tileHeight +
            camera.y;


        // Outside screen

        if (
            screenX <
                -tileWidth ||

            screenY <
                -tileHeight ||

            screenX >
                canvas.width ||

            screenY >
                canvas.height
        ) {

            continue;
        }


        const imageData =
            enemyImages.get(
                enemy.type
            );


        // -------------------------
        // SPRITE
        // -------------------------

        if (
            imageData &&
            imageData.loaded
        ) {

            ctx.drawImage(
                imageData.image,

                screenX,
                screenY,

                tileWidth,
                tileHeight
            );

        }

        // -------------------------
        // FALLBACK
        // -------------------------

        else {

            drawEnemyPlaceholder(
                enemy,
                screenX,
                screenY,
                tileWidth,
                tileHeight
            );
        }

        drawDamageFlash(
            enemy.damageFlashUntil,
            screenX,
            screenY,
            tileWidth,
            tileHeight
        );

    }
}

// ============================================================
// PLAYER HEALTH
// ============================================================

function updateHealthUI() {

    // Make sure health always stays
    // between 0 and max health.

    player.health =
        Math.max(
            0,
            Math.min(
                player.maxHealth,
                player.health
            )
        );


    playerHealthDisplay.textContent =
        player.health;


    // Remove previous health colour.

    playerHealthDisplay.classList.remove(
        "health-green",
        "health-yellow",
        "health-orange",
        "health-red"
    );


    const healthPercent =
        (
            player.health /
            player.maxHealth
        ) * 100;


    // ========================================================
    // HEALTH COLOUR
    // ========================================================

    if (
        healthPercent >= 70
    ) {

        playerHealthDisplay.classList.add(
            "health-green"
        );

    } else if (
        healthPercent >= 40
    ) {

        playerHealthDisplay.classList.add(
            "health-yellow"
        );

    } else if (
        healthPercent >= 20
    ) {

        playerHealthDisplay.classList.add(
            "health-orange"
        );

    } else {

        playerHealthDisplay.classList.add(
            "health-red"
        );

    }
}

function damagePlayer(
    amount,
    source = null
) {

    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        return;

    }


    player.health -=
        amount;


    if (
        player.health < 0
    ) {

        player.health = 0;

    }


    updateHealthUI();

    player.damageFlashUntil =
        performance.now() + 180;

    console.log(
        `Player took ${amount} damage.`
    );

    if (
        source
    ) {

        addGameLog(
            `${source} attacks you for ${amount} damage.`,
            "danger"
        );

    } else {

        addGameLog(
            `You take ${amount} damage.`,
            "danger"
        );

    }

    if (
        player.health === 0
    ) {

        playerDied();

    }
}

function healPlayer(
    amount
) {

    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        return;

    }


    player.health +=
        amount;


    if (
        player.health >
        player.maxHealth
    ) {

        player.health =
            player.maxHealth;

    }


    updateHealthUI();


    console.log(
        `Player healed ${amount} health.`
    );

    addGameLog(
        `You recover ${amount} health.`,
        "success"
    );

}

function playerDied() {

    console.log(
        "Player has died."
    );


    addGameLog(
        "You have died.",
        "danger"
    );

}

// ============================================================
// KEYBOARD
// ============================================================

window.addEventListener(
    "keydown",
    event => {

        let handled =
            true;


        switch (
            event.key.toLowerCase()
        ) {

            case "w":
            case "arrowup":

                movePlayer(
                    0,
                    -1
                );

                break;


            case "s":
            case "arrowdown":

                movePlayer(
                    0,
                    1
                );

                break;


            case "a":
            case "arrowleft":

                movePlayer(
                    -1,
                    0
                );

                break;


            case "d":
            case "arrowright":

                movePlayer(
                    1,
                    0
                );

                break;


            default:

                handled =
                    false;

        }


        if (handled) {

            event.preventDefault();

        }

    }
);

// ============================================================
// ENEMIES
// ============================================================

const enemies = [];

const enemyImages =
    new Map();

// ============================================================
// LOAD ENEMY SPRITES
// ============================================================

function loadEnemySprites() {

    if (!window.ENEMY_TYPES) {

        console.warn(
            "ENEMY_TYPES database was not loaded."
        );

        return;
    }

    for (
        const [
            enemyType,
            definition
        ]
        of Object.entries(
            window.ENEMY_TYPES
        )
    ) {

        const image =
            new Image();


        const imageData = {

            image,
            loaded: false

        };


        image.onload = () => {

            imageData.loaded =
                true;

        };


        image.onerror = () => {

            imageData.loaded =
                false;

            console.warn(
                `Could not load enemy sprite: ${definition.sprite}`
            );

        };


        image.src =
            definition.sprite;


        enemyImages.set(
            enemyType,
            imageData
        );
    }
}

// ============================================================
// CREATE ENEMIES FROM TILED
// ============================================================

function loadEnemiesFromMap() {

    enemies.length = 0;


    const tileWidth =
        mapData.tilewidth;

    const tileHeight =
        mapData.tileheight;


    for (
        const layer
        of objectLayers
    ) {

        for (
            const object
            of layer.objects
        ) {

            const enemyType =
                object.class ||
                object.type;


            if (
                !window.ENEMY_TYPES ||
                !window.ENEMY_TYPES[enemyType]
            ) {

                continue;
            }


            const definition =
                window.ENEMY_TYPES[
                    enemyType
                ];


            const enemy = {

                id:
                    object.id,

                type:
                    enemyType,

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

                health:
                    definition.maxHealth,

                maxHealth:
                    definition.maxHealth,

                alive:
                    true,

                aggro:
                    false,

                returningHome:
                    false,

                damageFlashUntil:
                    0,

                homeX:
                    Math.floor(
                        object.x /
                        tileWidth
                    ),

                homeY:
                    Math.floor(
                        object.y /
                        tileHeight
                    )

            };


            enemies.push(
                enemy
            );
        }
    }


    console.log(
        `Loaded ${enemies.length} enemies.`
    );
}

// ============================================================
// FIND ENEMY
// ============================================================

function getEnemyAt(
    x,
    y
) {

    for (
        const enemy
        of enemies
    ) {

        if (
            !enemy.alive
        ) {

            continue;

        }


        if (
            enemy.x === x &&
            enemy.y === y
        ) {

            return enemy;

        }
    }


    return null;
}

// ============================================================
// PLAYER ATTACK ENEMY
// ============================================================

function attackEnemy(
    enemy
) {

    if (
        !enemy ||
        !enemy.alive
    ) {

        closeContextMenu();

        return;
    }


    const definition =
        window.ENEMY_TYPES[
            enemy.type
        ];


    if (!definition) {

        closeContextMenu();

        return;
    }


    // ========================================================
    // MUST BE NEXT TO ENEMY
    // ========================================================

    if (
        !isPlayerAdjacentTo(
            enemy.x,
            enemy.y
        )
    ) {

        addGameLog(
            `${definition.name} is too far away to attack.`,
            "combat"
        );


        closeContextMenu();

        return;
    }


    // ========================================================
    // ATTACK
    // ========================================================

    const damage =
        getPlayerAttackDamage();


    enemy.health -=
        damage;

    enemy.damageFlashUntil =
        performance.now() + 180;

    if (
        enemy.health < 0
    ) {

        enemy.health = 0;

    }


    // Attacking the enemy causes aggro.

    enemy.aggro =
        true;


    enemy.returningHome =
        false;


    const handItem =
        getEquippedItem(
            "hand"
        );


    if (handItem) {

        addGameLog(
            `You attack ${definition.name} with ${handItem.name} for ${damage} damage. (${enemy.health}/${enemy.maxHealth} HP)`,
            "combat"
        );

    } else {

        addGameLog(
            `You punch ${definition.name} for ${damage} damage. (${enemy.health}/${enemy.maxHealth} HP)`,
            "combat"
        );

    }


    closeContextMenu();

    function getPlayerAttackDamage() {

        const handItem =
            getEquippedItem(
                "hand"
            );


        if (
            handItem &&
            Number.isFinite(
                handItem.damage
            )
        ) {

            return handItem.damage;
        }


        return player.unarmedDamage;
    }


    // ========================================================
    // ENEMY DIES
    // ========================================================

    if (
        enemy.health === 0
    ) {

        enemy.alive =
            false;


        enemy.aggro =
            false;


        enemy.returningHome =
            false;


        addGameLog(
            `${definition.name} dies.`,
            "success"
        );

        dropEnemyLoot(
            enemy
        );


        // Player still used a turn.
        // Other enemies may act.

        runEnemyTurn();


        return;
    }


    // ========================================================
    // ENEMY TURN
    // ========================================================

    runEnemyTurn();
}

// ============================================================
// GRID DISTANCE
// ============================================================

function getGridDistance(
    x1,
    y1,
    x2,
    y2
) {

    return (
        Math.abs(
            x1 - x2
        ) +
        Math.abs(
            y1 - y2
        )
    );
}


// ============================================================
// ENEMY MOVEMENT CHECK
// ============================================================

function canEnemyMoveTo(
    enemy,
    x,
    y
) {

    // Terrain collision

    if (
        isTileBlocked(
            x,
            y
        )
    ) {

        return false;
    }


    // Enemy cannot move onto player.

    if (
        player.x === x &&
        player.y === y
    ) {

        return false;
    }


    // Enemy cannot move onto another enemy.

    const otherEnemy =
        getEnemyAt(
            x,
            y
        );


    if (
        otherEnemy &&
        otherEnemy !== enemy
    ) {

        return false;
    }


    return true;
}


// ============================================================
// MOVE ENEMY TOWARD SPILLER/POSITION
// ============================================================

function moveEnemyToward(
    enemy,
    targetX,
    targetY
) {

    const dx =
        targetX -
        enemy.x;

    const dy =
        targetY -
        enemy.y;


    const stepX =
        Math.sign(
            dx
        );

    const stepY =
        Math.sign(
            dy
        );


    const moves = [];


    if (
        Math.abs(dx) >=
        Math.abs(dy)
    ) {

        if (
            stepX !== 0
        ) {

            moves.push({
                x:
                    enemy.x +
                    stepX,

                y:
                    enemy.y
            });

        }


        if (
            stepY !== 0
        ) {

            moves.push({
                x:
                    enemy.x,

                y:
                    enemy.y +
                    stepY
            });

        }

    } else {

        if (
            stepY !== 0
        ) {

            moves.push({
                x:
                    enemy.x,

                y:
                    enemy.y +
                    stepY
            });

        }


        if (
            stepX !== 0
        ) {

            moves.push({
                x:
                    enemy.x +
                    stepX,

                y:
                    enemy.y
            });

        }

    }


    for (
        const move
        of moves
    ) {

        if (
            canEnemyMoveTo(
                enemy,
                move.x,
                move.y
            )
        ) {

            enemy.x =
                move.x;

            enemy.y =
                move.y;


            return true;
        }
    }


    return false;
}


// ============================================================
// SINGLE ENEMY TURN
// ============================================================

function takeEnemyTurn(
    enemy
) {

    if (
        !enemy.alive
    ) {

        return;
    }


    const definition =
        window.ENEMY_TYPES[
            enemy.type
        ];


    if (
        !definition ||
        !definition.hostile
    ) {

        return;
    }


    // ========================================================
    // RETURN HOME
    // ========================================================

    if (
        enemy.returningHome
    ) {

        const homeDistance =
            getGridDistance(
                enemy.x,
                enemy.y,
                enemy.homeX,
                enemy.homeY
            );


        if (
            homeDistance === 0
        ) {

            enemy.returningHome =
                false;


            addGameLog(
                `${definition.name} returns to its territory.`,
                "combat"
            );


            return;
        }


        moveEnemyToward(
            enemy,
            enemy.homeX,
            enemy.homeY
        );


        return;
    }


    const distance =
        getGridDistance(
            enemy.x,
            enemy.y,
            player.x,
            player.y
        );


    // ========================================================
    // NOTICE PLAYER
    // ========================================================

    if (
        !enemy.aggro &&
        distance <=
            definition.aggroRange
    ) {

        enemy.aggro =
            true;


        addGameLog(
            `${definition.name} notices you.`,
            "danger"
        );

    }


    if (
        !enemy.aggro
    ) {

        return;
    }


    // ========================================================
    // TERRITORY LIMIT
    // ========================================================

    const distanceFromHome =
        getGridDistance(
            enemy.x,
            enemy.y,
            enemy.homeX,
            enemy.homeY
        );


    if (
        distanceFromHome >=
        definition.chaseRadius
    ) {

        enemy.aggro =
            false;

        enemy.returningHome =
            true;


        addGameLog(
            `${definition.name} gives up the chase.`,
            "combat"
        );


        return;
    }


    // ========================================================
    // ATTACK PLAYER
    // ========================================================

    if (
        distance === 1
    ) {

        damagePlayer(
            definition.damage,
            definition.name
        );


        return;
    }


    // ========================================================
    // CHASE PLAYER
    // ========================================================

    const moved =
        moveEnemyToward(
            enemy,
            player.x,
            player.y
        );


    if (
        moved
    ) {

        console.log(
            `${definition.name} moves closer.`,
            "combat"
        );

    }
}

// ============================================================
// ENEMY TURN
// ============================================================

function runEnemyTurn() {

    for (
        const enemy
        of enemies
    ) {

        takeEnemyTurn(
            enemy
        );

    }
}

// ============================================================
// ENEMY LOOT
// ============================================================

function dropEnemyLoot(
    enemy
) {

    if (!enemy) {

        return;

    }


    const definition =
        window.ENEMY_TYPES[
            enemy.type
        ];


    if (
        !definition ||
        !definition.loot
    ) {

        return;
    }


    for (
        const loot
        of definition.loot
    ) {

        if (
            Math.random() >
            loot.chance
        ) {

            continue;
        }


        const amount =
            Math.floor(
                Math.random() *
                (
                    loot.maxAmount -
                    loot.minAmount +
                    1
                )
            ) +
            loot.minAmount;


        addItem(
            loot.itemId,
            amount
        );


        const item =
            window.ITEMS[
                loot.itemId
            ];


        if (item) {

            addGameLog(
                `You receive ${amount}x ${item.name}.`,
                "success"
            );

        }
    }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

canvas.addEventListener(
    "wheel",
    event => {

        event.preventDefault();


        if (
            event.deltaY < 0
        ) {

            zoom += 1;

        } else {

            zoom -= 1;

        }


        zoom =
            Math.max(
                MIN_ZOOM,
                Math.min(
                    MAX_ZOOM,
                    zoom
                )
            );

    },
    {
        passive: false
    }
);

canvas.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();


        if (!mapData) {

            return;

        }


        const rect =
            canvas.getBoundingClientRect();


        const mouseX =
            event.clientX -
            rect.left;


        const mouseY =
            event.clientY -
            rect.top;


        const tile =
            screenToWorldTile(
                mouseX,
                mouseY
            );


        if (!tile) {

            return;

        }

        // ========================================================
        // ENEMY
        // ========================================================

        const enemy =
            getEnemyAt(
                tile.x,
                tile.y
            );


        if (enemy) {

            openEnemyContextMenu(
                mouseX,
                mouseY,
                enemy
            );


            return;
        }

        const target =
            findTileAt(
                tile.x,
                tile.y
            );


        if (!target) {

            closeContextMenu();

            return;

        }


        openContextMenu(
            mouseX,
            mouseY,
            target
        );

    }
);

window.addEventListener(
    "mousedown",
    event => {

        if (
            event.button !== 0
        ) {

            return;

        }


        if (
            contextMenu.contains(
                event.target
            )
        ) {

            return;

        }


        closeContextMenu();

    }
);

window.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeContextMenu();

        }

    }
);

inventoryButton.addEventListener(
    "click",
    () => {

        toggleInventory();

    }
);

closeInventoryButton.addEventListener(
    "click",
    () => {

        inventoryWindow.classList.add(
            "hidden"
        );

    }
);

craftingButton.addEventListener(
    "click",
    () => {

        toggleCrafting();

    }
);


closeCraftingButton.addEventListener(
    "click",
    () => {

        craftingWindow.classList.add(
            "hidden"
        );

    }
);

characterButton.addEventListener(
    "click",
    () => {

        const opening =
            characterWindow.classList.contains(
                "hidden"
            );


        if (opening) {

            inventoryWindow.classList.add(
                "hidden"
            );


            craftingWindow.classList.add(
                "hidden"
            );


            characterWindow.classList.remove(
                "hidden"
            );


            updateCharacterUI();

        } else {

            characterWindow.classList.add(
                "hidden"
            );

        }

    }
);


closeCharacterButton.addEventListener(
    "click",
    () => {

        characterWindow.classList.add(
            "hidden"
        );

    }
);


unequipHandButton.addEventListener(
    "click",
    () => {

        unequipItem(
            "hand"
        );

    }
);


unequipArmorButton.addEventListener(
    "click",
    () => {

        unequipItem(
            "armor"
        );

    }
);


// ============================================================
// DRAW TILE
// ============================================================

function drawTile(
    rawGid,
    screenX,
    screenY
) {

    if (!rawGid) {

        return;

    }


    const gid =
        cleanGid(
            rawGid
        );


    const tileset =
        getTilesetForGid(
            gid
        );


    if (!tileset) {

        return;

    }


    const localId =
        gid -
        tileset.firstgid;


    const data =
        tileset.data;


    const screenTileWidth =
        mapData.tilewidth *
        zoom;

    const screenTileHeight =
        mapData.tileheight *
        zoom;


    const offsetX =
        data.tileoffset?.x ||
        0;

    const offsetY =
        data.tileoffset?.y ||
        0;


    // ========================================================
    // COLLECTION OF IMAGES
    // ========================================================

    const individualImage =
        tileset.tileImages.get(
            localId
        );


    if (individualImage) {

        const width =
            individualImage.width *
            zoom;

        const height =
            individualImage.height *
            zoom;


        // Tiled tiles align at the bottom.

        const drawX =
            screenX +
            offsetX *
            zoom;


        const drawY =
            screenY +
            screenTileHeight -
            height +
            offsetY *
            zoom;


        ctx.drawImage(
            individualImage,

            drawX,
            drawY,

            width,
            height
        );


        return;

    }


    // ========================================================
    // SPRITESHEET TILESET
    // ========================================================

    if (
        tileset.atlasImage
    ) {

        const tileWidth =
            data.tilewidth;

        const tileHeight =
            data.tileheight;


        const spacing =
            data.spacing || 0;

        const margin =
            data.margin || 0;


        const columns =
            data.columns;


        if (!columns) {

            return;

        }


        const column =
            localId %
            columns;


        const row =
            Math.floor(
                localId /
                columns
            );


        const sourceX =
            margin +
            column *
            (
                tileWidth +
                spacing
            );


        const sourceY =
            margin +
            row *
            (
                tileHeight +
                spacing
            );


        const drawX =
            screenX +
            offsetX *
            zoom;


        const drawY =
            screenY +
            mapData.tileheight *
            zoom -
            tileHeight *
            zoom +
            offsetY *
            zoom;


        ctx.drawImage(
            tileset.atlasImage,

            sourceX,
            sourceY,

            tileWidth,
            tileHeight,

            drawX,
            drawY,

            tileWidth *
            zoom,

            tileHeight *
            zoom
        );

    }

}


// ============================================================
// CAMERA
// ============================================================

function getCamera() {

    const tileWidth =
        mapData.tilewidth *
        zoom;

    const tileHeight =
        mapData.tileheight *
        zoom;


    return {

        x:
            canvas.width / 2 -
            player.x *
            tileWidth -
            tileWidth / 2,

        y:
            canvas.height / 2 -
            player.y *
            tileHeight -
            tileHeight / 2

    };

}

// ============================================================
// SCREEN POSITION -> WORLD TILE
// ============================================================

function screenToWorldTile(
    screenX,
    screenY
) {

    if (!mapData) {

        return null;

    }


    const camera =
        getCamera();


    const tileWidth =
        mapData.tilewidth *
        zoom;

    const tileHeight =
        mapData.tileheight *
        zoom;


    const worldX =
        Math.floor(
            (
                screenX -
                camera.x
            ) /
            tileWidth
        );


    const worldY =
        Math.floor(
            (
                screenY -
                camera.y
            ) /
            tileHeight
        );


    return {

        x: worldX,
        y: worldY

    };
}

// ============================================================
// FIND CLICKED TILE
// ============================================================

function findTileAt(
    x,
    y
) {

    // Vi går baklengs fordi de øverste
    // Tiled layers bør få prioritet.

    for (
        let i =
            tileLayers.length - 1;

        i >= 0;

        i--
    ) {

        const layer =
            tileLayers[i];


        if (
            layer.visible === false
        ) {

            continue;

        }


        const gid =
            getTileGid(
                layer,
                x,
                y
            );


        if (!gid) {

            continue;

        }


        const properties =
            getTileProperties(
                gid
            );


        return {

            x,
            y,

            layer,

            gid,

            properties

        };

    }


    return null;
}

// ============================================================
// OPEN ENEMY CONTEXT MENU
// ============================================================

function openEnemyContextMenu(
    screenX,
    screenY,
    enemy
) {

    if (
        !enemy ||
        !enemy.alive
    ) {

        return;
    }


    const definition =
        window.ENEMY_TYPES[
            enemy.type
        ];


    if (!definition) {

        return;
    }


    contextTarget = {
        targetType: "enemy",
        enemy: enemy
    };


    contextActions.innerHTML =
        "";


    contextTitle.textContent =
        definition.name;


    // ========================================================
    // ATTACK
    // ========================================================

    addContextAction(
        "Attack",
        () => {

            attackEnemy(
                enemy
            );

        }
    );


    // ========================================================
    // EXAMINE
    // ========================================================

    addContextAction(
        "Examine",
        () => {

            addGameLog(
                `${definition.description} Health: ${enemy.health}/${enemy.maxHealth}.`,
                "normal"
            );


            closeContextMenu();

        }
    );


    // ========================================================
    // POSITION
    // ========================================================

    contextMenu.style.left =
        `${screenX}px`;

    contextMenu.style.top =
        `${screenY}px`;


    contextMenu.classList.remove(
        "hidden"
    );


    requestAnimationFrame(
        keepContextMenuOnScreen
    );
}

// ============================================================
// OPEN CONTEXT MENU
// ============================================================

function openContextMenu(
    screenX,
    screenY,
    target
) {

    contextTarget =
        target;


    contextActions.innerHTML =
        "";


    const properties =
        target.properties || {};


    const objectType =
        properties.objectType;


    // ========================================================
    // TREE
    // ========================================================

    if (
        objectType === "tree"
    ) {

        contextTitle.textContent =
            "Tree";


        addContextAction(
            "Chop",
            () => {

                chopTree(
                    contextTarget
                );

            }
        );


        addContextAction(
            "Examine",
            () => {

                console.log(
                    "It is a tree."
                );


                closeContextMenu();

            }
        );

    }

    else if (
        objectType === "stone"
    ) {

        contextTitle.textContent =
            "Stone";


        addContextAction(
            "Gather Small Rocks",
            () => {

                gatherSmallRocks(
                    contextTarget
                );

            }
        );


        addContextAction(
            "Examine",
            () => {

                addGameLog(
                    "A large stone formation. Small loose rocks can be found around it.",
                    "normal"
                );


                closeContextMenu();

            }
        );

    }

    else if (
        objectType === "bush"
    ) {

        contextTitle.textContent =
            "Bush";


        addContextAction(
            "Gather Sticks",
            () => {

                gatherSticks(
                    contextTarget
                );

            }
        );


        addContextAction(
            "Examine",
            () => {

                addGameLog(
                    "A small bush with several usable sticks.",
                    "normal"
                );


                closeContextMenu();

            }
        );

    }


    // ========================================================
    // UNKNOWN TILE
    // ========================================================

    else {

        contextTitle.textContent =
            "Terrain";


        addContextAction(
            "Examine",
            () => {

                console.log(
                    target
                );


                closeContextMenu();

            }
        );

    }


    // ========================================================
    // POSITION WINDOW
    // ========================================================

    contextMenu.style.left =
        `${screenX}px`;

    contextMenu.style.top =
        `${screenY}px`;


    contextMenu.classList.remove(
        "hidden"
    );


    // Keep inside screen.

    requestAnimationFrame(
        keepContextMenuOnScreen
    );
}

function addContextAction(
    label,
    callback
) {

    const button =
        document.createElement(
            "button"
        );


    button.className =
        "context-action";


    button.textContent =
        label;


    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            callback();

        }
    );


    contextActions.appendChild(
        button
    );
}

function closeContextMenu() {

    contextMenu.classList.add(
        "hidden"
    );


    contextTarget =
        null;
}

function keepContextMenuOnScreen() {

    const viewport =
        document.getElementById(
            "gameViewport"
        );


    const rect =
        contextMenu.getBoundingClientRect();


    let left =
        parseInt(
            contextMenu.style.left
        );


    let top =
        parseInt(
            contextMenu.style.top
        );


    if (
        left +
        rect.width >
        viewport.clientWidth
    ) {

        left =
            viewport.clientWidth -
            rect.width -
            4;
    }


    if (
        top +
        rect.height >
        viewport.clientHeight
    ) {

        top =
            viewport.clientHeight -
            rect.height -
            4;
    }


    if (left < 0) {

        left = 0;

    }


    if (top < 0) {

        top = 0;

    }


    contextMenu.style.left =
        `${left}px`;


    contextMenu.style.top =
        `${top}px`;
}

// ============================================================
// GATHER SMALL ROCKS
// ============================================================

function gatherSmallRocks(
    target
) {

    if (!target) {

        return;
    }


    if (
        target.properties.objectType !==
        "stone"
    ) {

        return;
    }


    // Player must stand next to the stone.

    if (
        !isPlayerAdjacentTo(
            target.x,
            target.y
        )
    ) {

        addGameLog(
            "You are too far away to gather rocks.",
            "action"
        );


        closeContextMenu();

        return;
    }


    // Random amount: 1-3

    const amount =
        Math.floor(
            Math.random() * 3
        ) + 1;


    addItem(
        "small_rock",
        amount
    );


    addGameLog(
        `You gather ${amount} Small Rock${amount === 1 ? "" : "s"}.`,
        "success"
    );


    closeContextMenu();


    // Gathering uses one turn.

    runEnemyTurn();
}

// ============================================================
// GATHER STICKS
// ============================================================

function gatherSticks(
    target
) {

    if (!target) {

        return;
    }


    if (
        target.properties.objectType !==
        "bush"
    ) {

        return;
    }


    // Bushes are walkable, so the player
    // may stand either on it or next to it.

    const distance =
        Math.abs(
            player.x - target.x
        ) +
        Math.abs(
            player.y - target.y
        );


    if (
        distance > 1
    ) {

        addGameLog(
            "You are too far away to gather sticks.",
            "action"
        );


        closeContextMenu();

        return;
    }


    addItem(
        "stick",
        5
    );


    // Bush is depleted and disappears.

    setTile(
        target.layer,
        target.x,
        target.y,
        0
    );


    addGameLog(
        "You gather 5 Sticks from the bush.",
        "success"
    );


    closeContextMenu();


    runEnemyTurn();
}

// ============================================================
// CHOP TREE
// ============================================================

function chopTree(
    target
) {

    if (!target) {

        return;
    }


    // -------------------------
    // MAKE SURE IT IS A TREE
    // -------------------------

    if (
        target.properties.objectType !==
        "tree"
    ) {

        return;
    }

    // -------------------------
    // PLAYER MUST BE ADJACENT (fancy word of the day)
    // -------------------------

    if (
        !isPlayerAdjacentTo(
            target.x,
            target.y
        )
    ) {

        console.log(
            "You are too far away."
        );

        addGameLog(
            "You are too far away to chop the tree.",
            "action"
        );


        closeContextMenu();

        return;
    }

    // -------------------------
    // AXE REQUIRED
    // -------------------------

    if (
        !hasEquippedTool(
            "axe"
        )
    ) {

        addGameLog(
            "You need an axe equipped to chop this tree.",
            "action"
        );


        closeContextMenu();

        return;
    }

    // -------------------------
    // REMOVE TREE
    // -------------------------

    setTile(
        target.layer,
        target.x,
        target.y,
        0
    );


    // -------------------------
    // GIVE WOOD
    // -------------------------

    addItem(
        "wood",
        1
    );

    addItem(
        "tree_seed",
        4
    );


    console.log(
        "Tree chopped. Wood +1"
    );


    addGameLog(
        "You chop down a tree and receive 1 Wood and 4 Tree Seeds.",
        "success"
    );


    closeContextMenu();
}

// ============================================================
// DRAW FINITE TILE LAYER
// ============================================================

function drawFiniteLayer(
    layer,
    camera
) {

    const tileWidth =
        mapData.tilewidth *
        zoom;

    const tileHeight =
        mapData.tileheight *
        zoom;


    const startX =
        Math.max(
            layer.x || 0,

            Math.floor(
                -camera.x /
                tileWidth
            ) - 2
        );


    const startY =
        Math.max(
            layer.y || 0,

            Math.floor(
                -camera.y /
                tileHeight
            ) - 2
        );


    const endX =
        Math.min(
            (layer.x || 0) +
            layer.width,

            Math.ceil(
                (
                    canvas.width -
                    camera.x
                ) /
                tileWidth
            ) + 2
        );


    const endY =
        Math.min(
            (layer.y || 0) +
            layer.height,

            Math.ceil(
                (
                    canvas.height -
                    camera.y
                ) /
                tileHeight
            ) + 2
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

            const gid =
                getTileGid(
                    layer,
                    x,
                    y
                );


            if (!gid) {

                continue;

            }


            const screenX =
                x *
                tileWidth +
                camera.x;


            const screenY =
                y *
                tileHeight +
                camera.y;


            drawTile(
                gid,
                screenX,
                screenY
            );

        }

    }

}


// ============================================================
// DRAW INFINITE TILE LAYER
// ============================================================

function drawInfiniteLayer(
    layer,
    camera
) {

    const tileWidth =
        mapData.tilewidth *
        zoom;

    const tileHeight =
        mapData.tileheight *
        zoom;


    for (
        const chunk
        of layer.chunks
    ) {

        for (
            let localY = 0;
            localY < chunk.height;
            localY++
        ) {

            for (
                let localX = 0;
                localX < chunk.width;
                localX++
            ) {

                const x =
                    chunk.x +
                    localX;


                const y =
                    chunk.y +
                    localY;


                const screenX =
                    x *
                    tileWidth +
                    camera.x;


                const screenY =
                    y *
                    tileHeight +
                    camera.y;


                // Don't draw tiles outside viewport.

                if (
                    screenX <
                        -tileWidth * 2 ||

                    screenY <
                        -tileHeight * 2 ||

                    screenX >
                        canvas.width +
                        tileWidth * 2 ||

                    screenY >
                        canvas.height +
                        tileHeight * 2
                ) {

                    continue;

                }


                const gid =
                    getTileGid(
                        layer,
                        x,
                        y
                    );


                if (!gid) {

                    continue;

                }


                drawTile(
                    gid,
                    screenX,
                    screenY
                );

            }

        }

    }

}


// ============================================================
// DRAW MAP
// ============================================================

function drawMap(
    camera
) {

    for (
        const layer
        of tileLayers
    ) {

        if (
            layer.visible ===
            false
        ) {

            continue;

        }


        ctx.save();


        ctx.globalAlpha =
            layer.opacity ??
            1;


        if (
            layer.chunks
        ) {

            drawInfiniteLayer(
                layer,
                camera
            );

        } else {

            drawFiniteLayer(
                layer,
                camera
            );

        }


        ctx.restore();

    }

}


// ============================================================
// DRAW PLAYER
// ============================================================

function drawPlayer(
    camera
) {

    const tileWidth =
        mapData.tilewidth *
        zoom;

    const tileHeight =
        mapData.tileheight *
        zoom;


    const screenX =
        player.x *
        tileWidth +
        camera.x;


    const screenY =
        player.y *
        tileHeight +
        camera.y;


    // ========================================================
    // PLAYER SPRITE
    // ========================================================

    if (
        player.imageLoaded
    ) {

        ctx.drawImage(
            player.image,

            screenX,
            screenY,

            tileWidth,
            tileHeight
        );

    } else {

        ctx.fillStyle =
            "#000";


        ctx.fillRect(
            screenX,
            screenY,
            tileWidth,
            tileHeight
        );


        ctx.fillStyle =
            "#ffff55";


        ctx.font =
            `${Math.floor(
                tileHeight *
                0.9
            )}px monospace`;


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.fillText(
            "@",

            screenX +
            tileWidth / 2,

            screenY +
            tileHeight / 2
        );
    }


    // ========================================================
    // PLACEHOLDER PLAYER
    // ========================================================

    ctx.fillStyle =
        "#000";


    ctx.fillRect(
        screenX,
        screenY,
        tileWidth,
        tileHeight
    );


    ctx.fillStyle =
        "#ffff55";


    ctx.font =
        `${Math.floor(
            tileHeight *
            0.9
        )}px monospace`;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(
        "@",

        screenX +
        tileWidth / 2,

        screenY +
        tileHeight / 2
    );

    drawDamageFlash(
        player.damageFlashUntil,
        screenX,
        screenY,
        tileWidth,
        tileHeight
    );

}


// ============================================================
// RENDER
// ============================================================

function render() {

    ctx.fillStyle =
        "#000";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if (!mapData) {

        return;

    }


    const camera =
        getCamera();


    drawMap(
        camera
    );


    drawEnemies(
        camera
    );


    drawPlayer(
        camera
    );
}


// ============================================================
// UI
// ============================================================

function updateUI() {

    const positionText =
        `X: ${player.x} Y: ${player.y}`;


    playerPositionDisplay.textContent =
        positionText;


    sidebarPositionDisplay.textContent =
        positionText;
}


// ============================================================
// RESIZE CANVAS
// ============================================================

function resizeCanvas() {

    const viewport =
        document.getElementById(
            "gameViewport"
        );


    canvas.width =
        viewport.clientWidth;


    canvas.height =
        viewport.clientHeight;


    ctx.imageSmoothingEnabled =
        false;
}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


// ============================================================
// GAME LOOP
// ============================================================

function gameLoop() {

    render();


    requestAnimationFrame(
        gameLoop
    );

}


// ============================================================
// START
// ============================================================

async function startGame() {

    loadEnemySprites();

    await loadMap();

    updateInventoryUI();

    updateHealthUI();

    gameLoop();
}


startGame();