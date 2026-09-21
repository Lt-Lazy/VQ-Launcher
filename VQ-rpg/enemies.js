// ============================================================
// VQ RPG
// ENEMY DATABASE
// ============================================================

window.ENEMY_TYPES = {

    spider: {

        id: "spider",

        name: "Spider",

        sprite: "assets/enemies/spider.png",

        maxHealth: 20,

        damage: 3,

        moveSpeed: 1,

        aggroRange: 5,

        chaseRadius: 8,

        hostile: true,

        hostile: true,

        blocksMovement: true,

        loot: [

            {
                itemId: "spider_web",

                chance: 1,

                minAmount: 1,
                maxAmount: 2
            }

        ],

        description:
            "A common hostile spider."

    }

};