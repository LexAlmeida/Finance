import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cadastrarUsuario } from "../services/users";
import { useForm } from "react-hook-form";

export const useRegister = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        defaultValues:{
            email: '',
            password:''
        }
    })

    const onSubmit = async (data: any) => {
        try{
            setRegisterError(null);

            await cadastrarUsuario(data.email.trim(), data.password.trim());

            alert("Conta criada com sucesso! Faça login para continuar.");

            navigate('/login');
        } catch (error: any) {
            const message = error.response?.data?.erro || "Erro ao criar conta.";
            setRegisterError(message);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        registerError,
        onSubmit,
    }
}