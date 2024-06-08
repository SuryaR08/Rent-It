import axios from 'axios';

const API_URL = 'http://localhost:5000/properties';

export const getAllProperties = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

export const addProperty = async (property, token) => {
    try {
        const response = await axios.post(API_URL, property, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding property:', error);
        throw error;
    }
};

export const getUserProperties = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user properties:', error);
        throw error;
    }
};

export const deleteProperty = async (propertyId, token) => {
    try {
        await axios.delete(`${API_URL}/${propertyId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
};


export const getPropertyById = async (propertyId) => {
    try {
        const response = await axios.get(`${API_URL}/${propertyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        throw error;
    }
};
