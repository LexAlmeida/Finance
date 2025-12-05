import { Box } from "@mui/material"

interface IDivPrincipal {
    children: React.ReactNode
}

export const DivPrincipal = ({children}: IDivPrincipal) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%'
        }}>
            <Box>
                {children}  
            </Box>             
        </Box>
    )
}