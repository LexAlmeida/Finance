import { useEffect, useState, useMemo, useCallback } from "react";
import { Stack, Pagination, Box } from "@mui/material"; 
import { Cards } from "../shared/components/Cards/Cards";
import { BoxPrincipal } from "../shared/components/Box/Box";
import { Search } from "../shared/components/Inputs/Search";
import { TabelaTransacoes } from "../shared/components/Tabela/Tabela";
import { type ITransacao } from "../shared/components/Tabela/Tabela"; 
import { getTransactions } from "../shared/services/get/transactions";
import { deleteTransaction } from "../shared/services/delete/transactions";
import { Outlet } from "react-router-dom";

// Interface do estado do resumo
interface IResumo {
    entradas: number;
    saidas: number;
    total: number;
}

export const Finance = ({setCarregarTransacoes}: {setCarregarTransacoes: (fn: () => void) => void}) => {
    const [transacoesCompletas, setTransacoesCompletas] = useState<ITransacao[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [filtro, setFiltro] = useState(''); 
    const [resumoDados, setResumoDados] = useState<IResumo>({ entradas: 0, saidas: 0, total: 0 });

    // Função que calcula o TOTAL REAL (busca tudo) 
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
            
            // Atualiza o estado que vai para os Cards
            setResumoDados({
                entradas,
                saidas,
                total: entradas - saidas
            });

        } catch (error) {
            console.error("Erro ao calcular resumo:", error);
        }
    }, []);

    //  Função principal de carregamento
    const carregarDados = useCallback(async (pagina = 1) => {
        try{
            const resposta = await getTransactions(pagina, 10); 
            const lista = resposta.transacoes || [];
            const listaOrdenada = lista.sort((a: ITransacao, b: ITransacao) => b.id - a.id);
            setTransacoesCompletas(listaOrdenada);

            if(resposta.paginacao){
                setTotalPaginas(resposta.paginacao.totalPaginas);
            }
            setPaginaAtual(pagina);

            await buscarResumoGlobal();
        }catch(error){
            console.error("Erro ao carregar dados:", error);
        }
    }, [buscarResumoGlobal]);

    // Expondo a função de recarregar para o Outlet
    useEffect(() => {
        setCarregarTransacoes(() => () => carregarDados(1)); 
    }, [setCarregarTransacoes, carregarDados]);

    // Carrega na montagem inicial
    useEffect(() => {
        carregarDados(1); 
    }, [carregarDados]);

    // Função para deletar transação
    const handleDeleteTransacao = async (id: number) => {
        if(window.confirm("Tem certeza que deseja deletar esta transação?")){
            try {
                await deleteTransaction(id);
                // Ao deletar, recarrega tudo 
                if(transacoesCompletas.length === 1 && paginaAtual > 1){
                    carregarDados(paginaAtual - 1);
                } else {
                    carregarDados(paginaAtual); 
                }
            } catch (error) {
                alert("Erro ao deletar a transação.");
            }
        }
    }

    // Filtro apenas visual da tabela
    const transacoesFiltradas = useMemo(() => {
        if (!filtro) return transacoesCompletas;
        const filtroLower = filtro.toLowerCase();
        return transacoesCompletas.filter(t => 
            (t.nome || '').toLowerCase().includes(filtroLower) ||
            (t.categoria || '').toLowerCase().includes(filtroLower)
        );
    }, [transacoesCompletas, filtro]);

    return (
        <BoxPrincipal>
            <Outlet context={{carregarTransacoes: carregarDados}}/>
            
            {/* Box Sticky (Fixo no topo) */}
            <Box sx={{
                position: 'sticky',
                top: 0, 
                zIndex: 10,
                bgcolor: 'background.default', 
                pt: 1, 
                pb: 2,
                mt: -2 
            }}>
                {/* AQUI ESTAVA O ERRO PROVAVELMENTE: */}
                {/* Passamos o estado 'resumoDados' para a prop 'resumo' */}
                <Cards resumo={resumoDados}/>
                
                <Box sx={{ mt: 2 }}>
                    <Search filtro={filtro} setFiltro={setFiltro} />
                </Box>
            </Box>

            <TabelaTransacoes 
                transacoes={transacoesFiltradas} 
                onDelete={handleDeleteTransacao} 
            />

            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 2 }}>
                <Pagination 
                    count={totalPaginas || 1} 
                    page={paginaAtual} 
                    onChange={(_, value) => carregarDados(value)} 
                    color="primary"
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'text.secondary', 
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