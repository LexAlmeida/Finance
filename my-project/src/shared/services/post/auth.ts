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
interface RefreshTokenResponse {
    token: string;
}

// Função que envia o login (POST)
export const loginService = async (login: string, senha: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/login', {
        login: login,
        senha: senha
    });
    return response.data;
};

//Funcao que renova o token
export const refreshToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem('APP_REFRESH_TOKEN');
    const {data} = await api.post<RefreshTokenResponse>('/api/refresh-token', {refreshToken: refreshToken});
    console.log("Novo token recebido:", data.token);
    return data.token
}