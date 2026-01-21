import { Box, Button, Paper, Stack, TextField, Typography, InputAdornment, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SavingsIcon from '@mui/icons-material/Savings';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { loginService } from "../shared/services/post/auth";
import { api } from "../shared/services/api";

export const Login = () => {
    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    
    const [erro, setErro] = useState(false);

    const handleLogin = async () => {
        try{
            setErro(false);
            const data = await loginService(loginInput, senhaInput);

            //salvar token no navegador
            localStorage.setItem('APP_ACCESS_TOKEN', data.token);

            //salvar dados do usuário no navegador
            localStorage.setItem('usuario-logado',JSON.stringify({
                nome: data.usuario.login,
                id: data.usuario.id,
            }));

            //atualiza imediatamente
            api.defaults.headers.Authorization = `Bearer ${data.token}`;

            navigate('/pagina-inicial');
        } catch (error: any) {
            setErro(true);
            alert(error.response?.data?.erro || "Erro no Login.");
        };
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
                            Finance
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#7c7c8a' }}>
                        Faça login para acessar suas contas
                    </Typography>
                </Stack>

                {/* Formulário */}
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="E-mail"
                        variant="outlined"
                        placeholder="exemplo@finance.com"
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
                        placeholder="********"
                        value={senhaInput} 
                        onChange={(e) => setSenhaInput(e.target.value)} 
                        
                        error={erro} 
                        helperText={erro ? "Usuário ou senha inválidos." : ""} 
                        
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
                        onClick={handleLogin}
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
                        ENTRAR
                    </Button>
                </Stack>
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ color: '#7c7c8a' }}>
                        Não tem uma conta? <Link href="/register" underline='hover' style={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}>Registre-se</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};