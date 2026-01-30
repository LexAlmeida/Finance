import { api } from "../api";

// Interface para organizar o que a API devolve
interface LoginResponse {
    mensagem: string;
    token: string;
    refreshToken: string;
    usuario: {
        id: number;
        login: string;
    };   
}
interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
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
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const currentRefreshToken = localStorage.getItem('APP_REFRESH_TOKEN');
    if(!currentRefreshToken) throw new Error("Nenhum refresh token encontrado");
    
    const {data} = await api.post<RefreshTokenResponse>('/api/refresh-token', {refreshToken: currentRefreshToken});
    console.log("Novo token recebido:", data.token);
    return data;
}