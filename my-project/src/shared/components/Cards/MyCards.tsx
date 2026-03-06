import { Box, Card, Typography } from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface ICard {
    title: string;
    value: string;
    icon: string;
    isHighlight: boolean;
}

const IconMap: {[key: string]: React.ElementType} = {
    arrowUp: ArrowCircleUpIcon,
    arrowDown: ArrowCircleDownIcon,
    money: AttachMoneyIcon
}

export const MyCard = ({title, value, icon, isHighlight}: ICard) => {
    const IconComponent = IconMap[icon];
    
    // Define a cor do ícone 
    const iconColor = isHighlight ? 'text.secondary' : (title === 'Entrada' ? 'primary.light' : 'secondary.main');
    
    const bgColor = isHighlight ? 'primary.dark' : 'background.paper';

    return (
        <Card sx={{
            minWidth:{xs:'280px', sm: '350px'}, 
            flexShrink:0,
            borderRadius: "6px",
            mb: {xs:2, sm:0},
            bgcolor: bgColor,
            color: isHighlight ? 'contrastText' : 'text.secondary', 
            p: 4
        }}>
            <Box display="flex" justifyContent='space-between'>
                <Typography variant="h6">{title}</Typography>
                <IconComponent sx={{ color: isHighlight ? 'contrastText' : iconColor }}/>
            </Box>
            <Typography 
                variant="h4" 
                fontWeight='bold'
                sx={{ mt: 1, 
                      color: isHighlight ? 'contrastText' : 
                      (title === 'Entrada' ? 'text.primary' : 
                       (title === 'Saída' ? 'text.primary' : 'text.secondary'))
                }}
            >
                {value}
            </Typography>
        </Card>
    )
}
