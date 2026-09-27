"use strict";

window.NATURE_OBJECT_DATA = {

    berry_bush: {
        name: "Berry Bush",

        char: "♧",
        color: "#78b85f",

        depletedChar: "♧",
        depletedColor: "#465b3f",

        description:
            "A wild berry bush with small edible berries.",

        depletedDescription:
            "The berry bush has been picked clean. It may produce more berries later.",

        spawn: {
            chance: 0.018,
            seedOffset: 131000,

            biomes: [
                "grassland",
                "temperate_forest"
            ],

            tileTypes: [
                "grass",
                "grassDark"
            ]
        },

        gather: {
            itemId: "berries",

            actionLabel:
                "Pick berries",

            minAmount: 2,
            maxAmount: 5,

            minutes: 3,

            regrowMinutes:
                3 * 24 * 60
        }
    },

    fallen_branch: {
        name: "Fallen Branch",

        char: "/",
        color: "#9a7651",

        description:
            "A dry fallen branch lying on the ground.",

        spawn: {
            chance: 0.026,
            seedOffset: 132000,

            biomes: [
                "temperate_forest",
                "taiga"
            ],

            tileTypes: [
                "grassDark",
                "tundra"
            ]
        },

        gather: {
            itemId: "stick",

            actionLabel:
                "Take branch",

            minAmount: 1,
            maxAmount: 3,

            minutes: 2,

            removeAfterGather: true
        }
    },

    loose_stones: {
        name: "Loose Stones",

        char: "o",
        color: "#aaa89b",

        description:
            "Several loose stones that could be useful as simple materials.",

        spawn: {
            chance: 0.014,
            seedOffset: 133000,

            biomes: [
                "dry_grassland",
                "cold_grassland",
                "tundra",
                "mountain",
                "grassland"
            ],

            tileTypes: [
                "hill",
                "dryGrass",
                "tundra",
                "grass"
            ]
        },

        gather: {
            itemId: "stone",

            actionLabel:
                "Gather stones",

            minAmount: 1,
            maxAmount: 2,

            minutes: 2,

            removeAfterGather: true
        }
    }
};