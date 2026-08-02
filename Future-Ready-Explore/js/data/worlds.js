/*
==========================================================
 FUTURE READY EXPLORE
 World Data
 Version 0.1.0
==========================================================
*/

(() => {

    "use strict";

    const worlds = {

        /* ==================================================
           EXPLORE — SPACE
        ================================================== */

        space: {

            id: "space",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Space",

            subtitle:
                "Travel beyond Earth, investigate distant worlds, and explore the science and technology that help us understand the universe.",

            icon: "🚀",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Begin Exploring Space",

            difficulty:
                "All Levels",

            duration:
                "Interactive",

            audience:
                "Curious Explorers",

            overviewTitle:
                "A universe full of questions",

            overview: [

                "Space is more than a distant place. It is a laboratory for studying motion, gravity, light, matter, time, technology, and the origins of everything around us.",

                "Explore planets, moons, stars, galaxies, spacecraft, and the tools scientists use to investigate places that humans may never visit in person.",

                "Every mission begins with a question: <strong>What is out there, how does it work, and what can it teach us?</strong>"

            ],

            facts: [

                {
                    icon: "☀️",
                    title: "Our Star",
                    text:
                        "The Sun contains almost all of the mass in our solar system."
                },

                {
                    icon: "🌌",
                    title: "A Vast Galaxy",
                    text:
                        "The Milky Way contains billions of stars and is only one galaxy among many."
                },

                {
                    icon: "🛰️",
                    title: "Robotic Explorers",
                    text:
                        "Spacecraft and rovers help us investigate places too distant or dangerous for people."
                },

                {
                    icon: "⏱️",
                    title: "Time and Distance",
                    text:
                        "Looking farther into space also means seeing farther into the past."
                }

            ],

            experiencesTitle:
                "Choose your next space mission",

            experiencesIntro:
                "Explore a topic, try a simulation, or begin a mission that puts you in control.",

            experiences: [

                {
                    title: "Solar System",
                    icon: "🪐",
                    pillar: "explore",
                    description:
                        "Visit the Sun, planets, moons, asteroids, and other objects in our cosmic neighborhood.",
                    difficulty: "All Ages",
                    duration: "Interactive",
                    destination:
                        "world.html?world=solar-system",
                    tags: [
                        "space",
                        "planets",
                        "solar system",
                        "astronomy"
                    ]
                },

                {
                    title: "Mars Rover Mission",
                    icon: "🤖",
                    pillar: "explore",
                    description:
                        "Plan a route, avoid hazards, and guide a robotic explorer across the surface of Mars.",
                    difficulty: "Mission",
                    duration: "15–25 Min",
                    destination:
                        "worlds/explore/robotics/rover-mission.html",
                    tags: [
                        "mars",
                        "robotics",
                        "rover",
                        "coding"
                    ]
                },

                {
                    title: "Black Holes",
                    icon: "⚫",
                    pillar: "explore",
                    description:
                        "Investigate gravity so powerful that light cannot escape.",
                    difficulty: "Big Ideas",
                    duration: "Explore",
                    destination:
                        "world.html?world=black-holes",
                    tags: [
                        "black holes",
                        "gravity",
                        "space",
                        "physics"
                    ]
                },

                {
                    title: "Build a Rocket",
                    icon: "🚀",
                    pillar: "create",
                    description:
                        "Choose design features, balance forces, and create a rocket capable of completing a mission.",
                    difficulty: "Build & Test",
                    duration: "Challenge",
                    destination:
                        "worlds/create/engineering/rocket-builder.html",
                    tags: [
                        "rockets",
                        "engineering",
                        "design",
                        "space"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you land safely on another world?",

                description:
                    "Balance speed, gravity, fuel, and timing to guide a spacecraft toward a safe landing.",

                icon:
                    "🛬",

                difficulty:
                    "Intermediate",

                duration:
                    "20 Min",

                link:
                    "worlds/explore/space/landing-challenge.html"

            },

            resources: [

                {
                    type: "Mission Guide",
                    title: "How Space Missions Work",
                    description:
                        "Follow the path from a scientific question to spacecraft design, launch, travel, and discovery.",
                    link: "#"
                },

                {
                    type: "Resource Collection",
                    title: "Space Learning Library",
                    description:
                        "Explore videos, images, activities, articles, and mission resources for different ages.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Careers Beyond Earth",
                    description:
                        "Discover the people who design spacecraft, study planets, write software, analyze data, and support missions.",
                    link: "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Explore the forces and energy that control motion throughout the universe.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics"
                },

                {
                    title: "Robotics",
                    icon: "🤖",
                    pillar: "explore",
                    description:
                        "See how robotic systems investigate places humans cannot easily reach.",
                    difficulty: "Missions",
                    duration: "Interactive",
                    destination:
                        "world.html?world=robotics"
                },

                {
                    title: "Future Technologies",
                    icon: "🛰️",
                    pillar: "discover",
                    description:
                        "Discover emerging tools and ideas shaping how we explore tomorrow.",
                    difficulty: "Emerging",
                    duration: "Discover",
                    destination:
                        "world.html?world=future-technologies"
                }

            ]

        },


        /* ==================================================
           EXPLORE — PHYSICS
        ================================================== */

        physics: {

            id: "physics",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Physics",

            subtitle:
                "Experiment with motion, forces, energy, gravity, light, sound, and the rules that shape the physical world.",

            icon: "⚡",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Enter the Physics Lab",

            difficulty:
                "All Levels",

            duration:
                "Virtual Labs",

            audience:
                "Experimenters",

            overviewTitle:
                "The rules behind what happens",

            overview: [

                "Physics helps explain why things move, fall, bounce, glow, heat up, slow down, or change direction.",

                "By changing one variable at a time, you can test predictions and discover relationships between force, motion, energy, matter, light, and sound.",

                "The goal is not only to learn formulas. It is to understand <strong>what changes, what stays the same, and why.</strong>"

            ],

            facts: [

                {
                    icon: "🏃",
                    title: "Motion",
                    text:
                        "An object's motion changes when forces act on it."
                },

                {
                    icon: "🌍",
                    title: "Gravity",
                    text:
                        "Gravity attracts objects with mass toward one another."
                },

                {
                    icon: "🔊",
                    title: "Waves",
                    text:
                        "Sound and light carry energy in different ways."
                },

                {
                    icon: "🔋",
                    title: "Energy",
                    text:
                        "Energy can move between objects and change form."
                }

            ],

            experiencesTitle:
                "Choose a physics experiment",

            experiencesIntro:
                "Change a variable, make a prediction, and see what happens.",

            experiences: [

                {
                    title: "Gravity Lab",
                    icon: "🌍",
                    pillar: "explore",
                    description:
                        "Change mass, height, and gravity to investigate how objects fall.",
                    difficulty: "Virtual Lab",
                    duration: "10–20 Min",
                    destination:
                        "worlds/explore/physics/gravity-lab.html"
                },

                {
                    title: "Projectile Challenge",
                    icon: "🎯",
                    pillar: "explore",
                    description:
                        "Adjust angle and speed to hit a target using projectile motion.",
                    difficulty: "Challenge",
                    duration: "15 Min",
                    destination:
                        "worlds/explore/physics/projectile-challenge.html"
                },

                {
                    title: "Wave Explorer",
                    icon: "〰️",
                    pillar: "explore",
                    description:
                        "Change frequency and amplitude to investigate wave behavior.",
                    difficulty: "Interactive",
                    duration: "Explore",
                    destination:
                        "worlds/explore/physics/waves.html"
                },

                {
                    title: "Roller Coaster Designer",
                    icon: "🎢",
                    pillar: "create",
                    description:
                        "Build a track that balances speed, energy, height, and safety.",
                    difficulty: "Build & Test",
                    duration: "25 Min",
                    destination:
                        "worlds/create/engineering/roller-coaster.html"
                }

            ],

            challenge: {

                title:
                    "Can you launch an object onto the target?",

                description:
                    "Adjust the launch angle and speed, then test how gravity changes the path.",

                icon:
                    "🎯",

                difficulty:
                    "Intermediate",

                duration:
                    "15 Min",

                link:
                    "worlds/explore/physics/projectile-challenge.html"

            },

            resources: [

                {
                    type: "Experiment Guide",
                    title: "Physics at Home",
                    description:
                        "Try safe investigations using ordinary objects and simple measurements.",
                    link: "#"
                },

                {
                    type: "Concept Library",
                    title: "Forces, Motion, and Energy",
                    description:
                        "Review key ideas with diagrams, examples, and interactive demonstrations.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Who Uses Physics?",
                    description:
                        "Explore careers in engineering, medicine, aviation, energy, research, and technology.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Space",
                    icon: "🚀",
                    pillar: "explore",
                    description:
                        "See physics at work across planets, stars, and spacecraft.",
                    difficulty: "Interactive",
                    duration: "Explore",
                    destination:
                        "world.html?world=space"
                },

                {
                    title: "Engineering",
                    icon: "🏗️",
                    pillar: "create",
                    description:
                        "Use forces, materials, and energy to build working solutions.",
                    difficulty: "Build & Test",
                    duration: "Challenges",
                    destination:
                        "world.html?world=engineering"
                },

                {
                    title: "Mathematics",
                    icon: "📐",
                    pillar: "explore",
                    description:
                        "Use patterns, graphs, and measurements to describe physical systems.",
                    difficulty: "Patterns",
                    duration: "Explore",
                    destination:
                        "world.html?world=mathematics"
                }

            ]

        },


        /* ==================================================
           EXPLORE — ROBOTICS
        ================================================== */

        robotics: {

            id: "robotics",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Robotics",

            subtitle:
                "Investigate how sensors, motors, code, structures, and decisions work together inside robotic systems.",

            icon: "🤖",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Enter the Robot Lab",

            difficulty:
                "Beginner Friendly",

            duration:
                "Missions",

            audience:
                "Builders and Coders",

            overviewTitle:
                "Machines that sense, decide, and act",

            overview: [

                "Robots combine mechanical parts, electrical systems, sensors, and software to complete tasks.",

                "Some robots repeat precise actions. Others respond to changing conditions, navigate unfamiliar environments, or help people perform difficult work.",

                "Building a robot means thinking about <strong>what it must sense, how it should decide, and what action it should take.</strong>"

            ],

            facts: [

                {
                    icon: "👁️",
                    title: "Sensors",
                    text:
                        "Sensors allow robots to detect light, distance, touch, motion, sound, and more."
                },

                {
                    icon: "⚙️",
                    title: "Motors",
                    text:
                        "Motors create movement in wheels, arms, joints, and tools."
                },

                {
                    icon: "💻",
                    title: "Code",
                    text:
                        "Programs give robots instructions and decision-making rules."
                },

                {
                    icon: "🧭",
                    title: "Navigation",
                    text:
                        "Robots use measurements and feedback to understand where they are."
                }

            ],

            experiencesTitle:
                "Choose a robotics mission",

            experiencesIntro:
                "Build systems, arrange commands, and test how your robot responds.",

            experiences: [

                {
                    title: "Robot Maze",
                    icon: "🧩",
                    pillar: "explore",
                    description:
                        "Arrange commands to guide a robot through obstacles and toward a goal.",
                    difficulty: "Beginner",
                    duration: "10–20 Min",
                    destination:
                        "worlds/explore/robotics/robot-maze.html"
                },

                {
                    title: "Rover Mission",
                    icon: "🚙",
                    pillar: "explore",
                    description:
                        "Navigate unknown terrain using limited commands and sensor information.",
                    difficulty: "Mission",
                    duration: "20 Min",
                    destination:
                        "worlds/explore/robotics/rover-mission.html"
                },

                {
                    title: "Sensor Lab",
                    icon: "📡",
                    pillar: "explore",
                    description:
                        "Experiment with different sensors and see how they affect robot behavior.",
                    difficulty: "Virtual Lab",
                    duration: "Explore",
                    destination:
                        "worlds/explore/robotics/sensors.html"
                },

                {
                    title: "Build a Robot",
                    icon: "🛠️",
                    pillar: "create",
                    description:
                        "Choose a frame, movement system, sensors, and tools for a specific job.",
                    difficulty: "Build & Test",
                    duration: "Project",
                    destination:
                        "worlds/create/robotics/robot-builder.html"
                }

            ],

            challenge: {

                title:
                    "Can your robot complete a rescue mission?",

                description:
                    "Choose the right sensors and commands to reach a target without colliding with obstacles.",

                icon:
                    "🚨",

                difficulty:
                    "Intermediate",

                duration:
                    "20 Min",

                link:
                    "worlds/explore/robotics/rescue-mission.html"

            },

            resources: [

                {
                    type: "Starter Guide",
                    title: "How Robots Work",
                    description:
                        "Learn the basic relationship between sensors, code, motors, structure, and feedback.",
                    link: "#"
                },

                {
                    type: "Project Collection",
                    title: "Beginner Robotics Activities",
                    description:
                        "Try simple robotics and coding activities using virtual or physical tools.",
                    link: "#"
                },

                {
                    type: "Community Connection",
                    title: "Find Robotics Clubs and Teams",
                    description:
                        "Explore local teams, competitions, clubs, and opportunities to build with others.",
                    link:
                        "world.html?world=clubs-and-teams"
                }

            ],

            related: [

                {
                    title: "Coding",
                    icon: "💻",
                    pillar: "explore",
                    description:
                        "Learn how instructions and logic control robotic behavior.",
                    difficulty: "Beginner Friendly",
                    duration: "Code Labs",
                    destination:
                        "world.html?world=coding"
                },

                {
                    title: "Engineering",
                    icon: "🏗️",
                    pillar: "create",
                    description:
                        "Design strong structures and mechanisms for machines.",
                    difficulty: "Build & Test",
                    duration: "Challenges",
                    destination:
                        "world.html?world=engineering"
                },

                {
                    title: "Space",
                    icon: "🚀",
                    pillar: "explore",
                    description:
                        "See how robots explore distant and dangerous environments.",
                    difficulty: "Interactive",
                    duration: "Explore",
                    destination:
                        "world.html?world=space"
                }

            ]

        },


        /* ==================================================
           CREATE — ENGINEERING
        ================================================== */

        engineering: {

            id: "engineering",

            pillar: "create",

            eyebrow: "Create World",

            title: "Engineering",

            subtitle:
                "Use science, mathematics, creativity, materials, and testing to design solutions for real problems.",

            icon: "🏗️",

            backLabel: "Back to Create",

            backLink: "create.html",

            primaryActionText:
                "Enter the Engineering Lab",

            difficulty:
                "Build & Test",

            duration:
                "Challenges",

            audience:
                "Inventors and Problem Solvers",

            overviewTitle:
                "Designing solutions that work",

            overview: [

                "Engineering begins with a need, a problem, or an opportunity to make something better.",

                "Engineers imagine possible solutions, create models, test their designs, study what failed, and improve the next version.",

                "A successful design must do more than look interesting. It must <strong>meet the goal, work reliably, and fit the available limits.</strong>"

            ],

            facts: [

                {
                    icon: "📋",
                    title: "Criteria",
                    text:
                        "Criteria describe what a successful solution must accomplish."
                },

                {
                    icon: "🚧",
                    title: "Constraints",
                    text:
                        "Constraints are limits involving time, cost, materials, size, safety, or other conditions."
                },

                {
                    icon: "🧪",
                    title: "Testing",
                    text:
                        "Testing reveals whether a design works and where it needs improvement."
                },

                {
                    icon: "🔁",
                    title: "Iteration",
                    text:
                        "Engineering improves through repeated cycles of building, testing, and revising."
                }

            ],

            experiencesTitle:
                "Choose an engineering challenge",

            experiencesIntro:
                "Design a solution, test it, and improve it using evidence from what happened.",

            experiences: [

                {
                    title: "Bridge Builder",
                    icon: "🌉",
                    pillar: "create",
                    description:
                        "Place supports and materials, then test how much weight your bridge can carry.",
                    difficulty: "Build & Test",
                    duration: "20–30 Min",
                    destination:
                        "worlds/create/engineering/bridge-builder.html"
                },

                {
                    title: "Tower Challenge",
                    icon: "🗼",
                    pillar: "create",
                    description:
                        "Build the tallest stable tower using limited materials.",
                    difficulty: "Challenge",
                    duration: "15–25 Min",
                    destination:
                        "worlds/create/engineering/tower-challenge.html"
                },

                {
                    title: "Roller Coaster Designer",
                    icon: "🎢",
                    pillar: "create",
                    description:
                        "Balance height, speed, energy, and safety to create a working ride.",
                    difficulty: "Design Lab",
                    duration: "25 Min",
                    destination:
                        "worlds/create/engineering/roller-coaster.html"
                },

                {
                    title: "Inventor Challenge",
                    icon: "💡",
                    pillar: "create",
                    description:
                        "Solve an open-ended problem using your own original design.",
                    difficulty: "Open Challenge",
                    duration: "Project",
                    destination:
                        "worlds/create/inventor-challenges/index.html"
                }

            ],

            challenge: {

                title:
                    "Can your bridge survive the load test?",

                description:
                    "Choose where to place supports and how to distribute forces across the structure.",

                icon:
                    "🌉",

                difficulty:
                    "Intermediate",

                duration:
                    "25 Min",

                link:
                    "worlds/create/engineering/bridge-builder.html"

            },

            resources: [

                {
                    type: "Design Guide",
                    title: "The Engineering Design Process",
                    description:
                        "Follow a repeatable process for defining problems, imagining solutions, testing, and improving.",
                    link: "#"
                },

                {
                    type: "Project Collection",
                    title: "Engineering Challenges",
                    description:
                        "Try hands-on challenges using simple materials at home, school, or in a maker space.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Explore Engineering Careers",
                    description:
                        "Meet people designing structures, machines, software, medical devices, energy systems, and more.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Understand the forces and energy that affect your designs.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics"
                },

                {
                    title: "Robotics",
                    icon: "🤖",
                    pillar: "explore",
                    description:
                        "Combine mechanical design with electronics and code.",
                    difficulty: "Missions",
                    duration: "Interactive",
                    destination:
                        "world.html?world=robotics"
                },

                {
                    title: "Great Inventions",
                    icon: "💡",
                    pillar: "discover",
                    description:
                        "Discover how engineers transformed ideas into useful technologies.",
                    difficulty: "Ideas",
                    duration: "Discover",
                    destination:
                        "world.html?world=inventions"
                }

            ]

        },


        /* ==================================================
           DISCOVER — CAREERS
        ================================================== */

        careers: {

            id: "careers",

            pillar: "discover",

            eyebrow: "Discover World",

            title: "Amazing Careers",

            subtitle:
                "Discover the people, skills, pathways, and possibilities behind work in science, technology, engineering, the arts, and mathematics.",

            icon: "🧭",

            backLabel: "Back to Discover",

            backLink: "discover.html",

            primaryActionText:
                "Explore Career Paths",

            difficulty:
                "All Ages",

            duration:
                "Discover",

            audience:
                "Future Thinkers",

            overviewTitle:
                "There is more than one path forward",

            overview: [

                "STEAM careers exist in hospitals, forests, laboratories, studios, schools, businesses, construction sites, manufacturing facilities, museums, farms, and space programs.",

                "Many careers combine several interests. A person might use science and art, engineering and medicine, coding and music, or mathematics and environmental work.",

                "Career exploration is not about choosing your whole future today. It is about learning <strong>what exists, what interests you, and what skills you might want to develop.</strong>"

            ],

            facts: [

                {
                    icon: "🧩",
                    title: "Combined Skills",
                    text:
                        "Many careers combine communication, creativity, technical knowledge, and teamwork."
                },

                {
                    icon: "🛤️",
                    title: "Different Pathways",
                    text:
                        "Careers may begin through college, technical training, apprenticeships, certificates, or experience."
                },

                {
                    icon: "🔄",
                    title: "Changing Work",
                    text:
                        "New tools and discoveries continually create new kinds of jobs."
                },

                {
                    icon: "🤝",
                    title: "Real People",
                    text:
                        "Mentors and professionals can help explain what careers are actually like."
                }

            ],

            experiencesTitle:
                "Choose a career direction",

            experiencesIntro:
                "Begin with something you enjoy, a problem you care about, or a skill you want to use.",

            experiences: [

                {
                    title: "Build and Design",
                    icon: "🏗️",
                    pillar: "discover",
                    description:
                        "Explore careers involving structures, machines, systems, products, and construction.",
                    difficulty: "Career Path",
                    duration: "Discover",
                    destination: "#"
                },

                {
                    title: "Health and Medicine",
                    icon: "🩺",
                    pillar: "discover",
                    description:
                        "Explore careers that study health, treat illness, develop technology, and help people.",
                    difficulty: "Career Path",
                    duration: "Discover",
                    destination: "#"
                },

                {
                    title: "Computers and Technology",
                    icon: "💻",
                    pillar: "discover",
                    description:
                        "Explore careers involving software, cybersecurity, data, networks, games, and digital systems.",
                    difficulty: "Career Path",
                    duration: "Discover",
                    destination: "#"
                },

                {
                    title: "Earth and Environment",
                    icon: "🌲",
                    pillar: "discover",
                    description:
                        "Explore careers involving land, water, weather, wildlife, natural resources, and conservation.",
                    difficulty: "Career Path",
                    duration: "Discover",
                    destination: "#"
                }

            ],

            challenge: {

                title:
                    "Which career paths match what you enjoy?",

                description:
                    "Choose your interests, preferred activities, and favorite kinds of problems to explore possible directions.",

                icon:
                    "🧭",

                difficulty:
                    "All Ages",

                duration:
                    "10 Min",

                link:
                    "#"

            },

            resources: [

                {
                    type: "Career Tool",
                    title: "Interest Explorer",
                    description:
                        "Start with activities and interests, then discover careers that use similar strengths.",
                    link: "#"
                },

                {
                    type: "Education Guide",
                    title: "Understanding Career Pathways",
                    description:
                        "Compare college, technical education, apprenticeships, certifications, and workplace training.",
                    link: "#"
                },

                {
                    type: "Community Connection",
                    title: "Meet Local Professionals",
                    description:
                        "Discover businesses, organizations, mentors, and professionals across the Black Hills.",
                    link:
                        "world.html?world=community-partners"
                }

            ],

            related: [

                {
                    title: "Community Partners",
                    icon: "🏢",
                    pillar: "connect",
                    description:
                        "Meet local organizations and employers working across STEAM fields.",
                    difficulty: "Local",
                    duration: "Connect",
                    destination:
                        "world.html?world=community-partners"
                },

                {
                    title: "Schools and Colleges",
                    icon: "🎓",
                    pillar: "connect",
                    description:
                        "Explore education and training pathways available nearby.",
                    difficulty: "Pathways",
                    duration: "Connect",
                    destination:
                        "world.html?world=education"
                },

                {
                    title: "Future Technologies",
                    icon: "🛰️",
                    pillar: "discover",
                    description:
                        "See how emerging technologies may shape future work.",
                    difficulty: "Emerging",
                    duration: "Discover",
                    destination:
                        "world.html?world=future-technologies"
                }

            ]

        },


        /* ==================================================
           DISCOVER — INVENTIONS
        ================================================== */

        inventions: {

            id: "inventions",

            pillar: "discover",

            eyebrow: "Discover World",

            title: "Great Inventions",

            subtitle:
                "Follow the questions, mistakes, experiments, and improvements behind ideas that changed how people live.",

            icon: "💡",

            backLabel: "Back to Discover",

            backLink: "discover.html",

            primaryActionText:
                "Explore Great Ideas",

            difficulty:
                "All Ages",

            duration:
                "Stories",

            audience:
                "Curious Inventors",

            overviewTitle:
                "Ideas become useful through improvement",

            overview: [

                "Inventions rarely appear fully formed. They grow through observation, experimentation, failure, redesign, and collaboration.",

                "Some inventions solve urgent problems. Others create new possibilities that people did not know they needed.",

                "The most important question is not only who invented something. It is also <strong>what problem they noticed and how the design changed over time.</strong>"

            ],

            facts: [

                {
                    icon: "❓",
                    title: "Questions First",
                    text:
                        "Many inventions begin when someone notices a problem or asks whether something could work differently."
                },

                {
                    icon: "🧪",
                    title: "Many Attempts",
                    text:
                        "Prototypes help inventors test ideas before creating a final version."
                },

                {
                    icon: "🔧",
                    title: "Constant Improvement",
                    text:
                        "Most technologies continue changing long after their first invention."
                },

                {
                    icon: "👥",
                    title: "Shared Progress",
                    text:
                        "Major inventions often depend on work from many people across time."
                }

            ],

            experiencesTitle:
                "Choose an invention story",

            experiencesIntro:
                "Explore the problem, the breakthrough, and the improvements that followed.",

            experiences: [

                {
                    title: "The Light Bulb",
                    icon: "💡",
                    pillar: "discover",
                    description:
                        "Explore the long process of creating practical electric lighting.",
                    difficulty: "History",
                    duration: "Story",
                    destination: "#"
                },

                {
                    title: "The Computer",
                    icon: "🖥️",
                    pillar: "discover",
                    description:
                        "Follow the development of machines that calculate, store information, and run programs.",
                    difficulty: "Technology",
                    duration: "Timeline",
                    destination: "#"
                },

                {
                    title: "Medical Imaging",
                    icon: "🩻",
                    pillar: "discover",
                    description:
                        "See how technology made it possible to look inside the body without surgery.",
                    difficulty: "Medicine",
                    duration: "Story",
                    destination: "#"
                },

                {
                    title: "The Internet",
                    icon: "🌐",
                    pillar: "discover",
                    description:
                        "Explore how connected networks changed communication, information, and daily life.",
                    difficulty: "Technology",
                    duration: "Timeline",
                    destination: "#"
                }

            ],

            challenge: {

                title:
                    "Can you improve an everyday object?",

                description:
                    "Choose something familiar, identify one problem, and design a better version.",

                icon:
                    "🛠️",

                difficulty:
                    "Open Challenge",

                duration:
                    "20–40 Min",

                link:
                    "worlds/create/inventor-challenges/index.html"

            },

            resources: [

                {
                    type: "Story Collection",
                    title: "Invention Timelines",
                    description:
                        "Follow how important technologies changed through many versions and contributors.",
                    link: "#"
                },

                {
                    type: "Activity Guide",
                    title: "Become an Inventor",
                    description:
                        "Practice identifying problems, sketching ideas, building prototypes, and testing improvements.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "People Who Invent",
                    description:
                        "Explore careers involving research, engineering, design, technology, medicine, and entrepreneurship.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Engineering",
                    icon: "🏗️",
                    pillar: "create",
                    description:
                        "Use design and testing to turn ideas into working solutions.",
                    difficulty: "Build & Test",
                    duration: "Challenges",
                    destination:
                        "world.html?world=engineering"
                },

                {
                    title: "Future Technologies",
                    icon: "🛰️",
                    pillar: "discover",
                    description:
                        "Explore ideas that may shape the next generation of inventions.",
                    difficulty: "Emerging",
                    duration: "Discover",
                    destination:
                        "world.html?world=future-technologies"
                },

                {
                    title: "Inventor Challenges",
                    icon: "💡",
                    pillar: "create",
                    description:
                        "Try open-ended problems and design your own solutions.",
                    difficulty: "Open Challenge",
                    duration: "Create",
                    destination:
                        "worlds/create/inventor-challenges/index.html"
                }

            ]

        },

                /* ==================================================
           EXPLORE — CHEMISTRY
        ================================================== */

        chemistry: {

            id: "chemistry",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Chemistry",

            subtitle:
                "Investigate atoms, molecules, materials, reactions, energy, and the transformations happening throughout the world around you.",

            icon: "⚗️",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Enter the Chemistry Lab",

            difficulty:
                "All Levels",

            duration:
                "Virtual Labs",

            audience:
                "Curious Experimenters",

            overviewTitle:
                "The science of matter and change",

            overview: [

                "Chemistry explores what substances are made of, how their particles are arranged, and why materials behave differently.",

                "Chemical changes happen when atoms rearrange into new combinations. These transformations are involved in cooking, medicine, batteries, living systems, manufacturing, weather, fire, and countless everyday processes.",

                "A chemistry investigation asks you to observe carefully, compare evidence, control variables, and consider an important question: <strong>What changed at the particle level?</strong>"

            ],

            facts: [

                {
                    icon: "⚛️",
                    title: "Atoms",
                    text:
                        "Atoms are the basic building blocks of ordinary matter and can combine in many different arrangements."
                },

                {
                    icon: "🧩",
                    title: "Molecules",
                    text:
                        "Molecules form when atoms bond together in specific combinations and structures."
                },

                {
                    icon: "🔄",
                    title: "Reactions",
                    text:
                        "Chemical reactions rearrange atoms into new substances while conserving the atoms involved."
                },

                {
                    icon: "🌡️",
                    title: "Energy",
                    text:
                        "Chemical changes can release energy, absorb energy, or transfer it between a system and its surroundings."
                }

            ],

            experiencesTitle:
                "Choose a chemistry investigation",

            experiencesIntro:
                "Examine matter, build molecules, test reactions, and investigate how changing conditions affects what happens.",

            experiences: [

                {
                    title: "States of Matter",
                    icon: "🧊",
                    pillar: "explore",
                    description:
                        "Compare solids, liquids, and gases by examining particle spacing, motion, shape, and volume.",
                    difficulty: "Beginner",
                    duration: "Interactive",
                    destination:
                        "worlds/explore/chemistry/states-of-matter.html",
                    tags: [
                        "chemistry",
                        "matter",
                        "solid",
                        "liquid",
                        "gas",
                        "particles"
                    ]
                },

                {
                    title: "Build a Molecule",
                    icon: "🧬",
                    pillar: "explore",
                    description:
                        "Combine atoms, investigate bonds, and compare the structures of different molecules.",
                    difficulty: "Molecule Lab",
                    duration: "15–25 Min",
                    destination:
                        "worlds/explore/chemistry/molecule-builder.html",
                    tags: [
                        "chemistry",
                        "atoms",
                        "molecules",
                        "bonding",
                        "structure"
                    ]
                },

                {
                    title: "Reaction Lab",
                    icon: "🧪",
                    pillar: "explore",
                    description:
                        "Change amounts, temperature, and other conditions to observe evidence of chemical reactions.",
                    difficulty: "Virtual Lab",
                    duration: "20 Min",
                    destination:
                        "worlds/explore/chemistry/reaction-lab.html",
                    tags: [
                        "chemistry",
                        "reactions",
                        "temperature",
                        "energy",
                        "experiment"
                    ]
                },

                {
                    title: "Periodic Table Explorer",
                    icon: "🔬",
                    pillar: "explore",
                    description:
                        "Investigate elements, atomic structure, properties, groups, and repeating patterns across the periodic table.",
                    difficulty: "Element Explorer",
                    duration: "Explore",
                    destination:
                        "worlds/explore/chemistry/periodic-table.html",
                    tags: [
                        "chemistry",
                        "elements",
                        "periodic table",
                        "atoms",
                        "properties"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you identify a mystery substance?",

                description:
                    "Compare physical and chemical properties, examine test results, and use evidence to determine which substance is hidden.",

                icon:
                    "🔎",

                difficulty:
                    "Intermediate",

                duration:
                    "20 Min",

                link:
                    "worlds/explore/chemistry/mystery-substance.html"

            },

            resources: [

                {
                    type: "Lab Guide",
                    title: "Investigating Chemical Change",
                    description:
                        "Learn how color changes, temperature changes, gas production, light, and new materials can provide evidence of a reaction.",
                    link: "#"
                },

                {
                    type: "Reference Collection",
                    title: "Atoms, Elements, and Molecules",
                    description:
                        "Review particle models, element symbols, bonding ideas, and the organization of matter.",
                    link: "#"
                },

                {
                    type: "Safety Guide",
                    title: "Think Like a Safe Scientist",
                    description:
                        "Learn why laboratory procedures, protective equipment, labels, measurements, and careful cleanup matter.",
                    link: "#"
                }

            ],

            related: [

                {
                    title: "Biology",
                    icon: "🧬",
                    pillar: "explore",
                    description:
                        "Explore the chemical processes and molecules that make living systems possible.",
                    difficulty: "Living Systems",
                    duration: "Explore",
                    destination:
                        "world.html?world=biology",
                    tags: [
                        "biology",
                        "life",
                        "cells",
                        "chemistry"
                    ]
                },

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Investigate energy, forces, motion, heat, light, and the physical behavior of matter.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics",
                    tags: [
                        "physics",
                        "energy",
                        "matter",
                        "forces"
                    ]
                },

                {
                    title: "Medical Careers",
                    icon: "🩺",
                    pillar: "discover",
                    description:
                        "Discover careers that use chemistry to study health, medicine, materials, testing, and treatment.",
                    difficulty: "Career Path",
                    duration: "Discover",
                    destination:
                        "world.html?world=careers",
                    tags: [
                        "careers",
                        "medicine",
                        "chemistry",
                        "health"
                    ]
                }

            ]

        },

                /* ==================================================
           EXPLORE — BIOLOGY
        ================================================== */

        biology: {

            id: "biology",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Biology",

            subtitle:
                "Explore cells, organisms, ecosystems, genetics, anatomy, and the interconnected systems that make life possible.",

            icon: "🧬",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Enter the Biology Lab",

            difficulty:
                "All Levels",

            duration:
                "Interactive",

            audience:
                "Life Explorers",

            overviewTitle:
                "The science of living systems",

            overview: [

                "Biology investigates life at every scale, from molecules inside a cell to organisms interacting across an entire ecosystem.",

                "Living things take in energy, respond to their surroundings, grow, reproduce, maintain internal conditions, and pass biological information from one generation to the next.",

                "Biologists look for connections between structures and functions by asking: <strong>How does this living system work, and how does it interact with everything around it?</strong>"

            ],

            facts: [

                {
                    icon: "🔬",
                    title: "Cells",
                    text:
                        "All known living organisms are made of one or more cells, the fundamental units of life."
                },

                {
                    icon: "🧬",
                    title: "Genetic Information",
                    text:
                        "DNA stores biological instructions that help organisms develop, function, and reproduce."
                },

                {
                    icon: "🌱",
                    title: "Energy and Matter",
                    text:
                        "Living systems obtain, transform, store, and use energy and matter to survive."
                },

                {
                    icon: "🌎",
                    title: "Interdependence",
                    text:
                        "Organisms depend on other organisms and environmental conditions within connected ecosystems."
                }

            ],

            experiencesTitle:
                "Choose a biology investigation",

            experiencesIntro:
                "Look inside cells, investigate inheritance, explore body systems, and study relationships among living organisms.",

            experiences: [

                {
                    title: "Cell Explorer",
                    icon: "🔬",
                    pillar: "explore",
                    description:
                        "Investigate cell structures and discover how their specialized parts help cells survive and function.",
                    difficulty: "Cell Biology",
                    duration: "Interactive",
                    destination:
                        "worlds/explore/biology/cell-explorer.html",
                    tags: [
                        "biology",
                        "cells",
                        "organelles",
                        "microscope",
                        "life"
                    ]
                },

                {
                    title: "DNA Builder",
                    icon: "🧬",
                    pillar: "explore",
                    description:
                        "Build a DNA sequence, pair matching bases, and investigate how biological information is organized.",
                    difficulty: "Genetics",
                    duration: "15–25 Min",
                    destination:
                        "worlds/explore/biology/dna-builder.html",
                    tags: [
                        "biology",
                        "dna",
                        "genetics",
                        "genes",
                        "inheritance"
                    ]
                },

                {
                    title: "Human Body Explorer",
                    icon: "🫀",
                    pillar: "explore",
                    description:
                        "Explore organs and body systems and see how they cooperate to maintain life.",
                    difficulty: "Anatomy",
                    duration: "Explore",
                    destination:
                        "worlds/explore/biology/human-body.html",
                    tags: [
                        "biology",
                        "human body",
                        "anatomy",
                        "organs",
                        "body systems"
                    ]
                },

                {
                    title: "Ecosystem Lab",
                    icon: "🌿",
                    pillar: "explore",
                    description:
                        "Change populations and environmental conditions to investigate balance within an ecosystem.",
                    difficulty: "Ecology",
                    duration: "Virtual Lab",
                    destination:
                        "worlds/explore/biology/ecosystem-lab.html",
                    tags: [
                        "biology",
                        "ecology",
                        "ecosystems",
                        "food webs",
                        "environment"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you restore balance to an ecosystem?",

                description:
                    "Study the food web, examine changing populations, and decide which action may help the ecosystem recover.",

                icon:
                    "🌎",

                difficulty:
                    "Intermediate",

                duration:
                    "20 Min",

                link:
                    "worlds/explore/biology/ecosystem-balance.html"

            },

            resources: [

                {
                    type: "Reference Collection",
                    title: "Cells and Living Systems",
                    description:
                        "Explore cell structures, organization, energy use, growth, reproduction, and the characteristics shared by living things.",
                    link: "#"
                },

                {
                    type: "Investigation Guide",
                    title: "Observe Like a Biologist",
                    description:
                        "Practice recording evidence, identifying patterns, comparing organisms, and asking testable questions about life.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Careers in the Life Sciences",
                    description:
                        "Discover work involving healthcare, wildlife, genetics, agriculture, laboratories, conservation, and biotechnology.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Chemistry",
                    icon: "⚗️",
                    pillar: "explore",
                    description:
                        "Investigate the atoms, molecules, and reactions involved in living systems.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=chemistry",
                    tags: [
                        "chemistry",
                        "molecules",
                        "reactions",
                        "biology"
                    ]
                },

                {
                    title: "Earth Science",
                    icon: "🌋",
                    pillar: "explore",
                    description:
                        "Explore the climate, water, land, and natural systems that support life.",
                    difficulty: "Planet Earth",
                    duration: "Explore",
                    destination:
                        "world.html?world=earth-science",
                    tags: [
                        "earth science",
                        "environment",
                        "climate",
                        "ecosystems"
                    ]
                },

                {
                    title: "Health and Medicine",
                    icon: "🩺",
                    pillar: "discover",
                    description:
                        "Discover careers that use biology to understand health, diagnose problems, and improve lives.",
                    difficulty: "Career Path",
                    duration: "Discover",
                    destination:
                        "world.html?world=careers",
                    tags: [
                        "careers",
                        "medicine",
                        "health",
                        "biology"
                    ]
                }

            ]

        },

                /* ==================================================
           EXPLORE — EARTH SCIENCE
        ================================================== */

        "earth-science": {

            id: "earth-science",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Earth Science",

            subtitle:
                "Investigate rocks, weather, oceans, climate, landscapes, natural hazards, and the dynamic systems shaping our planet.",

            icon: "🌋",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Explore Planet Earth",

            difficulty:
                "All Levels",

            duration:
                "Field Labs",

            audience:
                "Planet Explorers",

            overviewTitle:
                "A planet that never stops changing",

            overview: [

                "Earth science examines the connected systems of land, water, air, ice, and life that shape our planet.",

                "Mountains rise and erode, continents move, weather changes, rivers reshape landscapes, oceans circulate, and energy from the Sun drives many processes at Earth's surface.",

                "Earth scientists study evidence from rocks, fossils, maps, measurements, satellites, and natural events to ask: <strong>What happened here, what is changing now, and what may happen next?</strong>"

            ],

            facts: [

                {
                    icon: "🪨",
                    title: "A Rock Record",
                    text:
                        "Rocks preserve evidence of environments, events, and processes from Earth's past."
                },

                {
                    icon: "🌦️",
                    title: "Weather and Climate",
                    text:
                        "Weather describes short-term atmospheric conditions, while climate describes longer-term patterns."
                },

                {
                    icon: "🌊",
                    title: "Moving Water",
                    text:
                        "Water circulates through oceans, air, land, ice, groundwater, and living systems."
                },

                {
                    icon: "🧭",
                    title: "A Dynamic Surface",
                    text:
                        "Plate movement, erosion, deposition, volcanism, and impacts continually reshape Earth's surface."
                }

            ],

            experiencesTitle:
                "Choose an Earth investigation",

            experiencesIntro:
                "Track storms, examine rocks, investigate volcanoes, and explore the systems connecting land, water, and atmosphere.",

            experiences: [

                {
                    title: "Volcano Simulator",
                    icon: "🌋",
                    pillar: "explore",
                    description:
                        "Change magma properties and pressure to investigate how different volcanic eruptions can develop.",
                    difficulty: "Virtual Lab",
                    duration: "20 Min",
                    destination:
                        "worlds/explore/earth-science/volcano-simulator.html",
                    tags: [
                        "earth science",
                        "volcanoes",
                        "magma",
                        "geology",
                        "natural hazards"
                    ]
                },

                {
                    title: "Weather Lab",
                    icon: "🌪️",
                    pillar: "explore",
                    description:
                        "Compare temperature, pressure, moisture, and wind to investigate changing weather conditions.",
                    difficulty: "Atmosphere",
                    duration: "Interactive",
                    destination:
                        "worlds/explore/earth-science/weather-lab.html",
                    tags: [
                        "earth science",
                        "weather",
                        "atmosphere",
                        "storms",
                        "climate"
                    ]
                },

                {
                    title: "Rock and Mineral Explorer",
                    icon: "💎",
                    pillar: "explore",
                    description:
                        "Use visible properties and test results to compare rocks, minerals, and the processes that form them.",
                    difficulty: "Geology",
                    duration: "Explore",
                    destination:
                        "worlds/explore/earth-science/rocks-minerals.html",
                    tags: [
                        "earth science",
                        "rocks",
                        "minerals",
                        "geology",
                        "identification"
                    ]
                },

                {
                    title: "Water Cycle Lab",
                    icon: "💧",
                    pillar: "explore",
                    description:
                        "Trace water through evaporation, condensation, precipitation, runoff, groundwater, and living systems.",
                    difficulty: "Earth Systems",
                    duration: "15–20 Min",
                    destination:
                        "worlds/explore/earth-science/water-cycle.html",
                    tags: [
                        "earth science",
                        "water cycle",
                        "weather",
                        "groundwater",
                        "oceans"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you prepare a community for a natural hazard?",

                description:
                    "Study maps, measurements, and warning signs, then choose actions that reduce risk and help people respond safely.",

                icon:
                    "⚠️",

                difficulty:
                    "Intermediate",

                duration:
                    "20–30 Min",

                link:
                    "worlds/explore/earth-science/hazard-planner.html"

            },

            resources: [

                {
                    type: "Field Guide",
                    title: "Reading Earth's Evidence",
                    description:
                        "Learn how rocks, landforms, fossils, maps, and measurements reveal past and present Earth processes.",
                    link: "#"
                },

                {
                    type: "Data Collection",
                    title: "Weather, Water, and Climate",
                    description:
                        "Explore observations, maps, graphs, and activities involving atmospheric and water systems.",
                    link: "#"
                },

                {
                    type: "Local Connection",
                    title: "Explore the Black Hills",
                    description:
                        "Discover local geology, caves, landscapes, water systems, weather, natural resources, and Earth-science careers.",
                    link:
                        "world.html?world=black-hills"
                }

            ],

            related: [

                {
                    title: "Biology",
                    icon: "🧬",
                    pillar: "explore",
                    description:
                        "Investigate how organisms interact with Earth's changing environments and resources.",
                    difficulty: "Living Systems",
                    duration: "Explore",
                    destination:
                        "world.html?world=biology",
                    tags: [
                        "biology",
                        "ecosystems",
                        "environment",
                        "earth science"
                    ]
                },

                {
                    title: "Chemistry",
                    icon: "⚗️",
                    pillar: "explore",
                    description:
                        "Explore the chemical properties and transformations of rocks, water, air, and soil.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=chemistry",
                    tags: [
                        "chemistry",
                        "minerals",
                        "water",
                        "atmosphere"
                    ]
                },

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Investigate the forces, energy, heat, waves, and motion driving Earth systems.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics",
                    tags: [
                        "physics",
                        "energy",
                        "forces",
                        "earth science"
                    ]
                }

            ]

        },

                /* ==================================================
           EXPLORE — CODING
        ================================================== */

        coding: {

            id: "coding",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Coding",

            subtitle:
                "Use instructions, patterns, logic, and creativity to control computers, solve problems, and build interactive experiences.",

            icon: "💻",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Enter the Coding Lab",

            difficulty:
                "Beginner Friendly",

            duration:
                "Code Labs",

            audience:
                "Creators and Problem Solvers",

            overviewTitle:
                "Turning ideas into instructions",

            overview: [

                "Coding is the process of creating instructions that computers and other programmable machines can follow.",

                "Programs can control robots, analyze information, build websites, create games, simulate scientific systems, produce art, and solve real-world problems.",

                "A programmer breaks a larger goal into smaller steps and asks: <strong>What should happen, in what order, and under which conditions?</strong>"

            ],

            facts: [

                {
                    icon: "➡️",
                    title: "Sequences",
                    text:
                        "A sequence places instructions in the order they should happen."
                },

                {
                    icon: "🔁",
                    title: "Loops",
                    text:
                        "Loops repeat instructions without requiring the same code to be written again."
                },

                {
                    icon: "🔀",
                    title: "Conditions",
                    text:
                        "Conditional statements allow a program to make decisions based on whether something is true or false."
                },

                {
                    icon: "📦",
                    title: "Variables",
                    text:
                        "Variables store information that a program can use, update, compare, and display."
                }

            ],

            experiencesTitle:
                "Choose a coding experience",

            experiencesIntro:
                "Arrange commands, solve logic problems, fix bugs, and create programs that respond to user actions.",

            experiences: [

                {
                    title: "Code a Robot",
                    icon: "🤖",
                    pillar: "explore",
                    description:
                        "Arrange movement commands, use loops, and guide a robot through a series of increasingly difficult missions.",
                    difficulty: "Beginner",
                    duration: "15–25 Min",
                    destination:
                        "worlds/explore/coding/code-a-robot.html",
                    tags: [
                        "coding",
                        "robotics",
                        "commands",
                        "loops",
                        "problem solving"
                    ]
                },

                {
                    title: "Debug the Mission",
                    icon: "🐞",
                    pillar: "explore",
                    description:
                        "Study a program that does not work correctly, identify the problem, and repair its instructions.",
                    difficulty: "Debugging",
                    duration: "15 Min",
                    destination:
                        "worlds/explore/coding/debug-mission.html",
                    tags: [
                        "coding",
                        "debugging",
                        "bugs",
                        "logic",
                        "programming"
                    ]
                },

                {
                    title: "Logic Maze",
                    icon: "🧩",
                    pillar: "explore",
                    description:
                        "Use conditions, patterns, and limited commands to navigate a changing digital maze.",
                    difficulty: "Logic",
                    duration: "20 Min",
                    destination:
                        "worlds/explore/coding/logic-maze.html",
                    tags: [
                        "coding",
                        "logic",
                        "maze",
                        "conditions",
                        "algorithms"
                    ]
                },

                {
                    title: "Build an Animation",
                    icon: "🎬",
                    pillar: "create",
                    description:
                        "Use events, movement, timing, and variables to create an animated scene or interactive story.",
                    difficulty: "Creative Coding",
                    duration: "Project",
                    destination:
                        "worlds/create/coding/animation-studio.html",
                    tags: [
                        "coding",
                        "animation",
                        "creative coding",
                        "events",
                        "design"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you program a successful rescue mission?",

                description:
                    "Build an efficient sequence of commands, use loops where possible, and guide your robot safely to the target.",

                icon:
                    "🚨",

                difficulty:
                    "Intermediate",

                duration:
                    "20 Min",

                link:
                    "worlds/explore/coding/rescue-mission.html"

            },

            resources: [

                {
                    type: "Starter Guide",
                    title: "How Computer Programs Work",
                    description:
                        "Explore commands, sequences, loops, variables, conditions, events, and functions through simple examples.",
                    link: "#"
                },

                {
                    type: "Practice Collection",
                    title: "Beginner Coding Challenges",
                    description:
                        "Strengthen logical thinking through short programming puzzles, debugging activities, and creative projects.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Careers That Use Code",
                    description:
                        "Discover work involving software, games, websites, cybersecurity, robotics, data, engineering, science, and digital media.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Robotics",
                    icon: "🤖",
                    pillar: "explore",
                    description:
                        "Use programs to control sensors, motors, movement, and robotic decisions.",
                    difficulty: "Missions",
                    duration: "Interactive",
                    destination:
                        "world.html?world=robotics",
                    tags: [
                        "robotics",
                        "coding",
                        "sensors",
                        "machines"
                    ]
                },

                {
                    title: "Mathematics",
                    icon: "📐",
                    pillar: "explore",
                    description:
                        "Explore the patterns, logic, measurements, and data used throughout computer science.",
                    difficulty: "Patterns",
                    duration: "Explore",
                    destination:
                        "world.html?world=mathematics",
                    tags: [
                        "mathematics",
                        "logic",
                        "patterns",
                        "coding"
                    ]
                },

                {
                    title: "Game Maker",
                    icon: "🎮",
                    pillar: "create",
                    description:
                        "Use code, design, rules, characters, and challenges to create your own playable experience.",
                    difficulty: "Creative",
                    duration: "Create",
                    destination:
                        "worlds/create/game-maker/index.html",
                    tags: [
                        "games",
                        "coding",
                        "design",
                        "creation"
                    ]
                }

            ]

        },

                /* ==================================================
           EXPLORE — MATHEMATICS
        ================================================== */

        mathematics: {

            id: "mathematics",

            pillar: "explore",

            eyebrow: "Explore World",

            title: "Mathematics",

            subtitle:
                "Explore patterns, shapes, quantities, data, probability, measurement, and the language used to describe how things work.",

            icon: "📐",

            backLabel: "Back to Explore",

            backLink: "explore.html",

            primaryActionText:
                "Enter the Math Lab",

            difficulty:
                "All Levels",

            duration:
                "Challenges",

            audience:
                "Pattern Finders",

            overviewTitle:
                "A language for patterns and relationships",

            overview: [

                "Mathematics helps people describe quantities, compare changes, recognize patterns, measure objects, analyze information, and make predictions.",

                "It is used throughout science, engineering, technology, art, music, construction, medicine, business, coding, and everyday decision-making.",

                "Mathematical thinking asks you to look for structure and explain your reasoning: <strong>What pattern do I notice, how can I represent it, and does my solution make sense?</strong>"

            ],

            facts: [

                {
                    icon: "🔢",
                    title: "Numbers",
                    text:
                        "Numbers represent quantities, positions, measurements, comparisons, and relationships."
                },

                {
                    icon: "📐",
                    title: "Geometry",
                    text:
                        "Geometry explores shapes, space, position, size, angles, area, volume, and transformations."
                },

                {
                    icon: "📊",
                    title: "Data",
                    text:
                        "Data can be organized, represented, compared, and analyzed to reveal patterns and support decisions."
                },

                {
                    icon: "🎲",
                    title: "Probability",
                    text:
                        "Probability describes how likely an event is to happen and helps people reason about uncertainty."
                }

            ],

            experiencesTitle:
                "Choose a mathematics challenge",

            experiencesIntro:
                "Investigate patterns, solve spatial problems, analyze data, and use mathematical models to make predictions.",

            experiences: [

                {
                    title: "Pattern Explorer",
                    icon: "🔁",
                    pillar: "explore",
                    description:
                        "Study number and visual sequences, identify the rule, and predict what comes next.",
                    difficulty: "Patterns",
                    duration: "15 Min",
                    destination:
                        "worlds/explore/mathematics/pattern-explorer.html",
                    tags: [
                        "mathematics",
                        "patterns",
                        "sequences",
                        "algebra",
                        "reasoning"
                    ]
                },

                {
                    title: "Geometry Lab",
                    icon: "📐",
                    pillar: "explore",
                    description:
                        "Move points, compare shapes, investigate angles, and explore how measurements change.",
                    difficulty: "Geometry",
                    duration: "Interactive",
                    destination:
                        "worlds/explore/mathematics/geometry-lab.html",
                    tags: [
                        "mathematics",
                        "geometry",
                        "shapes",
                        "angles",
                        "measurement"
                    ]
                },

                {
                    title: "Data Detective",
                    icon: "📊",
                    pillar: "explore",
                    description:
                        "Read graphs, compare data sets, identify misleading displays, and use evidence to answer questions.",
                    difficulty: "Data",
                    duration: "20 Min",
                    destination:
                        "worlds/explore/mathematics/data-detective.html",
                    tags: [
                        "mathematics",
                        "data",
                        "graphs",
                        "statistics",
                        "evidence"
                    ]
                },

                {
                    title: "Probability Playground",
                    icon: "🎲",
                    pillar: "explore",
                    description:
                        "Run repeated trials, compare predictions with results, and investigate chance.",
                    difficulty: "Probability",
                    duration: "Virtual Lab",
                    destination:
                        "worlds/explore/mathematics/probability-playground.html",
                    tags: [
                        "mathematics",
                        "probability",
                        "chance",
                        "experiments",
                        "data"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you design the most efficient route?",

                description:
                    "Compare distances, constraints, and possible paths to create a route that meets the goal using the least time or distance.",

                icon:
                    "🗺️",

                difficulty:
                    "Intermediate",

                duration:
                    "20 Min",

                link:
                    "worlds/explore/mathematics/route-challenge.html"

            },

            resources: [

                {
                    type: "Problem-Solving Guide",
                    title: "Think Like a Mathematician",
                    description:
                        "Practice identifying known information, choosing a representation, testing strategies, and explaining a solution.",
                    link: "#"
                },

                {
                    type: "Challenge Collection",
                    title: "Math in the Real World",
                    description:
                        "Explore activities involving architecture, sports, money, maps, music, engineering, design, and data.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Careers That Use Mathematics",
                    description:
                        "Discover work involving engineering, software, medicine, science, finance, construction, design, data, and research.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Coding",
                    icon: "💻",
                    pillar: "explore",
                    description:
                        "Use logic, variables, coordinates, patterns, and data to build computer programs.",
                    difficulty: "Code Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=coding",
                    tags: [
                        "coding",
                        "logic",
                        "data",
                        "mathematics"
                    ]
                },

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Use graphs, measurements, equations, and models to describe motion, force, and energy.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics",
                    tags: [
                        "physics",
                        "measurement",
                        "graphs",
                        "mathematics"
                    ]
                },

                {
                    title: "Engineering",
                    icon: "🏗️",
                    pillar: "create",
                    description:
                        "Apply measurement, geometry, data, and calculations to design and test solutions.",
                    difficulty: "Build & Test",
                    duration: "Create",
                    destination:
                        "world.html?world=engineering",
                    tags: [
                        "engineering",
                        "design",
                        "measurement",
                        "mathematics"
                    ]
                }

            ]

        },

                /* ==================================================
           EXPLORE — SOLAR SYSTEM
        ================================================== */

        "solar-system": {

            id: "solar-system",

            pillar: "explore",

            eyebrow: "Space World",

            title: "The Solar System",

            subtitle:
                "Explore the Sun, planets, dwarf planets, moons, asteroids, comets, and other objects traveling through our cosmic neighborhood.",

            icon: "🪐",

            backLabel: "Back to Space",

            backLink:
                "world.html?world=space",

            primaryActionText:
                "Begin the Solar System Tour",

            difficulty:
                "All Levels",

            duration:
                "Interactive Tour",

            audience:
                "Space Explorers",

            overviewTitle:
                "A family of worlds orbiting one star",

            overview: [

                "The solar system includes the Sun and every object held within its gravitational influence, including planets, moons, dwarf planets, asteroids, comets, dust, and spacecraft.",

                "Each world formed from related material but developed differently because of its size, location, composition, atmosphere, temperature, and history.",

                "Exploring the solar system helps scientists ask a larger question: <strong>Why did neighboring worlds become so different from one another?</strong>"

            ],

            facts: [

                {
                    icon: "☀️",
                    title: "The Sun",
                    text:
                        "The Sun is the central star whose gravity holds the solar system together."
                },

                {
                    icon: "🌍",
                    title: "Eight Planets",
                    text:
                        "The solar system contains four rocky inner planets and four large outer planets."
                },

                {
                    icon: "🌙",
                    title: "Many Moons",
                    text:
                        "Planets and dwarf planets are orbited by moons with varied surfaces, atmospheres, and histories."
                },

                {
                    icon: "☄️",
                    title: "Smaller Worlds",
                    text:
                        "Asteroids, comets, and dwarf planets preserve clues about the solar system's formation."
                }

            ],

            experiencesTitle:
                "Choose a destination",

            experiencesIntro:
                "Visit planets, compare worlds, investigate moons, and explore the smaller objects traveling around the Sun.",

            experiences: [

                {
                    title: "Rocky Planets",
                    icon: "🌍",
                    pillar: "explore",
                    description:
                        "Compare Mercury, Venus, Earth, and Mars and investigate why four rocky worlds developed so differently.",
                    difficulty: "Planet Tour",
                    duration: "Interactive",
                    destination:
                        "worlds/explore/space/rocky-planets.html",
                    tags: [
                        "space",
                        "solar system",
                        "mercury",
                        "venus",
                        "earth",
                        "mars"
                    ]
                },

                {
                    title: "Giant Planets",
                    icon: "🪐",
                    pillar: "explore",
                    description:
                        "Explore Jupiter, Saturn, Uranus, and Neptune and compare their atmospheres, rings, storms, and moons.",
                    difficulty: "Planet Tour",
                    duration: "Interactive",
                    destination:
                        "worlds/explore/space/giant-planets.html",
                    tags: [
                        "space",
                        "solar system",
                        "jupiter",
                        "saturn",
                        "uranus",
                        "neptune"
                    ]
                },

                {
                    title: "Moon Explorer",
                    icon: "🌙",
                    pillar: "explore",
                    description:
                        "Investigate fascinating moons with oceans, volcanoes, ice, thick atmospheres, and cratered surfaces.",
                    difficulty: "Moon Tour",
                    duration: "Explore",
                    destination:
                        "worlds/explore/space/moon-explorer.html",
                    tags: [
                        "space",
                        "moons",
                        "lunar science",
                        "solar system",
                        "planetary science"
                    ]
                },

                {
                    title: "Asteroids and Comets",
                    icon: "☄️",
                    pillar: "explore",
                    description:
                        "Explore smaller objects that carry ancient material and sometimes travel close to planets.",
                    difficulty: "Small Worlds",
                    duration: "Explore",
                    destination:
                        "worlds/explore/space/asteroids-comets.html",
                    tags: [
                        "space",
                        "asteroids",
                        "comets",
                        "small bodies",
                        "solar system"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you build a stable solar system?",

                description:
                    "Place worlds at different distances, adjust their speed, and investigate how gravity affects their paths around a star.",

                icon:
                    "☀️",

                difficulty:
                    "Intermediate",

                duration:
                    "20–30 Min",

                link:
                    "worlds/explore/space/orbit-builder.html"

            },

            resources: [

                {
                    type: "Planet Guide",
                    title: "Compare the Worlds",
                    description:
                        "Compare size, gravity, temperature, atmosphere, distance, moons, rotation, and orbital periods across the planets.",
                    link: "#"
                },

                {
                    type: "Mission Collection",
                    title: "Exploring the Solar System",
                    description:
                        "Discover robotic missions that visited planets, moons, asteroids, comets, and the space between them.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Planetary Science Careers",
                    description:
                        "Explore careers involving spacecraft, geology, astronomy, engineering, data, imaging, and planetary research.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Space",
                    icon: "🚀",
                    pillar: "explore",
                    description:
                        "Return to the larger Space world and explore missions, stars, galaxies, and space technology.",
                    difficulty: "Interactive",
                    duration: "Explore",
                    destination:
                        "world.html?world=space",
                    tags: [
                        "space",
                        "astronomy",
                        "missions",
                        "solar system"
                    ]
                },

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Investigate gravity, motion, energy, light, and the forces controlling planetary systems.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics",
                    tags: [
                        "physics",
                        "gravity",
                        "motion",
                        "orbits"
                    ]
                },

                {
                    title: "Black Holes",
                    icon: "⚫",
                    pillar: "explore",
                    description:
                        "Travel beyond the solar system and investigate some of the strongest gravity in the universe.",
                    difficulty: "Big Ideas",
                    duration: "Explore",
                    destination:
                        "world.html?world=black-holes",
                    tags: [
                        "space",
                        "black holes",
                        "gravity",
                        "astronomy"
                    ]
                }

            ]

        },

                /* ==================================================
           EXPLORE — BLACK HOLES
        ================================================== */

        "black-holes": {

            id: "black-holes",

            pillar: "explore",

            eyebrow: "Space World",

            title: "Black Holes",

            subtitle:
                "Investigate regions where gravity becomes so intense that matter, light, space, and time behave in extraordinary ways.",

            icon: "⚫",

            backLabel: "Back to Space",

            backLink:
                "world.html?world=space",

            primaryActionText:
                "Approach the Event Horizon",

            difficulty:
                "Big Ideas",

            duration:
                "Interactive",

            audience:
                "Cosmic Thinkers",

            overviewTitle:
                "Gravity taken to the extreme",

            overview: [

                "A black hole is a region of space where gravity is so strong that anything crossing a boundary called the event horizon cannot return.",

                "Black holes can form when very massive stars collapse. Much larger black holes exist near the centers of galaxies, while smaller and intermediate examples remain active areas of research.",

                "Scientists study black holes by observing their effects on nearby matter, light, stars, gas, and space itself, asking: <strong>What can extreme gravity reveal about the universe?</strong>"

            ],

            facts: [

                {
                    icon: "⭕",
                    title: "Event Horizon",
                    text:
                        "The event horizon marks the boundary beyond which escape is no longer possible."
                },

                {
                    icon: "🌀",
                    title: "Accretion Disks",
                    text:
                        "Hot gas and dust can orbit a black hole in a bright, fast-moving disk before falling inward."
                },

                {
                    icon: "⏱️",
                    title: "Time",
                    text:
                        "Strong gravity affects how time passes relative to regions farther away."
                },

                {
                    icon: "🌌",
                    title: "Galactic Centers",
                    text:
                        "Many galaxies contain supermassive black holes near their centers."
                }

            ],

            experiencesTitle:
                "Choose a black hole investigation",

            experiencesIntro:
                "Explore gravity, light, orbital motion, event horizons, and the clues scientists use to detect invisible objects.",

            experiences: [

                {
                    title: "Event Horizon Explorer",
                    icon: "⭕",
                    pillar: "explore",
                    description:
                        "Move closer to a black hole and investigate how distance changes what an observer may detect.",
                    difficulty: "Interactive",
                    duration: "15–20 Min",
                    destination:
                        "worlds/explore/space/event-horizon.html",
                    tags: [
                        "space",
                        "black holes",
                        "event horizon",
                        "gravity",
                        "relativity"
                    ]
                },

                {
                    title: "Orbit Around a Black Hole",
                    icon: "🌀",
                    pillar: "explore",
                    description:
                        "Adjust distance and speed to investigate possible paths around an extreme gravitational source.",
                    difficulty: "Simulation",
                    duration: "20 Min",
                    destination:
                        "worlds/explore/space/black-hole-orbits.html",
                    tags: [
                        "space",
                        "black holes",
                        "orbits",
                        "gravity",
                        "motion"
                    ]
                },

                {
                    title: "Accretion Disk Lab",
                    icon: "💫",
                    pillar: "explore",
                    description:
                        "Explore how matter heats, accelerates, and emits light while orbiting before crossing the event horizon.",
                    difficulty: "Virtual Lab",
                    duration: "Explore",
                    destination:
                        "worlds/explore/space/accretion-disk.html",
                    tags: [
                        "space",
                        "black holes",
                        "accretion disk",
                        "matter",
                        "energy"
                    ]
                },

                {
                    title: "Find the Invisible Object",
                    icon: "🔭",
                    pillar: "explore",
                    description:
                        "Study the motion and light of nearby stars to infer whether an unseen massive object is present.",
                    difficulty: "Evidence Challenge",
                    duration: "20–25 Min",
                    destination:
                        "worlds/explore/space/find-black-hole.html",
                    tags: [
                        "space",
                        "black holes",
                        "evidence",
                        "astronomy",
                        "stars"
                    ]
                }

            ],

            challenge: {

                title:
                    "Can you detect a black hole without seeing it directly?",

                description:
                    "Analyze star motion, radiation, and changing light patterns to identify evidence of an unseen gravitational source.",

                icon:
                    "🔭",

                difficulty:
                    "Intermediate",

                duration:
                    "25 Min",

                link:
                    "worlds/explore/space/black-hole-detective.html"

            },

            resources: [

                {
                    type: "Concept Guide",
                    title: "Understanding Extreme Gravity",
                    description:
                        "Explore mass, gravity, event horizons, orbital motion, and how black holes influence nearby matter and light.",
                    link: "#"
                },

                {
                    type: "Observation Guide",
                    title: "How Scientists Find Black Holes",
                    description:
                        "Learn how motion, radiation, gravitational effects, and telescope data reveal objects that cannot be seen directly.",
                    link: "#"
                },

                {
                    type: "Career Connection",
                    title: "Careers Studying the Universe",
                    description:
                        "Discover work involving astronomy, physics, mathematics, software, imaging, engineering, and scientific data.",
                    link:
                        "world.html?world=careers"
                }

            ],

            related: [

                {
                    title: "Space",
                    icon: "🚀",
                    pillar: "explore",
                    description:
                        "Return to the larger Space world and explore planets, missions, stars, and cosmic technology.",
                    difficulty: "Interactive",
                    duration: "Explore",
                    destination:
                        "world.html?world=space",
                    tags: [
                        "space",
                        "astronomy",
                        "missions",
                        "universe"
                    ]
                },

                {
                    title: "Physics",
                    icon: "⚡",
                    pillar: "explore",
                    description:
                        "Investigate gravity, motion, light, energy, and the physical rules behind black holes.",
                    difficulty: "Virtual Labs",
                    duration: "Explore",
                    destination:
                        "world.html?world=physics",
                    tags: [
                        "physics",
                        "gravity",
                        "light",
                        "motion"
                    ]
                },

                {
                    title: "Mathematics",
                    icon: "📐",
                    pillar: "explore",
                    description:
                        "Explore the models, measurements, geometry, and data used to describe extreme cosmic systems.",
                    difficulty: "Patterns",
                    duration: "Explore",
                    destination:
                        "world.html?world=mathematics",
                    tags: [
                        "mathematics",
                        "models",
                        "data",
                        "space"
                    ]
                }

            ]

        },

        

        

    };


    /* ==================================================
       GLOBAL EXPORT
    ================================================== */

    window.FutureReadyExplore =
        window.FutureReadyExplore || {};

    window.FutureReadyExplore.worlds =
        worlds;

})


();