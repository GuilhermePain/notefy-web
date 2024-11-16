import axios from 'axios';

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3000/users/signup/', {
            name,
            email,
            password
        });

        return response.data;
    } catch (error) {
        return "Erro ao tentar cadastrar-se."
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/signin', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error("Erro na autenticação. Tente novamente.");
            } else {
                throw new Error("Erro de conexão. Verifique sua internet.");
            }
        }
        throw new Error("Erro inesperado ao fazer login.");
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/forgot-password', {
            email
        });

        return response.data;
    } catch (error) {
        return "Erro ao enviar email. Tente novamente."
    }
}