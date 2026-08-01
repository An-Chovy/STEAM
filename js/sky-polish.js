/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE
 Star Polish v1.1.0
==========================================================
*/

(() => {

    "use strict";

    function applyStarPolish(){

        const experience =
            window.FutureReadyExperience;

        if(
            !experience ||
            !experience.engines.length
        ){
            return;
        }

        for(const engine of experience.engines){

            const stars =
                engine.scene?.stars;

            if(!stars || !stars.length){
                continue;
            }

            const StarPrototype =
                Object.getPrototypeOf(stars[0]);

            if(StarPrototype.starPolishInstalled){
                continue;
            }

            StarPrototype.starPolishInstalled = true;

            // Each star receives a distinct visual character.
            StarPrototype.preparePolish = function(){

                if(this.polishReady){
                    return;
                }

                const random =
                    this.engine.universe.random;

                this.polishReady = true;

                this.shimmerSpeed =
                    random.range(.08,.32);

                this.shimmerPhase =
                    random.range(
                        0,
                        Math.PI * 2
                    );

                this.glowStrength =
                    random.range(.55,1);

                this.hasLightSpikes =
                    this.depth > .82 &&
                    random.chance(.18);

                this.isHeroStar =
                    this.depth > .9 &&
                    random.chance(
                        this.engine.universe
                            .heroStarChance
                    );

                if(this.isHeroStar){

                    this.radius *=
                        random.range(1.25,1.65);

                    this.baseOpacity =
                        Math.min(
                            1,
                            this.baseOpacity + .12
                        );

                }

            };

            StarPrototype.update = function(){

                this.preparePolish();

                const engine =
                    this.engine;

                if(engine.device.reducedMotion){

                    this.opacity =
                        this.baseOpacity;

                    return;

                }

                const softTwinkle =
                    Math.sin(
                        engine.time *
                        this.twinkleSpeed +
                        this.twinklePhase
                    );

                const slowShimmer =
                    Math.sin(
                        engine.time *
                        this.shimmerSpeed +
                        this.shimmerPhase
                    );

                const movement =
                    softTwinkle * .72 +
                    slowShimmer * .28;

                this.opacity =
                    Math.max(
                        .04,
                        Math.min(
                            1,
                            this.baseOpacity +
                            movement *
                            this.twinkleAmount
                        )
                    );

            };

            StarPrototype.draw = function(){

                this.preparePolish();

                const engine =
                    this.engine;

                const context =
                    engine.context;

                const drawX =
                    this.x +
                    engine.camera.x *
                    this.depth;

                const drawY =
                    this.y +
                    engine.camera.y *
                    this.depth;

                const bloom =
                    this.radius *
                    (
                        2.8 +
                        this.depth *
                        3.8
                    ) *
                    this.glowStrength;

                context.save();

                if(this.depth > .52){

                    context.shadowBlur =
                        bloom;

                    context.shadowColor =
                        `rgba(${this.color},${this.opacity})`;

                }

                context.fillStyle =
                    `rgba(${this.color},${this.opacity})`;

                context.beginPath();

                context.arc(
                    drawX,
                    drawY,
                    this.radius,
                    0,
                    Math.PI * 2
                );

                context.fill();

                if(
                    this.hasLightSpikes ||
                    this.isHeroStar
                ){

                    const spikeLength =
                        this.radius *
                        (
                            this.isHeroStar
                                ? 5.8
                                : 3.8
                        );

                    const spikeOpacity =
                        this.opacity *
                        (
                            this.isHeroStar
                                ? .48
                                : .26
                        );

                    const gradientX =
                        context.createLinearGradient(
                            drawX - spikeLength,
                            drawY,
                            drawX + spikeLength,
                            drawY
                        );

                    gradientX.addColorStop(
                        0,
                        `rgba(${this.color},0)`
                    );

                    gradientX.addColorStop(
                        .5,
                        `rgba(${this.color},${spikeOpacity})`
                    );

                    gradientX.addColorStop(
                        1,
                        `rgba(${this.color},0)`
                    );

                    context.strokeStyle =
                        gradientX;

                    context.lineWidth = .75;

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

                    const gradientY =
                        context.createLinearGradient(
                            drawX,
                            drawY - verticalLength,
                            drawX,
                            drawY + verticalLength
                        );

                    gradientY.addColorStop(
                        0,
                        `rgba(${this.color},0)`
                    );

                    gradientY.addColorStop(
                        .5,
                        `rgba(${this.color},${spikeOpacity})`
                    );

                    gradientY.addColorStop(
                        1,
                        `rgba(${this.color},0)`
                    );

                    context.strokeStyle =
                        gradientY;

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

        }

    }

    function startPolish(){

        applyStarPolish();

        // Allows time for engines created after page startup.
        setTimeout(
            applyStarPolish,
            250
        );

    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            startPolish,
            {
                once:true
            }
        );

    }
    else{

        startPolish();

    }

})();