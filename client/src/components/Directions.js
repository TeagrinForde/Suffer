import React from "react";

export default function Directions() {
  const message =
    "Shoot the invading code icons with your laser while avoiding their shots and preventing an ERROR! The more icons you destroy, the higher your score. Move your ship left and right by pressing the left and right arrow keys on your keyboard. Shoot your laser by pressing the space bar. There is no limit to the amount of lasers you can shoot, just make sure to shoot them all before they reach the bottom of the screen, or the game will end.";

  return (
    <div className="container" id='directions'>
      <h6>{message}</h6>
    </div>
  );
}
