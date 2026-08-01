/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Shared Renderer

 Updates the shared universe once, then renders each
 visible section as a different window into that world.
==========================================================
*/

(() => {

    "use strict";

    const namespace =
        window.FutureReadyV2 =
        window.FutureReadyV2 || {};

    if(
        !namespace.SectionEngine ||
        !namespace.StarField ||
        !namespace.AtmosphereField ||
        !namespace.MeteorField
    ){

        console.warn(
            "Future Ready V2: section-engine.js, stars.js, atmosphere.js, and meteors.js must load before renderer.js."
        );

        return;

    }

    const clamp =
        namespace.clamp;

    // ==================================================
    // RENDERER SETTINGS
    // ==================================================

    const RENDERER_SETTINGS = {

        desktopFPS: 60,
        tabletFPS: 45,
        phoneFPS: 30,
        reducedMotionFPS: 12,

        cameraHorizontalStrength: 4,
        cameraVerticalStrength: 3,

        cameraEasingDesktop: .028,
        cameraEasingTablet: .035,
        cameraEasingPhone: .045

    };

    // ==================================================
    // SHARED RENDERER
    // ==================================================

    class SharedRenderer{

        constructor(
            universe,
            sectionEngine
        ){

            this.universe =
                universe;

            this.sectionEngine =
                sectionEngine;

            this.starField = null;
            this.atmosphereField = null;
            this.meteorField = null;

            this.running = false;

            this.animationFrame = null;

            this.lastFrameTime = 0;

            this.pageVisible =
                !document.hidden;

            this.sceneSignature = "";

            this.installVisibilityListener();

        }

        // Builds all shared visual systems.
        buildScene(){

            this.starField =
                new namespace.StarField(
                    this.universe,
                    this.sectionEngine
                );

            this.atmosphereField =
                new namespace.AtmosphereField(
                    this.universe,
                    this.sectionEngine
                );

            this.meteorField =
                new namespace.MeteorField(
                    this.universe,
                    this.sectionEngine
                );

            this.sceneSignature =
                this.createSceneSignature();

        }

        createSceneSignature(){

            return this.sectionEngine.sections
                .map(
                    section =>
                        [
                            section.width,
                            section.height,
                            section.camera.worldY
                        ].join(":")
                )
                .join("|");

        }

        // Rebuilds only when section sizes or positions change.
        rebuildIfNeeded(){

            const nextSignature =
                this.createSceneSignature();

            if(
                nextSignature ===
                this.sceneSignature
            ){
                return;
            }

            this.buildScene();

            this.lastFrameTime = 0;

        }

        getDevice(){

            return (
                this.sectionEngine.sections[0]
                    ?.device ||
                {
                    phone: false,
                    tablet: false,
                    reducedMotion: false
                }
            );

        }

        getTargetFPS(){

            const device =
                this.getDevice();

            if(device.reducedMotion){

                return RENDERER_SETTINGS
                    .reducedMotionFPS;

            }

            if(device.phone){

                return RENDERER_SETTINGS
                    .phoneFPS;

            }

            if(device.tablet){

                return RENDERER_SETTINGS
                    .tabletFPS;

            }

            return RENDERER_SETTINGS
                .desktopFPS;

        }

        shouldRender(timestamp){

            const interval =
                1000 /
                this.getTargetFPS();

            return (
                timestamp -
                this.lastFrameTime
            ) >= interval;

        }

        installVisibilityListener(){

            document.addEventListener(
                "visibilitychange",
                () => {

                    this.pageVisible =
                        !document.hidden;

                    if(this.pageVisible){

                        this.lastFrameTime = 0;

                    }

                }
            );

        }

        getCameraEasing(section){

            if(section.device.phone){

                return RENDERER_SETTINGS
                    .cameraEasingPhone;

            }

            if(section.device.tablet){

                return RENDERER_SETTINGS
                    .cameraEasingTablet;

            }

            return RENDERER_SETTINGS
                .cameraEasingDesktop;

        }

        // Each section drifts differently while sharing one clock.
        updateCamera(section){

            if(section.device.reducedMotion){

                section.camera.targetX = 0;
                section.camera.targetY = 0;

            }
            else{

                const time =
                    this.universe.getTime();

                const sectionPhase =
                    section.index * .73;

                const drift =
                    this.universe
                        .driftStrength;

                section.camera.targetX =
                    Math.sin(
                        time * .052 +
                        sectionPhase
                    ) *
                    RENDERER_SETTINGS
                        .cameraHorizontalStrength *
                    drift;

                section.camera.targetY =
                    Math.cos(
                        time * .039 +
                        sectionPhase
                    ) *
                    RENDERER_SETTINGS
                        .cameraVerticalStrength *
                    drift;

            }

            const easing =
                this.getCameraEasing(
                    section
                );

            section.camera.x +=
                (
                    section.camera.targetX -
                    section.camera.x
                ) *
                easing;

            section.camera.y +=
                (
                    section.camera.targetY -
                    section.camera.y
                ) *
                easing;

        }

        updateSections(){

            for(
                const section of
                this.sectionEngine.sections
            ){

                if(section.visible){

                    this.updateCamera(
                        section
                    );

                }

            }

        }

        updateScene(){

            this.rebuildIfNeeded();

            this.updateSections();

            this.atmosphereField?.update();

            this.starField?.update();

            this.meteorField?.update();

        }

        drawSection(section){

            if(
                !section.visible ||
                !section.context
            ){
                return;
            }

            section.clear();

            // Draw order creates depth.
            this.atmosphereField?.draw(
                section
            );

            this.starField?.draw(
                section
            );

            this.meteorField?.draw(
                section
            );

        }

        drawScene(){

            for(
                const section of
                this.sectionEngine.sections
            ){

                this.drawSection(
                    section
                );

            }

        }

        animate(timestamp){

            if(!this.running){
                return;
            }

            this.animationFrame =
                requestAnimationFrame(
                    nextTimestamp =>
                        this.animate(
                            nextTimestamp
                        )
                );

            if(!this.pageVisible){

                this.lastFrameTime = 0;

                return;

            }

            const anySectionVisible =
                this.sectionEngine.sections
                    .some(
                        section =>
                            section.visible
                    );

            if(!anySectionVisible){

                this.lastFrameTime = 0;

                return;

            }

            if(
                !this.shouldRender(
                    timestamp
                )
            ){
                return;
            }

            this.lastFrameTime =
                timestamp;

            this.updateScene();

            this.drawScene();

        }

        start(){

            if(this.running){
                return;
            }

            if(
                !this.sectionEngine.sections
                    .length
            ){

                console.warn(
                    "Future Ready V2: No sections are available to render."
                );

                return;

            }

            this.buildScene();

            this.running = true;

            this.animationFrame =
                requestAnimationFrame(
                    timestamp =>
                        this.animate(
                            timestamp
                        )
                );

        }

        stop(){

            this.running = false;

            if(this.animationFrame){

                cancelAnimationFrame(
                    this.animationFrame
                );

                this.animationFrame = null;

            }

        }

        destroy(){

            this.stop();

            this.starField = null;
            this.atmosphereField = null;
            this.meteorField = null;

            for(
                const section of
                this.sectionEngine.sections
            ){

                section.clear();

            }

        }

    }

    // ==================================================
    // GLOBAL EXPORT
    // ==================================================

    namespace.Renderer =
        SharedRenderer;

})();