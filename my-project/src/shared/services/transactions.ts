import {api} from "./api";

export interface Transaction {
  id: number;
  nome: string;
  valor: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
  data: string;
}

export interface PaginacaoMetaData {
  paginaAtual: number;
  total: number;
  limite: number;
  totalPaginas: number;
  temProxima: boolean;
  temAnterior: boolean;
}

export interface ResumoTransacoes {
  entradas: number;
  saidas: number;
  total: number;
}

interface APIResponse {
  transacoes: Transaction[];
  paginacao: PaginacaoMetaData;
  resumo: ResumoTransacoes;
}

export interface NewTransaction {
  nome: string;
  valor: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
}

export const getTransactions = async (page: number = 1, limit: number = 10): Promise<APIResponse> => {
  const response = await api.get<APIResponse>(`/api/transacoes`, {
    params: { 
      pagina: page, limite: limit } });
  return response.data;
}

export const deleteTransaction = async (id: number): Promise<void> => {
    const response = await api.delete(`/api/transacoes/${id}`);
    return response.data;
}

export const createTransaction = async (data: NewTransaction): Promise<Transaction>=> {
  const response = await api.post<Transaction>('/api/transacoes', data);
  return response.data;
}