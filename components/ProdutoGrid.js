import { Grid2 } from '@mui/material';
import Produto from './Produto';

export default function ProdutoGrid({ produtos }) {
  return (
    <Grid2 container spacing={4} className="p-4">
      {produtos.map((produto) => (
        <Grid2 key={produto._id} xs={12} sm={6} md={4}>
          <Produto produto={produto} />
        </Grid2>
      ))}
    </Grid2>
  );
}