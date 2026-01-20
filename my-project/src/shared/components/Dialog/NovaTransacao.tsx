
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { BoxInputs } from '../Box/BoxInputs';
import { createTransaction } from '../../services/post/transactions';

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

            onSuccess(); // Recarrega a lista de transações no componente pai
            handleClickClose();
            return true;
        } catch (error) {
            console.error("Erro ao salvar a transação:", error);
            alert("Erro ao salvar no servidor.");
            return false;
        }
    };
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
                    sx: {backgroundColor: 'background.default', borderRadius: '6px', minWidth: '450px', p: 2}
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