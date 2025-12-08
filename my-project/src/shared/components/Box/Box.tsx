import { Box, TextField } from "@mui/material"

interface IDivPrincipal {
    children: React.ReactNode
}

export const BoxPrincipal = ({children}: IDivPrincipal) => {
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

export const BoxInputs = () => {
    return (
        <Box display='flex' flexDirection='column'>
            <TextField 
                variant="filled" 
                fullWidth
                id="descricao" 
                label="Descrição"
                sx={{mb:'15px'}}></TextField>
            <TextField 
                variant="filled" 
                fullWidth
                type="number"
                id="preco" 
                label="Preço" 
                sx={{mb:'15px'}}></TextField>
            <TextField 
                variant="filled" 
                fullWidth
                id="categoria" 
                label="Categoria" 
                sx={{mb:'15px'}}></TextField>
        </Box>
    )
}