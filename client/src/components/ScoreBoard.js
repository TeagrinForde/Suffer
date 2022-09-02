const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board p-5">
      <h2 className="text-white">Score: {score}</h2>
    </div>
  )
}

export default ScoreBoard