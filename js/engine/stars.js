/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Shared Star Field

 Generates one continuous procedural star field.
 Each section renders a different window into that field.
==========================================================
*/

(() => {

    "use strict";

    const namespace =
        window.FutureReadyV2 =
        window.FutureReadyV2 || {};

    if(
        !namespace.Universe ||
        !namespace.SectionEngine
    ){

        console.warn(
            "Future Ready V2: universe.js and section-engine.js must load before stars.js."
        );

        return;

    }

    const clamp =
        namespace.clamp;

    // ==================================================
    // STAR SETTINGS
    // ==================================================

    const STAR_SETTINGS = {

        worldWidth: 2400,

        worldHeightPerSection: 2400,

        desktopDensity: .00012,

        tabletDensity: .00010,

        phoneDensity: .000085,

        minimumPerSection: 24,

        maximumDesktop: 340,

        maximumTablet: 230,

        maximumPhone: 150

    };

    // ==================================================
    // STAR
    // ==================================================

    class SharedStar{

        constructor(
            universe,
            random,
            worldX,
            worldY
        ){

            this.universe =
                universe;

            this.worldX =
                worldX;

            this.worldY =
                worldY;

            this.depth =
                Math.pow(
                    random.next(),
                    1.75
                );

            this.radius =
                .3 +
                this.depth * 2.2;

            this.baseOpacity =
                .12 +
                this.depth * .82;

            this.opacity =
                this.baseOpacity;

            this.twinkleSpeed =
                random.range(
                    .28,
                    1.12
                );

            this.twinklePhase =
                random.range(
                    0,
                    Math.PI * 2
                );

            this.twinkleAmount =
                random.range(
                    .02,
                    .085
                ) *
                universe.twinkleStrength;

            this.color =
                this.chooseColor(
                    random
                );

            this.heroCandidate =
                this.depth > .88 &&
                random.chance(
                    universe.heroStarFrequency
                );

        }

        chooseColor(random){

            const roll =
                random.next() +
                this.universe.warmth *
                .12;

            if(roll < .72){
                return "255,255,255";
            }

            if(roll < .90){
                return "220,235,255";
            }

            return "255,239,218";

        }

        update(time, reducedMotion){

            if(reducedMotion){

                this.opacity =
                    this.baseOpacity;

                return;

            }

            const twinkle =
                Math.sin(
                    time *
                    this.twinkleSpeed +
                    this.twinklePhase
                ) *
                this.twinkleAmount;

            this.opacity =
                clamp(
                    this.baseOpacity +
                    twinkle,
                    .035,
                    1
                );

        }

        draw(section){

            const context =
                section.context;

            const screenX =
                this.worldX -
                section.camera.worldX +
                section.camera.x *
                this.depth;

            const screenY =
                this.worldY -
                section.camera.worldY +
                section.camera.y *
                this.depth;

            if(
                screenX < -30 ||
                screenX > section.width + 30 ||
                screenY < -30 ||
                screenY > section.height + 30
            ){
                return;
            }

            context.save();

            if(this.depth > .58){

                context.shadowBlur =
                    this.radius *
                    (
                        3.5 +
                        this.depth * 3.5
                    );

                context.shadowColor =
                    `rgba(${this.color},${this.opacity})`;

            }

            context.fillStyle =
                `rgba(${this.color},${this.opacity})`;

            context.beginPath();

            context.arc(
                screenX,
                screenY,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();

            if(this.heroCandidate){

                const spikeLength =
                    this.radius * 5;

                const spikeOpacity =
                    this.opacity * .32;

                const horizontal =
                    context.createLinearGradient(
                        screenX - spikeLength,
                        screenY,
                        screenX + spikeLength,
                        screenY
                    );

                horizontal.addColorStop(
                    0,
                    `rgba(${this.color},0)`
                );

                horizontal.addColorStop(
                    .5,
                    `rgba(${this.color},${spikeOpacity})`
                );

                horizontal.addColorStop(
                    1,
                    `rgba(${this.color},0)`
                );

                context.strokeStyle =
                    horizontal;

                context.lineWidth =
                    .7;

                context.beginPath();

                context.moveTo(
                    screenX - spikeLength,
                    screenY
                );

                context.lineTo(
                    screenX + spikeLength,
                    screenY
                );

                context.stroke();

                const verticalLength =
                    spikeLength * .72;

                const vertical =
                    context.createLinearGradient(
                        screenX,
                        screenY - verticalLength,
                        screenX,
                        screenY + verticalLength
                    );

                vertical.addColorStop(
                    0,
                    `rgba(${this.color},0)`
                );

                vertical.addColorStop(
                    .5,
                    `rgba(${this.color},${spikeOpacity * .8})`
                );

                vertical.addColorStop(
                    1,
                    `rgba(${this.color},0)`
                );

                context.strokeStyle =
                    vertical;

                context.beginPath();

                context.moveTo(
                    screenX,
                    screenY - verticalLength
                );

                context.lineTo(
                    screenX,
                    screenY + verticalLength
                );

                context.stroke();

            }

            context.restore();

        }

    }

    // ==================================================
    // SHARED STAR FIELD
    // ==================================================

    class SharedStarField{

        constructor(
            universe,
            sectionEngine
        ){

            this.universe =
                universe;

            this.sectionEngine =
                sectionEngine;

            this.stars = [];

            this.worldWidth =
                STAR_SETTINGS.worldWidth;

            this.worldHeight = 1;

            this.build();

        }

        getDensity(section){

            if(section.device.phone){
                return STAR_SETTINGS.phoneDensity;
            }

            if(section.device.tablet){
                return STAR_SETTINGS.tabletDensity;
            }

            return STAR_SETTINGS.desktopDensity;

        }

        getMaximum(section){

            if(section.device.phone){
                return STAR_SETTINGS.maximumPhone;
            }

            if(section.device.tablet){
                return STAR_SETTINGS.maximumTablet;
            }

            return STAR_SETTINGS.maximumDesktop;

        }

        build(){

            this.stars.length = 0;

            const sections =
                this.sectionEngine.sections;

            if(!sections.length){
                return;
            }

            const finalSection =
                sections[
                    sections.length - 1
                ];

            this.worldHeight =
                finalSection.camera.worldY +
                finalSection.height +
                STAR_SETTINGS.worldHeightPerSection;

            for(
                const section of
                sections
            ){

                const area =
                    section.width *
                    section.height;

                const requested =
                    Math.floor(
                        area *
                        this.getDensity(section) *
                        this.universe.density
                    );

                const count =
                    Math.min(
                        this.getMaximum(section),
                        Math.max(
                            STAR_SETTINGS.minimumPerSection,
                            requested
                        )
                    );

                const random =
                    this.universe.getSectionRandom(
                        section.index + 500
                    );

                const sectionTop =
                    section.camera.worldY;

                const sectionBottom =
                    sectionTop +
                    section.height;

                for(
                    let index = 0;
                    index < count;
                    index++
                ){

                    const worldX =
                        random.range(
                            0,
                            Math.max(
                                this.worldWidth,
                                section.width
                            )
                        );

                    let worldY;

                    // A loose galactic band creates natural clustering.
                    if(random.chance(.44)){

                        const bandCenter =
                            sectionTop +
                            section.height *
                            random.range(
                                .34,
                                .62
                            );

                        worldY =
                            bandCenter +
                            random.range(
                                -section.height * .19,
                                section.height * .19
                            );

                    }
                    else{

                        worldY =
                            random.range(
                                sectionTop,
                                sectionBottom
                            );

                    }

                    this.stars.push(
                        new SharedStar(
                            this.universe,
                            random,
                            worldX,
                            worldY
                        )
                    );

                }

            }

        }

        update(){

            const time =
                this.universe.getTime();

            for(
                const star of
                this.stars
            ){

                star.update(
                    time,
                    false
                );

            }

        }

        draw(section){

            if(
                !section.visible ||
                !section.context
            ){
                return;
            }

            for(
                const star of
                this.stars
            ){

                star.draw(section);

            }

        }

    }

    // ==================================================
    // GLOBAL EXPORT
    // ==================================================

    namespace.SharedStar =
        SharedStar;

    namespace.StarField =
        SharedStarField;

})();