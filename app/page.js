import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Page() {
  return (
    <Container maxWidth="md" className="text-center">
      <Box>
        <Typography variant="h3" component="h1" className="mb-12">
          Bem-vindo à Banana Store
        </Typography>
        <Typography variant="h6" component="p" className="mb-8">
          Sua loja online de produtos frescos e deliciosas.
        </Typography>
        <Link href="/produtos" passHref>
          <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700">
            Ver Produtos
          </Button>
        </Link>
      </Box>
    </Container>
  );
}