import { useEffect, useState, useMemo, useCallback } from "react";
// Importações de componentes
import { Cards } from "../shared/components/Cards/Cards";
import { BoxPrincipal } from "../shared/components/Box/Box";
import { Search } from "../shared/components/Inputs/Search";
import { TabelaTransacoes } from "../shared/components/Tabela/Tabela";
// Importações de utilitários (para usar no componente)
import { type ITransacao } from "../shared/components/Tabela/Tabela"; // Reutilizando a interface
import { getTransactions } from "../shared/services/get/transactions";
import { deleteTransaction } from "../shared/services/delete/transactions";

export const Finance = () => {
    const [transacoesCompletas, setTransacoesCompletas] = useState<ITransacao[]>([]);
    const [filtro, setFiltro] = useState(''); // Estado para o campo de busca
    const [carregando, setCarregando] = useState(true);

    // Função que busca dados da api
    const carregarTransacoes = useCallback(async () => {
        try{
            setCarregando(true);

            const resposta = await getTransactions();

            const lista = resposta.transacoes || [];
            setTransacoesCompletas(lista.sort((a,b) => b.id - a.id));

        }catch(error){
            console.error("Erro ao carregar transações:", error);
            alert("Erro ao conectar com o servidor de finanças.")
        } finally {
            setCarregando(false);
        }
    }, [])

    //Função para deletar transação
    const handleDeleteTransacao = async (id: number) => {
        if(window.confirm("Tem certeza que deseja deletar esta transação?")){
            try {
                await deleteTransaction(id);
                await carregarTransacoes(); // Recarrega as transacoes depois dda exclusão
            } catch (error) {
                alert("Erro ao deletar a transação.");
            }
        }
    }

    // effect: Escuta o evento de atualização do Dialog
    useEffect(() => {
        carregarTransacoes(); // Carrega na montagem inicial
    }, [carregarTransacoes]);

    // calculo: Cards de Resumo (Entrada, Saída, Total)
    const resumo = useMemo(() => {
        const entradas = transacoesCompletas
            .filter(t => t.tipo === 'entrada')
            .reduce((acc, t) => acc + (t.valor || 0), 0);

        const saidas = transacoesCompletas  
            .filter(t => t.tipo === 'saida')
            .reduce((acc, t) => acc + (t.valor || 0), 0);

        const total = entradas - saidas;
        return { entradas, saidas, total };
    }, [transacoesCompletas]);

    // calculo: Filtro de Busca
    const transacoesFiltradas = useMemo(() => {
        if (!filtro) return transacoesCompletas;
        
        const filtroLower = filtro.toLowerCase();
        return transacoesCompletas.filter(t => 
            t.nome.toLowerCase().includes(filtroLower) ||
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
            <TabelaTransacoes 
                transacoes={transacoesFiltradas} 
                onDelete={handleDeleteTransacao} />
            
        </BoxPrincipal>     
    )
}