"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box,Card,Typography, TextField, Button, Alert, Stack } from "@mui/material";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <Container 
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',

        marginTop: 0
      }}
     
    >
<Card sx={{ width: '100%', maxWidth: 400, padding: 3 , border: '1px solid black'}}>

<Box display="flex" justifyContent="center" alignItems="center" >

<Typography variant="h4" component="h1"  gutterBottom>
        Register
      </Typography>
</Box>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
          >
            Register
          </Button>
          {error && (
            <Alert severity="error" variant="outlined">
              {error}
            </Alert>
          )}
          <Link href="/" passHref>
          <Box display="flex" justifyContent="center" alignItems="center" >
            <Typography variant="body2" align="right" >
              Already have an account? <span style={{ textDecoration: 'underline',color:"blue" }}>Login</span>
            </Typography>
            </Box>
          </Link>
        </Stack>
      </form>
</Card>
    </Container>
  );
}
