import { createContext, useEffect, useState, type ReactNode, useContext } from 'react';
import {useAuth} from '../context/AuthContext';
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
    const {isAuthenticated} = useAuth();
    const [transacoes, setTransacoes] = useState<Transaction[]>([]);
    
    const [resumo, setResumo] = useState<ResumoTransacoes>({
        entradas: 0,
        saidas: 0,
        total: 0
    });

    async function fetchTransactions(page = 1) {
        const token = localStorage.getItem('APP_ACCESS_TOKEN');
        if(!token) return
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
        if(isAuthenticated) fetchTransactions();
    }, [isAuthenticated]);

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