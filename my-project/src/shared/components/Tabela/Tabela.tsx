import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, colors } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// Interface 
export interface ITransacao { 
    id:number;
    descricao:string;
    preco:number; // Já é negativo para Saídas
    categoria:string;
    tipo:'entrada' | 'saida';
    data:string;
}

// Interface de Propriedades - Recebe a lista já filtrada do Finance
interface TabelaProps {
    transacoes: ITransacao[];
    onDelete?: (id: number) => void;
}

const formatarPreco = (preco: number): string => {
    // Math.abs(preco) para formatar o valor sem o sinal
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(Math.abs(preco))
}

export const TabelaTransacoes = ({ transacoes, onDelete }: TabelaProps) => {
    // Definir o tipo com base no sinal do preço
    const getTipo = (preco: number) => preco > 0 ? 'entrada' : 'saida';

    return (
        <TableContainer component={Paper} sx={{mt:4, borderRadius:'6px', bgcolor:'background.default'}}>
            <Table sx={{minWidth:'650px'}} aria-label="simple table">
                <TableBody>
                    {transacoes.map((transacao) => {
                        const tipo = getTipo(transacao.preco);
                        // Define as cores CSS de acordo com o tema
                        const borderColor = transacao.preco > 0 ? '#015f43' : '#aa2834';
                        
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
                                    {transacao.descricao}
                                </TableCell>
                                {/*preco*/}
                                <TableCell sx={{
                                    color: tipo === 'entrada' ? 'primary.light' : 'secondary.main',
                                    fontWeight:'bold',
                                    borderBottom: `1px solid ${borderColor}`,
                                }}>
                                    {tipo === 'saida' ? '- ' : ''} 
                                    {formatarPreco(transacao.preco)}
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