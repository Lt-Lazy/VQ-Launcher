// ============================================================
// VQ RPG
// ITEM DATABASE
// ============================================================
//
// Alle items i spillet defineres her.
//
// Inventory lagrer bare:
// item ID + quantity
//
// Eksempel:
// wood: 12
//
// All annen informasjon hentes herfra.
// ============================================================


window.ITEMS = {

    // ========================================================
    // RESOURCES
    // ========================================================

    wood: {

        id: "wood",

        name: "Wood",

        category: "resource",

        description:
            "A piece of usable timber.",

        stackable: true,

        maxStack: 999,

        weight: 1,

        value: 1,

        tags: [
            "wood",
            "material",
            "crafting"
        ]
    },

    stick: {

        id: "stick",

        name: "Stick",

        category: "resource",

        description:
            "A sturdy stick useful for primitive tools.",

        stackable: true,

        maxStack: 999,

        weight: 0.3,

        value: 1,

        tags: [
            "wood",
            "material",
            "crafting",
            "primitive"
        ]
    },

    stone: {

        id: "stone",

        name: "Stone",

        category: "resource",

        description:
            "A rough piece of stone.",

        stackable: true,

        maxStack: 999,

        weight: 2,

        value: 1,

        tags: [
            "stone",
            "material",
            "crafting"
        ]
    },

    small_rock: {

        id: "small_rock",

        name: "Small Rock",

        category: "resource",

        description:
            "A small loose rock. Useful for primitive tools.",

        stackable: true,

        maxStack: 999,

        weight: 0.5,

        value: 1,

        tags: [
            "stone",
            "rock",
            "material",
            "crafting",
            "primitive"
        ]
    },

    spider_web: {

        id: "spider_web",

        name: "Spider Web",

        category: "resource",

        description:
            "Sticky web collected from a spider.",

        stackable: true,

        maxStack: 99,

        weight: 0.1,

        value: 2,

        tags: [
            "spider",
            "material",
            "crafting"
        ]
    },


    // ========================================================
    // FOOD
    // ========================================================

    berries: {

        id: "berries",

        name: "Berries",

        category: "food",

        description:
            "A small handful of wild berries.",

        stackable: true,

        maxStack: 99,

        weight: 0.1,

        value: 2,

        foodValue: 5,

        tags: [
            "food",
            "plant"
        ]
    },


    raw_meat: {

        id: "raw_meat",

        name: "Raw Meat",

        category: "food",

        description:
            "Fresh uncooked meat.",

        stackable: true,

        maxStack: 99,

        weight: 1,

        value: 4,

        foodValue: 2,

        tags: [
            "food",
            "meat",
            "raw"
        ]
    },

    // ========================================================
    // GROWABLES
    // ========================================================


    tree_seed: {

        id: "tree_seed",

        name: "Tree Seed",

        category: "agriculture",

        description:
            "A seed to grow trees.",

        stackable: true,

        maxStack: 500,

        weight: 1,

        value: 1,

        foodValue: 0,

        tags: [
            "farm",
            "seed",
            "agriculture",
            "grow"
        ]
    },

    // ========================================================
    // TOOLS
    // ========================================================

    stone_axe: {

        id: "stone_axe",

        name: "Stone Axe",

        category: "tool",

        description:
            "A crude axe with a stone head.",

        stackable: false,

        maxStack: 1,

        weight: 3,

        value: 10,

        equipSlot: "hand",

        toolType: "axe",

        damage: 5,

        durability: 40,

        tags: [
            "tool",
            "axe",
            "weapon"
        ]
    }

};

// ============================================================
// CRAFTING RECIPES
// ============================================================
//
// Alle crafting-oppskrifter defineres her.
//
// ingredients:
// itemId + amount som kreves.
//
// output:
// itemId + amount som blir laget.
// ============================================================

window.CRAFTING_RECIPES = {

    stone_axe: {

        id: "stone_axe",

        category: "tools",

        output: {

            itemId: "stone_axe",
            amount: 1

        },

        ingredients: [

            {
                itemId: "stick",
                amount: 2
            },

            {
                itemId: "small_rock",
                amount: 2
            }

        ]
    }

};