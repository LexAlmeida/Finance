import { Stack, Pagination, Box } from "@mui/material"; 
import { Cards } from "../shared/components/Cards";
import { BoxPrincipal, Search } from "../shared/components/Box";          
import { TabelaTransacoes } from "../shared/components/Tabela"; 
import { Outlet } from "react-router-dom";
import { useFinance } from "../shared/hooks/useFinance";

export const Finance = () => {
    const {
        transacoesFiltradas,
        transacoesCompletas,
        resumoDados,
        paginaAtual,
        totalPaginas,
        carregarDados,
        handleDeleteTransacao
    } = useFinance();

    return (
        <BoxPrincipal>
            <Outlet />
            
            <Box sx={{
                position: 'sticky',
                top: 0, 
                zIndex: 10,
                bgcolor: 'background.default', 
                pt: 1, 
                pb: 2,
                mt: -2 
            }}>
                <Cards resumo={resumoDados} transacoes={transacoesCompletas} />
                
                <Box sx={{ mt: 2 }}>
                    <Search />
                </Box>
            </Box>

            <TabelaTransacoes 
                transacoes={transacoesFiltradas} 
                onDelete={handleDeleteTransacao} 
            />

            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 2 }}>
                <Pagination 
                    count={totalPaginas || 1} 
                    page={paginaAtual} 
                    onChange={(_, value) => carregarDados(value)} 
                    color="primary"
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'text.secondary', 
                            '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: '#fff'
                            }
                        }
                    }}
                />
            </Stack>
        </BoxPrincipal>
    );
};