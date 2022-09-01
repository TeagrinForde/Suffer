import ship from '../../img/ship.png'
import '../../style/Player.css'

export default function Player({ position }) {

    return (
        <img id="ship" src={ship} alt="ship" style={{left: `${position}vh`}}/>
    )
}