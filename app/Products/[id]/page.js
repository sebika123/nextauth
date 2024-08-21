"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



const items = [
  {
    id: "1",
    name: "First Slide",
    description: "This is the first slide",
    img: "/images/Slide1.jpeg",
  },
  {
    id: "2",
    name: "Second Slide",
    description: "This is the second slide",
    img: "/images/Slide2.jpeg",
  },
  {
    id: "3",
    name: "Third Slide",
    description: "This is the third slide",
    img: "/images/Slide3.jpeg",
  },
];

const ProductDetailPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const productId = pathParts[pathParts.length - 1];
    const foundProduct = items.find((item) => item.id === productId);
    setProduct(foundProduct);
  }, []);

  if (!product) return null;

  return (
    <div>

      <Card sx={{ maxWidth: 345, cursor: "pointer" }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={product.img} alt={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
       
       
         
        
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse  timeout="auto" unmountOnExit>
        <CardContent>
          Esse dolore irure proident magna veniam consectetur voluptate eiusmod proident irure.
        </CardContent>
      </Collapse>
    </Card>


    </div>
  );
};

export default ProductDetailPage;
