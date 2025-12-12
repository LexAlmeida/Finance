import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useEffect, useState } from "react";

interface ITransacao {
    id:number;
    descricao:string;
    preco:number;
    categoria:string;
    data:string;
}

interface ITransacaoComTipo extends ITransacao {
    tipo: TipoTransacao;
}

type TipoTransacao = 'entrada' | 'saida';

const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(preco)
}

const getLocalStorageData = (key: string) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) as ITransacao[] : [];
}

export const TabelaTransacoes = () => {
    const [transacoes, setTransacoes] = useState<ITransacaoComTipo[]>([]);

    const carregarTransacoes = () => {
        const entradas: ITransacao[] = getLocalStorageData('app-entradas');
        const saidas: ITransacao[] = getLocalStorageData('app-saidas');

        const transacoesEntrada = entradas.map(t =>({...t, tipo:'entrada' as TipoTransacao}));
        const transacoesSaida = saidas.map(t => ({...t, tipo: 'saida' as TipoTransacao}));

        const todasTransacoes = [...transacoesEntrada, ...transacoesSaida].sort((a,b) => b.id - a.id);

        setTransacoes(todasTransacoes);
    };
    
    useEffect(() => {
        carregarTransacoes();   

        window.addEventListener('storage', carregarTransacoes);
        return () => {
            window.removeEventListener('storage', carregarTransacoes);  
        };
    }, []);

    return (
        <TableContainer component={Paper} sx={{mt:4, borderRadius:'6px'}}>
            <Table sx={{minWidth:'650px'}} aria-label="simple table">
                <TableBody>
                    {transacoes.map((transacao) => (
                        <TableRow key={transacao.id} sx={{'&:last-child td, &:last-child th':{border:0}}}>
                            <TableCell component='th' scope="row">
                                {transacao.descricao}
                            </TableCell>
                            <TableCell sx={{
                                color: transacao.tipo === 'entrada' ? 'primary.main' : 'error.main',
                                fontWeight:'bold'
                            }}>
                                {transacao.tipo === 'saida' ? '-' : ''}
                                {formatarPreco(transacao.preco)}
                            </TableCell>
                            <TableCell>{transacao.categoria}</TableCell>       
                            <TableCell>{transacao.data}</TableCell>                       
                        </TableRow>
                    ))}
                </TableBody>           
            </Table>        
        </TableContainer>
    )
}