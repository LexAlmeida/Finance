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
            <TextField variant="filled" id="descricao" label="Descrição" ></TextField>
            <TextField variant="filled" id="preco" label="Preço" ></TextField>
            <TextField variant="filled" id="categoria" label="Categoria" ></TextField>
        </Box>
    )
}