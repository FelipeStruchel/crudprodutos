'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function EditaProduto({ produto }) {
    const [nome, setNome] = useState(produto.nome);
    const [quantidade, setQuantidade] = useState(produto.quantidade);
    const [preco, setPreco] = useState(produto.preco);
    const [descricao, setDescricao] = useState(produto.descricao);
    const [imagem, setImagem] = useState(produto.imagem);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');

        const updatedProduto = {
            id: produto._id,
            nome,
            quantidade,
            preco,
            descricao,
            imagem,
        };

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/produtos`, updatedProduto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push('/produtos');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const handleDelete = async () => {
        const token = Cookies.get('token');
    
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/produtos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              id: produto._id,
            },
          });
          router.push('/produtos');
        } catch (error) {
          console.error('Erro ao excluir produto:', error);
        }
      };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm" className="mt-10 p-10 border-black border-2 rounded-md" sx={{ backgroundColor: '#f0f0f0' }}>
            <Typography variant="h4" component="h1" className="mb-6 text-center text-black">
                Editar Produto
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
                        type="text"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        InputProps={{
                            inputProps: { min: 0 },
                        }}
                    />
                </Box>
                <Box className="mb-4">
                    <TextField
                        label="Preço"
                        variant="outlined"
                        fullWidth
                        type="text"
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
                        Atualizar
                    </Button>
                </Box>
            </form>
            <Box className="text-center mt-4">
                <IconButton onClick={handleClickOpen}>
                    <DeleteIcon className='text-red-600' />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir esse registro? Essa ação é irreversível!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}