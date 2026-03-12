import React,{ createContext, useState } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { getTransactions, deleteTransaction } from "../services/transactions";
import { type ITransacao } from "../components/Tabela";

interface IResumo {
    entradas: number;
    saidas: number;
    total: number;
}

interface IFinanceContextData {
    transacoesFiltradas: ITransacao[];
    transacoesCompletas: ITransacao[];
    resumoDados: IResumo;
    paginaAtual: number;
    totalPaginas: number;
    filtro: string;
    setFiltro: (filtro: string) => void;
    carregarDados: (pagina?: number) => Promise<void>;
    handleDeleteTransacao: (id: number) => Promise<void>;
}

export 





const FinanceContext = createContext<IFinanceContextData>({} as IFinanceContextData);

export const FinanceProvider = ({children}: {children: React.ReactNode}) => {
    const [transacoesCompletas, setTransacoesCompletas] = useState<ITransacao[]>([]);
        const [paginaAtual, setPaginaAtual] = useState(1);
        const [totalPaginas, setTotalPaginas] = useState(1);
        const [filtro, setFiltro] = useState('');
        const [resumoDados, setResumoDados] = useState<IResumo>({ entradas: 0, saidas: 0, total: 0 });
    
        // calculo do resumo global
        const buscarResumoGlobal = useCallback(async () => {
            try {
                const resposta = await getTransactions(1, 10000);
                const listaCompleta = resposta.transacoes || [];
    
                const entradas = listaCompleta
                    .filter((t: ITransacao) => t.tipo === 'entrada')
                    .reduce((acc: number, t: ITransacao) => acc + (Number(t.valor) || 0), 0);
    
                const saidas = listaCompleta
                    .filter((t: ITransacao) => t.tipo === 'saida')
                    .reduce((acc: number, t: ITransacao) => acc + (Number(t.valor) || 0), 0);
    
                setResumoDados({ entradas, saidas, total: entradas - saidas });
            } catch (error) {
                console.error("Erro ao calcular resumo:", error);
            }
        }, []);
    
        // Função principal de carregamento por página
        const carregarDados = useCallback(async (pagina = 1) => {
            try {
                const resposta = await getTransactions(pagina, 10);
                const lista = resposta.transacoes || [];
                const listaOrdenada = lista.sort((a: ITransacao, b: ITransacao) => b.id - a.id);
                
                setTransacoesCompletas(listaOrdenada);
                if (resposta.paginacao) {
                    setTotalPaginas(resposta.paginacao.totalPaginas);
                }
                setPaginaAtual(pagina);
                await buscarResumoGlobal();
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }, [buscarResumoGlobal]);
    
        // Carga inicial
        useEffect(() => {
            carregarDados(1);
        }, [carregarDados]);
    
        //deletar transação
        const handleDeleteTransacao = async (id: number) => {
            if (window.confirm("Tem certeza que deseja deletar esta transação?")) {
                try {
                    await deleteTransaction(id);
                    // lógica para voltar página se apagar o último item da página atual
                    const novaPagina = (transacoesCompletas.length === 1 && paginaAtual > 1) 
                        ? paginaAtual - 1 
                        : paginaAtual;
                    carregarDados(novaPagina);
                } catch (error) {
                    alert("Erro ao deletar a transação.");
                }
            }
        };
    
        //filtro local na tabela 
        const transacoesFiltradas = useMemo(() => {
            if (!filtro) return transacoesCompletas;
            const filtroLower = filtro.toLowerCase();
            return transacoesCompletas.filter(t =>
                (t.nome || '').toLowerCase().includes(filtroLower) ||
                (t.categoria || '').toLowerCase().includes(filtroLower)
            );
        }, [transacoesCompletas, filtro]);
    
        return (
            <FinanceContext.Provider value={{
                transacoesFiltradas,
                transacoesCompletas,
                resumoDados,
                paginaAtual,
                totalPaginas,
                filtro,
                setFiltro,
                carregarDados,
                handleDeleteTransacao
            }}
            >
                {children}
            </FinanceContext.Provider>
        )
}