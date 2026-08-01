/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Section Engine

 Creates one canvas and one camera for every page section.
 Nothing visual is drawn here.
==========================================================
*/

(() => {

    "use strict";

    const namespace =
        window.FutureReadyV2 =
        window.FutureReadyV2 || {};

    if(!namespace.Universe){

        console.warn(
            "Future Ready V2: universe.js must load before section-engine.js."
        );

        return;

    }

    // ==================================================
    // DEFAULT SECTION TARGETS
    // ==================================================

    const DEFAULT_SELECTORS = [

        ".community-hero",
        ".community-section",
        ".purpose-section",
        ".experience-section",
        ".community-final"

    ];

    // ==================================================
    // DEVICE PROFILE
    // ==================================================

    function createDeviceProfile(){

        const phone =
            window.matchMedia(
                "(max-width: 600px)"
            ).matches;

        const tablet =
            window.matchMedia(
                "(min-width: 601px) and (max-width: 1000px)"
            ).matches;

        const touch =
            window.matchMedia(
                "(pointer: coarse)"
            ).matches;

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        return {

            phone,
            tablet,
            touch,
            reducedMotion,

            portrait:
                window.innerHeight >=
                window.innerWidth

        };

    }

    // ==================================================
    // SECTION VIEW
    // ==================================================

    class SectionView{

        constructor(
            element,
            index,
            universe
        ){

            this.element =
                element;

            this.index =
                index;

            this.universe =
                universe;

            this.random =
                universe.getSectionRandom(
                    index
                );

            this.worldOffset =
                universe.getSectionOffset(
                    index
                );

            this.device =
                createDeviceProfile();

            this.width = 1;
            this.height = 1;

            this.pixelRatio = 1;

            this.visible = true;

            this.canvas = null;
            this.context = null;

            this.camera = {

                x: 0,
                y: 0,

                targetX: 0,
                targetY: 0,

                worldX:
                    this.worldOffset.x,

                worldY:
                    this.worldOffset.y

            };

            this.createCanvas();
            this.resize();

        }

        // Creates a decorative canvas behind section content.
        createCanvas(){

            const oldCanvas =
                this.element.querySelector(
                    ":scope > .future-ready-v2-canvas"
                );

            if(oldCanvas){
                oldCanvas.remove();
            }

            this.canvas =
                document.createElement(
                    "canvas"
                );

            this.canvas.className =
                "future-ready-v2-canvas";

            this.canvas.setAttribute(
                "aria-hidden",
                "true"
            );

            this.canvas.setAttribute(
                "role",
                "presentation"
            );

            this.canvas.tabIndex = -1;

            this.element.prepend(
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
                    "Future Ready V2: Canvas is unavailable for section",
                    this.index
                );

            }

        }

        getMaximumPixelRatio(){

            if(this.device.phone){
                return 1.5;
            }

            return 2;

        }

        resize(){

            if(
                !this.canvas ||
                !this.context
            ){
                return;
            }

            this.device =
                createDeviceProfile();

            this.width =
                Math.max(
                    1,
                    this.element.clientWidth
                );

            this.height =
                Math.max(
                    1,
                    this.element.clientHeight
                );

            this.pixelRatio =
                Math.min(
                    window.devicePixelRatio || 1,
                    this.getMaximumPixelRatio()
                );

            this.canvas.width =
                Math.max(
                    1,
                    Math.floor(
                        this.width *
                        this.pixelRatio
                    )
                );

            this.canvas.height =
                Math.max(
                    1,
                    Math.floor(
                        this.height *
                        this.pixelRatio
                    )
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

        }

        clear(){

            if(!this.context){
                return;
            }

            this.context.clearRect(
                0,
                0,
                this.width,
                this.height
            );

        }

        updateWorldPosition(){

            const bounds =
                this.element.getBoundingClientRect();

            const pageTop =
                bounds.top +
                window.scrollY;

            this.camera.worldX =
                this.worldOffset.x;

            this.camera.worldY =
                this.worldOffset.y +
                pageTop;

        }

    }

    // ==================================================
    // SECTION ENGINE
    // ==================================================

    class SectionEngine{

        constructor(
            universe,
            options = {}
        ){

            this.universe =
                universe;

            this.selectors =
                options.selectors ||
                DEFAULT_SELECTORS;

            this.sections = [];

            this.resizeTimer = null;

            this.resizeObserver = null;
            this.visibilityObserver = null;

            this.started = false;

        }

        findTargets(){

            const targets = [];

            for(
                const selector of
                this.selectors
            ){

                document
                    .querySelectorAll(
                        selector
                    )
                    .forEach(
                        element => {

                            if(
                                !targets.includes(
                                    element
                                )
                            ){

                                targets.push(
                                    element
                                );

                            }

                        }
                    );

            }

            return targets;

        }

        createSections(){

            this.destroySections();

            const targets =
                this.findTargets();

            this.sections =
                targets.map(
                    (
                        element,
                        index
                    ) =>
                        new SectionView(
                            element,
                            index,
                            this.universe
                        )
                );

            this.updateWorldPositions();

        }

        updateWorldPositions(){

            for(
                const section of
                this.sections
            ){

                section.updateWorldPosition();

            }

        }

        resizeSections(){

            for(
                const section of
                this.sections
            ){

                section.resize();

            }

            this.updateWorldPositions();

        }

        scheduleResize(
            delay = 180
        ){

            clearTimeout(
                this.resizeTimer
            );

            this.resizeTimer =
                setTimeout(
                    () => {

                        this.resizeSections();

                    },
                    delay
                );

        }

        installObservers(){

            if(
                "IntersectionObserver" in
                window
            ){

                this.visibilityObserver =
                    new IntersectionObserver(
                        entries => {

                            for(
                                const entry of
                                entries
                            ){

                                const section =
                                    this.sections.find(
                                        item =>
                                            item.element ===
                                            entry.target
                                    );

                                if(section){

                                    section.visible =
                                        entry.isIntersecting;

                                }

                            }

                        },
                        {
                            rootMargin:
                                "180px 0px 180px 0px",

                            threshold:
                                .01
                        }
                    );

                for(
                    const section of
                    this.sections
                ){

                    this.visibilityObserver.observe(
                        section.element
                    );

                }

            }

            if(
                "ResizeObserver" in
                window
            ){

                this.resizeObserver =
                    new ResizeObserver(
                        entries => {

                            for(
                                const entry of
                                entries
                            ){

                                const section =
                                    this.sections.find(
                                        item =>
                                            item.element ===
                                            entry.target
                                    );

                                if(section){

                                    section.resize();

                                }

                            }

                            this.updateWorldPositions();

                        }
                    );

                for(
                    const section of
                    this.sections
                ){

                    this.resizeObserver.observe(
                        section.element
                    );

                }

            }
            else{

                window.addEventListener(
                    "resize",
                    () =>
                        this.scheduleResize(),
                    {
                        passive: true
                    }
                );

            }

            window.addEventListener(
                "orientationchange",
                () =>
                    this.scheduleResize(
                        260
                    ),
                {
                    passive: true
                }
            );

            window.addEventListener(
                "load",
                () =>
                    this.scheduleResize(
                        80
                    ),
                {
                    once: true
                }
            );

        }

        start(){

            if(this.started){
                return;
            }

            this.createSections();

            this.installObservers();

            this.started = true;

        }

        destroySections(){

            if(this.resizeObserver){

                this.resizeObserver.disconnect();
                this.resizeObserver = null;

            }

            if(this.visibilityObserver){

                this.visibilityObserver.disconnect();
                this.visibilityObserver = null;

            }

            for(
                const section of
                this.sections
            ){

                if(section.canvas){

                    section.canvas.remove();

                }

            }

            this.sections = [];

        }

        destroy(){

            this.started = false;

            clearTimeout(
                this.resizeTimer
            );

            this.destroySections();

        }

    }

    // ==================================================
    // GLOBAL EXPORT
    // ==================================================

    namespace.SectionView =
        SectionView;

    namespace.SectionEngine =
        SectionEngine;

})();