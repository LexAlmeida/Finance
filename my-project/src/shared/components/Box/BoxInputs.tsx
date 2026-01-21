import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { ButtonAction, ButtonRegister } from "../Button/Button";

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
    const [inputs, setInputs] = useState<InputState>({
        nome:'',
        valor:'',
        categoria:''
    });

    const handleCadastro = () => {
        const salvou = onSave(inputs);
        if(isNaN(parseFloat(inputs.valor))){
            alert("Por favor, insira um valor numérico válido para o preço.");
            return;
        }
        if(salvou){
            setInputs({
                nome:'',
                valor:'',
                categoria:'',
            })
        }
        setTipoSelecionado(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id,value} = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [id]: value,
        }));
    };

    return (
        <Box display='flex' flexDirection='column'>
            <TextField 
                variant="filled" 
                fullWidth
                id="nome" 
                label="Descrição"
                value={inputs.nome}
                sx={{mb:'15px'}}
                onChange={handleChange}></TextField>
            <TextField 
                variant="filled" 
                fullWidth
                id="valor"
                label="Preço" 
                value={inputs.valor}
                sx={{mb:'15px'}}
                onChange={handleChange}></TextField>
            <TextField 
                variant="filled" 
                fullWidth
                id="categoria" 
                label="Categoria" 
                sx={{mb:'15px'}}
                onChange={handleChange} ></TextField>
            <ButtonAction tipoSelecionado={tipoSelecionado} setTipoSelecionado={setTipoSelecionado}/>
            <ButtonRegister handleCadastro={handleCadastro}/>
        </Box>
    )
}