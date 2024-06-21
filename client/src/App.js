import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Orders from './pages/Orders';
import './index.css';
import Images from './pages/Images';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';

const App = () => {
    return (
        <Router>
           
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/images" element={<Images/>} />
                <Route path="/signup" element={<SignupForm/>} />
                <Route path="/login" element={<LoginForm/>} />
           </Routes>
        </Router>
    );
};

export default App;
