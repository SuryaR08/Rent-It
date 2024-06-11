import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById, addToFavorites } from '../services/propertyService';
import '../propertydetails.css';

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const property = await getPropertyById(id);
                setProperty(property);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };
        fetchProperty();
    }, [id]);

    const handleAddToFavorites = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await addToFavorites(property.id, token);
            console.log('Property added to favorites');
        } catch (error) {
            console.error('Error adding property to favorites:', error);
        }
    };

    if (!property) {
        return <p>Loading...</p>;
    }

    return (
        <div className="property-detail">
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            {property.image && <img src={`http://localhost:5000/uploads/${property.image}`} alt="Property" />}
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
    );
};

export default PropertyDetail;
