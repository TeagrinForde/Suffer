import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import { GENERATE_CHARACTER } from "../utils/mutations"; Add mutation

const characterArray = [
    require('../img/batGirl.png'),
    require('../img/blondeBoi.png'),
    require('../img/blondeGirl.png'),
    require('../img/blueBoi.png'),
    require('../img/blueGirl.png'),
    require('../img/brownGirl.png'),
    require('../img/caliGirl.png'),
    require('../img/darkBoi.png'),
    require('../img/greenBoi.png'),
    require('../img/greenGirl.png'),
    require('../img/longBoi.png'),
    require('../img/merBoi.png'),
    require('../img/mermaid.png'),
    require('../img/pinkBoi.png'),
    require('../img/pinkGirl.png'),
    require('../img/punk.png'),
    require('../img/punkBoi.png'),
    require('../img/purpleBoi.png'),
    require('../img/purpleGirl.png'),
    require('../img/scorpionGirl.png'),
    require('../img/short.png'),
];

//set function to assign a character image array and run when SignUp button is clicked 

