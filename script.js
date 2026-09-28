"use strict";


/* =========================================================
   VOIDQUEST WEBSITE DATA

   This is the main part you edit when
   adding games or development posts.
   ========================================================= */


/* =========================================================
   GAMES
   ========================================================= */

const games = [


    {

        id:
            "vq-rpg",

        title:
            "VQ RPG",

        status:
            "IN DEVELOPMENT",

        type:
            "Open World RPG",

        description:
            "An ASCII open world RPG focused on exploration, simulation, worldbuilding, settlements, factions, characters and player freedom.",

        path:
            "./vq-rpg-ascii/",

        featured:
            true,

        tags: [

            "ASCII",

            "RPG",

            "OPEN WORLD",

            "SIMULATION",

            "PROCEDURAL WORLD"

        ]

    },



    {

        id:
            "vq-settlement",

        title:
            "VQ Settlement",

        status:
            "IN DEVELOPMENT / ON HOLD",

        type:
            "Settlement Simulation",

        description:
            "A settlement and colony simulation project focused on families, jobs, food, resources and NPC behaviour.",

        path:
            "./vq-settlement/",

        featured:
            false,

        tags: [

            "SIMULATION",

            "SETTLEMENT",

            "NPC",

            "COLONY"

        ]

    }

];



/* =========================================================
   NEWS / DEVELOPMENT LOG

   Put newest posts first.
   ========================================================= */

const news = [

    {

        date:
            "29 SEP 2026",

        game:
            "VQ RPG",

        title:
            "Update Notes - crafting/vegetation",

        text:
            "Added crafting system, with starter items for testing, added more vegetation, grows based on biome and ground type, added cooking/campfire system. Remember if you are testing the game and have found out how to make a campfire, you need to interact with the campfire and light it, with firestarter, after that the cooking recipes will be added to the crafting tab. Only one type of cooking recipe is added, for testing. Can you make it ? :)  "
    },

    {

        date:
            "29 SEP 2026",

        game:
            "VQ RPG",

        title:
            "Update Notes - World generation",

        text:
            "Just some info about the world generation. The world is 100% procedural, seed based, the same seed will always generate the same geography, climate, rivers, streams, resources and settlements. Elevation is generated as different values, and the values determines where sea level, shallow and deep, coast, beach, lowland, hills and mountains will be. Climate is under progress, but we have climate based on latitude, this determines regiones with colder/warmer statuses, that helps with moisture levels in every biome/zones. Rainfall and runoff are calculated from moisture, elevation and temperature. Higher terrain creates additional rivers, that make streams that follows the path where elevation goes down. Vegetaion and natural resources are also connected the many of these factors, and natural resources are used by the npc's to determine where cities are built."
    },

    {

        date:
            "27 SEP 2026",

        game:
            "VQ RPG",

        title:
            "VQ RPG moves to ASCII graphics",

        text:
            "Development has moved toward ASCII graphics. This allows more development time to go into simulation, world systems, NPCs, factions and gameplay instead of spending most of the time creating graphical assets."

    },


    {

        date:
            "21 SEP 2026",

        game:
            "VQ RPG",

        title:
            "New RPG project started",

        text:
            "Work has started on a new open world RPG project. The goal is to build a game where the player can explore freely while settlements, people, families and factions continue to exist and change around them."

    },



    {

        date:
            "19 AUG 2026",

        game:
            "VQ Settlement",

        title:
            "Pre-alpha available",

        text:
            "The early settlement project became playable directly through the VoidQuest website."

    },



    {

        date:
            "17 AUG 2026",

        game:
            "VOIDQUEST",

        title:
            "VoidQuest website created",

        text:
            "The VoidQuest website was created as a permanent home for current games, old projects, development logs and playable builds."

    }

];



/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const pages =
    document.querySelectorAll(
        ".page"
    );


const navigationButtons =
    document.querySelectorAll(
        ".nav-button"
    );


const featuredGameContainer =
    document.getElementById(
        "featured-game"
    );


const gamesList =
    document.getElementById(
        "games-list"
    );


const homeNews =
    document.getElementById(
        "home-news"
    );


const newsList =
    document.getElementById(
        "news-list"
    );



/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function openPage(
    pageName
) {


    pages.forEach(

        page => {

            page.classList.remove(
                "active"
            );

        }

    );



    navigationButtons.forEach(

        button => {

            button.classList.remove(
                "active"
            );

        }

    );



    const page =
        document.getElementById(
            pageName
        );


    if (page) {

        page.classList.add(
            "active"
        );

    }



    const navigationButton =
        document.querySelector(

            `[data-page="${pageName}"]`

        );


    if (navigationButton) {

        navigationButton.classList.add(
            "active"
        );

    }



    localStorage.setItem(

        "voidquest-page",

        pageName

    );



    window.scrollTo({

        top:
            0,

        behavior:
            "instant"

    });

}



/* =========================================================
   NAV BUTTONS
   ========================================================= */

navigationButtons.forEach(

    button => {


        button.addEventListener(

            "click",

            () => {


                openPage(

                    button.dataset.page

                );

            }

        );

    }

);



/* =========================================================
   INTERNAL PAGE LINKS
   ========================================================= */

document.addEventListener(

    "click",

    event => {


        const button =
            event.target.closest(
                "[data-open-page]"
            );


        if (!button) {

            return;

        }


        openPage(

            button.dataset.openPage

        );

    }

);



/* =========================================================
   FEATURED GAME
   ========================================================= */

function renderFeaturedGame() {


    const game =
        games.find(

            game =>
                game.featured

        ) || games[0];



    if (!game) {

        return;

    }



    const tags =
        game.tags

            .map(

                tag =>
                    `[ ${tag} ]`

            )

            .join(
                " "
            );



    featuredGameContainer.innerHTML = `


        <h2>

            ${game.title}

        </h2>


        <div class="featured-status">

            ${game.status}

        </div>


        <p>

            ${game.description}

        </p>


        <div class="featured-tags">

            ${tags}

        </div>


        <p style="text-align:center; margin-top:14px;">

            <a
                href="${game.path}"
                class="game-play-link"
            >

                PLAY CURRENT BUILD

            </a>

        </p>

    `;

}



/* =========================================================
   GAMES LIST
   ========================================================= */

function renderGames() {


    gamesList.innerHTML =

        games

            .map(

                game => {


                    const tags =

                        game.tags

                            .map(

                                tag =>
                                    `[${tag}]`

                            )

                            .join(
                                " "
                            );



                    return `


                        <article class="game-entry">


                            <div class="game-entry-header">


                                <strong>

                                    ${game.title}

                                </strong>


                                <span class="game-entry-status">

                                    ${game.status}

                                </span>


                            </div>


                            <div class="game-entry-body">


                                <div class="game-tags">

                                    ${game.type}

                                    <br>

                                    ${tags}

                                </div>


                                <p>

                                    ${game.description}

                                </p>


                                <a
                                    href="${game.path}"
                                    class="game-play-link"
                                >

                                    &gt;&gt; PLAY GAME

                                </a>


                            </div>


                        </article>

                    `;

                }

            )

            .join(
                ""
            );

}



/* =========================================================
   CREATE NEWS ENTRY
   ========================================================= */

function createNewsEntry(
    item
) {


    return `


        <article class="news-entry">


            <div class="news-header">


                <span class="news-date">

                    ${item.date}

                </span>


                <span class="news-game">

                    ${item.game}

                </span>


            </div>


            <div class="news-body">


                <h3>

                    ${item.title}

                </h3>


                <p>

                    ${item.text}

                </p>


            </div>


        </article>

    `;

}



/* =========================================================
   NEWS
   ========================================================= */

function renderNews() {


    /*
        Home page only shows
        the newest three posts.
    */

    homeNews.innerHTML =

        news

            .slice(
                0,
                3
            )

            .map(
                createNewsEntry
            )

            .join(
                ""
            );



    /*
        Development page shows
        everything.
    */

    newsList.innerHTML =

        news

            .map(
                createNewsEntry
            )

            .join(
                ""
            );

}



/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {


    const clock =
        document.getElementById(
            "clock"
        );


    if (!clock) {

        return;

    }



    const now =
        new Date();



    const hours =
        String(
            now.getHours()
        )

        .padStart(
            2,
            "0"
        );



    const minutes =
        String(
            now.getMinutes()
        )

        .padStart(
            2,
            "0"
        );



    clock.textContent =
        `${hours}:${minutes}`;

}



updateClock();


setInterval(

    updateClock,

    1000

);



/* =========================================================
   START WEBSITE
   ========================================================= */

function startWebsite() {


    renderFeaturedGame();


    renderGames();


    renderNews();



    const savedPage =
        localStorage.getItem(
            "voidquest-page"
        );



    if (
        savedPage &&
        document.getElementById(
            savedPage
        )
    ) {


        openPage(
            savedPage
        );


    } else {


        openPage(
            "home"
        );

    }

}



startWebsite();