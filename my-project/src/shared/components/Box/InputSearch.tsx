import { Box, TextField } from "@mui/material"
import { ButtonSearch } from "../Button"

interface SearchProps {
    filtro: string;
    setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = ({ filtro, setFiltro }: SearchProps) => {
    return (
        <Box sx={{
            display:'flex', 
            margin:'25px 0 0 0', 
            gap:'1%',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
        }}>
            <TextField 
                variant="filled"
                id="buscar-transacao"
                label="Buscar uma transação"
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)}
                sx={{flex:'1'}}
            />
            <ButtonSearch/> 
        </Box>
    )
}