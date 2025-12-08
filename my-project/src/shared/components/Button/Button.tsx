import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { NovaTransacao } from "../Dialog/Dialog";

export const NewButton = () => {
    return (
        <NovaTransacao/>
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
