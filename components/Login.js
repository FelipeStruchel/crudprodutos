'use client'

import { Button, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!username || !password) {
            alert('Preencha todos os campos');
            return;
        }

        const login = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            usuario: username,
            senha: password
        });

        if(login.status === 200 && login.data.token) {
            Cookies.set('token', login.data.token, { expires: 7 });
            localStorage.setItem('usuario', username);
            router.push('/');
        } else {
            setError(true);
        }
    }

    const onChangeConstructor = (setter) => {
        return (e) => {
            setter(e.target.value);
        }
    }

    const router = useRouter();

    const redirectToCadastro = () => {
        router.push('/cadastro');
    }

    return (
        <div className="h-2/3 w-1/3 flex flex-col items-center justify-center bg-white border-2 border-black rounded-md">
            <Image src="/logo.png" alt="logo" width={200} height={200} />
            <form className="my-16 mx-16" onSubmit={handleLogin}>
                <p className="text-red-500 w-full text-center mb-5">{error ? 'Usuário ou senha inválidos' : ''}</p>
                <TextField label="Usuario" variant="outlined" className="w-full mb-5" onChange={onChangeConstructor(setUsername)}/>
                <TextField label="Senha" variant="outlined" type="password" className="w-full mb-5" onChange={onChangeConstructor(setPassword)} />
                <div className="w-full flex flex-row items-center justify-evenly">
                    <Button variant="contained" color="primary" className="w-1/3" type="submit">Login</Button>
                    <Button variant="contained" color="primary" className="w-1/3" onClick={redirectToCadastro}>Cadastrar</Button>
                </div>
            </form>
        </div>
    )
}