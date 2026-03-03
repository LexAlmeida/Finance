import { Box, TextField } from "@mui/material"
import { ButtonSearch } from "../Button"
import { useForm } from "react-hook-form";

interface SearchProps {
    setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchFromInputs {
    busca: string
}

export const Search = ({ setFiltro }: SearchProps) => {
    const {register, handleSubmit} = useForm<SearchFromInputs>({
        defaultValues: {
            busca: ''
        }
    });

    const onSubmit = (data: SearchFromInputs) => {
        setFiltro(data.busca);
    }
    return (
        <Box 
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display:'flex', 
                margin:'25px 0 0 0', 
                gap:'1%',
                alignItems:'center',
                justifyContent:'center',
                width:'100%',
            }}>
            <TextField 
                {...register('busca')}
                variant="filled"
                id="buscar-transacao"
                label="Buscar uma transação"
                sx={{flex:'1'}}
            />
            <ButtonSearch/> 
        </Box>
    )
}