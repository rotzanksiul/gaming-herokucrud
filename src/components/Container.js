import Home from './Home';
import Create from './Create';
import Games from './Games'


import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Container.css'


const Container = () => {
    return (
        <div className="container">
            <Router>
            <Link to={'/'} className='home-button neon-button-form'>Home</Link>
                <Routes>
                    <Route  path="/" element={<Home></Home>}></Route>
                    <Route  path="/create" element={<Create></Create>}></Route>
                    <Route  path="/games" element={<Games></Games>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default Container;