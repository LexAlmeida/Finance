import { Box, Button, Paper, Stack, TextField, Typography, InputAdornment } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings'; // Ícone de porquinho ou use o seu logo
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export const Login = () => {

    const handleLogin = () => {
        // Lógica futura de login aqui
        console.log("Tentando logar...");
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#121214', // Fundo bem escuro (igual ao fundo da sua tela)
                padding: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: '#202024', // Cinza do card
                    color: '#e1e1e6',
                    borderRadius: '8px',
                    border: '1px solid #323238' // Borda sutil
                }}
            >
                {/* Cabeçalho do Card */}
                <Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <SavingsIcon sx={{ color: '#00B37E', fontSize: 40 }} />
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
                        InputLabelProps={{ style: { color: '#7c7c8a' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: '#00B37E' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#e1e1e6',
                                backgroundColor: '#121214',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#323238' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00B37E' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00B37E' },
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        variant="outlined"
                        placeholder="********"
                        InputLabelProps={{ style: { color: '#7c7c8a' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: '#00B37E' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#e1e1e6',
                                backgroundColor: '#121214',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#323238' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00B37E' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00B37E' },
                            }
                        }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        sx={{
                            backgroundColor: '#00875F', // Verde do botão "Nova Transação"
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '12px',
                            '&:hover': {
                                backgroundColor: '#015F43',
                            }
                        }}
                    >
                        ENTRAR
                    </Button>
                </Stack>

                {/* Rodapé do Card */}
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ color: '#7c7c8a' }}>
                        Não tem uma conta? <span style={{ color: '#00B37E', cursor: 'pointer', fontWeight: 'bold' }}>Registre-se</span>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};