"use strict";

/* =========================================================
   ITEM DATA
========================================================= */

window.ITEM_DATA = {

    bread: {
        name: "Bread",
        baseValue: 5,
        foodValue: 6,
        tags: ["food"],
        effects: [
            {
                type: "hunger",
                amount: 24
            }
        ]
    },

    berries: {
        name: "Berries",
        baseValue: 2,
        foodValue: 2,
        tags: ["food"],
        effects: [
            {
                type: "hunger",
                amount: 3
            }
        ]
    },

    dried_meat: {
        name: "Dried Meat",
        baseValue: 8,
        foodValue: 9,
        tags: ["food"],
        effects: [
            {
                type: "hunger",
                amount: 36
            }
        ]
    },

    timber_bundle: {
        name: "Timber Bundle",
        baseValue: 6,
        tags: ["material"]
    },

    stone: {
        name: "Stone",
        baseValue: 4,
        tags: ["material"]
    },

    iron_ore: {
        name: "Iron Ore",
        baseValue: 14,
        tags: ["material", "ore"]
    },

    stick: {
        name: "Stick",

        description:
            "A small piece of dry wood.",

        baseValue: 1,

        tags:
            ["material", "wood"]
    },


    wood: {
        name: "Wood",

        description:
            "A piece of usable wood cut from a tree.",

        baseValue: 3,

        tags:
            ["material", "wood"]
    },

    plant_fiber: {

        name:
            "Plant Fiber",

        description:
            "Strong natural fibers stripped from fibrous plants.",

        baseValue:
            2,

        tags: [
            "material",
            "fiber",
            "crafting"
        ]
    },


    flint: {

        name:
            "Flint",

        description:
            "A hard piece of flint that can be shaped into a sharp edge.",

        baseValue:
            3,

        tags: [
            "material",
            "stone",
            "crafting"
        ]
    },


    tinder: {

        name:
            "Tinder",

        description:
            "Dry plant material that catches fire easily.",

        baseValue:
            1,

        tags: [
            "material",
            "fire",
            "tinder",
            "crafting"
        ]
    },


    wild_mushroom: {

        name:
            "Wild Mushroom",

        description:
            "An edible mushroom gathered from the wild.",

        baseValue:
            2,

        foodValue:
            1,

        tags: [
            "food",
            "mushroom",
            "ingredient"
        ],

        effects: [

            {
                type:
                    "hunger",

                amount:
                    4
            }
        ]
    },

    roasted_mushroom: {

        name:
            "Roasted Mushroom",

        description:
            "A wild mushroom roasted over an open fire.",

        baseValue:
            4,

        foodValue:
            3,

        tags: [
            "food",
            "cooked"
        ],

        effects: [

            {
                type:
                    "hunger",

                amount:
                    10
            }
        ]
    },

    medicinal_herb: {

        name:
            "Medicinal Herb",

        description:
            "A useful wild herb with medicinal properties.",

        baseValue:
            5,

        tags: [
            "herb",
            "medicine",
            "ingredient"
        ]
    },

    cordage: {

        name:
            "Cordage",

        description:
            "Strong cord twisted from natural plant fibers.",

        baseValue:
            4,

        tags: [
            "material",
            "fiber",
            "crafting"
        ]
    },

    campfire_kit: {

        name:
            "Campfire Kit",

        description:
            "A bundle of stones, wood and tinder ready to be assembled into a campfire.",

        baseValue:
            8,

        placeObjectType:
            "campfire",

        tags: [
            "structure",
            "camping",
            "crafting"
        ]
    },

    fire_starter: {

        name:
            "Fire Starter",

        description:
            "A simple kit of flint and dry material used to start a fire.",

        baseValue:
            6,

        tags: [
            "tool",
            "fire"
        ]
    },


    stone_knife: {

        name:
            "Stone Knife",

        description:
            "A sharp flint blade bound to a simple handle.",

        baseValue:
            8,

        equipSlot:
            "weapon",

        toolType:
            "knife",

        tags: [
            "tool",
            "knife",
            "weapon"
        ]
    },


    stone_spear: {

        name:
            "Stone Spear",

        description:
            "A wooden shaft tipped with a sharp piece of flint.",

        baseValue:
            12,

        equipSlot:
            "weapon",

        tags: [
            "weapon",
            "spear",
            "hunting"
        ]
    },

    stone_axe: {
        name: "Stone Axe",

        description:
            "A crude axe with a stone head. Useful for chopping trees.",

        baseValue: 10,

        equipSlot:
            "tool",

        toolType:
            "axe",

        tags: [
            "tool",
            "axe",
            "weapon"
        ]
    }
};