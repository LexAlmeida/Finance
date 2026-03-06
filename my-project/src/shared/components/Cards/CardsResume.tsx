import { Box } from '@mui/material';
import { MyCard } from './MyCards';
import type { ITransacao } from '../Tabela';
import { getUltimaData } from '../../services/utils';

interface CardProps {
    resumo: {
        total: number;
        entradas: number;
        saidas: number;
    };
    transacoes: ITransacao[]
}

const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(preco)
}

export const Cards = ({ resumo, transacoes = [] }: CardProps ) => {
    return (
            <Box
                sx={{
                    display:'flex',
                    gap: 2,
                    mt: { xs: -10, sm: -5 },
                    overflowX:'auto',
                    pb: 1,
                    '&::-webkit-scrollbar': {display: 'none'},
                    justifyContent: {xs: 'flex-start', sm: 'space-between'}
                }}
            >
                <MyCard
                    title="Entrada"
                    value={formatarPreco(resumo.entradas)}
                    icon="arrowUp"
                    isHighlight={false}
                    lastTransaction={getUltimaData(transacoes, 'entrada')}
                />
                <MyCard
                    title="Saída"
                    value={formatarPreco(resumo.saidas)}
                    icon="arrowDown"
                    isHighlight={false}
                    lastTransaction={getUltimaData(transacoes, 'saida')}
                />
                <MyCard
                    title="Total"
                    value={formatarPreco(resumo.total)}
                    icon="money"
                    isHighlight={true} //card verde de destaque
                    lastTransaction={getUltimaData(transacoes)}
                />
            </Box>
    )
}