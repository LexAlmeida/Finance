import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { ITransacao } from "./Tabela";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import  DeleteOutlineIcon  from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const CardMobile = ({transacao, onDelete}:{transacao:ITransacao, onDelete?: (id:number) => void}) => {
    const isSaida = transacao.tipo === 'saida';
    
    const valorFormatado = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(Math.abs(transacao.valor));

    const dataFormatada = new Intl.DateTimeFormat('pt-BR')
        .format(new Date(transacao.data))

    return (
        <Box sx={{ 
            bgcolor: '#29292e',
            borderRadius: '6px', 
            p: 2.5, 
            mb: 2,
            color: 'white',
            position: 'relative'
        }}>
            {onDelete && (
                <IconButton
                    onClick={() => onDelete(transacao.id)}
                    size="small"
                    sx={{
                        color:'#f75a68', 
                        position: 'absolute',
                        top: 25,
                        right: 25,
                        p: 0
                    }}
                >
                    <DeleteOutlineIcon fontSize="medium"/>
                </IconButton>
            )}
            <Typography sx={{ color: 'text.primary', fontSize: '1rem', mb: 0.5 }}>
                {transacao.nome}
            </Typography>
            
            <Typography sx={{ 
                color: isSaida ? '#f75a68' : '#00b37e', 
                fontSize: '1.25rem', 
                fontWeight: 'bold',
                mb: 2
            }}>
                {isSaida ? `- ${valorFormatado}` : valorFormatado}
            </Typography>

            <Stack direction="row" justifyContent="space-between" sx={{ color: '#8e93a59c' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.875rem' }}>
                    <LabelOutlinedIcon />
                    {transacao.categoria}
                </Typography>
                 
                <Typography sx={{ display:'flex', alignItems: 'center', gap:0.5, fontSize: '0.875rem' }}>
                    <CalendarTodayIcon sx={{ fontSize: '0.875rem'}}/>
                    {dataFormatada}
                </Typography>
            </Stack>
        </Box>
    );
};
