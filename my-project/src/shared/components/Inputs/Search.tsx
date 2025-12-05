import { Box, TextField } from "@mui/material"
import { ButtonSearch } from "../Button/Button"

export const Search = () => {
    return (
        <Box sx={{display:'flex'}}>
        <TextField 
        variant="filled"
        id="buscar-transacao"
        label="Buscar uma transação"
        fullWidth
        />
        <ButtonSearch/>
        </Box>
    )
}