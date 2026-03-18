import { Box } from '@mui/material';
import { MyCard } from './MyCards';
import { formatarPreco, getUltimaData } from '../../services/utils';
import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';

export const Cards = () => {
    const {resumoDados, transacoesCompletas} = useContext(FinanceContext);

    const cards = [
        {
          title:'Entrada',
          value: formatarPreco(resumoDados.entradas),
          icon: 'arrowUp' as const,
          isHighlight: false,
          lastTransaction: getUltimaData(transacoesCompletas, 'entrada'),
        },
        {
          title:'Saída',
          value: formatarPreco(resumoDados.saidas),
          icon: 'arrowDown' as const,
          isHighlight: false,
          lastTransaction: getUltimaData(transacoesCompletas, 'saida'),
        },
        {
          title:'Total',
          value: formatarPreco(resumoDados.total),
          icon: 'money' as const,
          isHighlight: true,
          lastTransaction: getUltimaData(transacoesCompletas)
        }
    ]
        
    return (
            <Box
                sx={{
                    display:'flex',
                    gap: 2,
                    mt: { xs: -10, sm: -5 },
                    overflowX:'auto',
                    pb: 1,
                    mx:{xs:'-2px', sm: 0},
                    px:{xs:'2px', sm: 0},
                    '&::-webkit-scrollbar': {display: 'none'},
                    justifyContent: {xs: 'flex-start', sm: 'space-between'},

                    // ajuste pro mobile
                    marginLeft: { xs: 'calc(-50vw + 50%)', sm: 0 }, // centraliza compensando o container
                    marginRight: { xs: 'calc(-50vw + 50%)', sm: 0 },
                    paddingLeft: { xs: 2, sm: 0 }, // mantem o primeiro card alinhado com o conteudo

                    '&::after': {
                        content: '""',
                        width: { xs: '1px', sm: 0 },
                        flexShrink: 0
                    }
                }}
            >
               {cards.map((card:any) => (
                <MyCard key={card.title} {...card}/>
               ))}
            </Box>
    )
}