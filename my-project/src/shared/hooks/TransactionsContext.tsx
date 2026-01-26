import { createContext, useEffect, useState, type ReactNode, useContext } from 'react';
// Importacao de interfaces e servicos
import { 
    getTransactions, 
    type Transaction, 
    type ResumoTransacoes 
} from '../services/get/transactions';

interface TransactionsContextData {
    transacoes: Transaction[];
    resumo: ResumoTransacoes; 
    fetchTransactions: (page?: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: { children: ReactNode }) {
    const [transacoes, setTransacoes] = useState<Transaction[]>([]);
    
    const [resumo, setResumo] = useState<ResumoTransacoes>({
        entradas: 0,
        saidas: 0,
        total: 0
    });

    async function fetchTransactions(page = 1) {
        try {
            const data = await getTransactions(page);   
            //atualizada lista de transacoes 
            setTransacoes(data.transacoes);
            
            // Atualizados os cards com o resumo
            setResumo(data.resumo);
            
        } catch (error) {
            console.error("Erro ao buscar transações", error);
        }
    }

    // Carrega na montagem do componente
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ 
            transacoes, 
            resumo, 
            fetchTransactions 
        }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}