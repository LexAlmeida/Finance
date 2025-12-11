import { Box, TextField } from "@mui/material"
import { ButtonSearch } from "../Button/Button"

export const Search = () => {
    return (
        <Box sx={{
            display:'flex', 
            margin:'25px auto 0 auto', 
            gap:'1%',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            maxWidth:'1120px'}}>
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