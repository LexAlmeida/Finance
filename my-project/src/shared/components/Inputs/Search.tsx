import { Box, TextField } from "@mui/material"
import { ButtonSearch } from "../Button/Button"

export const Search = () => {
    return (
        <Box sx={{display:'flex', marginTop:'30px', gap:'1rem'}}>
            <TextField 
            variant="filled"
            id="buscar-transacao"
            label="Buscar uma transação"
            sx={{flex:'1'}}
            />
            <ButtonSearch/>
        </Box>
    )
}