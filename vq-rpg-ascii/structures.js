"use strict";

/* =========================================================
   WORLD STRUCTURES
========================================================= */

window.STRUCTURE_OBJECT_DATA = {

    campfire: {

        name:
            "Campfire",

        char:
            "¤",

        color:
            "#d8893d",

        description:
            "A small campfire built from stones and wood.",

        litDescription:
            "A small campfire burns steadily, giving off warmth and light.",

        blocksMovement:
            true,

        structureType:
            "campfire",

        initialState: {

            lit:
                false
        },

        light: {

            requiredItemId:
                "fire_starter",

            requiredItemLabel:
                "Fire Starter",

            minutes:
                2
        }
    },


    /* =========================================================
       SETTLEMENT HOUSE
    ========================================================= */

    family_house_wall: {

        name:
            "House Wall",

        char:
            "#",

        color:
            "#c9a06a",

        description:
            "A timber wall belonging to a family home.",

        blocksMovement:
            true,

        structureType:
            "family_house_wall",

        initialState: {}
    },


    family_house_door: {

        name:
            "House Door",

        char:
            "+",

        color:
            "#d7b879",

        description:
            "The entrance to a family home.",

        blocksMovement:
            false,

        structureType:
            "family_house_door",

        initialState: {}
    },


    /* =========================================================
    SETTLEMENT WORKPLACES
    ========================================================= */

    settlement_workplace_wall: {

        name:
            "Workplace Wall",

        char:
            "#",

        color:
            "#b89a67",

        description:
            "A timber wall belonging to a settlement workplace.",

        blocksMovement:
            true,

        structureType:
            "settlement_workplace_wall",

        initialState: {}
    },


    settlement_workplace_door: {

        name:
            "Workplace Door",

        char:
            "+",

        color:
            "#d3b16f",

        description:
            "The entrance to a settlement workplace.",

        blocksMovement:
            false,

        structureType:
            "settlement_workplace_door",

        initialState: {}
    },


    settlement_workplace_sign: {

        name:
            "Workplace Sign",

        char:
            "W",

        color:
            "#e1c36f",

        description:
            "A simple sign showing the purpose of this workplace.",

        blocksMovement:
            false,

        structureType:
            "settlement_workplace_sign",

        initialState: {}
    }

};