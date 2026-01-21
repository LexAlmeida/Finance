import { useEffect, useState, useMemo, useCallback } from "react";
import { Stack, Pagination } from "@mui/material";
// Importações de componentes
import { Cards } from "../shared/components/Cards/Cards";
import { BoxPrincipal } from "../shared/components/Box/Box";
import { Search } from "../shared/components/Inputs/Search";
import { TabelaTransacoes } from "../shared/components/Tabela/Tabela";
// Importações de utilitários (para usar no componente)
import { type ITransacao } from "../shared/components/Tabela/Tabela"; // Reutilizando a interface
import { getTransactions } from "../shared/services/get/transactions";
import { deleteTransaction } from "../shared/services/delete/transactions";
import { Outlet } from "react-router-dom";

export const Finance = ({setCarregarTransacoes}: {setCarregarTransacoes: (fn: () => void) => void}) => {
    const [transacoesCompletas, setTransacoesCompletas] = useState<ITransacao[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [filtro, setFiltro] = useState(''); // Estado para o campo de busca
    const [carregando, setCarregando] = useState(true);

    // Função que busca dados da api
    const carregarTransacoes = useCallback(async (pagina = 1) => {
        try{
            setCarregando(true);

            const resposta = await getTransactions(pagina, 10); // página e limite

            const lista = resposta.transacoes || [];
            
            const listaOrdenada = lista.sort((a,b) => b.id - a.id); //isso seria melhor no back, mas né
            setTransacoesCompletas(lista);

            if(resposta.paginacao){
                setTotalPaginas(resposta.paginacao.totalPaginas);
            }
            setPaginaAtual(pagina);

        }catch(error){
            console.error("Erro ao carregar transações:", error);
            alert("Erro ao conectar com o servidor de finanças.")
        } finally {
            setCarregando(false);
        }
    }, [])

    useEffect(() => {
        setCarregarTransacoes(() => () => carregarTransacoes(1)); // Carrega na montagem inicial
    }, [setCarregarTransacoes, carregarTransacoes]);

    //Função para deletar transação
    const handleDeleteTransacao = async (id: number) => {
        if(window.confirm("Tem certeza que deseja deletar esta transação?")){
            try {
                await deleteTransaction(id);
                await carregarTransacoes(paginaAtual); // Recarrega as transacoes depois dda exclusão
            } catch (error) {
                alert("Erro ao deletar a transação.");
            }
        }
    }

    // effect: Escuta o evento de atualização do Dialog
    useEffect(() => {
        carregarTransacoes(1); // Carrega na montagem inicial
    }, []);

    // calculo: Cards de Resumo (Entrada, Saída, Total)
    const resumo = useMemo(() => {
        const entradas = transacoesCompletas
            .filter(t => t.tipo === 'entrada')
            .reduce((acc, t) => acc + (Number(t.valor) || 0), 0);

        const saidas = transacoesCompletas  
            .filter(t => t.tipo === 'saida')
            .reduce((acc, t) => acc + (Number(t.valor) || 0), 0);
        const total = entradas - saidas;
        return { entradas, saidas, total };
    }, [transacoesCompletas]);

    // calculo: Filtro de Busca
    const transacoesFiltradas = useMemo(() => {
        if (!filtro) return transacoesCompletas;
        
        const filtroLower = filtro.toLowerCase();
        return transacoesCompletas.filter(t => 
            (t.nome || '').toLowerCase().includes(filtroLower) ||
            (t.categoria || '').toLowerCase().includes(filtroLower)
        );
    }, [transacoesCompletas, filtro]);


    return (
        // O BoxPrincipal agora precisa ser envolvido pelo Header (no DefaultLayout)
        <BoxPrincipal>
            <Outlet context={{carregarTransacoes}}/>
            {/* O Header do DefaultLayout já tem a Imagem e o Botão Nova Transacao (NewButton) */}
            
            {/* 1. Cards (Recebem o resumo calculado e são renderizados após o header) */}
            <Cards resumo={resumo} />

            {/* 2. Search (Recebe o estado e a função de atualização do filtro) */}
            <Search filtro={filtro} setFiltro={setFiltro} />

            {/* 3. Tabela (Recebe a lista de transações FILTRADAS) */}
            <TabelaTransacoes 
                transacoes={transacoesFiltradas} 
                onDelete={handleDeleteTransacao} />
            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 2 }}>
                
                <Pagination 
                    count={totalPaginas || 1} 
                    page={paginaAtual} 
                    onChange={(_, value) => {
                        console.log("Página selecionada:", value);
                        carregarTransacoes(value)}} // Ao clicar, carrega a nova página
                    color="primary"
                    shape="rounded"
                    // Estilização para ficar visível no fundo escuro/cinza
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'text.secondary', // ou '#fff' se estiver muito escuro
                            '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: '#fff'
                            }
                        }
                    }}
                />
            </Stack>

        </BoxPrincipal>
    )
}
