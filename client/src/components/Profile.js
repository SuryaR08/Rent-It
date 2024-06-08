import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile.css'; // Import the CSS file

const Profile = () => {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/users/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching user data:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchProperties = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/properties/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProperties(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching properties:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
        fetchProperties();
    }, []);

    const handleEdit = (propertyId) => {
        navigate(`/editproperty/${propertyId}`);
    };

    const handleDelete = async (propertyId) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/properties/${propertyId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Remove the deleted property from the state
                setProperties(properties.filter(property => property.id !== propertyId));
            } else {
                const errorData = await response.json();
                console.error('Error deleting property:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>My Properties</h1>
            </header>
            {user ? (
                <div className="user-details-card">
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            {properties.length > 0 ? (
                <div className="property-list">
                    {properties.map((property) => (
                        <div key={property.id} className="property-card">
                            <div className="property-details">
                                <h2>{property.title}</h2>
                                <p>{property.description}</p>
                                <p>{property.location}</p>
                                <p>${property.price}</p>
                                {property.image && <img src={`http://localhost:5000/uploads/${property.image}`} alt={property.title} className="property-image" />}
                            </div>
                            <div className="property-buttons">
                                <button onClick={() => handleEdit(property.id)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(property.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No properties found.</p>
            )}
        </div>
    );
};

export default Profile;
