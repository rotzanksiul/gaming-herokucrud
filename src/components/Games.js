
import { useEffect, useState } from 'react';
import './Games.css'
import Axios from 'axios';



const Games = () => {

    const [toggleUpdate, setToggleUpdate] = useState(false); // to show the update form
    const [allGames, setAllGames] = useState([]);  
    const [loading, setLoading] = useState(true); // This is to track loading status

    //READ

    //get request to get the data
    const getGames = () => {
        Axios.get('https://mysql-gameapp-f5c66260f1c0.herokuapp.com/games')
            .then((response) => {
                setAllGames(response.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false) // in case for any error
            })
    }
    
    //to call get getGames when the page is rendered
    useEffect(() => {
        
        getGames();
    }, [])


    //UPDATE
    //Variables to update the data in the database
    const [game, setGame] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(0);
    const [platform, setPlatform] = useState('');
    //Error message 
    const [showError, setShowError] = useState(false);

    const updateGame = (id) => {
        //to show error message when there is not text content in the inputs
        if (!game || !genre || !year || !platform) {
            setShowError(true)
            return; // prevent the post request to be made
        }

        const updatedGame = {
            id: id,
            game: game,
            genre: genre,
            year: year,
            platform: platform
        };

        //update request
        Axios.put('https://mysql-gameapp-f5c66260f1c0.herokuapp.com/games', updatedGame)
            .then(() => {
                console.log('Game Updated')
                setShowError(false); // Hide the error message after successful update
                setToggleUpdate(false);
                // Update the allGames state with the new data 
                setAllGames((prevAllGames) =>
                    prevAllGames.map((oneGame) => oneGame.id === id ? updatedGame : oneGame)
                );
            })
            .catch((err) => {
                console.log(err)
            })

    }


    // Add state to track the text content for the currently selected game for update
    const [selectedGame, setSelectedGame] = useState(null);

    // Function to get the text content to the form inputs when a game is selected for update
    const handleUpdateButton = (game) => {

        setSelectedGame(game);
        setGame(game.game);
        setGenre(game.genre);
        setYear(game.year);
        setPlatform(game.platform);
        setToggleUpdate(true);

    }


    //DELETE
    const deleteGame = (id) =>{
        Axios.delete(`https://mysql-gameapp-f5c66260f1c0.herokuapp.com/games/${id}`)
        .then(()=>{
            setAllGames((prevAllGames) => prevAllGames.filter((game) => game.id !== id)); //filter the games after deleting the one that matches the id  
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    return (
        <div className="games">
            {loading ? (
                <div className='headtext-h2'>Loading...</div> //  loading indicator while fetching data
            ) : (
            <div className="games-container">
                <h2 className='games-container-title headtext-h2 blue-neon'>Games</h2>
                {/* Using the data */}
                {allGames.map((oneGame) => (
                    <div className="games-box" key={oneGame.id}>
                        <p className='p-base-game'>Game:<span className='p-base-data blue-neon'>{oneGame.game}</span></p>
                        <p className='p-base-game'>Genre:<span className='p-base-data blue-neon'>{oneGame.genre}</span></p>
                        <p className='p-base-game'>Year:<span className='p-base-data blue-neon'>{oneGame.year}</span></p>
                        <p className='p-base-game'>Platform:<span className='p-base-data blue-neon'>{oneGame.platform}</span></p>
                        <div className="games-box-buttons">
                            <button className='neon-button-pink' onClick={()=>{deleteGame(oneGame.id)}}>Erase</button>
                            <button className='neon-button-pink' onClick={() => {
                                handleUpdateButton(oneGame)
                            }}>Update</button>
                        </div>

                    </div>
                ))
                }
                {/* Update form */}
                {toggleUpdate && (
                    <div className="update-wrapper">
                        <div className="update-container">
                            <h2 className="update-title headtext-h2 blue-neon">Update Game</h2>
                            <form className="update-form">
                                <label className='update-label headtext-label'>Game Name</label>
                                <input type="text"
                                    className='update-input '
                                    value={game} // Set the text content in the value
                                    onChange={(e) => {
                                        setGame(e.target.value);
                                        if (e.target.value.trim() !== '') { // This is to hide the error message when input is no empty
                                            setShowError(false);
                                        }
                                    }} />
                                <label className='update-label headtext-label'>Genre</label>
                                <input type="text"
                                    className='update-input'
                                    value={genre} // 
                                    onChange={(e) => {
                                        setGenre(e.target.value);
                                        if (e.target.value.trim() !== '') {
                                            setShowError(false);
                                        }
                                    }} />
                                <label className='update-label headtext-label'>Year</label>
                                <input type="number"
                                    className='update-input'
                                    value={year}
                                    onChange={(e) => {
                                        setYear(e.target.value);
                                        if (e.target.value.trim() !== '') {
                                            setShowError(false);
                                        }
                                    }} />
                                <label className='update-label headtext-label'>Platform</label>
                                <input type="text"
                                    className='update-input'
                                    value={platform}
                                    onChange={(e) => {
                                        setPlatform(e.target.value);
                                        if (e.target.value.trim() !== '') {
                                            setShowError(false);
                                        }
                                    }} />
                                {showError && ( // show the error
                                    <div className="error">Please fill all the fields</div>
                                )}
                                <button className=' neon-button-form' type='button' onClick={() => { updateGame(selectedGame.id) }}>Apply</button>
                                <button className=' neon-button-form' onClick={() => { setToggleUpdate(false) }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div> )}
        </div>
    );
}

export default Games;