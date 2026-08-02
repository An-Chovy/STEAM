/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE
 Atmosphere Polish v1.2.0

 Adds layered haze, softer movement, and greater depth
 without changing the core engine.
==========================================================
*/

(() => {

    "use strict";

    const RETRY_DELAY = 200;
    const MAX_ATTEMPTS = 12;

    let attempts = 0;

    function clampValue(value, minimum, maximum){

        return Math.max(
            minimum,
            Math.min(maximum, value)
        );

    }

    // Adds visual character to one atmosphere cloud.
    function prepareCloud(cloud){

        if(cloud.atmospherePolishReady){
            return;
        }

        const engine = cloud.engine;
        const random = engine.universe.random;

        cloud.atmospherePolishReady = true;

        cloud.stretchX =
            random.range(
                1.15,
                2.15
            );

        cloud.stretchY =
            random.range(
                .55,
                1
            );

        cloud.rotation =
            random.range(
                -Math.PI * .18,
                Math.PI * .18
            );

        cloud.secondaryRadius =
            random.range(
                .48,
                .78
            );

        cloud.secondaryOffsetX =
            random.range(
                -.24,
                .24
            );

        cloud.secondaryOffsetY =
            random.range(
                -.18,
                .18
            );

        cloud.secondaryOpacity =
            random.range(
                .24,
                .48
            );

        cloud.breathSpeed =
            random.range(
                .018,
                .052
            );

        cloud.breathPhase =
            random.range(
                0,
                Math.PI * 2
            );

        cloud.depthFade =
            random.range(
                .72,
                1
            );

    }

    function updateCloud(){

        prepareCloud(this);

        const engine = this.engine;

        if(engine.device.reducedMotion){

            this.opacity =
                this.baseOpacity *
                this.depthFade;

            return;

        }

        this.x +=
            this.driftX *
            engine.delta;

        this.y +=
            this.driftY *
            engine.delta;

        const pulse =
            Math.sin(
                engine.time *
                this.pulseSpeed +
                this.phase
            );

        const breathing =
            Math.sin(
                engine.time *
                this.breathSpeed +
                this.breathPhase
            );

        this.opacity =
            this.baseOpacity *
            this.depthFade *
            (
                .82 +
                pulse * .1 +
                breathing * .08
            );

        this.opacity =
            clampValue(
                this.opacity,
                0,
                .08
            );

        this.rotation +=
            engine.delta *
            .0007 *
            (
                this.depth > .2
                    ? 1
                    : -1
            );

        this.wrapPosition();

    }

    function drawCloud(){

        prepareCloud(this);

        const engine = this.engine;
        const context = engine.context;

        const drawX =
            this.x +
            engine.camera.x *
            this.depth *
            .38;

        const drawY =
            this.y +
            engine.camera.y *
            this.depth *
            .38;

        const breathing =
            1 +
            Math.sin(
                engine.time *
                this.breathSpeed +
                this.breathPhase
            ) * .025;

        const radius =
            this.radius *
            breathing;

        context.save();

        context.translate(
            drawX,
            drawY
        );

        context.rotate(
            this.rotation
        );

        context.scale(
            this.stretchX,
            this.stretchY
        );

        context.globalCompositeOperation =
            "screen";

        const primaryGradient =
            context.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                radius
            );

        primaryGradient.addColorStop(
            0,
            `rgba(${this.color},${this.opacity})`
        );

        primaryGradient.addColorStop(
            .26,
            `rgba(${this.color},${this.opacity * .74})`
        );

        primaryGradient.addColorStop(
            .62,
            `rgba(${this.color},${this.opacity * .24})`
        );

        primaryGradient.addColorStop(
            1,
            `rgba(${this.color},0)`
        );

        context.fillStyle =
            primaryGradient;

        context.beginPath();

        context.arc(
            0,
            0,
            radius,
            0,
            Math.PI * 2
        );

        context.fill();

        const secondaryX =
            radius *
            this.secondaryOffsetX;

        const secondaryY =
            radius *
            this.secondaryOffsetY;

        const secondaryRadius =
            radius *
            this.secondaryRadius;

        const secondaryGradient =
            context.createRadialGradient(
                secondaryX,
                secondaryY,
                0,
                secondaryX,
                secondaryY,
                secondaryRadius
            );

        secondaryGradient.addColorStop(
            0,
            `rgba(${this.color},${this.opacity * this.secondaryOpacity})`
        );

        secondaryGradient.addColorStop(
            .55,
            `rgba(${this.color},${this.opacity * .12})`
        );

        secondaryGradient.addColorStop(
            1,
            `rgba(${this.color},0)`
        );

        context.fillStyle =
            secondaryGradient;

        context.beginPath();

        context.arc(
            secondaryX,
            secondaryY,
            secondaryRadius,
            0,
            Math.PI * 2
        );

        context.fill();

        context.restore();

    }

    function installAtmospherePolish(){

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
                    installAtmospherePolish,
                    RETRY_DELAY
                );

            }

            return;

        }

        for(const engine of experience.engines){

            const clouds =
                engine.scene?.atmosphere;

            if(!clouds || !clouds.length){
                continue;
            }

            const CloudPrototype =
                Object.getPrototypeOf(
                    clouds[0]
                );

            if(
                CloudPrototype
                    .atmospherePolishInstalled
            ){
                continue;
            }

            CloudPrototype
                .atmospherePolishInstalled = true;

            CloudPrototype.update =
                updateCloud;

            CloudPrototype.draw =
                drawCloud;

            for(const cloud of clouds){

                prepareCloud(cloud);

            }

        }

    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            installAtmospherePolish,
            {
                once:true
            }
        );

    }
    else{

        installAtmospherePolish();

    }

})();