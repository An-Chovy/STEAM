/*
==========================================================
 FUTURE READY EXPLORE
 Biology Atmosphere
 Living Systems Environment
 Version 1.0.0
==========================================================
*/

(() => {

    "use strict";


    /* ==================================================
       CONFIGURATION
    ================================================== */

    const CONFIG = {

        cells: {

            far: 24,

            middle: 15,

            near: 8

        },

        dnaHelices: 7,

        spores: 46,

        bioluminescentParticles: 34,

        biologicalPulse: {

            minimumDelay: 5200,

            maximumDelay: 11500

        },

        parallax: {

            easing: .065

        }

    };


    /* ==================================================
       STATE
    ================================================== */

    const state = {

        root: null,

        layers: {},

        animationFrame: null,

        pulseTimer: null,

        resizeTimer: null,

        reducedMotion: false,

        initialized: false,

        targetPointerX: 0,

        targetPointerY: 0,

        currentPointerX: 0,

        currentPointerY: 0,

        targetScroll: 0,

        currentScroll: 0,

        width: window.innerWidth,

        height: window.innerHeight

    };


    /* ==================================================
       BIOLOGY MODULE
    ================================================== */

    const BiologyAtmosphere = {

        initialize(world){

            cleanup();

            state.reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

            state.width =
                window.innerWidth;

            state.height =
                window.innerHeight;

            buildEnvironment();

            buildCells();

            buildDNAHelices();

            buildSpores();

            buildBioluminescentParticles();

            installListeners();

            updateScrollPosition();

            if(!state.reducedMotion){

                startAnimationLoop();

                scheduleBiologicalPulse();

            }

            document.body.classList.add(
                "has-biology-atmosphere"
            );

            document.body.dataset.atmosphere =
                "biology";

            state.initialized = true;

            console.log(
                `Future Ready Explore: Biology atmosphere initialized for ${world.title}.`
            );

        },


        destroy(){

            cleanup();

        }

    };


    /* ==================================================
       ENVIRONMENT STRUCTURE
    ================================================== */

    function buildEnvironment(){

        const root =
            document.createElement(
                "div"
            );

        root.id =
            "biology-atmosphere";

        root.className =
            "biology-atmosphere";

        root.setAttribute(
            "aria-hidden",
            "true"
        );

        root.innerHTML = `

            <div class="biology-background"></div>

            <div class="biology-canopy-light"></div>

            <div class="biology-organic-glow biology-organic-glow-one"></div>

            <div class="biology-organic-glow biology-organic-glow-two"></div>

            <div class="biology-organic-glow biology-organic-glow-three"></div>

            <div class="biology-microscopic-haze biology-haze-one"></div>

            <div class="biology-microscopic-haze biology-haze-two"></div>

            <div
                class="biology-cell-layer biology-cells-far"
                data-biology-cells="far">
            </div>

            <div
                class="biology-cell-layer biology-cells-middle"
                data-biology-cells="middle">
            </div>

            <div
                class="biology-cell-layer biology-cells-near"
                data-biology-cells="near">
            </div>

            <div
                class="biology-dna-layer"
                data-biology-dna>
            </div>

            <div
                class="biology-spore-layer"
                data-biology-spores>
            </div>

            <div
                class="biology-bioluminescence-layer"
                data-biology-bioluminescence>
            </div>

            <div
                class="biology-pulse-layer"
                data-biology-pulses>
            </div>

            <div class="biology-light-rays"></div>

            <div class="biology-vignette"></div>

        `;

        document.body.prepend(
            root
        );

        state.root =
            root;

        state.layers = {

            cellsFar:
                root.querySelector(
                    '[data-biology-cells="far"]'
                ),

            cellsMiddle:
                root.querySelector(
                    '[data-biology-cells="middle"]'
                ),

            cellsNear:
                root.querySelector(
                    '[data-biology-cells="near"]'
                ),

            dna:
                root.querySelector(
                    "[data-biology-dna]"
                ),

            spores:
                root.querySelector(
                    "[data-biology-spores]"
                ),

            bioluminescence:
                root.querySelector(
                    "[data-biology-bioluminescence]"
                ),

            pulses:
                root.querySelector(
                    "[data-biology-pulses]"
                )

        };

    }


    /* ==================================================
       CELL SYSTEM
    ================================================== */

    function buildCells(){

        createCellLayer(
            state.layers.cellsFar,
            CONFIG.cells.far,
            "far"
        );

        createCellLayer(
            state.layers.cellsMiddle,
            CONFIG.cells.middle,
            "middle"
        );

        createCellLayer(
            state.layers.cellsNear,
            CONFIG.cells.near,
            "near"
        );

    }


    function createCellLayer(
        layer,
        count,
        depth
    ){

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            const cell =
                document.createElement(
                    "span"
                );

            const cellType =
                randomItem([
                    "green",
                    "cyan",
                    "gold",
                    "violet"
                ]);

            const cellShape =
                randomItem([
                    "round",
                    "oval",
                    "organic"
                ]);

            cell.className = [
                "biology-cell",
                `biology-cell-${depth}`,
                `biology-cell-${cellType}`,
                `biology-cell-${cellShape}`
            ].join(" ");

            cell.style.setProperty(
                "--cell-x",
                `${random(-6, 104, 2)}%`
            );

            cell.style.setProperty(
                "--cell-y",
                `${random(-4, 104, 2)}%`
            );

            cell.style.setProperty(
                "--cell-size",
                `${getCellSize(depth)}px`
            );

            cell.style.setProperty(
                "--cell-opacity",
                random(
                    depth === "far"
                        ? .07
                        : .16,
                    depth === "near"
                        ? .56
                        : .34,
                    2
                )
            );

            cell.style.setProperty(
                "--cell-duration",
                `${random(28, 72, 2)}s`
            );

            cell.style.setProperty(
                "--cell-delay",
                `${random(-58, 0, 2)}s`
            );

            cell.style.setProperty(
                "--cell-drift-x",
                `${random(-90, 90, 2)}px`
            );

            cell.style.setProperty(
                "--cell-drift-y",
                `${random(-120, 120, 2)}px`
            );

            cell.style.setProperty(
                "--cell-rotation",
                `${random(-180, 180, 2)}deg`
            );

            cell.innerHTML = `

                <span class="biology-cell-membrane"></span>

                <span class="biology-cell-cytoplasm">

                    <span class="biology-cell-nucleus"></span>

                    <span class="biology-organelle biology-organelle-one"></span>

                    <span class="biology-organelle biology-organelle-two"></span>

                    <span class="biology-organelle biology-organelle-three"></span>

                    <span class="biology-organelle biology-organelle-four"></span>

                </span>

            `;

            fragment.appendChild(
                cell
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function getCellSize(depth){

        const ranges = {

            far: [
                28,
                55
            ],

            middle: [
                52,
                92
            ],

            near: [
                82,
                150
            ]

        };

        const range =
            ranges[depth];

        return random(
            range[0],
            range[1],
            2
        );

    }


    /* ==================================================
       DNA HELICES
    ================================================== */

    function buildDNAHelices(){

        const layer =
            state.layers.dna;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.dnaHelices;
            index += 1
        ){

            const helix =
                document.createElement(
                    "span"
                );

            helix.className =
                "biology-dna-helix";

            helix.style.setProperty(
                "--dna-x",
                `${random(-4, 98, 2)}%`
            );

            helix.style.setProperty(
                "--dna-y",
                `${random(-10, 96, 2)}%`
            );

            helix.style.setProperty(
                "--dna-scale",
                random(.52, 1.18, 2)
            );

            helix.style.setProperty(
                "--dna-opacity",
                random(.14, .48, 2)
            );

            helix.style.setProperty(
                "--dna-duration",
                `${random(28, 58, 2)}s`
            );

            helix.style.setProperty(
                "--dna-delay",
                `${random(-45, 0, 2)}s`
            );

            helix.style.setProperty(
                "--dna-rotation",
                `${random(-24, 24, 2)}deg`
            );

            helix.innerHTML =
                createDNAMarkup();

            fragment.appendChild(
                helix
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function createDNAMarkup(){

        let markup = `

            <span class="biology-dna-strand biology-dna-strand-left"></span>

            <span class="biology-dna-strand biology-dna-strand-right"></span>

        `;

        const rungCount = 12;

        for(
            let index = 0;
            index < rungCount;
            index += 1
        ){

            markup += `

                <span
                    class="biology-dna-rung"
                    style="
                        --dna-rung-index:${index};
                        --dna-rung-position:${(
                            index /
                            (
                                rungCount -
                                1
                            )
                        ) * 100}%;
                    ">
                </span>

            `;

        }

        return markup;

    }


    /* ==================================================
       SPORES AND POLLEN
    ================================================== */

    function buildSpores(){

        const layer =
            state.layers.spores;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.spores;
            index += 1
        ){

            const spore =
                document.createElement(
                    "span"
                );

            const sporeType =
                Math.random() > .76
                    ? "pollen"
                    : "spore";

            spore.className = [
                "biology-spore",
                `biology-${sporeType}`
            ].join(" ");

            spore.style.setProperty(
                "--spore-x",
                `${random(0, 100, 2)}%`
            );

            spore.style.setProperty(
                "--spore-y",
                `${random(0, 100, 2)}%`
            );

            spore.style.setProperty(
                "--spore-size",
                `${random(
                    sporeType === "pollen"
                        ? 5
                        : 2,
                    sporeType === "pollen"
                        ? 14
                        : 7,
                    2
                )}px`
            );

            spore.style.setProperty(
                "--spore-opacity",
                random(.12, .52, 2)
            );

            spore.style.setProperty(
                "--spore-duration",
                `${random(18, 48, 2)}s`
            );

            spore.style.setProperty(
                "--spore-delay",
                `${random(-42, 0, 2)}s`
            );

            spore.style.setProperty(
                "--spore-drift-x",
                `${random(-130, 130, 2)}px`
            );

            spore.style.setProperty(
                "--spore-drift-y",
                `${random(-180, 80, 2)}px`
            );

            fragment.appendChild(
                spore
            );

        }

        layer.appendChild(
            fragment
        );

    }


    /* ==================================================
       BIOLUMINESCENT PARTICLES
    ================================================== */

    function buildBioluminescentParticles(){

        const layer =
            state.layers.bioluminescence;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index <
                CONFIG.bioluminescentParticles;
            index += 1
        ){

            const particle =
                document.createElement(
                    "span"
                );

            const particleType =
                randomItem([
                    "green",
                    "cyan",
                    "gold"
                ]);

            particle.className = [
                "biology-bioluminescent-particle",
                `biology-light-${particleType}`
            ].join(" ");

            particle.style.setProperty(
                "--bio-light-x",
                `${random(0, 100, 2)}%`
            );

            particle.style.setProperty(
                "--bio-light-y",
                `${random(0, 100, 2)}%`
            );

            particle.style.setProperty(
                "--bio-light-size",
                `${random(1.5, 5.5, 2)}px`
            );

            particle.style.setProperty(
                "--bio-light-opacity",
                random(.25, .90, 2)
            );

            particle.style.setProperty(
                "--bio-light-duration",
                `${random(3.4, 10.5, 2)}s`
            );

            particle.style.setProperty(
                "--bio-light-delay",
                `${random(-10, 0, 2)}s`
            );

            particle.style.setProperty(
                "--bio-light-drift-x",
                `${random(-42, 42, 2)}px`
            );

            particle.style.setProperty(
                "--bio-light-drift-y",
                `${random(-56, 56, 2)}px`
            );

            fragment.appendChild(
                particle
            );

        }

        layer.appendChild(
            fragment
        );

    }


    /* ==================================================
       BIOLOGICAL PULSE EVENTS
    ================================================== */

    function scheduleBiologicalPulse(){

        clearPulseTimer();

        const delay =
            random(
                CONFIG.biologicalPulse.minimumDelay,
                CONFIG.biologicalPulse.maximumDelay
            );

        state.pulseTimer =
            window.setTimeout(
                () => {

                    createBiologicalPulse();

                    scheduleBiologicalPulse();

                },
                delay
            );

    }


    function createBiologicalPulse(){

        if(
            !state.layers.pulses ||
            state.reducedMotion ||
            document.hidden
        ){
            return;
        }

        const pulse =
            document.createElement(
                "span"
            );

        pulse.className =
            "biology-pulse";

        pulse.style.setProperty(
            "--pulse-x",
            `${random(10, 90, 2)}%`
        );

        pulse.style.setProperty(
            "--pulse-y",
            `${random(8, 88, 2)}%`
        );

        pulse.style.setProperty(
            "--pulse-size",
            `${random(110, 290, 2)}px`
        );

        pulse.style.setProperty(
            "--pulse-color",
            randomItem([
                "green",
                "cyan",
                "gold"
            ])
        );

        state.layers.pulses.appendChild(
            pulse
        );

        pulse.addEventListener(
            "animationend",
            () => {

                pulse.remove();

            },
            {
                once:true
            }
        );

        window.setTimeout(
            () => {

                pulse.remove();

            },
            2100
        );

    }


    /* ==================================================
       INTERACTION
    ================================================== */

    function installListeners(){

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            {
                passive:true
            }
        );

        window.addEventListener(
            "pointerleave",
            resetPointer,
            {
                passive:true
            }
        );

        window.addEventListener(
            "scroll",
            updateScrollPosition,
            {
                passive:true
            }
        );

        window.addEventListener(
            "resize",
            handleResize,
            {
                passive:true
            }
        );

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

    }


    function removeListeners(){

        window.removeEventListener(
            "pointermove",
            handlePointerMove
        );

        window.removeEventListener(
            "pointerleave",
            resetPointer
        );

        window.removeEventListener(
            "scroll",
            updateScrollPosition
        );

        window.removeEventListener(
            "resize",
            handleResize
        );

        document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

    }


    function handlePointerMove(event){

        state.targetPointerX =
            (
                event.clientX /
                Math.max(
                    state.width,
                    1
                )
            ) - .5;

        state.targetPointerY =
            (
                event.clientY /
                Math.max(
                    state.height,
                    1
                )
            ) - .5;

    }


    function resetPointer(){

        state.targetPointerX = 0;

        state.targetPointerY = 0;

    }


    function updateScrollPosition(){

        const maximumScroll =
            Math.max(
                document.documentElement
                    .scrollHeight -
                window.innerHeight,
                1
            );

        state.targetScroll =
            window.scrollY /
            maximumScroll;

    }


    function handleResize(){

        window.clearTimeout(
            state.resizeTimer
        );

        state.resizeTimer =
            window.setTimeout(
                () => {

                    state.width =
                        window.innerWidth;

                    state.height =
                        window.innerHeight;

                },
                120
            );

    }


    function handleVisibilityChange(){

        if(document.hidden){

            clearPulseTimer();

            return;

        }

        if(!state.reducedMotion){

            scheduleBiologicalPulse();

        }

    }


    /* ==================================================
       ANIMATION LOOP
    ================================================== */

    function startAnimationLoop(){

        stopAnimationLoop();

        const update =
            () => {

                if(!state.root){
                    return;
                }

                state.currentPointerX =
                    lerp(
                        state.currentPointerX,
                        state.targetPointerX,
                        CONFIG.parallax.easing
                    );

                state.currentPointerY =
                    lerp(
                        state.currentPointerY,
                        state.targetPointerY,
                        CONFIG.parallax.easing
                    );

                state.currentScroll =
                    lerp(
                        state.currentScroll,
                        state.targetScroll,
                        CONFIG.parallax.easing * .72
                    );

                state.root.style.setProperty(
                    "--biology-pointer-x",
                    state.currentPointerX
                );

                state.root.style.setProperty(
                    "--biology-pointer-y",
                    state.currentPointerY
                );

                state.root.style.setProperty(
                    "--biology-scroll-progress",
                    state.currentScroll
                );

                const heroFade =
                    clamp(
                        1 -
                        (
                            state.currentScroll *
                            4.6
                        ),
                        0,
                        1
                    );

                state.root.style.setProperty(
                    "--biology-hero-fade",
                    heroFade.toFixed(3)
                );

                state.animationFrame =
                    window.requestAnimationFrame(
                        update
                    );

            };

        state.animationFrame =
            window.requestAnimationFrame(
                update
            );

    }


    function stopAnimationLoop(){

        if(!state.animationFrame){
            return;
        }

        window.cancelAnimationFrame(
            state.animationFrame
        );

        state.animationFrame = null;

    }


    /* ==================================================
       CLEANUP
    ================================================== */

    function cleanup(){

        clearPulseTimer();

        stopAnimationLoop();

        removeListeners();

        window.clearTimeout(
            state.resizeTimer
        );

        const existing =
            document.getElementById(
                "biology-atmosphere"
            );

        if(existing){

            existing.remove();

        }

        document.body.classList.remove(
            "has-biology-atmosphere"
        );

        if(
            document.body.dataset.atmosphere ===
            "biology"
        ){

            delete document.body.dataset.atmosphere;

        }

        state.root = null;

        state.layers = {};

        state.initialized = false;

        state.targetPointerX = 0;

        state.targetPointerY = 0;

        state.currentPointerX = 0;

        state.currentPointerY = 0;

        state.targetScroll = 0;

        state.currentScroll = 0;

    }


    function clearPulseTimer(){

        if(!state.pulseTimer){
            return;
        }

        window.clearTimeout(
            state.pulseTimer
        );

        state.pulseTimer = null;

    }


    /* ==================================================
       UTILITIES
    ================================================== */

    function random(
        minimum,
        maximum,
        decimals = 0
    ){

        const value =
            Math.random() *
            (
                maximum -
                minimum
            ) +
            minimum;

        return Number(
            value.toFixed(
                decimals
            )
        );

    }


    function randomItem(items){

        return items[
            Math.floor(
                Math.random() *
                items.length
            )
        ];

    }


    function lerp(
        start,
        end,
        amount
    ){

        return start +
            (
                end -
                start
            ) *
            amount;

    }


    function clamp(
        value,
        minimum,
        maximum
    ){

        return Math.min(
            Math.max(
                value,
                minimum
            ),
            maximum
        );

    }


    /* ==================================================
       REGISTER MODULE
    ================================================== */

    window.FutureReadyExplore =
        window.FutureReadyExplore || {};

    if(
        !window.FutureReadyExplore
            .AtmosphereEngine
    ){

        console.error(
            "Future Ready Explore: atmosphere-engine.js must load before biology.js."
        );

        return;

    }

    window.FutureReadyExplore
        .AtmosphereEngine
        .register(
            "biology",
            BiologyAtmosphere
        );

})();