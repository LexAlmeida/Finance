import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Card, Stack, Typography } from '@mui/material';

// Interfaces para Props 
interface ICard {
    title: string;
    value: string;
    icon: string;
    isHighlight: boolean;
}
interface CardProps {
    resumo: {
        total: number;
        entradas: number;
        saidas: number;
    }
}

// Funções Auxiliares
const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(preco)
}

const IconMap: {[key: string]: React.ElementType} = {
    arrowUp: ArrowCircleUpIcon,
    arrowDown: ArrowCircleDownIcon,
    money: AttachMoneyIcon
}

// Sub-Componente de Card 
const MyCard = ({title, value, icon, isHighlight}: ICard) => {
    const IconComponent = IconMap[icon];
    
    // Define a cor do ícone 
    const iconColor = isHighlight ? 'text.secondary' : (title === 'Entrada' ? 'primary.light' : 'secondary.main');
    
    const bgColor = isHighlight ? 'primary.main' : 'background.default';

    return (
        <Card sx={{
            width:{xs: '100%', sm: '27.5rem'}, 
            borderRadius: "6px",
            mb: {xs:2, sm:0},
            bgcolor: bgColor,
            color: isHighlight ? 'contrastText' : 'text.secondary', 
            p: 4
        }}>
            <Box display={"flex"} justifyContent='space-between'>
                <Typography variant="h6">{title}</Typography>
                <IconComponent sx={{ color: isHighlight ? 'contrastText' : iconColor }}/>
            </Box>
            <Typography 
                variant="h4" 
                fontWeight='bold'
                sx={{ mt: 1, 
                      color: isHighlight ? 'contrastText' : 
                      (title === 'Entrada' ? 'primary.light' : 
                       (title === 'Saída' ? 'secondary.main' : 'text.secondary'))
                }}
            >
                {value}
            </Typography>
        </Card>
    )
}

// Componente Principal Cards 
export const Cards = ({ resumo }: CardProps ) => {
    return (
            <Stack direction='row' spacing={{xs:0,sm:2}} justifyContent='center' gap={2} sx={{
                // Ajuste de margem 
                mt: { xs: 0, sm: -5 } 
            }}>
                <MyCard
                    title="Entrada"
                    value={formatarPreco(resumo.entradas)}
                    icon="arrowUp"
                    isHighlight={false}
                />
                <MyCard
                    title="Saída"
                    value={formatarPreco(resumo.saidas)}
                    icon="arrowDown"
                    isHighlight={false}
                />
                <MyCard
                    title="Total"
                    value={formatarPreco(resumo.total)}
                    icon="money"
                    isHighlight={true} // Este card é o verde de destaque
                />
            </Stack>
    )
}