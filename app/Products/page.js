"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const initialItems = [
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

// const ProductCard = ({ id, name, description, image }) => {
//   const [expanded, setExpanded] = useState(false);
//   const router = useRouter();

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const handleClick = () => {
//     router.push(`/Products/${id}`);
//   };

//   return (
//     <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleClick}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             {name[0]}
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={name}
//         subheader="September 14, 2016"
//       />
//       <CardMedia component="img" height="194" image={image} alt={name} />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {description}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           Esse dolore irure proident magna veniam consectetur voluptate eiusmod proident irure.
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };



const ProductCard = ({ id, name, description, image }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    // Navigate to the dynamic product page
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
  const [items, setItems] = useState(initialItems);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    img: "",
  });
  const [open, setOpen] = useState(false);

  const { data: session } = useSession(); 

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("/api/products");
  //       setItems((prevItems) => [...prevItems, ...response.data.data]);
  //     } catch (error) {
  //       console.error("Error fetching products", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("/api/products");
  //       // Filter out any items that might already exist in the state
  //       const fetchedProducts = response.data.data.filter(
  //         (fetchedProduct) => !items.find(item => item.id === fetchedProduct.id)
  //       );
  //       setItems((prevItems) => [...prevItems, ...fetchedProducts]);
  //     } catch (error) {
  //       console.error("Error fetching products", error);
  //     }
  //   };
  
  //   fetchProducts();
  // }, [items]); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
  
        if (Array.isArray(response.data.data)) {
         
          const fetchedProducts = response.data.data.filter(
            (fetchedProduct) => !items.find(item => item.id === fetchedProduct.id)
          );
          setItems((prevItems) => [...prevItems, ...fetchedProducts]);
        } else {
          console.error("Invalid data format:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
  
    fetchProducts();
  }, [items]); 
  
  
  const handleAddProduct = async () => {
    try {
      const response = await axios.post("/api/products", newProduct);
      const addedProduct = response.data.data;
  
   
      if (!items.find(item => item.id === addedProduct.id)) {
        setItems([...items, addedProduct]);
      }
      
      setNewProduct({ name: "", description: "", img: "" });
      handleClose();
    } catch (error) {
      console.error("Error adding product", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // const handleAddProduct = async () => {
  //   try {
  //     const response = await axios.post("/api/products", newProduct);
  //     setItems([...items, response.data.data]);
  //     setNewProduct({ name: "", description: "", img: "" });
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error adding product", error);
  //   }
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {session ? (
        <>
         <Box >
         <Fab
        
            variant="outlined"
            sx={{border:"1px solid"}}
            aria-label="add"
            size="small"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the details for the new product.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Image URL"
                name="img"
                value={newProduct.img}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary"
                        variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleAddProduct} color="primary" variant="outlined">
                Add Product
              </Button>
            </DialogActions>
          </Dialog>
         </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Please sign in to add products.
        </Typography>
      )}

      <div>
      <Box  display="flex" flexWrap="wrap" justifyContent="space-between" marginBottom={3}>
     
      {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.img}
          />
        ))}
      </Box>
      </div>
    </Box>
  );
};

export default ProductsPage;
