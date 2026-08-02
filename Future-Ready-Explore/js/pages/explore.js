/*
==========================================================
 FUTURE READY EXPLORE
 Explore Page
 Visible World Launcher
 Version 0.2.0
==========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const exploreGrid =
            document.getElementById(
                "explore-grid"
            );

        if(!exploreGrid){

            console.error(
                "Future Ready Explore: #explore-grid was not found."
            );

            return;

        }

        if(
            !window.FutureReadyExplore ||
            !window.FutureReadyExplore.DiscoveryTileGrid
        ){

            console.error(
                "Future Ready Explore: tiles.js did not load correctly."
            );

            exploreGrid.innerHTML = `
                <p class="discovery-grid-empty">
                    The Explore worlds could not be loaded.
                </p>
            `;

            return;

        }

        const explorations = [

            {
                id: "space",
                title: "Space",
                icon: "🚀",
                pillar: "explore",
                description:
                    "Travel through the solar system, investigate planets, study stars, and explore the technology that carries us beyond Earth.",
                
                experiences: 72,
                simulations: 12,
                challenges: 8,
                difficulty: "All Levels",
                duration: "Interactive",
                buttonText: "Enter Space",
                destination:
                    "./world.html?world=space",
                tags: [
                    "space",
                    "astronomy",
                    "planets",
                    "rockets",
                    "stars"
                ]
            },

            {
                id: "physics",
                title: "Physics",
                icon: "⚡",
                pillar: "explore",
                description:
                    "Experiment with motion, energy, gravity, waves, light, forces, and the rules that shape everything around us.",
                experiences: 48,
simulations: 11,
challenges: 7,
                difficulty: "Experiment",
                duration: "Virtual Labs",
                buttonText: "Enter Physics",
                destination:
                    "./world.html?world=physics",
                tags: [
                    "physics",
                    "motion",
                    "energy",
                    "gravity",
                    "forces"
                ]
            },

            {
                id: "chemistry",
                title: "Chemistry",
                icon: "⚗️",
                pillar: "explore",
                description:
                    "Investigate matter, explore reactions, and discover how atoms combine to create the materials around us.",
                experiences: 46,
simulations: 9,
challenges: 6,
                    difficulty: "Investigate",
                duration: "Reactions",
                buttonText: "Enter Chemistry",
                destination:
                    "./world.html?world=chemistry",
                tags: [
                    "chemistry",
                    "atoms",
                    "molecules",
                    "reactions",
                    "matter"
                ]
            },

            {
                id: "biology",
                title: "Biology",
                icon: "🧬",
                pillar: "explore",
                description:
                    "Explore cells, genetics, ecosystems, organisms, the human body, and the systems that make life possible.",
                experiences: 54,
simulations: 10,
challenges: 8,
                
                    difficulty: "Living Systems",
                duration: "Explore",
                buttonText: "Enter Biology",
                destination:
                    "./world.html?world=biology",
                tags: [
                    "biology",
                    "life",
                    "cells",
                    "genetics",
                    "ecosystems"
                ]
            },

            {
                id: "earth-science",
                title: "Earth Science",
                icon: "🌋",
                pillar: "explore",
                description:
                    "Investigate rocks, weather, oceans, volcanoes, climate, landscapes, and the changing systems of our planet.",
                experiences: 41,
simulations: 8,
challenges: 6,
                
                    difficulty: "Planet Earth",
                duration: "Field Lab",
                buttonText: "Explore Earth",
                destination:
                    "./world.html?world=earth-science",
                tags: [
                    "earth",
                    "geology",
                    "weather",
                    "climate",
                    "oceans"
                ]
            },

            {
                id: "robotics",
                title: "Robotics",
                icon: "🤖",
                pillar: "explore",
                description:
                    "Learn how sensors, motors, commands, movement, and decision-making work together inside robotic systems.",
                experiences: 39,
simulations: 14,
challenges: 11,
                
                    difficulty: "Hands-On",
                duration: "Missions",
                buttonText: "Enter Robotics",
                destination:
                    "./world.html?world=robotics",
                tags: [
                    "robotics",
                    "robots",
                    "sensors",
                    "motors",
                    "engineering"
                ]
            },

            {
                id: "coding",
                title: "Coding",
                icon: "💻",
                pillar: "explore",
                description:
                    "Use instructions, loops, variables, logic, and problem-solving to control machines and create digital experiences.",
                experiences: 63,
simulations: 18,
challenges: 15,
                
                    difficulty: "Beginner Friendly",
                duration: "Code Labs",
                buttonText: "Enter Coding",
                destination:
                    "./world.html?world=coding",
                tags: [
                    "coding",
                    "programming",
                    "computers",
                    "logic",
                    "software"
                ]
            },

            {
                id: "mathematics",
                title: "Mathematics",
                icon: "📐",
                pillar: "explore",
                description:
                    "Explore patterns, shapes, probability, measurement, data, and the language used to describe how things work.",
                experiences: 52,
simulations: 7,
challenges: 13,
                
                    difficulty: "Patterns",
                duration: "Challenges",
                buttonText: "Enter Mathematics",
                destination:
                    "./world.html?world=mathematics",
                tags: [
                    "math",
                    "mathematics",
                    "patterns",
                    "geometry",
                    "data"
                ]
            }

        ];

        const grid =
            new window.FutureReadyExplore.DiscoveryTileGrid({
                target: exploreGrid,
                tiles: explorations,
                emptyMessage:
                    "New exploration worlds are being prepared."
            });

        grid.render();

        const randomButton =
            document.getElementById(
                "random-exploration-button"
            );

        if(randomButton){

            randomButton.addEventListener(
                "click",
                () => {

                    const randomIndex =
                        Math.floor(
                            Math.random() *
                            explorations.length
                        );

                    const exploration =
                        explorations[randomIndex];

                    const matchingTile =
                        document.querySelector(
                            `[data-tile-id="${exploration.id}"]`
                        );

                    if(!matchingTile){
                        return;
                    }

                    matchingTile.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    matchingTile.classList.add(
                        "is-random-exploration"
                    );

                    setTimeout(
                        () => {

                            matchingTile.classList.remove(
                                "is-random-exploration"
                            );

                        },
                        1800
                    );

                }
            );

        }

    }
)




