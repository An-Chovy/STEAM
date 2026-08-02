/*
==========================================================
 FUTURE READY EXPLORE
 Discover Page
 Version 0.1.0
==========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const discoveries = [

            {
                title: "Amazing Careers",
                icon: "🧭",
                pillar: "discover",
                description:
                    "Meet people whose work involves science, technology, engineering, the arts, and mathematics.",
                difficulty: "Career Paths",
                duration: "Explore",
                destination: "world.html?world=careers",
                tags: [
                    "careers",
                    "jobs",
                    "professionals",
                    "future"
                ]
            },

            {
                title: "Great Inventions",
                icon: "💡",
                pillar: "discover",
                description:
                    "See how ordinary questions became extraordinary tools, technologies, and discoveries.",
                difficulty: "Ideas",
                duration: "All Ages",
                destination: "world.html?world=inventions",
                tags: [
                    "inventions",
                    "technology",
                    "history",
                    "engineering"
                ]
            },

            {
                title: "Unexpected Science",
                icon: "🧪",
                pillar: "discover",
                description:
                    "Find the surprising science hiding inside food, sports, music, weather, art, and everyday life.",
                difficulty: "Surprising",
                duration: "Quick Reads",
                destination: "world.html?world=unexpected-science",
                tags: [
                    "science",
                    "everyday life",
                    "facts",
                    "curiosity"
                ]
            },

            {
                title: "Around the Black Hills",
                icon: "🏔️",
                pillar: "discover",
                description:
                    "Discover local museums, laboratories, companies, colleges, landscapes, and places worth exploring.",
                difficulty: "Local",
                duration: "Community",
                destination: "world.html?world=black-hills",
                tags: [
                    "black hills",
                    "local",
                    "community",
                    "south dakota"
                ]
            },

            {
                title: "Meet Inspiring People",
                icon: "🌟",
                pillar: "discover",
                description:
                    "Learn how curious people turned questions, interests, and challenges into meaningful work.",
                difficulty: "Stories",
                duration: "Profiles",
                destination: "world.html?world=people",
                tags: [
                    "people",
                    "stories",
                    "professionals",
                    "inspiration"
                ]
            },

            {
                title: "Future Technologies",
                icon: "🛰️",
                pillar: "discover",
                description:
                    "Explore the ideas shaping tomorrow, from clean energy and robotics to medicine and space travel.",
                difficulty: "The Future",
                duration: "Emerging",
                destination: "world.html?world=future-tech",
                tags: [
                    "future",
                    "technology",
                    "robotics",
                    "space",
                    "medicine"
                ]
            },

            {
                title: "Did You Know?",
                icon: "❓",
                pillar: "discover",
                description:
                    "Collect strange, useful, and unforgettable facts that might lead to your next big question.",
                difficulty: "Fast",
                duration: "5 Minutes",
                destination: "world.html?world=did-you-know",
                tags: [
                    "facts",
                    "trivia",
                    "questions",
                    "quick"
                ]
            },

            {
                title: "Ideas That Changed Everything",
                icon: "⚙️",
                pillar: "discover",
                description:
                    "Follow the breakthroughs that transformed how people communicate, travel, heal, build, and understand.",
                difficulty: "History",
                duration: "Stories",
                destination: "world.html?world=breakthroughs",
                tags: [
                    "history",
                    "breakthroughs",
                    "inventions",
                    "science"
                ]
            }

        ];

        const grid =
            new FutureReadyExplore.DiscoveryTileGrid({
                target: "#discover-grid",
                tiles: discoveries,
                emptyMessage:
                    "New discoveries are being prepared."
            });

        grid.render();

        const randomButton =
            document.getElementById(
                "random-discovery-button"
            );

        if(randomButton){

            randomButton.addEventListener(
                "click",
                () => {

                    const randomIndex =
                        Math.floor(
                            Math.random() *
                            discoveries.length
                        );

                    const discovery =
                        discoveries[randomIndex];

                    const matchingTile =
                        document.querySelector(
                            `[data-tile-id="${createTileID(discovery.title)}"]`
                        );

                    if(matchingTile){

                        matchingTile.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        matchingTile.classList.add(
                            "is-random-discovery"
                        );

                        setTimeout(
                            () => {
                                matchingTile.classList.remove(
                                    "is-random-discovery"
                                );
                            },
                            1800
                        );

                    }

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