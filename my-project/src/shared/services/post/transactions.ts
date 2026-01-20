import {api} from "../api";
import { type Transaction } from "../get/transactions";

export interface NewTransaction {
  descricao: string;
  preco: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
}

export const createTransaction = async (data: NewTransaction): Promise<Transaction>=> {
  const response = await api.post<Transaction>('/api/transactions', data);
  return response.data;
}