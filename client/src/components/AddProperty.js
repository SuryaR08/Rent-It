import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../services/propertyService';
import '../addproperty.css';

const AddProperty = ({ token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const property = {
                title,
                description,
                location,
                price: parseFloat(price)
            };
            await addProperty(property, token);
            navigate('/');
        } catch (error) {
            console.error('Error adding property:', error.response?.data || error.message);
            alert('Error adding property');
        }
    };

    return (
        <div className="add-property-container">
            <form className="add-property-form" onSubmit={handleSubmit}>
                <h2>Add Property</h2>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
