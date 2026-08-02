/*
==========================================================
 FUTURE READY EXPLORE
 World Engine
 Version 0.1.0
==========================================================
*/

(() => {

    "use strict";


    /* ==================================================
       NAMESPACE
    ================================================== */

    const app =
        window.FutureReadyExplore =
        window.FutureReadyExplore || {};


    /* ==================================================
       REQUIRED DATA
    ================================================== */

    if(!app.worlds){

        console.error(
            "Future Ready Explore: worlds.js must load before world-engine.js."
        );

        return;

    }


    /* ==================================================
       FAVORITES SETTINGS
    ================================================== */

    const WORLD_FAVORITES_KEY =
        "future-ready-world-favorites";


    /* ==================================================
       DOM HELPERS
    ================================================== */

    function getElement(id){

        return document.getElementById(id);

    }


    function setText(id, value){

        const element =
            getElement(id);

        if(!element){
            return;
        }

        element.textContent =
            value || "";

    }


    function setHTML(id, value){

        const element =
            getElement(id);

        if(!element){
            return;
        }

        element.innerHTML =
            value || "";

    }


    function showElement(element){

        if(!element){
            return;
        }

        element.classList.remove(
            "hidden"
        );

    }


    function hideElement(element){

        if(!element){
            return;
        }

        element.classList.add(
            "hidden"
        );

    }


    function escapeHTML(value){

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* ==================================================
       URL
    ================================================== */

    function getWorldID(){

        const parameters =
            new URLSearchParams(
                window.location.search
            );

        return String(
            parameters.get("world") || ""
        )
            .trim()
            .toLowerCase();

    }


    /* ==================================================
       FAVORITES
    ================================================== */

    function getFavoriteWorlds(){

        try{

            const saved =
                localStorage.getItem(
                    WORLD_FAVORITES_KEY
                );

            const parsed =
                saved
                    ? JSON.parse(saved)
                    : [];

            return Array.isArray(parsed)
                ? parsed
                : [];

        }
        catch(error){

            console.warn(
                "Future Ready Explore: World favorites could not be read.",
                error
            );

            return [];

        }

    }


    function saveFavoriteWorlds(worlds){

        try{

            localStorage.setItem(
                WORLD_FAVORITES_KEY,
                JSON.stringify(worlds)
            );

        }
        catch(error){

            console.warn(
                "Future Ready Explore: World favorites could not be saved.",
                error
            );

        }

    }


    function worldIsFavorite(worldID){

        return getFavoriteWorlds()
            .includes(worldID);

    }


    function toggleWorldFavorite(worldID){

        const favorites =
            getFavoriteWorlds();

        const existingIndex =
            favorites.indexOf(
                worldID
            );

        let saved;

        if(existingIndex >= 0){

            favorites.splice(
                existingIndex,
                1
            );

            saved = false;

        }
        else{

            favorites.push(
                worldID
            );

            saved = true;

        }

        saveFavoriteWorlds(
            favorites
        );

        window.dispatchEvent(

            new CustomEvent(
                "future-ready-world-favorites-changed",
                {
                    detail: {
                        worldID,
                        saved,
                        favorites
                    }
                }
            )

        );

        return saved;

    }


    /* ==================================================
       ENGINE
    ================================================== */

    class WorldEngine{

        constructor(){

            this.worldID =
                getWorldID();

            this.world =
                app.worlds[
                    this.worldID
                ] || null;

            this.loadingElement =
                getElement(
                    "world-loading"
                );

            this.errorElement =
                getElement(
                    "world-error"
                );

            this.contentElement =
                getElement(
                    "world-content"
                );

            this.favoriteButton =
                getElement(
                    "world-favorite-button"
                );

        }


        start(){

            if(!this.world){

                this.showError();

                return;

            }

            this.applyPageTheme();

            this.buildDocumentMetadata();

            this.buildHero();

            this.buildOverview();

            this.buildFacts();

            this.buildExperiences();

            this.buildChallenge();

            this.buildResources();

                        this.buildRelatedWorlds();

            this.installFavoriteButton();

            /* ==========================================
               ATMOSPHERE
            ========================================== */

            if(
                window.FutureReadyExplore &&
                window.FutureReadyExplore.AtmosphereEngine
            ){

                window.FutureReadyExplore
                    .AtmosphereEngine
                    .initialize(this.world);

            }

            this.showWorld();

        }


        /* ==================================================
           PAGE STATE
        ================================================== */

        showWorld(){

            hideElement(
                this.loadingElement
            );

            hideElement(
                this.errorElement
            );

            showElement(
                this.contentElement
            );

        }


        showError(){

            hideElement(
                this.loadingElement
            );

            hideElement(
                this.contentElement
            );

            showElement(
                this.errorElement
            );

            document.title =
                "World Not Found | Future Ready Explore";

        }


        /* ==================================================
           THEME
        ================================================== */

        applyPageTheme(){

            document.body.dataset.pillar =
                this.world.pillar ||
                "explore";

            document.body.dataset.world =
                this.world.id ||
                this.worldID;

        }


        /* ==================================================
           DOCUMENT METADATA
        ================================================== */

        buildDocumentMetadata(){

            document.title =
                `${this.world.title} | Future Ready Explore`;

            const description =
                document.querySelector(
                    'meta[name="description"]'
                );

            if(description){

                description.setAttribute(
                    "content",
                    this.world.subtitle ||
                    `Explore ${this.world.title} with Future Ready Explore.`
                );

            }

        }


        /* ==================================================
           HERO
        ================================================== */

        buildHero(){

            const world =
                this.world;

            const backLink =
                getElement(
                    "world-back-link"
                );

            const primaryAction =
                getElement(
                    "world-primary-action"
                );

            const heroIcon =
                getElement(
                    "world-hero-icon"
                );

            const heroImage =
                getElement(
                    "world-hero-image"
                );

            setText(
                "world-back-label",
                world.backLabel ||
                "Back"
            );

            if(backLink){

                backLink.href =
                    world.backLink ||
                    "index.html";

            }

            setText(
                "world-eyebrow",
                world.eyebrow ||
                "Future Ready World"
            );

            setText(
                "world-title",
                world.title
            );

            setText(
                "world-subtitle",
                world.subtitle
            );

            if(primaryAction){

                primaryAction.textContent =
                    world.primaryActionText ||
                    "Begin Exploring";

                primaryAction.href =
                    world.primaryActionLink ||
                    "#world-overview";

            }

            this.buildMeta(
                "world-meta",
                [
                    world.difficulty,
                    world.duration,
                    world.audience
                ]
            );

            if(
                world.heroImage &&
                heroImage
            ){

                heroImage.src =
                    world.heroImage;

                heroImage.alt =
                    world.heroImageAlt ||
                    `${world.title} illustration`;

                showElement(
                    heroImage
                );

                hideElement(
                    heroIcon
                );

            }
            else if(heroIcon){

                heroIcon.textContent =
                    world.icon ||
                    "✦";

                showElement(
                    heroIcon
                );

                hideElement(
                    heroImage
                );

            }

        }


        /* ==================================================
           META BADGES
        ================================================== */

        buildMeta(targetID, values){

            const target =
                getElement(targetID);

            if(!target){
                return;
            }

            const validValues =
                values.filter(Boolean);

            target.innerHTML =
                validValues
                    .map(
                        value => `
                            <span class="world-meta-item">
                                ${escapeHTML(value)}
                            </span>
                        `
                    )
                    .join("");

        }


        /* ==================================================
           OVERVIEW
        ================================================== */

        buildOverview(){

            const world =
                this.world;

            setText(
                "world-overview-title",
                world.overviewTitle ||
                `Explore ${world.title}`
            );

            const paragraphs =
                Array.isArray(
                    world.overview
                )
                    ? world.overview
                    : [];

            setHTML(
                "world-overview-copy",
                paragraphs
                    .map(
                        paragraph => `
                            <p>
                                ${paragraph}
                            </p>
                        `
                    )
                    .join("")
            );

        }


        /* ==================================================
           FACTS
        ================================================== */

        buildFacts(){

            const section =
                getElement(
                    "world-facts-section"
                );

            const target =
                getElement(
                    "world-facts"
                );

            const facts =
                Array.isArray(
                    this.world.facts
                )
                    ? this.world.facts
                    : [];

            if(
                !target ||
                !facts.length
            ){

                hideElement(
                    section
                );

                return;

            }

            target.innerHTML =
                facts
                    .map(
                        fact => `
                            <article class="world-fact-card">

                                <div
                                    class="world-fact-icon"
                                    aria-hidden="true">

                                    ${escapeHTML(
                                        fact.icon || "✦"
                                    )}

                                </div>

                                <h3>
                                    ${escapeHTML(
                                        fact.title
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        fact.text
                                    )}
                                </p>

                            </article>
                        `
                    )
                    .join("");

            showElement(
                section
            );

        }


        /* ==================================================
           EXPERIENCES
        ================================================== */

        buildExperiences(){

            const section =
                getElement(
                    "world-experiences-section"
                );

            const experiences =
                Array.isArray(
                    this.world.experiences
                )
                    ? this.world.experiences
                    : [];

            setText(
                "world-experiences-title",
                this.world.experiencesTitle ||
                `Explore ${this.world.title}`
            );

            setText(
                "world-experiences-intro",
                this.world.experiencesIntro ||
                ""
            );

            if(!experiences.length){

                hideElement(
                    section
                );

                return;

            }

            if(
                !app.DiscoveryTileGrid
            ){

                console.warn(
                    "Future Ready Explore: tiles.js must load before world-engine.js."
                );

                hideElement(
                    section
                );

                return;

            }

            const grid =
                new app.DiscoveryTileGrid({
                    target:
                        "#world-experiences",

                    tiles:
                        experiences,

                    emptyMessage:
                        "New experiences are being prepared."
                });

            grid.render();

            showElement(
                section
            );

        }


        /* ==================================================
           FEATURED CHALLENGE
        ================================================== */

        buildChallenge(){

            const section =
                getElement(
                    "world-challenge-section"
                );

            const challenge =
                this.world.challenge;

            if(!challenge){

                hideElement(
                    section
                );

                return;

            }

            setText(
                "world-challenge-title",
                challenge.title
            );

            setText(
                "world-challenge-description",
                challenge.description
            );

            this.buildMeta(
                "world-challenge-meta",
                [
                    challenge.difficulty,
                    challenge.duration
                ]
            );

            const link =
                getElement(
                    "world-challenge-link"
                );

            if(link){

                link.href =
                    challenge.link ||
                    "#";

                link.textContent =
                    challenge.buttonText ||
                    "Begin Challenge";

            }

            const visual =
                getElement(
                    "world-challenge-visual"
                );

            if(visual){

                visual.textContent =
                    challenge.icon ||
                    "⚙";

            }

            showElement(
                section
            );

        }


        /* ==================================================
           RESOURCES
        ================================================== */

        buildResources(){

            const section =
                getElement(
                    "world-resources-section"
                );

            const target =
                getElement(
                    "world-resources"
                );

            const resources =
                Array.isArray(
                    this.world.resources
                )
                    ? this.world.resources
                    : [];

            if(
                !target ||
                !resources.length
            ){

                hideElement(
                    section
                );

                return;

            }

            target.innerHTML =
                resources
                    .map(
                        resource => `
                            <article class="world-resource-card">

                                <p class="world-resource-type">
                                    ${escapeHTML(
                                        resource.type ||
                                        "Resource"
                                    )}
                                </p>

                                <h3>
                                    ${escapeHTML(
                                        resource.title
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        resource.description
                                    )}
                                </p>

                                <a
                                    class="world-resource-link"
                                    href="${escapeHTML(
                                        resource.link || "#"
                                    )}">

                                    <span>
                                        ${
                                            escapeHTML(
                                                resource.linkText ||
                                                "Open Resource"
                                            )
                                        }
                                    </span>

                                    <span aria-hidden="true">
                                        →
                                    </span>

                                </a>

                            </article>
                        `
                    )
                    .join("");

            showElement(
                section
            );

        }


        /* ==================================================
           RELATED WORLDS
        ================================================== */

        buildRelatedWorlds(){

            const section =
                getElement(
                    "world-related-section"
                );

            const related =
                Array.isArray(
                    this.world.related
                )
                    ? this.world.related
                    : [];

            if(!related.length){

                hideElement(
                    section
                );

                return;

            }

            if(!app.DiscoveryTileGrid){

                hideElement(
                    section
                );

                return;

            }

            const grid =
                new app.DiscoveryTileGrid({
                    target:
                        "#world-related",

                    tiles:
                        related,

                    emptyMessage:
                        "More related worlds are coming soon."
                });

            grid.render();

            showElement(
                section
            );

        }


        /* ==================================================
           FAVORITE BUTTON
        ================================================== */

        installFavoriteButton(){

            if(!this.favoriteButton){
                return;
            }

            this.updateFavoriteButton();

            this.favoriteButton.addEventListener(
                "click",
                () => {

                    toggleWorldFavorite(
                        this.worldID
                    );

                    this.updateFavoriteButton();

                }
            );

        }


        updateFavoriteButton(){

            if(!this.favoriteButton){
                return;
            }

            const saved =
                worldIsFavorite(
                    this.worldID
                );

            this.favoriteButton.setAttribute(
                "aria-pressed",
                String(saved)
            );

            this.favoriteButton.textContent =
                saved
                    ? "♥ Saved to My Passport"
                    : "♡ Save This World";

        }

    }


    /* ==================================================
       STARTUP
    ================================================== */

    function startWorldEngine(){

        const engine =
            new WorldEngine();

        app.worldEngine =
            engine;

        engine.start();

    }


    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            startWorldEngine,
            {
                once:true
            }
        );

    }
    else{

        startWorldEngine();

    }


    /* ==================================================
       GLOBAL EXPORTS
    ================================================== */

    app.WorldEngine =
        WorldEngine;

    app.getFavoriteWorlds =
        getFavoriteWorlds;

    app.toggleWorldFavorite =
        toggleWorldFavorite;

})();