/*
==========================================================
 FUTURE READY EXPLORE
 Connect Page
 Version 0.1.0
==========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const connections = [

            {
                title: "Meet Mentors",
                icon: "🧭",
                pillar: "connect",
                description:
                    "Learn from professionals, educators, volunteers, and community members who can help you explore what comes next.",
                difficulty: "People",
                duration: "Guidance",
                destination: "worlds/connect/mentors/index.html",
                tags: [
                    "mentors",
                    "professionals",
                    "guidance",
                    "career support",
                    "community"
                ]
            },

            {
                title: "Community Partners",
                icon: "🏢",
                pillar: "connect",
                description:
                    "Meet the businesses, organizations, colleges, museums, and community groups supporting STEAM across the Black Hills.",
                difficulty: "Local",
                duration: "Partners",
                destination: "worlds/connect/community-partners/index.html",
                tags: [
                    "community",
                    "partners",
                    "businesses",
                    "organizations",
                    "black hills"
                ]
            },

            {
                title: "Upcoming Events",
                icon: "📅",
                pillar: "connect",
                description:
                    "Find workshops, science nights, competitions, camps, festivals, demonstrations, and other ways to participate.",
                difficulty: "Calendar",
                duration: "Year-Round",
                destination: "worlds/connect/events/index.html",
                tags: [
                    "events",
                    "workshops",
                    "camps",
                    "competitions",
                    "activities"
                ]
            },

            {
                title: "Clubs and Teams",
                icon: "🤖",
                pillar: "connect",
                description:
                    "Find robotics teams, coding clubs, science groups, maker communities, and other places to learn with others.",
                difficulty: "Join In",
                duration: "Teams",
                destination: "worlds/connect/clubs-and-teams/index.html",
                tags: [
                    "clubs",
                    "teams",
                    "robotics",
                    "coding",
                    "science"
                ]
            },

            {
                title: "Schools and Colleges",
                icon: "🎓",
                pillar: "connect",
                description:
                    "Explore programs, classes, certificates, college pathways, and learning opportunities available nearby.",
                difficulty: "Education",
                duration: "Pathways",
                destination: "worlds/connect/education/index.html",
                tags: [
                    "schools",
                    "colleges",
                    "education",
                    "programs",
                    "pathways"
                ]
            },

            {
                title: "Scholarships and Programs",
                icon: "🏅",
                pillar: "connect",
                description:
                    "Discover scholarships, internships, camps, academies, grants, and programs that can help you take the next step.",
                difficulty: "Opportunity",
                duration: "Apply",
                destination: "worlds/connect/opportunities/index.html",
                tags: [
                    "scholarships",
                    "internships",
                    "programs",
                    "grants",
                    "opportunities"
                ]
            },

            {
                title: "Volunteer and Share",
                icon: "🙌",
                pillar: "connect",
                description:
                    "Help at events, support young learners, share your expertise, or become part of the Future Ready community.",
                difficulty: "Get Involved",
                duration: "Volunteer",
                destination: "worlds/connect/volunteer/index.html",
                tags: [
                    "volunteer",
                    "share",
                    "community",
                    "help",
                    "participate"
                ]
            },

            {
                title: "Future Ready Live",
                icon: "✨",
                pillar: "connect",
                description:
                    "Explore the annual in-person showcase where students, families, educators, businesses, and organizations come together.",
                difficulty: "Live Event",
                duration: "Attend",
                destination: "../community.html",
                tags: [
                    "future ready",
                    "live event",
                    "showcase",
                    "community",
                    "steam"
                ]
            }

        ];

        const grid =
            new FutureReadyExplore.DiscoveryTileGrid({
                target: "#connect-grid",
                tiles: connections,
                emptyMessage:
                    "New community connections are being prepared."
            });

        grid.render();

        const randomButton =
            document.getElementById(
                "random-connection-button"
            );

        if(randomButton){

            randomButton.addEventListener(
                "click",
                () => {

                    const randomIndex =
                        Math.floor(
                            Math.random() *
                            connections.length
                        );

                    const connection =
                        connections[randomIndex];

                    const tileID =
                        createTileID(
                            connection.title
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
                        "is-random-connection"
                    );

                    setTimeout(
                        () => {

                            matchingTile.classList.remove(
                                "is-random-connection"
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