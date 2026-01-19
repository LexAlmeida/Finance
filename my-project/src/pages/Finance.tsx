import { useEffect, useState, useMemo, useCallback } from "react";
import { Stack, Typography } from "@mui/material";
// Importações de componentes
import { Cards } from "../shared/components/Cards/Cards";
import { BoxPrincipal } from "../shared/components/Box/Box";
import { Search } from "../shared/components/Inputs/Search";
import { TabelaTransacoes } from "../shared/components/Tabela/Tabela";
// Importações de utilitários (para usar no componente)
import { ITransacao } from "../shared/components/Tabela/Tabela"; // Reutilizando a interface
import { NovaTransacao } from "../shared/components/Dialog/NovaTransacao";
import SavingsIcon from '@mui/icons-material/Savings';

// Funções utilitárias (Replicando o que você tem em Tabela/NovaTransacao)
const getLocalStorageData = (key: string): ITransacao[] => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) as ITransacao[] : [];
}

export const Finance = () => {
    const [transacoesCompletas, setTransacoesCompletas] = useState<ITransacao[]>([]);
    const [filtro, setFiltro] = useState(''); // Estado para o campo de busca

    // Função que busca todos os dados do LocalStorage e os une
    const carregarTransacoes = useCallback(() => {
        const entradas = getLocalStorageData('app-entradas');
        const saidas = getLocalStorageData('app-saidas');

        // Crucial: Mapear saídas para ter preço negativo para o cálculo do TOTAL
        const saidasComSinal = saidas.map(t => ({ 
            ...t, 
            // Garante que o preco tenha sinal negativo
            preco: -Math.abs(t.preco) 
        }));
        
        // Unir e ordenar pela data/ID (mais recentes primeiro)
        const todasTransacoes = [...entradas, ...saidasComSinal].sort((a, b) => b.id - a.id); 

        setTransacoesCompletas(todasTransacoes);
    }, []);

    // EFEITO: Escuta o evento de atualização do Dialog
    useEffect(() => {
        carregarTransacoes(); // Carrega na montagem inicial
        
        const handleStorageUpdate = () => {
            carregarTransacoes(); // Recarrega os dados quando o evento é disparado
        };

        // Escuta o evento que o NovaTransacao dispara
        window.addEventListener('localStorageUpdate', handleStorageUpdate);
        return () => window.removeEventListener('localStorageUpdate', handleStorageUpdate);

    }, [carregarTransacoes]);


    // CÁLCULO: Cards de Resumo (Entrada, Saída, Total)
    const resumo = useMemo(() => {
        const entradas = transacoesCompletas
            .filter(t => t.preco > 0)
            .reduce((acc, t) => acc + t.preco, 0);

        const saidas = transacoesCompletas
            .filter(t => t.preco < 0)
            .reduce((acc, t) => acc + Math.abs(t.preco), 0); // Usamos Math.abs para ter o valor POSITIVO da Saída

        const total = entradas - saidas;

        return { entradas, saidas, total };
    }, [transacoesCompletas]);

    // CÁLCULO: Filtro de Busca
    const transacoesFiltradas = useMemo(() => {
        if (!filtro) return transacoesCompletas;
        
        const filtroLower = filtro.toLowerCase();
        return transacoesCompletas.filter(t => 
            t.descricao.toLowerCase().includes(filtroLower) ||
            t.categoria.toLowerCase().includes(filtroLower)
        );
    }, [transacoesCompletas, filtro]);


    return (
        // O BoxPrincipal agora precisa ser envolvido pelo Header (no DefaultLayout)
        <BoxPrincipal>
            {/* O Header do DefaultLayout já tem a Imagem e o Botão Nova Transacao (NewButton) */}
            
            {/* 1. Cards (Recebem o resumo calculado e são renderizados após o header) */}
            <Cards resumo={resumo} />

            {/* 2. Search (Recebe o estado e a função de atualização do filtro) */}
            <Search filtro={filtro} setFiltro={setFiltro} />

            {/* 3. Tabela (Recebe a lista de transações FILTRADAS) */}
            <TabelaTransacoes transacoes={transacoesFiltradas} />
            
        </BoxPrincipal>     
    )
}