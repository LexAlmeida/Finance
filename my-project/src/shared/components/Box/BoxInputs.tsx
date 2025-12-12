import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { ButtonAction, ButtonRegister } from "../Button/Button";

interface IBoxInputs {
    onSave:(inputs: InputState) => boolean;
    tipoSelecionado: 'entrada' | 'saida' | null;
    setTipoSelecionado: React.Dispatch<React.SetStateAction<'entrada'|'saida'|null>>;
}
interface InputState {
    descricao:string,
    preco:string,
    categoria:string
}

export const BoxInputs = ({onSave, tipoSelecionado, setTipoSelecionado}: IBoxInputs) => {
    const [inputs, setInputs] = useState<InputState>({
        descricao:'',
        preco:'',
        categoria:''
    });

    const handleCadastro = () => {
        const salvou = onSave(inputs);
        if(isNaN(parseFloat(inputs.preco))){
            alert("Por favor, insira um valor numérico válido para o preço.");
            return;
        }
        if(salvou){
            setInputs({
                descricao:'',
                preco:'',
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
                id="descricao" 
                label="Descrição"
                value={inputs.descricao}
                sx={{mb:'15px'}}
                onChange={handleChange}></TextField>
            <TextField 
                variant="filled" 
                fullWidth
                id="preco"
                label="Preço" 
                value={inputs.preco}
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