/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Shared Meteor Field

 Meteors travel through shared world coordinates, allowing
 one streak to move naturally between page sections.
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
            "Future Ready V2: universe.js and section-engine.js must load before meteors.js."
        );

        return;

    }

    const clamp =
        namespace.clamp;

    // ==================================================
    // METEOR SETTINGS
    // ==================================================

    const METEOR_SETTINGS = {

    phoneMinimumDelay: 3.5,
    phoneMaximumDelay: 8.5,

    tabletMinimumDelay: 4,
    tabletMaximumDelay: 10,

    desktopMinimumDelay: 4.5,
    desktopMaximumDelay: 12,

    phoneMaximumActive: 2,
    tabletMaximumActive: 2,
    desktopMaximumActive: 3,

    maximumSparksPhone: 24,
    maximumSparksTablet: 26,
    maximumSparksDesktop: 36

};

    // ==================================================
    // METEOR SPARK
    // ==================================================

    class SharedMeteorSpark{

        constructor(
            universe,
            random,
            worldX,
            worldY,
            velocityX,
            velocityY,
            color
        ){

            this.universe =
                universe;

            this.worldX =
                worldX;

            this.worldY =
                worldY;

            this.velocityX =
                velocityX;

            this.velocityY =
                velocityY;

            this.color =
                color;

            this.radius =
                random.range(
                    .45,
                    1.35
                );

            this.age = 0;

            this.maximumAge =
                random.range(
                    .22,
                    .58
                );

            this.opacity = 1;

            this.dead = false;

        }

        update(delta){

            this.age += delta;

            this.worldX +=
                this.velocityX *
                delta;

            this.worldY +=
                this.velocityY *
                delta;

            this.velocityX *=
                Math.pow(
                    .975,
                    delta * 60
                );

            this.velocityY *=
                Math.pow(
                    .975,
                    delta * 60
                );

            this.opacity =
                clamp(
                    1 -
                    this.age /
                    this.maximumAge,
                    0,
                    1
                );

            if(this.age >= this.maximumAge){

                this.dead = true;

            }

        }

        draw(section){

            const screenX =
                this.worldX -
                section.camera.worldX;

            const screenY =
                this.worldY -
                section.camera.worldY;

            if(
                screenX < -20 ||
                screenX > section.width + 20 ||
                screenY < -20 ||
                screenY > section.height + 20
            ){
                return;
            }

            const context =
                section.context;

            context.save();

            context.shadowBlur =
                this.radius * 5;

            context.shadowColor =
                `rgba(${this.color},${this.opacity})`;

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
    // SHARED METEOR
    // ==================================================

    class SharedMeteor{

        constructor(
            universe,
            random,
            worldWidth,
            worldHeight,
            deviceProfile
        ){

            this.universe =
                universe;

            this.random =
                random;

            this.worldWidth =
                worldWidth;

            this.worldHeight =
                worldHeight;

            this.device =
                deviceProfile;

            this.dead = false;

            this.generate();

        }

        generate(){

            const random =
                this.random;

            const margin =
                this.device.phone
                    ? 80
                    : 140;

            const edge =
                Math.floor(
                    random.range(
                        0,
                        4
                    )
                );

            let targetX;
            let targetY;

            switch(edge){

                case 0:

                    this.worldX =
                        -margin;

                    this.worldY =
                        random.range(
                            0,
                            this.worldHeight
                        );

                    targetX =
                        this.worldWidth + margin;

                    targetY =
                        random.range(
                            0,
                            this.worldHeight
                        );

                break;

                case 1:

                    this.worldX =
                        this.worldWidth + margin;

                    this.worldY =
                        random.range(
                            0,
                            this.worldHeight
                        );

                    targetX =
                        -margin;

                    targetY =
                        random.range(
                            0,
                            this.worldHeight
                        );

                break;

                case 2:

                    this.worldX =
                        random.range(
                            0,
                            this.worldWidth
                        );

                    this.worldY =
                        -margin;

                    targetX =
                        random.range(
                            0,
                            this.worldWidth
                        );

                    targetY =
                        this.worldHeight + margin;

                break;

                default:

                    this.worldX =
                        random.range(
                            0,
                            this.worldWidth
                        );

                    this.worldY =
                        this.worldHeight + margin;

                    targetX =
                        random.range(
                            0,
                            this.worldWidth
                        );

                    targetY =
                        -margin;

            }

            const directionX =
                targetX -
                this.worldX;

            const directionY =
                targetY -
                this.worldY;

            const distance =
                Math.hypot(
                    directionX,
                    directionY
                ) || 1;

            const speed =
                this.device.phone
                    ? random.range(
                        560,
                        820
                    )
                    : random.range(
                        680,
                        1060
                    );

            this.velocityX =
                directionX /
                distance *
                speed;

            this.velocityY =
                directionY /
                distance *
                speed;

            this.heroMeteor =
                random.chance(
                    .08
                );

            if(this.heroMeteor){

                this.velocityX *= .82;
                this.velocityY *= .82;

            }

            // All meteors are bright white.
            this.color =
            "255,255,255";

            this.radius =
                this.heroMeteor
                    ? random.range(
                        2.8,
                        4.1
                    )
                    : random.range(
                        1.4,
                        2.6
                    );

            this.trailLength =
    this.heroMeteor
        ? random.range(
            280,
            420
        )
        : this.device.phone
            ? random.range(
                150,
                250
            )
            : random.range(
                160,
                270
            );

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

        update(delta, sparks, sparkLimit){

            this.age += delta;

            this.worldX +=
                this.velocityX *
                delta;

            this.worldY +=
                this.velocityY *
                delta;

            this.sparkTimer -=
                delta;

            if(
                this.sparkTimer <= 0 &&
                sparks.length <
                sparkLimit
            ){

                this.releaseSpark(
                    sparks
                );

                this.sparkTimer =
                    this.device.phone
                        ? .085
                        : .05;

            }

            if(
                this.age >=
                this.maximumAge
            ){

                this.dead = true;

            }

        }

        releaseSpark(sparks){

            const random =
                this.random;

            const angle =
                random.range(
                    0,
                    Math.PI * 2
                );

            const speed =
                random.range(
                    12,
                    40
                );

            sparks.push(

                new SharedMeteorSpark(
                    this.universe,
                    random,
                    this.worldX,
                    this.worldY,
                    Math.cos(angle) *
                        speed -
                        this.velocityX *
                        .045,
                    Math.sin(angle) *
                        speed -
                        this.velocityY *
                        .045,
                    this.color
                )

            );

        }

        draw(section, time){

            const headX =
                this.worldX -
                section.camera.worldX;

            const headY =
                this.worldY -
                section.camera.worldY;

            const speed =
                Math.hypot(
                    this.velocityX,
                    this.velocityY
                ) || 1;

            const directionX =
                this.velocityX /
                speed;

            const directionY =
                this.velocityY /
                speed;

            const tailX =
                headX -
                directionX *
                this.trailLength;

            const tailY =
                headY -
                directionY *
                this.trailLength;

            const margin =
                this.trailLength +
                60;

            if(
                headX < -margin ||
                headX >
                    section.width + margin ||
                headY < -margin ||
                headY >
                    section.height + margin
            ){
                return;
            }

            const fadeIn =
                clamp(
                    this.age /
                    .12,
                    0,
                    1
                );

            const fadeOut =
                clamp(
                    (
                        this.maximumAge -
                        this.age
                    ) /
                    .3,
                    0,
                    1
                );

            const flicker =
                .9 +
                Math.sin(
                    time * 22 +
                    this.flickerPhase
                ) * .1;

            const opacity =
                fadeIn *
                fadeOut *
                flicker;

            const context =
                section.context;

            const gradient =
                context.createLinearGradient(
                    tailX,
                    tailY,
                    headX,
                    headY
                );

            gradient.addColorStop(
                0,
                `rgba(${this.color},0)`
            );

            gradient.addColorStop(
                .58,
                `rgba(${this.color},${opacity * .16})`
            );

            gradient.addColorStop(
                .88,
                `rgba(${this.color},${opacity * .68})`
            );

            gradient.addColorStop(
                1,
                `rgba(${this.color},${opacity})`
            );

            context.save();

            context.lineCap =
                "round";

            context.strokeStyle =
                gradient;

            context.lineWidth =
    this.heroMeteor
        ? 3.8
        : this.device.phone
            ? 2.4
            : 2.1;

            context.shadowBlur =
    this.heroMeteor
        ? 26
        : this.device.phone
            ? 18
            : 15;

            context.shadowColor =
                `rgba(${this.color},${opacity})`;

            context.beginPath();

            context.moveTo(
                tailX,
                tailY
            );

            context.lineTo(
                headX,
                headY
            );

            context.stroke();

            context.fillStyle =
                `rgba(${this.color},${opacity})`;

            context.beginPath();

            context.arc(
                headX,
                headY,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();

            context.restore();

        }

    }

    // ==================================================
    // SHARED METEOR FIELD
    // ==================================================

    class SharedMeteorField{

        constructor(
            universe,
            sectionEngine
        ){

            this.universe =
                universe;

            this.sectionEngine =
                sectionEngine;

            this.meteors = [];
            this.sparks = [];

            this.previousTime =
                universe.getTime();

            this.nextMeteorTime = 0;

            this.worldWidth = 2400;
            this.worldHeight = 1;

            this.updateWorldBounds();
            this.scheduleNextMeteor();

        }

        updateWorldBounds(){

            const sections =
                this.sectionEngine.sections;

            if(!sections.length){
                return;
            }

            this.worldWidth =
                Math.max(
                    2400,
                    ...sections.map(
                        section =>
                            section.width
                    )
                );

            const finalSection =
                sections[
                    sections.length - 1
                ];

            this.worldHeight =
                finalSection.camera.worldY +
                finalSection.height +
                400;

        }

        getDeviceProfile(){

            return (
                this.sectionEngine.sections[0]
                    ?.device ||
                {
                    phone:false,
                    tablet:false,
                    reducedMotion:false
                }
            );

        }

        getMaximumActive(){

            const device =
                this.getDeviceProfile();

            if(device.phone){
                return METEOR_SETTINGS
                    .phoneMaximumActive;
            }

            if(device.tablet){
                return METEOR_SETTINGS
                    .tabletMaximumActive;
            }

            return METEOR_SETTINGS
                .desktopMaximumActive;

        }

        getMaximumSparks(){

            const device =
                this.getDeviceProfile();

            if(device.phone){
                return METEOR_SETTINGS
                    .maximumSparksPhone;
            }

            if(device.tablet){
                return METEOR_SETTINGS
                    .maximumSparksTablet;
            }

            return METEOR_SETTINGS
                .maximumSparksDesktop;

        }

        scheduleNextMeteor(){

            const device =
                this.getDeviceProfile();

            let minimumDelay;
            let maximumDelay;

            if(device.phone){

                minimumDelay =
                    METEOR_SETTINGS
                        .phoneMinimumDelay;

                maximumDelay =
                    METEOR_SETTINGS
                        .phoneMaximumDelay;

            }
            else if(device.tablet){

                minimumDelay =
                    METEOR_SETTINGS
                        .tabletMinimumDelay;

                maximumDelay =
                    METEOR_SETTINGS
                        .tabletMaximumDelay;

            }
            else{

                minimumDelay =
                    METEOR_SETTINGS
                        .desktopMinimumDelay;

                maximumDelay =
                    METEOR_SETTINGS
                        .desktopMaximumDelay;

            };

            const activity =
                    clamp(
                this.universe.activity *
                this.universe.meteorFrequency *
                        2.2,
                        .5,
                        3.5
             );

            const delay =
                this.universe.random.range(
                    minimumDelay,
                    maximumDelay
                ) /
                activity;

            this.nextMeteorTime =
                this.universe.getTime() +
                delay;

        }

        spawnMeteor(){

            if(
                this.meteors.length >=
                this.getMaximumActive()
            ){
                return;
            }

            const random =
                this.universe.getSectionRandom(
                    9000 +
                    Math.floor(
                        this.universe.getTime() *
                        100
                    )
                );

            this.meteors.push(

                new SharedMeteor(
                    this.universe,
                    random,
                    this.worldWidth,
                    this.worldHeight,
                    this.getDeviceProfile()
                )

            );

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

            const device =
                this.getDeviceProfile();

            if(
                !device.reducedMotion &&
                time >=
                this.nextMeteorTime
            ){

                this.spawnMeteor();
                this.scheduleNextMeteor();

            }

            const sparkLimit =
                this.getMaximumSparks();

            for(
                const meteor of
                this.meteors
            ){

                meteor.update(
                    delta,
                    this.sparks,
                    sparkLimit
                );

            }

            for(
                const spark of
                this.sparks
            ){

                spark.update(
                    delta
                );

            }

            this.meteors =
                this.meteors.filter(
                    meteor =>
                        !meteor.dead
                );

            this.sparks =
                this.sparks.filter(
                    spark =>
                        !spark.dead
                );

            if(
                this.sparks.length >
                sparkLimit
            ){

                this.sparks.splice(
                    0,
                    this.sparks.length -
                    sparkLimit
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

            const time =
                this.universe.getTime();

            for(
                const meteor of
                this.meteors
            ){

                meteor.draw(
                    section,
                    time
                );

            }

            for(
                const spark of
                this.sparks
            ){

                spark.draw(
                    section
                );

            }

        }

    }

    // ==================================================
    // GLOBAL EXPORT
    // ==================================================

    namespace.MeteorSpark =
        SharedMeteorSpark;

    namespace.Meteor =
        SharedMeteor;

    namespace.MeteorField =
        SharedMeteorField;

})();