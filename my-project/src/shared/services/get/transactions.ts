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

export const getTransactions = async (): Promise<APIResponse> => {
  const response = await api.get<APIResponse>('/api/transacoes');
  return response.data;
}