import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
}

const formatarValor = (valor: number): string => {
    // Math.abs(valor) para formatar o valor sem o sinal
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(Math.abs(valor))
}

export const TabelaTransacoes = ({ transacoes, onDelete }: TabelaProps) => {
    // Definir o tipo com base no sinal do valor
    const getTipo = (valor: number) => valor > 0 ? 'entrada' : 'saida';

    return (
        <TableContainer component={Paper} sx={{mt:4, borderRadius:'6px', bgcolor:'background.default'}}>
            <Table sx={{minWidth:'650px'}} aria-label="simple table">
                <TableBody>
                    {transacoes.map((transacao) => {
                        const tipo = getTipo(transacao.valor);
                        // Define as cores CSS de acordo com o tema
                        const borderColor = transacao.valor > 0 ? '#015f43' : '#aa2834';
                        
                        return (
                            <TableRow 
                                key={transacao.id} 
                                sx={{
                                    '&:last-child td, &:last-child th':{border:0}, 
                                    '&:hover': { bgcolor: 'background.paper' }
                                }}
                            >
                                {/*descrição*/}
                                <TableCell 
                                    component='th' 
                                    scope="row"
                                    sx={{
                                        color: 'text.primary', 
                                        borderBottom: `1px solid ${borderColor}`,
                                    }}
                                >
                                    {transacao.nome}
                                </TableCell>
                                {/*preco*/}
                                <TableCell sx={{
                                    color: tipo === 'entrada' ? 'primary.light' : 'secondary.main',
                                    fontWeight:'bold',
                                    borderBottom: `1px solid ${borderColor}`,
                                }}>
                                    {tipo === 'saida' ? '- ' : ''} 
                                    {formatarValor(transacao.valor)}
                                </TableCell>
                                {/*categoria*/}
                                <TableCell sx={{
                                    color: 'text.primary', 
                                    borderBottom: `1px solid ${borderColor}`,
                                }}>
                                    {transacao.categoria}
                                </TableCell> 
                                {/*data*/}      
                                <TableCell sx={{
                                    color: 'text.primary', 
                                    borderBottom: `1px solid ${borderColor}`,
                                }}>
                                    {transacao.data}
                                </TableCell>  
                                <TableCell align="right" sx={{
                                    borderBottom:`1px solid ${borderColor}`,
                                }}>
                                    <IconButton 
                                        onClick={() => onDelete?.(transacao.id)}
                                        sx={{color:'#7c7c8a', "&:hover": {color: '#8a2834'}}}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>                     
                            </TableRow>
                        );
                    })}
                    {transacoes.length === 0 && (
                        <TableRow>
                             <TableCell colSpan={5} align="center" sx={{ color: 'text.primary' }}>
                                Nenhuma transação encontrada.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>           
            </Table>        
        </TableContainer>
    )
}