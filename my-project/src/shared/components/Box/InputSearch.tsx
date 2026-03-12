import { Box, TextField } from "@mui/material"
import { ButtonSearch } from "../Button"
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

interface SearchFromInputs {
    busca: string
}

export const Search = () => {
    const {setFiltro} = useContext(FinanceContext)
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