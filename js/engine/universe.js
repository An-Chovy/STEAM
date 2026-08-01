/*
==========================================================
 FUTURE READY EXPERIENCE ENGINE V2
 Shared Universe

 One universe powers every section on the page.
 Each section sees a different region of the same sky.
==========================================================
*/

(() => {

    "use strict";

    // ==================================================
    // UTILITIES
    // ==================================================

    function clamp(value, minimum, maximum){

        return Math.max(
            minimum,
            Math.min(maximum, value)
        );

    }

    // ==================================================
    // SEEDED RANDOM GENERATOR
    //
    // A single seed keeps every section visually related.
    // ==================================================

    class SeededRandom{

        constructor(seed){

            this.seed =
                Math.max(
                    1,
                    Math.floor(seed) % 2147483647
                );

            this.state =
                this.seed;

        }

        next(){

            this.state =
                this.state * 16807 %
                2147483647;

            return (
                this.state - 1
            ) / 2147483646;

        }

        range(minimum, maximum){

            return (
                minimum +
                this.next() *
                (maximum - minimum)
            );

        }

        chance(probability){

            return (
                this.next() <
                probability
            );

        }

        choose(items){

            return items[
                Math.floor(
                    this.next() *
                    items.length
                )
            ];

        }

        fork(offset){

            const childSeed =
                (
                    this.seed +
                    Math.floor(offset)
                ) %
                2147483647;

            return new SeededRandom(
                Math.max(1, childSeed)
            );

        }

    }

    // ==================================================
    // SHARED UNIVERSE
    // ==================================================

    class FutureReadyUniverse{

        constructor(){

            this.seed =
                Math.floor(
                    Math.random() *
                    2147483646
                ) + 1;

            this.random =
                new SeededRandom(
                    this.seed
                );

            this.startTime =
                performance.now();

            this.buildPersonality();

        }

        // Creates one visual personality per page load.
        buildPersonality(){

            this.mood =
                this.random.choose([
                    "calm",
                    "deep",
                    "crystal",
                    "brilliant",
                    "energetic",
                    "dream"
                ]);

            this.density =
                this.random.range(
                    .78,
                    1.24
                );

            this.warmth =
                this.random.range(
                    -.75,
                    .75
                );

            this.activity =
                this.random.range(
                    .35,
                    1
                );

            this.atmosphere =
                this.random.range(
                    .4,
                    1
                );

            this.driftStrength =
                this.random.range(
                    .45,
                    1
                );

            this.twinkleStrength =
                this.random.range(
                    .55,
                    1.15
                );

            this.meteorFrequency =
                this.random.range(
                    .7,
                    1.35
                );

            this.heroStarFrequency =
                this.random.range(
                    .004,
                    .012
                );

            this.applyMood();

        }

        applyMood(){

            switch(this.mood){

                case "calm":

                    this.activity *= .58;
                    this.atmosphere *= .82;
                    this.meteorFrequency *= .62;

                break;

                case "deep":

                    this.density *= 1.12;
                    this.warmth -= .22;
                    this.atmosphere *= 1.15;

                break;

                case "crystal":

                    this.warmth -= .42;
                    this.twinkleStrength *= 1.12;
                    this.atmosphere *= .72;

                break;

                case "brilliant":

                    this.density *= 1.08;
                    this.twinkleStrength *= 1.22;
                    this.heroStarFrequency *= 1.4;

                break;

                case "energetic":

                    this.activity *= 1.35;
                    this.meteorFrequency *= 1.5;

                break;

                case "dream":

                    this.atmosphere *= 1.28;
                    this.driftStrength *= 1.18;
                    this.activity *= .82;

                break;

            }

            this.density =
                clamp(
                    this.density,
                    .58,
                    1.45
                );

            this.warmth =
                clamp(
                    this.warmth,
                    -1,
                    1
                );

            this.activity =
                clamp(
                    this.activity,
                    .18,
                    1.5
                );

            this.atmosphere =
                clamp(
                    this.atmosphere,
                    .2,
                    1.5
                );

            this.driftStrength =
                clamp(
                    this.driftStrength,
                    .25,
                    1.5
                );

        }

        // Returns shared elapsed time in seconds.
        getTime(){

            return (
                performance.now() -
                this.startTime
            ) / 1000;

        }

        // Each section receives a stable random stream.
        getSectionRandom(sectionIndex){

            const offset =
                (
                    sectionIndex + 1
                ) *
                100003;

            return this.random.fork(
                offset
            );

        }

        // Converts a section into its position in the world.
        getSectionOffset(sectionIndex){

            return {
                x: 0,
                y:
                    sectionIndex *
                    2400
            };

        }

    }

    // ==================================================
    // GLOBAL EXPORT
    // ==================================================

    window.FutureReadyV2 =
        window.FutureReadyV2 || {};

    window.FutureReadyV2.SeededRandom =
        SeededRandom;

    window.FutureReadyV2.Universe =
        FutureReadyUniverse;

    window.FutureReadyV2.clamp =
        clamp;

})();