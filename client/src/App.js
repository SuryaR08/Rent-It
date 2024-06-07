import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddProperty from './components/AddProperty';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setUser({ token: storedToken });
        }
    }, []);

    const handleLogin = (token) => {
        setUser({ token });
        sessionStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                {user && <Route path="/add-property" element={<AddProperty token={user.token} />} />}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
