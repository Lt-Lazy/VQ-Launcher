"use strict";

/* =========================================================
   TERRAIN DATA
========================================================= */

window.TERRAIN_DATA = {

    deepWater: {

        name:
            "Deep Water",

        char:
            "~",

        color:
            "#28536b",

        walkable:
            false,

        inspectable:
            true,

        description:
            "Deep open water. It is too deep to cross on foot."
    },


    shallowWater: {

        name:
            "Shallow Water",

        char:
            "~",

        color:
            "#3d7891",

        walkable:
            false,

        inspectable:
            true,

        description:
            "Shallow water near the edge of deeper waters."
    },


    beach: {

        name:
            "Beach",

        char:
            ".",

        color:
            "#c6b978",

        walkable:
            true,

        inspectable:
            false,

        description:
            "A stretch of sand and loose ground along the water."
    },


    grass: {

        name:
            "Grassland",

        char:
            ".",

        color:
            "#78955e",

        walkable:
            true,

        inspectable:
            false,

        description:
            "Open grass-covered ground."
    },


    grassDark: {

        name:
            "Dense Grass",

        char:
            ",",

        color:
            "#526e47",

        walkable:
            true,

        inspectable:
            false,

        description:
            "Thicker vegetation covers the ground here."
    },


    dryGrass: {

        name:
            "Dry Grassland",

        char:
            "'",

        color:
            "#a59b58",

        walkable:
            true,

        inspectable:
            false,

        description:
            "Dry grasses cover the ground."
    },


    desert: {

        name:
            "Desert",

        char:
            ".",

        color:
            "#c7ad61",

        walkable:
            true,

        inspectable:
            false,

        description:
            "Dry and barren ground with little vegetation."
    },


    tundra: {

        name:
            "Tundra",

        char:
            ".",

        color:
            "#9aa79b",

        walkable:
            true,

        inspectable:
            false,

        description:
            "Cold open ground with sparse vegetation."
    },


    swamp: {

        name:
            "Swamp",

        char:
            ";",

        color:
            "#52745e",

        walkable:
            true,

        inspectable:
            true,

        description:
            "Wet, soft ground covered by water-loving vegetation."
    },


    tree: {

        name:
            "Tree",

        char:
            "♣",

        color:
            "#4fa34f",

        walkable:
            false,

        inspectable:
            true,

        description:
            "A mature deciduous tree.",

        action: {

            type:
                "harvest_terrain",

            label:
                "Chop tree",

            requiredToolType:
                "axe",

            requiredToolLabel:
                "Axe",

            minutes:
                12,

            outputItemId:
                "wood",

            minAmount:
                3,

            maxAmount:
                6,

            replacementByBiome: {

                temperate_forest:
                    "grassDark",

                grassland:
                    "grass",

                default:
                    "grass"
            }
        }
    },


    pine: {

        name:
            "Pine Tree",

        char:
            "♠",

        color:
            "#39744b",

        walkable:
            false,

        inspectable:
            true,

        description:
            "A tall evergreen pine tree.",

        action: {

            type:
                "harvest_terrain",

            label:
                "Chop pine tree",

            requiredToolType:
                "axe",

            requiredToolLabel:
                "Axe",

            minutes:
                14,

            outputItemId:
                "wood",

            minAmount:
                4,

            maxAmount:
                7,

            replacementByBiome: {

                taiga:
                    "tundra",

                cold_grassland:
                    "tundra",

                default:
                    "grass"
            }
        }
    },


    hill: {

        name:
            "Hill",

        char:
            "^",

        color:
            "#89866b",

        walkable:
            true,

        inspectable:
            true,

        description:
            "Raised rocky ground overlooking the surrounding terrain."
    },


    mountain: {

        name:
            "Mountain",

        char:
            "▲",

        color:
            "#b0ada0",

        walkable:
            false,

        inspectable:
            true,

        description:
            "Steep mountainous terrain that cannot currently be crossed."
    }
};


/* =========================================================
   RIVER DATA
========================================================= */

window.RIVER_STYLE_DATA = {

    1: {

        name:
            "Stream",

        char:
            "≈",

        color:
            "#4f94ad",

        inspectable:
            true,

        description:
            "A small flowing stream."
    },


    2: {

        name:
            "River",

        char:
            "≈",

        color:
            "#65a9c0",

        inspectable:
            true,

        description:
            "A flowing river carrying water through the landscape."
    },


    3: {

        name:
            "Major River",

        char:
            "≈",

        color:
            "#83c4d3",

        inspectable:
            true,

        description:
            "A large river carrying a considerable amount of water."
    }
};