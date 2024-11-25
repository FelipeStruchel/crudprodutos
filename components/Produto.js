import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

export default function Produto({ produto }) {

  const router = useRouter();

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const formataPreco = (preco) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  const handleClick = () => {
    router.push(`/produtos/${produto._id}`);
  }

  return (
    <Card className="max-w-md mx-auto my-4 shadow-lg" sx={{ height: 400, display: 'flex', flexDirection: 'column', width: 300 }} onClick={handleClick}>
      <CardMedia
        component="img"
        height="200"
        image={produto.imagem}
        alt={produto.nome}
        sx={{ objectFit: 'contain', overflow: 'hidden', minHeight: 200, maxHeight: 200 }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="div" className="mb-2">
          {toTitleCase(produto.nome)}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {produto.descricao}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Quantidade: {produto.quantidade}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Preço: {formataPreco(produto.preco)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cadastrado por: {produto.usuario}
        </Typography>
      </CardContent>
    </Card>
  );
}