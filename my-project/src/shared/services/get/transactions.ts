import {api} from "../api";

export interface Transaction {
  id: number;
  descricao: string;
  preco: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
  data: string;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>('/api/transacoes');
  return response.data;
}