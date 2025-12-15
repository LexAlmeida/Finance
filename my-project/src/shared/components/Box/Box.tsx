import { Box } from "@mui/material";

interface IDivPrincipal {
    children: React.ReactNode
}

export const BoxPrincipal = ({children}: IDivPrincipal) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // Define a largura máxima para alinhar todos os componentes
                maxWidth: '1120px', 
                // Centraliza o bloco na tela
                margin: '0 auto', 
                // Adiciona padding lateral para telas menores (responsividade)
                padding: { xs: '0 20px', sm: '0 30px', md: '0 0' }, 
                minHeight: '100%',
                // Adiciona margem superior para compensar o header
                mt: { xs: 0, sm: -10, md: -15 },
                pt: { xs: 5, sm: 10, md: 12 }, 
            }}
        >
            <Box>
                {children}  
            </Box>             
        </Box>
    )
}