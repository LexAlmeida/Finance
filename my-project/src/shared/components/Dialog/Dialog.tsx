import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";

interface INovaTransacao {
    title: string, 
    icon: string
}
const IconMap: {[key: string]: React.ElementType} = {
    arrowUp: ArrowCircleUpIcon,
    arrowDown: ArrowCircleDownIcon
}

const BotoesDialog = ({icon, title}: INovaTransacao) => {
    const IconComponent = IconMap[icon];
    return (
            <Button>
                <IconComponent/>
                {title}
            </Button>
    )
}

export const NovaTransacao = () => {
    const [open, setOpen] = useState(false);
    function handleClick() {
        setOpen(true);
    }
    return (
    <>
        <Button onClick={handleClick}>
            Nova transação
        </Button>
        <Dialog open={open}>
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='column'>
                    <TextField variant="filled" id="descricao" label="Descrição" ></TextField>
                    <TextField variant="filled" id="preco" label="Preço" ></TextField>
                    <TextField variant="filled" id="categoria" label="Categoria" ></TextField>
                </Box>
            </DialogContent>
            <DialogActions sx={{justifyContent:'center'}}>
                <Box display='flex' flexDirection='column'>
                    <Box display='flex'>
                        <BotoesDialog icon="arrowUp" title="Entrada"/>
                        <BotoesDialog icon="arrowDown" title="Saída"/>
                    </Box>
                    <Button>Cadastrar</Button>
                </Box>                
            </DialogActions>
        </Dialog>
    </>
    )
}