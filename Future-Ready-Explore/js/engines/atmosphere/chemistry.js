/*
==========================================================
 FUTURE READY EXPLORE
 Chemistry Atmosphere
 Interactive Molecular Environment
 Version 1.0.0
==========================================================
*/

(() => {

    "use strict";


    /* ==================================================
       CONFIGURATION
    ================================================== */

    const CONFIG = {

        atoms: {
            far: 28,
            middle: 18,
            near: 10
        },

        molecules: 12,

        bubbles: 34,

        reactionFlash: {
            minimumDelay: 5000,
            maximumDelay: 11000
        },

        parallax: {
            easing: .07
        }

    };


    /* ==================================================
       STATE
    ================================================== */

    const state = {

        root: null,

        layers: {},

        animationFrame: null,

        reactionTimer: null,

        resizeTimer: null,

        reducedMotion: false,

        targetPointerX: 0,

        targetPointerY: 0,

        currentPointerX: 0,

        currentPointerY: 0,

        targetScroll: 0,

        currentScroll: 0,

        width: window.innerWidth,

        height: window.innerHeight,

        initialized: false

    };


    /* ==================================================
       MODULE
    ================================================== */

    const ChemistryAtmosphere = {

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

            buildAtoms();

            buildMolecules();

            buildBubbles();

            installListeners();

            updateScrollPosition();

            if(!state.reducedMotion){

                startAnimationLoop();

                scheduleReactionFlash();

            }

            document.body.classList.add(
                "has-chemistry-atmosphere"
            );

            document.body.dataset.atmosphere =
                "chemistry";

            state.initialized = true;

            console.log(
                `Future Ready Explore: Chemistry atmosphere initialized for ${world.title}.`
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
            "chemistry-atmosphere";

        root.className =
            "chemistry-atmosphere";

        root.setAttribute(
            "aria-hidden",
            "true"
        );

        root.innerHTML = `

            <div class="chemistry-background"></div>

            <div class="chemistry-lab-glow chemistry-lab-glow-one"></div>

            <div class="chemistry-lab-glow chemistry-lab-glow-two"></div>

            <div class="chemistry-vapor chemistry-vapor-one"></div>

            <div class="chemistry-vapor chemistry-vapor-two"></div>

            <div
                class="chemistry-atom-layer chemistry-atoms-far"
                data-chemistry-atoms="far">
            </div>

            <div
                class="chemistry-atom-layer chemistry-atoms-middle"
                data-chemistry-atoms="middle">
            </div>

            <div
                class="chemistry-atom-layer chemistry-atoms-near"
                data-chemistry-atoms="near">
            </div>

            <div
                class="chemistry-molecule-layer"
                data-chemistry-molecules>
            </div>

            <div
                class="chemistry-bubble-layer"
                data-chemistry-bubbles>
            </div>

            <div
                class="chemistry-reaction-layer"
                data-chemistry-reaction>
            </div>

            <div class="chemistry-glass-reflection"></div>

            <div class="chemistry-vignette"></div>

        `;

        document.body.prepend(
            root
        );

        state.root =
            root;

        state.layers = {

            atomsFar:
                root.querySelector(
                    '[data-chemistry-atoms="far"]'
                ),

            atomsMiddle:
                root.querySelector(
                    '[data-chemistry-atoms="middle"]'
                ),

            atomsNear:
                root.querySelector(
                    '[data-chemistry-atoms="near"]'
                ),

            molecules:
                root.querySelector(
                    "[data-chemistry-molecules]"
                ),

            bubbles:
                root.querySelector(
                    "[data-chemistry-bubbles]"
                ),

            reaction:
                root.querySelector(
                    "[data-chemistry-reaction]"
                )

        };

    }


    /* ==================================================
       ATOMS
    ================================================== */

    function buildAtoms(){

        createAtomLayer(
            state.layers.atomsFar,
            CONFIG.atoms.far,
            "far"
        );

        createAtomLayer(
            state.layers.atomsMiddle,
            CONFIG.atoms.middle,
            "middle"
        );

        createAtomLayer(
            state.layers.atomsNear,
            CONFIG.atoms.near,
            "near"
        );

    }


    function createAtomLayer(
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

            const atom =
                document.createElement(
                    "span"
                );

            const atomType =
                randomItem([
                    "cyan",
                    "violet",
                    "white",
                    "green"
                ]);

            atom.className = [
                "chemistry-atom",
                `chemistry-atom-${depth}`,
                `chemistry-atom-${atomType}`
            ].join(" ");

            atom.style.setProperty(
                "--atom-x",
                `${random(0, 100, 2)}%`
            );

            atom.style.setProperty(
                "--atom-y",
                `${random(0, 100, 2)}%`
            );

            atom.style.setProperty(
                "--atom-size",
                `${getAtomSize(depth)}px`
            );

            atom.style.setProperty(
                "--atom-opacity",
                random(
                    depth === "far"
                        ? .10
                        : .24,
                    depth === "near"
                        ? .72
                        : .48,
                    2
                )
            );

            atom.style.setProperty(
                "--atom-duration",
                `${random(18, 48, 2)}s`
            );

            atom.style.setProperty(
                "--atom-delay",
                `${random(-35, 0, 2)}s`
            );

            atom.style.setProperty(
                "--atom-drift-x",
                `${random(-70, 70, 2)}px`
            );

            atom.style.setProperty(
                "--atom-drift-y",
                `${random(-90, 90, 2)}px`
            );

            atom.innerHTML = `

                <span class="chemistry-nucleus"></span>

                <span class="chemistry-orbit chemistry-orbit-one">
                    <span class="chemistry-electron"></span>
                </span>

                <span class="chemistry-orbit chemistry-orbit-two">
                    <span class="chemistry-electron"></span>
                </span>

                <span class="chemistry-orbit chemistry-orbit-three">
                    <span class="chemistry-electron"></span>
                </span>

            `;

            fragment.appendChild(
                atom
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function getAtomSize(depth){

        const ranges = {

            far: [
                18,
                36
            ],

            middle: [
                30,
                56
            ],

            near: [
                48,
                88
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
       MOLECULES
    ================================================== */

    function buildMolecules(){

        const layer =
            state.layers.molecules;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.molecules;
            index += 1
        ){

            const molecule =
                document.createElement(
                    "span"
                );

            const moleculeType =
                Math.random() > .5
                    ? "bent"
                    : "linear";

            molecule.className = [
                "chemistry-molecule",
                `chemistry-molecule-${moleculeType}`
            ].join(" ");

            molecule.style.setProperty(
                "--molecule-x",
                `${random(-5, 102, 2)}%`
            );

            molecule.style.setProperty(
                "--molecule-y",
                `${random(0, 100, 2)}%`
            );

            molecule.style.setProperty(
                "--molecule-scale",
                random(.46, 1.12, 2)
            );

            molecule.style.setProperty(
                "--molecule-opacity",
                random(.16, .62, 2)
            );

            molecule.style.setProperty(
                "--molecule-duration",
                `${random(24, 62, 2)}s`
            );

            molecule.style.setProperty(
                "--molecule-delay",
                `${random(-45, 0, 2)}s`
            );

            molecule.style.setProperty(
                "--molecule-rotation",
                `${random(-180, 180, 2)}deg`
            );

            molecule.innerHTML =
                moleculeType === "bent"
                    ? createBentMoleculeMarkup()
                    : createLinearMoleculeMarkup();

            fragment.appendChild(
                molecule
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function createBentMoleculeMarkup(){

        return `

            <span class="chemistry-bond chemistry-bond-left"></span>

            <span class="chemistry-bond chemistry-bond-right"></span>

            <span class="chemistry-molecule-node chemistry-node-center"></span>

            <span class="chemistry-molecule-node chemistry-node-left"></span>

            <span class="chemistry-molecule-node chemistry-node-right"></span>

        `;

    }


    function createLinearMoleculeMarkup(){

        return `

            <span class="chemistry-bond chemistry-bond-linear-one"></span>

            <span class="chemistry-bond chemistry-bond-linear-two"></span>

            <span class="chemistry-molecule-node chemistry-node-linear-one"></span>

            <span class="chemistry-molecule-node chemistry-node-linear-two"></span>

            <span class="chemistry-molecule-node chemistry-node-linear-three"></span>

        `;

    }


    /* ==================================================
       BUBBLES
    ================================================== */

    function buildBubbles(){

        const layer =
            state.layers.bubbles;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.bubbles;
            index += 1
        ){

            const bubble =
                document.createElement(
                    "span"
                );

            bubble.className =
                "chemistry-bubble";

            bubble.style.setProperty(
                "--bubble-x",
                `${random(0, 100, 2)}%`
            );

            bubble.style.setProperty(
                "--bubble-size",
                `${random(4, 24, 2)}px`
            );

            bubble.style.setProperty(
                "--bubble-duration",
                `${random(10, 28, 2)}s`
            );

            bubble.style.setProperty(
                "--bubble-delay",
                `${random(-26, 0, 2)}s`
            );

            bubble.style.setProperty(
                "--bubble-opacity",
                random(.08, .34, 2)
            );

            bubble.style.setProperty(
                "--bubble-sway",
                `${random(-90, 90, 2)}px`
            );

            fragment.appendChild(
                bubble
            );

        }

        layer.appendChild(
            fragment
        );

    }


    /* ==================================================
       REACTION FLASH
    ================================================== */

    function scheduleReactionFlash(){

        clearReactionTimer();

        const delay =
            random(
                CONFIG.reactionFlash.minimumDelay,
                CONFIG.reactionFlash.maximumDelay
            );

        state.reactionTimer =
            window.setTimeout(
                () => {

                    createReactionFlash();

                    scheduleReactionFlash();

                },
                delay
            );

    }


    function createReactionFlash(){

        if(
            !state.layers.reaction ||
            document.hidden ||
            state.reducedMotion
        ){
            return;
        }

        const flash =
            document.createElement(
                "span"
            );

        flash.className =
            "chemistry-reaction-flash";

        flash.style.setProperty(
            "--reaction-x",
            `${random(12, 92, 2)}%`
        );

        flash.style.setProperty(
            "--reaction-y",
            `${random(10, 88, 2)}%`
        );

        flash.style.setProperty(
            "--reaction-size",
            `${random(110, 270, 2)}px`
        );

        flash.style.setProperty(
            "--reaction-hue",
            randomItem([
                "cyan",
                "violet",
                "green"
            ])
        );

        state.layers.reaction.appendChild(
            flash
        );

        flash.addEventListener(
            "animationend",
            () => {

                flash.remove();

            },
            {
                once:true
            }
        );

        window.setTimeout(
            () => {

                flash.remove();

            },
            1800
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

            clearReactionTimer();

            return;

        }

        if(!state.reducedMotion){

            scheduleReactionFlash();

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
                    "--chemistry-pointer-x",
                    state.currentPointerX
                );

                state.root.style.setProperty(
                    "--chemistry-pointer-y",
                    state.currentPointerY
                );

                state.root.style.setProperty(
                    "--chemistry-scroll-progress",
                    state.currentScroll
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

        clearReactionTimer();

        stopAnimationLoop();

        removeListeners();

        window.clearTimeout(
            state.resizeTimer
        );

        const existing =
            document.getElementById(
                "chemistry-atmosphere"
            );

        if(existing){

            existing.remove();

        }

        document.body.classList.remove(
            "has-chemistry-atmosphere"
        );

        if(
            document.body.dataset.atmosphere ===
            "chemistry"
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


    function clearReactionTimer(){

        if(!state.reactionTimer){
            return;
        }

        window.clearTimeout(
            state.reactionTimer
        );

        state.reactionTimer = null;

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


    /* ==================================================
       REGISTER
    ================================================== */

    window.FutureReadyExplore =
        window.FutureReadyExplore || {};

    if(
        !window.FutureReadyExplore
            .AtmosphereEngine
    ){

        console.error(
            "Future Ready Explore: atmosphere-engine.js must load before chemistry.js."
        );

        return;

    }

    window.FutureReadyExplore
        .AtmosphereEngine
        .register(
            "chemistry",
            ChemistryAtmosphere
        );

})();