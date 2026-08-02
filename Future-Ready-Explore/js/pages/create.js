/*
==========================================================
 FUTURE READY EXPLORE
 Create Page
 Version 0.1.0
==========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const creations = [

            {
                title: "Engineering Lab",
                icon: "🏗️",
                pillar: "create",
                description:
                    "Design bridges, towers, machines, structures, and solutions that must survive real tests.",
                difficulty: "Build & Test",
                duration: "Challenges",
                destination: "world.html?world=engineering",
                tags: [
                    "engineering",
                    "bridges",
                    "structures",
                    "design",
                    "building"
                ]
            },

            {
                title: "Robot Garage",
                icon: "🤖",
                pillar: "create",
                description:
                    "Build virtual robots, choose sensors and motors, and program them to complete missions.",
                difficulty: "Robotics",
                duration: "Missions",
                destination: "worlds/create/robotics/index.html",
                tags: [
                    "robots",
                    "robotics",
                    "sensors",
                    "motors",
                    "missions"
                ]
            },

            {
                title: "Coding Studio",
                icon: "💻",
                pillar: "create",
                description:
                    "Create animations, games, interactive stories, tools, and programs using code.",
                difficulty: "Beginner Friendly",
                duration: "Code Projects",
                destination: "worlds/create/coding/index.html",
                tags: [
                    "coding",
                    "programming",
                    "games",
                    "software",
                    "animation"
                ]
            },

            {
                title: "Circuit Lab",
                icon: "⚡",
                pillar: "create",
                description:
                    "Connect power sources, switches, lights, motors, and components to build working circuits.",
                difficulty: "Electronics",
                duration: "Virtual Lab",
                destination: "worlds/create/circuits/index.html",
                tags: [
                    "circuits",
                    "electricity",
                    "electronics",
                    "power",
                    "components"
                ]
            },

            {
                title: "Design Studio",
                icon: "🎨",
                pillar: "create",
                description:
                    "Use shape, color, space, typography, and visual thinking to design things people can understand and use.",
                difficulty: "Creative",
                duration: "Design Projects",
                destination: "worlds/create/design/index.html",
                tags: [
                    "design",
                    "art",
                    "graphics",
                    "typography",
                    "visual"
                ]
            },

            {
                title: "Game Maker",
                icon: "🎮",
                pillar: "create",
                description:
                    "Create rules, characters, challenges, levels, and interactions for your own playable experience.",
                difficulty: "Interactive",
                duration: "Game Projects",
                destination: "worlds/create/game-maker/index.html",
                tags: [
                    "games",
                    "game design",
                    "coding",
                    "levels",
                    "characters"
                ]
            },

            {
                title: "Music Technology",
                icon: "🎵",
                pillar: "create",
                description:
                    "Experiment with rhythm, sound, recording, digital instruments, and the technology behind music.",
                difficulty: "Sound Lab",
                duration: "Creative",
                destination: "worlds/create/music/index.html",
                tags: [
                    "music",
                    "sound",
                    "audio",
                    "technology",
                    "rhythm"
                ]
            },

            {
                title: "Inventor Challenges",
                icon: "💡",
                pillar: "create",
                description:
                    "Solve open-ended problems, combine unexpected ideas, and invent your own original solutions.",
                difficulty: "Invent",
                duration: "Open Challenge",
                destination: "worlds/create/inventor-challenges/index.html",
                tags: [
                    "inventing",
                    "challenges",
                    "ideas",
                    "problem solving",
                    "creativity"
                ]
            }

        ];

        const grid =
            new FutureReadyExplore.DiscoveryTileGrid({
                target: "#create-grid",
                tiles: creations,
                emptyMessage:
                    "New maker spaces are being prepared."
            });

        grid.render();

        const randomButton =
            document.getElementById(
                "random-creation-button"
            );

        if(randomButton){

            randomButton.addEventListener(
                "click",
                () => {

                    const randomIndex =
                        Math.floor(
                            Math.random() *
                            creations.length
                        );

                    const creation =
                        creations[randomIndex];

                    const tileID =
                        createTileID(
                            creation.title
                        );

                    const matchingTile =
                        document.querySelector(
                            `[data-tile-id="${tileID}"]`
                        );

                    if(!matchingTile){
                        return;
                    }

                    matchingTile.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    matchingTile.classList.add(
                        "is-random-creation"
                    );

                    setTimeout(
                        () => {

                            matchingTile.classList.remove(
                                "is-random-creation"
                            );

                        },
                        1800
                    );

                }
            );

        }

        function createTileID(title){

            return String(title)
                .trim()
                .toLowerCase()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                )
                .replace(
                    /^-+|-+$/g,
                    ""
                );

        }

    }
);