/*
==========================================================
 FUTURE READY
 Sky Engine
 Version 2.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".community-hero");

    if (!hero) {

        console.warn("Sky Engine: Hero not found.");

        return;

    }

    //------------------------------------------------------
    // Canvas
    //------------------------------------------------------

    const canvas = document.createElement("canvas");

    canvas.className = "sky-canvas";

    hero.prepend(canvas);

    const ctx = canvas.getContext("2d");

    //------------------------------------------------------
    // Engine Settings
    //------------------------------------------------------

    const SKY = {

        starCount: 140,

        nearStars: 18,

        mediumStars: 42,

        farStars: 80,

        maxFPS: 60,

        pixelRatio: Math.min(window.devicePixelRatio,2)

    };

    //------------------------------------------------------
    // Globals
    //------------------------------------------------------

    let width = 0;

    let height = 0;

    let animationFrame;

    const stars = [];

    //------------------------------------------------------
    // Resize
    //------------------------------------------------------

    function resize(){

        width = hero.clientWidth;

        height = hero.clientHeight;

        canvas.width = width * SKY.pixelRatio;

        canvas.height = height * SKY.pixelRatio;

        canvas.style.width = width + "px";

        canvas.style.height = height + "px";

        ctx.setTransform(

            SKY.pixelRatio,

            0,

            0,

            SKY.pixelRatio,

            0,

            0

        );

    }

    resize();

    window.addEventListener("resize",resize);

    //------------------------------------------------------
    // Utilities
    //------------------------------------------------------

    function random(min,max){

        return Math.random()*(max-min)+min;

    }

    function randomInt(min,max){

        return Math.floor(random(min,max+1));

    }

    function clamp(value,min,max){

        return Math.max(min,Math.min(max,value));

    }

    function lerp(a,b,t){

        return a+(b-a)*t;

    }

    function chance(percent){

        return Math.random()<percent;

    }

        //------------------------------------------------------
    // Star Class
    //------------------------------------------------------

    class Star{

        constructor(layer){

            this.layer = layer;

            this.reset();

        }

        reset(){

            this.x = random(0,width);

            this.y = random(0,height);

            switch(this.layer){

                // Far stars

                case 0:

                    this.radius = random(.35,.9);

                    this.alpha = random(.15,.45);

                    break;

                // Medium stars

                case 1:

                    this.radius = random(.8,1.8);

                    this.alpha = random(.35,.75);

                    break;

                // Near stars

                default:

                    this.radius = random(1.4,2.8);

                    this.alpha = random(.75,1);

            }

            this.baseAlpha = this.alpha;

            this.twinkleSpeed = random(.004,.02);

            this.twinkleOffset = random(0,Math.PI*2);

            this.color = chance(.82)

                ? "255,255,255"

                : chance(.5)

                    ? "205,225,255"

                    : "255,240,220";

        }

        update(time){

            this.alpha =

                this.baseAlpha +

                Math.sin(

                    time *

                    this.twinkleSpeed +

                    this.twinkleOffset

                ) * .18;

            this.alpha = clamp(

                this.alpha,

                .05,

                1

            );

        }

        draw(){

            ctx.beginPath();

            ctx.fillStyle =

                `rgba(${this.color},${this.alpha})`;

            ctx.arc(

                this.x,

                this.y,

                this.radius,

                0,

                Math.PI*2

            );

            ctx.fill();

            if(this.layer===2){

    ctx.save();

    ctx.shadowBlur = 18;

    ctx.shadowColor =
        `rgba(${this.color},${this.alpha})`;

    ctx.beginPath();

    ctx.fillStyle =
        `rgba(${this.color},${this.alpha})`;

    ctx.arc(

        this.x,

        this.y,

        this.radius,

        0,

        Math.PI*2

    );

    ctx.fill();

    ctx.restore();

}

        }

    }

    //------------------------------------------------------
    // Build Star Field
    //------------------------------------------------------

    for(let i=0;i<SKY.farStars;i++){

        stars.push(

            new Star(0)

        );

    }

    for(let i=0;i<SKY.mediumStars;i++){

        stars.push(

            new Star(1)

        );

    }

    for(let i=0;i<SKY.nearStars;i++){

        stars.push(

            new Star(2)

        );

    }

     //------------------------------------------------------
    // Render Loop
    //------------------------------------------------------

    let lastTime = 0;

    function render(time){

        animationFrame = requestAnimationFrame(render);

        // Clear canvas

        ctx.clearRect(

            0,

            0,

            width,

            height

        );

        // Draw every star

        for(const star of stars){

            star.update(time);

            star.draw();

        }

        lastTime = time;

    }

    //------------------------------------------------------
    // Start Engine
    //------------------------------------------------------

    render(0);

});   