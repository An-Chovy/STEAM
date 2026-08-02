/*
==========================================================
 FUTURE READY EXPLORE
 Home Page
 Mission Genesis
==========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const pillarTiles = [

            {

                title:"Discover",

                icon:"🔍",

                pillar:"discover",

                description:
                    "Discover amazing careers, inventions, local opportunities, and stories that spark curiosity.",

                difficulty:"All Ages",

                duration:"Explore",

                destination:"discover.html",

                featured:true

            },

            {

                title:"Explore",

                icon:"🌎",

                pillar:"explore",

                description:
                    "Learn through interactive simulations, virtual labs, games, and experiments.",

                difficulty:"Interactive",

                duration:"Unlimited",

                destination:"explore.html",

                featured:true

            },

            {

                title:"Create",

                icon:"🎨",

                pillar:"create",

                description:
                    "Build, invent, design, code, engineer, and bring your own ideas to life.",

                difficulty:"Hands-On",

                duration:"Projects",

                destination:"create.html",

                featured:true

            },

            {

                title:"Connect",

                icon:"🤝",

                pillar:"connect",

                description:
                    "Meet mentors, businesses, colleges, competitions, scholarships, and your community.",

                difficulty:"Community",

                duration:"Future",

                destination:"connect.html",

                featured:true

            }

        ];

        new FutureReadyExplore.DiscoveryTileGrid({

            target:"#pillar-grid",

            tiles:pillarTiles

        }).render();

    }

);