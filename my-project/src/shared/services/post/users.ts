import { api } from "../api";

export const cadastrarUsuario = async (login: string, senha: string) => {
    const response = await api.post('/api/criar-conta', {
        login,
        senha
    });
    return response.data;
};