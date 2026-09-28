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
    }

};