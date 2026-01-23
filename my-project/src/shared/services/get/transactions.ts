import {api} from "../api";

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

interface APIResponse {
  transacoes: Transaction[];
  paginacao: PaginacaoMetaData;
}

export const getTransactions = async (page: number = 1, limit: number = 10): Promise<APIResponse> => {
  const response = await api.get<APIResponse>(`/api/transacoes`, {
    params: { 
      pagina: page, limite: limit } });
  return response.data;
}