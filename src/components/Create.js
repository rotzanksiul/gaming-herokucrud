
import { useNavigate } from 'react-router-dom'
import './Create.css'
import { useState } from 'react';
import Axios from 'axios'

const Create = () => {

    // helps to redirect to another page
    const navigate = useNavigate();

    //CREATE
    //To get the input text information
    const [game, setGame] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(0);
    const [platform, setPlatform] = useState('');
    //Error message
    const [showError, setShowError] = useState(false);

    const addGame = () => {

        //to show error message when there is not text content in the inputs
        if (!game || !genre || !year || !platform) {
            setShowError(true)
            return; // prevent the post request to be made
        }

        Axios.post('https://mysql-gameapp-f5c66260f1c0.herokuapp.com/create',
            {
                game: game,
                genre: genre,
                year: year,
                platform: platform
            })
            .then((result) => {
                console.log('added succesfully')
            }).catch((err) => {
                console.log('error mesagge' + err)
            });
        // To redirect to the Home page
        navigate("/");
    }

    return (
        <div className="create">
            <div className="create-container ">
                <h2 className="create-title headtext-h2">Add a Game</h2>
                <form className="create-form">
                    <label className='create-label headtext-label'>Game Name</label>
                    <input type="text" className='create-input ' onChange={(e) => {
                        setGame(e.target.value);
                        if (e.target.value.trim() !== '') { // This is to hide the error message when input is no empty
                            setShowError(false);
                        }
                    }} />
                    <label className='create-label headtext-label'>Genre</label>
                    <input type="text" className='create-input' onChange={(e) => {
                        setGenre(e.target.value);
                        if (e.target.value.trim() !== '') {
                            setShowError(false);
                        }
                    }} />
                    <label className='create-label headtext-label'>Year</label>
                    <input type="number" className='create-input' onChange={(e) => {
                        setYear(e.target.value);
                        if (e.target.value.trim() !== '') {
                            setShowError(false);
                        }
                    }} />
                    <label className='create-label headtext-label'>Platform</label>
                    <input type="text" className='create-input' onChange={(e) => {
                        setPlatform(e.target.value);
                        if (e.target.value.trim() !== '') {
                            setShowError(false);
                        }
                    }} />
                    {showError && (
                        <div className="error">Please fill all the fields</div> // Error message
                    )}
                    <button type='button' className='create-button neon-button-form' onClick={() => { addGame() }}>ADD</button>
                </form>
            </div>
        </div>
    );
}

export default Create;