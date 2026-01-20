
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import {  useEffect, useState } from "react";
import { BoxInputs } from '../Box/BoxInputs';

interface InputState {
    descricao: string;
    preco: string; 
    categoria: string;
}
interface Transacao {
    id: number;
    descricao: string;
    preco: number;
    categoria: string;
    data: string;
} 
type TipoTransacao = 'entrada' | 'saida';
type LocalStorageKey = 'app-entradas' | 'app-saidas';

const getLocalStorageData = (key: string, defaultValue: Transacao[]): Transacao[] => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as Transacao[]): defaultValue;
}

const setLocalStorageData = (key: string, value: Transacao[]): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const NovaTransacao = () => {
    const [open, setOpen] = useState(false);

    const [saidas, setSaidas] = useState<Transacao[]>(() => (() => getLocalStorageData('app-saidas', []))());
    const [entradas, setEntradas] = useState<Transacao[]>(() => (() => getLocalStorageData('app-entradas', []))());

    const [tipoSelecionado, setTipoSelecionado] = useState<TipoTransacao | null>(null);
 
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => {
        setOpen(false);
        setTipoSelecionado(null);
    };
    
    useEffect(() => {
        setLocalStorageData('app-saidas', saidas);
    }, [saidas]);

    useEffect(() => {
        setLocalStorageData('app-entradas', entradas);
    }, [entradas]);

    const handleSave = (inputs: InputState): boolean => {
        if(!tipoSelecionado){
            alert('Por favor, selecione se é uma entrada ou saída antes de Cadastrar.');
            return false;
        }
        if(!inputs.descricao||!inputs.preco||!inputs.categoria){
            alert("Por favor, preencha todos os campos antes de salvar!");
            return false;
        }

        const novaTransacao: Transacao = {
            id: Date.now(),
            descricao: inputs.descricao,
            preco: parseFloat(inputs.preco),
            categoria: inputs.categoria,
            data: new Date().toLocaleDateString('pt-BR'),
        };

        if(tipoSelecionado === 'saida'){
            setSaidas(prevSaidas => [...prevSaidas, novaTransacao]);
            console.log('Saida registrada:', novaTransacao);
        } else if (tipoSelecionado === 'entrada'){
            setEntradas(prevEntradas => [...prevEntradas, novaTransacao]);
            console.log('Entrada registrada:', novaTransacao);
        }
        setTipoSelecionado(null);
        handleClickClose();
        window.dispatchEvent(new Event('localStorageUpdate'));
        return true;
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