import axios from 'axios';

// Si estás en localhost con Expo usa tu IP: ej. 192.168.x.x
const API_URL = 'http://172.28.12.135:1337/api'; // o Replit/Glitch si lo subes



export const registerUser = async (username, email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/local/register`, { username, email, password });
        return res.data;
    } catch (err) {
        console.error('Error en registro:', err.response?.data || err.message);
        throw new Error(
            err?.response?.data?.error?.message || 'Error de red o servidor'
        );
    }
};


export const loginUser = async (identifier, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/local`, { identifier, password });
        return res.data;
    } catch (err) {
        // Manejo seguro del error
        throw (
            err?.response?.data?.message ||
            err?.message ||
            'Error de red o servidor'
        );
    }
};

export const getUserWithRole = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users/me?populate=role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener el usuario con rol:', error);
    }
};

export const createInventarioItem = async (itemData) => {
    try {
        const res = await axios.post(`${API_URL}/inventarios`, {
            data: itemData
        });
        return res.data;
    } catch (err) {
        console.error('Error al crear inventario:', err.response?.data || err.message);
        throw new Error('No se pudo guardar el inventario');
    }
};