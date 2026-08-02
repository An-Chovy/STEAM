/*
==========================================================
 FUTURE READY EXPLORE
 Earth Science Atmosphere
 Atmosphere to Geosphere Environment
 Version 2.0.0
==========================================================
*/

(() => {

    "use strict";


    /* ==================================================
       CONFIGURATION
    ================================================== */

    const CONFIG = {

        clouds: {
            high: 7,
            middle: 6,
            low: 4
        },

        particles: {
            wind: 28,
            dust: 18,
            rain: 75,
            snow: 42,
            ash: 30
        },

        weather: {
            minimumDuration: 22000,
            maximumDuration: 36000
        },

        lightning: {
            minimumDelay: 6000,
            maximumDelay: 14000
        },

        parallax: {
            easing: 0.065
        }

    };


    /* ==================================================
       STATE
    ================================================== */

    const state = {

        root: null,

        layers: {},

        currentWeather: "clear",

        weatherTimer: null,

        lightningTimer: null,

        animationFrame: null,

        resizeTimer: null,

        reducedMotion: false,

        width: window.innerWidth,

        height: window.innerHeight,

        targetPointerX: 0,

        targetPointerY: 0,

        currentPointerX: 0,

        currentPointerY: 0,

        targetScroll: 0,

        currentScroll: 0

    };


    /* ==================================================
       MODULE
    ================================================== */

    const EarthScienceAtmosphere = {

        initialize(world){

            cleanup();

            state.reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

            state.width =
                window.innerWidth;

            state.height =
                window.innerHeight;

            buildEnvironment();

            buildClouds();

            buildWindParticles();

            buildDustParticles();

            buildAshParticles();

            installListeners();

            updateScrollPosition();

            setWeather(
                chooseInitialWeather()
            );

            if(!state.reducedMotion){

                startAnimationLoop();

                scheduleWeatherChange();

            }

            document.body.classList.add(
                "has-earth-science-atmosphere"
            );

            document.body.dataset.atmosphere =
                "earth-science";

            console.log(
                `Future Ready Explore: Earth Science atmosphere initialized for ${world.title}.`
            );

        },


        destroy(){

            cleanup();

        }

    };


    /* ==================================================
       ENVIRONMENT
    ================================================== */

    function buildEnvironment(){

        const root =
            document.createElement(
                "div"
            );

        root.id =
            "earth-science-atmosphere";

        root.className =
            "earth-science-atmosphere";

        root.setAttribute(
            "aria-hidden",
            "true"
        );

        root.innerHTML = `

            <div class="earth-sky-layer"></div>

            <div class="earth-sun-layer">

                <div class="earth-sun-disc"></div>

                <div class="earth-sun-halo"></div>

            </div>

            <div class="earth-aurora-layer"></div>

            <div
                class="earth-cloud-layer earth-cloud-layer-high"
                data-earth-clouds="high">
            </div>

            <div
                class="earth-cloud-layer earth-cloud-layer-middle"
                data-earth-clouds="middle">
            </div>

            <div
                class="earth-cloud-layer earth-cloud-layer-low"
                data-earth-clouds="low">
            </div>

            <div class="earth-atmospheric-haze"></div>

            ${createMountainSVG()}

            <div class="earth-ground-fog earth-ground-fog-one"></div>

            <div class="earth-ground-fog earth-ground-fog-two"></div>

            <div
                class="earth-wind-layer"
                data-earth-wind>
            </div>

            <div
                class="earth-dust-layer"
                data-earth-dust>
            </div>

            <div
                class="earth-rain-layer"
                data-earth-rain>
            </div>

            <div
                class="earth-snow-layer"
                data-earth-snow>
            </div>

            <div
                class="earth-lightning-layer"
                data-earth-lightning>
            </div>

            <div class="earth-geology-transition"></div>

            ${createGeologySVG()}

            <div
                class="earth-ash-layer"
                data-earth-ash>
            </div>

            <div class="earth-weather-overlay"></div>

            <div class="earth-vignette"></div>

        `;

        document.body.prepend(
            root
        );

        state.root =
            root;

        state.layers = {

            cloudsHigh:
                root.querySelector(
                    '[data-earth-clouds="high"]'
                ),

            cloudsMiddle:
                root.querySelector(
                    '[data-earth-clouds="middle"]'
                ),

            cloudsLow:
                root.querySelector(
                    '[data-earth-clouds="low"]'
                ),

            wind:
                root.querySelector(
                    "[data-earth-wind]"
                ),

            dust:
                root.querySelector(
                    "[data-earth-dust]"
                ),

            rain:
                root.querySelector(
                    "[data-earth-rain]"
                ),

            snow:
                root.querySelector(
                    "[data-earth-snow]"
                ),

            lightning:
                root.querySelector(
                    "[data-earth-lightning]"
                ),

            ash:
                root.querySelector(
                    "[data-earth-ash]"
                )

        };

    }


    /* ==================================================
       MOUNTAIN SVG
    ================================================== */

    function createMountainSVG(){

        return `

            <svg
                class="earth-mountain-scene"
                viewBox="0 0 1600 720"
                preserveAspectRatio="xMidYMax slice">

                <defs>

                    <linearGradient
                        id="earthMountainFarGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">

                        <stop
                            offset="0%"
                            stop-color="#5d7f87">
                        </stop>

                        <stop
                            offset="100%"
                            stop-color="#274750">
                        </stop>

                    </linearGradient>

                    <linearGradient
                        id="earthMountainMiddleGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">

                        <stop
                            offset="0%"
                            stop-color="#355a60">
                        </stop>

                        <stop
                            offset="100%"
                            stop-color="#17343a">
                        </stop>

                    </linearGradient>

                    <linearGradient
                        id="earthMountainNearGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">

                        <stop
                            offset="0%"
                            stop-color="#203f40">
                        </stop>

                        <stop
                            offset="100%"
                            stop-color="#0b2326">
                        </stop>

                    </linearGradient>

                </defs>

                <path
                    class="earth-mountain-range earth-mountain-range-far"
                    fill="url(#earthMountainFarGradient)"
                    d="
                        M0 720
                        L0 475
                        C110 445 150 390 245 405
                        C330 420 365 330 465 348
                        C555 365 610 282 715 304
                        C795 321 855 245 952 270
                        C1050 295 1090 342 1178 329
                        C1285 313 1320 380 1410 365
                        C1490 352 1535 410 1600 394
                        L1600 720
                        Z
                    ">
                </path>

                <path
                    class="earth-mountain-range earth-mountain-range-middle"
                    fill="url(#earthMountainMiddleGradient)"
                    d="
                        M0 720
                        L0 555
                        C95 520 165 475 245 500
                        C345 530 400 415 505 440
                        C620 468 666 370 775 400
                        C870 425 910 344 1025 380
                        C1115 408 1170 438 1265 418
                        C1360 398 1420 490 1505 462
                        C1540 451 1570 458 1600 470
                        L1600 720
                        Z
                    ">
                </path>

                <path
                    class="earth-mountain-range earth-mountain-range-near"
                    fill="url(#earthMountainNearGradient)"
                    d="
                        M0 720
                        L0 625
                        C100 605 170 555 255 580
                        C355 610 420 520 530 548
                        C640 575 710 497 820 525
                        C930 555 980 485 1085 515
                        C1195 545 1250 535 1350 552
                        C1455 570 1510 610 1600 590
                        L1600 720
                        Z
                    ">
                </path>

            </svg>

        `;

    }


    /* ==================================================
       GEOLOGY SVG
    ================================================== */

    function createGeologySVG(){

        return `

            <svg
                class="earth-geology-scene"
                viewBox="0 0 1600 1000"
                preserveAspectRatio="xMidYMid slice">

                <defs>

                    <linearGradient
                        id="earthRockSurfaceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">

                        <stop
                            offset="0%"
                            stop-color="#53615a">
                        </stop>

                        <stop
                            offset="100%"
                            stop-color="#242e2c">
                        </stop>

                    </linearGradient>

                    <linearGradient
                        id="earthVolcanoGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">

                        <stop
                            offset="0%"
                            stop-color="#59605b">
                        </stop>

                        <stop
                            offset="45%"
                            stop-color="#303a37">
                        </stop>

                        <stop
                            offset="100%"
                            stop-color="#151d1c">
                        </stop>

                    </linearGradient>

                    <linearGradient
                        id="earthMagmaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">

                        <stop
                            offset="0%"
                            stop-color="#fff0a0">
                        </stop>

                        <stop
                            offset="28%"
                            stop-color="#ffad35">
                        </stop>

                        <stop
                            offset="68%"
                            stop-color="#f0441f">
                        </stop>

                        <stop
                            offset="100%"
                            stop-color="#751d13">
                        </stop>

                    </linearGradient>

                    <filter id="earthMagmaGlow">

                        <feGaussianBlur
                            stdDeviation="7"
                            result="blur">
                        </feGaussianBlur>

                        <feMerge>

                            <feMergeNode in="blur"></feMergeNode>

                            <feMergeNode in="SourceGraphic"></feMergeNode>

                        </feMerge>

                    </filter>

                </defs>

                <!-- SURFACE -->

                <path
                    class="earth-geology-surface"
                    fill="url(#earthRockSurfaceGradient)"
                    d="
                        M0 180
                        C180 145 310 170 460 150
                        C620 128 770 165 930 142
                        C1090 120 1275 160 1600 130
                        L1600 1000
                        L0 1000
                        Z
                    ">
                </path>

                <!-- STRATA -->

                <path
                    class="earth-stratum earth-stratum-one"
                    d="
                        M0 250
                        C230 218 430 270 650 235
                        C900 195 1130 270 1600 210
                    ">
                </path>

                <path
                    class="earth-stratum earth-stratum-two"
                    d="
                        M0 340
                        C220 302 460 366 690 325
                        C970 276 1235 365 1600 295
                    ">
                </path>

                <path
                    class="earth-stratum earth-stratum-three"
                    d="
                        M0 450
                        C250 405 450 485 740 430
                        C1020 378 1290 470 1600 405
                    ">
                </path>

                <path
                    class="earth-stratum earth-stratum-four"
                    d="
                        M0 575
                        C250 525 510 620 780 555
                        C1050 490 1330 595 1600 520
                    ">
                </path>

                <path
                    class="earth-stratum earth-stratum-five"
                    d="
                        M0 720
                        C300 650 520 770 810 695
                        C1110 620 1330 735 1600 665
                    ">
                </path>

                <!-- FAULT -->

                <path
                    class="earth-fault"
                    d="
                        M520 175
                        L565 290
                        L530 405
                        L590 520
                        L555 665
                        L620 790
                        L600 970
                    ">
                </path>

                <!-- VOLCANO EXTERIOR -->

                <path
                    class="earth-volcano-body"
                    fill="url(#earthVolcanoGradient)"
                    d="
                        M850 180
                        C905 170 925 175 970 182
                        L1240 640
                        C1130 625 1040 615 920 620
                        C810 625 730 638 640 650
                        Z
                    ">
                </path>

                <!-- CRATER OPENING -->

                <path
                    class="earth-volcano-crater"
                    d="
                        M850 180
                        C885 161 935 161 970 182
                        C940 199 880 200 850 180
                        Z
                    ">
                </path>

                <!-- CENTRAL CONDUIT -->

                <path
                    class="earth-magma-conduit"
                    d="
                        M890 188
                        C880 310 892 410 875 548
                        C865 628 860 700 820 785
                    ">
                </path>

                <!-- DIKES -->

                <path
                    class="earth-magma-dike"
                    d="
                        M878 405
                        C820 430 775 468 720 502
                    ">
                </path>

                <path
                    class="earth-magma-dike"
                    d="
                        M872 520
                        C930 548 985 575 1045 610
                    ">
                </path>

                <!-- SILL -->

                <path
                    class="earth-magma-sill"
                    d="
                        M720 688
                        C840 655 970 660 1100 690
                    ">
                </path>

                <!-- MAGMA CHAMBER -->

                <path
                    class="earth-magma-chamber"
                    d="
                        M690 820
                        C740 740 855 728 930 780
                        C1000 830 960 910 885 932
                        C805 955 720 915 690 820
                        Z
                    ">
                </path>

                <!-- LAVA FLOWS FOLLOWING SLOPES -->

                <path
                    class="earth-surface-lava earth-surface-lava-left"
                    d="
                        M870 190
                        C830 245 790 300 755 360
                        C720 420 700 475 665 520
                    ">
                </path>

                <path
                    class="earth-surface-lava earth-surface-lava-right"
                    d="
                        M946 188
                        C985 238 1015 294 1050 350
                        C1085 405 1115 455 1148 505
                    ">
                </path>

                <!-- MINERAL ZONES -->

                ${createMineralSpecimens()}

            </svg>

        `;

    }


    /* ==================================================
       FIXED MINERAL SPECIMENS
    ================================================== */

    function createMineralSpecimens(){

        return `

            <g class="earth-mineral-zone earth-mineral-zone-quartz">

                <path
                    class="earth-crystal earth-crystal-quartz"
                    d="M250 500 L270 450 L290 500 L285 560 L255 560 Z">
                </path>

                <path
                    class="earth-crystal earth-crystal-quartz"
                    d="M285 530 L302 485 L320 530 L316 575 L290 575 Z">
                </path>

                <path
                    class="earth-crystal earth-crystal-quartz"
                    d="M220 535 L236 498 L252 535 L248 574 L225 574 Z">
                </path>

            </g>

            <g class="earth-mineral-zone earth-mineral-zone-amethyst">

                <path
                    class="earth-crystal earth-crystal-amethyst"
                    d="M1190 565 L1211 505 L1231 565 L1224 625 L1196 625 Z">
                </path>

                <path
                    class="earth-crystal earth-crystal-amethyst"
                    d="M1228 590 L1244 542 L1261 590 L1255 634 L1233 634 Z">
                </path>

                <path
                    class="earth-crystal earth-crystal-amethyst"
                    d="M1158 592 L1174 550 L1190 592 L1184 632 L1163 632 Z">
                </path>

            </g>

            <g class="earth-mineral-zone earth-mineral-zone-calcite">

                <path
                    class="earth-calcite-shape"
                    d="M400 745 L460 710 L510 755 L448 790 Z">
                </path>

                <path
                    class="earth-calcite-shape"
                    d="M470 780 L525 748 L570 790 L515 822 Z">
                </path>

            </g>

        `;

    }


    /* ==================================================
       CLOUDS
    ================================================== */

    function buildClouds(){

        createCloudLayer(
            state.layers.cloudsHigh,
            CONFIG.clouds.high,
            "high"
        );

        createCloudLayer(
            state.layers.cloudsMiddle,
            CONFIG.clouds.middle,
            "middle"
        );

        createCloudLayer(
            state.layers.cloudsLow,
            CONFIG.clouds.low,
            "low"
        );

    }


    function createCloudLayer(
        layer,
        count,
        depth
    ){

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            const cloud =
                document.createElement(
                    "span"
                );

            cloud.className = [
                "earth-cloud",
                `earth-cloud-${depth}`
            ].join(" ");

            cloud.style.setProperty(
                "--cloud-start",
                `${random(-35, 80, 2)}vw`
            );

            cloud.style.setProperty(
                "--cloud-y",
                `${random(
                    depth === "high"
                        ? 3
                        : 12,
                    depth === "low"
                        ? 68
                        : 52,
                    2
                )}%`
            );

            cloud.style.setProperty(
                "--cloud-width",
                `${getCloudWidth(depth)}px`
            );

            cloud.style.setProperty(
                "--cloud-opacity",
                random(
                    depth === "high"
                        ? 0.06
                        : 0.13,
                    depth === "low"
                        ? 0.35
                        : 0.26,
                    2
                )
            );

            cloud.style.setProperty(
                "--cloud-duration",
                `${random(65, 120, 2)}s`
            );

            cloud.style.setProperty(
                "--cloud-delay",
                `${random(-100, 0, 2)}s`
            );

            cloud.innerHTML = `

                <span class="earth-cloud-mass earth-cloud-mass-one"></span>

                <span class="earth-cloud-mass earth-cloud-mass-two"></span>

                <span class="earth-cloud-mass earth-cloud-mass-three"></span>

                <span class="earth-cloud-base"></span>

            `;

            fragment.appendChild(
                cloud
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function getCloudWidth(depth){

        const ranges = {

            high: [
                180,
                330
            ],

            middle: [
                250,
                430
            ],

            low: [
                330,
                540
            ]

        };

        return random(
            ranges[depth][0],
            ranges[depth][1],
            2
        );

    }


    /* ==================================================
       WIND
    ================================================== */

    function buildWindParticles(){

        const layer =
            state.layers.wind;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.particles.wind;
            index += 1
        ){

            const particle =
                document.createElement(
                    "span"
                );

            particle.className =
                "earth-wind-particle";

            particle.style.setProperty(
                "--wind-y",
                `${random(5, 90, 2)}%`
            );

            particle.style.setProperty(
                "--wind-width",
                `${random(22, 95, 2)}px`
            );

            particle.style.setProperty(
                "--wind-opacity",
                random(0.03, 0.16, 2)
            );

            particle.style.setProperty(
                "--wind-duration",
                `${random(9, 21, 2)}s`
            );

            particle.style.setProperty(
                "--wind-delay",
                `${random(-20, 0, 2)}s`
            );

            fragment.appendChild(
                particle
            );

        }

        layer.appendChild(
            fragment
        );

    }


    /* ==================================================
       DUST
    ================================================== */

    function buildDustParticles(){

        const layer =
            state.layers.dust;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.particles.dust;
            index += 1
        ){

            const dust =
                document.createElement(
                    "span"
                );

            dust.className =
                "earth-dust-particle";

            dust.style.setProperty(
                "--dust-x",
                `${random(0, 100, 2)}%`
            );

            dust.style.setProperty(
                "--dust-y",
                `${random(32, 96, 2)}%`
            );

            dust.style.setProperty(
                "--dust-size",
                `${random(1, 4, 2)}px`
            );

            dust.style.setProperty(
                "--dust-duration",
                `${random(17, 35, 2)}s`
            );

            dust.style.setProperty(
                "--dust-delay",
                `${random(-30, 0, 2)}s`
            );

            dust.style.setProperty(
                "--dust-drift-x",
                `${random(-70, 100, 2)}px`
            );

            dust.style.setProperty(
                "--dust-drift-y",
                `${random(-65, 30, 2)}px`
            );

            fragment.appendChild(
                dust
            );

        }

        layer.appendChild(
            fragment
        );

    }


    /* ==================================================
       VOLCANIC ASH
    ================================================== */

    function buildAshParticles(){

        const layer =
            state.layers.ash;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < CONFIG.particles.ash;
            index += 1
        ){

            const ash =
                document.createElement(
                    "span"
                );

            ash.className =
                "earth-ash-particle";

            ash.style.setProperty(
                "--ash-x",
                `${random(45, 75, 2)}%`
            );

            ash.style.setProperty(
                "--ash-size",
                `${random(2, 8, 2)}px`
            );

            ash.style.setProperty(
                "--ash-duration",
                `${random(8, 18, 2)}s`
            );

            ash.style.setProperty(
                "--ash-delay",
                `${random(-18, 0, 2)}s`
            );

            ash.style.setProperty(
                "--ash-drift-x",
                `${random(-140, 160, 2)}px`
            );

            fragment.appendChild(
                ash
            );

        }

        layer.appendChild(
            fragment
        );

    }


    /* ==================================================
       WEATHER
    ================================================== */

    function chooseInitialWeather(){

        const hour =
            new Date().getHours();

        if(
            hour >= 19 ||
            hour < 6
        ){

            return Math.random() > 0.65
                ? "aurora"
                : "night";

        }

        return randomItem([
            "clear",
            "clear",
            "cloudy",
            "wind",
            "rain"
        ]);

    }


    function chooseNextWeather(){

        const options = [
            "clear",
            "cloudy",
            "wind",
            "rain",
            "storm",
            "snow",
            "night",
            "aurora"
        ];

        return randomItem(
            options.filter(
                option =>
                    option !==
                    state.currentWeather
            )
        );

    }


    function scheduleWeatherChange(){

        clearWeatherTimer();

        state.weatherTimer =
            window.setTimeout(
                () => {

                    setWeather(
                        chooseNextWeather()
                    );

                    scheduleWeatherChange();

                },
                random(
                    CONFIG.weather.minimumDuration,
                    CONFIG.weather.maximumDuration
                )
            );

    }


    function setWeather(weather){

        if(!state.root){
            return;
        }

        state.currentWeather =
            weather;

        state.root.dataset.weather =
            weather;

        clearPrecipitation();

        clearLightningTimer();

        if(weather === "rain"){

            buildRain(
                CONFIG.particles.rain
            );

        }

        if(weather === "storm"){

            buildRain(
                Math.round(
                    CONFIG.particles.rain *
                    1.25
                )
            );

            if(!state.reducedMotion){

                scheduleLightning();

            }

        }

        if(weather === "snow"){

            buildSnow(
                CONFIG.particles.snow
            );

        }

    }


    /* ==================================================
       PRECIPITATION
    ================================================== */

    function buildRain(count){

        const layer =
            state.layers.rain;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            const drop =
                document.createElement(
                    "span"
                );

            drop.className =
                "earth-raindrop";

            drop.style.setProperty(
                "--rain-x",
                `${random(-10, 110, 2)}%`
            );

            drop.style.setProperty(
                "--rain-length",
                `${random(30, 75, 2)}px`
            );

            drop.style.setProperty(
                "--rain-duration",
                `${random(0.7, 1.3, 2)}s`
            );

            drop.style.setProperty(
                "--rain-delay",
                `${random(-1.5, 0, 2)}s`
            );

            fragment.appendChild(
                drop
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function buildSnow(count){

        const layer =
            state.layers.snow;

        if(!layer){
            return;
        }

        const fragment =
            document.createDocumentFragment();

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            const flake =
                document.createElement(
                    "span"
                );

            flake.className =
                "earth-snowflake";

            flake.style.setProperty(
                "--snow-x",
                `${random(0, 100, 2)}%`
            );

            flake.style.setProperty(
                "--snow-size",
                `${random(2, 7, 2)}px`
            );

            flake.style.setProperty(
                "--snow-duration",
                `${random(8, 17, 2)}s`
            );

            flake.style.setProperty(
                "--snow-delay",
                `${random(-15, 0, 2)}s`
            );

            flake.style.setProperty(
                "--snow-sway",
                `${random(-100, 100, 2)}px`
            );

            fragment.appendChild(
                flake
            );

        }

        layer.appendChild(
            fragment
        );

    }


    function clearPrecipitation(){

        if(state.layers.rain){

            state.layers.rain.innerHTML =
                "";

        }

        if(state.layers.snow){

            state.layers.snow.innerHTML =
                "";

        }

    }


    /* ==================================================
       LIGHTNING
    ================================================== */

    function scheduleLightning(){

        clearLightningTimer();

        if(
            state.currentWeather !==
            "storm"
        ){
            return;
        }

        state.lightningTimer =
            window.setTimeout(
                () => {

                    createLightningFlash();

                    scheduleLightning();

                },
                random(
                    CONFIG.lightning.minimumDelay,
                    CONFIG.lightning.maximumDelay
                )
            );

    }


    function createLightningFlash(){

        if(
            !state.layers.lightning ||
            state.reducedMotion ||
            document.hidden
        ){
            return;
        }

        const flash =
            document.createElement(
                "span"
            );

        flash.className =
            "earth-lightning-flash";

        flash.style.setProperty(
            "--lightning-x",
            `${random(18, 82, 2)}%`
        );

        state.layers.lightning.appendChild(
            flash
        );

        window.setTimeout(
            () => {

                flash.remove();

            },
            1400
        );

    }


    /* ==================================================
       INTERACTION
    ================================================== */

    function installListeners(){

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            {
                passive: true
            }
        );

        window.addEventListener(
            "pointerleave",
            resetPointer,
            {
                passive: true
            }
        );

        window.addEventListener(
            "scroll",
            updateScrollPosition,
            {
                passive: true
            }
        );

        window.addEventListener(
            "resize",
            handleResize,
            {
                passive: true
            }
        );

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

    }


    function removeListeners(){

        window.removeEventListener(
            "pointermove",
            handlePointerMove
        );

        window.removeEventListener(
            "pointerleave",
            resetPointer
        );

        window.removeEventListener(
            "scroll",
            updateScrollPosition
        );

        window.removeEventListener(
            "resize",
            handleResize
        );

        document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

    }


    function handlePointerMove(event){

        state.targetPointerX =
            (
                event.clientX /
                Math.max(
                    state.width,
                    1
                )
            ) - 0.5;

        state.targetPointerY =
            (
                event.clientY /
                Math.max(
                    state.height,
                    1
                )
            ) - 0.5;

    }


    function resetPointer(){

        state.targetPointerX = 0;

        state.targetPointerY = 0;

    }


    function updateScrollPosition(){

        const maximumScroll =
            Math.max(
                document.documentElement
                    .scrollHeight -
                window.innerHeight,
                1
            );

        state.targetScroll =
            window.scrollY /
            maximumScroll;

    }


    function handleResize(){

        window.clearTimeout(
            state.resizeTimer
        );

        state.resizeTimer =
            window.setTimeout(
                () => {

                    state.width =
                        window.innerWidth;

                    state.height =
                        window.innerHeight;

                },
                120
            );

    }


    function handleVisibilityChange(){

        if(document.hidden){

            clearWeatherTimer();

            clearLightningTimer();

            return;

        }

        if(!state.reducedMotion){

            scheduleWeatherChange();

            if(
                state.currentWeather ===
                "storm"
            ){

                scheduleLightning();

            }

        }

    }


    /* ==================================================
       ANIMATION LOOP
    ================================================== */

    function startAnimationLoop(){

        stopAnimationLoop();

        const update =
            () => {

                if(!state.root){
                    return;
                }

                state.currentPointerX =
                    lerp(
                        state.currentPointerX,
                        state.targetPointerX,
                        CONFIG.parallax.easing
                    );

                state.currentPointerY =
                    lerp(
                        state.currentPointerY,
                        state.targetPointerY,
                        CONFIG.parallax.easing
                    );

                state.currentScroll =
                    lerp(
                        state.currentScroll,
                        state.targetScroll,
                        CONFIG.parallax.easing * 0.72
                    );

                const atmosphereProgress =
                    clamp(
                        1 -
                        state.currentScroll *
                        3.6,
                        0,
                        1
                    );

                const geologyProgress =
                    smoothstep(
                        0.08,
                        0.44,
                        state.currentScroll
                    );

                const mineralProgress =
                    smoothstep(
                        0.26,
                        0.62,
                        state.currentScroll
                    );

                const volcanoProgress =
                    smoothstep(
                        0.40,
                        0.78,
                        state.currentScroll
                    );

                state.root.style.setProperty(
                    "--earth-pointer-x",
                    state.currentPointerX.toFixed(4)
                );

                state.root.style.setProperty(
                    "--earth-pointer-y",
                    state.currentPointerY.toFixed(4)
                );

                state.root.style.setProperty(
                    "--earth-scroll-progress",
                    state.currentScroll.toFixed(4)
                );

                state.root.style.setProperty(
                    "--earth-atmosphere-progress",
                    atmosphereProgress.toFixed(4)
                );

                state.root.style.setProperty(
                    "--earth-geology-progress",
                    geologyProgress.toFixed(4)
                );

                state.root.style.setProperty(
                    "--earth-mineral-progress",
                    mineralProgress.toFixed(4)
                );

                state.root.style.setProperty(
                    "--earth-volcano-progress",
                    volcanoProgress.toFixed(4)
                );

                state.animationFrame =
                    window.requestAnimationFrame(
                        update
                    );

            };

        state.animationFrame =
            window.requestAnimationFrame(
                update
            );

    }


    function stopAnimationLoop(){

        if(!state.animationFrame){
            return;
        }

        window.cancelAnimationFrame(
            state.animationFrame
        );

        state.animationFrame = null;

    }


    /* ==================================================
       CLEANUP
    ================================================== */

    function cleanup(){

        clearWeatherTimer();

        clearLightningTimer();

        stopAnimationLoop();

        removeListeners();

        window.clearTimeout(
            state.resizeTimer
        );

        const existing =
            document.getElementById(
                "earth-science-atmosphere"
            );

        if(existing){

            existing.remove();

        }

        document.body.classList.remove(
            "has-earth-science-atmosphere"
        );

        if(
            document.body.dataset.atmosphere ===
            "earth-science"
        ){

            delete document.body.dataset.atmosphere;

        }

        state.root = null;

        state.layers = {};

        state.currentWeather =
            "clear";

        state.targetPointerX = 0;

        state.targetPointerY = 0;

        state.currentPointerX = 0;

        state.currentPointerY = 0;

        state.targetScroll = 0;

        state.currentScroll = 0;

    }


    function clearWeatherTimer(){

        if(!state.weatherTimer){
            return;
        }

        window.clearTimeout(
            state.weatherTimer
        );

        state.weatherTimer = null;

    }


    function clearLightningTimer(){

        if(!state.lightningTimer){
            return;
        }

        window.clearTimeout(
            state.lightningTimer
        );

        state.lightningTimer = null;

    }


    /* ==================================================
       UTILITIES
    ================================================== */

    function random(
        minimum,
        maximum,
        decimals = 0
    ){

        const value =
            Math.random() *
            (
                maximum -
                minimum
            ) +
            minimum;

        return Number(
            value.toFixed(
                decimals
            )
        );

    }


    function randomItem(items){

        return items[
            Math.floor(
                Math.random() *
                items.length
            )
        ];

    }


    function lerp(
        start,
        end,
        amount
    ){

        return start +
            (
                end -
                start
            ) *
            amount;

    }


    function clamp(
        value,
        minimum,
        maximum
    ){

        return Math.min(
            Math.max(
                value,
                minimum
            ),
            maximum
        );

    }


    function smoothstep(
        minimum,
        maximum,
        value
    ){

        const normalized =
            clamp(
                (
                    value -
                    minimum
                ) /
                (
                    maximum -
                    minimum
                ),
                0,
                1
            );

        return normalized *
            normalized *
            (
                3 -
                2 *
                normalized
            );

    }


    /* ==================================================
       REGISTER
    ================================================== */

    window.FutureReadyExplore =
        window.FutureReadyExplore || {};

    if(
        !window.FutureReadyExplore
            .AtmosphereEngine
    ){

        console.error(
            "Future Ready Explore: atmosphere-engine.js must load before earth-science.js."
        );

        return;

    }

    window.FutureReadyExplore
        .AtmosphereEngine
        .register(
            "earth-science",
            EarthScienceAtmosphere
        );

})();