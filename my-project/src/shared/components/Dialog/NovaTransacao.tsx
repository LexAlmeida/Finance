
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { BoxInputs } from '../Box';
import { createTransaction } from '../../services/transactions';
import AddIcon from '@mui/icons-material/Add';

interface InputState {
    nome: string;
    valor: string; 
    categoria: string;
}
interface NovaTransacaoProps {
    onSuccess: () => void; //recarrega a lista depois do post
}

export const NovaTransacao = ({onSuccess}: NovaTransacaoProps) => {
    const [open, setOpen] = useState(false);
    const [tipoSelecionado, setTipoSelecionado] = useState<'entrada' | 'saida' | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => {
        setOpen(false);
        setTipoSelecionado(null);
    };

    const handleSave = async (inputs: InputState): Promise<boolean> => {
        if(!tipoSelecionado){
            alert("Por favor, selecione o tipo de transação (Entrada ou Saída).");
            return false;
        }
        if(!inputs.nome || !inputs.valor || !inputs.categoria){
            alert("Por favor, preencha todos os campos.");
            return false;
        }
        try {
            await createTransaction({
                nome: inputs.nome,
                valor: Number(inputs.valor),
                categoria: inputs.categoria,
                tipo: tipoSelecionado,
            });

            handleClickClose();

            setTimeout(() => {
                onSuccess(); // Recarrega a lista de transações no componente pai
            }, 500);
            return true;
        } catch (error: any) {
            console.error("Status do erro:", error.response?.status);
            console.error("mensagem do erro:", error.response?.data);
            alert("Erro ao salvar no servidor.");
            return false;
        }
    };
    return (
    <>
            <Button 
                variant='contained' 
                color='primary' 
                onClick={handleClickOpen} 
                sx={{
                    minWidth: isMobile ? 'auto' : '150px',
                    padding: isMobile ? '8px 16px' : '10px 24px'
                }}>
                {isMobile ? <AddIcon/> : 'Nova Transação'}
            </Button>
            <Dialog 
                open={open} 
                onClose={handleClickClose}
                slots={isMobile ? { transition: Slide } : undefined}
                slotProps={{
                    transition: isMobile ? { direction: 'up' } as any : undefined,
                    paper: {
                        sx: {
                            backgroundColor: 'background.default', 
                            borderRadius: isMobile ? '16px 16px 0 0' : '6px', 
                            minWidth: isMobile ? 'unset' : '450px', 
                            width: isMobile ? '100%' : 'auto',
                            m: isMobile ? 0 : 2,
                            p: 1,
                            position: isMobile ? 'fixed' : 'relative',
                            bottom: isMobile ? 0 : 'auto'
                        }
                    }
                }}  
                sx={{
                    '&:MuiDialog-Container': {alignItems: isMobile ? 'flex-end' : 'center'}
                }}
            >
            <IconButton 
                onClick={handleClickClose}  
                sx={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    right: 16,
                    top: 16,
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
                    <BoxInputs 
                        onSave={handleSave} 
                        tipoSelecionado={tipoSelecionado} 
                        setTipoSelecionado={setTipoSelecionado}/>
                </Stack>
                
            </DialogContent>
        </Dialog>
    </>
    )
}