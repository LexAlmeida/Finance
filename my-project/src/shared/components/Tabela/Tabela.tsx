import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Stack, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Interface 
export interface ITransacao { 
    id:number;
    nome:string;
    valor:number; // Já é negativo para Saídas
    categoria:string;
    tipo:'entrada' | 'saida';
    data:string;
}

// Interface de Propriedades - Recebe a lista já filtrada do Finance
interface TabelaProps {
    transacoes: ITransacao[];
    onDelete?: (id: number) => void;
    onEdit?: (transacao: ITransacao) => void;
}

const formatarValor = (valor: number): string => {
    // Math.abs(valor) para formatar o valor sem o sinal
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(Math.abs(valor))
}

const LinhaTransacao = ({transacao, onDelete}: {
    transacao: ITransacao,
    onDelete?: (id: number) => void
}) => {
    const isSaida = transacao.tipo === 'saida';
    const styles = {
        color: isSaida ? 'secondary.main' : 'primary.light',
        border: isSaida ? '#015f43' : '#aa2834',
        prefix: isSaida ? '-' : ''
    };
    const valorFormatado =  new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(Math.abs(transacao.valor));

    return (
        <TableRow
            sx={{
                '&:hover': {bgcolor:'action.hover'},
                transition: 'background-color 0.3s',
            }}    
        >
            <TableCell
                sx={{
                    color: 'text.primary',
                    borderBottom: `1px solid ${styles.border}`,
                    py: 2.5
                }}
            >
                {transacao.nome}
            </TableCell>

            <TableCell 
                sx={{
                    color: styles.color,
                    fontWeight: 'bold',
                    borderBottom: `1px solid ${styles.border}`
                }}
            >
                {styles.prefix}{valorFormatado}
            </TableCell>

            <TableCell
                sx={{
                    color: 'text.primary',
                    borderBottom: `1px solid ${styles.border}`,
                    whiteSpace:'nowrap'
                }}
            >
                {transacao.data}
            </TableCell>

            <TableCell align="right" sx={{borderBottom: `1px solid ${styles.border}`}}>
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                    <Tooltip title='Editar'>
                        <IconButton size="small" sx={{color: 'primary.dark'}}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Deletar'>
                        <IconButton 
                            size="small" 
                            sx={{color: 'text.disabled', 
                                '&:hover': {color:'secondary.main'}
                            }}
                            onClick={() => onDelete?.(transacao.id)}
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export const TabelaTransacoes = ({ transacoes, onDelete }: TabelaProps) => {
    return (
        <TableContainer 
            component={Paper} 
            sx={{mt:4, borderRadius:'6px', bgcolor:'background.default'}}
        >
            <Table sx={{minWidth:{xs: '700px', md:'100%'}}} aria-label="simple table">
                <TableBody>
                    {transacoes.length > 0 ? (
                        transacoes.map((t) => (
                            <LinhaTransacao key={t.id} transacao={t} onDelete={onDelete}/>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{py: 10, color: 'text.secondary'}}>
                                Nenhuma transação encontrada.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>           
            </Table>        
        </TableContainer>
    )
}