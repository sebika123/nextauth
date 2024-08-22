import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';

const ProductDetailPage = async ({ params }) => {
  const { id } = params;
  
 
  const res = await axios.get(`/api/products/${id}`);
  const product = res.data.data;

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Image src={product.img} alt={product.name} style={{ maxWidth: '100%' }} />
      <Typography variant="body1" color="text.secondary" mt={2}>
        {product.description}
      </Typography>
    </Box>
  );
};

export default ProductDetailPage;
