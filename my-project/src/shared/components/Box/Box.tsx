import { Box } from "@mui/material";

interface IDivPrincipal {
    children: React.ReactNode
}

export const BoxPrincipal = ({children}: IDivPrincipal) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            margin:'0 150px',
            minHeight: '100%'
        }}>
            <Box>
                {children}  
            </Box>             
        </Box>
    )
}
