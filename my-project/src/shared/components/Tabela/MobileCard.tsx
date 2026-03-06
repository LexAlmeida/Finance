import { Box, Stack, Typography } from "@mui/material";
import type { ITransacao } from "./Tabela";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

export const CardMobile = ({transacao, onDelete}:{transacao:ITransacao, onDelete?: (id:number) => void}) => {
    const isSaida = transacao.tipo === 'saida';
    
    const valorFormatado = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(Math.abs(transacao.valor));

    return (
        <Box sx={{ 
            bgcolor: '#29292e',
            borderRadius: '6px', 
            p: 2.5, 
            mb: 2,
            color: 'white'
        }}>
            <Typography sx={{ color: '#e1e1e6', fontSize: '1rem', mb: 0.5 }}>
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

            <Stack direction="row" justifyContent="space-between" sx={{ color: '#969cb3' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
                    <LabelOutlinedIcon/>
                    {transacao.categoria}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem' }}>
                    {transacao.data}
                </Typography>
            </Stack>
        </Box>
    );
};
