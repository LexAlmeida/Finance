import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useTransactions } from '../../hooks/TransactionsContext';

// sobre o token quero fazer como o da uno eu acho
// quando expirar o token, mostrar um aviso pedindo 
// se o usuario ainda esta na tela,
// depois de um tempo sem resposta ele leva para o
// login e se ele clicar que ainda esta ali
// gerar um novo token, com duracao de  30 min 
// tambem. mas primeiro resolver os cards -> nao 
// esta pegando os dados das transacoes,
// e tambem queria deixar eles presos ali em cima 
//mesmo se descer para ver as transacoes//
// --- Interfaces para Props ---
interface ICard {
    title: string;
    value: string;
    icon: string;
    isHighlight: boolean;
}

// --- Funções Auxiliares ---
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

// --- Sub-Componente de Card ---
const MyCard = ({title, value, icon, isHighlight}: ICard) => {
    const IconComponent = IconMap[icon];
    
    // Define a cor do ícone com base no tema e destaque
    const iconColor = isHighlight ? 'text.secondary' : (title === 'Entrada' ? 'primary.light' : 'secondary.main');
    
    // Define a cor do fundo com base no destaque
    const bgColor = isHighlight ? 'primary.main' : 'background.default';

    return (
        // Usamos o Paper para melhor controle de estilo do MUI
        <Card sx={{
            width:{xs: '100%', sm: '27.5rem'}, 
            borderRadius: "6px",
            mb: {xs:2, sm:0},
            bgcolor: bgColor, // Fundo dinâmico
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

// --- Componente Principal Cards ---
export const Cards = () => {
    const { resumo } = useTransactions();
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