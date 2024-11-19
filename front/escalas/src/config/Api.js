import axios from 'axios';

const API_URL = 'http://localhost:8080/';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    console.log('Token:', token); 

    return {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };
};


const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        console.log('Token sendo enviado na requisição:', token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login'; 
            alert('Sessão expirada. Por favor, faça login novamente.');
        } else {
            console.error('Erro na requisição:', error);
        }
        return Promise.reject(error);
    }
);

export const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', credentials);

        if (response.status === 200) {
            const { token, role, idFuncionario } = response.data;

            console.log('Resposta da API:', response.data);

            if (token && idFuncionario) {
                const user = { token, role, idFuncionario };
                localStorage.setItem('user', JSON.stringify(user));

                console.log("ID do Funcionário armazenado:", idFuncionario);
            } else {
                console.log("Token ou ID do funcionário não encontrados na resposta da API.");
            }
            return response.data;
        } else {
            console.log("Erro na resposta da API", response.status);
        }
    } catch (error) {
        console.error("Erro no login:", error);
        throw error;
    }
};

export const getFuncionario = async (idFuncionario) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        throw new Error('Usuário não autenticado');
    }

    const token = user.token;

    if (!token) {
        throw new Error('Token não encontrado');
    }

    try {
        const response = await axios.get(`http://localhost:8080/api/funcionarios/${idFuncionario}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao carregar funcionário:', error);
        throw new Error('Erro ao carregar os dados do funcionário');
    }
};

export const getCaminhoes = async () => {
    try {
        return await axios.get(`${API_URL}caminhoes`, getAuthHeaders());
    } catch (error) {
        console.error('Erro ao obter caminhões:', error);
    }
};

export const getEscalas = async (idFuncionario) => {
    try {
        return await axios.get(`${API_URL}escalas/${idFuncionario}`, getAuthHeaders());
    } catch (error) {
        console.error('Erro ao obter escalas:', error);
    }
};

export const getEntregas = async (idFuncionario) => {
    try {
        return await axios.get(`${API_URL}entregas/${idFuncionario}`, getAuthHeaders());
    } catch (error) {
        console.error('Erro ao obter entregas:', error);
    }
};

export const getUsers = async () => {
    try {
        return await axios.get(`${API_URL}users`, getAuthHeaders());
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
    }
};

export const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }

        const response = await axios.get(`${API_URL}auth/verifyToken`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        throw error;
    }
};
