import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";
import { BoxInputs } from '../Box/Box';

interface INovaTransacao {
    title: string, 
    icon: string
}
interface IICon {
    icon: string,
    onClick: () => void
}
const IconMap: {[key: string]: React.ElementType} = {
    arrowUp: ArrowCircleUpIcon,
    arrowDown: ArrowCircleDownIcon,
    close: CloseIcon
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
const BotaoClose = ({icon, onClick}: IICon) => {
    const IconComponent = IconMap[icon]
    return(
        <Button onClick={onClick}>
            <IconComponent/>
        </Button>
    )
}

export const NovaTransacao = () => {
    const [open, setOpen] = useState(false);
    function handleClickOpen() {
        setOpen(true);
    }
    function handleClickClose(){
        setOpen(false);
    }
    return (
    <>
        <Button onClick={handleClickOpen}>
            Nova transação
        </Button>
        <Dialog open={open}>
            <Box display='flex'>
                <DialogTitle>Nova Transação</DialogTitle>
                <BotaoClose icon="close" onClick={handleClickClose}/>
            </Box>
            <DialogContent>
                <BoxInputs/>
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