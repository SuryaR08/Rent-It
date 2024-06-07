import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../services/propertyService';
import '../addproperty.css';

const AddProperty = ({ token }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        image: null, // Store selected image file
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] }); // Store selected image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, location, price, image } = formData;
        try {
            const propertyData = new FormData();
            propertyData.append('title', title);
            propertyData.append('description', description);
            propertyData.append('location', location);
            propertyData.append('price', price);
            propertyData.append('image', image); // Append image file to FormData
            await addProperty(propertyData, token);
            alert('Property added successfully');
            navigate('/'); // Redirect to home page after successful property addition
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Error adding property');
        }
    };

    return (
        <div className="add-property-container">
            <form onSubmit={handleSubmit} className="add-property-form">
                <h1>Add New Property</h1>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
