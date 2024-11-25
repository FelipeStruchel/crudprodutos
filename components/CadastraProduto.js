'use client'

import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function CadastraProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [preco, setPreco] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token')

        const usuario = localStorage.getItem('usuario');

        if (!nome || !quantidade || !preco || !descricao || !imagem) {
            alert('Preencha todos os campos');
            return;
        }

        const produto = {
            nome,
            quantidade,
            preco,
            descricao,
            imagem,
            usuario
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/produtos`, produto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(produto, response.data);

        if (response.status === 200 && response.data._id) {
            alert('Produto cadastrado com sucesso');
            setNome('');
            setQuantidade(0);
            setPreco(0);
            setDescricao('');
            setImagem('');
        }

    };

    return (
        <Container className="mt-10 bg-[#f1f1f1] p-10 border-black border-2 rounded-md w-full">
            <Typography variant="h4" component="h1" className="mb-6 text-center text-black">
                Cadastrar Produto
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box className="mb-4">
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Box>
                <Box className="mb-4">
                    <TextField
                        label="Quantidade"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </Box>
                <Box className="mb-4">
                    <TextField
                        label="Preço"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                </Box>
                <Box className="mb-4">
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Box>
                <Box className="mb-4">
                    <TextField
                        label="URL da Imagem"
                        variant="outlined"
                        fullWidth
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                    />
                </Box>
                <Box className="text-center">
                    <Button variant="contained" color="primary" type="submit" className="bg-blue-500 hover:bg-blue-700">
                        Cadastrar
                    </Button>
                </Box>
            </form>
        </Container>
    );
}