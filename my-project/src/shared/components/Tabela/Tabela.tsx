import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery, useTheme} from "@mui/material";
import { LinhaTransacao } from "./DesktopRow";
import { CardMobile } from "./MobileCard";


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



export const TabelaTransacoes = ({ transacoes, onDelete }: TabelaProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    if (isMobile) {
        return (
            <Box sx={{mt:2, px:1}}>
                <Stack direction='row' justifyContent='space-between' sx={{mb:2, color: 'white'}}>
                    <Typography>Transações</Typography>
                    <Typography sx={{color:'#969cb3'}}>
                        {transacoes.length} itens
                    </Typography>
                </Stack>
                {transacoes.map((t) => (
                    <CardMobile key={t.id} transacao={t} onDelete={onDelete}/>
                ))}
            </Box>
        )
    }
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
                            <TableCell colSpan={5} align="center" sx={{py: 3, color: 'text.secondary'}}>
                                Nenhuma transação encontrada.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>           
            </Table>        
        </TableContainer>
    )
}