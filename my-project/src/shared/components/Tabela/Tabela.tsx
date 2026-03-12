import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery, useTheme} from "@mui/material";
import { LinhaTransacao } from "./DesktopRow";
import { CardMobile } from "./MobileCard";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

// Interface 
export interface ITransacao { 
    id:number;
    nome:string;
    valor:number; // Já é negativo para Saídas
    categoria:string;
    tipo:'entrada' | 'saida';
    data:string;
}

export const TabelaTransacoes = () => {
    const {transacoesFiltradas, handleDeleteTransacao} = useContext(FinanceContext)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    if (isMobile) {
        return (
            <Box sx={{mt:2, px:1}}>
                <Stack direction='row' justifyContent='space-between' sx={{mb:2, color: 'white'}}>
                    <Typography>Transações</Typography>
                    <Typography sx={{color:'#969cb3'}}>
                        {transacoesFiltradas.length} itens
                    </Typography>
                </Stack>
                {transacoesFiltradas.map((t) => (
                    <CardMobile key={t.id} transacao={t} onDelete={handleDeleteTransacao}/>
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
                    {transacoesFiltradas.length > 0 ? (
                        transacoesFiltradas.map((t) => (
                            <LinhaTransacao key={t.id} transacao={t} onDelete={handleDeleteTransacao}/>
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