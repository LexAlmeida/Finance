import {api} from "../api";
import { type Transaction } from "../get/transactions";

export interface NewTransaction {
  nome: string;
  valor: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
}

export const createTransaction = async (data: NewTransaction): Promise<Transaction>=> {
  const response = await api.post<Transaction>('/api/transacoes', data);
  return response.data;
}