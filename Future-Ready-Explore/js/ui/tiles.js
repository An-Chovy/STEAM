/*
==========================================================
 FUTURE READY EXPLORE
 Discovery Tile Engine
 Version 0.1.0
==========================================================
*/

(() => {

    "use strict";

    const VALID_PILLARS = [
        "discover",
        "explore",
        "create",
        "connect"
    ];

    const DEFAULT_TILE = {

        title: "Untitled Discovery",
        description: "",
        icon: "✨",
        image: "",
        pillar: "discover",

        difficulty: "",
        duration: "",
        age: "",

        destination: "#",
        buttonText: "Discover More",

        favorite: true,
        featured: false,

        tags: []

    };

    function escapeHTML(value){

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

    function normalizePillar(pillar){

        const value =
            String(pillar || "")
                .trim()
                .toLowerCase();

        return VALID_PILLARS.includes(value)
            ? value
            : "discover";

    }

    function createTileID(tile){

        if(tile.id){
            return String(tile.id);
        }

        return String(tile.title)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    }

    function getFavorites(){

        try{

            const saved =
                localStorage.getItem(
                    "future-ready-favorites"
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
                "Future Ready Explore: Favorites could not be read.",
                error
            );

            return [];

        }

    }

    function saveFavorites(favorites){

        try{

            localStorage.setItem(
                "future-ready-favorites",
                JSON.stringify(favorites)
            );

        }
        catch(error){

            console.warn(
                "Future Ready Explore: Favorites could not be saved.",
                error
            );

        }

    }

    function isFavorite(tileID){

        return getFavorites().includes(tileID);

    }

    function toggleFavorite(tileID){

        const favorites =
            getFavorites();

        const existingIndex =
            favorites.indexOf(tileID);

        let saved;

        if(existingIndex >= 0){

            favorites.splice(
                existingIndex,
                1
            );

            saved = false;

        }
        else{

            favorites.push(tileID);

            saved = true;

        }

        saveFavorites(favorites);

        window.dispatchEvent(

            new CustomEvent(
                "future-ready-favorites-changed",
                {
                    detail: {
                        tileID,
                        saved,
                        favorites
                    }
                }
            )

        );

        return saved;

    }

    class DiscoveryTile{

        constructor(options = {}){

            this.data = {
                ...DEFAULT_TILE,
                ...options
            };

            this.data.pillar =
                normalizePillar(
                    this.data.pillar
                );

            this.id =
                createTileID(
                    this.data
                );

        }

        createElement(){

            const tile =
                document.createElement(
                    "article"
                );

            tile.className = [
                "discovery-tile",
                `pillar-${this.data.pillar}`,
                this.data.featured
                    ? "discovery-tile-featured"
                    : ""
            ]
                .filter(Boolean)
                .join(" ");

            tile.dataset.tileId =
                this.id;

            tile.dataset.pillar =
                this.data.pillar;

            if(this.data.tags.length){

                tile.dataset.tags =
                    this.data.tags
                        .join(" ")
                        .toLowerCase();

            }

            tile.innerHTML =
                this.getMarkup();

            this.installFavoriteButton(
                tile
            );

            return tile;

        }

        getMarkup(){

            const imageMarkup =
                this.data.image
                    ? `
                        <div class="discovery-tile-media">
                            <img
                                src="${escapeHTML(this.data.image)}"
                                alt=""
                                loading="lazy">
                        </div>
                    `
                    : "";

            const iconMarkup =
                !this.data.image
                    ? `
                        <div
                            class="discovery-tile-icon"
                            aria-hidden="true">
                            ${escapeHTML(this.data.icon)}
                        </div>
                    `
                    : "";

            const badges =
                this.getBadgeMarkup();

            const favoriteButton =
                this.data.favorite
                    ? this.getFavoriteMarkup()
                    : "";

            return `
                ${imageMarkup}

            ${this.data.experiences ? `

<div class="discovery-tile-stats">

    <div class="tile-stat">

        <strong>${this.data.experiences}</strong>

        <span>Experiences</span>

    </div>

    <div class="tile-stat">

        <strong>${this.data.simulations}</strong>

        <span>Simulations</span>

    </div>

    <div class="tile-stat">

        <strong>${this.data.challenges}</strong>

        <span>Challenges</span>

    </div>

</div>

` : ""}




                <div class="discovery-tile-body">

                    <div class="discovery-tile-top">

                        ${iconMarkup}

                        ${favoriteButton}

                    </div>

                    <div class="discovery-tile-copy">

                        <p class="discovery-tile-pillar">
                            ${escapeHTML(this.data.pillar)}
                        </p>

                        <h3 class="discovery-tile-title">
                            ${escapeHTML(this.data.title)}
                        </h3>

                        ${
                            this.data.description
                                ? `
                                    <p class="discovery-tile-description">
                                        ${escapeHTML(this.data.description)}
                                    </p>
                                `
                                : ""
                        }

                    </div>

                    ${
                        badges
                            ? `
                                <div class="discovery-tile-badges">
                                    ${badges}
                                </div>
                            `
                            : ""
                    }

                    <a
                        class="discovery-tile-link"
                        href="${escapeHTML(this.data.destination)}">

                        <span>
                            ${escapeHTML(this.data.buttonText)}
                        </span>

                        <span aria-hidden="true">
                            →
                        </span>

                    </a>

                </div>
            `;

        }

        getBadgeMarkup(){

            const badges = [];

            if(this.data.difficulty){

                badges.push(`
                    <span class="badge">
                        ${escapeHTML(this.data.difficulty)}
                    </span>
                `);

            }

            if(this.data.duration){

                badges.push(`
                    <span class="badge">
                        ${escapeHTML(this.data.duration)}
                    </span>
                `);

            }

            if(this.data.age){

                badges.push(`
                    <span class="badge">
                        ${escapeHTML(this.data.age)}
                    </span>
                `);

            }

            return badges.join("");

        }

        getFavoriteMarkup(){

            const saved =
                isFavorite(this.id);

            return `
                <button
                    class="discovery-tile-favorite"
                    type="button"
                    aria-label="${
                        saved
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }"
                    aria-pressed="${saved}"
                    title="${
                        saved
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }">

                    <span aria-hidden="true">
                        ${saved ? "♥" : "♡"}
                    </span>

                </button>
            `;

        }

        installFavoriteButton(tile){

            const button =
                tile.querySelector(
                    ".discovery-tile-favorite"
                );

            if(!button){
                return;
            }

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    const saved =
                        toggleFavorite(
                            this.id
                        );

                    button.setAttribute(
                        "aria-pressed",
                        String(saved)
                    );

                    button.setAttribute(
                        "aria-label",
                        saved
                            ? "Remove from favorites"
                            : "Add to favorites"
                    );

                    button.title =
                        saved
                            ? "Remove from favorites"
                            : "Add to favorites";

                    button
                        .querySelector("span")
                        .textContent =
                            saved
                                ? "♥"
                                : "♡";

                    tile.classList.toggle(
                        "is-favorite",
                        saved
                    );

                }
            );

            tile.classList.toggle(
                "is-favorite",
                isFavorite(this.id)
            );

        }

    }

    class DiscoveryTileGrid{

        constructor(options = {}){

            this.target =
                typeof options.target === "string"
                    ? document.querySelector(
                        options.target
                    )
                    : options.target;

            this.tiles =
                Array.isArray(options.tiles)
                    ? options.tiles
                    : [];

            this.emptyMessage =
                options.emptyMessage ||
                "No discoveries are available yet.";

        }

        render(){

            if(!this.target){

                console.warn(
                    "Future Ready Explore: Tile grid target was not found."
                );

                return;

            }

            this.target.innerHTML = "";

            if(!this.tiles.length){

                const message =
                    document.createElement("p");

                message.className =
                    "discovery-grid-empty";

                message.textContent =
                    this.emptyMessage;

                this.target.appendChild(
                    message
                );

                return;

            }

            const fragment =
                document.createDocumentFragment();

            for(const tileData of this.tiles){

                const tile =
                    new DiscoveryTile(
                        tileData
                    );

                fragment.appendChild(
                    tile.createElement()
                );

            }

            this.target.appendChild(
                fragment
            );

        }

        setTiles(tiles){

            this.tiles =
                Array.isArray(tiles)
                    ? tiles
                    : [];

            this.render();

        }

        filter(searchTerm){

            const term =
                String(searchTerm || "")
                    .trim()
                    .toLowerCase();

            if(!term){

                this.render();

                return;

            }

            const filtered =
                this.tiles.filter(
                    tile => {

                        const searchable = [

                            tile.title,
                            tile.description,
                            tile.pillar,
                            tile.difficulty,
                            tile.duration,
                            tile.age,
                            ...(tile.tags || [])

                        ]
                            .filter(Boolean)
                            .join(" ")
                            .toLowerCase();

                        return searchable.includes(
                            term
                        );

                    }
                );

            const originalTiles =
                this.tiles;

            this.tiles =
                filtered;

            this.render();

            this.tiles =
                originalTiles;

        }

    }

    window.FutureReadyExplore =
        window.FutureReadyExplore || {};

    window.FutureReadyExplore.DiscoveryTile =
        DiscoveryTile;

    window.FutureReadyExplore.DiscoveryTileGrid =
        DiscoveryTileGrid;

    window.FutureReadyExplore.getFavorites =
        getFavorites;

    window.FutureReadyExplore.toggleFavorite =
        toggleFavorite;

})();