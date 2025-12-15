import { Box, TextField, Button } from "@mui/material"
import { ButtonSearch } from "../Button/Button" // Seu componente de botão

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
                value={filtro} // <--- Agora controlado pelo estado do Finance
                onChange={(e) => setFiltro(e.target.value)} // <--- Atualiza o estado do Finance
                sx={{flex:'1'}}
            />
            {/* O ButtonSearch pode ser alterado para ser um Button normal com type="submit" */}
            <ButtonSearch/> 
        </Box>
    )
}