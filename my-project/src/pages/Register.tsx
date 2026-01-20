import { Box, Button, Link, Paper, Stack, TextField, Typography, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SavingsIcon from '@mui/icons-material/Savings';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { cadastrarUsuario } from "../shared/services/post/users";


export const Register = () => {
    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [erro, setErro] = useState(false);

    const handleRegister = async () => {
        const loginLimpo = loginInput.trim()
        const senhaLimpa = senhaInput.trim(); 

        if(!loginLimpo || !senhaLimpa){
          alert("Por favor, preencha todos os campos.");
          return;
        }

        try{
            setErro(false);

            await cadastrarUsuario(loginLimpo, senhaLimpa);

            alert("Conta criada com sucesso! Faça login para continuar.");

            navigate('/login');
        } catch (error: any) {
            setErro(true);
            const mensagemErro = error.response?.data?.erro || "Erro ao criar conta.";
            alert(mensagemErro);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#121214', 
                padding: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: 'background.default', 
                    color: '#e1e1e6',
                    borderRadius: '8px',
                    border: '1px solid #323238' 
                }}
            >
                <Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <SavingsIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                        <Typography variant="h4" fontWeight="bold">
                            Criar Conta
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#7c7c8a' }}>
                        Cadastre-se para gerenciar suas finanças
                    </Typography>
                </Stack>

                {/* Formulário */}
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Usuário"
                        variant="outlined"
                        placeholder="Escolha um nome de usuário"
                        value={loginInput} 
                        onChange={(e) => setLoginInput(e.target.value)} 
                        
                        error={erro} 
                        
                        InputLabelProps={{ style: { color: '#7c7c8a' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: erro ? 'secondary.main' : '#00B37E' }} /> 
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#e1e1e6',
                                backgroundColor: '#121214',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#323238' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        variant="outlined"
                        placeholder= "Crie uma senha segura"
                        value={senhaInput} 
                        onChange={(e) => setSenhaInput(e.target.value)} 
                        
                        error={erro} 
                        helperText={erro ? "Não foi possível realizar o cadastro." : ""} 
                        
                        InputLabelProps={{ style: { color: '#7c7c8a' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: erro ? 'secondary.main' : 'primary.main' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#e1e1e6',
                                backgroundColor: '#121214',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#323238' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                            }
                        }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleRegister}
                        sx={{
                            backgroundColor: 'primary.light',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '12px',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}
                    >
                        CADASTRAR
                    </Button>
                </Stack>

                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ color: '#7c7c8a' }}>
                        Já tem uma conta? <Link href="/login" underline="hover" style={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}>Fazer Login</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};