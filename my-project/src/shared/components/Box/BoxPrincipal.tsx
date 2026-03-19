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
                margin: '0 auto', 
                padding: { xs: '0 20px', sm: '0 30px', md: '0 0' }, 
                minHeight: '100%',
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