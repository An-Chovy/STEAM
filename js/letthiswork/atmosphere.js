/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Shared Atmosphere

 Creates haze and cosmic depth across every section.
 Each section views a different part of one atmosphere.
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
            "Future Ready V2: universe.js and section-engine.js must load before atmosphere.js."
        );

        return;

    }

    const clamp =
        namespace.clamp;

    // ==================================================
    // ATMOSPHERE SETTINGS
    // ==================================================

    const ATMOSPHERE_SETTINGS = {

    desktopCloudsPerSection: 6,
    tabletCloudsPerSection: 6,
    phoneCloudsPerSection: 5,

    desktopDustPerSection: 30,
    tabletDustPerSection: 26,
    phoneDustPerSection: 22

};

    // ==================================================
    // SHARED ATMOSPHERE CLOUD
    // ==================================================

    class SharedAtmosphereCloud{

        constructor(
            universe,
            random,
            worldX,
            worldY,
            sectionWidth
        ){

            this.universe =
                universe;

            this.worldX =
                worldX;

            this.worldY =
                worldY;

            this.depth =
                random.range(
                    .06,
                    .28
                );

            this.radius =
                random.range(
                    sectionWidth * .18,
                    sectionWidth * .44
                );

            this.stretchX =
                random.range(
                    1.2,
                    2.25
                );

            this.stretchY =
                random.range(
                    .5,
                    1
                );

            this.rotation =
                random.range(
                    -Math.PI * .2,
                    Math.PI * .2
                );

            this.rotationSpeed =
                random.range(
                    -.0012,
                    .0012
                );

            this.baseOpacity =
                random.range(
                    .012,
                    .042
                ) *
                universe.atmosphere;

            this.opacity =
                this.baseOpacity;

            this.driftX =
                random.range(
                    -.22,
                    .22
                );

            this.driftY =
                random.range(
                    -.11,
                    .11
                );

            this.phase =
                random.range(
                    0,
                    Math.PI * 2
                );

            this.breathSpeed =
                random.range(
                    .018,
                    .055
                );

            this.color =
                this.chooseColor(
                    random
                );

        }

        chooseColor(random){

            const roll =
                random.next() +
                this.universe.warmth * .15;

            if(roll < .48){
                return "150,190,255";
            }

            if(roll < .88){
                return "255,255,255";
            }

            return "224,49,63";

        }

        update(delta, time, reducedMotion){

            if(reducedMotion){

                this.opacity =
                    this.baseOpacity;

                return;

            }

            this.worldX +=
                this.driftX *
                delta;

            this.worldY +=
                this.driftY *
                delta;

            this.rotation +=
                this.rotationSpeed *
                delta;

            const breathing =
                Math.sin(
                    time *
                    this.breathSpeed +
                    this.phase
                );

            this.opacity =
                clamp(
                    this.baseOpacity *
                    (
                        .84 +
                        breathing * .16
                    ),
                    0,
                    .07
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

            const horizontalLimit =
                this.radius *
                this.stretchX;

            const verticalLimit =
                this.radius *
                this.stretchY;

            if(
                screenX < -horizontalLimit ||
                screenX >
                    section.width +
                    horizontalLimit ||
                screenY < -verticalLimit ||
                screenY >
                    section.height +
                    verticalLimit
            ){
                return;
            }

            context.save();

            context.translate(
                screenX,
                screenY
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

            const gradient =
                context.createRadialGradient(
                    0,
                    0,
                    0,
                    0,
                    0,
                    this.radius
                );

            gradient.addColorStop(
                0,
                `rgba(${this.color},${this.opacity})`
            );

            gradient.addColorStop(
                .34,
                `rgba(${this.color},${this.opacity * .58})`
            );

            gradient.addColorStop(
                .7,
                `rgba(${this.color},${this.opacity * .16})`
            );

            gradient.addColorStop(
                1,
                `rgba(${this.color},0)`
            );

            context.fillStyle =
                gradient;

            context.beginPath();

            context.arc(
                0,
                0,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();

            context.restore();

        }

    }

    // ==================================================
    // SHARED COSMIC DUST
    // ==================================================

    class SharedDustParticle{

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
                random.range(
                    .04,
                    .22
                );

            this.radius =
                random.range(
                    .3,
                    1.05
                );

            this.baseOpacity =
                random.range(
                    .012,
                    .052
                );

            this.opacity =
                this.baseOpacity;

            this.velocityX =
                random.range(
                    -.32,
                    .32
                );

            this.velocityY =
                random.range(
                    -.18,
                    .18
                );

            this.phase =
                random.range(
                    0,
                    Math.PI * 2
                );

            this.shimmerSpeed =
                random.range(
                    .06,
                    .22
                );

            this.color =
                this.chooseColor();

        }

        chooseColor(){

            if(this.universe.warmth > .3){
                return "255,228,216";
            }

            if(this.universe.warmth < -.3){
                return "205,225,255";
            }

            return "255,255,255";

        }

        update(delta, time, reducedMotion){

            if(reducedMotion){

                this.opacity =
                    this.baseOpacity;

                return;

            }

            this.worldX +=
                this.velocityX *
                delta;

            this.worldY +=
                this.velocityY *
                delta;

            this.opacity =
                this.baseOpacity *
                (
                    .82 +
                    Math.sin(
                        time *
                        this.shimmerSpeed +
                        this.phase
                    ) * .18
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
                screenX < -10 ||
                screenX > section.width + 10 ||
                screenY < -10 ||
                screenY > section.height + 10
            ){
                return;
            }

            context.save();

            context.globalCompositeOperation =
                "screen";

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

            context.restore();

        }

    }

    // ==================================================
    // SHARED ATMOSPHERE FIELD
    // ==================================================

    class SharedAtmosphereField{

        constructor(
            universe,
            sectionEngine
        ){

            this.universe =
                universe;

            this.sectionEngine =
                sectionEngine;

            this.clouds = [];
            this.dust = [];

            this.previousTime =
                universe.getTime();

            this.build();

        }

        getCloudCount(section){

            if(section.device.phone){
                return ATMOSPHERE_SETTINGS
                    .phoneCloudsPerSection;
            }

            if(section.device.tablet){
                return ATMOSPHERE_SETTINGS
                    .tabletCloudsPerSection;
            }

            return ATMOSPHERE_SETTINGS
                .desktopCloudsPerSection;

        }

        getDustCount(section){

            if(section.device.phone){
                return ATMOSPHERE_SETTINGS
                    .phoneDustPerSection;
            }

            if(section.device.tablet){
                return ATMOSPHERE_SETTINGS
                    .tabletDustPerSection;
            }

            return ATMOSPHERE_SETTINGS
                .desktopDustPerSection;

        }

        build(){

            this.clouds.length = 0;
            this.dust.length = 0;

            for(
                const section of
                this.sectionEngine.sections
            ){

                const random =
                    this.universe.getSectionRandom(
                        section.index + 1200
                    );

                const sectionTop =
                    section.camera.worldY;

                const sectionBottom =
                    sectionTop +
                    section.height;

                const worldWidth =
                    Math.max(
                        section.width,
                        2400
                    );

                const cloudCount =
                    this.getCloudCount(
                        section
                    );

                for(
                    let index = 0;
                    index < cloudCount;
                    index++
                ){

                    this.clouds.push(

                        new SharedAtmosphereCloud(
                            this.universe,
                            random,
                            random.range(
                                -section.width * .2,
                                worldWidth +
                                section.width * .2
                            ),
                            random.range(
                                sectionTop -
                                section.height * .2,
                                sectionBottom +
                                section.height * .2
                            ),
                            section.width
                        )

                    );

                }

                const dustCount =
                    this.getDustCount(
                        section
                    );

                for(
                    let index = 0;
                    index < dustCount;
                    index++
                ){

                    this.dust.push(

                        new SharedDustParticle(
                            this.universe,
                            random,
                            random.range(
                                0,
                                worldWidth
                            ),
                            random.range(
                                sectionTop,
                                sectionBottom
                            )
                        )

                    );

                }

            }

        }

        update(){

            const time =
                this.universe.getTime();

            const delta =
                Math.min(
                    time -
                    this.previousTime,
                    .05
                );

            this.previousTime =
                time;

            const reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

            for(
                const cloud of
                this.clouds
            ){

                cloud.update(
                    delta,
                    time,
                    reducedMotion
                );

            }

            for(
                const particle of
                this.dust
            ){

                particle.update(
                    delta,
                    time,
                    reducedMotion
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
                const cloud of
                this.clouds
            ){

                cloud.draw(
                    section
                );

            }

            for(
                const particle of
                this.dust
            ){

                particle.draw(
                    section
                );

            }

        }

    }

    // ==================================================
    // GLOBAL EXPORT
    // ==================================================

    namespace.AtmosphereCloud =
        SharedAtmosphereCloud;

    namespace.DustParticle =
        SharedDustParticle;

    namespace.AtmosphereField =
        SharedAtmosphereField;

})();