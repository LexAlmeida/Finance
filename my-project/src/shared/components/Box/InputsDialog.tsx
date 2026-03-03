import { Box, TextField } from "@mui/material";
import { ButtonAction, ButtonRegister } from "../Button";
import { useForm } from "react-hook-form";

interface IBoxInputs {
    onSave:(inputs: InputState) => Promise<boolean> | boolean;
    tipoSelecionado: 'entrada' | 'saida' | null;
    setTipoSelecionado: React.Dispatch<React.SetStateAction<'entrada'|'saida'|null>>;
}
interface InputState {
    nome:string,
    valor:string,
    categoria:string
}

export const BoxInputs = ({onSave, tipoSelecionado, setTipoSelecionado}: IBoxInputs) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<InputState>({
        defaultValues:{
            nome:'',
            valor:'',
            categoria:''
        }
    });

    const onSubmit = async(data: any) => {
        if(isNaN(parseFloat(data.valor))){
            alert("Por favor, insira um valor numérico válido para o preço.");
            return;
        }

        const salvou = await onSave(data)
        if(salvou){
            reset();
            setTipoSelecionado(null);
        }
    }
    return (
        <Box 
            component='form' 
            onSubmit={handleSubmit(onSubmit)}
            display='flex' 
            flexDirection='column'
        >
            <TextField 
                {...register('nome', {required: 'A Descrição é obrigatória'})}
                variant="filled" 
                fullWidth
                label="Descrição"
                error={!!errors.nome}
                helperText={errors.nome?.message}
                sx={{mb:'15px'}}
            />
            <TextField 
                {...register('valor', {required: 'O Preço é obrigatório'})} 
                variant="filled" 
                fullWidth
                label="Preço" 
                error={!!errors.valor}
                helperText={errors.valor?.message}
                sx={{mb:'15px'}}/>
            <TextField 
                {...register('categoria', {required: 'A Categoria é obrigatória'})}
                variant="filled" 
                fullWidth
                label="Categoria" 
                error={!!errors.categoria}
                helperText={errors.categoria?.message}
                sx={{mb:'15px'}}/>
            <ButtonAction tipoSelecionado={tipoSelecionado} setTipoSelecionado={setTipoSelecionado}/>
            <ButtonRegister/>
        </Box>
    )
}