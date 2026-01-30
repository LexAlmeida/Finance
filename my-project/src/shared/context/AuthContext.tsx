import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { api } from '../services/api';
import { refreshToken } from '../services/post/auth';

interface AuthContextData {
    isAuthenticated: boolean;
    logout: () => void;
    loginSuccess: (token: string, refreshToken: string, usuario?: any) => void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const logoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const TOTAL_TIME = 1 * 60 * 1000; // 1 min
    const WARNING_TIME = 50 * 1000; // 50 sec

    const clearTimers = () => {
        if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
        if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    };

    const logout = () => {
        clearTimers();
        // Limpeza total
        localStorage.removeItem('APP_ACCESS_TOKEN');
        localStorage.removeItem('APP_REFRESH_TOKEN');
        localStorage.removeItem('usuario-logado');
        localStorage.removeItem('TOKEN_CREATION_TIME');
        
        api.defaults.headers.Authorization = null;
        setIsAuthenticated(false);
        setIsWarningOpen(false);
        navigate('/login');
    };

    const startSessionTimers = (creationTime: number) => {
        clearTimers();
        const now = Date.now();
        const timeElapsed = now - creationTime; // Quanto tempo passou desde o login?

        const timeUntilWarning = WARNING_TIME - timeElapsed;
        const timeUntilLogout = TOTAL_TIME - timeElapsed;

        // Se o token já expirou, desloga na hora
        if (timeUntilLogout <= 0) {
            logout(); 
            return;
        }

        // Timer do Aviso (só agenda se ainda não passou da hora de avisar)
        if (timeUntilWarning > 0) {
            warningTimeoutRef.current = setTimeout(() => setIsWarningOpen(true), timeUntilWarning);
        } else {
            setIsWarningOpen(true);
        }

        // Timer do Logout forçado 
        logoutTimeoutRef.current = setTimeout(() => logout(), timeUntilLogout);
    };

    const loginSuccess = (token: string, refreshToken: string, usuario?: any) => {
        const now = Date.now();
        
        // setItem SOBRESCREVE o antigo automaticamente.
        localStorage.setItem('APP_ACCESS_TOKEN', token);
        localStorage.setItem('APP_REFRESH_TOKEN', refreshToken);
        localStorage.setItem('usuario-logado', JSON.stringify(usuario));
        localStorage.setItem('TOKEN_CREATION_TIME', now.toString());
        
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setIsAuthenticated(true);
        startSessionTimers(now);
    };

    const handleRenewSession = async () => {
        try {
            console.log("Renovando sessão...");
            const {token:newAccessToken, refreshToken:newRefreshToken} = await refreshToken();

            const usuario = JSON.parse(localStorage.getItem('usuario-logado') || '{}');
            loginSuccess(newAccessToken, newRefreshToken, usuario);
            
            setIsWarningOpen(false);
            console.log("Sessão renovada com sucesso.");
        } catch (error) {
            console.error("Falha ao renovar sessão (token expirado ou inválido):", error);
            logout();
        }
    };

    // VERIFICACAO INICIAL (F5)
    useEffect(() => {
        const token = localStorage.getItem('APP_ACCESS_TOKEN');
        const tokenTime = localStorage.getItem('TOKEN_CREATION_TIME');

        if (token && tokenTime) {
            const timeElapsed = Date.now() - Number(tokenTime);
            
            // Se ao abrir a página o token já tiver mais de 5 minutos...
            if (timeElapsed > TOTAL_TIME) {
                logout(); 
            } else {
                // Se ainda for válido, restaura a sessão e liga os timers restantes
                api.defaults.headers.Authorization = `Bearer ${token}`;
                setIsAuthenticated(true);
                startSessionTimers(Number(tokenTime));
            }
        } else {
            // Se não tem token, garante que tá deslogado
            setIsAuthenticated(false);
        }
        
        return () => clearTimers();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, loginSuccess }}>
            {children}
            <Dialog 
                open={isWarningOpen} 
                onClose={() => {}} 
                PaperProps={{
                    sx: { backgroundColor: '#202024', color: '#e1e1e6', border: '1px solid #323238' }
                }}
            >
                <DialogTitle sx={{ color: '#00B37E', fontWeight: 'bold' }}>Sessão Expirando</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#c4c4cc' }}>
                        Você ficou inativo por um tempo. Para segurança, sua sessão será encerrada em breve.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={logout} sx={{ color: '#e1e1e6' }}>Sair</Button>
                    <Button onClick={handleRenewSession} variant="contained" sx={{ bgcolor: '#00B37E', '&:hover': { bgcolor: '#00875F' } }}>
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);