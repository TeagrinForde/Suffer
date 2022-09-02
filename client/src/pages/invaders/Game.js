import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';

import Player from './parts/Player.js'

function Invaders() {
    const [position, setPosition] = useState(44.22);
    const speed = useRef(0)
    const shotFired = useRef(false);
    const intervalRef = useRef(null);

    function handleKeyDown({ key }) {

        switch(key) {
            case 'a':
                speed.current = -1;
                startMoving();
                break;
            case 'd':
                speed.current = 1;
                startMoving();
                break;
            case ' ':
                if (!shotFired.current) {
                    shotFired.current = true;
                    // insert control to shoot
                    console.log('shot fired');
                }
                break;
            default:
                break;
        }
    }

    function handleKeyUp({ key }) {
        switch(key) {
            case 'a':
                stopMoving();
                break;
            case 'd':
                stopMoving();
                break;
            case ' ':
                if (shotFired.current) {
                    shotFired.current = false;
                }
                break;
            default:
                break;
        }
    }

    function startMoving() {
        const leftBound = 3.22;
        const rightBound = 84.22;

        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            if (speed.current > 0) setPosition(prevPosition => {
                if (prevPosition <= rightBound) {
                    return prevPosition + 1;
                };
                return 85.22;
            });
            if (speed.current < 0) setPosition(prevPosition => {
                if (prevPosition >= leftBound) {
                    return prevPosition - 1;
                };
                return 3.219999999999999;
            });
        }, 10);
    };

    function stopMoving() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return (
    <div id="wholeScreen" tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
        <p id='scoreBoard'>
            <span>Score:</span> <span id="scoreEl">0</span> 
        </p>
        <div id="gameScreen">
            <Player position={position}/>
        </div>
        <a href="https://dubsumm.github.io/space-invaders-game/"
        style={{color: 'black', fontSize: '8rem'}}>HTML</a>
            
    </div>
    )
}

export default Invaders;