import React, { useEffect, useRef } from "react";
import { BallMovement } from "../components/BallMovement";
import data from "../utils/data";
import WallCollision from "../utils/WallCollision";
import Paddle from "../components/Paddle";
import Brick from "../components/Brick";
import BrickCollision from "../utils/BrickCollision";
import PaddleHit from "../utils/PaddleHit";
import PlayerStats from "../components/PlayerStats";
import AllBroken from "../utils/AllBroke";
import ResetBall from "../utils/ResetBall";
import { useMutation } from '@apollo/client';
import { ADD_HIGHSCORE } from '../utils/mutations.js';

let bricks = [];
let { ballObj, paddleProps, brickObj, player } = data;

export default function Game() {
  const canvasRef = useRef(null);
  const [addHighscore, { error, data: scoreData }] = useMutation(ADD_HIGHSCORE);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      paddleProps.y = canvas.height - 30;

      // Assign Bricks
      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      PlayerStats(ctx, player, canvas);

      // Display Bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      // Handle Ball Movement
      BallMovement(ctx, ballObj);

      // Check all broken
      AllBroken(bricks, player, canvas, ballObj);

      if (player.lives === 0) {
        // save the score to the database
        renderEndScreen();
      }
      // Ball and Wall Collision
      WallCollision(ballObj, canvas, player, paddleProps);

      // Brick Collision
      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          player.score += 100;
        }
      }
      Paddle(ctx, canvas, paddleProps);

      // Paddle + Ball Collision
      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);
 
  async function saveScore() {
    const { data } = await addHighscore({
      variables: {...player}
    });
    console.log(data);
  }

  function renderEndScreen() {
    ballObj.dx = 0;
    ballObj.dy = 0;
    document.getElementById('canvas').classList.add('faded');
    document.getElementById('buttonHolder').setAttribute('style', 'display: inline');
  }

  function playAgain() {
  saveScore();
    console.log('again');
      //  reset the game
    data.brickObj.y = 50;
    player.lives = 5;
    player.level = 1;
    player.score = 0;
    ResetBall(ballObj, canvasRef.current, paddleProps);
    bricks.length = 0;
    document.getElementById('canvas').classList.remove('faded');
    document.getElementById('buttonHolder').setAttribute('style', 'display: none');
  }

  function stopPlaying() {
    saveScore();
    return document.location.pathname='/profile';
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="gameHeader">Suffer Game</h1>
        <div id="endScreen">
          <canvas
            id="canvas"
            ref={canvasRef}
            onMouseMove={(event) =>
              (paddleProps.x =
                event.clientX -
                (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) -
                paddleProps.width / 2 -
                10)
            }
            height="500"
            width={
              window.innerWidth < 900
                ? window.innerWidth - 20
                : window.innerWidth - (window.innerWidth * 20) / 100
            }
          />
          <div id='buttonHolder'>
            <button id="playAgain" onClick={playAgain}>Play Again</button>
            <button id="done" onClick={stopPlaying}>I'm Done</button>
          </div>
        </div>
    </div>
  );
}
