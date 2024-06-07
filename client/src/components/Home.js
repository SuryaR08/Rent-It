import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../services/propertyService';

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const properties = await getAllProperties();
            setProperties(properties);
        };
        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Available Properties</h1>
            <ul>
                {properties.map(property => (
                    <li key={property.id}>
                        <h2>{property.title}</h2>
                        <p>{property.description}</p>
                        <p>Location: {property.location}</p>
                        <p>Price: ${property.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
