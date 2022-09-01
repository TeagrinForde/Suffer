function ScoreRow({ position, score, name }) {
    return (
    <tr>
        <td>{position}</td>
        <td>{name}</td>
        <td>{score}</td>
    </tr>
    )
}

export default ScoreRow;
