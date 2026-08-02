/*
==========================================================
 FUTURE READY EXPLORE
 Atmosphere Engine
 Version 1.0.0
==========================================================
*/

(function(){

"use strict";

const registry = {};

function register(id, atmosphere){

    registry[id] = atmosphere;

}

function initialize(world){

    if(!world){
        return;
    }

    const atmosphere =
        registry[world.id];

    if(!atmosphere){
        return;
    }

    if(typeof atmosphere.initialize === "function"){

        atmosphere.initialize(world);

    }

}

window.FutureReadyExplore =
    window.FutureReadyExplore || {};

window.FutureReadyExplore.AtmosphereEngine = {

    register,

    initialize

};

})();