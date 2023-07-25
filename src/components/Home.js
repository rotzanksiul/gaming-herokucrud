
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    return (
    <div className="home">
        <div className="home-container">
            <h2 className='home-title headtext blink blue-neon'>ADD YOUR FAVORITE</h2>
            <h2 className='home-title headtext blink blue-neon'>GAMES</h2>
            <div className="home-buttons">
                <Link to={'/create'} className='add-button neon-button-green'>ADD GAME</Link>
                <Link to={'/games'} className='games-button neon-button-green'>GAMES</Link>
            </div>
        </div>
    </div>
    );
}

export default Home;