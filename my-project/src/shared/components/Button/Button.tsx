import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { NovaTransacao } from "../Dialog";

interface IButtonAction {
    tipoSelecionado: 'entrada'|'saida'|null;
    setTipoSelecionado: React.Dispatch<React.SetStateAction<'entrada'|'saida'|null>>;
}

export const NewButton = ({carregarTransacoes}: {carregarTransacoes: () => void}) => {
    return (
        <NovaTransacao onSuccess={carregarTransacoes}/>
    )
}

export const ButtonSearch = () => {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Button type='submit' startIcon={<SearchIcon/>}>
            {isMobile ? "" : 'Buscar'}
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

export const ButtonRegister = () => {
    return (
        <Button
        type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{mt:3}}>
                Cadastrar
        </Button>
    )
}