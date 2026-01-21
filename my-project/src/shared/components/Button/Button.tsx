import { Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { NovaTransacao } from "../Dialog/NovaTransacao";

interface IButtonAction {
    tipoSelecionado: 'entrada'|'saida'|null;
    setTipoSelecionado: React.Dispatch<React.SetStateAction<'entrada'|'saida'|null>>;
}
interface IButtonRegister {
    handleCadastro: () => void;
}

export const NewButton = ({carregarTransacoes}: {carregarTransacoes: () => void}) => {
    return (
        <NovaTransacao onSuccess={carregarTransacoes}/>
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

export const ButtonAction = ({tipoSelecionado, setTipoSelecionado}: IButtonAction) => {
    const isEntrada = tipoSelecionado === 'entrada';
    const isSaida = tipoSelecionado === 'saida';
    return(
        <Box display='grid' gridTemplateColumns="1fr 1fr" gap={2} mt={1} >
            <Button    
                variant={isEntrada ? "contained" : "outlined"}
                color='success'
                onClick={() => setTipoSelecionado('entrada')}>
                    Entrada
            </Button>
            <Button    
                variant={isSaida ? "contained" : "outlined"}
                color='error'
                onClick={() => setTipoSelecionado('saida')}>
                    Saída
            </Button>
        </Box>
    )
}

export const ButtonRegister = ({handleCadastro}: IButtonRegister) => {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleCadastro}
            fullWidth
            sx={{mt:3}}>
                Cadastrar
        </Button>
    )
}