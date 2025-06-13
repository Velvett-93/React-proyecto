import axios from 'axios';

// Si estás en localhost con Expo usa tu IP: ej. 192.168.x.x
const API_URL = 'http://TU_IP_LOCAL:3000'; // o Replit/Glitch si lo subes

export const registerUser = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/register`, { email, password });
        return res.data;
    } catch (err) {
        throw err.response.data;
    }
};

export const loginUser = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { email, password });
        return res.data;
    } catch (err) {
        throw err.response.data;
    }
};
