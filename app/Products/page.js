"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

const ProductCard = ({ id, name, description, image }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    router.push(`/Products/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleClick}>
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
      <CardMedia component="img" height="194" image={image} alt={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
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
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          Esse dolore irure proident magna veniam consectetur voluptate eiusmod proident irure.
        </CardContent>
      </Collapse>
    </Card>
  );
};

const ProductsPage = () => {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <div>
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.img}
          />
        ))}
      </div>
    </Box>
  );
};

export default ProductsPage;
