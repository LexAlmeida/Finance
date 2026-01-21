import {api} from "../api";

export interface Transaction {
  id: number;
  nome: string;
  valor: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
  data: string;
}

interface APIResponse {
  transacoes: Transaction[];
  paginacao: any;
}

export const getTransactions = async (page: number = 1, limit: number = 10): Promise<APIResponse> => {
  const response = await api.get<APIResponse>(`/api/transacoes`, { params: { page, limit } });
  return response.data;
}