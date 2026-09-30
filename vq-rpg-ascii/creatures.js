"use strict";

/* =========================================================
   CREATURE DATA
========================================================= */

window.CREATURE_DATA = {

    spider: {

        name:
            "Spider",

        description:
            "A hostile spider that reacts aggressively to nearby movement.",

        char:
            "s",

        color:
            "#d34f4f",

        maxHp:
            5,

        behavior:
            "hostile",

        detectionRange:
            8,

        moveChance:
            1,

        spawn: {

            count:
                25,

            biomes: [
                "grassland",
                "temperate_forest",
                "swamp",
                "dry_grassland"
            ],

            tileTypes: [
                "grass",
                "grassDark",
                "dryGrass",
                "swamp"
            ]
        }
    },


    rabbit: {

        name:
            "Rabbit",

        description:
            "A small wild rabbit. It is alert and likely to flee from danger.",

        carcassType:
            "rabbit_carcass",

        char:
            "r",

        color:
            "#d8d0bd",

        maxHp:
            3,

        behavior:
            "flee",

        detectionRange:
            5,

        moveChance:
            0.75,

        spawn: {

            count:
                45,

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
        }
    },


    deer: {

        name:
            "Deer",

        description:
            "A wild deer. It keeps its distance and will flee when approached.",

        carcassType:
            "deer_carcass",

        char:
            "d",

        color:
            "#b88a5a",

        maxHp:
            12,

        behavior:
            "flee",

        detectionRange:
            7,

        moveChance:
            0.55,

        spawn: {

            count:
                25,

            biomes: [
                "grassland",
                "temperate_forest",
                "taiga"
            ],

            tileTypes: [
                "grass",
                "grassDark",
                "tundra"
            ]
        }
    }

};

/* =========================================================
   CREATURE WORLD OBJECTS
========================================================= */

window.CREATURE_OBJECT_DATA = {

    rabbit_carcass: {

        name:
            "Rabbit Carcass",

        char:
            "%",

        color:
            "#a8876d",

        description:
            "The fresh carcass of a wild rabbit.",

        blocksMovement:
            false,

        butcher: {

            actionLabel:
                "Butcher carcass",

            requiredToolType:
                "knife",

            requiredToolLabel:
                "Knife",

            minutes:
                8,

            outputs: [

                {
                    itemId:
                        "raw_meat",

                    minAmount:
                        1,

                    maxAmount:
                        2
                },

                {
                    itemId:
                        "hide",

                    minAmount:
                        1,

                    maxAmount:
                        1
                },

                {
                    itemId:
                        "bone",

                    minAmount:
                        1,

                    maxAmount:
                        2
                }
            ]
        }
    },


    deer_carcass: {

        name:
            "Deer Carcass",

        char:
            "%",

        color:
            "#8f684b",

        description:
            "The fresh carcass of a wild deer.",

        blocksMovement:
            false,

        butcher: {

            actionLabel:
                "Butcher carcass",

            requiredToolType:
                "knife",

            requiredToolLabel:
                "Knife",

            minutes:
                20,

            outputs: [

                {
                    itemId:
                        "raw_meat",

                    minAmount:
                        5,

                    maxAmount:
                        8
                },

                {
                    itemId:
                        "hide",

                    minAmount:
                        2,

                    maxAmount:
                        3
                },

                {
                    itemId:
                        "bone",

                    minAmount:
                        3,

                    maxAmount:
                        5
                }
            ]
        }
    }

};