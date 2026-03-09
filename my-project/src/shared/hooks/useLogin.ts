import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginService } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
    const navigate = useNavigate();
    const { loginSuccess } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: any) => {
        try {
            setLoginError(null);
            const response = await loginService(data.email, data.password);

            loginSuccess(response.token, response.refreshToken, response.usuario);
            navigate("/pagina-inicial");
        } catch (error: any) {
            const message = error.response?.data?.erro || "Erro ao realizar o login";
            setLoginError(message);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        loginError,
    };
};