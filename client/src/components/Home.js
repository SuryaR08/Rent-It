import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../services/propertyService';
import '../home.css';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const properties = await getAllProperties();
                setProperties(properties);
                setFilteredProperties(properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = properties.filter(property =>
            property.title.toLowerCase().includes(term.toLowerCase()) ||
            property.location.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProperties(filtered);
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Available Properties</h1>
                <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </header>
            <div className="property-list">
                {filteredProperties.map(property => (
                    <div key={property.id} className="property-card">
                        <img src={`http://localhost:5000/uploads/${property.image}`} alt="Property" className="property-image" />
                        <div className="property-details">
                            <h2>{property.title}</h2>
                            <p>{property.description}</p>
                            <p><strong>Location:</strong> {property.location}</p>
                            <p><strong>Price:</strong> ${property.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
