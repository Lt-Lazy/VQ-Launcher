"use strict";

/* =========================================================
   VQ RPG
   INFINITE WORLD GENERATION
========================================================= */

/*
    Verden har ikke lenger noen fysisk width/height.

    Tiles eksisterer i globale coordinates:

        ... -2, -1, 0, 1, 2 ...

    Chunks brukes kun til loading/cache.
*/

window.VQ_WORLDGEN = (() => {

    /* =====================================================
       SETTINGS
    ===================================================== */

    const CHUNK_SIZE =
        64;


    /*
        Hvor mange chunks som skal holdes aktive
        rundt spilleren.

        radius 2:

        5 × 5 chunks
        =
        opptil 320 × 320 tiles loaded.

        Men bare camera-området renderes.
    */

    const ACTIVE_CHUNK_RADIUS =
        2;


    /*
        STORE WORLD SCALES

        Disse er bevisst mye større enn den gamle
        300×300 world-generationen.

        Resultatet skal være at spilleren kan være
        lenge inne i samme geografiske region.
    */

    const ELEVATION_SCALES = [

        {
            scale:
                1800,

            weight:
                0.44
        },

        {
            scale:
                850,

            weight:
                0.26
        },

        {
            scale:
                360,

            weight:
                0.17
        },

        {
            scale:
                140,

            weight:
                0.09
        },

        {
            scale:
                45,

            weight:
                0.04
        }
    ];


    const CLIMATE_SCALE =
        1050;


    const MOISTURE_SCALE =
        600;


    const LOCAL_MOISTURE_SCALE =
        180;


    const VEGETATION_SCALE =
        90;


    /*
        Elevation thresholds.

        Vi beholder omtrent samme terrain-logikk
        som spillet allerede bruker.
    */

    const SEA_LEVEL =
        0.39;

    const BEACH_LEVEL =
        0.43;

    const HILL_LEVEL =
        0.70;

    const MOUNTAIN_LEVEL =
        0.82;


    /* =====================================================
       CACHE
    ===================================================== */

    const chunks =
        new Map();


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    function clamp01(
        value
    ) {

        return Math.max(
            0,
            Math.min(
                1,
                value
            )
        );
    }


    function smoothStep(
        value
    ) {

        return (
            value *
            value *
            (
                3 -
                2 * value
            )
        );
    }


    function lerp(
        a,
        b,
        amount
    ) {

        return (
            a +
            (
                b - a
            ) *
            amount
        );
    }


    /*
        Stabil coordinate hash.

        Fungerer også med negative coordinates.
    */

    function hashNoise(
        x,
        y,
        seed
    ) {

        let hash =

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


        hash =
            Math.imul(

                hash ^
                (
                    hash >>>
                    13
                ),

                1274126177
            );


        hash ^=
            hash >>> 16;


        return (
            hash >>> 0
        ) /
        4294967295;
    }


    function valueNoise(
        x,
        y,
        scale,
        seed
    ) {

        const scaledX =
            x / scale;

        const scaledY =
            y / scale;


        const x0 =
            Math.floor(
                scaledX
            );

        const y0 =
            Math.floor(
                scaledY
            );


        const x1 =
            x0 + 1;

        const y1 =
            y0 + 1;


        const tx =
            smoothStep(
                scaledX -
                x0
            );

        const ty =
            smoothStep(
                scaledY -
                y0
            );


        const top =
            lerp(

                hashNoise(
                    x0,
                    y0,
                    seed
                ),

                hashNoise(
                    x1,
                    y0,
                    seed
                ),

                tx
            );


        const bottom =
            lerp(

                hashNoise(
                    x0,
                    y1,
                    seed
                ),

                hashNoise(
                    x1,
                    y1,
                    seed
                ),

                tx
            );


        return lerp(
            top,
            bottom,
            ty
        );
    }


    /* =====================================================
       ELEVATION
    ===================================================== */

    function getElevation(
        worldX,
        worldY,
        seed
    ) {

        let elevation =
            0;


        for (
            let i = 0;
            i <
            ELEVATION_SCALES.length;
            i++
        ) {

            const layer =
                ELEVATION_SCALES[
                    i
                ];


            elevation +=

                valueNoise(

                    worldX,
                    worldY,

                    layer.scale,

                    seed +
                    i * 917
                ) *

                layer.weight;
        }


        /*
            Litt mer contrast.

            Dette gjør at store landmasser får
            tydeligere lavland/høyland.
        */

        elevation =

            0.5 +

            (
                elevation -
                0.5
            ) *

            1.16;


        return clamp01(
            elevation
        );
    }


    /* =====================================================
       CLIMATE
    ===================================================== */

    function getTemperature(
        worldX,
        worldY,
        elevation,
        seed
    ) {

        /*
            Infinite world har ingen absolutt
            north/south pole slik den gamle verden
            hadde.

            Derfor lager vi store temperature bands
            med noise.

            Dette gir varme og kalde regioner som kan
            strekke seg over tusenvis av tiles.
        */

        const regionalTemperature =
            valueNoise(

                worldX,
                worldY,

                CLIMATE_SCALE,

                seed + 20000
            );


        const secondary =
            valueNoise(

                worldX,
                worldY,

                650,

                seed + 20100
            );


        let temperature =

            regionalTemperature *
                0.82 +

            secondary *
                0.18;


        /*
            Mountains blir kaldere.
        */

        temperature -=

            Math.max(

                0,

                elevation -
                0.55

            ) *

            0.65;


        return clamp01(
            temperature
        );
    }


    function getMoisture(
        worldX,
        worldY,
        seed
    ) {

        const regional =

            valueNoise(

                worldX,
                worldY,

                MOISTURE_SCALE,

                seed + 30000
            );


        const local =

            valueNoise(

                worldX,
                worldY,

                LOCAL_MOISTURE_SCALE,

                seed + 30100
            );


        return clamp01(

            regional *
                0.86 +

            local *
                0.14
        );
    }


    /* =====================================================
       BIOME
    ===================================================== */

    function getBiome(
        elevation,
        temperature,
        moisture
    ) {

        if (
            elevation <
            SEA_LEVEL
        ) {

            return "ocean";
        }


        if (
            elevation <
            BEACH_LEVEL
        ) {

            return "coast";
        }


        if (
            elevation >=
            MOUNTAIN_LEVEL
        ) {

            return "mountain";
        }


        if (
            temperature <
            0.20
        ) {

            return "tundra";
        }


        if (
            temperature <
            0.36
        ) {

            return (
                moisture >
                0.49

                    ? "taiga"

                    : "cold_grassland"
            );
        }


        if (
            temperature >
                0.69 &&
            moisture <
                0.29
        ) {

            return "desert";
        }


        if (
            moisture >
                0.80 &&
            elevation <
                0.58
        ) {

            return "swamp";
        }


        if (
            moisture >
            0.60
        ) {

            return "temperate_forest";
        }


        if (
            moisture <
            0.33
        ) {

            return "dry_grassland";
        }


        return "grassland";
    }


    /* =====================================================
       TERRAIN
    ===================================================== */

    function getTerrainType(
        worldX,
        worldY,
        elevation,
        biome,
        seed
    ) {

        if (
            elevation <
            SEA_LEVEL - 0.06
        ) {

            return "deepWater";
        }


        if (
            elevation <
            SEA_LEVEL
        ) {

            return "shallowWater";
        }


        if (
            biome ===
            "coast"
        ) {

            return "beach";
        }


        if (
            elevation >=
            MOUNTAIN_LEVEL
        ) {

            return "mountain";
        }


        if (
            elevation >=
            HILL_LEVEL
        ) {

            return "hill";
        }


        const vegetation =

            valueNoise(

                worldX,
                worldY,

                VEGETATION_SCALE,

                seed + 40000
            );


        const detail =

            hashNoise(

                worldX,
                worldY,

                seed + 41000
            );


        switch (
            biome
        ) {

            case "tundra":

            case "cold_grassland":

                return "tundra";


            case "taiga": {

                /*
                    Regional vegetation bestemmer hvor
                    tett skogen generelt er.

                    Local forest noise lager naturlige
                    åpninger og tettere lommer.
                */

                const forestPatch =

                    valueNoise(

                        worldX,
                        worldY,

                        28,

                        seed + 42000
                    );


                /*
                    Små åpne områder inne i taigaen.
                */

                if (
                    forestPatch <
                    0.30
                ) {

                    return "tundra";
                }


                const pineChance =

                    0.42 +

                    vegetation *
                        0.22 +

                    forestPatch *
                        0.14;


                return (

                    detail <
                    pineChance

                        ? "pine"

                        : "tundra"
                );
            }


            case "temperate_forest": {

                /*
                    Skogen skal fortsatt være tett,
                    men ikke være én massiv vegg av trær.
                */

                const forestPatch =

                    valueNoise(

                        worldX,
                        worldY,

                        24,

                        seed + 43000
                    );


                /*
                    Naturlige glenner / åpninger.
                */

                if (
                    forestPatch <
                    0.28
                ) {

                    return "grassDark";
                }


                const treeChance =

                    0.44 +

                    vegetation *
                        0.24 +

                    forestPatch *
                        0.14;


                return (

                    detail <
                    treeChance

                        ? "tree"

                        : "grassDark"
                );
            }


            case "desert":

                return "desert";


            case "swamp":

                return "swamp";


            case "dry_grassland":

                return "dryGrass";


            case "grassland":

            default:

                return (
                    detail >
                    0.73

                        ? "grassDark"

                        : "grass"
                );
        }
    }

    /* =====================================================
    RESOURCE POTENTIAL
    ===================================================== */

    function getResourcePotentials(
        worldX,
        worldY,
        elevation,
        temperature,
        moisture,
        biome,
        type,
        seed
    ) {

        if (
            biome === "ocean"
        ) {

            return {

                fertility: 0,
                timber: 0,
                stone: 0,
                iron: 0,
                freshWater: 0
            };
        }


        /* =================================================
        FRESH WATER

        Rivers kommer senere tilbake som eget system.

        Foreløpig representerer dette lokal tilgang
        på groundwater, springs og små water sources.
        ================================================= */

        let freshWater =

            clamp01(

                (
                    moisture -
                    0.30
                ) *

                1.35
            );


        if (
            biome === "swamp"
        ) {

            freshWater =
                Math.max(
                    freshWater,
                    0.82
                );
        }


        /*
            Coast betyr ikke automatisk ferskvann.
        */

        if (
            biome === "coast"
        ) {

            freshWater *=
                0.55;
        }


        /* =================================================
        FERTILITY
        ================================================= */

        const fertilityBase = {

            grassland:
                0.78,

            temperate_forest:
                0.65,

            swamp:
                0.52,

            dry_grassland:
                0.36,

            cold_grassland:
                0.34,

            taiga:
                0.27,

            tundra:
                0.12,

            desert:
                0.05,

            coast:
                0.25,

            mountain:
                0.02

        };


        let fertility =

            fertilityBase[
                biome
            ] ?? 0.25;


        const temperatureSuitability =

            1 -

            Math.min(

                1,

                Math.abs(
                    temperature -
                    0.58
                ) *
                1.7
            );


        const moistureSuitability =

            1 -

            Math.min(

                1,

                Math.abs(
                    moisture -
                    0.60
                ) *
                1.45
            );


        fertility *=

            0.55 +

            temperatureSuitability *
                0.20 +

            moistureSuitability *
                0.25;


        fertility +=

            freshWater *
            0.10;


        if (
            elevation >
            HILL_LEVEL
        ) {

            fertility -=
                0.18;
        }


        fertility =
            clamp01(
                fertility
            );


        /* =================================================
        TIMBER
        ================================================= */

        let timber;


        if (
            type === "tree"
        ) {

            timber =
                1;

        } else if (
            type === "pine"
        ) {

            timber =
                0.92;

        } else {

            const timberByBiome = {

                temperate_forest:
                    0.82,

                taiga:
                    0.76,

                swamp:
                    0.48,

                grassland:
                    0.22,

                cold_grassland:
                    0.18,

                dry_grassland:
                    0.09,

                tundra:
                    0.05,

                desert:
                    0.01,

                coast:
                    0.07,

                mountain:
                    0.08
            };


            timber =

                timberByBiome[
                    biome
                ] ?? 0.10;
        }


        timber =
            clamp01(
                timber
            );


        /* =================================================
        GEOLOGY
        ================================================= */

        const geology =

            valueNoise(

                worldX,
                worldY,

                420,

                seed + 70000
            ) *

            0.65 +

            valueNoise(

                worldX,
                worldY,

                120,

                seed + 70100
            ) *

            0.35;


        const elevationFactor =

            clamp01(

                (
                    elevation -
                    0.42
                ) *

                2.2
            );


        const stone =

            clamp01(

                elevationFactor *
                    0.70 +

                geology *
                    0.30
            );


        /* =================================================
        IRON
        ================================================= */

        const ironGeology =

            valueNoise(

                worldX,
                worldY,

                520,

                seed + 76000
            ) *

            0.70 +

            valueNoise(

                worldX,
                worldY,

                150,

                seed + 76100
            ) *

            0.30;


        const ironDeposit =

            clamp01(

                (
                    ironGeology -
                    0.55
                ) *

                2.5
            );


        const iron =

            clamp01(

                ironDeposit *

                (
                    0.55 +

                    elevationFactor *
                        0.45
                )
            );


        return {

            fertility,
            timber,
            stone,
            iron,
            freshWater
        };
    }

    /* =====================================================
    INFINITE RIVERS
    ===================================================== */

    const RIVER_SOURCE_GRID_SIZE =
        360;

    const RIVER_SOURCE_CHANCE =
        0.72;

    const RIVER_MIN_SOURCE_ELEVATION =
        0.56;

    const RIVER_MIN_SOURCE_MOISTURE =
        0.40;

    const RIVER_MAX_STEPS =
        1200;

    const RIVER_LOOKAHEAD_DISTANCE =
        5;


    const RIVER_DIRECTIONS = [

        { x: -1, y: -1 },
        { x:  0, y: -1 },
        { x:  1, y: -1 },

        { x: -1, y:  0 },
        { x:  1, y:  0 },

        { x: -1, y:  1 },
        { x:  0, y:  1 },
        { x:  1, y:  1 }
    ];


    /*
        En river path tilhører en deterministic
        source-cell.

        Dermed kan samme elv fortsette gjennom
        flere chunks uten seams.
    */

    const riverPathCache =
        new Map();


    function getRiverSourceCellKey(
        cellX,
        cellY
    ) {

        return `${cellX},${cellY}`;
    }


    function getRiverSourceForCell(
        cellX,
        cellY,
        seed
    ) {

        const spawnRoll =
            hashNoise(

                cellX,
                cellY,

                seed + 90000
            );


        if (
            spawnRoll >
            RIVER_SOURCE_CHANCE
        ) {

            return null;
        }


        const margin =
            0.16;

        const usableFraction =
            1 -
            margin * 2;


        const x =

            Math.floor(

                cellX *
                    RIVER_SOURCE_GRID_SIZE +

                RIVER_SOURCE_GRID_SIZE *

                (
                    margin +

                    hashNoise(

                        cellX,
                        cellY,

                        seed + 90100
                    ) *

                    usableFraction
                )
            );


        const y =

            Math.floor(

                cellY *
                    RIVER_SOURCE_GRID_SIZE +

                RIVER_SOURCE_GRID_SIZE *

                (
                    margin +

                    hashNoise(

                        cellX,
                        cellY,

                        seed + 90200
                    ) *

                    usableFraction
                )
            );


        const elevation =
            getElevation(
                x,
                y,
                seed
            );


        /*
            Rivers starter i uplands/highlands,
            ikke rett ved havet.
        */

        if (
            elevation <
                RIVER_MIN_SOURCE_ELEVATION ||

            elevation <
                BEACH_LEVEL
        ) {

            return null;
        }


        const moisture =
            getMoisture(
                x,
                y,
                seed
            );


        if (
            moisture <
            RIVER_MIN_SOURCE_MOISTURE
        ) {

            return null;
        }


        /*
            Svært svak long-distance bias.

            Denne hjelper rivers ut av lokale
            elevation-pits uten å bestemme
            selve river-retningen.
        */

        const angle =

            hashNoise(

                cellX,
                cellY,

                seed + 90300
            ) *

            Math.PI * 2;


        return {

            x,
            y,

            moisture,

            driftX:
                Math.cos(
                    angle
                ),

            driftY:
                Math.sin(
                    angle
                )
        };
    }


    function getRiverSizeForProgress(
        step,
        sourceMoisture
    ) {

        /*
            River blir større downstream.

            Wet regions bygger større rivers
            litt raskere.
        */

        const effectiveProgress =

            step *

            (
                0.75 +
                sourceMoisture *
                    0.75
            );


        if (
            effectiveProgress >=
            720
        ) {

            return 3;
        }


        if (
            effectiveProgress >=
            260
        ) {

            return 2;
        }


        return 1;
    }


    function addRiverPathPoint(
        chunks,
        x,
        y,
        size
    ) {

        const chunkX =
            worldToChunk(
                x
            );

        const chunkY =
            worldToChunk(
                y
            );


        const chunkKey =
            getChunkKey(
                chunkX,
                chunkY
            );


        let points =
            chunks.get(
                chunkKey
            );


        if (!points) {

            points =
                [];


            chunks.set(
                chunkKey,
                points
            );
        }


        points.push({

            x,
            y,
            size
        });
    }


    /* =====================================================
    TRACE ONE RIVER
    ===================================================== */

    function traceRiverPath(
        source,
        seed
    ) {

        const chunks =
            new Map();


        if (!source) {

            return {

                chunks,

                reachedWater:
                    false
            };
        }


        /*
            River tracing sjekker mange av de
            samme elevation-punktene flere ganger.

            Lokal cache gjør dette mye billigere.
        */

        const elevationCache =
            new Map();


        function getTraceElevation(
            x,
            y
        ) {

            const key =
                `${x},${y}`;


            if (
                elevationCache.has(
                    key
                )
            ) {

                return elevationCache.get(
                    key
                );
            }


            /*
                Micro relief bryter opp unaturlig
                rette linjer uten å forandre selve
                terrain elevation.
            */

            const elevation =

                getElevation(

                    x,
                    y,

                    seed
                ) +

                (
                    hashNoise(

                        x,
                        y,

                        seed + 91000
                    ) -

                    0.5
                ) *

                0.0025;


            elevationCache.set(
                key,
                elevation
            );


            return elevation;
        }


        let x =
            source.x;

        let y =
            source.y;


        let previousDX =
            0;

        let previousDY =
            0;


        const visited =
            new Set();


        let reachedWater =
            false;


        for (
            let step = 0;
            step < RIVER_MAX_STEPS;
            step++
        ) {

            const currentElevation =
                getTraceElevation(
                    x,
                    y
                );


            /*
                Vi har nådd sjøen.
            */

            if (
                currentElevation <
                SEA_LEVEL
            ) {

                reachedWater =
                    true;

                break;
            }


            addRiverPathPoint(

                chunks,

                x,
                y,

                getRiverSizeForProgress(

                    step,

                    source.moisture
                )
            );


            visited.add(
                `${x},${y}`
            );


            let bestMove =
                null;

            let bestScore =
                Infinity;


            for (
                const direction
                of RIVER_DIRECTIONS
            ) {

                const nextX =
                    x +
                    direction.x;

                const nextY =
                    y +
                    direction.y;


                if (
                    visited.has(
                        `${nextX},${nextY}`
                    )
                ) {

                    continue;
                }


                const nextElevation =
                    getTraceElevation(

                        nextX,
                        nextY
                    );


                /*
                    Vi ser noen tiles framover.

                    Dette gjør at riveren kan finne
                    veien gjennom små lokale groper
                    i stedet for å stoppe med en gang.
                */

                const lookaheadElevation =

                    getTraceElevation(

                        nextX +

                            direction.x *
                            RIVER_LOOKAHEAD_DISTANCE,

                        nextY +

                            direction.y *
                            RIVER_LOOKAHEAD_DISTANCE
                    );


                const uphillPenalty =

                    Math.max(

                        0,

                        nextElevation -
                            currentElevation
                    ) *

                    1.75;


                /*
                    Litt preferanse for å fortsette
                    omtrent samme vei.

                    Hindrer overdreven zig-zag.
                */

                let turnPenalty =
                    0;


                if (
                    previousDX !== 0 ||
                    previousDY !== 0
                ) {

                    const dot =

                        previousDX *
                            direction.x +

                        previousDY *
                            direction.y;


                    turnPenalty =

                        dot < 0

                            ? 0.014

                            : dot === 0

                                ? 0.005

                                : 0;
                }


                const driftProgress =

                    (
                        nextX -
                        source.x
                    ) *

                        source.driftX +

                    (
                        nextY -
                        source.y
                    ) *

                        source.driftY;


                const driftBias =

                    -driftProgress *
                    0.000018;


                const jitter =

                    hashNoise(

                        nextX,
                        nextY,

                        seed + 92000
                    ) *

                    0.002;


                const score =

                    nextElevation *
                        0.62 +

                    lookaheadElevation *
                        0.38 +

                    uphillPenalty +

                    turnPenalty +

                    driftBias +

                    jitter;


                if (
                    score <
                    bestScore
                ) {

                    bestScore =
                        score;

                    bestMove =
                        direction;
                }
            }


            if (!bestMove) {

                break;
            }


            x +=
                bestMove.x;

            y +=
                bestMove.y;


            previousDX =
                bestMove.x;

            previousDY =
                bestMove.y;
        }


        return {

            chunks,

            reachedWater
        };
    }


    /* =====================================================
    GET / GENERATE RIVER PATH
    ===================================================== */

    function getRiverPathForSourceCell(
        cellX,
        cellY,
        seed
    ) {

        const key =
            getRiverSourceCellKey(
                cellX,
                cellY
            );


        if (
            riverPathCache.has(
                key
            )
        ) {

            return riverPathCache.get(
                key
            );
        }


        const source =
            getRiverSourceForCell(

                cellX,
                cellY,

                seed
            );


        const path =
            traceRiverPath(

                source,

                seed
            );


        riverPathCache.set(
            key,
            path
        );


        return path;
    }


    /* =====================================================
    APPLY RIVERS TO TERRAIN CHUNK
    ===================================================== */

    function applyRiversToChunk(
        chunk,
        seed
    ) {

        const startX =

            chunk.x *
            CHUNK_SIZE;

        const startY =

            chunk.y *
            CHUNK_SIZE;


        const endX =

            startX +
            CHUNK_SIZE -
            1;

        const endY =

            startY +
            CHUNK_SIZE -
            1;


        /*
            En source som ligger lenger unna enn
            RIVER_MAX_STEPS kan matematisk ikke nå
            denne chunken.
        */

        const firstCellX =

            Math.floor(

                (
                    startX -
                    RIVER_MAX_STEPS
                ) /

                RIVER_SOURCE_GRID_SIZE
            );


        const lastCellX =

            Math.floor(

                (
                    endX +
                    RIVER_MAX_STEPS
                ) /

                RIVER_SOURCE_GRID_SIZE
            );


        const firstCellY =

            Math.floor(

                (
                    startY -
                    RIVER_MAX_STEPS
                ) /

                RIVER_SOURCE_GRID_SIZE
            );


        const lastCellY =

            Math.floor(

                (
                    endY +
                    RIVER_MAX_STEPS
                ) /

                RIVER_SOURCE_GRID_SIZE
            );


        for (
            let cellY = firstCellY;
            cellY <= lastCellY;
            cellY++
        ) {

            for (
                let cellX = firstCellX;
                cellX <= lastCellX;
                cellX++
            ) {

                const path =

                    getRiverPathForSourceCell(

                        cellX,
                        cellY,

                        seed
                    );


                const points =

                    path.chunks.get(
                        chunk.key
                    );


                if (!points) {

                    continue;
                }


                for (
                    const point
                    of points
                ) {

                    const localX =
                        worldToLocal(
                            point.x
                        );

                    const localY =
                        worldToLocal(
                            point.y
                        );


                    const tile =

                        chunk.tiles[

                            localY *
                                CHUNK_SIZE +

                            localX
                        ];


                    if (
                        !tile ||

                        tile.elevation <
                            SEA_LEVEL
                    ) {

                        continue;
                    }


                    tile.river =
                        true;


                    tile.riverSize =

                        Math.max(

                            tile.riverSize,

                            point.size
                        );


                    /*
                        River = garantert freshwater.
                    */

                    tile.resources.freshWater =
                        1;


                    /*
                        River skal ikke ligge under
                        et fysisk tree/pine symbol.
                    */

                    if (
                        tile.type ===
                        "tree"
                    ) {

                        tile.type =
                            "grassDark";
                    }


                    if (
                        tile.type ===
                        "pine"
                    ) {

                        tile.type =
                            "tundra";
                    }
                }
            }
        }
    }

    function sampleTerrain(
        worldX,
        worldY,
        seed
    ) {

        const elevation =
            getElevation(
                worldX,
                worldY,
                seed
            );


        const temperature =
            getTemperature(
                worldX,
                worldY,
                elevation,
                seed
            );


        const moisture =
            getMoisture(
                worldX,
                worldY,
                seed
            );


        const biome =
            getBiome(
                elevation,
                temperature,
                moisture
            );


        const type =
            getTerrainType(
                worldX,
                worldY,
                elevation,
                biome,
                seed
            );


        return {

            x:
                worldX,

            y:
                worldY,

            type,

            elevation,

            temperature,

            moisture,

            biome
        };
    }

    /* =====================================================
       TILE GENERATION
    ===================================================== */

    function generateTile(
        worldX,
        worldY,
        seed
    ) {

        const elevation =
            getElevation(
                worldX,
                worldY,
                seed
            );


        const temperature =
            getTemperature(
                worldX,
                worldY,
                elevation,
                seed
            );


        const moisture =
            getMoisture(
                worldX,
                worldY,
                seed
            );


        const biome =
            getBiome(
                elevation,
                temperature,
                moisture
            );


        const type =
            getTerrainType(

                worldX,
                worldY,

                elevation,
                biome,

                seed
            );

        const resources =

            getResourcePotentials(

                worldX,
                worldY,

                elevation,
                temperature,
                moisture,

                biome,
                type,

                seed
            );


        return {

            x:
                worldX,

            y:
                worldY,

            type,

            elevation,

            temperature,

            moisture,

            biome,

            resources,

            settlementId:
                null,

            river:
                false,

            riverSize:
                0
        };
    }


    /* =====================================================
       CHUNK COORDINATES
    ===================================================== */

    function worldToChunk(
        coordinate
    ) {

        return Math.floor(
            coordinate /
            CHUNK_SIZE
        );
    }


    function worldToLocal(
        coordinate
    ) {

        return (
            (
                coordinate %
                CHUNK_SIZE
            ) +
            CHUNK_SIZE
        ) %
        CHUNK_SIZE;
    }


    function getChunkKey(
        chunkX,
        chunkY
    ) {

        return (
            `${chunkX},${chunkY}`
        );
    }


    /* =====================================================
       CHUNK GENERATION
    ===================================================== */

    function generateChunk(
        chunkX,
        chunkY,
        seed
    ) {

        const key =
            getChunkKey(
                chunkX,
                chunkY
            );


        const existing =
            chunks.get(
                key
            );


        if (existing) {

            return existing;
        }


        const tiles =
            new Array(
                CHUNK_SIZE *
                CHUNK_SIZE
            );


        for (
            let localY = 0;
            localY < CHUNK_SIZE;
            localY++
        ) {

            for (
                let localX = 0;
                localX < CHUNK_SIZE;
                localX++
            ) {

                const worldX =

                    chunkX *
                    CHUNK_SIZE +

                    localX;


                const worldY =

                    chunkY *
                    CHUNK_SIZE +

                    localY;


                const index =

                    localY *
                    CHUNK_SIZE +

                    localX;


                tiles[
                    index
                ] =

                    generateTile(

                        worldX,
                        worldY,

                        seed
                    );
            }
        }


        const chunk = {

            x:
                chunkX,

            y:
                chunkY,

            key,

            tiles
        };


        /*
            Terrain eksisterer nå.

            Legg river-network oppå det før
            chunken blir tilgjengelig for spillet.
        */

        applyRiversToChunk(
            chunk,
            seed
        );


        chunks.set(
            key,
            chunk
        );


        return chunk;
    }


    /* =====================================================
       GET TILE
    ===================================================== */

    function getTile(
        worldX,
        worldY,
        seed
    ) {

        const chunkX =
            worldToChunk(
                worldX
            );

        const chunkY =
            worldToChunk(
                worldY
            );


        const localX =
            worldToLocal(
                worldX
            );

        const localY =
            worldToLocal(
                worldY
            );


        const chunk =
            generateChunk(

                chunkX,
                chunkY,

                seed
            );


        return chunk.tiles[

            localY *
            CHUNK_SIZE +

            localX
        ];
    }


    /* =====================================================
       ACTIVE CHUNKS
    ===================================================== */

    function ensureChunksAround(
        worldX,
        worldY,
        seed
    ) {

        const centerChunkX =
            worldToChunk(
                worldX
            );

        const centerChunkY =
            worldToChunk(
                worldY
            );


        const wanted =
            new Set();


        for (
            let dy =
                -ACTIVE_CHUNK_RADIUS;

            dy <=
                ACTIVE_CHUNK_RADIUS;

            dy++
        ) {

            for (
                let dx =
                    -ACTIVE_CHUNK_RADIUS;

                dx <=
                    ACTIVE_CHUNK_RADIUS;

                dx++
            ) {

                const chunkX =
                    centerChunkX +
                    dx;

                const chunkY =
                    centerChunkY +
                    dy;


                const key =
                    getChunkKey(
                        chunkX,
                        chunkY
                    );


                wanted.add(
                    key
                );


                generateChunk(

                    chunkX,
                    chunkY,

                    seed
                );
            }
        }


        /*
            Foreløpig fjernes chunks som ligger
            langt unna.

            Persistence kommer i et senere steg.
        */

        for (
            const key
            of chunks.keys()
        ) {

            if (
                !wanted.has(
                    key
                )
            ) {

                chunks.delete(
                    key
                );
            }
        }
    }


    function clearCache() {

        chunks.clear();

        riverPathCache.clear();
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    return {

        CHUNK_SIZE,

        ACTIVE_CHUNK_RADIUS,

        hashNoise,

        sampleTerrain,

        getTile,

        generateChunk,

        ensureChunksAround,

        worldToChunk,

        worldToLocal,

        getChunkKey,

        clearCache,

        getLoadedChunkCount:
            () => chunks.size
    };

})();