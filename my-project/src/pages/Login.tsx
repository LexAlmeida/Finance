import { Box, Button, Paper, Stack, TextField, Typography, InputAdornment, Link } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useLogin } from "../shared/hooks/useLogin";

export const Login = () => {
    const { register, handleSubmit, errors, isSubmitting, loginError } = useLogin();

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
                        <Typography variant="h4" fontWeight="bold">Finance</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#7c7c8a' }}>
                        Faça login para acessar suas contas
                    </Typography>
                </Stack>

                <Stack component='form' onSubmit={handleSubmit} spacing={3}>
                    <TextField
                        fullWidth
                        label="Email"
                        {...register("email", { required: "O email é obrigatório" })}
                        error={!!errors.email || !!loginError}
                        helperText={errors.email?.message as string} 
                        slotProps={{
                            inputLabel:{sx:{color: '#7c7c8a' }},
                            input:{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: (errors.email || loginError) ? 'secondary.main' : '#00B37E' }} /> 
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#e1e1e6',
                                backgroundColor: '#121214',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#323238' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                            }
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        {...register("password", {
                            required: "A senha é obrigatória",
                        })}
                        error={!!errors.password || !!loginError} 
                        helperText={(errors.password?.message as string) || (loginError ? "Usuário ou senha inválidos." : "")} 
                        slotProps={{
                            inputLabel:{sx: { color: '#7c7c8a' }},
                            input:{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: (errors.password || loginError) ? 'secondary.main' : 'primary.main' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#e1e1e6',
                                backgroundColor: '#121214',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#323238' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                            }
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: 'primary.light',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '12px',
                            '&:hover': { backgroundColor: 'primary.dark' }
                        }}
                    >
                        {isSubmitting ? "CARREGANDO..." : "ENTRAR"}
                    </Button>
                </Stack>

                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ color: '#7c7c8a' }}>
                        Não tem uma conta? <Link href="/register" underline='hover' sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}>Registre-se</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};