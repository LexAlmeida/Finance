import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const ButtonNew = () => {
    function handleClick(){
        alert('Botao clicado');
    }
    return (
        <Button onClick={handleClick}>
            Nova transação
        </Button>
    )
}

export const ButtonSearch = () => {
    function handleClick(){
        alert('buscando');
    }
    return (
        <Button onClick={handleClick} startIcon={<SearchIcon/>}>
            Buscar
        </Button>
    )
}