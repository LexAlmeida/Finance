import { api } from "../api";

// Interface para organizar o que a API devolve
interface LoginResponse {
    id: number;
    nome: string;
    token: string;
}

// Função que envia o login (POST)
export const loginService = async (login: string, senha: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/login', {
        login,
        senha
    });
    return response.data;
};