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