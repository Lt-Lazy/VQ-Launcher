"use strict";


/* =========================================================
   CANVAS
========================================================= */

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");


/* =========================================================
   WORLD SETTINGS
========================================================= */

const WORLD_WIDTH = 300;
const WORLD_HEIGHT = 300;

const WORLD_SEED = 1514162;

/* =========================================================
   WORLD GENERATION SETTINGS
========================================================= */

const SEA_LEVEL = 0.30;

const BEACH_LEVEL = 0.49;

const HILL_LEVEL = 0.70;

const MOUNTAIN_LEVEL = 0.80;

/* =========================================================
   SETTLEMENT GENERATION SETTINGS
========================================================= */

const MIN_STARTING_SETTLEMENTS = 7;
const MAX_STARTING_SETTLEMENTS = 12;

const SETTLEMENT_MIN_SPACING = 24;

const SETTLEMENT_SITE_RADIUS = 5;

const MIN_SETTLEMENT_SCORE = 0.45;

/* =========================================================
   DISCOVERY SETTINGS
========================================================= */

const DISCOVERY_RULES = {

    settlementDiscoveryRadius: 6,

    settlementInteractionRadius: 1
};

/* =========================================================
   HYDROLOGY SETTINGS
========================================================= */

/*
    Hvor mye accumulated water som må finnes
    før en stream blir synlig som river.

    Høyere tall = færre, større rivers.
*/

const RIVER_FLOW_THRESHOLD = 450;

const LARGE_RIVER_FLOW_THRESHOLD = 1200;

const MAJOR_RIVER_FLOW_THRESHOLD = 3000;

/*
    ASCII cell size.

    Disse bestemmer hvor mye plass hvert tegn får.
*/
const CELL_WIDTH = 14;
const CELL_HEIGHT = 18;


/* =========================================================
   TILE DEFINITIONS
========================================================= */

const TILES = {

    deepWater: {
        char: "~",
        color: "#28536b",
        walkable: false
    },

    shallowWater: {
        char: "~",
        color: "#3d7891",
        walkable: false
    },

    beach: {
        char: ".",
        color: "#c6b978",
        walkable: true
    },

    grass: {
        char: ".",
        color: "#78955e",
        walkable: true
    },

    grassDark: {
        char: ",",
        color: "#526e47",
        walkable: true
    },

    dryGrass: {
        char: "'",
        color: "#a59b58",
        walkable: true
    },

    desert: {
        char: ".",
        color: "#c7ad61",
        walkable: true
    },

    tundra: {
        char: ".",
        color: "#9aa79b",
        walkable: true
    },

    swamp: {
        char: ";",
        color: "#52745e",
        walkable: true
    },

    tree: {
        char: "♣",
        color: "#4fa34f",
        walkable: false
    },

    pine: {
        char: "♠",
        color: "#39744b",
        walkable: false
    },

    hill: {
        char: "^",
        color: "#89866b",
        walkable: true
    },

    mountain: {
        char: "▲",
        color: "#b0ada0",
        walkable: false
    }
};

/* =========================================================
   RIVER RENDERING
========================================================= */

/*
    Rivers er nå et overlay.

    Det betyr at en tile fortsatt kan vite at
    biomet under er grassland, tundra, swamp osv.
*/

const RIVER_STYLES = {

    1: {
        char: "≈",
        color: "#4f94ad"
    },

    2: {
        char: "≈",
        color: "#65a9c0"
    },

    3: {
        char: "≈",
        color: "#83c4d3"
    }

};


/* =========================================================
   WORLD DATA
========================================================= */

let world = [];


/* =========================================================
   CIVILIZATION DATA
========================================================= */

let worldHistory = [];

let settlements = [];

let factions = [];

let families = [];

let people = [];

/* =========================================================
   POPULATION RULES
========================================================= */

const POPULATION_RULES = {

    adulthoodAge:
        18,

    elderAge:
        60,


    startingAdultMinAge:
        18,

    startingAdultMaxAge:
        58,

    startingChildMinAge:
        0,

    startingChildMaxAge:
        17,


    /*
        Reproduction.
    */

    pregnancyMinAge:
        18,

    pregnancyMaxAge:
        42,

    pregnancyLengthDays:
        280,


    /*
        Base monthly conception chance.

        Dette er en gameplay-verdi,
        ikke ment som en historisk fasit.
    */

    monthlyConceptionChance:
        0.035
};

/* =========================================================
   WORLD HISTORY
========================================================= */

function resetWorldHistory() {

    worldHistory.length = 0;
}


/* =========================================================
   RECORD WORLD EVENT
========================================================= */

function recordWorldEvent(
    type,
    data = {},
    text = "",
    importance = "normal"
) {

    const event = {

        id:
            `event_${worldHistory.length + 1}`,

        type,

        date:
            copyWorldTime(),

        data:
            { ...data },

        text,

        importance
    };


    worldHistory.push(
        event
    );


    return event;
}

/* =========================================================
   PLAYER
========================================================= */

const player = {

    name: "Erik",

    x: Math.floor(WORLD_WIDTH / 2),
    y: Math.floor(WORLD_HEIGHT / 2),

    char: "@",
    color: "#ffffff",

    hp: 100,
    maxHp: 100,

    hunger: 100
};


/* =========================================================
   CREATURES
========================================================= */

let creatures = [];


/* =========================================================
   GAME STATE
========================================================= */

let turn = 0;


/* =========================================================
   WORLD TIME
========================================================= */

const WORLD_START_YEAR = 520;


/*
    Hele kalenderen ligger samlet her.

    Hvis vi senere vil lage vår egen kalender
    trenger resten av spillet ikke endres.
*/

const WORLD_CALENDAR = {

    months: [

        {
            name: "January",
            days: 31
        },

        {
            name: "February",
            days: 28
        },

        {
            name: "March",
            days: 31
        },

        {
            name: "April",
            days: 30
        },

        {
            name: "May",
            days: 31
        },

        {
            name: "June",
            days: 30
        },

        {
            name: "July",
            days: 31
        },

        {
            name: "August",
            days: 31
        },

        {
            name: "September",
            days: 30
        },

        {
            name: "October",
            days: 31
        },

        {
            name: "November",
            days: 30
        },

        {
            name: "December",
            days: 31
        }
    ]
};


const worldTime = {

    minute: 0,

    hour: 8,

    day: 1,

    month: 0,

    year:
        WORLD_START_YEAR,

    /*
        Nyttig senere for savegames,
        statistics og simulation.
    */

    totalMinutes: 0
};


/* =========================================================
   RESET WORLD TIME
========================================================= */

function resetWorldTime() {

    worldTime.minute =
        0;

    worldTime.hour =
        8;

    worldTime.day =
        1;

    worldTime.month =
        0;

    worldTime.year =
        WORLD_START_YEAR;

    worldTime.totalMinutes =
        0;
}

/* =========================================================
   CALENDAR HELPERS
========================================================= */

function isLeapYear(
    year
) {

    return (

        year % 4 === 0 &&

        (
            year % 100 !== 0 ||
            year % 400 === 0
        )
    );
}


function getDaysInMonth(
    year,
    monthIndex
) {

    const month =
        WORLD_CALENDAR.months[
            monthIndex
        ];


    if (!month) {

        return 30;
    }


    /*
        February.
    */

    if (
        monthIndex === 1 &&
        isLeapYear(year)
    ) {

        return 29;
    }


    return month.days;
}


function copyWorldTime() {

    return {

        minute:
            worldTime.minute,

        hour:
            worldTime.hour,

        day:
            worldTime.day,

        month:
            worldTime.month,

        year:
            worldTime.year,

        totalMinutes:
            worldTime.totalMinutes
    };
}

/* =========================================================
   PLAYER KNOWLEDGE
========================================================= */

/*
    Generic knowledge store.

    Vi hardkoder ikke settlements/factions/people
    inn i selve systemet.

    Senere kan vi legge til:
    creatures
    ruins
    religions
    books
    regions
    quests
    osv.
*/

const playerKnowledge =
    new Map();


function resetPlayerKnowledge() {

    playerKnowledge.clear();
}


function getKnowledgeCategory(
    category
) {

    if (
        !playerKnowledge.has(
            category
        )
    ) {

        playerKnowledge.set(
            category,
            new Set()
        );
    }


    return playerKnowledge.get(
        category
    );
}


function knowsEntity(
    category,
    id
) {

    if (!id) {
        return false;
    }


    return getKnowledgeCategory(
        category
    ).has(
        id
    );
}


function discoverEntity(
    category,
    id
) {

    if (!id) {
        return false;
    }


    const known =
        getKnowledgeCategory(
            category
        );


    if (
        known.has(id)
    ) {

        return false;
    }


    known.add(
        id
    );


    return true;
}

/* =========================================================
   SIMULATION SCHEDULER
========================================================= */

const SIMULATION_INTERVALS = [

    "minute",
    "hour",
    "day",
    "month",
    "year"
];


const simulationHooks =
    new Map();


for (
    const interval
    of SIMULATION_INTERVALS
) {

    simulationHooks.set(
        interval,
        new Set()
    );
}

/* =========================================================
   PLAYER POSITION EVENTS
========================================================= */

const playerPositionHooks =
    new Set();


function registerPlayerPositionHook(
    callback
) {

    if (
        typeof callback !==
        "function"
    ) {

        return () => {};
    }


    playerPositionHooks.add(
        callback
    );


    return () => {

        playerPositionHooks.delete(
            callback
        );
    };
}


function notifyPlayerPositionChanged(
    previousPosition,
    currentPosition
) {

    const context = {

        previousPosition,

        currentPosition
    };


    for (
        const callback
        of playerPositionHooks
    ) {

        try {

            callback(
                context
            );

        } catch (error) {

            console.error(
                "Player position hook failed:",
                error
            );
        }
    }
}

/* =========================================================
   SETTLEMENT DISCOVERY
========================================================= */

function getGridDistance(
    x1,
    y1,
    x2,
    y2
) {

    /*
        Chebyshev distance.

        Diagonal adjacency teller altså
        også som én tile.
    */

    return Math.max(

        Math.abs(
            x2 - x1
        ),

        Math.abs(
            y2 - y1
        )
    );
}


function updateSettlementDiscovery() {

    for (
        const settlement
        of settlements
    ) {

        const distance =
            getGridDistance(

                player.x,
                player.y,

                settlement.x,
                settlement.y
            );


        if (
            distance >
            DISCOVERY_RULES
                .settlementDiscoveryRadius
        ) {

            continue;
        }


        const newlyDiscovered =
            discoverEntity(

                "settlement",

                settlement.id
            );


        if (
            newlyDiscovered
        ) {

            addLog(
                `You discover ${settlement.name}.`
            );


            render();
        }
    }
}

registerPlayerPositionHook(
    updateSettlementDiscovery
);

/* =========================================================
   FIND NEARBY SETTLEMENT
========================================================= */

function getNearbySettlement(
    maxDistance =
        DISCOVERY_RULES
            .settlementInteractionRadius
) {

    let nearest =
        null;

    let nearestDistance =
        Infinity;


    for (
        const settlement
        of settlements
    ) {

        const distance =
            getGridDistance(

                player.x,
                player.y,

                settlement.x,
                settlement.y
            );


        if (
            distance >
            maxDistance
        ) {

            continue;
        }


        if (
            distance <
            nearestDistance
        ) {

            nearest =
                settlement;

            nearestDistance =
                distance;
        }
    }


    return nearest;
}

/* =========================================================
   SETTLEMENT WINDOW STATE
========================================================= */

let openSettlementId =
    null;

const settlementWindowState = {

    view:
        "overview",

    familyId:
        null,

    personId:
        null,

    history:
        []
};


function isSettlementWindowOpen() {

    return (
        openSettlementId !==
        null
    );
}

/* =========================================================
   SETTLEMENT INFORMATION
========================================================= */

function getLivingSettlementResidents(
    settlement
) {

    return people.filter(

        person =>

            person.alive &&

            person.settlementId ===
            settlement.id
    );
}


function getLivingSettlementFamilies(
    settlement
) {

    return settlement.familyIds

        .map(
            getFamilyById
        )

        .filter(
            family => {

                if (!family) {
                    return false;
                }


                return family.memberIds.some(
                    personId => {

                        const person =
                            getPersonById(
                                personId
                            );


                        return (
                            person &&
                            person.alive
                        );
                    }
                );
            }
        );
}


function getNotableResidents(
    settlement,
    limit = 8
) {

    const result =
        [];


    for (
        const familyId
        of settlement.familyIds
    ) {

        const family =
            getFamilyById(
                familyId
            );


        if (
            !family ||
            !family.headId
        ) {

            continue;
        }


        const person =
            getPersonById(
                family.headId
            );


        if (
            !person ||
            !person.alive
        ) {

            continue;
        }


        result.push(
            person
        );
    }


    result.sort(

        (a, b) =>

            getPersonAge(b) -
            getPersonAge(a)
    );


    return result.slice(
        0,
        limit
    );
}

function describeResourcePotential(
    value
) {

    if (
        value >= 0.80
    ) {

        return "Excellent";
    }


    if (
        value >= 0.60
    ) {

        return "High";
    }


    if (
        value >= 0.40
    ) {

        return "Moderate";
    }


    if (
        value >= 0.20
    ) {

        return "Low";
    }


    return "Very low";
}


function formatWorldLabel(
    value
) {

    return String(value)

        .replaceAll(
            "_",
            " "
        )

        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );
}


function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            "\"",
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}

/* =========================================================
   OPEN SETTLEMENT
========================================================= */

function openSettlementWindow(
    settlement
) {

    if (!settlement) {

        return;
    }


    discoverEntity(
        "settlement",
        settlement.id
    );


    /*
        Når spilleren faktisk besøker stedet,
        lærer han hvilken faction som styrer det.
    */

    if (
        settlement.factionId
    ) {

        discoverEntity(

            "faction",

            settlement.factionId
        );
    }


    /*
        Første notable residents blir nå
        personer spilleren kjenner til.
    */

    const notableResidents =
        getNotableResidents(
            settlement
        );


    for (
        const person
        of notableResidents
    ) {

        discoverEntity(
            "person",
            person.id
        );
    }


    openSettlementId =
        settlement.id;


    settlementWindowState.view =
        "overview";

    settlementWindowState.familyId =
        null;

    settlementWindowState.personId =
        null;

    settlementWindowState.history =
        [];


    renderSettlementWindow();


    const windowElement =
        document.getElementById(
            "settlement-window"
        );


    windowElement.classList.remove(
        "hidden"
    );


    windowElement.setAttribute(
        "aria-hidden",
        "false"
    );

    resetDialogueState();

}

function renderSettlementOverview() {

    const settlement =
        getSettlementById(
            openSettlementId
        );


    if (!settlement) {

        closeSettlementWindow();

        return;
    }


    const faction =
        getFactionById(
            settlement.factionId
        );


    const residents =
        getLivingSettlementResidents(
            settlement
        );


    const livingFamilies =
        getLivingSettlementFamilies(
            settlement
        );


    const notableResidents =
        getNotableResidents(
            settlement
        );


    const isCapital =

        faction &&

        faction.capitalSettlementId ===
        settlement.id;


    document.getElementById(
        "settlement-window-title"
    ).textContent =

        settlement.name.toUpperCase();


    const residentHTML =

        notableResidents.length > 0

            ? notableResidents
                .map(
                    person => {

                        const family =
                            getFamilyById(
                                person.familyId
                            );


                        const role =

                            family &&
                            family.headId ===
                                person.id

                                ? "Household head"

                                : "Resident";


                        return `
                            <button
                                type="button"
                                class="settlement-list-button"
                                data-settlement-action="person"
                                data-person-id="${escapeHTML(person.id)}"
                            >
                                <span>
                                    ${escapeHTML(person.name)}
                                </span>

                                <span class="settlement-list-detail">
                                    age ${getPersonAge(person)}
                                    — ${role}
                                </span>
                            </button>
                        `;
                    }
                )
                .join("")

            : `
                <div>
                    No known residents.
                </div>
            `;


    const content =
        document.getElementById(
            "settlement-window-content"
        );


    content.innerHTML = `

        <div class="settlement-row">
            <span>Faction</span>
            <span>
                ${
                    faction
                        ? escapeHTML(
                            faction.name
                        )
                        : "Independent"
                }
            </span>
        </div>

        ${
            isCapital
                ? `
                    <div class="settlement-row">
                        <span>Status</span>
                        <span>Faction capital</span>
                    </div>
                `
                : ""
        }

        <div class="settlement-row">
            <span>Population</span>
            <span>${residents.length}</span>
        </div>

        <div class="settlement-row">
            <span>Families</span>
            <span>${livingFamilies.length}</span>
        </div>

        <div class="settlement-row">
            <span>Region</span>
            <span>
                ${escapeHTML(
                    formatWorldLabel(
                        settlement.biome
                    )
                )}
            </span>
        </div>

        <div class="settlement-row">
            <span>Founded</span>
            <span>${settlement.foundedYear}</span>
        </div>

        <div class="settlement-row">
            <span>Location</span>
            <span>
                ${settlement.x}, ${settlement.y}
            </span>
        </div>


        <div class="settlement-section">

            <div class="settlement-section-title">
                LOCAL POTENTIAL
            </div>

            <div class="settlement-row">
                <span>Fertility</span>
                <span>
                    ${describeResourcePotential(
                        settlement.resources.fertility
                    )}
                </span>
            </div>

            <div class="settlement-row">
                <span>Fresh water</span>
                <span>
                    ${describeResourcePotential(
                        settlement.resources.freshWater
                    )}
                </span>
            </div>

            <div class="settlement-row">
                <span>Timber</span>
                <span>
                    ${describeResourcePotential(
                        settlement.resources.timber
                    )}
                </span>
            </div>

            <div class="settlement-row">
                <span>Stone</span>
                <span>
                    ${describeResourcePotential(
                        settlement.resources.stone
                    )}
                </span>
            </div>

            <div class="settlement-row">
                <span>Iron</span>
                <span>
                    ${describeResourcePotential(
                        settlement.resources.iron
                    )}
                </span>
            </div>

        </div>


        <div class="settlement-section">

            <div class="settlement-section-title">
                NOTABLE RESIDENTS
            </div>

            ${residentHTML}

        </div>

        <div class="settlement-section">

            <button
                type="button"
                class="settlement-action-button"
                data-settlement-action="people"
            >
                People (${residents.length})
            </button>

        </div>

    `;
}

/* =========================================================
   SETTLEMENT WINDOW RENDERER
========================================================= */

function renderSettlementWindow() {

    switch (
        settlementWindowState.view
    ) {

        case "families":

            renderSettlementFamilies();

            break;


        case "family":

            renderSettlementFamily();

            break;


        case "person":

            renderSettlementPerson();

            break;


        case "talk":

            renderNpcDialogue();

            break;


        case "overview":
        default:

            renderSettlementOverview();

            break;
    }
}

/* =========================================================
   FAMILY INFORMATION
========================================================= */

function getLivingFamilyMembers(
    family
) {

    if (!family) {

        return [];
    }


    return family.memberIds

        .map(
            getPersonById
        )

        .filter(

            person =>

                person &&
                person.alive
        );
}


function getFamilyHead(
    family
) {

    if (
        !family ||
        !family.headId
    ) {

        return null;
    }


    const head =
        getPersonById(
            family.headId
        );


    return (
        head &&
        head.alive

            ? head

            : null
    );
}

/* =========================================================
   SETTLEMENT FAMILIES VIEW
========================================================= */

function renderSettlementFamilies() {

    const settlement =
        getSettlementById(
            openSettlementId
        );


    if (!settlement) {

        closeSettlementWindow();

        return;
    }


    const families =
        getLivingSettlementFamilies(
            settlement
        );


    families.sort(

        (a, b) =>

            a.surname.localeCompare(
                b.surname
            )
    );


    document.getElementById(
        "settlement-window-title"
    ).textContent =

        `${settlement.name.toUpperCase()} — PEOPLE`;


    const familyHTML =

        families.length > 0

            ? families
                .map(
                    family => {

                        const members =
                            getLivingFamilyMembers(
                                family
                            );


                        const head =
                            getFamilyHead(
                                family
                            );


                        return `
                            <button
                                type="button"
                                class="settlement-list-button"
                                data-settlement-action="family"
                                data-family-id="${escapeHTML(family.id)}"
                            >

                                <span>
                                    ${escapeHTML(family.surname)} family
                                </span>

                                <span class="settlement-list-detail">
                                    ${members.length} living
                                    ${
                                        head
                                            ? `— Head: ${escapeHTML(head.firstName)}`
                                            : ""
                                    }
                                </span>

                            </button>
                        `;
                    }
                )
                .join("")

            : `
                <div>
                    No living households.
                </div>
            `;


    const content =
        document.getElementById(
            "settlement-window-content"
        );


    content.innerHTML = `

        <button
            type="button"
            class="settlement-back-button"
            data-settlement-action="back"
        >
            &lt; Back
        </button>


        <div class="settlement-section">

            <div class="settlement-section-title">
                HOUSEHOLDS
            </div>

            ${familyHTML}

        </div>
    `;
}

/* =========================================================
   FAMILY VIEW
========================================================= */

function renderSettlementFamily() {

    const family =
        getFamilyById(
            settlementWindowState.familyId
        );


    const settlement =
        getSettlementById(
            openSettlementId
        );


    if (
        !family ||
        !settlement
    ) {

        goBackSettlementWindow();

        return;
    }


    discoverEntity(
        "family",
        family.id
    );


    const members =
        getLivingFamilyMembers(
            family
        );


    members.sort(

        (a, b) =>

            getPersonAge(b) -
            getPersonAge(a)
    );


    const head =
        getFamilyHead(
            family
        );


    document.getElementById(
        "settlement-window-title"
    ).textContent =

        `${family.surname.toUpperCase()} FAMILY`;


    const membersHTML =

        members.map(
            person => {

                const isHead =

                    family.headId ===
                    person.id;


                return `
                    <button
                        type="button"
                        class="settlement-list-button"
                        data-settlement-action="person"
                        data-person-id="${escapeHTML(person.id)}"
                    >

                        <span>
                            ${escapeHTML(person.name)}
                        </span>

                        <span class="settlement-list-detail">
                            age ${getPersonAge(person)}
                            — ${formatWorldLabel(
                                getPersonLifeStage(person)
                            )}
                            ${
                                isHead
                                    ? " — Household head"
                                    : ""
                            }
                        </span>

                    </button>
                `;
            }
        )
        .join("");


    const content =
        document.getElementById(
            "settlement-window-content"
        );


    content.innerHTML = `

        <button
            type="button"
            class="settlement-back-button"
            data-settlement-action="back"
        >
            &lt; Back
        </button>


        <div class="settlement-row">
            <span>Household</span>
            <span>
                ${escapeHTML(family.surname)}
            </span>
        </div>

        <div class="settlement-row">
            <span>Settlement</span>
            <span>
                ${escapeHTML(settlement.name)}
            </span>
        </div>

        <div class="settlement-row">
            <span>Living members</span>
            <span>
                ${members.length}
            </span>
        </div>

        <div class="settlement-row">
            <span>Household head</span>
            <span>
                ${
                    head
                        ? escapeHTML(head.name)
                        : "None"
                }
            </span>
        </div>


        <div class="settlement-section">

            <div class="settlement-section-title">
                FAMILY MEMBERS
            </div>

            ${membersHTML}

        </div>
    `;
}

/* =========================================================
   PERSON DISPLAY HELPERS
========================================================= */

function formatBirthDate(
    birthDate
) {

    if (!birthDate) {

        return "Unknown";
    }


    const month =
        WORLD_CALENDAR.months[
            birthDate.month
        ];


    return (
        `${birthDate.day} ` +
        `${month.name} ` +
        `${birthDate.year}`
    );
}


function getPersonReferenceName(
    personId
) {

    const person =
        getPersonById(
            personId
        );


    if (!person) {

        return "Unknown";
    }


    return (
        person.alive

            ? person.name

            : `${person.name} (deceased)`
    );
}


function buildPersonRelationButtons(
    personIds
) {

    if (
        !personIds ||
        personIds.length === 0
    ) {

        return `
            <span>None</span>
        `;
    }


    return personIds

        .map(
            personId => {

                const person =
                    getPersonById(
                        personId
                    );


                if (!person) {

                    return "";
                }


                return `
                    <button
                        type="button"
                        class="person-relation-button"
                        data-settlement-action="person"
                        data-person-id="${escapeHTML(person.id)}"
                    >
                        ${escapeHTML(
                            getPersonReferenceName(
                                person.id
                            )
                        )}
                    </button>
                `;
            }
        )

        .join("");
}

/* =========================================================
   PERSON VIEW
========================================================= */

function renderSettlementPerson() {

    const person =
        getPersonById(
            settlementWindowState.personId
        );


    if (!person) {

        goBackSettlementWindow();

        return;
    }


    discoverEntity(
        "person",
        person.id
    );


    if (
        person.familyId
    ) {

        discoverEntity(
            "family",
            person.familyId
        );
    }


    const family =
        getFamilyById(
            person.familyId
        );


    const settlement =
        getSettlementById(
            person.settlementId
        );


    const faction =
        getFactionById(
            person.factionId
        );


    const spouse =
        person.spouseId

            ? getPersonById(
                person.spouseId
            )

            : null;


    const isHouseholdHead =

        family &&
        family.headId ===
            person.id;


    document.getElementById(
        "settlement-window-title"
    ).textContent =

        person.name.toUpperCase();

    const interactionHTML =
        buildNpcInteractionButtons(
            person
        );

    const content =
        document.getElementById(
            "settlement-window-content"
        );


    content.innerHTML = `

        <button
            type="button"
            class="settlement-back-button"
            data-settlement-action="back"
        >
            &lt; Back
        </button>


        <div class="settlement-row">
            <span>Age</span>
            <span>${getPersonAge(person)}</span>
        </div>

        <div class="settlement-row">
            <span>Sex</span>
            <span>
                ${formatWorldLabel(person.sex)}
            </span>
        </div>

        <div class="settlement-row">
            <span>Life stage</span>
            <span>
                ${formatWorldLabel(
                    getPersonLifeStage(person)
                )}
            </span>
        </div>

        <div class="settlement-row">
            <span>Status</span>
            <span>
                ${
                    person.alive
                        ? "Alive"
                        : "Deceased"
                }
            </span>
        </div>

        <div class="settlement-row">
            <span>Born</span>
            <span>
                ${escapeHTML(
                    formatBirthDate(
                        person.birthDate
                    )
                )}
            </span>
        </div>


        <div class="settlement-section">

            <div class="settlement-section-title">
                HOME
            </div>

            <div class="settlement-row">
                <span>Settlement</span>
                <span>
                    ${
                        settlement
                            ? escapeHTML(
                                settlement.name
                            )
                            : "None"
                    }
                </span>
            </div>

            <div class="settlement-row">
                <span>Faction</span>
                <span>
                    ${
                        faction
                            ? escapeHTML(
                                faction.name
                            )
                            : "Independent"
                    }
                </span>
            </div>

            <div class="settlement-row">
                <span>Family</span>
                <span>
                    ${
                        family
                            ? `${escapeHTML(family.surname)} family`
                            : "None"
                    }
                </span>
            </div>

            <div class="settlement-row">
                <span>Household role</span>
                <span>
                    ${
                        isHouseholdHead
                            ? "Household head"
                            : "Member"
                    }
                </span>
            </div>

            <div class="settlement-row">
                <span>Profession</span>
                <span>
                    ${
                        person.profession
                            ? escapeHTML(
                                formatWorldLabel(
                                    person.profession
                                )
                            )
                            : "None"
                    }
                </span>
            </div>

        </div>

        <div class="settlement-section">

            <div class="settlement-section-title">
                ACTIONS
            </div>

            ${interactionHTML}

        </div>

        <div class="settlement-section">

            <div class="settlement-section-title">
                RELATIONSHIPS
            </div>

            <div class="settlement-row settlement-row-stack">
                <span>Spouse</span>

                <div>
                    ${
                        spouse
                            ? buildPersonRelationButtons(
                                [spouse.id]
                            )
                            : "None"
                    }
                </div>
            </div>

            <div class="settlement-row settlement-row-stack">
                <span>Parents</span>

                <div>
                    ${buildPersonRelationButtons(
                        person.parentIds
                    )}
                </div>
            </div>

            <div class="settlement-row settlement-row-stack">
                <span>Children</span>

                <div>
                    ${buildPersonRelationButtons(
                        person.childIds
                    )}
                </div>
            </div>

        </div>
    `;
}

function closeSettlementWindow() {

    openSettlementId =
        null;

    settlementWindowState.view =
        "overview";

    settlementWindowState.familyId =
        null;

    settlementWindowState.personId =
        null;

    settlementWindowState.history =
        [];


    const windowElement =
        document.getElementById(
            "settlement-window"
        );


    if (!windowElement) {

        return;
    }


    windowElement.classList.add(
        "hidden"
    );


    windowElement.setAttribute(
        "aria-hidden",
        "true"
    );

    resetDialogueState();

}

function getNpcGreeting(
    person
) {

    const lifeStage =
        getPersonLifeStage(
            person
        );


    if (
        lifeStage === "child"
    ) {

        return "Hello.";
    }


    if (
        lifeStage === "elder"
    ) {

        return "Good day to you.";
    }


    return "Greetings.";
}


function beginDialogueWithPerson(
    person
) {

    dialogueState.personId =
        person.id;


    dialogueState.lines =
        [
            {
                speaker:
                    person.name,

                text:
                    getNpcGreeting(
                        person
                    )
            }
        ];


    discoverEntity(
        "person",
        person.id
    );


    addLog(
        `You speak with ${person.name}.`
    );


    navigateSettlementWindow(

        "talk",

        {
            personId:
                person.id
        }
    );
}

/* =========================================================
   DIALOGUE TOPICS
========================================================= */

const dialogueTopicDefinitions =
    new Map();


function registerDialogueTopic(
    topicId,
    definition = {}
) {

    dialogueTopicDefinitions.set(

        topicId,

        {
            id:
                topicId,

            label:
                definition.label ??
                topicId,

            minutes:
                Math.max(
                    0,
                    Number(
                        definition.minutes ?? 1
                    )
                ),

            isAvailable:

                typeof definition.isAvailable ===
                "function"

                    ? definition.isAvailable

                    : () => true,

            respond:

                typeof definition.respond ===
                "function"

                    ? definition.respond

                    : () => "..."
        }
    );
}

function performDialogueTopic(
    topicId
) {

    const definition =
        dialogueTopicDefinitions.get(
            topicId
        );


    const person =
        getPersonById(
            dialogueState.personId
        );


    if (
        !definition ||
        !person ||
        !person.alive
    ) {

        return;
    }


    const context =
        getNpcInteractionContext(
            person
        );


    if (
        !definition.isAvailable(
            person,
            context
        )
    ) {

        return;
    }


    dialogueState.lines.push({

        speaker:
            "You",

        text:
            definition.label
    });


    finishTurn(

        "dialogue",

        definition.minutes
    );


    const response =
        definition.respond(
            person,
            context
        );


    dialogueState.lines.push({

        speaker:
            person.name,

        text:
            response
    });


    renderSettlementWindow();
}

registerDialogueTopic(

    "settlement",

    {
        label:
            "Ask about this place",

        minutes:
            1,


        respond:
            (
                person,
                context
            ) => {

                const settlement =
                    context.settlement;


                const faction =
                    context.faction;


                if (!settlement) {

                    return "I have no home to speak of.";
                }


                if (faction) {

                    return (
                        `This is ${settlement.name}. ` +
                        `We are part of the ${faction.name}.`
                    );
                }


                return (
                    `This is ${settlement.name}.`
                );
            }
    }
);

registerDialogueTopic(

    "family",

    {
        label:
            "Ask about family",

        minutes:
            1,


        respond:
            (
                person,
                context
            ) => {

                const family =
                    context.family;


                if (!family) {

                    return "I have no household here.";
                }


                const spouse =
                    person.spouseId

                        ? getPersonById(
                            person.spouseId
                        )

                        : null;


                /*
                    Spilleren lærer nå faktisk
                    om familiemedlemmer personen
                    forteller om.
                */

                if (spouse) {

                    discoverEntity(
                        "person",
                        spouse.id
                    );
                }


                for (
                    const childId
                    of person.childIds
                ) {

                    discoverEntity(
                        "person",
                        childId
                    );
                }


                let response =
                    `I belong to the ${family.surname} family.`;


                if (
                    spouse &&
                    spouse.alive
                ) {

                    response +=
                        ` My spouse is ${spouse.name}.`;
                }


                if (
                    person.childIds.length > 0
                ) {

                    response +=
                        ` I have ${person.childIds.length} children.`;
                }


                return response;
            }
    }
);

registerDialogueTopic(

    "work",

    {
        label:
            "Ask about work",

        minutes:
            1,


        respond:
            person => {

                if (
                    !person.profession
                ) {

                    return (
                        "I have no particular trade at the moment."
                    );
                }


                return (
                    `I work as a ${formatWorldLabel(
                        person.profession
                    ).toLowerCase()}.`
                );
            }
    }
);

function getAvailableDialogueTopics(
    person
) {

    const context =
        getNpcInteractionContext(
            person
        );


    return Array.from(
        dialogueTopicDefinitions.values()
    ).filter(
        definition => {

            try {

                return definition.isAvailable(
                    person,
                    context
                );

            } catch (error) {

                console.error(
                    `Dialogue topic failed: ${definition.id}`,
                    error
                );

                return false;
            }
        }
    );
}


function renderNpcDialogue() {

    const person =
        getPersonById(
            settlementWindowState.personId
        );


    if (!person) {

        goBackSettlementWindow();

        return;
    }


    document.getElementById(
        "settlement-window-title"
    ).textContent =

        `${person.name.toUpperCase()} — TALK`;


    const linesHTML =

        dialogueState.lines

            .map(
                line => `

                    <div class="dialogue-line">

                        <div class="dialogue-speaker">
                            ${escapeHTML(line.speaker)}
                        </div>

                        <div class="dialogue-text">
                            ${escapeHTML(line.text)}
                        </div>

                    </div>
                `
            )

            .join("");


    const topicHTML =

        getAvailableDialogueTopics(
            person
        )

        .map(
            topic => `

                <button
                    type="button"
                    class="dialogue-topic-button"
                    data-settlement-action="dialogue-topic"
                    data-topic-id="${escapeHTML(topic.id)}"
                >
                    ${escapeHTML(topic.label)}
                </button>
            `
        )

        .join("");


    document.getElementById(
        "settlement-window-content"
    ).innerHTML = `

        <button
            type="button"
            class="settlement-back-button"
            data-settlement-action="back"
        >
            &lt; End conversation
        </button>


        <div class="dialogue-history">
            ${linesHTML}
        </div>


        <div class="settlement-section">

            <div class="settlement-section-title">
                SAY / ASK
            </div>

            ${topicHTML}

        </div>
    `;
}

/* =========================================================
   SETTLEMENT WINDOW NAVIGATION
========================================================= */

function navigateSettlementWindow(
    view,
    data = {}
) {

    /*
        Husk hvor vi kom fra.

        Dermed fungerer Back riktig uansett
        hvilken vei spilleren kom til neste view.
    */

    settlementWindowState.history.push({

        view:
            settlementWindowState.view,

        familyId:
            settlementWindowState.familyId,

        personId:
            settlementWindowState.personId
    });


    settlementWindowState.view =
        view;


    settlementWindowState.familyId =
        data.familyId ?? null;


    settlementWindowState.personId =
        data.personId ?? null;


    renderSettlementWindow();
}


function goBackSettlementWindow() {

    const previous =
        settlementWindowState.history.pop();


    if (!previous) {

        closeSettlementWindow();

        return;
    }


    settlementWindowState.view =
        previous.view;

    settlementWindowState.familyId =
        previous.familyId;

    settlementWindowState.personId =
        previous.personId;


    renderSettlementWindow();
}

/* =========================================================
   WORLD INTERACTION
========================================================= */

function interactWithWorld() {

    const settlement =
        getNearbySettlement();


    if (!settlement) {

        addLog(
            "There is nothing nearby to inspect."
        );

        return;
    }


    openSettlementWindow(
        settlement
    );
}

/* =========================================================
   REGISTER SIMULATION SYSTEM
========================================================= */

function registerSimulationHook(
    interval,
    callback
) {

    const hooks =
        simulationHooks.get(
            interval
        );


    if (!hooks) {

        console.error(
            `Unknown simulation interval: ${interval}`
        );

        return () => {};
    }


    if (
        typeof callback !==
        "function"
    ) {

        console.error(
            "Simulation callback must be a function."
        );

        return () => {};
    }


    hooks.add(
        callback
    );


    /*
        Returnerer en unregister-funksjon.

        Nyttig hvis systemer senere kan
        slås av/på dynamisk.
    */

    return () => {

        hooks.delete(
            callback
        );
    };
}


/* =========================================================
   RUN SIMULATION HOOKS
========================================================= */

function runSimulationHooks(
    interval,
    previousTime
) {

    const hooks =
        simulationHooks.get(
            interval
        );


    if (!hooks) {

        return;
    }


    const context = {

        interval,

        previousTime,

        currentTime:
            copyWorldTime()
    };


    for (
        const callback
        of hooks
    ) {

        try {

            callback(
                context
            );

        } catch (error) {

            console.error(
                `Simulation error in ${interval} hook:`,
                error
            );
        }
    }
}

/* =========================================================
   ADVANCE WORLD TIME
========================================================= */

function advanceWorldTime(
    minutes
) {

    if (
        !Number.isFinite(
            minutes
        )
    ) {

        return;
    }


    minutes =
        Math.floor(
            minutes
        );


    if (
        minutes <= 0
    ) {

        return;
    }


    for (
        let i = 0;
        i < minutes;
        i++
    ) {

        const previousTime =
            copyWorldTime();


        let newHour =
            false;

        let newDay =
            false;

        let newMonth =
            false;

        let newYear =
            false;


        /* =========================================
           MINUTE
        ========================================= */

        worldTime.minute++;

        worldTime.totalMinutes++;


        /* =========================================
           HOUR
        ========================================= */

        if (
            worldTime.minute >=
            60
        ) {

            worldTime.minute =
                0;

            worldTime.hour++;

            newHour =
                true;
        }


        /* =========================================
           DAY
        ========================================= */

        if (
            worldTime.hour >=
            24
        ) {

            worldTime.hour =
                0;

            worldTime.day++;

            newDay =
                true;
        }


        /* =========================================
           MONTH
        ========================================= */

        const daysInMonth =
            getDaysInMonth(

                worldTime.year,

                worldTime.month
            );


        if (
            worldTime.day >
            daysInMonth
        ) {

            worldTime.day =
                1;

            worldTime.month++;

            newMonth =
                true;
        }


        /* =========================================
           YEAR
        ========================================= */

        if (
            worldTime.month >=
            WORLD_CALENDAR.months.length
        ) {

            worldTime.month =
                0;

            worldTime.year++;

            newYear =
                true;
        }


        /*
            Minute hooks kjører alltid.
        */

        runSimulationHooks(
            "minute",
            previousTime
        );


        if (
            newHour
        ) {

            runSimulationHooks(
                "hour",
                previousTime
            );
        }


        if (
            newDay
        ) {

            runSimulationHooks(
                "day",
                previousTime
            );
        }


        if (
            newMonth
        ) {

            runSimulationHooks(
                "month",
                previousTime
            );
        }


        if (
            newYear
        ) {

            runSimulationHooks(
                "year",
                previousTime
            );
        }
    }
}

/* =========================================================
   PLAYER ACTION TIME
========================================================= */

const playerActionDefinitions =
    new Map();


function registerPlayerAction(
    actionId,
    definition = {}
) {

    playerActionDefinitions.set(

        actionId,

        {
            minutes:
                definition.minutes ?? 1
        }
    );
}


function getPlayerActionMinutes(
    actionId
) {

    const definition =
        playerActionDefinitions.get(
            actionId
        );


    if (!definition) {

        /*
            Ukjent handling bruker 1 minutt
            som sikker fallback.
        */

        return 1;
    }


    return Math.max(

        0,

        Number(
            definition.minutes
        ) || 0
    );
}

registerPlayerAction(
    "move",
    {
        minutes: 1
    }
);


registerPlayerAction(
    "wait",
    {
        minutes: 1
    }
);

/* =========================================================
   NPC INTERACTION REGISTRY
========================================================= */

const npcInteractionDefinitions =
    new Map();


function registerNpcInteraction(
    interactionId,
    definition = {}
) {

    const normalized = {

        id:
            interactionId,

        label:
            definition.label ??
            interactionId,

        minutes:
            Math.max(
                0,
                Number(
                    definition.minutes ?? 1
                )
            ),

        isAvailable:

            typeof definition.isAvailable ===
            "function"

                ? definition.isAvailable

                : () => true,

        execute:

            typeof definition.execute ===
            "function"

                ? definition.execute

                : () => {}
    };


    npcInteractionDefinitions.set(
        interactionId,
        normalized
    );


    /*
        NPC interaction registrerer automatisk
        hvor lang tid handlingen tar.
    */

    registerPlayerAction(

        `npc:${interactionId}`,

        {
            minutes:
                normalized.minutes
        }
    );
}



/* =========================================================
   NPC INTERACTION CONTEXT
========================================================= */

function getNpcInteractionContext(
    person
) {

    return {

        person,

        family:
            getFamilyById(
                person.familyId
            ),

        settlement:
            getSettlementById(
                person.settlementId
            ),

        faction:
            getFactionById(
                person.factionId
            ),

        player,

        worldTime
    };
}

function canPlayerInteractWithPerson(
    person
) {

    if (
        !person ||
        !person.alive
    ) {

        return false;
    }


    const settlement =
        getSettlementById(
            person.settlementId
        );


    if (!settlement) {

        return false;
    }


    /*
        Personen må være i settlementet
        spilleren faktisk besøker.
    */

    if (
        settlement.id !==
        openSettlementId
    ) {

        return false;
    }


    const distance =
        getGridDistance(

            player.x,
            player.y,

            settlement.x,
            settlement.y
        );


    return (
        distance <=
        DISCOVERY_RULES
            .settlementInteractionRadius
    );
}

function getAvailableNpcInteractions(
    person
) {

    const context =
        getNpcInteractionContext(
            person
        );


    const available =
        [];


    for (
        const definition
        of npcInteractionDefinitions.values()
    ) {

        try {

            if (
                definition.isAvailable(
                    person,
                    context
                )
            ) {

                available.push(
                    definition
                );
            }

        } catch (error) {

            console.error(
                `NPC interaction availability failed: ${definition.id}`,
                error
            );
        }
    }


    return available;
}

function buildNpcInteractionButtons(
    person
) {

    const interactions =
        getAvailableNpcInteractions(
            person
        );


    if (
        interactions.length === 0
    ) {

        return `
            <div class="settlement-list-detail">
                No available interactions.
            </div>
        `;
    }


    return interactions

        .map(
            interaction => `

                <button
                    type="button"
                    class="npc-action-button"
                    data-settlement-action="npc-interaction"
                    data-interaction-id="${escapeHTML(interaction.id)}"
                    data-person-id="${escapeHTML(person.id)}"
                >
                    ${escapeHTML(interaction.label)}
                </button>
            `
        )

        .join("");
}

function performNpcInteraction(
    interactionId,
    personId
) {

    const definition =
        npcInteractionDefinitions.get(
            interactionId
        );


    const person =
        getPersonById(
            personId
        );


    if (
        !definition ||
        !person
    ) {

        return;
    }


    let context =
        getNpcInteractionContext(
            person
        );


    if (
        !definition.isAvailable(
            person,
            context
        )
    ) {

        return;
    }


    /*
        Tiden går først.

        Hvis world simulation senere endrer
        situasjonen i dette minuttet, leser vi
        personen på nytt etter handlingen.
    */

    finishTurn(
        `npc:${interactionId}`
    );


    const updatedPerson =
        getPersonById(
            personId
        );


    if (
        !updatedPerson ||
        !updatedPerson.alive
    ) {

        renderSettlementWindow();

        return;
    }


    context =
        getNpcInteractionContext(
            updatedPerson
        );


    definition.execute(
        updatedPerson,
        context
    );
}

/* =========================================================
   DIALOGUE STATE
========================================================= */

const dialogueState = {

    personId:
        null,

    lines:
        []
};


function resetDialogueState() {

    dialogueState.personId =
        null;

    dialogueState.lines =
        [];
}

registerNpcInteraction(

    "talk",

    {
        label:
            "Talk",

        minutes:
            1,


        isAvailable:
            person =>

                canPlayerInteractWithPerson(
                    person
                ),


        execute:
            person => {

                beginDialogueWithPerson(
                    person
                );
            }
    }
);

/* =========================================================
   SEEDED RANDOM
========================================================= */

/*
    Enkel seeded random generator.

    Det viktige akkurat nå er at samme WORLD_SEED
    lager samme verden hver gang.
*/

function createRandom(seed) {

    let state = seed >>> 0;

    return function () {

        state += 0x6D2B79F5;

        let t = state;

        t = Math.imul(t ^ (t >>> 15), t | 1);

        t ^= t + Math.imul(
            t ^ (t >>> 7),
            t | 61
        );

        return (
            (t ^ (t >>> 14)) >>> 0
        ) / 4294967296;
    };
}

/* =========================================================
   NOISE
========================================================= */

/*
    Returnerer et stabilt pseudo-random tall for
    en bestemt x/y-posisjon og seed.

    Samme koordinat + samme seed =
    alltid samme verdi.
*/

function hashNoise(x, y, seed) {

    /*
        Math.imul gjør ekte 32-bit integer
        multiplikasjon.

        Dette er viktig for at hash-en skal
        bruke hele området 0–1 korrekt.
    */

    let h =
        Math.imul(
            x,
            374761393
        ) ^

        Math.imul(
            y,
            668265263
        ) ^

        Math.imul(
            seed,
            69069
        );


    h =
        Math.imul(
            h ^ (h >>> 13),
            1274126177
        );


    h ^= h >>> 16;


    return (
        h >>> 0
    ) / 4294967295;
}


/*
    Smooth interpolation.
*/

function smoothStep(t) {

    return t * t * (3 - 2 * t);
}


/*
    Lineær interpolation.
*/

function lerp(a, b, t) {

    return a + (b - a) * t;
}


/*
    Value noise.

    I stedet for helt tilfeldig noise får vi
    myke, sammenhengende områder.
*/

function valueNoise(x, y, scale, seed) {

    const scaledX = x / scale;
    const scaledY = y / scale;

    const x0 = Math.floor(scaledX);
    const y0 = Math.floor(scaledY);

    const x1 = x0 + 1;
    const y1 = y0 + 1;

    const tx = smoothStep(
        scaledX - x0
    );

    const ty = smoothStep(
        scaledY - y0
    );


    const a =
        hashNoise(x0, y0, seed);

    const b =
        hashNoise(x1, y0, seed);

    const c =
        hashNoise(x0, y1, seed);

    const d =
        hashNoise(x1, y1, seed);


    const top =
        lerp(a, b, tx);

    const bottom =
        lerp(c, d, tx);


    return lerp(
        top,
        bottom,
        ty
    );
}


/*
    Flere noise-lag oppå hverandre.

    Store lag lager kontinenter.
    Små lag lager lokal variasjon.
*/

function fractalNoise(x, y, seed) {

    let value = 0;

    value +=
        valueNoise(
            x,
            y,
            110,
            seed
        ) * 0.50;

    value +=
        valueNoise(
            x,
            y,
            55,
            seed + 100
        ) * 0.25;

    value +=
        valueNoise(
            x,
            y,
            25,
            seed + 200
        ) * 0.15;

    value +=
        valueNoise(
            x,
            y,
            10,
            seed + 300
        ) * 0.10;


    return value;
}

/* =========================================================
   WORLD GENERATION
========================================================= */

function generateWorld(seed) {

    world = [];


    /*
        ============================================
        STEP 1
        CREATE ELEVATION MAP
        ============================================
    */

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        const row = [];


        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            /*
                Grunnleggende elevation fra noise.
            */

            let elevation =
                fractalNoise(
                    x,
                    y,
                    seed
                );


            /*
                CONTINENT MASK

                Vi gjør kantene av verden lavere.

                Dette gjør at landmassene oftere
                blir omgitt av hav i stedet for
                å fortsette rett ut av kartet.
            */

            const normalizedX =
                x / (WORLD_WIDTH - 1);

            const normalizedY =
                y / (WORLD_HEIGHT - 1);


            const distanceX =
                Math.abs(
                    normalizedX - 0.5
                ) * 2;

            const distanceY =
                Math.abs(
                    normalizedY - 0.5
                ) * 2;


            const edgeDistance =
                Math.max(
                    distanceX,
                    distanceY
                );


            /*
                Bare ytterkantene påvirkes kraftig.
            */

            const continentMask =
                Math.max(
                    0,
                    (edgeDistance - 0.55)
                ) * 0.75;


            elevation -=
                continentMask;


            /*
                Begrens til 0–1.
            */

            elevation =
                Math.max(
                    0,
                    Math.min(
                        1,
                        elevation
                    )
                );


            /*
                ====================================
                STEP 2
                ELEVATION → TERRAIN
                ====================================
            */

            let type;


            if (
                elevation < SEA_LEVEL - 0.08
            ) {

                type = "deepWater";

            }

            else if (
                elevation < SEA_LEVEL
            ) {

                type = "shallowWater";

            }

            else if (
                elevation < BEACH_LEVEL
            ) {

                type = "beach";
            }

            else if (
                elevation < HILL_LEVEL
            ) {

                type = "grass";

            }

            else if (
                elevation < MOUNTAIN_LEVEL
            ) {

                type = "hill";

            }

            else {

                type = "mountain";
            }



            row.push({

                type,

                elevation,

                moisture: 0,
                temperature: 0,

                biome: null,

                /*
                    Hydrology
                */

                resources: {

                    fertility: 0,
                    timber: 0,
                    stone: 0,
                    iron: 0,
                    freshWater: 0
                },

                settlementId: null,

                hydroElevation:
                    elevation,

                flowToX:
                    null,

                flowToY:
                    null,

                runoff:
                    0,

                flowAccumulation:
                    0,

                river:
                    false,

                riverSize:
                    0
            });
        }


        world.push(row);
    }


    generateClimate(
        seed
    );

    generateBiomes(
        seed
    );

    generateRivers(
        seed
    );


    /*
        ============================================
        NATURAL RESOURCES
        ============================================
    */

generateResources(
    seed
);

generateSettlements(
    seed
);


/*
    ============================================
    CIVILIZATION
    ============================================
*/

generateCivilizations(
    seed
);


findPlayerSpawn();
}

/* =========================================================
   CLIMATE GENERATION
========================================================= */

function generateClimate(seed) {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            /* =========================================
               TEMPERATURE
            ========================================= */


            /*
                0 ved equator.
                1 ved nord- og sørpol.
            */

            const latitude =
                Math.abs(
                    (
                        y /
                        (WORLD_HEIGHT - 1)
                    ) * 2 - 1
                );


            /*
                Varmest rundt equator.
            */

            const latitudeTemperature =
                1 - latitude;


            /*
                Lokal temperaturvariasjon.
            */

            const temperatureNoise =
                fractalNoise(
                    x,
                    y,
                    seed + 20000
                );


            let temperature =
                latitudeTemperature * 0.75 +
                temperatureNoise * 0.25;


            /*
                Høyere terreng er kaldere.
            */

            const elevationCooling =
                Math.max(
                    0,
                    tile.elevation -
                    BEACH_LEVEL
                ) * 0.65;


            temperature -=
                elevationCooling;


            temperature =
                clamp01(
                    temperature
                );


            /* =========================================
               MOISTURE
            ========================================= */


            /*
                Stor moisture noise lager store
                klimasoner.
            */

            const moistureLarge =
                fractalNoise(
                    x,
                    y,
                    seed + 30000
                );


            /*
                Mindre noise gir lokal variasjon.
            */

            const moistureLocal =
                valueNoise(
                    x,
                    y,
                    18,
                    seed + 31000
                );


            let moisture =
                moistureLarge * 0.82 +
                moistureLocal * 0.18;


            moisture =
                clamp01(
                    moisture
                );


            tile.temperature =
                temperature;

            tile.moisture =
                moisture;
        }
    }
}

function clamp01(value) {

    return Math.max(
        0,
        Math.min(
            1,
            value
        )
    );
}

/* =========================================================
   BIOME GENERATION
========================================================= */

function generateBiomes(seed) {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            /* =========================================
               WATER
            ========================================= */

            if (
                tile.type === "deepWater" ||
                tile.type === "shallowWater"
            ) {

                tile.biome =
                    "ocean";

                continue;
            }


            /* =========================================
               BEACH
            ========================================= */

            if (
                tile.type === "beach"
            ) {

                tile.biome =
                    "coast";

                continue;
            }


            /* =========================================
               MOUNTAIN
            ========================================= */

            if (
                tile.elevation >=
                MOUNTAIN_LEVEL
            ) {

                tile.biome =
                    "mountain";

                tile.type =
                    "mountain";

                continue;
            }


            const temperature =
                tile.temperature;

            const moisture =
                tile.moisture;


            let biome;


            /* =========================================
               TUNDRA
            ========================================= */

            if (
                temperature < 0.20
            ) {

                biome =
                    "tundra";
            }


            /* =========================================
               TAIGA / COLD LAND
            ========================================= */

            else if (
                temperature < 0.38
            ) {

                if (
                    moisture > 0.48
                ) {

                    biome =
                        "taiga";

                } else {

                    biome =
                        "cold_grassland";
                }
            }


            /* =========================================
               DESERT
            ========================================= */

            else if (
                temperature > 0.68 &&
                moisture < 0.30
            ) {

                biome =
                    "desert";
            }


            /* =========================================
               SWAMP
            ========================================= */

            else if (
                moisture > 0.78 &&
                tile.elevation < 0.60
            ) {

                biome =
                    "swamp";
            }


            /* =========================================
               TEMPERATE FOREST
            ========================================= */

            else if (
                moisture > 0.59
            ) {

                biome =
                    "temperate_forest";
            }


            /* =========================================
               DRY GRASSLAND
            ========================================= */

            else if (
                moisture < 0.34
            ) {

                biome =
                    "dry_grassland";
            }


            /* =========================================
               NORMAL GRASSLAND
            ========================================= */

            else {

                biome =
                    "grassland";
            }


            tile.biome =
                biome;


            /*
                Hills skal fortsatt kunne sees.

                Vi lagrer biome under tile-data,
                men bruker ^ visuelt.
            */

            if (
                tile.elevation >=
                HILL_LEVEL
            ) {

                tile.type =
                    "hill";

                continue;
            }


            applyBiomeTerrain(
                tile,
                biome,
                x,
                y,
                seed
            );
        }
    }
}

/* =========================================================
   BIOME TERRAIN
========================================================= */

function applyBiomeTerrain(
    tile,
    biome,
    x,
    y,
    seed
) {

    const vegetation =
        fractalNoise(
            x,
            y,
            seed + 40000
        );


    const detail =
        hashNoise(
            x,
            y,
            seed + 41000
        );


    switch (biome) {


        /* =============================================
           TUNDRA
        ============================================= */

        case "tundra":

            tile.type =
                "tundra";

            break;


        /* =============================================
           COLD GRASSLAND
        ============================================= */

        case "cold_grassland":

            tile.type =
                "tundra";

            break;


        /* =============================================
           TAIGA
        ============================================= */

        case "taiga":

            if (
                vegetation > 0.53
            ) {

                tile.type =
                    "pine";

            } else {

                tile.type =
                    "tundra";
            }

            break;


        /* =============================================
           DESERT
        ============================================= */

        case "desert":

            tile.type =
                "desert";

            break;


        /* =============================================
           SWAMP
        ============================================= */

        case "swamp":

            tile.type =
                "swamp";

            break;


        /* =============================================
           FOREST
        ============================================= */

        case "temperate_forest":

            if (
                vegetation > 0.48
            ) {

                tile.type =
                    "tree";

            } else {

                tile.type =
                    "grassDark";
            }

            break;


        /* =============================================
           DRY GRASSLAND
        ============================================= */

        case "dry_grassland":

            tile.type =
                "dryGrass";

            break;


        /* =============================================
           NORMAL GRASSLAND
        ============================================= */

        case "grassland":

        default:

            if (
                detail > 0.72
            ) {

                tile.type =
                    "grassDark";

            } else {

                tile.type =
                    "grass";
            }

            break;
    }
}

/* =========================================================
   FORESTS
========================================================= */

function generateForests(seed) {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            /*
                Skog vokser foreløpig bare
                på vanlig grass.
            */

            if (
                tile.type !== "grass"
            ) {
                continue;
            }


            const forestNoise =
                fractalNoise(
                    x,
                    y,
                    seed + 5000
                );


            /*
                Jo høyere threshold,
                desto mindre skog.
            */

            if (
                forestNoise > 0.60
            ) {

                tile.type = "tree";
            }
            else {

                /*
                    Litt variasjon i bakken.
                */

                const groundNoise =
                    hashNoise(
                        x,
                        y,
                        seed + 9000
                    );


                if (
                    groundNoise > 0.72
                ) {

                    tile.type =
                        "grassDark";
                }
            }
        }
    }
}

/* =========================================================
   HYDROLOGY / RIVER GENERATION
========================================================= */

const HYDRO_DIRECTIONS = [

    { x: -1, y: -1 },
    { x:  0, y: -1 },
    { x:  1, y: -1 },

    { x: -1, y:  0 },
    { x:  1, y:  0 },

    { x: -1, y:  1 },
    { x:  0, y:  1 },
    { x:  1, y:  1 }

];


function generateRivers(seed) {

    resetHydrologyData();

    buildDrainageNetwork(
        seed
    );

    calculateRunoff();

    accumulateWaterFlow();

    markRiverNetwork();


    let riverTiles = 0;
    let maxFlow = 0;


    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            if (
                tile.river
            ) {

                riverTiles++;
            }


            maxFlow =
                Math.max(
                    maxFlow,
                    tile.flowAccumulation || 0
                );
        }
    }


    console.log(
        `Hydrology generated: ${riverTiles} river tiles. Max flow: ${maxFlow.toFixed(1)}`
    );
}


/* =========================================================
   RESET HYDROLOGY
========================================================= */

function resetHydrologyData() {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            tile.hydroElevation =
                tile.elevation;


            tile.flowToX =
                null;

            tile.flowToY =
                null;


            tile.runoff =
                0;

            tile.flowAccumulation =
                0;


            tile.river =
                false;

            tile.riverSize =
                0;
        }
    }
}


/* =========================================================
   WATER
========================================================= */

function isWaterTile(tile) {

    if (!tile) {

        return false;
    }


    return (

        tile.type ===
            "deepWater" ||

        tile.type ===
            "shallowWater"
    );
}


/* =========================================================
   MIN HEAP

   Priority queue brukt av drainage-generatoren.
========================================================= */

class MinHeap {

    constructor() {

        this.items = [];
    }


    get size() {

        return this.items.length;
    }


    push(value) {

        const items =
            this.items;


        items.push(
            value
        );


        let index =
            items.length - 1;


        while (
            index > 0
        ) {

            const parent =
                Math.floor(
                    (index - 1) / 2
                );


            if (
                items[parent].priority <=
                items[index].priority
            ) {

                break;
            }


            [
                items[parent],
                items[index]
            ] = [

                items[index],
                items[parent]
            ];


            index =
                parent;
        }
    }


    pop() {

        if (
            this.items.length === 0
        ) {

            return null;
        }


        const root =
            this.items[0];


        const last =
            this.items.pop();


        if (
            this.items.length > 0
        ) {

            this.items[0] =
                last;


            let index = 0;


            while (true) {

                const left =
                    index * 2 + 1;

                const right =
                    left + 1;


                let smallest =
                    index;


                if (
                    left <
                        this.items.length &&
                    this.items[left].priority <
                        this.items[smallest].priority
                ) {

                    smallest =
                        left;
                }


                if (
                    right <
                        this.items.length &&
                    this.items[right].priority <
                        this.items[smallest].priority
                ) {

                    smallest =
                        right;
                }


                if (
                    smallest === index
                ) {

                    break;
                }


                [
                    this.items[index],
                    this.items[smallest]
                ] = [

                    this.items[smallest],
                    this.items[index]
                ];


                index =
                    smallest;
            }
        }


        return root;
    }
}


/* =========================================================
   GLOBAL DRAINAGE NETWORK
========================================================= */

/*
    Her skjer den store forskjellen.

    Vi starter ved alt eksisterende vann og
    arbeider oss innover over hele kontinentet.

    Dermed lærer hver land-tile hvilken vei
    vannet må gå for til slutt å nå et outlet.

    Dette kalles i praksis en priority-flood.
*/

function buildDrainageNetwork(seed) {

    const heap =
        new MinHeap();


    const visited =
        new Uint8Array(
            WORLD_WIDTH *
            WORLD_HEIGHT
        );


    const indexOf =
        (x, y) =>

            y *
            WORLD_WIDTH +
            x;


    let outletCount = 0;


    /* =========================================
       WATER = OUTLETS
    ========================================= */

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            if (
                !isWaterTile(
                    tile
                )
            ) {

                continue;
            }


            const index =
                indexOf(
                    x,
                    y
                );


            visited[index] =
                1;


            tile.hydroElevation =
                tile.elevation;


            heap.push({

                x,
                y,

                priority:

                    tile.elevation +

                    hashNoise(
                        x,
                        y,
                        seed + 60000
                    ) *

                    0.0000001
            });


            outletCount++;
        }
    }


    /* =========================================
       FALLBACK

       Dersom verden av en eller annen grunn
       ikke inneholder vann.
    ========================================= */

    if (
        outletCount === 0
    ) {

        for (
            let y = 0;
            y < WORLD_HEIGHT;
            y++
        ) {

            for (
                let x = 0;
                x < WORLD_WIDTH;
                x++
            ) {

                if (
                    x !== 0 &&
                    y !== 0 &&
                    x !==
                        WORLD_WIDTH - 1 &&
                    y !==
                        WORLD_HEIGHT - 1
                ) {

                    continue;
                }


                const index =
                    indexOf(
                        x,
                        y
                    );


                if (
                    visited[index]
                ) {

                    continue;
                }


                visited[index] =
                    1;


                const tile =
                    world[y][x];


                heap.push({

                    x,
                    y,

                    priority:
                        tile.elevation
                });
            }
        }
    }


    /*
        En ekstremt liten slope gjør at vann
        alltid har en vei videre selv gjennom
        veldig flate områder.
    */

    const EPSILON =
        0.00001;


    /*
        Små detaljer som ikke endrer ekte
        elevation, men bryter opp perfekte
        rette river paths.
    */

    const MICRO_RELIEF =
        0.002;


    /* =========================================
       PRIORITY FLOOD
    ========================================= */

    while (
        heap.size > 0
    ) {

        const current =
            heap.pop();


        const currentTile =
            world[
                current.y
            ][
                current.x
            ];


        for (
            const direction
            of HYDRO_DIRECTIONS
        ) {

            const nextX =
                current.x +
                direction.x;


            const nextY =
                current.y +
                direction.y;


            if (
                !isInsideWorld(
                    nextX,
                    nextY
                )
            ) {

                continue;
            }


            const nextIndex =
                indexOf(
                    nextX,
                    nextY
                );


            if (
                visited[nextIndex]
            ) {

                continue;
            }


            visited[nextIndex] =
                1;


            const nextTile =
                world[
                    nextY
                ][
                    nextX
                ];


            /*
                Små lokale høydeforskjeller.

                Dette påvirker kun hydrology,
                ikke faktisk elevation.
            */

            const microRelief =

                (
                    hashNoise(
                        nextX,
                        nextY,
                        seed + 61000
                    ) -
                    0.5
                ) *

                MICRO_RELIEF;


            const rawHydroElevation =

                nextTile.elevation +
                microRelief;


            /*
                Lokale groper blir virtuelt fylt
                til sitt nærmeste spill-point.

                Vi lager ikke lake ennå.

                Det kommer i neste hydrology-steg.
            */

            nextTile.hydroElevation =

                Math.max(

                    rawHydroElevation,

                    currentTile.hydroElevation +
                        EPSILON
                );


            /*
                FLOW DIRECTION

                Current tile er allerede nærmere
                et outlet enn nextTile.

                Derfor renner nextTile mot current.
            */

            nextTile.flowToX =
                current.x;

            nextTile.flowToY =
                current.y;


            heap.push({

                x:
                    nextX,

                y:
                    nextY,

                priority:

                    nextTile.hydroElevation +

                    hashNoise(
                        nextX,
                        nextY,
                        seed + 62000
                    ) *

                    0.0000001
            });
        }
    }
}


/* =========================================================
   RAINFALL / RUNOFF
========================================================= */

function calculateRunoff() {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            if (
                isWaterTile(
                    tile
                )
            ) {

                tile.runoff =
                    0;

                tile.flowAccumulation =
                    0;

                continue;
            }


            /*
                Moisture avgjør hvor mye vann
                denne tile-en bidrar med.
            */

            const rainfall =

                0.25 +

                Math.pow(
                    tile.moisture,
                    1.35
                ) *

                1.75;


            /*
                Litt ekstra runoff fra høye områder.

                Kan senere bli ekte snow / snowmelt.
            */

            const mountainRunoff =

                Math.max(

                    0,

                    tile.elevation -
                        HILL_LEVEL

                ) *

                0.9;


            /*
                Høy temperatur gir litt mer
                evaporation.
            */

            const evaporation =

                1 -

                Math.max(

                    0,

                    tile.temperature -
                        0.65

                ) *

                0.45;


            tile.runoff =

                Math.max(

                    0.05,

                    (
                        rainfall +
                        mountainRunoff
                    ) *

                    evaporation
                );


            tile.flowAccumulation =
                tile.runoff;
        }
    }
}


/* =========================================================
   FLOW ACCUMULATION
========================================================= */

/*
    Alle land-tiles sorteres fra høyest til lavest.

    En tile sender alt vannet sitt til sin
    flowTo-posisjon.

    Derfor vokser vannmengden:

        1
        ↓
        3
        ↓
       12
        ↓
       48
        ↓
      300
*/

function accumulateWaterFlow() {

    const cells = [];


    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            if (
                isWaterTile(
                    tile
                )
            ) {

                continue;
            }


            cells.push({

                x,
                y,

                hydroElevation:
                    tile.hydroElevation
            });
        }
    }


    cells.sort(

        (a, b) =>

            b.hydroElevation -
            a.hydroElevation
    );


    for (
        const cell
        of cells
    ) {

        const tile =
            world[
                cell.y
            ][
                cell.x
            ];


        if (
            tile.flowToX === null ||
            tile.flowToY === null
        ) {

            continue;
        }


        const target =
            world[
                tile.flowToY
            ][
                tile.flowToX
            ];


        target.flowAccumulation +=
            tile.flowAccumulation;
    }
}


/* =========================================================
   CREATE VISIBLE RIVER NETWORK
========================================================= */

function markRiverNetwork() {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            /*
                Ocean er allerede vann.
            */

            if (
                isWaterTile(
                    tile
                )
            ) {

                continue;
            }


            /*
                Ikke nok upstream water =
                ingen synlig river.
            */

            if (
                tile.flowAccumulation <
                RIVER_FLOW_THRESHOLD
            ) {

                continue;
            }


            tile.river =
                true;


            /*
                River size bestemmes nå av
                faktisk catchment size.
            */

            if (
                tile.flowAccumulation >=
                MAJOR_RIVER_FLOW_THRESHOLD
            ) {

                tile.riverSize =
                    3;
            }

            else if (
                tile.flowAccumulation >=
                LARGE_RIVER_FLOW_THRESHOLD
            ) {

                tile.riverSize =
                    2;
            }

            else {

                tile.riverSize =
                    1;
            }


            /*
                River skal ikke samtidig være
                et fysisk tree/pine.
            */

            if (
                tile.type === "tree"
            ) {

                tile.type =
                    "grassDark";
            }


            if (
                tile.type === "pine"
            ) {

                tile.type =
                    "tundra";
            }
        }
    }
}

/* =========================================================
   RESOURCE GENERATION
========================================================= */

function generateResources(seed) {

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];


            /*
                Ocean trenger ikke terrestrial
                resource potential.
            */

            if (
                tile.biome === "ocean"
            ) {

                continue;
            }


            const freshWater =
                calculateFreshWaterPotential(
                    x,
                    y
                );


            const fertility =
                calculateFertility(
                    tile,
                    freshWater
                );


            const timber =
                calculateTimberPotential(
                    tile
                );


            const stone =
                calculateStonePotential(
                    tile,
                    x,
                    y,
                    seed
                );


            const iron =
                calculateIronPotential(
                    tile,
                    x,
                    y,
                    seed
                );


            tile.resources = {

                fertility,

                timber,

                stone,

                iron,

                freshWater
            };
        }
    }
}

/* =========================================================
   FRESH WATER
========================================================= */

function calculateFreshWaterPotential(
    centerX,
    centerY
) {

    const SEARCH_RADIUS = 7;

    let best =
        0;


    for (
        let dy = -SEARCH_RADIUS;
        dy <= SEARCH_RADIUS;
        dy++
    ) {

        for (
            let dx = -SEARCH_RADIUS;
            dx <= SEARCH_RADIUS;
            dx++
        ) {

            const x =
                centerX + dx;

            const y =
                centerY + dy;


            if (
                !isInsideWorld(
                    x,
                    y
                )
            ) {

                continue;
            }


            const tile =
                world[y][x];


            if (
                !tile.river
            ) {

                continue;
            }


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance >
                SEARCH_RADIUS
            ) {

                continue;
            }


            const value =
                1 -
                (
                    distance /
                    (SEARCH_RADIUS + 1)
                );


            best =
                Math.max(
                    best,
                    value
                );
        }
    }


    return clamp01(
        best
    );
}

/* =========================================================
   FERTILITY
========================================================= */

function calculateFertility(
    tile,
    freshWater
) {

    const biomeBase = {

        grassland: 0.78,

        temperate_forest: 0.65,

        swamp: 0.52,

        dry_grassland: 0.36,

        cold_grassland: 0.34,

        taiga: 0.27,

        tundra: 0.12,

        desert: 0.05,

        coast: 0.25,

        mountain: 0.02

    };


    let fertility =
        biomeBase[
            tile.biome
        ] ?? 0.25;


    /*
        Ideal temperature for farming
        ligger omtrent rundt dette området.
    */

    const temperatureSuitability =
        1 -
        Math.min(
            1,

            Math.abs(
                tile.temperature -
                0.58
            ) * 1.7
        );


    /*
        Hverken knusktørt eller ekstremt vått.
    */

    const moistureSuitability =
        1 -
        Math.min(
            1,

            Math.abs(
                tile.moisture -
                0.60
            ) * 1.45
        );


    fertility *=

        0.55 +

        temperatureSuitability *
        0.20 +

        moistureSuitability *
        0.25;


    /*
        River valleys.
    */

    fertility +=
        freshWater *
        0.18;


    /*
        Høyt land blir mindre attraktivt
        for primitive agriculture.
    */

    if (
        tile.elevation >
        HILL_LEVEL
    ) {

        fertility -=
            0.18;
    }


    return clamp01(
        fertility
    );
}

/* =========================================================
   TIMBER
========================================================= */

function calculateTimberPotential(
    tile
) {

    if (
        tile.type === "tree"
    ) {

        return 1;
    }


    if (
        tile.type === "pine"
    ) {

        return 0.92;
    }


    const biomeTimber = {

        temperate_forest: 0.85,

        taiga: 0.78,

        swamp: 0.52,

        grassland: 0.24,

        cold_grassland: 0.20,

        dry_grassland: 0.10,

        tundra: 0.05,

        desert: 0.01,

        coast: 0.08,

        mountain: 0.06

    };


    return clamp01(
        biomeTimber[
            tile.biome
        ] ?? 0.10
    );
}

/* =========================================================
   STONE
========================================================= */

function calculateStonePotential(
    tile,
    x,
    y,
    seed
) {

    const geology =
        fractalNoise(
            x,
            y,
            seed + 70000
        );


    const elevationFactor =
        clamp01(
            (
                tile.elevation -
                0.42
            ) * 2.2
        );


    return clamp01(

        elevationFactor *
        0.70 +

        geology *
        0.30
    );
}

/* =========================================================
   IRON
========================================================= */

function calculateIronPotential(
    tile,
    x,
    y,
    seed
) {

    const geology =
        fractalNoise(
            x,
            y,
            seed + 76000
        );


    const elevationFactor =
        clamp01(
            (
                tile.elevation -
                0.50
            ) * 1.8
        );


    /*
        Bare de sterkeste geology-verdiene
        gir gode iron deposits.
    */

    const deposit =
        clamp01(
            (
                geology -
                0.52
            ) * 2.4
        );


    return clamp01(

        deposit *
        (
            0.55 +
            elevationFactor *
            0.45
        )
    );
}

/* =========================================================
   SETTLEMENT GENERATION
========================================================= */

function generateSettlements(seed) {

    settlements = [];


    const random =
        createRandom(
            seed + 80000
        );


    const targetCount =

        MIN_STARTING_SETTLEMENTS +

        Math.floor(

            random() *

            (
                MAX_STARTING_SETTLEMENTS -
                MIN_STARTING_SETTLEMENTS +
                1
            )
        );


    const candidates =
        [];


    /*
        Undersøk verden.

        Vi skipper annenhver tile for å redusere
        generation cost uten at det egentlig har
        noen merkbar effekt på resultatet.
    */

    for (
        let y = 1;
        y < WORLD_HEIGHT - 1;
        y += 2
    ) {

        for (
            let x = 1;
            x < WORLD_WIDTH - 1;
            x += 2
        ) {

            if (
                !canFoundSettlementAt(
                    x,
                    y
                )
            ) {

                continue;
            }


            const site =
                evaluateSettlementSite(
                    x,
                    y,
                    seed
                );


            if (
                site.score <
                MIN_SETTLEMENT_SCORE
            ) {

                continue;
            }


            candidates.push(
                site
            );
        }
    }


    /*
        Beste locations først.
    */

    candidates.sort(
        (a, b) =>
            b.score -
            a.score
    );


    const usedNames =
        new Set();


    for (
        const candidate
        of candidates
    ) {

        if (
            settlements.length >=
            targetCount
        ) {

            break;
        }


        if (
            isTooCloseToSettlement(
                candidate.x,
                candidate.y
            )
        ) {

            continue;
        }


        const settlement =
            createSettlement(
                candidate,
                random,
                usedNames
            );


        settlements.push(
            settlement
        );


        world[
            settlement.y
        ][
            settlement.x
        ].settlementId =
            settlement.id;
    }


    window.settlements =
        settlements;


    console.log(
        `Founded ${settlements.length} starting settlements.`
    );


    console.table(
        settlements.map(
            settlement => ({

                name:
                    settlement.name,

                x:
                    settlement.x,

                y:
                    settlement.y,

                population:
                    settlement.population,

                score:
                    settlement.siteScore.toFixed(2),

                biome:
                    settlement.biome
            })
        )
    );
}

/* =========================================================
   VALID SETTLEMENT TILE
========================================================= */

function canFoundSettlementAt(
    x,
    y
) {

    const tile =
        world[y][x];


    if (
        tile.river
    ) {

        return false;
    }


    /*
        Ikke bygg en village midt i forest,
        mountain eller ocean.
    */

    if (
        tile.type === "tree" ||
        tile.type === "pine" ||
        tile.type === "mountain" ||
        tile.type === "deepWater" ||
        tile.type === "shallowWater"
    ) {

        return false;
    }


    /*
        Swamp kan senere få settlements,
        men ikke i første primitive wave.
    */

    if (
        tile.biome === "swamp"
    ) {

        return false;
    }


    return true;
}

/* =========================================================
   EVALUATE SETTLEMENT SITE
========================================================= */

function evaluateSettlementSite(
    centerX,
    centerY,
    seed
) {

    let fertility = 0;
    let timber = 0;
    let stone = 0;
    let iron = 0;
    let freshWater = 0;

    let elevationDifference = 0;

    let samples = 0;


    const centerTile =
        world[
            centerY
        ][
            centerX
        ];


    for (
        let dy =
            -SETTLEMENT_SITE_RADIUS;

        dy <=
            SETTLEMENT_SITE_RADIUS;

        dy++
    ) {

        for (
            let dx =
                -SETTLEMENT_SITE_RADIUS;

            dx <=
                SETTLEMENT_SITE_RADIUS;

            dx++
        ) {

            const x =
                centerX + dx;

            const y =
                centerY + dy;


            if (
                !isInsideWorld(
                    x,
                    y
                )
            ) {

                continue;
            }


            const tile =
                world[y][x];


            if (
                tile.biome === "ocean"
            ) {

                continue;
            }


            fertility +=
                tile.resources.fertility;

            timber +=
                tile.resources.timber;

            stone +=
                tile.resources.stone;

            iron +=
                tile.resources.iron;

            freshWater =
                Math.max(
                    freshWater,
                    tile.resources.freshWater
                );


            elevationDifference +=

                Math.abs(

                    tile.elevation -
                    centerTile.elevation
                );


            samples++;
        }
    }


    if (
        samples === 0
    ) {

        return {

            x:
                centerX,

            y:
                centerY,

            score:
                0
        };
    }


    fertility /=
        samples;

    timber /=
        samples;

    stone /=
        samples;

    iron /=
        samples;


    const averageSlope =
        elevationDifference /
        samples;


    const flatness =
        clamp01(
            1 -
            averageSlope *
            9
        );


    /*
        Primitive settlements trenger først
        og fremst:

        - food
        - water
        - relatively flat land

        Stone/iron er nyttig, men sekundært.
    */

    let score =

        fertility *
            0.34 +

        freshWater *
            0.25 +

        flatness *
            0.18 +

        timber *
            0.12 +

        stone *
            0.07 +

        iron *
            0.04;


    /*
        Litt seed-basert variasjon gjør at
        ikke alle settlements velger matematisk
        perfekte locations.
    */

    score +=

        hashNoise(
            centerX,
            centerY,
            seed + 82000
        ) *

        0.025;


    /*
        Vanskelige klima.
    */

    if (
        centerTile.biome ===
        "desert"
    ) {

        score -=
            0.16;
    }


    if (
        centerTile.biome ===
        "tundra"
    ) {

        score -=
            0.10;
    }


    return {

        x:
            centerX,

        y:
            centerY,

        score:

            clamp01(
                score
            ),

        fertility,

        timber,

        stone,

        iron,

        freshWater,

        flatness
    };
}

/* =========================================================
   SETTLEMENT SPACING
========================================================= */

function isTooCloseToSettlement(
    x,
    y
) {

    for (
        const settlement
        of settlements
    ) {

        const dx =
            settlement.x -
            x;

        const dy =
            settlement.y -
            y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance <
            SETTLEMENT_MIN_SPACING
        ) {

            return true;
        }
    }


    return false;
}

/* =========================================================
   SETTLEMENT NAMES
========================================================= */

const SETTLEMENT_NAME_PREFIXES = [

    "Ash",
    "Black",
    "Dun",
    "East",
    "Elden",
    "Grey",
    "Green",
    "High",
    "Oak",
    "Raven",
    "Red",
    "River",
    "Stone",
    "West",
    "White",
    "Wolf"
];


const SETTLEMENT_NAME_SUFFIXES = [

    "bridge",
    "ford",
    "ham",
    "haven",
    "holt",
    "mere",
    "stead",
    "vale",
    "watch",
    "wick",
    "wood",
    "worth"
];


function generateSettlementName(
    random,
    usedNames
) {

    for (
        let attempt = 0;
        attempt < 100;
        attempt++
    ) {

        const prefix =

            SETTLEMENT_NAME_PREFIXES[
                Math.floor(
                    random() *
                    SETTLEMENT_NAME_PREFIXES.length
                )
            ];


        const suffix =

            SETTLEMENT_NAME_SUFFIXES[
                Math.floor(
                    random() *
                    SETTLEMENT_NAME_SUFFIXES.length
                )
            ];


        const name =
            prefix +
            suffix;


        if (
            !usedNames.has(
                name
            )
        ) {

            usedNames.add(
                name
            );


            return name;
        }
    }


    return (
        "Settlement " +
        (
            usedNames.size +
            1
        )
    );
}

/* =========================================================
   CREATE SETTLEMENT
========================================================= */

function createSettlement(
    site,
    random,
    usedNames
) {

    const tile =
        world[
            site.y
        ][
            site.x
        ];


    const startingPopulationTarget =

        30 +

        Math.floor(
            random() * 61
        );


    return {

        id:
            `settlement_${settlements.length + 1}`,

        name:
            generateSettlementName(
                random,
                usedNames
            ),

        factionId: null,

        familyIds: [],

        x:
            site.x,

        y:
            site.y,


        /*
            320 CE blir starten på vår
            senere 200-year history simulation.
        */

        foundedYear:
            WORLD_START_YEAR,

        /*
            Hvor mange mennesker settlementet
            skal starte med.

            Dette endres aldri av den levende
            population-simulatoren.
        */

        startingPopulationTarget,


        /*
            Faktisk levende population.

            Dette beregnes fra people[].
        */

        population:
            0,

        biome:
            tile.biome,

        siteScore:
            site.score,


        resources: {

            fertility:
                site.fertility,

            timber:
                site.timber,

            stone:
                site.stone,

            iron:
                site.iron,

            freshWater:
                site.freshWater
        },


        char:
            "H",

        color:
            "#f1d680"
    };
}

/* =========================================================
   DRAW SETTLEMENTS
========================================================= */

function drawSettlements(
    camera
) {

    for (
        const settlement
        of settlements
    ) {

        const screenX =
            settlement.x -
            camera.x;

        const screenY =
            settlement.y -
            camera.y;


        if (
            screenX < 0 ||
            screenY < 0 ||
            screenX >=
                camera.columns ||
            screenY >=
                camera.rows
        ) {

            continue;
        }

        const discovered =
            knowsEntity(
                "settlement",
                settlement.id
            );


        ctx.fillStyle =

            discovered

                ? settlement.color

                : "#625d48";


        ctx.fillText(

            settlement.char,

            screenX *
                CELL_WIDTH +
                CELL_WIDTH / 2,

            screenY *
                CELL_HEIGHT +
                CELL_HEIGHT / 2
        );
    }
}

/* =========================================================
   HUMAN NAMES
========================================================= */

const MALE_NAMES = [

    "Aldric",
    "Alric",
    "Baldric",
    "Cedric",
    "Edgar",
    "Edmund",
    "Edwin",
    "Godric",
    "Harald",
    "Leofric",
    "Osric",
    "Roderic",
    "Sigurd",
    "Theodric",
    "Torin",
    "Ulric",
    "Wulfric"
];


const FEMALE_NAMES = [

    "Alda",
    "Astrid",
    "Edith",
    "Elin",
    "Freya",
    "Gerda",
    "Hilda",
    "Ingrid",
    "Leona",
    "Marta",
    "Runa",
    "Sigrid",
    "Thora",
    "Yrsa"
];


const FAMILY_NAMES = [

    "Alder",
    "Ashford",
    "Blackwood",
    "Dunham",
    "Eldric",
    "Grey",
    "Hawke",
    "Ironwood",
    "Oakley",
    "Raven",
    "Redwyn",
    "Stone",
    "Thorne",
    "Vale",
    "Ward",
    "Wolf"
];

/* =========================================================
   FACTION NAMES
========================================================= */

const FACTION_PREFIXES = [

    "Northern",
    "Southern",
    "Eastern",
    "Western",
    "Grey",
    "Green",
    "Iron",
    "River",
    "Stone",
    "White"
];


const FACTION_SUFFIXES = [

    "League",
    "Realm",
    "Clans",
    "Folk",
    "Marches",
    "Confederacy",
    "Kingdom",
    "Tribes"
];


function generateFactionName(
    random,
    usedNames
) {

    for (
        let attempt = 0;
        attempt < 100;
        attempt++
    ) {

        const prefix =
            FACTION_PREFIXES[
                Math.floor(
                    random() *
                    FACTION_PREFIXES.length
                )
            ];


        const suffix =
            FACTION_SUFFIXES[
                Math.floor(
                    random() *
                    FACTION_SUFFIXES.length
                )
            ];


        const name =
            `${prefix} ${suffix}`;


        if (
            !usedNames.has(
                name
            )
        ) {

            usedNames.add(
                name
            );


            return name;
        }
    }


    return (
        `Faction ${usedNames.size + 1}`
    );
}

/* =========================================================
   CIVILIZATION GENERATION
========================================================= */

function generateCivilizations(seed) {

    factions = [];

    families = [];

    people = [];


    const random =
        createRandom(
            seed + 90000
        );


    /*
        Først lager vi factions og fordeler
        settlements geografisk.
    */

    generateFactions(
        random
    );


    /*
        Så fyller vi hvert settlement
        med familier og mennesker.
    */

    for (
        const settlement
        of settlements
    ) {

        generateSettlementPopulation(
            settlement,
            random
        );
    }

    recalculatePopulationTotals();

    window.factions =
        factions;

    window.families =
        families;

    window.people =
        people;


    console.log(
        `Generated ${factions.length} factions, ${families.length} families and ${people.length} people.`
    );


    console.table(

        settlements.map(
            settlement => ({

                settlement:
                    settlement.name,

                population:
                    settlement.population,

                families:
                    settlement.familyIds.length,

                faction:
                    getFactionName(
                        settlement.factionId
                    )
            })
        )
    );

    recalculatePopulationTotals();

    validateCivilizationGeneration();

}

/* =========================================================
   CIVILIZATION GENERATION VALIDATION
========================================================= */

function validateCivilizationGeneration() {

    let valid =
        true;


    const rows =
        settlements.map(
            settlement => {

                const residents =
                    people.filter(

                        person =>

                            person.alive &&

                            person.settlementId ===
                            settlement.id
                    );


                const settlementFamilies =
                    families.filter(

                        family =>

                            family.settlementId ===
                            settlement.id
                    );


                if (
                    residents.length === 0
                ) {

                    valid =
                        false;
                }


                return {

                    settlement:
                        settlement.name,

                    target:
                        settlement
                            .startingPopulationTarget,

                    population:
                        residents.length,

                    families:
                        settlementFamilies.length,

                    faction:
                        getFactionName(
                            settlement.factionId
                        )
                };
            }
        );


    console.table(
        rows
    );


    if (!valid) {

        console.error(
            "Civilization generation produced one or more empty starting settlements."
        );
    }


    return valid;
}

/* =========================================================
   GENERATE FACTIONS
========================================================= */

function generateFactions(
    random
) {

    if (
        settlements.length === 0
    ) {

        return;
    }


    const factionCount =
        Math.max(

            2,

            Math.min(

                5,

                Math.round(
                    settlements.length /
                    3
                )
            )
        );


    const usedNames =
        new Set();


    /*
        Spre faction centers utover.

        Første center velges tilfeldig.
    */

    const unclaimed =
        [...settlements];


    for (
        let i = 0;
        i < factionCount;
        i++
    ) {

        let capital;


        if (
            i === 0
        ) {

            capital =
                unclaimed[
                    Math.floor(
                        random() *
                        unclaimed.length
                    )
                ];

        } else {

            /*
                Velg settlement som ligger lengst
                unna eksisterende faction capitals.
            */

            let bestSettlement =
                null;

            let bestDistance =
                -Infinity;


            for (
                const settlement
                of settlements
            ) {

                let nearestFaction =
                    Infinity;


                for (
                    const faction
                    of factions
                ) {

                    const capitalSettlement =
                        getSettlementById(
                            faction.capitalSettlementId
                        );


                    if (!capitalSettlement) {
                        continue;
                    }


                    const distance =
                        getWorldDistance(

                            settlement.x,
                            settlement.y,

                            capitalSettlement.x,
                            capitalSettlement.y
                        );


                    nearestFaction =
                        Math.min(
                            nearestFaction,
                            distance
                        );
                }


                if (
                    nearestFaction >
                    bestDistance
                ) {

                    bestDistance =
                        nearestFaction;

                    bestSettlement =
                        settlement;
                }
            }


            capital =
                bestSettlement;
        }


        factions.push({

            id:
                `faction_${i + 1}`,

            name:
                generateFactionName(
                    random,
                    usedNames
                ),

            foundedYear:
                WORLD_START_YEAR,

            capitalSettlementId:
                capital.id,

            settlementIds:
                [],

            population:
                0
        });
    }


    /*
        Hvert settlement går til den
        nærmeste faction capital.
    */

    for (
        const settlement
        of settlements
    ) {

        let closestFaction =
            null;

        let closestDistance =
            Infinity;


        for (
            const faction
            of factions
        ) {

            const capital =
                getSettlementById(
                    faction.capitalSettlementId
                );


            const distance =
                getWorldDistance(

                    settlement.x,
                    settlement.y,

                    capital.x,
                    capital.y
                );


            if (
                distance <
                closestDistance
            ) {

                closestDistance =
                    distance;

                closestFaction =
                    faction;
            }
        }


        settlement.factionId =
            closestFaction.id;


        settlement.familyIds =
            [];


        closestFaction.settlementIds.push(
            settlement.id
        );
    }
}

/* =========================================================
   CIVILIZATION HELPERS
========================================================= */

function getWorldDistance(
    x1,
    y1,
    x2,
    y2
) {

    const dx =
        x2 - x1;

    const dy =
        y2 - y1;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


function getSettlementById(
    settlementId
) {

    return settlements.find(

        settlement =>
            settlement.id ===
            settlementId

    ) || null;
}


function getFactionById(
    factionId
) {

    return factions.find(

        faction =>
            faction.id ===
            factionId

    ) || null;
}


function getFactionName(
    factionId
) {

    const faction =
        getFactionById(
            factionId
        );


    return faction
        ? faction.name
        : "Independent";
}

/* =========================================================
   SETTLEMENT POPULATION
========================================================= */

function generateSettlementPopulation(
    settlement,
    random
) {

    /*
        Startmålet tilhører world generation.

        Vi bruker IKKE settlement.population her,
        fordi population er dynamisk world state.
    */

    const targetPopulation =
        Math.max(

            1,

            Math.floor(
                settlement
                    .startingPopulationTarget || 0
            )
        );


    /*
        Fresh world generation.
    */

    settlement.familyIds =
        [];


    let generatedPopulation =
        0;


    while (
        generatedPopulation <
        targetPopulation
    ) {

        const remaining =

            targetPopulation -
            generatedPopulation;


        const family =
            generateFamily(

                settlement,

                random,

                remaining
            );


        /*
            Safety.

            En family-generator skal aldri
            returnere en tom familie, men hvis
            det skjer vil vi heller stoppe enn
            å få en infinite loop.
        */

        if (
            !family ||
            family.memberIds.length === 0
        ) {

            console.error(
                `Failed to generate population for ${settlement.name}.`
            );

            break;
        }


        families.push(
            family
        );


        settlement.familyIds.push(
            family.id
        );


        generatedPopulation +=
            family.memberIds.length;
    }


    /*
        Midlertidig korrekt verdi.

        Etter at ALLE settlements er generert
        beregnes dette igjen fra people[].
    */

    settlement.population =
        generatedPopulation;
}

/* =========================================================
   FAMILY GENERATION
========================================================= */

function generateFamily(
    settlement,
    random,
    maxSize
) {

    const surname =

        FAMILY_NAMES[
            Math.floor(
                random() *
                FAMILY_NAMES.length
            )
        ];


    let adultCount =

        random() <
        0.78

            ? 2

            : 1;


    let childCount =

        Math.floor(
            random() * 5
        );


    let familySize =

        Math.min(

            maxSize,

            adultCount +
            childCount
        );


    familySize =

        Math.max(
            1,
            familySize
        );


    adultCount =

        Math.min(
            adultCount,
            familySize
        );


    childCount =

        Math.max(

            0,

            familySize -
            adultCount
        );


    const family = {

        id:
            `family_${families.length + 1}`,

        surname,

        settlementId:
            settlement.id,

        factionId:
            settlement.factionId,

        memberIds:
            [],

        headId:
            null
    };


    const adultIds = [];

    const childIds = [];


    /* =========================================
       ADULTS
    ========================================= */

    for (
        let i = 0;
        i < adultCount;
        i++
    ) {

        const sex =

            random() < 0.5

                ? "male"

                : "female";


        const age =

            randomInteger(

                random,

                POPULATION_RULES
                    .startingAdultMinAge,

                POPULATION_RULES
                    .startingAdultMaxAge
            );


        const person =
            createPerson({

                surname,

                sex,

                age,

                settlement,

                family,

                random
            });


        people.push(
            person
        );


        family.memberIds.push(
            person.id
        );


        adultIds.push(
            person.id
        );


        if (
            family.headId ===
            null
        ) {

            family.headId =
                person.id;
        }
    }


    /* =========================================
       CHILDREN
    ========================================= */

    for (
        let i = 0;
        i < childCount;
        i++
    ) {

        const sex =

            random() < 0.5

                ? "male"

                : "female";


        const age =

            randomInteger(

                random,

                POPULATION_RULES
                    .startingChildMinAge,

                POPULATION_RULES
                    .startingChildMaxAge
            );


        const person =
            createPerson({

                surname,

                sex,

                age,

                settlement,

                family,

                random
            });


        people.push(
            person
        );


        family.memberIds.push(
            person.id
        );


        childIds.push(
            person.id
        );
    }


    /* =========================================
       SPOUSES
    ========================================= */

    if (
        adultIds.length === 2
    ) {

        const adultA =
            getPersonById(
                adultIds[0]
            );


        const adultB =
            getPersonById(
                adultIds[1]
            );


        if (
            adultA &&
            adultB
        ) {

            adultA.spouseId =
                adultB.id;

            adultB.spouseId =
                adultA.id;
        }
    }


    /* =========================================
       PARENT / CHILD RELATIONSHIPS
    ========================================= */

    for (
        const childId
        of childIds
    ) {

        const child =
            getPersonById(
                childId
            );


        if (!child) {

            continue;
        }


        child.parentIds =
            [...adultIds];


        for (
            const adultId
            of adultIds
        ) {

            const adult =
                getPersonById(
                    adultId
                );


            if (!adult) {

                continue;
            }


            adult.childIds.push(
                child.id
            );
        }
    }


    return family;
}

/* =========================================================
   CREATE PERSON
========================================================= */

function createPerson({

    surname,
    sex,

    age = null,
    birthDate = null,

    settlement,
    family,

    random

}) {

    const nameList =

        sex === "male"

            ? MALE_NAMES

            : FEMALE_NAMES;


    const firstName =

        nameList[
            Math.floor(
                random() *
                nameList.length
            )
        ];


    const resolvedBirthDate =

        birthDate

            ? {
                ...birthDate
            }

            : generateBirthDateForAge(
                age ?? 0,
                random
            );


    return {

        id:
            `person_${people.length + 1}`,

        firstName,

        surname,

        name:
            `${firstName} ${surname}`,

        sex,


        /*
            Age lagres IKKE.

            Den beregnes fra birthDate.
        */

        birthDate:
            resolvedBirthDate,


        alive:
            true,


        settlementId:
            settlement.id,

        factionId:
            settlement.factionId,

        familyId:
            family.id,


        /* =========================================
           RELATIONSHIPS
        ========================================= */

        spouseId:
            null,

        parentIds:
            [],

        childIds:
            [],


        /* =========================================
           FUTURE SYSTEMS
        ========================================= */

        profession:
            null,

        skills:
            {},


        health:
            100,

        happiness:
            50,

        pregnancy:
            null,

        deathDate:
            null,

        causeOfDeath:
            null
    };
}

function randomInteger(
    random,
    min,
    max
) {

    return (

        min +

        Math.floor(

            random() *

            (
                max -
                min +
                1
            )
        )
    );
}

/* =========================================================
   GENERATE BIRTH DATE
========================================================= */

function generateBirthDateForAge(
    age,
    random,
    referenceTime = worldTime
) {

    const month =
        randomInteger(
            random,
            0,
            WORLD_CALENDAR.months.length - 1
        );


    /*
        Vi bruker reference year først for å
        finne en gyldig dag i måneden.
    */

    const maxReferenceDays =
        getDaysInMonth(
            referenceTime.year,
            month
        );


    let day =
        randomInteger(
            random,
            1,
            maxReferenceDays
        );


    /*
        Har personen allerede hatt bursdag
        dette året?
    */

    const birthdayHasOccurred =

        month <
            referenceTime.month ||

        (
            month ===
                referenceTime.month &&

            day <=
                referenceTime.day
        );


    let birthYear =

        referenceTime.year -
        age;


    if (
        !birthdayHasOccurred
    ) {

        birthYear--;
    }


    /*
        Dersom vi tilfeldigvis fikk 29 February,
        men birthYear ikke er leap year.
    */

    const actualDays =
        getDaysInMonth(
            birthYear,
            month
        );


    day =
        Math.min(
            day,
            actualDays
        );


    return {

        year:
            birthYear,

        month,

        day
    };
}

/* =========================================================
   GET PERSON AGE
========================================================= */

function getPersonAge(
    person,
    referenceTime = worldTime
) {

    if (
        !person ||
        !person.birthDate
    ) {

        return 0;
    }


    const birth =
        person.birthDate;


    let age =

        referenceTime.year -
        birth.year;


    const birthdayHasOccurred =

        referenceTime.month >
            birth.month ||

        (
            referenceTime.month ===
                birth.month &&

            referenceTime.day >=
                birth.day
        );


    if (
        !birthdayHasOccurred
    ) {

        age--;
    }


    return Math.max(
        0,
        age
    );
}

/* =========================================================
   PERSON LIFE STAGE
========================================================= */

function getPersonLifeStage(
    person
) {

    const age =
        getPersonAge(
            person
        );


    if (
        age <
        POPULATION_RULES.adulthoodAge
    ) {

        return "child";
    }


    if (
        age >=
        POPULATION_RULES.elderAge
    ) {

        return "elder";
    }


    return "adult";
}

/* =========================================================
   POPULATION LOOKUPS
========================================================= */

function getPersonById(
    personId
) {

    return people.find(

        person =>
            person.id ===
            personId

    ) || null;
}


function getFamilyById(
    familyId
) {

    return families.find(

        family =>
            family.id ===
            familyId

    ) || null;
}

/* =========================================================
   POPULATION DAILY SIMULATION
========================================================= */

function simulatePopulationDay(
    context
) {

    const date =
        context.currentTime;


    for (
        const person
        of people
    ) {

        if (
            !person.alive
        ) {

            continue;
        }


        const birthDate =
            person.birthDate;


        /*
            Ikke bursdag i dag.
        */

        if (
            birthDate.month !==
                date.month ||

            birthDate.day !==
                date.day
        ) {

            continue;
        }


        processPersonBirthday(
            person,
            date
        );
    }
}

/* =========================================================
   PERSON BIRTHDAY
========================================================= */

function processPersonBirthday(
    person,
    date
) {

    const age =
        getPersonAge(
            person,
            date
        );


    /*
        Foreløpig trenger ikke hver eneste
        bursdag bli world history.

        Men adulthood er en faktisk
        lifecycle-event.
    */

    if (
        age ===
        POPULATION_RULES.adulthoodAge
    ) {

        const settlement =
            getSettlementById(
                person.settlementId
            );


        recordWorldEvent(

            "coming_of_age",

            {

                personId:
                    person.id,

                settlementId:
                    person.settlementId,

                factionId:
                    person.factionId,

                age
            },

            settlement

                ? `${person.name} of ${settlement.name} came of age.`

                : `${person.name} came of age.`,

            "minor"
        );


        /*
            Foreløpig logger vi den også
            til spilleren.

            Senere kan dette begrenses til
            ting spilleren faktisk kjenner til.
        */

        addLog(

            settlement

                ? `${person.name} of ${settlement.name} has come of age.`

                : `${person.name} has come of age.`
        );
    }
}

registerSimulationHook(
    "day",
    simulatePopulationDay
);

registerSimulationHook(
    "day",
    simulatePregnanciesDay
);

/* =========================================================
   POPULATION INFLUENCES
========================================================= */

const populationInfluenceProviders = [];


/*
    Andre systemer kan registrere seg her.

    Eksempel senere:

    registerPopulationInfluenceProvider(
        person => {

            return {

                fertilityMultiplier: 0.7,

                mortalityMultiplier: 1.4
            };
        }
    );
*/

function registerPopulationInfluenceProvider(
    provider
) {

    if (
        typeof provider !==
        "function"
    ) {

        console.error(
            "Population influence provider must be a function."
        );

        return () => {};
    }


    populationInfluenceProviders.push(
        provider
    );


    /*
        Returnerer en unregister-funksjon.
    */

    return () => {

        const index =
            populationInfluenceProviders.indexOf(
                provider
            );


        if (
            index >= 0
        ) {

            populationInfluenceProviders.splice(
                index,
                1
            );
        }
    };
}

/* =========================================================
   GET POPULATION INFLUENCE
========================================================= */

function getPopulationInfluence(
    person
) {

    const result = {

        fertilityMultiplier:
            1,

        mortalityMultiplier:
            1
    };


    for (
        const provider
        of populationInfluenceProviders
    ) {

        try {

            const influence =
                provider(
                    person
                );


            if (!influence) {
                continue;
            }


            if (
                Number.isFinite(
                    influence.fertilityMultiplier
                )
            ) {

                result.fertilityMultiplier *=
                    Math.max(
                        0,
                        influence.fertilityMultiplier
                    );
            }


            if (
                Number.isFinite(
                    influence.mortalityMultiplier
                )
            ) {

                result.mortalityMultiplier *=
                    Math.max(
                        0,
                        influence.mortalityMultiplier
                    );
            }

        } catch (error) {

            console.error(
                "Population influence provider failed:",
                error
            );
        }
    }


    return result;
}

/* =========================================================
   SIMULATION RANDOM
========================================================= */

let simulationRandomState =
    0;


function resetSimulationRandom() {

    simulationRandomState =
        (
            WORLD_SEED +
            120000
        ) >>> 0;
}


function simulationRandom() {

    simulationRandomState =
        (
            simulationRandomState +
            0x6D2B79F5
        ) >>> 0;


    let t =
        simulationRandomState;


    t =
        Math.imul(
            t ^ (t >>> 15),
            t | 1
        );


    t ^=
        t +
        Math.imul(
            t ^ (t >>> 7),
            t | 61
        );


    return (
        (
            t ^
            (t >>> 14)
        ) >>> 0
    ) / 4294967296;
}

/* =========================================================
   PREGNANCY ELIGIBILITY
========================================================= */

function canPersonBecomePregnant(
    person
) {

    if (
        !person ||
        !person.alive
    ) {

        return false;
    }


    if (
        person.sex !==
        "female"
    ) {

        return false;
    }


    if (
        person.pregnancy
    ) {

        return false;
    }


    const age =
        getPersonAge(
            person
        );


    if (
        age <
            POPULATION_RULES
                .pregnancyMinAge ||

        age >
            POPULATION_RULES
                .pregnancyMaxAge
    ) {

        return false;
    }


    if (
        !person.spouseId
    ) {

        return false;
    }


    const spouse =
        getPersonById(
            person.spouseId
        );


    if (
        !spouse ||
        !spouse.alive
    ) {

        return false;
    }


    /*
        De må faktisk bo i samme settlement.
    */

    if (
        spouse.settlementId !==
        person.settlementId
    ) {

        return false;
    }


    return true;
}

/* =========================================================
   CONCEPTION
========================================================= */

function tryConception(
    person
) {

    if (
        !canPersonBecomePregnant(
            person
        )
    ) {

        return false;
    }


    const influence =
        getPopulationInfluence(
            person
        );


    let chance =

        POPULATION_RULES
            .monthlyConceptionChance *

        influence
            .fertilityMultiplier;


    /*
        Litt aldersvariasjon.

        Vi holder selve systemet enkelt nå,
        men sentraliserer beregningen.
    */

    chance *=
        getAgeFertilityMultiplier(
            getPersonAge(
                person
            )
        );


    chance =
        Math.max(
            0,
            Math.min(
                1,
                chance
            )
        );


    if (
        simulationRandom() >
        chance
    ) {

        return false;
    }


    beginPregnancy(
        person
    );


    return true;
}

/* =========================================================
   AGE FERTILITY
========================================================= */

function getAgeFertilityMultiplier(
    age
) {

    if (
        age < 18 ||
        age > 42
    ) {

        return 0;
    }


    if (
        age <= 30
    ) {

        return 1;
    }


    if (
        age <= 35
    ) {

        return 0.82;
    }


    if (
        age <= 39
    ) {

        return 0.55;
    }


    return 0.28;
}

/* =========================================================
   BEGIN PREGNANCY
========================================================= */

function beginPregnancy(
    person
) {

    const spouse =
        getPersonById(
            person.spouseId
        );


    const pregnancyMinutes =

        POPULATION_RULES
            .pregnancyLengthDays *

        24 *
        60;


    person.pregnancy = {

        otherParentId:
            spouse
                ? spouse.id
                : null,

        conceivedDate:
            copyWorldTime(),

        dueTotalMinutes:

            worldTime.totalMinutes +
            pregnancyMinutes
    };
}

/* =========================================================
   MONTHLY POPULATION SIMULATION
========================================================= */

function simulatePopulationMonth(
    context
) {

    /*
        Vi bruker kopi fordi personer potensielt
        kan endre state under simulation.
    */

    const livingPeople =
        people.filter(
            person =>
                person.alive
        );


    /*
        Først mortality.
    */

    for (
        const person
        of livingPeople
    ) {

        tryNaturalDeath(
            person
        );
    }


    /*
        Deretter conception.

        Personer som døde over blir automatisk
        filtrert bort av eligibility.
    */

    for (
        const person
        of livingPeople
    ) {

        tryConception(
            person
        );
    }


    recalculatePopulationTotals();
}

registerSimulationHook(
    "month",
    simulatePopulationMonth
);

/* =========================================================
   NATURAL MORTALITY
========================================================= */

function getBaseAnnualMortality(
    age
) {

    if (
        age < 1
    ) {

        return 0.035;
    }


    if (
        age < 5
    ) {

        return 0.008;
    }


    if (
        age < 15
    ) {

        return 0.002;
    }


    if (
        age < 40
    ) {

        return 0.003;
    }


    if (
        age < 50
    ) {

        return 0.008;
    }


    if (
        age < 60
    ) {

        return 0.020;
    }


    if (
        age < 70
    ) {

        return 0.060;
    }


    if (
        age < 80
    ) {

        return 0.160;
    }


    if (
        age < 90
    ) {

        return 0.38;
    }


    return 0.70;
}

function tryNaturalDeath(
    person
) {

    if (
        !person ||
        !person.alive
    ) {

        return false;
    }


    const age =
        getPersonAge(
            person
        );


    let annualChance =
        getBaseAnnualMortality(
            age
        );


    const influence =
        getPopulationInfluence(
            person
        );


    annualChance *=
        influence
            .mortalityMultiplier;


    annualChance =
        Math.max(
            0,
            Math.min(
                0.999,
                annualChance
            )
        );


    /*
        Konverter annual probability
        til monthly probability.
    */

    const monthlyChance =

        1 -

        Math.pow(
            1 - annualChance,
            1 / 12
        );


    if (
        simulationRandom() >=
        monthlyChance
    ) {

        return false;
    }


    killPerson(
        person,
        "natural_causes"
    );


    return true;
}

/* =========================================================
   KILL PERSON
========================================================= */

function killPerson(
    person,
    cause = "unknown"
) {

    if (
        !person ||
        !person.alive
    ) {

        return false;
    }


    person.alive =
        false;


    person.deathDate =
        copyWorldTime();


    person.causeOfDeath =
        cause;


    /*
        En pregnancy opphører dersom
        personen dør før fødselen.
    */

    person.pregnancy =
        null;


    const family =
        getFamilyById(
            person.familyId
        );


    if (
        family
    ) {

        updateFamilyAfterDeath(
            family
        );
    }


    const settlement =
        getSettlementById(
            person.settlementId
        );


    recordWorldEvent(

        "death",

        {

            personId:
                person.id,

            settlementId:
                person.settlementId,

            factionId:
                person.factionId,

            cause
        },

        settlement

            ? `${person.name} died in ${settlement.name}.`

            : `${person.name} died.`,

        "normal"
    );


    recalculatePopulationTotals();


    return true;
}

/* =========================================================
   UPDATE FAMILY AFTER DEATH
========================================================= */

function updateFamilyAfterDeath(
    family
) {

    const livingMembers =

        family.memberIds

            .map(
                getPersonById
            )

            .filter(
                person =>
                    person &&
                    person.alive
            );


    if (
        livingMembers.length ===
        0
    ) {

        family.headId =
            null;

        family.extinct =
            true;

        return;
    }


    family.extinct =
        false;


    const currentHead =
        getPersonById(
            family.headId
        );


    if (
        currentHead &&
        currentHead.alive
    ) {

        return;
    }


    /*
        Eldste levende person blir
        midlertidig household head.
    */

    livingMembers.sort(

        (a, b) =>

            getPersonAge(b) -
            getPersonAge(a)
    );


    family.headId =
        livingMembers[0].id;
}

/* =========================================================
   DAILY PREGNANCY SIMULATION
========================================================= */

function simulatePregnanciesDay(
    context
) {

    /*
        Kopi fordi en fødsel legger
        nye personer til people[].
    */

    const pregnantPeople =

        people.filter(

            person =>

                person.alive &&
                person.pregnancy
        );


    for (
        const person
        of pregnantPeople
    ) {

        if (
            worldTime.totalMinutes <
            person.pregnancy
                .dueTotalMinutes
        ) {

            continue;
        }


        giveBirth(
            person
        );
    }
}

/* =========================================================
   GIVE BIRTH
========================================================= */

function giveBirth(
    mother
) {

    if (
        !mother ||
        !mother.alive ||
        !mother.pregnancy
    ) {

        return null;
    }


    const pregnancy =
        mother.pregnancy;


    const family =
        getFamilyById(
            mother.familyId
        );


    const settlement =
        getSettlementById(
            mother.settlementId
        );


    if (
        !family ||
        !settlement
    ) {

        mother.pregnancy =
            null;

        return null;
    }


    const otherParent =
        getPersonById(
            pregnancy.otherParentId
        );


    const sex =

        simulationRandom() <
        0.5

            ? "male"

            : "female";


    /*
        createPerson forventer en random-funksjon.
    */

    const baby =
        createPerson({

            surname:
                family.surname,

            sex,

            birthDate: {

                year:
                    worldTime.year,

                month:
                    worldTime.month,

                day:
                    worldTime.day
            },

            settlement,

            family,

            random:
                simulationRandom
        });


    /* =========================================
       RELATIONSHIPS
    ========================================= */

    baby.parentIds.push(
        mother.id
    );


    if (
        otherParent &&
        otherParent.alive
    ) {

        baby.parentIds.push(
            otherParent.id
        );
    }


    mother.childIds.push(
        baby.id
    );


    if (
        otherParent
    ) {

        otherParent.childIds.push(
            baby.id
        );
    }


    /* =========================================
       ADD TO WORLD
    ========================================= */

    people.push(
        baby
    );


    family.memberIds.push(
        baby.id
    );


    mother.pregnancy =
        null;


    recalculatePopulationTotals();


    recordWorldEvent(

        "birth",

        {

            personId:
                baby.id,

            motherId:
                mother.id,

            otherParentId:
                otherParent
                    ? otherParent.id
                    : null,

            familyId:
                family.id,

            settlementId:
                settlement.id,

            factionId:
                settlement.factionId
        },

        `${baby.name} was born in ${settlement.name}.`,

        "normal"
    );


    return baby;
}

/* =========================================================
   RECALCULATE POPULATION TOTALS
========================================================= */

function recalculatePopulationTotals() {

    for (
        const settlement
        of settlements
    ) {

        settlement.population =
            0;
    }


    for (
        const faction
        of factions
    ) {

        faction.population =
            0;
    }


    for (
        const person
        of people
    ) {

        if (
            !person.alive
        ) {

            continue;
        }


        const settlement =
            getSettlementById(
                person.settlementId
            );


        if (
            settlement
        ) {

            settlement.population++;
        }


        const faction =
            getFactionById(
                person.factionId
            );


        if (
            faction
        ) {

            faction.population++;
        }
    }
}

/* =========================================================
   PLAYER SPAWN
========================================================= */

function findPlayerSpawn() {

    const centerX =
        Math.floor(
            WORLD_WIDTH / 2
        );

    const centerY =
        Math.floor(
            WORLD_HEIGHT / 2
        );


    let bestTile = null;

    let bestDistance =
        Infinity;


    /*
        Først leter vi etter fine,
        åpne land-tiles.
    */

    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y++
    ) {

        for (
            let x = 0;
            x < WORLD_WIDTH;
            x++
        ) {

            const tile =
                world[y][x];

            if (
                tile.river
            ) {

                continue;
            }

            const goodTerrain =
                tile.type === "grass" ||
                tile.type === "grassDark" ||
                tile.type === "dryGrass" ||
                tile.type === "tundra";


            if (!goodTerrain) {
                continue;
            }


            const distance =
                Math.abs(
                    x - centerX
                ) +
                Math.abs(
                    y - centerY
                );


            if (
                distance <
                bestDistance
            ) {

                bestDistance =
                    distance;

                bestTile = {
                    x,
                    y
                };
            }
        }
    }


    /*
        Fallback:
        hvilken som helst walkable tile.
    */

    if (!bestTile) {

        for (
            let y = 0;
            y < WORLD_HEIGHT;
            y++
        ) {

            for (
                let x = 0;
                x < WORLD_WIDTH;
                x++
            ) {

                if (
                    isWalkable(
                        x,
                        y
                    )
                ) {

                    bestTile = {
                        x,
                        y
                    };

                    break;
                }
            }


            if (bestTile) {
                break;
            }
        }
    }


    if (!bestTile) {

        throw new Error(
            "Generated world contains no valid player spawn."
        );
    }


    player.x =
        bestTile.x;

    player.y =
        bestTile.y;


    clearSpawnArea();
}

function clearSpawnArea() {

    for (
        let y = -2;
        y <= 2;
        y++
    ) {

        for (
            let x = -2;
            x <= 2;
            x++
        ) {

            const worldX =
                player.x + x;

            const worldY =
                player.y + y;


            if (
                !isInsideWorld(
                    worldX,
                    worldY
                )
            ) {
                continue;
            }


            const tile =
                world[worldY][worldX];


            /*
                Bare fjern vegetation rundt
                spawn.

                Ikke fyll igjen hav eller
                fjell.
            */

            if (
                tile.type === "tree" ||
                tile.type === "pine"
            ) {

                tile.type =
                    tile.biome === "taiga"
                        ? "tundra"
                        : "grass";
            }
        }
    }
}


/* =========================================================
   CREATURE GENERATION
========================================================= */

function spawnCreatures(seed) {

    const random =
        createRandom(
            seed + 1000
        );


    creatures = [];


    /*
        ============================================
        RANDOM WORLD SPIDERS
        ============================================
    */

    const SPIDER_COUNT = 25;


    for (
        let i = 0;
        i < SPIDER_COUNT;
        i++
    ) {

        let spawnX = null;
        let spawnY = null;


        /*
            Prøv å finne en gyldig tile.

            Hvis vi ikke finner en, lager vi
            ganske enkelt ikke denne spideren.
        */

        for (
            let attempt = 0;
            attempt < 300;
            attempt++
        ) {

            const x =
                Math.floor(
                    random() *
                    WORLD_WIDTH
                );


            const y =
                Math.floor(
                    random() *
                    WORLD_HEIGHT
                );


            if (
                !isWalkable(
                    x,
                    y
                )
            ) {

                continue;
            }


            if (
                getCreatureAt(
                    x,
                    y
                )
            ) {

                continue;
            }


            /*
                Ikke spawn rett på spilleren.
            */

            if (
                x === player.x &&
                y === player.y
            ) {

                continue;
            }


            spawnX = x;
            spawnY = y;

            break;
        }


        /*
            Fant ingen gyldig plass.
        */

        if (
            spawnX === null ||
            spawnY === null
        ) {

            continue;
        }


        creatures.push({

            type: "spider",

            x: spawnX,
            y: spawnY,

            char: "s",
            color: "#d34f4f",

            hp: 5,

            alive: true
        });
    }


    /*
        ============================================
        ONE TEST SPIDER NEAR PLAYER
        ============================================

        Vi beholder én spider i nærheten slik at
        vi enkelt kan teste AI senere.

        MEN posisjonen bestemmes av seed-en og
        må være en gyldig walkable tile.
    */

    spawnNearbySpider(
        random
    );
}

function spawnNearbySpider(
    random
) {

    /*
        Søk i området 5–12 tiles fra spilleren.
    */

    for (
        let attempt = 0;
        attempt < 200;
        attempt++
    ) {

        const offsetX =
            Math.floor(
                random() * 25
            ) - 12;


        const offsetY =
            Math.floor(
                random() * 25
            ) - 12;


        const distance =
            Math.abs(offsetX) +
            Math.abs(offsetY);


        /*
            Ikke for nær spilleren.
        */

        if (
            distance < 5 ||
            distance > 12
        ) {

            continue;
        }


        const x =
            player.x +
            offsetX;


        const y =
            player.y +
            offsetY;


        if (
            !isInsideWorld(
                x,
                y
            )
        ) {

            continue;
        }


        if (
            !isWalkable(
                x,
                y
            )
        ) {

            continue;
        }


        if (
            getCreatureAt(
                x,
                y
            )
        ) {

            continue;
        }


        creatures.push({

            type: "spider",

            x,
            y,

            char: "s",
            color: "#d34f4f",

            hp: 5,

            alive: true
        });


        return;
    }


    console.warn(
        "Could not find valid nearby spider spawn."
    );
}


/* =========================================================
   WORLD HELPERS
========================================================= */

function isInsideWorld(x, y) {

    return (
        x >= 0 &&
        y >= 0 &&
        x < WORLD_WIDTH &&
        y < WORLD_HEIGHT
    );
}


function getTile(x, y) {

    if (!isInsideWorld(x, y)) {
        return null;
    }

    return world[y][x];
}


function isWalkable(x, y) {

    const tile =
        getTile(
            x,
            y
        );


    if (!tile) {

        return false;
    }


    /*
        Rivers blokkerer movement foreløpig.

        Senere kan bridges / swimming
        overstyre dette.
    */

    if (
        tile.river
    ) {

        return false;
    }


    const definition =
        TILES[
            tile.type
        ];


    return (

        definition
            ? definition.walkable
            : false
    );
}


/* =========================================================
   CREATURE HELPERS
========================================================= */

function getCreatureAt(x, y) {

    return creatures.find(creature =>
        creature.alive &&
        creature.x === x &&
        creature.y === y
    );
}


/* =========================================================
   PLAYER MOVEMENT
========================================================= */

function tryMovePlayer(dx, dy) {

    const targetX = player.x + dx;
    const targetY = player.y + dy;


    /*
        Creature på target tile.
    */

    const creature =
        getCreatureAt(targetX, targetY);


    if (creature) {

        addLog(
            `A ${creature.type} blocks your path.`
        );

        return;
    }


    /*
        Terrain collision.
    */

    if (!isWalkable(targetX, targetY)) {

        const tile = getTile(targetX, targetY);

        if (tile) {

            const blockerName =

                tile.river
                    ? "river"
                    : tile.type;


            addLog(
                `The ${blockerName} blocks your path.`
            );
        }

        return;
    }


    const previousPosition = {

        x:
            player.x,

        y:
            player.y
    };


    player.x =
        targetX;

    player.y =
        targetY;


    notifyPlayerPositionChanged(

        previousPosition,

        {
            x:
                player.x,

            y:
                player.y
        }
    );


    finishTurn(
        "move"
    );

}


/* =========================================================
   COMPLETE PLAYER ACTION
========================================================= */

function finishTurn(
    actionId = "move",
    customMinutes = null
) {

    /*
        Turn betyr:
        hvor mange handlinger spilleren har utført.

        Time betyr:
        hvor lang tid handlingene faktisk tok.

        Disse skal IKKE være det samme systemet.
    */

    turn++;


    const minutes =

        customMinutes !== null

            ? customMinutes

            : getPlayerActionMinutes(
                actionId
            );


    advanceWorldTime(
        minutes
    );


    /*
        Foreløpig får creatures én action
        per player action.

        Senere kan creature speed også bli
        tidsbasert i stedet.
    */

    updateCreatures();


    updateUI();

    render();
}


/* =========================================================
   CREATURE AI
========================================================= */

function updateCreatures() {

    for (const creature of creatures) {

        if (!creature.alive) {
            continue;
        }


        const dx =
            player.x - creature.x;

        const dy =
            player.y - creature.y;


        const distance =
            Math.abs(dx) +
            Math.abs(dy);


        /*
            Spider reagerer bare når spilleren
            er ganske nær.
        */

        if (distance > 8) {
            continue;
        }


        /*
            Ved siden av spilleren.
        */

        if (distance === 1) {

            addLog(
                "The spider watches you."
            );

            continue;
        }


        /*
            Enkel chase AI.

            Ikke pathfinding ennå.
        */

        let moveX = 0;
        let moveY = 0;


        if (Math.abs(dx) > Math.abs(dy)) {

            moveX = Math.sign(dx);

        } else {

            moveY = Math.sign(dy);
        }


        const targetX =
            creature.x + moveX;

        const targetY =
            creature.y + moveY;


        if (
            isWalkable(targetX, targetY) &&
            !getCreatureAt(targetX, targetY) &&
            !(
                targetX === player.x &&
                targetY === player.y
            )
        ) {

            creature.x = targetX;
            creature.y = targetY;
        }
    }
}


/* =========================================================
   CAMERA
========================================================= */

function getCamera() {

    const columns =
        Math.floor(
            canvas.width / CELL_WIDTH
        );

    const rows =
        Math.floor(
            canvas.height / CELL_HEIGHT
        );


    let x =
        player.x -
        Math.floor(columns / 2);

    let y =
        player.y -
        Math.floor(rows / 2);


    x = Math.max(
        0,
        Math.min(
            WORLD_WIDTH - columns,
            x
        )
    );


    y = Math.max(
        0,
        Math.min(
            WORLD_HEIGHT - rows,
            y
        )
    );


    return {
        x,
        y,
        columns,
        rows
    };
}


/* =========================================================
   CANVAS SIZE
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();


    canvas.width =
        Math.floor(rect.width);

    canvas.height =
        Math.floor(rect.height);


    render();
}


/* =========================================================
   RENDERING
========================================================= */

function render() {

    ctx.fillStyle = "#050705";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.font =
        `${CELL_HEIGHT - 2}px "Courier New", monospace`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    const camera =
        getCamera();


    /*
        TERRAIN
    */

    for (
        let screenY = 0;
        screenY < camera.rows;
        screenY++
    ) {

        for (
            let screenX = 0;
            screenX < camera.columns;
            screenX++
        ) {

            const worldX =
                camera.x + screenX;

            const worldY =
                camera.y + screenY;


            if (!isInsideWorld(worldX, worldY)) {
                continue;
            }


            const tile =
                world[worldY][worldX];

            let definition =
                TILES[
                    tile.type
                ];


            if (
                tile.river
            ) {

                definition =
                    RIVER_STYLES[
                        tile.riverSize
                    ] ||
                    RIVER_STYLES[1];
            }


            ctx.fillStyle =
                definition.color;


            ctx.fillText(
                definition.char,

                screenX * CELL_WIDTH +
                    CELL_WIDTH / 2,

                screenY * CELL_HEIGHT +
                    CELL_HEIGHT / 2
            );
        }
    }

    /*
        SETTLEMENTS
    */

    drawSettlements(
        camera
    );

    /*
        CREATURES
    */

    for (const creature of creatures) {

        if (!creature.alive) {
            continue;
        }


        const screenX =
            creature.x - camera.x;

        const screenY =
            creature.y - camera.y;


        if (
            screenX < 0 ||
            screenY < 0 ||
            screenX >= camera.columns ||
            screenY >= camera.rows
        ) {
            continue;
        }


        ctx.fillStyle =
            creature.color;


        ctx.fillText(
            creature.char,

            screenX * CELL_WIDTH +
                CELL_WIDTH / 2,

            screenY * CELL_HEIGHT +
                CELL_HEIGHT / 2
        );
    }


    /*
        PLAYER
    */

    const playerScreenX =
        player.x - camera.x;

    const playerScreenY =
        player.y - camera.y;


    ctx.fillStyle =
        player.color;


    ctx.fillText(
        player.char,

        playerScreenX * CELL_WIDTH +
            CELL_WIDTH / 2,

        playerScreenY * CELL_HEIGHT +
            CELL_HEIGHT / 2
    );
}

/* =========================================================
   DEBUG TIME SKIP
========================================================= */

function debugAdvanceDays(
    days
) {

    if (
        !Number.isFinite(days) ||
        days <= 0
    ) {

        return;
    }


    advanceWorldTime(

        Math.floor(days) *
        24 *
        60
    );


    updateUI();

    render();
}

window.debugAdvanceDays =
    debugAdvanceDays;

/* =========================================================
   INPUT
========================================================= */

window.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        /*
            Settlement window fungerer
            foreløpig som modal.
        */

        if (
            isSettlementWindowOpen()
        ) {

            if (
                key === "escape"
            ) {

                event.preventDefault();

                goBackSettlementWindow();

                return;
            }


            if (
                key === "e"
            ) {

                event.preventDefault();

                closeSettlementWindow();

                return;
            }


            return;
        }


        /*
            World interaction.
        */

        if (
            key === "e"
        ) {

            event.preventDefault();

            interactWithWorld();

            return;
        }


        let dx = 0;
        let dy = 0;


        switch (key) {

            case "w":
            case "arrowup":

                dy = -1;

                break;


            case "s":
            case "arrowdown":

                dy = 1;

                break;


            case "a":
            case "arrowleft":

                dx = -1;

                break;


            case "d":
            case "arrowright":

                dx = 1;

                break;


            case ".":

                event.preventDefault();

                finishTurn(
                    "wait"
                );

                return;


            default:

                return;
        }


        event.preventDefault();


        tryMovePlayer(
            dx,
            dy
        );
    }
);


/* =========================================================
   GAME LOG
========================================================= */

function addLog(message) {

    const log =
        document.getElementById("game-log");


    /*
        Gjør gamle meldinger svakere.
    */

    const previous =
        log.querySelectorAll(".log-entry");

    previous.forEach(entry => {
        entry.classList.add("log-old");
    });


    const line =
        document.createElement("div");

    line.className =
        "log-entry";

    line.textContent =
        message;


    log.appendChild(line);


    log.scrollTop =
        log.scrollHeight;
}


/* =========================================================
   UI
========================================================= */

function updateUI() {

    document.getElementById(
        "hp-value"
    ).textContent =
        `${player.hp}/${player.maxHp}`;


    document.getElementById(
        "hunger-value"
    ).textContent =
        player.hunger;


    document.getElementById(
        "position-value"
    ).textContent =
        `${player.x}, ${player.y}`;


    document.getElementById(
        "turn-value"
    ).textContent =
        turn;


    document.getElementById(
        "seed-display"
    ).textContent =
        `SEED ${WORLD_SEED}`;


    /* =========================================
       TIME
    ========================================= */

    const hour =
        String(
            worldTime.hour
        ).padStart(
            2,
            "0"
        );


    const minute =
        String(
            worldTime.minute
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "time-value"
    ).textContent =
        `${hour}:${minute}`;


    /* =========================================
       DATE
    ========================================= */

    const month =
        WORLD_CALENDAR.months[
            worldTime.month
        ];


    const day =
        String(
            worldTime.day
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "date-value"
    ).textContent =

        `${day} ${month.name} ${worldTime.year}`;
}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    resetPlayerKnowledge();

    closeSettlementWindow();

    resetWorldTime();

    resetWorldHistory();

    resetSimulationRandom();

    generateWorld(
        WORLD_SEED
    );


    spawnCreatures(
        WORLD_SEED
    );


    updateUI();


    addLog(
        `World generated. Seed: ${WORLD_SEED}`
    );

    addLog(
        `${settlements.length} settlements were founded.`
    );

    addLog(
        `${factions.length} factions now inhabit the known world.`
    );

    addLog(
        `${people.length} people live across the settlements.`
    );

    addLog(
        "You enter the world."
    );

    updateSettlementDiscovery();

    resizeCanvas();
}


/* =========================================================
   EVENTS
========================================================= */

window.addEventListener(
    "resize",
    resizeCanvas
);

document.getElementById(
    "close-settlement-window"
).addEventListener(
    "click",
    closeSettlementWindow
);

document.getElementById(
    "settlement-window-content"
).addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-settlement-action]"
            );


        if (!button) {

            return;
        }


        const action =
            button.dataset
                .settlementAction;


        switch (action) {

            case "people":

                navigateSettlementWindow(
                    "families"
                );

                break;


            case "family":

                navigateSettlementWindow(

                    "family",

                    {
                        familyId:
                            button.dataset
                                .familyId
                    }
                );

                break;


            case "person":

                navigateSettlementWindow(

                    "person",

                    {
                        personId:
                            button.dataset
                                .personId
                    }
                );

                break;


            case "back":

                goBackSettlementWindow();

                break;

            case "npc-interaction":

                performNpcInteraction(

                    button.dataset
                        .interactionId,

                    button.dataset
                        .personId
                );

                break;


            case "dialogue-topic":

                performDialogueTopic(
                    button.dataset
                        .topicId
                );

                break;


        }
    }
);


/* =========================================================
   BOOT
========================================================= */

startGame();