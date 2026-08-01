/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE
 Version 1.0.0

 Mobile-first procedural animation system.

 Modules
 ✓ Core Foundation
 □ Universe Generator
 □ Scene and Renderer
 □ Stars
 □ Atmosphere
 □ Meteors and Sparks
 □ Camera and Interaction
 □ Mobile Intelligence
 □ Performance Management
 □ Accessibility
 □ Page Themes
 □ Startup
==========================================================
*/

(() => {

    "use strict";

    // ==================================================
    // GLOBAL SETTINGS
    // ==================================================

    const SETTINGS = {

        // Canvas quality
        maximumPixelRatio: 2,
        mobilePixelRatio: 1.5,

        // Frame rates
        desktopFPS: 60,
        tabletFPS: 45,
        phoneFPS: 30,
        reducedMotionFPS: 12,

        // Visibility and loading
        fadeInDuration: 1600,
        pauseOutsideViewport: true,

        // Star density is calculated from canvas area
        desktopStarDensity: 0.000115,
        tabletStarDensity: 0.000100,
        phoneStarDensity: 0.000085,

        // Mobile-first limits
        maximumPhoneStars: 150,
        maximumTabletStars: 230,
        maximumDesktopStars: 340,

        // Primary page targets
        selectors: [
            "[data-sky-engine]",
            ".community-hero"
        ]

    };

    // ==================================================
    // MEDIA QUERIES
    // ==================================================

    const MEDIA = {

        phone:
            window.matchMedia("(max-width: 600px)"),

        tablet:
            window.matchMedia(
                "(min-width: 601px) and (max-width: 1000px)"
            ),

        touch:
            window.matchMedia("(pointer: coarse)"),

        reducedMotion:
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            )

    };

    // ==================================================
    // GENERAL UTILITIES
    // ==================================================

    function clamp(value, minimum, maximum){

        return Math.max(
            minimum,
            Math.min(maximum, value)
        );

    }

    function lerp(start, end, amount){

        return start + (end - start) * amount;

    }

    function choose(items, randomFunction = Math.random){

        return items[
            Math.floor(randomFunction() * items.length)
        ];

    }

    function findExperienceTargets(){

        const targets = [];

        for(const selector of SETTINGS.selectors){

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    if(!targets.includes(element)){
                        targets.push(element);
                    }

                });

        }

        return targets;

    }

    // ==================================================
    // DEVICE PROFILE
    // ==================================================

    function createDeviceProfile(){

        const memory =
            navigator.deviceMemory || 4;

        const processorCores =
            navigator.hardwareConcurrency || 4;

        let performanceLevel = "high";

        if(memory <= 2 || processorCores <= 2){

            performanceLevel = "low";

        }
        else if(memory <= 4 || processorCores <= 4){

            performanceLevel = "medium";

        }

        return {

            phone: MEDIA.phone.matches,

            tablet: MEDIA.tablet.matches,

            touch: MEDIA.touch.matches,

            reducedMotion:
                MEDIA.reducedMotion.matches,

            portrait:
                window.innerHeight >=
                window.innerWidth,

            performanceLevel

        };

    }

    // ==================================================
    // SEEDED RANDOM GENERATOR
    // ==================================================

    class SeededRandom {

        constructor(seed){

            this.seed =
                Math.max(
                    1,
                    Math.floor(seed) % 2147483647
                );

            this.state = this.seed;

        }

        next(){

            this.state =
                this.state * 16807 % 2147483647;

            return (
                this.state - 1
            ) / 2147483646;

        }

        range(minimum, maximum){

            return (
                minimum +
                this.next() *
                (maximum - minimum)
            );

        }

        chance(probability){

            return this.next() < probability;

        }

        choose(items){

            return choose(
                items,
                () => this.next()
            );

        }

    }

        // ==================================================
    // UNIVERSE GENERATOR
    //
    // Every page load creates one unique universe.
    // Everything else is derived from these values.
    // ==================================================

    class Universe{

        constructor(){

            this.seed =
                Date.now() +
                Math.floor(
                    Math.random() * 100000
                );

            this.random =
                new SeededRandom(
                    this.seed
                );

            this.build();

        }

        build(){

            //--------------------------------------------------
            // Overall personality
            //--------------------------------------------------

            this.mood =
                this.random.choose([

                    "calm",

                    "brilliant",

                    "deep",

                    "energetic",

                    "crystal",

                    "dream"

                ]);

            //--------------------------------------------------
            // Environmental values
            //--------------------------------------------------

            this.density =
                this.random.range(
                    .80,
                    1.20
                );

            this.activity =
                this.random.range(
                    .30,
                    1.00
                );

            this.atmosphere =
                this.random.range(
                    .35,
                    1.00
                );

            this.warmth =
                this.random.range(
                    -.8,
                    .8
                );

            this.cameraDrift =
                this.random.range(
                    .4,
                    1.0
                );

            this.twinkleStrength =
                this.random.range(
                    .6,
                    1.2
                );

            this.heroStarChance =
                this.random.range(
                    .002,
                    .007
                );

            this.meteorFrequency =
                this.random.range(
                    .7,
                    1.3
                );

            //--------------------------------------------------
            // Mood tuning
            //--------------------------------------------------

            switch(this.mood){

                case "calm":

                    this.activity *= .55;
                    this.atmosphere *= .85;

                break;

                case "deep":

                    this.density *= 1.12;
                    this.warmth -= .25;

                break;

                case "brilliant":

                    this.activity *= 1.25;
                    this.twinkleStrength *= 1.15;

                break;

                case "energetic":

                    this.activity *= 1.45;
                    this.meteorFrequency *= 1.30;

                break;

                case "crystal":

                    this.warmth -= .45;
                    this.atmosphere *= .75;

                break;

                case "dream":

                    this.atmosphere *= 1.30;
                    this.cameraDrift *= 1.15;

                break;

            }

            //--------------------------------------------------
            // Safety limits
            //--------------------------------------------------

            this.density =
                clamp(
                    this.density,
                    .6,
                    1.4
                );

            this.activity =
                clamp(
                    this.activity,
                    .2,
                    1.5
                );

            this.atmosphere =
                clamp(
                    this.atmosphere,
                    .2,
                    1.5
                );

            this.cameraDrift =
                clamp(
                    this.cameraDrift,
                    .25,
                    1.5
                );

        }

    }

    // ==================================================
    // EXPERIENCE ENGINE
    //
    // One engine can power multiple sections
    // across the website.
    // ==================================================

    class ExperienceEngine{

        constructor(root){

            this.root = root;

            this.device =
                createDeviceProfile();

            this.universe =
                new Universe();

            this.canvas = null;

            this.context = null;

            this.width = 0;

            this.height = 0;

            this.pixelRatio = 1;

            this.time = 0;

            this.delta = 0;

            this.lastFrame = 0;

            this.running = false;

            this.visible = true;

        }

    }

    // ==================================================
    // PART 3 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // CANVAS AND SCENE FOUNDATION
    // ==================================================

    ExperienceEngine.prototype.initializeCore = function(){

        this.scene = {
            atmosphere: [],
            stars: [],
            meteors: [],
            sparks: [],
            constellations: []
        };

        this.camera = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0
        };

        this.animationFrame = null;

        this.pageVisible = !document.hidden;
        this.rootVisible = true;

        this.resizeTimer = null;
        this.resizeObserver = null;
        this.visibilityObserver = null;

        this.createCanvas();
        this.resizeCanvas();
        this.installCoreListeners();

    };

    // Creates one transparent drawing layer inside the target.
    ExperienceEngine.prototype.createCanvas = function(){

        const existingCanvas =
            this.root.querySelector(
                ":scope > .sky-canvas"
            );

        if(existingCanvas){
            existingCanvas.remove();
        }

        this.canvas =
            document.createElement("canvas");

        this.canvas.className =
            "sky-canvas";

        this.canvas.setAttribute(
            "aria-hidden",
            "true"
        );

        this.root.prepend(
            this.canvas
        );

        this.context =
            this.canvas.getContext(
                "2d",
                {
                    alpha: true,
                    desynchronized: true
                }
            );

        if(!this.context){

            console.warn(
                "Experience Engine: Canvas is unavailable."
            );

        }

    };

    // ==================================================
    // DEVICE-ADAPTIVE VALUES
    // ==================================================

    ExperienceEngine.prototype.getTargetFPS = function(){

        if(this.device.reducedMotion){
            return SETTINGS.reducedMotionFPS;
        }

        if(this.device.phone){
            return SETTINGS.phoneFPS;
        }

        if(this.device.tablet){
            return SETTINGS.tabletFPS;
        }

        return SETTINGS.desktopFPS;

    };

    ExperienceEngine.prototype.getPixelRatio = function(){

        const maximumRatio =
            this.device.phone
                ? SETTINGS.mobilePixelRatio
                : SETTINGS.maximumPixelRatio;

        return Math.min(
            window.devicePixelRatio || 1,
            maximumRatio
        );

    };

    ExperienceEngine.prototype.getPerformanceMultiplier =
    function(){

        switch(this.device.performanceLevel){

            case "low":
                return .65;

            case "medium":
                return .82;

            default:
                return 1;

        }

    };

    // ==================================================
    // CANVAS SIZE
    // ==================================================

    ExperienceEngine.prototype.resizeCanvas = function(){

        if(!this.canvas || !this.context){
            return;
        }

        this.device =
            createDeviceProfile();

        this.width =
            Math.max(
                1,
                this.root.clientWidth
            );

        this.height =
            Math.max(
                1,
                this.root.clientHeight
            );

        this.pixelRatio =
            this.getPixelRatio();

        this.canvas.width =
            Math.floor(
                this.width *
                this.pixelRatio
            );

        this.canvas.height =
            Math.floor(
                this.height *
                this.pixelRatio
            );

        this.canvas.style.width =
            this.width + "px";

        this.canvas.style.height =
            this.height + "px";

        this.context.setTransform(
            this.pixelRatio,
            0,
            0,
            this.pixelRatio,
            0,
            0
        );

        this.lastFrame = 0;

    };

    // ==================================================
    // FRAME TIMING
    // ==================================================

    ExperienceEngine.prototype.shouldRender =
    function(timestamp){

        const frameInterval =
            1000 /
            this.getTargetFPS();

        return (
            timestamp -
            this.lastFrame
        ) >= frameInterval;

    };

    ExperienceEngine.prototype.updateTiming =
    function(timestamp){

        const fallbackInterval =
            1000 /
            this.getTargetFPS();

        const elapsed =
            this.lastFrame
                ? timestamp - this.lastFrame
                : fallbackInterval;

        this.delta =
            Math.min(
                elapsed / 1000,
                .05
            );

        this.time =
            timestamp / 1000;

        this.lastFrame =
            timestamp;

    };

    // ==================================================
    // SCENE HELPERS
    // ==================================================

    ExperienceEngine.prototype.clearCanvas = function(){

        if(!this.context){
            return;
        }

        this.context.clearRect(
            0,
            0,
            this.width,
            this.height
        );

    };

    ExperienceEngine.prototype.clearScene = function(){

        for(const collection of Object.values(this.scene)){

            collection.length = 0;

        }

    };

    ExperienceEngine.prototype.removeDeadObjects =
    function(collection){

        for(
            let index = collection.length - 1;
            index >= 0;
            index--
        ){

            if(collection[index].dead){
                collection.splice(index, 1);
            }

        }

    };

    // ==================================================
    // VISIBILITY AND RESIZE LISTENERS
    // ==================================================

    ExperienceEngine.prototype.installCoreListeners =
    function(){

        document.addEventListener(
            "visibilitychange",
            () => {

                this.pageVisible =
                    !document.hidden;

                if(this.pageVisible){
                    this.lastFrame = 0;
                }

            }
        );

        if(
            SETTINGS.pauseOutsideViewport &&
            "IntersectionObserver" in window
        ){

            this.visibilityObserver =
                new IntersectionObserver(
                    entries => {

                        this.rootVisible =
                            entries[0].isIntersecting;

                        if(this.rootVisible){
                            this.lastFrame = 0;
                        }

                    },
                    {
                        threshold: .01
                    }
                );

            this.visibilityObserver.observe(
                this.root
            );

        }

        if("ResizeObserver" in window){

            this.resizeObserver =
                new ResizeObserver(
                    () => this.scheduleResize()
                );

            this.resizeObserver.observe(
                this.root
            );

        }
        else{

            window.addEventListener(
                "resize",
                () => this.scheduleResize(),
                {
                    passive: true
                }
            );

        }

        window.addEventListener(
            "orientationchange",
            () => this.scheduleResize(260),
            {
                passive: true
            }
        );

    };

    ExperienceEngine.prototype.scheduleResize =
    function(delay = 180){

        clearTimeout(
            this.resizeTimer
        );

        this.resizeTimer =
            setTimeout(
                () => {

                    this.resizeCanvas();

                    if(
                        typeof this.rebuildScene ===
                        "function"
                    ){
                        this.rebuildScene();
                    }

                },
                delay
            );

    };

    // ==================================================
    // PART 4 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // MODULE REGISTRY
    //
    // New visual systems register here without changing
    // the core animation loop.
    // ==================================================

    ExperienceEngine.prototype.registerModule =
    function(module){

        if(!this.modules){
            this.modules = [];
        }

        if(
            !module ||
            typeof module.name !== "string"
        ){
            return;
        }

        const alreadyRegistered =
            this.modules.some(
                item => item.name === module.name
            );

        if(!alreadyRegistered){
            this.modules.push(module);
        }

    };

    ExperienceEngine.prototype.buildScene = function(){

        if(!this.modules){
            return;
        }

        for(const module of this.modules){

            if(typeof module.build === "function"){
                module.build(this);
            }

        }

    };

    ExperienceEngine.prototype.updateScene = function(){

        if(!this.modules){
            return;
        }

        for(const module of this.modules){

            if(typeof module.update === "function"){
                module.update(this);
            }

        }

    };

    ExperienceEngine.prototype.drawScene = function(){

        if(!this.context || !this.modules){
            return;
        }

        for(const module of this.modules){

            if(typeof module.draw === "function"){
                module.draw(this);
            }

        }

    };

    ExperienceEngine.prototype.rebuildScene = function(){

        this.clearScene();
        this.buildScene();

    };

    // ==================================================
    // BASE SCENE OBJECT
    // ==================================================

    class SceneObject{

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

    }

    // ==================================================
    // STAR OBJECT
    // ==================================================

    class Star extends SceneObject{

        constructor(engine){

            super();

            this.engine = engine;
            this.random = engine.universe.random;

            this.generate();

        }

        generate(){

            const engine = this.engine;
            const random = this.random;

            // Depth controls size, brightness, and motion.
            this.depth =
                Math.pow(
                    random.next(),
                    1.8
                );

            this.x =
                random.range(
                    0,
                    engine.width
                );

            // A loose density band prevents a uniform dot pattern.
            if(random.chance(.44)){

                const bandCenter =
                    engine.height *
                    random.range(.34,.62);

                this.y =
                    bandCenter +
                    random.range(
                        -engine.height * .19,
                        engine.height * .19
                    );

            }
            else{

                this.y =
                    random.range(
                        0,
                        engine.height
                    );

            }

            this.radius =
                .3 +
                this.depth * 2.25;

            this.baseOpacity =
                .12 +
                this.depth * .82;

            this.opacity =
                this.baseOpacity;

            this.twinkleAmount =
                random.range(
                    .025,
                    .09
                ) *
                engine.universe.twinkleStrength;

            this.twinkleSpeed =
                random.range(
                    .28,
                    1.15
                );

            this.twinklePhase =
                random.range(
                    0,
                    Math.PI * 2
                );

            this.color =
                this.chooseColor();

        }

        chooseColor(){

            const random = this.random;

            const colorRoll =
                random.next() +
                this.engine.universe.warmth * .12;

            if(colorRoll < .72){
                return "255,255,255";
            }

            if(colorRoll < .90){
                return "220,235,255";
            }

            return "255,239,218";

        }

        update(){

            const engine = this.engine;

            if(engine.device.reducedMotion){

                this.opacity =
                    this.baseOpacity;

                return;

            }

            const twinkle =
                Math.sin(
                    engine.time *
                    this.twinkleSpeed +
                    this.twinklePhase
                ) *
                this.twinkleAmount;

            this.opacity =
                clamp(
                    this.baseOpacity + twinkle,
                    .04,
                    1
                );

        }

        draw(){

            const engine = this.engine;
            const context = engine.context;

            const parallaxX =
                engine.camera.x *
                this.depth;

            const parallaxY =
                engine.camera.y *
                this.depth;

            const drawX =
                this.x + parallaxX;

            const drawY =
                this.y + parallaxY;

            context.save();

            // Only nearby stars receive noticeable bloom.
            if(this.depth > .58){

                context.shadowBlur =
                    this.radius *
                    (3.5 + this.depth * 3);

                context.shadowColor =
                    `rgba(${this.color},${this.opacity})`;

            }

            context.beginPath();

            context.fillStyle =
                `rgba(${this.color},${this.opacity})`;

            context.arc(
                drawX,
                drawY,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();
            context.restore();

        }

    }

    // ==================================================
    // STAR DENSITY
    // ==================================================

    ExperienceEngine.prototype.getStarDensity = function(){

        if(this.device.phone){
            return SETTINGS.phoneStarDensity;
        }

        if(this.device.tablet){
            return SETTINGS.tabletStarDensity;
        }

        return SETTINGS.desktopStarDensity;

    };

    ExperienceEngine.prototype.getStarLimit = function(){

        if(this.device.phone){
            return SETTINGS.maximumPhoneStars;
        }

        if(this.device.tablet){
            return SETTINGS.maximumTabletStars;
        }

        return SETTINGS.maximumDesktopStars;

    };

    // ==================================================
    // STAR MODULE
    // ==================================================

    ExperienceEngine.prototype.installStarModule = function(){

        this.registerModule({

            name: "stars",

            build: engine => {

                engine.scene.stars.length = 0;

                const canvasArea =
                    engine.width *
                    engine.height;

                const requestedCount =
                    canvasArea *
                    engine.getStarDensity() *
                    engine.universe.density *
                    engine.getPerformanceMultiplier();

                const starCount =
                    Math.min(
                        engine.getStarLimit(),
                        Math.max(
                            18,
                            Math.floor(requestedCount)
                        )
                    );

                for(
                    let index = 0;
                    index < starCount;
                    index++
                ){

                    engine.scene.stars.push(
                        new Star(engine)
                    );

                }

            },

            update: engine => {

                for(const star of engine.scene.stars){
                    star.update();
                }

            },

            draw: engine => {

                for(const star of engine.scene.stars){
                    star.draw();
                }

            }

        });

    };

    // ==================================================
    // PART 5 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // ATMOSPHERE OBJECT
    // ==================================================

    class AtmosphereCloud extends SceneObject{

        constructor(engine){

            super();

            this.engine = engine;
            this.random = engine.universe.random;

            this.generate();

        }

        generate(){

            const engine = this.engine;
            const random = this.random;

            this.x =
                random.range(
                    -engine.width * .15,
                    engine.width * 1.15
                );

            this.y =
                random.range(
                    -engine.height * .15,
                    engine.height * 1.15
                );

            this.radius =
                random.range(
                    engine.width * .12,
                    engine.width * .32
                );

            this.depth =
                random.range(
                    .08,
                    .35
                );

            this.baseOpacity =
                random.range(
                    .012,
                    .045
                ) *
                engine.universe.atmosphere;

            this.opacity =
                this.baseOpacity;

            this.driftX =
                random.range(
                    -.35,
                    .35
                );

            this.driftY =
                random.range(
                    -.18,
                    .18
                );

            this.phase =
                random.range(
                    0,
                    Math.PI * 2
                );

            this.pulseSpeed =
                random.range(
                    .025,
                    .07
                );

            this.color =
                this.chooseColor();

        }

        chooseColor(){

            const warmth =
                this.engine.universe.warmth;

            if(warmth > .35){
                return "224,49,63";
            }

            if(warmth < -.35){
                return "170,205,255";
            }

            return "255,255,255";

        }

        update(){

            const engine = this.engine;

            if(engine.device.reducedMotion){
                return;
            }

            this.x +=
                this.driftX *
                engine.delta;

            this.y +=
                this.driftY *
                engine.delta;

            this.opacity =
                this.baseOpacity *
                (
                    .82 +
                    Math.sin(
                        engine.time *
                        this.pulseSpeed +
                        this.phase
                    ) * .18
                );

            this.wrapPosition();

        }

        wrapPosition(){

            const engine = this.engine;
            const margin = this.radius;

            if(this.x < -margin){
                this.x = engine.width + margin;
            }
            else if(this.x > engine.width + margin){
                this.x = -margin;
            }

            if(this.y < -margin){
                this.y = engine.height + margin;
            }
            else if(this.y > engine.height + margin){
                this.y = -margin;
            }

        }

        draw(){

            const engine = this.engine;
            const context = engine.context;

            const drawX =
                this.x +
                engine.camera.x *
                this.depth;

            const drawY =
                this.y +
                engine.camera.y *
                this.depth;

            const gradient =
                context.createRadialGradient(
                    drawX,
                    drawY,
                    0,
                    drawX,
                    drawY,
                    this.radius
                );

            gradient.addColorStop(
                0,
                `rgba(${this.color},${this.opacity})`
            );

            gradient.addColorStop(
                .45,
                `rgba(${this.color},${this.opacity * .45})`
            );

            gradient.addColorStop(
                1,
                `rgba(${this.color},0)`
            );

            context.save();

            context.fillStyle = gradient;

            context.beginPath();

            context.arc(
                drawX,
                drawY,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();

            context.restore();

        }

    }

    // ==================================================
    // ATMOSPHERE MODULE
    // ==================================================

    ExperienceEngine.prototype.installAtmosphereModule =
    function(){

        this.registerModule({

            name: "atmosphere",

            build: engine => {

                engine.scene.atmosphere.length = 0;

                let cloudCount;

                if(engine.device.phone){
                    cloudCount = 3;
                }
                else if(engine.device.tablet){
                    cloudCount = 4;
                }
                else{
                    cloudCount = 6;
                }

                cloudCount =
                    Math.max(
                        2,
                        Math.floor(
                            cloudCount *
                            engine.getPerformanceMultiplier()
                        )
                    );

                for(
                    let index = 0;
                    index < cloudCount;
                    index++
                ){

                    engine.scene.atmosphere.push(
                        new AtmosphereCloud(engine)
                    );

                }

            },

            update: engine => {

                for(
                    const cloud of
                    engine.scene.atmosphere
                ){

                    cloud.update();

                }

            },

            draw: engine => {

                for(
                    const cloud of
                    engine.scene.atmosphere
                ){

                    cloud.draw();

                }

            }

        });

    };

    // ==================================================
    // PART 6 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // SPARK OBJECT
    // ==================================================

    class MeteorSpark extends SceneObject{

        constructor(engine, x, y, color, velocityX, velocityY){

            super();

            this.engine = engine;

            this.x = x;
            this.y = y;

            this.velocityX = velocityX;
            this.velocityY = velocityY;

            this.color = color;

            this.radius =
                engine.universe.random.range(
                    .5,
                    1.5
                );

            this.life = 0;

            this.maximumLife =
                engine.universe.random.range(
                    .25,
                    .65
                );

        }

        update(){

            const engine = this.engine;

            this.life += engine.delta;

            this.x +=
                this.velocityX *
                engine.delta;

            this.y +=
                this.velocityY *
                engine.delta;

            this.velocityX *= .975;
            this.velocityY *= .975;

            this.opacity =
                clamp(
                    1 -
                    this.life /
                    this.maximumLife,
                    0,
                    1
                );

            if(this.life >= this.maximumLife){
                this.destroy();
            }

        }

        draw(){

            const context =
                this.engine.context;

            context.save();

            context.shadowBlur =
                this.radius * 5;

            context.shadowColor =
                `rgba(${this.color},${this.opacity})`;

            context.fillStyle =
                `rgba(${this.color},${this.opacity})`;

            context.beginPath();

            context.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();
            context.restore();

        }

    }

    // ==================================================
    // METEOR OBJECT
    // ==================================================

    class Meteor extends SceneObject{

        constructor(engine){

            super();

            this.engine = engine;
            this.random = engine.universe.random;

            this.generate();

        }

        generate(){

            const engine = this.engine;
            const random = this.random;

            const edge =
                Math.floor(
                    random.range(0,4)
                );

            const margin =
                engine.device.phone
                    ? 55
                    : 100;

            let targetX;
            let targetY;

            switch(edge){

                // Left edge
                case 0:

                    this.x = -margin;

                    this.y =
                        random.range(
                            0,
                            engine.height
                        );

                    targetX =
                        engine.width + margin;

                    targetY =
                        random.range(
                            0,
                            engine.height
                        );

                break;

                // Right edge
                case 1:

                    this.x =
                        engine.width + margin;

                    this.y =
                        random.range(
                            0,
                            engine.height
                        );

                    targetX = -margin;

                    targetY =
                        random.range(
                            0,
                            engine.height
                        );

                break;

                // Top edge
                case 2:

                    this.x =
                        random.range(
                            0,
                            engine.width
                        );

                    this.y = -margin;

                    targetX =
                        random.range(
                            0,
                            engine.width
                        );

                    targetY =
                        engine.height + margin;

                break;

                // Bottom edge
                default:

                    this.x =
                        random.range(
                            0,
                            engine.width
                        );

                    this.y =
                        engine.height + margin;

                    targetX =
                        random.range(
                            0,
                            engine.width
                        );

                    targetY = -margin;

            }

            const directionX =
                targetX - this.x;

            const directionY =
                targetY - this.y;

            const distance =
                Math.hypot(
                    directionX,
                    directionY
                ) || 1;

            const speed =
                engine.device.phone
                    ? random.range(560,850)
                    : random.range(650,1050);

            this.velocityX =
                directionX /
                distance *
                speed;

            this.velocityY =
                directionY /
                distance *
                speed;

            this.heroMeteor =
                random.chance(.09);

            if(this.heroMeteor){

                this.velocityX *= .82;
                this.velocityY *= .82;

            }

            this.color =
                random.chance(.12)
                    ? "224,49,63"
                    : "255,255,255";

            this.radius =
                this.heroMeteor
                    ? random.range(2.8,4.2)
                    : random.range(1.5,2.7);

            this.trailLength =
                this.heroMeteor
                    ? random.range(240,390)
                    : engine.device.phone
                        ? random.range(85,165)
                        : random.range(130,245);

            this.age = 0;

            this.maximumAge =
                distance /
                speed +
                .45;

            this.sparkTimer = 0;

            this.flickerPhase =
                random.range(
                    0,
                    Math.PI * 2
                );

        }

        update(){

            const engine = this.engine;

            this.age += engine.delta;

            this.x +=
                this.velocityX *
                engine.delta;

            this.y +=
                this.velocityY *
                engine.delta;

            this.sparkTimer -=
                engine.delta;

            if(
                !engine.device.reducedMotion &&
                this.sparkTimer <= 0
            ){

                this.releaseSpark();

                this.sparkTimer =
                    engine.device.phone
                        ? .075
                        : .045;

            }

            if(
                this.age >= this.maximumAge ||
                this.isOutsideScene()
            ){
                this.destroy();
            }

        }

        releaseSpark(){

            const engine = this.engine;
            const random = this.random;

            const speed =
                random.range(
                    12,
                    42
                );

            const angle =
                random.range(
                    0,
                    Math.PI * 2
                );

            engine.scene.sparks.push(

                new MeteorSpark(
                    engine,
                    this.x,
                    this.y,
                    this.color,
                    Math.cos(angle) * speed -
                        this.velocityX * .045,
                    Math.sin(angle) * speed -
                        this.velocityY * .045
                )

            );

        }

        isOutsideScene(){

            const margin =
                this.trailLength + 140;

            return (
                this.x < -margin ||
                this.x > this.engine.width + margin ||
                this.y < -margin ||
                this.y > this.engine.height + margin
            );

        }

        draw(){

            const engine = this.engine;
            const context = engine.context;

            const speed =
                Math.hypot(
                    this.velocityX,
                    this.velocityY
                ) || 1;

            const directionX =
                this.velocityX / speed;

            const directionY =
                this.velocityY / speed;

            const tailX =
                this.x -
                directionX *
                this.trailLength;

            const tailY =
                this.y -
                directionY *
                this.trailLength;

            const fadeIn =
                clamp(
                    this.age / .12,
                    0,
                    1
                );

            const fadeOut =
                clamp(
                    (
                        this.maximumAge -
                        this.age
                    ) / .3,
                    0,
                    1
                );

            const flicker =
                .88 +
                Math.sin(
                    engine.time * 22 +
                    this.flickerPhase
                ) * .12;

            const opacity =
                fadeIn *
                fadeOut *
                flicker;

            const gradient =
                context.createLinearGradient(
                    tailX,
                    tailY,
                    this.x,
                    this.y
                );

            gradient.addColorStop(
                0,
                `rgba(${this.color},0)`
            );

            gradient.addColorStop(
                .58,
                `rgba(${this.color},${opacity * .18})`
            );

            gradient.addColorStop(
                .88,
                `rgba(${this.color},${opacity * .7})`
            );

            gradient.addColorStop(
                1,
                `rgba(${this.color},${opacity})`
            );

            context.save();

            context.lineCap = "round";

            context.strokeStyle = gradient;

            context.lineWidth =
                this.heroMeteor
                    ? 3.6
                    : 2;

            context.shadowBlur =
                this.heroMeteor
                    ? 24
                    : 14;

            context.shadowColor =
                `rgba(${this.color},${opacity})`;

            context.beginPath();

            context.moveTo(
                tailX,
                tailY
            );

            context.lineTo(
                this.x,
                this.y
            );

            context.stroke();

            context.fillStyle =
                `rgba(${this.color},${opacity})`;

            context.beginPath();

            context.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();
            context.restore();

        }

    }

    // ==================================================
    // METEOR TIMING
    // ==================================================

    ExperienceEngine.prototype.scheduleNextMeteor =
    function(){

        const random =
            this.universe.random;

        const activity =
            this.universe.activity *
            this.universe.meteorFrequency;

        const baseMinimum =
            this.device.phone
                ? 8
                : 6;

        const baseMaximum =
            this.device.phone
                ? 24
                : 19;

        const delay =
            random.range(
                baseMinimum,
                baseMaximum
            ) /
            clamp(
                activity,
                .45,
                1.8
            );

        this.nextMeteorTime =
            this.time + delay;

    };

    ExperienceEngine.prototype.spawnMeteor =
    function(){

        const maximumActive =
            this.device.phone
                ? 1
                : 2;

        if(
            this.scene.meteors.length >=
            maximumActive
        ){
            return;
        }

        this.scene.meteors.push(
            new Meteor(this)
        );

    };

    // ==================================================
    // METEOR MODULE
    // ==================================================

    ExperienceEngine.prototype.installMeteorModule =
    function(){

        this.registerModule({

            name: "meteors",

            build: engine => {

                engine.scene.meteors.length = 0;
                engine.scene.sparks.length = 0;

                engine.nextMeteorTime =
                    engine.time +
                    engine.universe.random.range(
                        2.5,
                        7
                    );

            },

            update: engine => {

                if(
                    !engine.device.reducedMotion &&
                    engine.time >=
                    engine.nextMeteorTime
                ){

                    engine.spawnMeteor();
                    engine.scheduleNextMeteor();

                }

                for(
                    const meteor of
                    engine.scene.meteors
                ){
                    meteor.update();
                }

                for(
                    const spark of
                    engine.scene.sparks
                ){
                    spark.update();
                }

                engine.removeDeadObjects(
                    engine.scene.meteors
                );

                engine.removeDeadObjects(
                    engine.scene.sparks
                );

            },

            draw: engine => {

                for(
                    const meteor of
                    engine.scene.meteors
                ){
                    meteor.draw();
                }

                for(
                    const spark of
                    engine.scene.sparks
                ){
                    spark.draw();
                }

            }

        });

    };

    // ==================================================
    // PART 7 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // CAMERA SETTINGS
    // ==================================================

    ExperienceEngine.prototype.createCameraState =
    function(){

        this.camera = {

            x: 0,
            y: 0,

            targetX: 0,
            targetY: 0,

            pointerX: 0,
            pointerY: 0,

            scrollOffset: 0,

            lastScrollY:
                window.scrollY || 0,

            lastScrollTime:
                performance.now(),

            scrollVelocity: 0

        };

    };

    // ==================================================
    // CAMERA LIMITS
    // ==================================================

    ExperienceEngine.prototype.getCameraStrength =
    function(){

        if(this.device.reducedMotion){
            return 0;
        }

        if(this.device.phone){

            return this.device.portrait
                ? 2.4
                : 3.2;

        }

        if(this.device.tablet){
            return 4.5;
        }

        return 7;

    };

    ExperienceEngine.prototype.getCameraEasing =
    function(){

        if(this.device.phone){
            return .045;
        }

        if(this.device.tablet){
            return .035;
        }

        return .028;

    };

    // ==================================================
    // AUTONOMOUS CAMERA DRIFT
    //
    // Mobile receives gentle movement without requiring
    // device-orientation permission.
    // ==================================================

    ExperienceEngine.prototype.updateAutonomousCamera =
    function(){

        const strength =
            this.getCameraStrength() *
            this.universe.cameraDrift;

        if(strength === 0){

            this.camera.targetX = 0;
            this.camera.targetY = 0;

            return;

        }

        const horizontalDrift =
            Math.sin(
                this.time * .055 +
                this.universe.seed * .00001
            );

        const verticalDrift =
            Math.cos(
                this.time * .041 +
                this.universe.seed * .000013
            );

        this.camera.targetX =
            horizontalDrift *
            strength;

        this.camera.targetY =
            verticalDrift *
            strength *
            .7;

    };

    // ==================================================
    // POINTER DEPTH
    //
    // Desktop receives subtle pointer parallax.
    // Touch devices keep autonomous movement instead.
    // ==================================================

    ExperienceEngine.prototype.applyPointerCamera =
    function(){

        if(
            this.device.touch ||
            this.device.reducedMotion
        ){
            return;
        }

        const strength =
            this.getCameraStrength();

        this.camera.targetX +=
            this.camera.pointerX *
            strength;

        this.camera.targetY +=
            this.camera.pointerY *
            strength *
            .75;

    };

    // ==================================================
    // SCROLL RESPONSE
    //
    // Scrolling adds a brief vertical impulse, then
    // naturally settles back into ambient drift.
    // ==================================================

    ExperienceEngine.prototype.applyScrollCamera =
    function(){

        if(this.device.reducedMotion){
            return;
        }

        const mobileMultiplier =
            this.device.phone
                ? .012
                : .018;

        this.camera.scrollOffset +=
            this.camera.scrollVelocity *
            mobileMultiplier;

        this.camera.scrollOffset *=
            this.device.phone
                ? .88
                : .91;

        this.camera.scrollOffset =
            clamp(
                this.camera.scrollOffset,
                -5,
                5
            );

        this.camera.targetY +=
            this.camera.scrollOffset;

        this.camera.scrollVelocity *= .84;

    };

    // ==================================================
    // CAMERA UPDATE
    // ==================================================

    ExperienceEngine.prototype.updateCamera =
    function(){

        this.updateAutonomousCamera();

        this.applyPointerCamera();

        this.applyScrollCamera();

        const easing =
            this.getCameraEasing();

        this.camera.x =
            lerp(
                this.camera.x,
                this.camera.targetX,
                easing
            );

        this.camera.y =
            lerp(
                this.camera.y,
                this.camera.targetY,
                easing
            );

    };

    // ==================================================
    // POINTER LISTENER
    // ==================================================

    ExperienceEngine.prototype.installPointerInteraction =
    function(){

        if(this.device.touch){
            return;
        }

        this.root.addEventListener(
            "pointermove",
            event => {

                const bounds =
                    this.root.getBoundingClientRect();

                const normalizedX =
                    (
                        event.clientX -
                        bounds.left
                    ) /
                    Math.max(
                        1,
                        bounds.width
                    );

                const normalizedY =
                    (
                        event.clientY -
                        bounds.top
                    ) /
                    Math.max(
                        1,
                        bounds.height
                    );

                this.camera.pointerX =
                    clamp(
                        normalizedX * 2 - 1,
                        -1,
                        1
                    );

                this.camera.pointerY =
                    clamp(
                        normalizedY * 2 - 1,
                        -1,
                        1
                    );

            },
            {
                passive: true
            }
        );

        this.root.addEventListener(
            "pointerleave",
            () => {

                this.camera.pointerX = 0;
                this.camera.pointerY = 0;

            },
            {
                passive: true
            }
        );

    };

    // ==================================================
    // SCROLL LISTENER
    // ==================================================

    ExperienceEngine.prototype.installScrollInteraction =
    function(){

        window.addEventListener(
            "scroll",
            () => {

                const currentScrollY =
                    window.scrollY || 0;

                const currentTime =
                    performance.now();

                const elapsed =
                    Math.max(
                        16,
                        currentTime -
                        this.camera.lastScrollTime
                    );

                const distance =
                    currentScrollY -
                    this.camera.lastScrollY;

                this.camera.scrollVelocity =
                    clamp(
                        distance /
                        elapsed *
                        16,
                        -30,
                        30
                    );

                this.camera.lastScrollY =
                    currentScrollY;

                this.camera.lastScrollTime =
                    currentTime;

            },
            {
                passive: true
            }
        );

    };

    // ==================================================
    // CAMERA MODULE
    // ==================================================

    ExperienceEngine.prototype.installCameraModule =
    function(){

        this.createCameraState();

        this.installPointerInteraction();

        this.installScrollInteraction();

        this.registerModule({

            name: "camera",

            build: engine => {

                engine.camera.x = 0;
                engine.camera.y = 0;

                engine.camera.targetX = 0;
                engine.camera.targetY = 0;

                engine.camera.scrollOffset = 0;
                engine.camera.scrollVelocity = 0;

            },

            update: engine => {

                engine.updateCamera();

            },

            draw: () => {

                // Camera movement is consumed by
                // individual scene objects.

            }

        });

    };

    // ==================================================
    // PART 8 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // MOBILE EXPERIENCE PROFILE
    //
    // Mobile keeps the full visual identity while using
    // lighter limits for heat, battery, and smoothness.
    // ==================================================

    ExperienceEngine.prototype.createExperienceProfile =
    function(){

        const performance =
            this.device.performanceLevel;

        const profile = {

            stars: true,
            atmosphere: true,
            meteors: true,
            sparks: true,
            constellations: true,
            interaction: true,

            atmosphereMultiplier: 1,
            meteorMultiplier: 1,
            sparkMultiplier: 1,

            maximumMeteors: 2,
            maximumSparks: 34

        };

        if(this.device.phone){

            profile.atmosphereMultiplier = .72;
            profile.meteorMultiplier = .82;
            profile.sparkMultiplier = .58;

            profile.maximumMeteors = 1;
            profile.maximumSparks = 16;

        }
        else if(this.device.tablet){

            profile.atmosphereMultiplier = .86;
            profile.meteorMultiplier = .92;
            profile.sparkMultiplier = .76;

            profile.maximumMeteors = 2;
            profile.maximumSparks = 24;

        }

        if(performance === "medium"){

            profile.atmosphereMultiplier *= .82;
            profile.sparkMultiplier *= .72;

            profile.maximumSparks =
                Math.min(
                    profile.maximumSparks,
                    18
                );

        }

        if(performance === "low"){

            profile.atmosphereMultiplier *= .62;
            profile.meteorMultiplier *= .78;
            profile.sparkMultiplier *= .42;

            profile.maximumMeteors = 1;
            profile.maximumSparks = 10;

        }

        if(this.device.reducedMotion){

            profile.atmosphere = false;
            profile.sparks = false;
            profile.constellations = false;
            profile.interaction = false;

            profile.meteorMultiplier = .42;
            profile.maximumMeteors = 1;

        }

        return profile;

    };

    // ==================================================
    // ORIENTATION PROFILE
    // ==================================================

    ExperienceEngine.prototype.updateOrientationProfile =
    function(){

        this.device.portrait =
            window.innerHeight >=
            window.innerWidth;

        this.orientation =
            this.device.portrait
                ? "portrait"
                : "landscape";

    };

    // ==================================================
    // DEVICE PROFILE REFRESH
    //
    // Rebuild only when the device category or motion
    // preference actually changes.
    // ==================================================

    ExperienceEngine.prototype.refreshExperienceProfile =
    function(){

        const previousDevice =
            this.device;

        const nextDevice =
            createDeviceProfile();

        const categoryChanged =
            previousDevice.phone !== nextDevice.phone ||
            previousDevice.tablet !== nextDevice.tablet ||
            previousDevice.performanceLevel !==
                nextDevice.performanceLevel ||
            previousDevice.reducedMotion !==
                nextDevice.reducedMotion;

        this.device =
            nextDevice;

        this.updateOrientationProfile();

        this.experienceProfile =
            this.createExperienceProfile();

        if(categoryChanged){

            this.scheduleResize(120);

        }

    };

    // ==================================================
    // MOBILE SCENE LIMITS
    // ==================================================

    ExperienceEngine.prototype.enforceSceneLimits =
    function(){

        if(!this.experienceProfile){
            return;
        }

        const profile =
            this.experienceProfile;

        while(
            this.scene.meteors.length >
            profile.maximumMeteors
        ){

            this.scene.meteors.shift();

        }

        while(
            this.scene.sparks.length >
            profile.maximumSparks
        ){

            this.scene.sparks.shift();

        }

    };

    // ==================================================
    // TOUCH-AWARE ACTIVITY
    //
    // Touch interaction briefly increases visual energy
    // without attaching movement directly to the finger.
    // ==================================================

    ExperienceEngine.prototype.installTouchAwareness =
    function(){

        if(!this.device.touch){
            return;
        }

        this.touchActivity = 0;

        this.root.addEventListener(
            "touchstart",
            () => {

                this.touchActivity =
                    Math.min(
                        1,
                        this.touchActivity + .28
                    );

            },
            {
                passive: true
            }
        );

        this.root.addEventListener(
            "touchend",
            () => {

                this.touchActivity =
                    Math.min(
                        1,
                        this.touchActivity + .12
                    );

            },
            {
                passive: true
            }
        );

    };

    ExperienceEngine.prototype.updateTouchAwareness =
    function(){

        if(!this.device.touch){
            return;
        }

        this.touchActivity =
            Math.max(
                0,
                this.touchActivity -
                this.delta * .18
            );

    };

    // ==================================================
    // MEDIA QUERY LISTENERS
    // ==================================================

    ExperienceEngine.prototype.installDeviceListeners =
    function(){

        const refresh =
            () => this.refreshExperienceProfile();

        const mediaQueries = [

            MEDIA.phone,
            MEDIA.tablet,
            MEDIA.touch,
            MEDIA.reducedMotion

        ];

        for(const query of mediaQueries){

            if(query.addEventListener){

                query.addEventListener(
                    "change",
                    refresh
                );

            }
            else if(query.addListener){

                query.addListener(
                    refresh
                );

            }

        }

    };

    // ==================================================
    // MOBILE INTELLIGENCE MODULE
    // ==================================================

    ExperienceEngine.prototype.installMobileModule =
    function(){

        this.updateOrientationProfile();

        this.experienceProfile =
            this.createExperienceProfile();

        this.installTouchAwareness();

        this.installDeviceListeners();

        this.registerModule({

            name: "mobile-intelligence",

            build: engine => {

                engine.updateOrientationProfile();

                engine.experienceProfile =
                    engine.createExperienceProfile();

            },

            update: engine => {

                engine.updateTouchAwareness();

                engine.enforceSceneLimits();

            },

            draw: () => {

                // This module adjusts behavior rather
                // than drawing visual elements.

            }

        });

    };

    // ==================================================
    // PART 9 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // PERFORMANCE STATE
    // ==================================================

    ExperienceEngine.prototype.createPerformanceState =
    function(){

        this.performanceState = {

            qualityScale: 1,

            targetFPS:
                this.getTargetFPS(),

            averageFrameTime: 0,

            frameSamples: [],

            sampleLimit: 36,

            evaluationTimer: 0,

            evaluationInterval: 3,

            slowEvaluations: 0,

            stableEvaluations: 0,

            minimumQuality: .52,

            maximumQuality: 1,

            sleeping: false

        };

    };

    // ==================================================
    // ADAPTIVE FRAME RATE
    //
    // The engine lowers its workload before animation
    // becomes visibly rough or heats up a phone.
    // ==================================================

    ExperienceEngine.prototype.getAdaptiveTargetFPS =
    function(){

        const state =
            this.performanceState;

        if(!state){
            return this.getTargetFPS();
        }

        if(this.device.reducedMotion){
            return SETTINGS.reducedMotionFPS;
        }

        const baseFPS =
            this.device.phone
                ? SETTINGS.phoneFPS
                : this.device.tablet
                    ? SETTINGS.tabletFPS
                    : SETTINGS.desktopFPS;

        return Math.max(
            18,
            Math.round(
                baseFPS *
                clamp(
                    state.qualityScale,
                    .7,
                    1
                )
            )
        );

    };

    // ==================================================
    // FRAME SAMPLING
    // ==================================================

    ExperienceEngine.prototype.recordFramePerformance =
    function(){

        const state =
            this.performanceState;

        if(
            !state ||
            this.delta <= 0
        ){
            return;
        }

        const frameTime =
            this.delta * 1000;

        state.frameSamples.push(
            frameTime
        );

        if(
            state.frameSamples.length >
            state.sampleLimit
        ){

            state.frameSamples.shift();

        }

        const total =
            state.frameSamples.reduce(
                (sum, value) => sum + value,
                0
            );

        state.averageFrameTime =
            total /
            Math.max(
                1,
                state.frameSamples.length
            );

    };

    // ==================================================
    // QUALITY EVALUATION
    // ==================================================

    ExperienceEngine.prototype.evaluatePerformance =
    function(){

        const state =
            this.performanceState;

        if(
            !state ||
            state.frameSamples.length <
            state.sampleLimit * .6
        ){
            return;
        }

        const desiredFrameTime =
            1000 /
            Math.max(
                1,
                state.targetFPS
            );

        const slowThreshold =
            desiredFrameTime * 1.38;

        const stableThreshold =
            desiredFrameTime * 1.08;

        if(
            state.averageFrameTime >
            slowThreshold
        ){

            state.slowEvaluations++;
            state.stableEvaluations = 0;

        }
        else if(
            state.averageFrameTime <
            stableThreshold
        ){

            state.stableEvaluations++;
            state.slowEvaluations = 0;

        }
        else{

            state.slowEvaluations = 0;
            state.stableEvaluations = 0;

        }

        if(state.slowEvaluations >= 2){

            this.lowerPerformanceQuality();

            state.slowEvaluations = 0;

        }
        else if(
            state.stableEvaluations >= 4
        ){

            this.raisePerformanceQuality();

            state.stableEvaluations = 0;

        }

    };

    // ==================================================
    // QUALITY ADJUSTMENTS
    // ==================================================

    ExperienceEngine.prototype.lowerPerformanceQuality =
    function(){

        const state =
            this.performanceState;

        const previousQuality =
            state.qualityScale;

        state.qualityScale =
            clamp(
                state.qualityScale - .1,
                state.minimumQuality,
                state.maximumQuality
            );

        state.targetFPS =
            this.getAdaptiveTargetFPS();

        if(
            state.qualityScale !==
            previousQuality
        ){

            this.applyPerformanceQuality();

        }

    };

    ExperienceEngine.prototype.raisePerformanceQuality =
    function(){

        const state =
            this.performanceState;

        const previousQuality =
            state.qualityScale;

        state.qualityScale =
            clamp(
                state.qualityScale + .05,
                state.minimumQuality,
                state.maximumQuality
            );

        state.targetFPS =
            this.getAdaptiveTargetFPS();

        if(
            state.qualityScale !==
            previousQuality
        ){

            this.applyPerformanceQuality();

        }

    };

    // Rebuild only when the quality change is large enough
    // to make a meaningful difference.
    ExperienceEngine.prototype.applyPerformanceQuality =
    function(){

        const state =
            this.performanceState;

        this.experienceProfile =
            this.createExperienceProfile();

        if(state.qualityScale < .72){

            this.experienceProfile.atmosphereMultiplier *=
                .72;

            this.experienceProfile.sparkMultiplier *=
                .58;

            this.experienceProfile.maximumSparks =
                Math.min(
                    this.experienceProfile.maximumSparks,
                    10
                );

        }
        else if(state.qualityScale < .88){

            this.experienceProfile.atmosphereMultiplier *=
                .86;

            this.experienceProfile.sparkMultiplier *=
                .78;

        }

        this.enforceSceneLimits();

    };

    // ==================================================
    // ADAPTIVE MULTIPLIER
    // ==================================================

    ExperienceEngine.prototype.getAdaptiveMultiplier =
    function(){

        const state =
            this.performanceState;

        return (
            this.getPerformanceMultiplier() *
            (
                state
                    ? state.qualityScale
                    : 1
            )
        );

    };

    // ==================================================
    // LOW-ACTIVITY SLEEP
    //
    // When the page or target is hidden, rendering stops
    // without destroying the generated universe.
    // ==================================================

    ExperienceEngine.prototype.updateSleepState =
    function(){

        if(!this.performanceState){
            return;
        }

        this.performanceState.sleeping =
            !this.pageVisible ||
            !this.rootVisible;

        if(
            !this.performanceState.sleeping &&
            this.lastFrame === 0
        ){

            this.performanceState.frameSamples.length = 0;

        }

    };

    // ==================================================
    // PERFORMANCE UPDATE
    // ==================================================

    ExperienceEngine.prototype.updatePerformance =
    function(){

        const state =
            this.performanceState;

        if(!state){
            return;
        }

        this.updateSleepState();

        if(state.sleeping){
            return;
        }

        this.recordFramePerformance();

        state.evaluationTimer +=
            this.delta;

        if(
            state.evaluationTimer >=
            state.evaluationInterval
        ){

            state.evaluationTimer = 0;

            this.evaluatePerformance();

        }

        state.targetFPS =
            this.getAdaptiveTargetFPS();

    };

    // ==================================================
    // PERFORMANCE MODULE
    // ==================================================

    ExperienceEngine.prototype.installPerformanceModule =
    function(){

        this.createPerformanceState();

        this.registerModule({

            name: "performance",

            build: engine => {

                engine.performanceState.frameSamples.length = 0;

                engine.performanceState.averageFrameTime = 0;

                engine.performanceState.evaluationTimer = 0;

                engine.performanceState.targetFPS =
                    engine.getAdaptiveTargetFPS();

            },

            update: engine => {

                engine.updatePerformance();

            },

            draw: () => {

                // Performance management changes workload
                // rather than drawing anything.

            }

        });

    };

    // ==================================================
    // PART 10 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // ACCESSIBILITY STATE
    // ==================================================

    ExperienceEngine.prototype.createAccessibilityState =
    function(){

        this.accessibility = {

            reducedMotion:
                this.device.reducedMotion,

            highContrast:
                window.matchMedia(
                    "(prefers-contrast: more)"
                ).matches,

            forcedColors:
                window.matchMedia(
                    "(forced-colors: active)"
                ).matches,

            animationsEnabled: true

        };

        this.accessibility.animationsEnabled =
            !this.accessibility.forcedColors;

    };

    // ==================================================
    // CANVAS ACCESSIBILITY
    //
    // The canvas is decorative and never enters the
    // keyboard or screen-reader navigation order.
    // ==================================================

    ExperienceEngine.prototype.configureAccessibleCanvas =
    function(){

        if(!this.canvas){
            return;
        }

        this.canvas.setAttribute(
            "aria-hidden",
            "true"
        );

        this.canvas.setAttribute(
            "role",
            "presentation"
        );

        this.canvas.tabIndex = -1;

        this.canvas.style.pointerEvents =
            "none";

    };

    // ==================================================
    // MOTION PREFERENCE
    // ==================================================

    ExperienceEngine.prototype.applyMotionPreference =
    function(){

        if(!this.accessibility){
            return;
        }

        const reducedMotion =
            this.accessibility.reducedMotion;

        if(reducedMotion){

            this.camera.x = 0;
            this.camera.y = 0;

            this.camera.targetX = 0;
            this.camera.targetY = 0;

            this.camera.pointerX = 0;
            this.camera.pointerY = 0;

            this.camera.scrollOffset = 0;
            this.camera.scrollVelocity = 0;

            this.scene.meteors.length = 0;
            this.scene.sparks.length = 0;

        }

        this.lastFrame = 0;

    };

    // ==================================================
    // CONTRAST PREFERENCE
    // ==================================================

    ExperienceEngine.prototype.applyContrastPreference =
    function(){

        if(!this.accessibility){
            return;
        }

        if(
            this.accessibility.highContrast ||
            this.accessibility.forcedColors
        ){

            if(this.experienceProfile){

                this.experienceProfile.atmosphere = false;

                this.experienceProfile.atmosphereMultiplier = 0;

                this.experienceProfile.sparkMultiplier *= .55;

            }

        }

    };

    // ==================================================
    // ACCESSIBILITY PROFILE REFRESH
    // ==================================================

    ExperienceEngine.prototype.refreshAccessibility =
    function(){

        if(!this.accessibility){
            this.createAccessibilityState();
        }

        this.accessibility.reducedMotion =
            MEDIA.reducedMotion.matches;

        this.accessibility.highContrast =
            window.matchMedia(
                "(prefers-contrast: more)"
            ).matches;

        this.accessibility.forcedColors =
            window.matchMedia(
                "(forced-colors: active)"
            ).matches;

        this.accessibility.animationsEnabled =
            !this.accessibility.forcedColors;

        this.device =
            createDeviceProfile();

        this.experienceProfile =
            this.createExperienceProfile();

        this.applyMotionPreference();

        this.applyContrastPreference();

        this.scheduleResize(100);

    };

    // ==================================================
    // ACCESSIBILITY LISTENERS
    // ==================================================

    ExperienceEngine.prototype.installAccessibilityListeners =
    function(){

        const contrastQuery =
            window.matchMedia(
                "(prefers-contrast: more)"
            );

        const forcedColorsQuery =
            window.matchMedia(
                "(forced-colors: active)"
            );

        const refresh =
            () => this.refreshAccessibility();

        const queries = [

            MEDIA.reducedMotion,
            contrastQuery,
            forcedColorsQuery

        ];

        for(const query of queries){

            if(query.addEventListener){

                query.addEventListener(
                    "change",
                    refresh
                );

            }
            else if(query.addListener){

                query.addListener(
                    refresh
                );

            }

        }

    };

    // ==================================================
    // STATIC REDUCED-MOTION FRAME
    //
    // Visitors who prefer reduced motion still receive
    // the visual atmosphere without continuous movement.
    // ==================================================

    ExperienceEngine.prototype.drawReducedMotionFrame =
    function(){

        if(
            !this.context ||
            !this.device.reducedMotion
        ){
            return;
        }

        this.clearCanvas();

        for(const module of this.modules || []){

            if(
                module.name === "camera" ||
                module.name === "meteors"
            ){
                continue;
            }

            if(typeof module.draw === "function"){

                module.draw(this);

            }

        }

    };

    // ==================================================
    // FOCUS SAFETY
    //
    // Decorative animation pauses while a modal or form
    // field inside the target has keyboard focus.
    // ==================================================

    ExperienceEngine.prototype.installFocusAwareness =
    function(){

        this.focusPaused = false;

        this.root.addEventListener(
            "focusin",
            event => {

                const interactive =
                    event.target.closest(
                        "input, textarea, select, button, dialog, .modal"
                    );

                if(interactive){

                    this.focusPaused = true;
                    this.lastFrame = 0;

                }

            }
        );

        this.root.addEventListener(
            "focusout",
            () => {

                requestAnimationFrame(
                    () => {

                        const active =
                            document.activeElement;

                        this.focusPaused =
                            Boolean(
                                active &&
                                this.root.contains(active) &&
                                active.closest(
                                    "input, textarea, select, button, dialog, .modal"
                                )
                            );

                        this.lastFrame = 0;

                    }
                );

            }
        );

    };

    // ==================================================
    // ACCESSIBILITY MODULE
    // ==================================================

    ExperienceEngine.prototype.installAccessibilityModule =
    function(){

        this.createAccessibilityState();

        this.configureAccessibleCanvas();

        this.installAccessibilityListeners();

        this.installFocusAwareness();

        this.applyMotionPreference();

        this.applyContrastPreference();

        this.registerModule({

            name: "accessibility",

            build: engine => {

                engine.configureAccessibleCanvas();

                engine.applyMotionPreference();

                engine.applyContrastPreference();

            },

            update: engine => {

                if(
                    engine.device.reducedMotion ||
                    engine.focusPaused
                ){

                    engine.camera.x = 0;
                    engine.camera.y = 0;

                    engine.camera.targetX = 0;
                    engine.camera.targetY = 0;

                }

            },

            draw: () => {

                // Accessibility affects rendering behavior
                // but does not draw its own visual layer.

            }

        });

    };

    // ==================================================
    // PART 11 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // PAGE THEMES
    //
    // Each page can use the same engine with a different
    // level of motion and visual intensity.
    // ==================================================

    const PAGE_THEMES = {

        default: {

            starMultiplier: 1,

            atmosphereMultiplier: 1,

            meteorMultiplier: 1,

            cameraMultiplier: 1,

            warmthShift: 0

        },

        home: {

            starMultiplier: 1.12,

            atmosphereMultiplier: 1.08,

            meteorMultiplier: 1.15,

            cameraMultiplier: 1,

            warmthShift: 0

        },

        invitation: {

            starMultiplier: .82,

            atmosphereMultiplier: .72,

            meteorMultiplier: .55,

            cameraMultiplier: .72,

            warmthShift: .16

        },

        community: {

            starMultiplier: 1,

            atmosphereMultiplier: 1,

            meteorMultiplier: 1,

            cameraMultiplier: .9,

            warmthShift: .05

        },

        schools: {

            starMultiplier: .9,

            atmosphereMultiplier: .74,

            meteorMultiplier: .62,

            cameraMultiplier: .7,

            warmthShift: -.08

        },

        partners: {

            starMultiplier: .72,

            atmosphereMultiplier: .56,

            meteorMultiplier: .42,

            cameraMultiplier: .55,

            warmthShift: 0

        },

        volunteer: {

            starMultiplier: .86,

            atmosphereMultiplier: .82,

            meteorMultiplier: .58,

            cameraMultiplier: .68,

            warmthShift: .22

        }

    };

    // ==================================================
    // PAGE IDENTITY
    // ==================================================

    ExperienceEngine.prototype.detectPageTheme =
    function(){

        const explicitTheme =
            this.root.dataset.skyTheme;

        if(
            explicitTheme &&
            PAGE_THEMES[explicitTheme]
        ){

            return explicitTheme;

        }

        const pageTheme =
            document.body.dataset.pageTheme;

        if(
            pageTheme &&
            PAGE_THEMES[pageTheme]
        ){

            return pageTheme;

        }

        if(
            this.root.matches(
                "#home, .community-hero"
            )
        ){

            return "home";

        }

        return "default";

    };

    ExperienceEngine.prototype.getPageTheme =
    function(){

        return (
            PAGE_THEMES[this.themeName] ||
            PAGE_THEMES.default
        );

    };

    // ==================================================
    // THEME APPLICATION
    // ==================================================

    ExperienceEngine.prototype.applyPageTheme =
    function(){

        this.themeName =
            this.detectPageTheme();

        this.theme =
            this.getPageTheme();

        this.root.dataset.activeSkyTheme =
            this.themeName;

        this.universe.warmth =
            clamp(
                this.universe.warmth +
                this.theme.warmthShift,
                -1,
                1
            );

    };

    // ==================================================
    // THEME MULTIPLIERS
    // ==================================================

    ExperienceEngine.prototype.getThemeStarMultiplier =
    function(){

        return this.theme
            ? this.theme.starMultiplier
            : 1;

    };

    ExperienceEngine.prototype.getThemeAtmosphereMultiplier =
    function(){

        return this.theme
            ? this.theme.atmosphereMultiplier
            : 1;

    };

    ExperienceEngine.prototype.getThemeMeteorMultiplier =
    function(){

        return this.theme
            ? this.theme.meteorMultiplier
            : 1;

    };

    ExperienceEngine.prototype.getThemeCameraMultiplier =
    function(){

        return this.theme
            ? this.theme.cameraMultiplier
            : 1;

    };

    // ==================================================
    // THEME-AWARE STAR COUNT
    // ==================================================

    ExperienceEngine.prototype.getThemedStarCount =
    function(baseCount){

        return Math.max(
            12,
            Math.floor(
                baseCount *
                this.getThemeStarMultiplier()
            )
        );

    };

    // ==================================================
    // THEME-AWARE METEOR DELAY
    // ==================================================

    ExperienceEngine.prototype.getThemedMeteorDelay =
    function(baseDelay){

        const multiplier =
            Math.max(
                .2,
                this.getThemeMeteorMultiplier()
            );

        return baseDelay / multiplier;

    };

    // ==================================================
    // THEME-AWARE CAMERA STRENGTH
    // ==================================================

    ExperienceEngine.prototype.getThemedCameraStrength =
    function(baseStrength){

        return (
            baseStrength *
            this.getThemeCameraMultiplier()
        );

    };

    // ==================================================
    // THEME MODULE
    // ==================================================

    ExperienceEngine.prototype.installThemeModule =
    function(){

        this.applyPageTheme();

        this.registerModule({

            name: "page-theme",

            build: engine => {

                engine.applyPageTheme();

            },

            update: () => {

                // Themes provide configuration rather
                // than frame-by-frame animation.

            },

            draw: () => {

                // Themes do not draw their own layer.

            }

        });

    };

    // ==================================================
    // OPTIONAL HTML THEME EXAMPLES
    //
    // data-sky-theme="invitation"
    // data-sky-theme="community"
    // data-sky-theme="schools"
    // data-sky-theme="partners"
    // data-sky-theme="volunteer"
    // ==================================================

    // ==================================================
    // PART 12 CONTINUES DIRECTLY BELOW
    // ==================================================

        // ==================================================
    // FINAL COMPATIBILITY CHECKS
    //
    // These safeguards connect the completed modules
    // without changing any earlier parts.
    // ==================================================

    ExperienceEngine.prototype.getActiveTargetFPS =
    function(){

        if(this.performanceState){

            return Math.max(
                1,
                this.performanceState.targetFPS
            );

        }

        return this.getTargetFPS();

    };

    ExperienceEngine.prototype.shouldRenderFrame =
    function(timestamp){

        const frameInterval =
            1000 /
            this.getActiveTargetFPS();

        return (
            timestamp -
            this.lastFrame
        ) >= frameInterval;

    };

    // Applies the page warmth from its original value,
    // preventing repeated changes after a resize.
    ExperienceEngine.prototype.applyStablePageTheme =
    function(){

        this.themeName =
            this.detectPageTheme();

        this.theme =
            this.getPageTheme();

        this.root.dataset.activeSkyTheme =
            this.themeName;

        if(
            typeof this.originalUniverseWarmth !==
            "number"
        ){

            this.originalUniverseWarmth =
                this.universe.warmth;

        }

        this.universe.warmth =
            clamp(
                this.originalUniverseWarmth +
                this.theme.warmthShift,
                -1,
                1
            );

    };

    // ==================================================
    // FINAL SCENE BUILD
    // ==================================================

    ExperienceEngine.prototype.buildCompleteScene =
    function(){

        this.clearScene();

        this.applyStablePageTheme();

        this.experienceProfile =
            this.createExperienceProfile();

        this.applyContrastPreference();

        this.buildScene();

        this.lastFrame = 0;

    };

    ExperienceEngine.prototype.rebuildScene =
    function(){

        this.buildCompleteScene();

    };

    // ==================================================
    // FINAL UPDATE ORDER
    //
    // Camera and device behavior update before visible
    // objects so every layer uses the current frame.
    // ==================================================

    ExperienceEngine.prototype.updateCompleteScene =
    function(){

        if(!this.modules){
            return;
        }

        const priority = [

            "mobile-intelligence",
            "accessibility",
            "camera",
            "performance",
            "page-theme",
            "atmosphere",
            "stars",
            "meteors"

        ];

        for(const moduleName of priority){

            const module =
                this.modules.find(
                    item =>
                        item.name === moduleName
                );

            if(
                module &&
                typeof module.update === "function"
            ){

                module.update(this);

            }

        }

    };

    // ==================================================
    // FINAL DRAW ORDER
    //
    // Atmosphere stays behind stars. Meteors and sparks
    // remain above the ambient sky.
    // ==================================================

    ExperienceEngine.prototype.drawCompleteScene =
    function(){

        if(!this.context){
            return;
        }

        this.clearCanvas();

        const drawOrder = [

            "atmosphere",
            "stars",
            "meteors"

        ];

        for(const moduleName of drawOrder){

            const module =
                this.modules.find(
                    item =>
                        item.name === moduleName
                );

            if(
                module &&
                typeof module.draw === "function"
            ){

                module.draw(this);

            }

        }

    };

    // ==================================================
    // MASTER ANIMATION LOOP
    // ==================================================

    ExperienceEngine.prototype.animate =
    function(timestamp){

        if(!this.running){
            return;
        }

        this.animationFrame =
            requestAnimationFrame(
                nextTimestamp =>
                    this.animate(nextTimestamp)
            );

        if(
            !this.pageVisible ||
            !this.rootVisible ||
            this.focusPaused
        ){

            this.lastFrame = 0;

            return;

        }

        if(
            !this.shouldRenderFrame(timestamp)
        ){

            return;

        }

        this.updateTiming(timestamp);

        this.updateCompleteScene();

        this.drawCompleteScene();

    };

    // ==================================================
    // ENGINE STARTUP
    // ==================================================

    ExperienceEngine.prototype.start =
    function(){

        if(this.running){
            return;
        }

        this.initializeCore();

        if(!this.context){
            return;
        }

        this.modules = [];

        // Configuration modules are installed first.
        this.installThemeModule();
        this.installMobileModule();
        this.installPerformanceModule();
        this.installAccessibilityModule();
        this.installCameraModule();

        // Visible modules are installed in draw order.
        this.installAtmosphereModule();
        this.installStarModule();
        this.installMeteorModule();

        this.applyStablePageTheme();

        this.experienceProfile =
            this.createExperienceProfile();

        this.applyContrastPreference();

        this.buildCompleteScene();

        this.running = true;

        this.canvas.style.opacity = "0";

        this.canvas.style.transition =
            `opacity ${SETTINGS.fadeInDuration}ms ease`;

        requestAnimationFrame(
            () => {

                this.canvas.style.opacity = "1";

            }
        );

        this.animationFrame =
            requestAnimationFrame(
                timestamp =>
                    this.animate(timestamp)
            );

    };

    // ==================================================
    // ENGINE CLEANUP
    // ==================================================

    ExperienceEngine.prototype.destroy =
    function(){

        this.running = false;

        if(this.animationFrame){

            cancelAnimationFrame(
                this.animationFrame
            );

        }

        clearTimeout(
            this.resizeTimer
        );

        if(this.resizeObserver){

            this.resizeObserver.disconnect();

        }

        if(this.visibilityObserver){

            this.visibilityObserver.disconnect();

        }

        if(this.canvas){

            this.canvas.remove();

        }

        this.clearScene();

    };

    // ==================================================
    // EXPERIENCE TARGETS
    //
    // Explicit data attributes are preferred. Common hero
    // names allow the engine to begin across the site.
    // ==================================================

    function findAllExperienceTargets(){

        const selectors = [

            "[data-sky-engine]",

            ".community-hero",

            ".invitation-hero",

            ".schools-hero",

            ".partners-hero",

            ".partner-hero",

            ".volunteer-hero"

        ];

        const targets = [];

        for(const selector of selectors){

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    if(!targets.includes(element)){

                        targets.push(element);

                    }

                });

        }

        return targets;

    }

    // ==================================================
    // APPLICATION STARTUP
    // ==================================================

    const activeEngines = [];

    function startExperienceEngine(){

        const targets =
            findAllExperienceTargets();

        for(const target of targets){

            const engine =
                new ExperienceEngine(target);

            engine.start();

            activeEngines.push(engine);

        }

        window.FutureReadyExperience = {

            version: "1.0.0",

            engines: activeEngines,

            restart(){

                for(const engine of activeEngines){

                    engine.destroy();

                }

                activeEngines.length = 0;

                startExperienceEngine();

            },

            stop(){

                for(const engine of activeEngines){

                    engine.destroy();

                }

                activeEngines.length = 0;

            }

        };

    }

    // The file works whether loaded in the head or at the
    // bottom of the page.
    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            startExperienceEngine,
            {
                once: true
            }
        );

    }
    else{

        startExperienceEngine();

    }

})();