/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE
 True Depth v1.4.0

 Separates distant, middle, and nearby stars into distinct
 motion layers without changing the core engine.
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

    // Assigns each star a stable visual depth layer.
    function prepareDepth(star){

        if(star.trueDepthReady){
            return;
        }

        const engine = star.engine;
        const random = engine.universe.random;

        star.trueDepthReady = true;

        if(star.depth < .34){

            star.depthLayer = "far";

            star.parallaxStrength =
                random.range(
                    .08,
                    .18
                );

            star.driftStrength =
                random.range(
                    .05,
                    .12
                );

            star.depthScale =
                random.range(
                    .72,
                    .9
                );

        }
        else if(star.depth < .72){

            star.depthLayer = "middle";

            star.parallaxStrength =
                random.range(
                    .28,
                    .52
                );

            star.driftStrength =
                random.range(
                    .12,
                    .28
                );

            star.depthScale =
                random.range(
                    .9,
                    1.08
                );

        }
        else{

            star.depthLayer = "near";

            star.parallaxStrength =
                random.range(
                    .72,
                    1.08
                );

            star.driftStrength =
                random.range(
                    .28,
                    .55
                );

            star.depthScale =
                random.range(
                    1.04,
                    1.22
                );

        }

        star.depthDriftAngle =
            random.range(
                0,
                Math.PI * 2
            );

        star.depthDriftSpeed =
            random.range(
                .006,
                .022
            );

        star.depthDriftRadius =
            random.range(
                .25,
                1.1
            ) *
            star.driftStrength;

        star.depthOffsetX = 0;
        star.depthOffsetY = 0;

    }

    function installDepthOnEngine(engine){

        const stars =
            engine.scene?.stars;

        if(!stars || !stars.length){
            return false;
        }

        const StarPrototype =
            Object.getPrototypeOf(
                stars[0]
            );

        if(StarPrototype.trueDepthInstalled){

            for(const star of stars){
                prepareDepth(star);
            }

            return true;

        }

        StarPrototype.trueDepthInstalled = true;

        const previousUpdate =
            StarPrototype.update;

        const previousDraw =
            StarPrototype.draw;

        StarPrototype.update = function(){

            prepareDepth(this);

            if(typeof previousUpdate === "function"){

                previousUpdate.call(this);

            }

            const engine =
                this.engine;

            if(engine.device.reducedMotion){

                this.depthOffsetX = 0;
                this.depthOffsetY = 0;

                return;

            }

            const time =
                engine.time *
                this.depthDriftSpeed;

            this.depthOffsetX =
                Math.cos(
                    time +
                    this.depthDriftAngle
                ) *
                this.depthDriftRadius;

            this.depthOffsetY =
                Math.sin(
                    time * .82 +
                    this.depthDriftAngle
                ) *
                this.depthDriftRadius *
                .65;

        };

        StarPrototype.draw = function(){

            prepareDepth(this);

            const engine =
                this.engine;

            const context =
                engine.context;

            const cameraX =
                engine.camera.x *
                this.parallaxStrength;

            const cameraY =
                engine.camera.y *
                this.parallaxStrength;

            const drawX =
                this.x +
                cameraX +
                this.depthOffsetX;

            const drawY =
                this.y +
                cameraY +
                this.depthOffsetY;

            const radius =
                this.radius *
                this.depthScale;

            const opacityMultiplier =
                this.depthLayer === "far"
                    ? .76
                    : this.depthLayer === "middle"
                        ? .9
                        : 1;

            const finalOpacity =
                clamp(
                    this.opacity *
                    opacityMultiplier,
                    .025,
                    1
                );

            context.save();

            if(this.depthLayer === "near"){

                context.shadowBlur =
                    radius *
                    (
                        4.5 +
                        this.depth * 3.5
                    );

                context.shadowColor =
                    `rgba(${this.color},${finalOpacity})`;

            }
            else if(this.depthLayer === "middle"){

                context.shadowBlur =
                    radius * 3;

                context.shadowColor =
                    `rgba(${this.color},${finalOpacity * .75})`;

            }

            context.fillStyle =
                `rgba(${this.color},${finalOpacity})`;

            context.beginPath();

            context.arc(
                drawX,
                drawY,
                radius,
                0,
                Math.PI * 2
            );

            context.fill();

            // Preserve the polished diffraction spikes.
            if(
                this.hasLightSpikes ||
                this.isHeroStar
            ){

                const spikeLength =
                    radius *
                    (
                        this.isHeroStar
                            ? 5.8
                            : 3.8
                    );

                const spikeOpacity =
                    finalOpacity *
                    (
                        this.isHeroStar
                            ? .48
                            : .25
                    );

                const horizontalGradient =
                    context.createLinearGradient(
                        drawX - spikeLength,
                        drawY,
                        drawX + spikeLength,
                        drawY
                    );

                horizontalGradient.addColorStop(
                    0,
                    `rgba(${this.color},0)`
                );

                horizontalGradient.addColorStop(
                    .5,
                    `rgba(${this.color},${spikeOpacity})`
                );

                horizontalGradient.addColorStop(
                    1,
                    `rgba(${this.color},0)`
                );

                context.strokeStyle =
                    horizontalGradient;

                context.lineWidth = .7;

                context.beginPath();

                context.moveTo(
                    drawX - spikeLength,
                    drawY
                );

                context.lineTo(
                    drawX + spikeLength,
                    drawY
                );

                context.stroke();

                const verticalLength =
                    spikeLength * .72;

                const verticalGradient =
                    context.createLinearGradient(
                        drawX,
                        drawY - verticalLength,
                        drawX,
                        drawY + verticalLength
                    );

                verticalGradient.addColorStop(
                    0,
                    `rgba(${this.color},0)`
                );

                verticalGradient.addColorStop(
                    .5,
                    `rgba(${this.color},${spikeOpacity})`
                );

                verticalGradient.addColorStop(
                    1,
                    `rgba(${this.color},0)`
                );

                context.strokeStyle =
                    verticalGradient;

                context.beginPath();

                context.moveTo(
                    drawX,
                    drawY - verticalLength
                );

                context.lineTo(
                    drawX,
                    drawY + verticalLength
                );

                context.stroke();

            }

            context.restore();

        };

        for(const star of stars){

            prepareDepth(star);

        }

        return true;

    }

    function installTrueDepth(){

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
                    installTrueDepth,
                    RETRY_DELAY
                );

            }

            return;

        }

        let installed = false;

        for(const engine of experience.engines){

            if(installDepthOnEngine(engine)){
                installed = true;
            }

        }

        if(
            !installed &&
            attempts < MAX_ATTEMPTS
        ){

            attempts++;

            setTimeout(
                installTrueDepth,
                RETRY_DELAY
            );

        }

    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            installTrueDepth,
            {
                once: true
            }
        );

    }
    else{

        installTrueDepth();

    }

})();