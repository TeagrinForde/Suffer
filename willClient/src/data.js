export default {
  ballObj: {
    x: 20,
    y: 200,
    dx: 5,
    dy: 5,
    rad: 10,
    speed: 5,
  },
  brickObj: {
    x: 0.5,
    y: 50,
    height: 20,
    density: 2,
    colors: ["red", "blue"],
  },
  player: {
    name: "Will", //this is where we can insert username

    lives: 5,
    score: 0,
    level: 1,
  },
  paddleProps: {
    height: 20,
    width: 100,
    x: 100,
    color: "orange",
  },
};
