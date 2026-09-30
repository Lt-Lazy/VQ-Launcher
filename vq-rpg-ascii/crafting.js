"use strict";

/* =========================================================
   CRAFTING RECIPES

   Kun recipe-data skal ligge her.
========================================================= */

window.CRAFTING_RECIPE_DATA = {


    stone_axe: {

        name:
            "Stone Axe",

        category:
            "Tools",

        ingredients: [

            {
                itemId:
                    "stick",

                amount:
                    3
            },

            {
                itemId:
                    "stone",

                amount:
                    2
            }
        ],

        output: {

            itemId:
                "stone_axe",

            amount:
                1
        },

        minutes:
            10
    },


    /* =========================================================
       CORDAGE
    ========================================================= */

    cordage: {

        name:
            "Cordage",

        category:
            "Materials",

        ingredients: [

            {
                itemId:
                    "plant_fiber",

                amount:
                    3
            }
        ],

        output: {

            itemId:
                "cordage",

            amount:
                1
        },

        minutes:
            5
    },


    /* =========================================================
       FIRE STARTER
    ========================================================= */

    fire_starter: {

        name:
            "Fire Starter",

        category:
            "Tools",

        ingredients: [

            {
                itemId:
                    "flint",

                amount:
                    1
            },

            {
                itemId:
                    "tinder",

                amount:
                    1
            },

            {
                itemId:
                    "stick",

                amount:
                    1
            }
        ],

        output: {

            itemId:
                "fire_starter",

            amount:
                1
        },

        minutes:
            5
    },


    /* =========================================================
       STONE KNIFE
    ========================================================= */

    stone_knife: {

        name:
            "Stone Knife",

        category:
            "Tools",

        ingredients: [

            {
                itemId:
                    "flint",

                amount:
                    1
            },

            {
                itemId:
                    "stick",

                amount:
                    1
            },

            {
                itemId:
                    "cordage",

                amount:
                    1
            }
        ],

        output: {

            itemId:
                "stone_knife",

            amount:
                1
        },

        minutes:
            8
    },


    /* =========================================================
       STONE SPEAR
    ========================================================= */

    stone_spear: {

        name:
            "Stone Spear",

        category:
            "Weapons",

        ingredients: [

            {
                itemId:
                    "stick",

                amount:
                    3
            },

            {
                itemId:
                    "flint",

                amount:
                    1
            },

            {
                itemId:
                    "cordage",

                amount:
                    1
            }
        ],

        output: {

            itemId:
                "stone_spear",

            amount:
                1
        },

        minutes:
            12
    },

    campfire_kit: {

        name:
            "Campfire Kit",

        category:
            "Survival",

        ingredients: [

            {
                itemId:
                    "wood",

                amount:
                    3
            },

            {
                itemId:
                    "stone",

                amount:
                    4
            },

            {
                itemId:
                    "tinder",

                amount:
                    2
            }
        ],

        output: {

            itemId:
                "campfire_kit",

            amount:
                1
        },

        minutes:
            10
    },


    roasted_mushroom: {

        name:
            "Roasted Mushroom",

        category:
            "Cooking",

        station:
            "campfire",

        actionVerb:
            "cook",

        ingredients: [

            {
                itemId:
                    "wild_mushroom",

                amount:
                    1
            }
        ],

        output: {

            itemId:
                "roasted_mushroom",

            amount:
                1
        },

        minutes:
            5
    },

    cooked_meat: {

        name:
            "Cooked Meat",

        category:
            "Cooking",

        station:
            "campfire",

        actionVerb:
            "cook",

        ingredients: [

            {
                itemId:
                    "raw_meat",

                amount:
                    1
            }
        ],

        output: {

            itemId:
                "cooked_meat",

            amount:
                1
        },

        minutes:
            8
    }

};