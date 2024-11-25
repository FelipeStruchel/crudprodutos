'use client'

import { Button, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastrar() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Senhas não conferem');
            return;
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registrar`, {
            usuario: username,
            senha: password,
            confirma: confirmPassword
        })

        console.log(response.data);

        if (response.status === 200 && response.data.usuario) {
            const login = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                usuario: username,
                senha: password
            });

            if (login.status === 200 && login.data.token) {
                Cookies.set('token', login.data.token, { expires: 7 });
                localStorage.setItem('usuario', username);
                router.push('/');
            }
        } else {
            alert('Erro ao cadastrar usuário');
        }
    }

    const onChangeConstructor = (setter) => {
        return (e) => {
            setter(e.target.value);
        }
    }

    return (
        <div className="h-2/3 w-1/3 flex flex-col items-center justify-center bg-white border-2 border-black rounded-md">
            <Image src="/logo.png" alt="logo" width={200} height={200} />
            <form className="my-16 mx-16" onSubmit={handleSubmit}>
                <TextField label="Usuario" variant="outlined" className="w-full mb-5" value={username} onChange={onChangeConstructor(setUsername)} />
                <TextField label="Senha" variant="outlined" type="password" className="w-full mb-5" onChange={onChangeConstructor(setPassword)} />
                <TextField label="Confirmação da senha" variant="outlined" type="password" className="w-full mb-5" onChange={onChangeConstructor(setConfirmPassword)} />
                <Button variant="contained" color="primary" className="w-full" type="submit">Cadastrar</Button>
            </form>
        </div>
    )
}