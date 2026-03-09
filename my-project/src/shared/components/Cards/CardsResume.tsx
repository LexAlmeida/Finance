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
                    mx:{xs:'-2px', sm: 0},
                    px:{xs:'2px', sm: 0},
                    '&::-webkit-scrollbar': {display: 'none'},
                    justifyContent: {xs: 'flex-start', sm: 'space-between'},

                    // ajuste pro mobile
                    marginLeft: { xs: 'calc(-50vw + 50%)', sm: 0 }, // centraliza compensando o container
                    marginRight: { xs: 'calc(-50vw + 50%)', sm: 0 },
                    paddingLeft: { xs: 2, sm: 0 }, // mantem o primeiro card alinhado com o conteudo

                    '&::after': {
                        content: '""',
                        width: { xs: '1px', sm: 0 },
                        flexShrink: 0
                    }
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