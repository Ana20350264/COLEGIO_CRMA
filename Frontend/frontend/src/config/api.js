const BASE_URL = 'http://192.168.0.20:3001'; // URL base del backend

// Función genérica para realizar peticiones a la API
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            // Manejo de errores de respuesta HTTP
            const error = await response.json();
            throw new Error(error.message || 'Error en la solicitud');
        }
        return response.json(); // Devuelve el JSON si la respuesta es exitosa
    } catch (error) {
        console.error(`Error en la solicitud a ${endpoint}:`, error.message);
        throw error; // Reenvía el error para que pueda manejarse donde se use
    }
};

// Funciones específicas para las APIs
export const getUsuarios = async () => {
    return apiRequest('/api/usuarios'); // Llama a la función genérica
};

export const addUsuario = async (usuario) => {
    return apiRequest('/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    });
};

export const deleteUsuario = async (id) => {
    return apiRequest(`/api/usuarios/${id}`, {
        method: 'DELETE',
    });
};

// Ejemplo para obtener datos protegidos con un token
export const getProtectedData = async (token) => {
    return apiRequest('/home', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
