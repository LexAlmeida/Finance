import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, type SxProps, type Theme } from "@mui/material"
import { useState, type ReactNode } from "react";
import { BoxInputs } from '../Box/Box';

interface IBotoesDialog {
    title: string,
    onClick?: () => void,
    sx?: SxProps<Theme>,
    startIcon?: ReactNode;
}

const BotoesDialog = ({title, onClick, sx, startIcon}: IBotoesDialog) => {
    return (
        <Button onClick={onClick} sx={sx} startIcon={startIcon}>
            {title}
        </Button>
    )
}

export const NovaTransacao = () => {
    const [open, setOpen] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState<"entrada"|"saida">("entrada");
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);
    
    return (
    <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} sx={{
            padding:"15px"
        }}>
            Nova transação
        </Button>
        <Dialog 
            open={open} 
            onClose={handleClickClose}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: 'background.default',
                        borderRadius: '6px',
                        minWidth: '450px',
                        p: 2
                    }
                }
            }}>
            <IconButton 
                onClick={handleClickClose}  
                sx={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    right: '16',
                    top: '16',
                    p: 0,
                    color: 'text.primary'
                }}>
                <CloseIcon/>
            </IconButton>

            <DialogTitle sx={{
                mb:1,
                fontWeight: 'bold',
                color: 'text.secondary'
            }}>
                Nova Transação
            </DialogTitle>  
            <DialogContent>
                <Stack >
                    <BoxInputs/>
                    <Box display='grid' gridTemplateColumns="1fr 1fr" gap={2} mt={1} >
                        <BotoesDialog 
                            onClick={() => {setTypeTransaction('entrada')}}
                            title="Entrada"
                            sx={{
                                bgcolor: typeTransaction === 'entrada' ? 'primary.dark' : '#29292e',
                                color: typeTransaction === 'entrada' ? 'text.secondary' : 'text.primary',
                                py: 2,
                                borderRadius: '6px',
                                textTransform: 'none',
                                '&:hover':{
                                    bgcolor: typeTransaction === 'entrada' ? 'primary.main' : 'background.paper'
                                }
                            }}
                            startIcon={<ArrowCircleUpIcon sx={{color: typeTransaction === 'entrada' ? 'text.secondary' : 'primary.main'}}/>}
                            />
                        <BotoesDialog 
                            onClick={() => {setTypeTransaction('saida')}}
                            title="Saída"
                            sx={{
                                bgcolor: typeTransaction === 'saida' ? 'secondary.dark' : '#29292e',
                                color: typeTransaction === 'saida' ? 'text.secondary' : 'text.primary',
                                py: 2,
                                borderRadius: '6px',
                                textTransform: 'none',
                                '&:hover':{
                                    bgcolor: typeTransaction === 'saida' ? 'secondary.main' : 'background.paper'
                                }
                            }}
                            startIcon={<ArrowCircleDownIcon sx={{color: typeTransaction === 'saida' ? 'text.secondary' : 'secondary.main'}}/>}
                            />
                    </Box>     
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{mt:2, py:1.5, fontWeight:'bold', borderRadius:'6px', textTransform:'none'}}   
                    >Cadastrar</Button>
                     
                </Stack>
                
            </DialogContent>
        </Dialog>
    </>
    )
}