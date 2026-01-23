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

export const TabelaTransacoes = ({ transacoes, onDelete }: TabelaProps) => {
    return (
        <TableContainer component={Paper} sx={{mt:4, borderRadius:'6px', bgcolor:'background.default'}}>
            <Table sx={{minWidth:'650px'}} aria-label="simple table">
                <TableBody>
                    {transacoes.map((transacao) => {
                        const isSaida = transacao.tipo === 'saida';
                        const tipo = isSaida ? 'saida' : 'entrada';
                        // Define as cores CSS de acordo com o tema
                        const borderColor = tipo === 'entrada' ? '#015f43' : '#aa2834';
                        
                        return (
                            <TableRow 
                                key={transacao.id} 
                                sx={{
                                    '&:last-child td, &:last-child th':{border:0}, 
                                    '&:hover': { bgcolor: 'background.paper' },
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                {/*descrição*/}
                                <TableCell 
                                    component='th' 
                                    scope="row"
                                    sx={{
                                        color: 'text.primary', 
                                        borderBottom: `1px solid ${borderColor}`,
                                        py: 2.5,
                                        fontSize: '1rem',
                                    }}
                                >
                                    {transacao.nome}
                                </TableCell>

                                {/*preco*/}
                                <TableCell sx={{
                                    color: tipo === 'entrada' ? 'primary.light' : 'secondary.main',
                                    fontWeight:'bold',
                                    borderBottom: `1px solid ${borderColor}`,
                                    whiteSpace: 'nowrap',
                                    fontSize: '1rem',
                                    py: 2.5,
                                }}>
                                    {tipo === 'saida' ? '- ' : ''} 
                                    {formatarValor(transacao.valor)}
                                </TableCell>

                                {/*categoria*/}
                                <TableCell sx={{
                                    color: 'text.primary', 
                                    borderBottom: `1px solid ${borderColor}`,
                                    py: 2.5,
                                }}>
                                    {transacao.categoria}
                                </TableCell> 

                                {/*data*/}      
                                <TableCell sx={{
                                    color: 'text.primary', 
                                    borderBottom: `1px solid ${borderColor}`,
                                    whiteSpace: 'nowrap',
                                    py: 2.5,
                                }}>
                                    {transacao.data}
                                </TableCell>  

                                {/*ações editar e deletar*/}
                                <TableCell align="right" sx={{
                                    borderBottom:`1px solid ${borderColor}`,
                                    py: 2.5,
                                }}>
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Tooltip title="Editar">
                                            <IconButton
                                                //onClick={() => onEdit?.(transacao)}//
                                                sx={{
                                                    color: 'primary.dark',
                                                    "&:hover": { color: 'primary.main', backgroundColor: 'rgba(0, 179, 126, 0.1)'}
                                                }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Deletar">
                                            <IconButton 
                                                onClick={() => onDelete?.(transacao.id)}
                                                sx={{
                                                    color:'#565658', 
                                                    "&:hover": {color: 'secondary.main', backgroundColor: 'rgba(247, 90, 104, 0.1)'}}}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                    
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