

// export default function Dashboard() {
//   return <UserInfo />;
// }



"use client";

import React, { Suspense, lazy } from "react";
import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader"
import UserInfo from "@/components/UserInfo";

const ProductPage = lazy(() => import("../Products/page"));

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

export default function Dashboard({ id, name, description, img }) {

  const [isLoading, setIsLoading] = useState(true);
 
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);


  return (


    <div>



{isLoading ? (
                <div
                    style={{
                        width: "100px",
                        margin: "auto",
                        marginTop:"300px"
                    }}
                >
                    <Loader />
                </div>
            ) : (
              
               
      <Container>
        {/* <UserInfo /> */}
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome!!!
        </Typography>
        <Carousel>
          {items.map((item, i) => (
            <Box key={i} textAlign="center">
              <Image
                src={item.img}
                width="864"
                height="464"
                alt={item.name}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
      <Link href="/Products" passHref>
        <Box my={4}>
          <Suspense fallback={<div>Loading Product Page...</div>}>
            <ProductPage
              key={id}
              name={name}
              description={description}
              image={img}
            />
          </Suspense>
        </Box>
      </Link>
    </Container>
            )}






    </div>
  );
}
