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
                "taiga",
                "grassland"
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
    },

    /* =========================================================
       FIBROUS PLANT
    ========================================================= */

    fibrous_plant: {

        name:
            "Fibrous Plant",

        char:
            "\"",

        color:
            "#8ca85f",

        depletedChar:
            "\"",

        depletedColor:
            "#4d5e3d",

        description:
            "A tough wild plant with long fibers that can be stripped by hand.",

        depletedDescription:
            "The useful fibers have already been stripped from this plant.",


        spawn: {

            chance:
                0.012,

            seedOffset:
                134000,

            biomes: [
                "grassland",
                "temperate_forest",
                "swamp"
            ],

            tileTypes: [
                "grass",
                "grassDark",
                "swamp"
            ]
        },


        gather: {

            itemId:
                "plant_fiber",

            actionLabel:
                "Gather fibers",

            minAmount:
                2,

            maxAmount:
                4,

            minutes:
                3,

            regrowMinutes:
                2 * 24 * 60
        }
    },


    /* =========================================================
       FLINT NODULE
    ========================================================= */

    flint_nodule: {

        name:
            "Flint Nodule",

        char:
            "*",

        color:
            "#a29d8f",

        description:
            "A small exposed piece of flint among the loose stones.",


        spawn: {

            chance:
                0.006,

            seedOffset:
                135000,

            biomes: [
                "mountain",
                "dry_grassland",
                "cold_grassland",
                "tundra",
                "coast"
            ],

            tileTypes: [
                "hill",
                "dryGrass",
                "tundra",
                "beach"
            ]
        },


        gather: {

            itemId:
                "flint",

            actionLabel:
                "Collect flint",

            minAmount:
                1,

            maxAmount:
                2,

            minutes:
                3,

            removeAfterGather:
                true
        }
    },


    /* =========================================================
       DRY GRASS TUFT
    ========================================================= */

    dry_grass_tuft: {

        name:
            "Dry Grass Tuft",

        char:
            "|",

        color:
            "#b29b5c",

        depletedChar:
            "|",

        depletedColor:
            "#615538",

        description:
            "A patch of dry grass that would make useful tinder.",

        depletedDescription:
            "Most of the usable dry grass has already been gathered.",


        spawn: {

            chance:
                0.010,

            seedOffset:
                136000,

            biomes: [
                "dry_grassland",
                "grassland",
                "cold_grassland"
            ],

            tileTypes: [
                "dryGrass",
                "grass",
                "tundra"
            ]
        },


        gather: {

            itemId:
                "tinder",

            actionLabel:
                "Gather tinder",

            minAmount:
                2,

            maxAmount:
                4,

            minutes:
                2,

            regrowMinutes:
                24 * 60
        }
    },


    /* =========================================================
       WILD MUSHROOM
    ========================================================= */

    wild_mushroom: {

        name:
            "Wild Mushroom",

        char:
            "m",

        color:
            "#d0c3a0",

        depletedChar:
            "m",

        depletedColor:
            "#615c50",

        description:
            "A small edible mushroom growing in the damp ground.",

        depletedDescription:
            "Only the remains of picked mushrooms are visible here.",


        spawn: {

            chance:
                0.007,

            seedOffset:
                137000,

            biomes: [
                "temperate_forest",
                "taiga",
                "swamp"
            ],

            tileTypes: [
                "grassDark",
                "tundra",
                "swamp"
            ]
        },


        gather: {

            itemId:
                "wild_mushroom",

            actionLabel:
                "Pick mushrooms",

            minAmount:
                1,

            maxAmount:
                3,

            minutes:
                2,

            regrowMinutes:
                2 * 24 * 60
        }
    },


    /* =========================================================
       MEDICINAL HERB
    ========================================================= */

    medicinal_herb: {

        name:
            "Medicinal Herb",

        char:
            "+",

        color:
            "#77b878",

        depletedChar:
            "+",

        depletedColor:
            "#405e45",

        description:
            "A wild herb known to be useful in simple remedies.",

        depletedDescription:
            "The useful parts of this herb have already been harvested.",


        spawn: {

            chance:
                0.005,

            seedOffset:
                138000,

            biomes: [
                "grassland",
                "temperate_forest",
                "cold_grassland"
            ],

            tileTypes: [
                "grass",
                "grassDark",
                "tundra"
            ]
        },


        gather: {

            itemId:
                "medicinal_herb",

            actionLabel:
                "Gather herb",

            minAmount:
                1,

            maxAmount:
                2,

            minutes:
                3,

            regrowMinutes:
                4 * 24 * 60
        }
    }

};