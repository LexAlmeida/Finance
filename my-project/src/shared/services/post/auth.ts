import { api } from "../api";

// Interface para organizar o que a API devolve
interface LoginResponse {
    mensagem: string;
    token: string;
    usuario: {
        id: number;
        login: string;
    };
    
}

// Função que envia o login (POST)
export const loginService = async (loginInput: string, senhaInput: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/login', {
        login: loginInput,
        senha: senhaInput
    });
    return response.data;
};