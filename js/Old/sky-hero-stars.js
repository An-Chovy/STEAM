/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE
 Hero Stars v1.3.0

 Adds rare, slow stellar flares without changing
 the core engine or the existing star renderer.
==========================================================
*/

(() => {

    "use strict";

    const RETRY_DELAY = 200;
    const MAX_ATTEMPTS = 15;

    let attempts = 0;

    function clamp(value, minimum, maximum){

        return Math.max(
            minimum,
            Math.min(maximum, value)
        );

    }

    // Chooses a small number of prominent stars.
    function selectHeroStars(engine){

        const stars =
            engine.scene?.stars || [];

        if(!stars.length){
            return [];
        }

        const candidates =
            stars
                .filter(star =>
                    star.depth > .72
                )
                .sort((first, second) =>
                    second.depth -
                    first.depth
                );

        let desiredCount;

        if(engine.device.phone){

            desiredCount = 2;

        }
        else if(engine.device.tablet){

            desiredCount = 3;

        }
        else{

            desiredCount = 4;

        }

        desiredCount =
            Math.min(
                desiredCount,
                candidates.length
            );

        const selected = [];

        while(
            candidates.length &&
            selected.length < desiredCount
        ){

            const index =
                Math.floor(
                    engine.universe.random.next() *
                    candidates.length
                );

            const star =
                candidates.splice(index, 1)[0];

            selected.push({

                star,

                flare: 0,

                flareStart: 0,

                flareDuration:
                    engine.universe.random.range(
                        2.4,
                        4.8
                    ),

                nextFlare:
                    engine.time +
                    engine.universe.random.range(
                        5,
                        18
                    ),

                maximumFlare:
                    engine.universe.random.range(
                        .42,
                        .78
                    ),

                spikeRotation:
                    engine.universe.random.range(
                        -.12,
                        .12
                    )

            });

        }

        return selected;

    }

    function scheduleNextFlare(engine, heroStar){

        const activity =
            clamp(
                engine.universe.activity,
                .25,
                1.5
            );

        const minimumDelay =
            engine.device.phone
                ? 14
                : 10;

        const maximumDelay =
            engine.device.phone
                ? 34
                : 28;

        const delay =
            engine.universe.random.range(
                minimumDelay,
                maximumDelay
            ) /
            activity;

        heroStar.nextFlare =
            engine.time + delay;

        heroStar.flareDuration =
            engine.universe.random.range(
                2.4,
                4.8
            );

        heroStar.maximumFlare =
            engine.universe.random.range(
                .42,
                .78
            );

    }

    function updateHeroStars(engine){

        const state =
            engine.heroStars;

        if(!state){
            return;
        }

        for(const heroStar of state.items){

            if(engine.device.reducedMotion){

                heroStar.flare = .08;

                continue;

            }

            if(
                heroStar.flareStart === 0 &&
                engine.time >= heroStar.nextFlare
            ){

                heroStar.flareStart =
                    engine.time;

            }

            if(heroStar.flareStart > 0){

                const progress =
                    (
                        engine.time -
                        heroStar.flareStart
                    ) /
                    heroStar.flareDuration;

                if(progress >= 1){

                    heroStar.flare = 0;
                    heroStar.flareStart = 0;

                    scheduleNextFlare(
                        engine,
                        heroStar
                    );

                    continue;

                }

                // Sine easing gives a slow rise and fall.
                heroStar.flare =
                    Math.sin(
                        progress * Math.PI
                    ) *
                    heroStar.maximumFlare;

            }
            else{

                heroStar.flare = 0;

            }

        }

    }

    function drawHeroStar(engine, heroStar){

        if(heroStar.flare <= .01){
            return;
        }

        const star =
            heroStar.star;

        const context =
            engine.context;

        const drawX =
            star.x +
            engine.camera.x *
            star.depth;

        const drawY =
            star.y +
            engine.camera.y *
            star.depth;

        const strength =
            heroStar.flare;

        const radius =
            star.radius *
            (
                5 +
                strength * 8
            );

        context.save();

        context.translate(
            drawX,
            drawY
        );

        context.rotate(
            heroStar.spikeRotation
        );

        context.globalCompositeOperation =
            "screen";

        // Soft bloom around the star.
        const glow =
            context.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                radius
            );

        glow.addColorStop(
            0,
            `rgba(${star.color},${strength * .42})`
        );

        glow.addColorStop(
            .3,
            `rgba(${star.color},${strength * .16})`
        );

        glow.addColorStop(
            1,
            `rgba(${star.color},0)`
        );

        context.fillStyle = glow;

        context.beginPath();

        context.arc(
            0,
            0,
            radius,
            0,
            Math.PI * 2
        );

        context.fill();

        const horizontalLength =
            radius * 1.55;

        const verticalLength =
            radius * .92;

        const horizontalGradient =
            context.createLinearGradient(
                -horizontalLength,
                0,
                horizontalLength,
                0
            );

        horizontalGradient.addColorStop(
            0,
            `rgba(${star.color},0)`
        );

        horizontalGradient.addColorStop(
            .5,
            `rgba(${star.color},${strength * .62})`
        );

        horizontalGradient.addColorStop(
            1,
            `rgba(${star.color},0)`
        );

        context.strokeStyle =
            horizontalGradient;

        context.lineWidth =
            engine.device.phone
                ? .65
                : .8;

        context.beginPath();

        context.moveTo(
            -horizontalLength,
            0
        );

        context.lineTo(
            horizontalLength,
            0
        );

        context.stroke();

        const verticalGradient =
            context.createLinearGradient(
                0,
                -verticalLength,
                0,
                verticalLength
            );

        verticalGradient.addColorStop(
            0,
            `rgba(${star.color},0)`
        );

        verticalGradient.addColorStop(
            .5,
            `rgba(${star.color},${strength * .46})`
        );

        verticalGradient.addColorStop(
            1,
            `rgba(${star.color},0)`
        );

        context.strokeStyle =
            verticalGradient;

        context.beginPath();

        context.moveTo(
            0,
            -verticalLength
        );

        context.lineTo(
            0,
            verticalLength
        );

        context.stroke();

        context.restore();

    }

    function installOnEngine(engine){

        if(engine.heroStarsInstalled){
            return;
        }

        engine.heroStarsInstalled = true;

        engine.heroStars = {

            items:
                selectHeroStars(engine)

        };

        const module = {

            name: "hero-stars-addon",

            build: currentEngine => {

                currentEngine.heroStars.items =
                    selectHeroStars(
                        currentEngine
                    );

            },

            update: currentEngine => {

                updateHeroStars(
                    currentEngine
                );

            },

            draw: currentEngine => {

                for(
                    const heroStar of
                    currentEngine.heroStars.items
                ){

                    drawHeroStar(
                        currentEngine,
                        heroStar
                    );

                }

            }

        };

        engine.registerModule(module);

        // The main scene was already built before this
        // add-on loaded, so initialize this module now.
        module.build(engine);

        // Hero stars must render after normal stars.
        const originalDrawCompleteScene =
            engine.drawCompleteScene.bind(engine);

        engine.drawCompleteScene = function(){

            originalDrawCompleteScene();

            module.draw(engine);

        };

    }

    function installHeroStars(){

        const experience =
            window.FutureReadyExperience;

        if(
            !experience ||
            !Array.isArray(experience.engines) ||
            !experience.engines.length
        ){

            attempts++;

            if(attempts < MAX_ATTEMPTS){

                setTimeout(
                    installHeroStars,
                    RETRY_DELAY
                );

            }

            return;

        }

        for(const engine of experience.engines){

            installOnEngine(engine);

        }

    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            installHeroStars,
            {
                once: true
            }
        );

    }
    else{

        installHeroStars();

    }

})();