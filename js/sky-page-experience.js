/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE
 Full-Page Scrolling Sky — Corrected

 Extends the existing animated sky across the document
 without causing the page height to grow continuously.
==========================================================
*/

(() => {

    "use strict";

    const RETRY_DELAY = 200;
    const MAX_ATTEMPTS = 20;

    let attempts = 0;
    let resizeTimer = null;

    function installFullPageSky(){

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
                    installFullPageSky,
                    RETRY_DELAY
                );

            }

            return;

        }

        const engine =
            experience.engines[0];

        if(
            !engine ||
            !engine.canvas ||
            engine.fullPageSkyInstalled
        ){
            return;
        }

        engine.fullPageSkyInstalled = true;

        const pageLayer =
            document.createElement("div");

        pageLayer.className =
            "page-sky-layer";

        pageLayer.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.prepend(pageLayer);

        pageLayer.appendChild(
            engine.canvas
        );

        // Stop observing the old hero dimensions.
        if(engine.resizeObserver){

            engine.resizeObserver.disconnect();
            engine.resizeObserver = null;

        }

        if(engine.visibilityObserver){

            engine.visibilityObserver.disconnect();
            engine.visibilityObserver = null;

        }

        engine.root = pageLayer;
        engine.rootVisible = true;

        function sizeFullPageSky(){

            /*
            The absolute sky layer does not contribute to
            page height, preventing a resize feedback loop.
            */

            const pageHeight =
                Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight,
                    window.innerHeight
                );

            const pageWidth =
                Math.max(
                    document.documentElement.clientWidth,
                    window.innerWidth
                );

            pageLayer.style.height =
                pageHeight + "px";

            engine.width = pageWidth;
            engine.height = pageHeight;

            engine.pixelRatio =
                engine.getPixelRatio();

            engine.canvas.width =
                Math.max(
                    1,
                    Math.floor(
                        pageWidth *
                        engine.pixelRatio
                    )
                );

            engine.canvas.height =
                Math.max(
                    1,
                    Math.floor(
                        pageHeight *
                        engine.pixelRatio
                    )
                );

            engine.canvas.style.width =
                pageWidth + "px";

            engine.canvas.style.height =
                pageHeight + "px";

            engine.context.setTransform(
                engine.pixelRatio,
                0,
                0,
                engine.pixelRatio,
                0,
                0
            );

            engine.rebuildScene();
            engine.lastFrame = 0;

        }

        function scheduleResize(delay = 180){

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(
                    sizeFullPageSky,
                    delay
                );

        }

        window.addEventListener(
            "resize",
            () => scheduleResize(),
            {
                passive:true
            }
        );

        window.addEventListener(
            "orientationchange",
            () => scheduleResize(280),
            {
                passive:true
            }
        );

        window.addEventListener(
            "load",
            () => scheduleResize(100),
            {
                once:true
            }
        );

        // Recheck after images and fonts settle.
        setTimeout(
            sizeFullPageSky,
            300
        );

        setTimeout(
            sizeFullPageSky,
            1200
        );

        sizeFullPageSky();

    }

    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            installFullPageSky,
            {
                once:true
            }
        );

    }
    else{

        installFullPageSky();

    }

})();