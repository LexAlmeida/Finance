import { IconButton, Stack, TableCell, TableRow, Tooltip } from "@mui/material";
import type { ITransacao } from "./Tabela";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const LinhaTransacao = ({transacao, onDelete}: {
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
                    py: 2.5
                }}
            >
                {transacao.categoria}
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