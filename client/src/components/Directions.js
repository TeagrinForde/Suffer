import React from "react";

export default function Directions() {
  const message =
    "Maneuver the on-screen paddle so that it remains beneath the ball as it approaches the bottom of the screen. When the ball hits the paddle, it will bounce back up to the top of the screen. When the ball hits a brick, the brick is removed from the wall, and the ball will bounce back down to the bottom. Points are awarded for each brick removed, as described in the scoring section above. If you manage to completely remove one wall, it will be replaced by a second wall after the ball is hit by the paddle. You will start with five hearts and will lose a heart each time the ball gets past your bar at the bottom of the screen. Once you are out of hearts, the game is over. Good luck!";

  return (
    <div className="container p-3" id='directions'>
      <p>{message}</p>
    </div>
  );
}
