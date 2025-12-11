import { Box, TextField } from "@mui/material"
import { useState } from "react"
import { ButtonAction, ButtonRegister } from "../Button/Button";

interface IDivPrincipal {
    children: React.ReactNode
}
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

export const BoxPrincipal = ({children}: IDivPrincipal) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            margin:'0 150px',
            minHeight: '100%'
        }}>
            <Box>
                {children}  
            </Box>             
        </Box>
    )
}

export const BoxInputs = ({onSave, tipoSelecionado, setTipoSelecionado}: IBoxInputs) => {
    const [inputs, setInputs] = useState<InputState>({
        descricao:'',
        preco:'',
        categoria:''
    });

    const handleCadastro = () => {
        const salvou = onSave(inputs);
        if(salvou){
            setInputs({
                descricao:'',
                preco:'',
                categoria:'',
            })
        }
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
                sx={{mb:'15px'}}
                onChange={handleChange}></TextField>
            <TextField 
                variant="filled" 
                fullWidth
                id="preco"
                label="Preço" 
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