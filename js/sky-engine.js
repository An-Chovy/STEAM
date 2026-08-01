/*
==========================================================
 FUTURE READY
 SKY ENGINE V4
 Mobile-First Procedural Experience
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // ==================================================
    // HERO
    // ==================================================

    const hero = document.querySelector(".community-hero");

    if(!hero){
        console.warn("Sky Engine: .community-hero was not found.");
        return;
    }

    // Prevent duplicate canvases during testing.
    hero.querySelector(".sky-canvas")?.remove();

    // ==================================================
    // CANVAS
    // ==================================================

    const canvas = document.createElement("canvas");
    canvas.className = "sky-canvas";
    canvas.setAttribute("aria-hidden", "true");

    hero.prepend(canvas);

    const ctx = canvas.getContext("2d", {
        alpha:true,
        desynchronized:true
    });

    if(!ctx){
        console.warn("Sky Engine: Canvas is unavailable.");
        return;
    }

    // ==================================================
    // DEVICE PROFILE
    // ==================================================

    const media = {

        phone:window.matchMedia("(max-width: 600px)"),

        tablet:window.matchMedia(
            "(min-width: 601px) and (max-width: 1000px)"
        ),

        touch:window.matchMedia("(pointer: coarse)"),

        reducedMotion:window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        )

    };

    function createDeviceProfile(){

        const memory =
            navigator.deviceMemory || 4;

        const cores =
            navigator.hardwareConcurrency || 4;

        let performanceLevel = "high";

        if(memory <= 2 || cores <= 2){
            performanceLevel = "low";
        }
        else if(memory <= 4 || cores <= 4){
            performanceLevel = "medium";
        }

        return{

            phone:media.phone.matches,

            tablet:media.tablet.matches,

            touch:media.touch.matches,

            reducedMotion:media.reducedMotion.matches,

            portrait:
                window.innerHeight >= window.innerWidth,

            performanceLevel

        };

    }

    // ==================================================
    // ENGINE SETTINGS
    // ==================================================

    const SETTINGS = {

        desktopFPS:60,

        tabletFPS:45,

        phoneFPS:30,

        reducedMotionFPS:12,

        maximumPixelRatio:2,

        mobileMaximumPixelRatio:1.5,

        pauseOutsideHero:true,

        fadeInDuration:1600,

        starDensityDesktop:0.000115,

        starDensityTablet:0.000100,

        starDensityPhone:0.000085

    };

    // ==================================================
    // ENGINE STATE
    // ==================================================

    const Engine = {

        width:0,

        height:0,

        pixelRatio:1,

        time:0,

        delta:0,

        lastFrameTime:0,

        animationFrame:null,

        running:false,

        pageVisible:!document.hidden,

        heroVisible:true,

        device:createDeviceProfile(),

        universe:null,

        stars:[],

        dust:[],

        meteors:[],

        sparks:[],

        constellations:[],

        camera:{

            x:0,
            y:0,

            targetX:0,
            targetY:0

        }

    };

    // ==================================================
    // SEEDED RANDOM GENERATOR
    // ==================================================

    const universeSeed =
        Math.floor(Math.random() * 2147483646) + 1;

    let randomState = universeSeed;

    function random(){

        randomState =
            randomState * 16807 % 2147483647;

        return (
            randomState - 1
        ) / 2147483646;

    }

    function range(min,max){

        return min + random() * (max - min);

    }

    function chance(probability){

        return random() < probability;

    }

    function clamp(value,min,max){

        return Math.max(
            min,
            Math.min(max,value)
        );

    }

        // ==================================================
    // UNIVERSE GENERATOR
    // ==================================================

    function createUniverse(){

        const moods = [
            "calm",
            "deep",
            "crystal",
            "brilliant",
            "meteor",
            "dense"
        ];

        const mood =
            moods[Math.floor(random() * moods.length)];

        const universe = {

            seed:universeSeed,

            mood,

            density:range(.72,1.18),

            warmth:range(-1,1),

            activity:range(.25,1),

            atmosphere:range(.35,1),

            driftStrength:range(.35,1),

            flareChance:range(.04,.12),

            meteorFrequency:range(.65,1.35),

            constellationChance:range(.08,.22)

        };

        switch(mood){

            case "calm":
                universe.activity *= .55;
                universe.density *= .88;
                universe.atmosphere *= .80;
                break;

            case "deep":
                universe.density *= 1.08;
                universe.warmth -= .25;
                universe.atmosphere *= 1.15;
                break;

            case "crystal":
                universe.warmth -= .45;
                universe.flareChance *= 1.25;
                universe.atmosphere *= .72;
                break;

            case "brilliant":
                universe.density *= 1.12;
                universe.flareChance *= 1.6;
                universe.activity *= 1.15;
                break;

            case "meteor":
                universe.meteorFrequency *= 1.7;
                universe.activity *= 1.25;
                break;

            case "dense":
                universe.density *= 1.28;
                universe.atmosphere *= 1.2;
                break;
        }

        universe.density =
            clamp(universe.density,.55,1.5);

        universe.activity =
            clamp(universe.activity,.15,1.4);

        universe.atmosphere =
            clamp(universe.atmosphere,.2,1.4);

        universe.warmth =
            clamp(universe.warmth,-1,1);

        return universe;

    }

    Engine.universe = createUniverse();

    // ==================================================
    // PERFORMANCE PROFILE
    // ==================================================

    function getTargetFPS(){

        if(Engine.device.reducedMotion){
            return SETTINGS.reducedMotionFPS;
        }

        if(Engine.device.phone){
            return SETTINGS.phoneFPS;
        }

        if(Engine.device.tablet){
            return SETTINGS.tabletFPS;
        }

        return SETTINGS.desktopFPS;

    }

    function getDensitySetting(){

        if(Engine.device.phone){
            return SETTINGS.starDensityPhone;
        }

        if(Engine.device.tablet){
            return SETTINGS.starDensityTablet;
        }

        return SETTINGS.starDensityDesktop;

    }

    function getPerformanceMultiplier(){

        switch(Engine.device.performanceLevel){

            case "low":
                return .65;

            case "medium":
                return .82;

            default:
                return 1;

        }

    }

    function getPixelRatio(){

        const maximum =
            Engine.device.phone
                ? SETTINGS.mobileMaximumPixelRatio
                : SETTINGS.maximumPixelRatio;

        return Math.min(
            window.devicePixelRatio || 1,
            maximum
        );

    }

    // ==================================================
    // CANVAS RESIZE
    // ==================================================

    function resizeCanvas(){

        Engine.device = createDeviceProfile();

        Engine.width = hero.clientWidth;
        Engine.height = hero.clientHeight;

        Engine.pixelRatio = getPixelRatio();

        canvas.width =
            Math.max(
                1,
                Math.floor(
                    Engine.width * Engine.pixelRatio
                )
            );

        canvas.height =
            Math.max(
                1,
                Math.floor(
                    Engine.height * Engine.pixelRatio
                )
            );

        canvas.style.width =
            Engine.width + "px";

        canvas.style.height =
            Engine.height + "px";

        ctx.setTransform(
            Engine.pixelRatio,
            0,
            0,
            Engine.pixelRatio,
            0,
            0
        );

    }

    resizeCanvas();

    // ==================================================
    // FRAME TIMING
    // ==================================================

    function getFrameInterval(){

        return 1000 / getTargetFPS();

    }

    function shouldRender(timestamp){

        const interval = getFrameInterval();

        return (
            timestamp - Engine.lastFrameTime
        ) >= interval;

    }

    function updateFrameTiming(timestamp){

        const elapsed =
            Engine.lastFrameTime
                ? timestamp - Engine.lastFrameTime
                : getFrameInterval();

        Engine.delta =
            Math.min(elapsed / 1000,.05);

        Engine.time = timestamp / 1000;

        Engine.lastFrameTime = timestamp;

    }

    // ==================================================
    // DEBUG
    // ==================================================

    console.log("Sky Engine V4", {
        device:Engine.device,
        universe:Engine.universe,
        targetFPS:getTargetFPS()
    });

        // ==================================================
    // BASE SKY OBJECT
    // ==================================================

    class SkyObject{

        constructor(){

            this.x = 0;
            this.y = 0;

            this.depth = 0;

            this.opacity = 1;

            this.dead = false;

        }

        update(){

        }

        draw(){

        }

        destroy(){

            this.dead = true;

        }

        isVisible(){

            return(

                this.x > -200 &&

                this.x < Engine.width + 200 &&

                this.y > -200 &&

                this.y < Engine.height + 200

            );

        }

    }

        // ==================================================
    // STAR OBJECT
    // ==================================================

    class Star extends SkyObject{

        constructor(){

            super();

            this.generate();

        }

        generate(){

            this.depth = Math.pow(
                random(),
                1.8
            );

            this.x = range(
                0,
                Engine.width
            );

            if(chance(.46)){

                const band =
                    Engine.height *
                    range(.36,.60);

                this.y =
                    band +
                    range(
                        -Engine.height * .18,
                        Engine.height * .18
                    );

            }
            else{

                this.y = range(
                    0,
                    Engine.height
                );

            }

            this.radius =
                .35 +
                this.depth * 2.4;

            this.baseAlpha =
                .15 +
                this.depth * .82;

            this.alpha = this.baseAlpha;

            this.twinkleSpeed = range(
                .35,
                1.25
            );

            this.phase = range(
                0,
                Math.PI * 2
            );

            // ----------------------------------
            // Color Temperature
            // ----------------------------------

            const warmth =
                Engine.universe.warmth;

            const roll =
                random() +
                warmth * .12;

            if(roll < .72){

                this.color =
                    "255,255,255";

            }
            else if(roll < .90){

                this.color =
                    "220,235,255";

            }
            else{

                this.color =
                    "255,238,218";

            }

        }

        update(){

            this.alpha =
                this.baseAlpha +
                Math.sin(
                    Engine.time *
                    this.twinkleSpeed +
                    this.phase
                ) * .08;

            this.alpha = clamp(
                this.alpha,
                .05,
                1
            );

        }

        draw(){

            ctx.save();

            ctx.shadowBlur =
                this.radius * 5;

            ctx.shadowColor =
                `rgba(${this.color},${this.alpha})`;

            ctx.beginPath();

            ctx.fillStyle =
                `rgba(${this.color},${this.alpha})`;

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();

        }

    }

            // ==================================================
    // INSERT BLOCK 4 BELOW THIS LINE
    // ==================================================

    Engine.scene = {

        stars:[],

        dust:[],

        meteors:[],

        sparks:[],

        constellations:[]

    };

    // ==================================================
    // BUILD STAR FIELD
    // ==================================================

    function buildStarField(){

        Engine.scene.stars.length = 0;

        //--------------------------------------------------
        // Number of stars depends on:
        //
        // • Hero size
        // • Device
        // • Performance
        // • Universe density
        //--------------------------------------------------

        const density =
            getDensitySetting();

        const performance =
            getPerformanceMultiplier();

        const total = Math.floor(

            Engine.width *

            Engine.height *

            density *

            Engine.universe.density *

            performance

        );

        for(let i=0;i<total;i++){

            Engine.scene.stars.push(

                new Star()

            );

        }

        console.log(

            "Stars Generated:",

            total

        );

    }

    buildStarField();

    // ==================================================
    // STAR RENDERER
    // ==================================================

    function renderStars(){

        for(const star of Engine.scene.stars){

            star.update();

            star.draw();

        }

    }

        // ==================================================
    // CAMERA
    // ==================================================

    function updateCamera(){

        const drift =
            Engine.universe.driftStrength;

        Engine.camera.targetX =
            Math.sin(Engine.time * .045) *
            2.5 *
            drift;

        Engine.camera.targetY =
            Math.cos(Engine.time * .035) *
            2 *
            drift;

        Engine.camera.x +=
            (
                Engine.camera.targetX -
                Engine.camera.x
            ) * .015;

        Engine.camera.y +=
            (
                Engine.camera.targetY -
                Engine.camera.y
            ) * .015;

    }

    // ==================================================
    // SCENE UPDATE
    // ==================================================

    function updateScene(){

        updateCamera();

        for(const star of Engine.scene.stars){

            star.update();

        }

    }

    // ==================================================
    // SCENE RENDER
    // ==================================================

    function renderScene(){

        ctx.clearRect(
            0,
            0,
            Engine.width,
            Engine.height
        );

        ctx.save();

        ctx.translate(
            Engine.camera.x,
            Engine.camera.y
        );

        for(const star of Engine.scene.stars){

            star.draw();

        }

        ctx.restore();

    }

    // ==================================================
    // MASTER ANIMATION LOOP
    // ==================================================

    function animate(timestamp){

        Engine.animationFrame =
            requestAnimationFrame(animate);

        if(
            !Engine.running ||
            !Engine.pageVisible ||
            !Engine.heroVisible
        ){
            return;
        }

        if(!shouldRender(timestamp)){
            return;
        }

        updateFrameTiming(timestamp);

        updateScene();

        renderScene();

    }

    // ==================================================
    // PAGE VISIBILITY
    // ==================================================

    document.addEventListener(
        "visibilitychange",
        function(){

            Engine.pageVisible =
                !document.hidden;

            if(Engine.pageVisible){

                Engine.lastFrameTime = 0;

            }

        }
    );

    // ==================================================
    // HERO VISIBILITY
    // ==================================================

    if(
        SETTINGS.pauseOutsideHero &&
        "IntersectionObserver" in window
    ){

        const heroObserver =
            new IntersectionObserver(
                function(entries){

                    const entry = entries[0];

                    Engine.heroVisible =
                        entry.isIntersecting;

                    if(Engine.heroVisible){

                        Engine.lastFrameTime = 0;

                    }

                },
                {
                    threshold:.01
                }
            );

        heroObserver.observe(hero);

    }

    // ==================================================
    // RESIZE HANDLING
    // ==================================================

    let resizeTimer = null;

    window.addEventListener(
        "resize",
        function(){

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                function(){

                    resizeCanvas();

                    buildStarField();

                    Engine.lastFrameTime = 0;

                },
                180
            );

        },
        {
            passive:true
        }
    );

    // ==================================================
    // REDUCED-MOTION CHANGES
    // ==================================================

    function refreshDeviceProfile(){

        Engine.device =
            createDeviceProfile();

        resizeCanvas();

        buildStarField();

        Engine.lastFrameTime = 0;

    }

    if(media.reducedMotion.addEventListener){

        media.reducedMotion.addEventListener(
            "change",
            refreshDeviceProfile
        );

    }

    // ==================================================
    // START ENGINE
    // ==================================================

    Engine.running = true;

    canvas.style.opacity = "0";

    canvas.style.transition =
        `opacity ${SETTINGS.fadeInDuration}ms ease`;

    requestAnimationFrame(function(){

        canvas.style.opacity = "1";

    });

    requestAnimationFrame(animate);

});