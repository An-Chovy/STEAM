/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Application Startup

 Creates the shared universe, starts one canvas per section,
 and launches the renderer.
==========================================================
*/

(() => {

    "use strict";

    const namespace =
        window.FutureReadyV2 =
        window.FutureReadyV2 || {};

    // ==================================================
    // REQUIRED MODULES
    // ==================================================

    const requiredModules = [

        "Universe",
        "SectionEngine",
        "StarField",
        "AtmosphereField",
        "MeteorField",
        "Renderer"

    ];

    function modulesAreReady(){

        const missingModules =
            requiredModules.filter(
                moduleName =>
                    !namespace[moduleName]
            );

        if(missingModules.length){

            console.warn(
                "Future Ready V2: Missing modules:",
                missingModules.join(", ")
            );

            return false;

        }

        return true;

    }

    // ==================================================
    // SECTION TARGETS
    // ==================================================

    const SECTION_SELECTORS = [

        ".community-hero",
        ".community-section",
        ".purpose-section",
        ".experience-section",
        ".community-final"

    ];

    // ==================================================
    // ENGINE STYLES
    //
    // These styles create the visual layers without
    // changing text, spacing, or section order.
    // ==================================================

    function installEngineStyles(){

        if(
            document.getElementById(
                "future-ready-v2-styles"
            )
        ){
            return;
        }

        const style =
            document.createElement(
                "style"
            );

        style.id =
            "future-ready-v2-styles";

        style.textContent = `

            .future-ready-v2-section{

                position:relative !important;

                isolation:isolate;

                overflow:hidden;

            }

            .future-ready-v2-canvas{

                position:absolute;

                inset:0;

                display:block;

                width:100%;

                height:100%;

                pointer-events:none;

                z-index:0;

            }

            .future-ready-v2-section >
            :not(.future-ready-v2-canvas){

                position:relative;

                z-index:2;

            }

            .future-ready-v2-section
            .hero-overlay{

                z-index:1;

            }

            .future-ready-v2-section
            .hero-flyer{

                z-index:2;

            }

            @media
            (prefers-reduced-motion:reduce){

                .future-ready-v2-canvas{

                    transition:none;

                }

            }

        `;

        document.head.appendChild(
            style
        );

    }

    // ==================================================
    // APPLICATION
    // ==================================================

    class FutureReadyApplication{

        constructor(){

            this.universe = null;

            this.sectionEngine = null;

            this.renderer = null;

            this.running = false;

        }

        start(){

            if(this.running){
                return;
            }

            if(!modulesAreReady()){
                return;
            }

            installEngineStyles();

            this.universe =
                new namespace.Universe();

            this.sectionEngine =
                new namespace.SectionEngine(
                    this.universe,
                    {
                        selectors:
                            SECTION_SELECTORS
                    }
                );

            this.sectionEngine.start();

            if(
                !this.sectionEngine
                    .sections.length
            ){

                console.warn(
                    "Future Ready V2: No matching page sections were found."
                );

                this.sectionEngine.destroy();

                this.sectionEngine = null;

                return;

            }

            for(
                const section of
                this.sectionEngine.sections
            ){

                section.element.classList.add(
                    "future-ready-v2-section"
                );

            }

            this.renderer =
                new namespace.Renderer(
                    this.universe,
                    this.sectionEngine
                );

            this.renderer.start();

            this.running = true;

            console.log(
                "Future Ready Experience Engine V2",
                {
                    seed:
                        this.universe.seed,

                    mood:
                        this.universe.mood,

                    sections:
                        this.sectionEngine
                            .sections.length
                }
            );

        }

        stop(){

            if(this.renderer){

                this.renderer.destroy();

                this.renderer = null;

            }

            if(this.sectionEngine){

                for(
                    const section of
                    this.sectionEngine.sections
                ){

                    section.element.classList.remove(
                        "future-ready-v2-section"
                    );

                }

                this.sectionEngine.destroy();

                this.sectionEngine = null;

            }

            this.universe = null;

            this.running = false;

        }

        restart(){

            this.stop();

            requestAnimationFrame(
                () => this.start()
            );

        }

    }

    // ==================================================
    // GLOBAL CONTROLS
    // ==================================================

    const application =
        new FutureReadyApplication();

    namespace.application =
        application;

    window.FutureReadyExperienceV2 = {

        version: "2.0.0",

        start(){

            application.start();

        },

        stop(){

            application.stop();

        },

        restart(){

            application.restart();

        },

        get seed(){

            return application
                .universe
                ?.seed || null;

        },

        get mood(){

            return application
                .universe
                ?.mood || null;

        },

        get sections(){

            return application
                .sectionEngine
                ?.sections || [];

        }

    };

    // ==================================================
    // STARTUP
    // ==================================================

    function startApplication(){

        application.start();

    }

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            startApplication,
            {
                once:true
            }
        );

    }
    else{

        startApplication();

    }

})();