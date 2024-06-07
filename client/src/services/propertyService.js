import axios from 'axios';

const API_URL = 'http://localhost:5000/properties';

export const getAllProperties = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error.response?.data || error.message);
        throw error;
    }
};

export const addProperty = async (property, token) => {
    try {
        const response = await axios.post(API_URL, property, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding property:', error.response?.data || error.message);
        throw error;
    }
};
