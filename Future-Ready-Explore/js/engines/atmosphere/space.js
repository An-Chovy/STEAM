/*
==========================================================
 FUTURE READY EXPLORE
 Space Atmosphere
 Cinematic Experience Engine
 Version 3.0.0
==========================================================
*/

(() => {

    "use strict";


    /* ==================================================
       CONFIGURATION
    ================================================== */

    const CONFIG = {

        stars: {

            far: 420,

            middle: 190,

            near: 58,

            hero: 14

        },

        meteors: {

            minimumDelay: 2600,

            maximumDelay: 6800,

            minimumDuration: 700,

            maximumDuration: 1450,

            minimumLength: 120,

            maximumLength: 310,

            maximumActive: 3

        },

        parallax: {

            pointerStrength: 24,

            scrollStrength: 34,

            easing: .065

        },

        constellations: {

            count: 5,

            minimumStars: 4,

            maximumStars: 7

        }

    };


    /* ==================================================
       STATE
    ================================================== */

    const state = {

        root: null,

        layers: {},

        meteorTimer: null,

        activeMeteors: new Set(),

        animationFrame: null,

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
       MODULE
    ================================================== */

    const SpaceAtmosphere = {

        initialize(world){

            destroyExistingAtmosphere();

            state.reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

            state.width =
                window.innerWidth;

            state.height =
                window.innerHeight;

            buildAtmosphere();

            buildStars();

            buildConstellationHints();

            installListeners();

            updateViewportState();

            if(!state.reducedMotion){

                scheduleMeteor();

                startAnimationLoop();

            }

            document.body.classList.add(
                "has-space-atmosphere"
            );

            document.body.dataset.atmosphere =
                "space";

            state.initialized = true;

            console.log(
                `Future Ready Explore: cinematic Space atmosphere initialized for ${world.title}.`
            );

        },


        destroy(){

            cleanup();

        }

    };


    /* ==================================================
       BUILD ROOT
    ================================================== */

    function buildAtmosphere(){

        const root =
            document.createElement(
                "div"
            );

        root.id =
            "space-atmosphere";

        root.className =
            "space-atmosphere-v3";

        root.setAttribute(
            "aria-hidden",
            "true"
        );

        root.innerHTML = `

            <div class="space-sky-base"></div>

            <div class="space-horizon-glow"></div>

            <div class="space-milky-way">
                <div class="space-milky-way-core"></div>
                <div class="space-milky-way-dust"></div>
            </div>

            <div class="space-nebula-cloud space-nebula-cloud-one"></div>
            <div class="space-nebula-cloud space-nebula-cloud-two"></div>
            <div class="space-nebula-cloud space-nebula-cloud-three"></div>

            <div
                class="space-star-layer space-stars-far"
                data-space-stars="far">
            </div>

            <div
                class="space-star-layer space-stars-middle"
                data-space-stars="middle">
            </div>

            <div
                class="space-star-layer space-stars-near"
                data-space-stars="near">
            </div>

            <div
                class="space-star-layer space-stars-hero"
                data-space-stars="hero">
            </div>

            <svg
                class="space-constellation-layer"
                data-space-constellations
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                aria-hidden="true">
            </svg>

            <div
    class="space-meteor-layer"
    data-space-meteors>
</div>

<div class="space-hero-scenery">

    <div class="space-planet-system">

        <div class="space-planet-glow"></div>

        <div class="space-planet">

            <div class="space-planet-surface"></div>

            <div class="space-planet-clouds"></div>

            <div class="space-planet-night"></div>

            <div class="space-planet-rim"></div>

        </div>

        </div>

        </div>

            <div class="space-vignette"></div>

            <div class="space-film-grain"></div>

        `;

        document.body.prepend(
            root
        );

        state.root =
            root;

        state.layers = {

            far:
                root.querySelector(
                    '[data-space-stars="far"]'
                ),

            middle:
                root.querySelector(
                    '[data-space-stars="middle"]'
                ),

            near:
                root.querySelector(
                    '[data-space-stars="near"]'
                ),

            hero:
                root.querySelector(
                    '[data-space-stars="hero"]'
                ),

            constellations:
                root.querySelector(
                    "[data-space-constellations]"
                ),

            meteors:
                root.querySelector(
                    "[data-space-meteors]"
                )

        };

    }


    /* ==================================================
       STAR SYSTEM
    ================================================== */

    function buildStars(){

        createStars(
            state.layers.far,
            CONFIG.stars.far,
            "far"
        );

        createStars(
            state.layers.middle,
            CONFIG.stars.middle,
            "middle"
        );

        createStars(
            state.layers.near,
            CONFIG.stars.near,
            "near"
        );

        createStars(
            state.layers.hero,
            CONFIG.stars.hero,
            "hero"
        );

    }


    function createStars(
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

            const star =
                document.createElement(
                    "span"
                );

            const profile =
                createStarProfile(
                    depth
                );

            star.className = [
                "space-star",
                `space-star-${profile.type}`,
                profile.flare
                    ? "space-star-flare"
                    : ""
            ]
                .filter(Boolean)
                .join(" ");

            star.style.setProperty(
                "--star-x",
                `${random(0, 100, 3)}%`
            );

            star.style.setProperty(
                "--star-y",
                `${random(0, 100, 3)}%`
            );

            star.style.setProperty(
                "--star-size",
                `${profile.size}px`
            );

            star.style.setProperty(
                "--star-opacity",
                profile.opacity
            );

            star.style.setProperty(
                "--star-temperature",
                profile.temperature
            );

            star.style.setProperty(
                "--star-twinkle-duration",
                `${profile.twinkleDuration}s`
            );

            star.style.setProperty(
                "--star-twinkle-delay",
                `${random(-12, 0, 2)}s`
            );

            star.style.setProperty(
                "--star-drift-duration",
                `${random(45, 110, 2)}s`
            );

            star.style.setProperty(
                "--star-pulse-scale",
                profile.pulseScale
            );

            fragment.appendChild(
                star
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function createStarProfile(depth){

        const roll =
            Math.random();

        let type =
            "white";

        let temperature =
            "255,255,255";

        if(roll < .08){

            type =
                "cool";

            temperature =
                "178,214,255";

        }
        else if(roll > .94){

            type =
                "warm";

            temperature =
                "255,224,190";

        }

        const ranges = {

    far: {
            minimumSize: .55,
            maximumSize: 1.05,
            minimumOpacity: .22,
            maximumOpacity: .62
        },

        middle: {
            minimumSize: .85,
            maximumSize: 1.65,
            minimumOpacity: .34,
            maximumOpacity: .82
        },

        near: {
            minimumSize: 1.15,
            maximumSize: 2.25,
            minimumOpacity: .50,
            maximumOpacity: .95
        },

        hero: {
            minimumSize: 1.8,
            maximumSize: 3.2,
            minimumOpacity: .66,
            maximumOpacity: 1
        }

        };

        const range =
            ranges[depth];

        const flare =
            depth !== "far" &&
            Math.random() < (
                depth === "hero"
                    ? .14
                    : .025
            );

        return {

            type,

            temperature,

            flare,

            size:
                random(
                    range.minimumSize,
                    range.maximumSize,
                    2
                ),

            opacity:
                random(
                    range.minimumOpacity,
                    range.maximumOpacity,
                    2
                ),

            twinkleDuration:
                random(
                    depth === "far"
                        ? 5
                        : 2.6,
                    depth === "hero"
                        ? 7
                        : 10,
                    2
                ),

            pulseScale:
                random(
                    1.05,
                    depth === "hero"
                        ? 1.45
                        : 1.24,
                    2
                )

        };

    }


    /* ==================================================
       SUBTLE CONSTELLATION HINTS
    ================================================== */

    function buildConstellationHints(){

        const svg =
            state.layers.constellations;

        if(!svg){
            return;
        }

        const namespace =
            "http://www.w3.org/2000/svg";

        for(
            let index = 0;
            index < CONFIG.constellations.count;
            index += 1
        ){

            const group =
                document.createElementNS(
                    namespace,
                    "g"
                );

            group.classList.add(
                "space-constellation"
            );

            group.style.setProperty(
                "--constellation-opacity",
                random(.025, .075, 3)
            );

            group.style.setProperty(
                "--constellation-duration",
                `${random(16, 32, 2)}s`
            );

            group.style.setProperty(
                "--constellation-delay",
                `${random(-20, 0, 2)}s`
            );

            const points =
                createConstellationPoints();

            const path =
                document.createElementNS(
                    namespace,
                    "path"
                );

            path

            group.appendChild(
                path
            );

            for(const point of points){

                const circle =
                    document.createElementNS(
                        namespace,
                        "circle"
                    );

                circle.setAttribute(
                    "cx",
                    point.x
                );

                circle.setAttribute(
                    "cy",
                    point.y
                );

                circle.setAttribute(
                    "r",
                    random(1.2, 2.2, 2)
                );

                circle.setAttribute(
                    "fill",
                    "currentColor"
                );

                circle.classList.add(
                    "space-constellation-star"
                );

                group.appendChild(
                    circle
                );

            }

            svg.appendChild(
                group
            );

        }

    }


    function createConstellationPoints(){

        const pointCount =
            Math.round(
                random(
                    CONFIG.constellations.minimumStars,
                    CONFIG.constellations.maximumStars
                )
            );

        const startX =
            random(80, 820);

        const startY =
            random(80, 820);

        const points = [];

        let x =
            startX;

        let y =
            startY;

        for(
            let index = 0;
            index < pointCount;
            index += 1
        ){

            points.push({
                x:
                    clamp(
                        x,
                        20,
                        980
                    ),
                y:
                    clamp(
                        y,
                        20,
                        980
                    )
            });

            x +=
                random(
                    35,
                    110
                );

            y +=
                random(
                    -90,
                    100
                );

        }

        return points;

    }


    function pointsToPath(points){

        if(!points.length){
            return "";
        }

        return points
            .map(
                (point, index) => {

                    const command =
                        index === 0
                            ? "M"
                            : "L";

                    return `${command} ${point.x} ${point.y}`;

                }
            )
            .join(" ");

    }


    /* ==================================================
       METEOR SYSTEM
    ================================================== */

    function scheduleMeteor(){

        clearMeteorTimer();

        if(
            state.reducedMotion ||
            !state.initialized &&
            !state.root
        ){
            return;
        }

        const delay =
            random(
                CONFIG.meteors.minimumDelay,
                CONFIG.meteors.maximumDelay
            );

        state.meteorTimer =
            window.setTimeout(
                () => {

                    const burstChance =
                        Math.random();

                    createMeteor();

                    if(burstChance > .82){

                        window.setTimeout(
                            createMeteor,
                            random(
                                240,
                                740
                            )
                        );

                    }

                    scheduleMeteor();

                },
                delay
            );

    }


    function createMeteor(){

        if(
            !state.layers.meteors ||
            document.hidden ||
            state.activeMeteors.size >=
                CONFIG.meteors.maximumActive
        ){
            return;
        }

        const meteor =
            document.createElement(
                "span"
            );

        const duration =
            random(
                CONFIG.meteors.minimumDuration,
                CONFIG.meteors.maximumDuration
            );

        const direction =
            Math.random() > .22
                ? "down-left"
                : "down-right";

        const isHeroMeteor =
            Math.random() < .18;

        meteor.className = [
            "space-meteor",
            `space-meteor-${direction}`,
            isHeroMeteor
                ? "space-meteor-hero"
                : ""
        ]
            .filter(Boolean)
            .join(" ");

        const startX =
            direction === "down-left"
                ? random(35, 108)
                : random(-8, 62);

        meteor.style.setProperty(
            "--meteor-start-x",
            `${startX}vw`
        );

        meteor.style.setProperty(
            "--meteor-start-y",
            `${random(-14, 56)}vh`
        );

        meteor.style.setProperty(
            "--meteor-length",
            `${random(
                CONFIG.meteors.minimumLength,
                isHeroMeteor
                    ? CONFIG.meteors.maximumLength * 1.25
                    : CONFIG.meteors.maximumLength
            )}px`
        );

        meteor.style.setProperty(
            "--meteor-distance-x",
            `${random(
                isHeroMeteor
                    ? 520
                    : 280,
                isHeroMeteor
                    ? 940
                    : 650
            )}px`
        );

        meteor.style.setProperty(
            "--meteor-distance-y",
            `${random(
                isHeroMeteor
                    ? 360
                    : 220,
                isHeroMeteor
                    ? 720
                    : 520
            )}px`
        );

        meteor.style.setProperty(
            "--meteor-duration",
            `${duration}ms`
        );

        meteor.style.setProperty(
            "--meteor-thickness",
            `${random(
                isHeroMeteor
                    ? 2
                    : 1,
                isHeroMeteor
                    ? 3.2
                    : 2.2,
                2
            )}px`
        );

        meteor.style.setProperty(
            "--meteor-angle",
            `${random(28, 43, 2)}deg`
        );

        state.activeMeteors.add(
            meteor
        );

        state.layers.meteors.appendChild(
            meteor
        );

        const removeMeteor =
            () => {

                meteor.remove();

                state.activeMeteors.delete(
                    meteor
                );

            };

        meteor.addEventListener(
            "animationend",
            removeMeteor,
            {
                once:true
            }
        );

        window.setTimeout(
            removeMeteor,
            duration + 500
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
            handlePointerLeave,
            {
                passive:true
            }
        );

        window.addEventListener(
            "scroll",
            updateViewportState,
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
            handlePointerLeave
        );

        window.removeEventListener(
            "scroll",
            updateViewportState
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


    function handlePointerLeave(){

        state.targetPointerX = 0;

        state.targetPointerY = 0;

    }


    function updateViewportState(){

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

            clearMeteorTimer();

            return;

        }

        if(!state.reducedMotion){

            scheduleMeteor();

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
                    "--space-pointer-x",
                    state.currentPointerX
                );

                state.root.style.setProperty(
                    "--space-pointer-y",
                    state.currentPointerY
                );

                state.root.style.setProperty(
                    "--space-scroll-progress",
                    state.currentScroll
                );

                const heroFade =
    clamp(
        1 -
        (
            state.currentScroll *
            5
        ),
        0,
        1
    );

const planetShift =
    state.currentScroll *
    180;

state.root.style.setProperty(
    "--space-hero-fade",
    heroFade.toFixed(3)
);

state.root.style.setProperty(
    "--space-planet-shift",
    `${planetShift.toFixed(2)}px`
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

    function destroyExistingAtmosphere(){

        const existing =
            document.getElementById(
                "space-atmosphere"
            );

        if(existing){

            existing.remove();

        }

        cleanup(
            false
        );

    }


    function cleanup(removeRoot = true){

        clearMeteorTimer();

        stopAnimationLoop();

        removeListeners();

        window.clearTimeout(
            state.resizeTimer
        );

        for(
            const meteor of
            state.activeMeteors
        ){

            meteor.remove();

        }

        state.activeMeteors.clear();

        if(
            removeRoot &&
            state.root
        ){

            state.root.remove();

        }

        document.body.classList.remove(
            "has-space-atmosphere"
        );

        delete document.body.dataset.atmosphere;

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


    function clearMeteorTimer(){

        if(!state.meteorTimer){
            return;
        }

        window.clearTimeout(
            state.meteorTimer
        );

        state.meteorTimer = null;

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
            "Future Ready Explore: atmosphere-engine.js must load before space.js."
        );

        return;

    }

    window.FutureReadyExplore
        .AtmosphereEngine
        .register(
            "space",
            SpaceAtmosphere
        );

})();