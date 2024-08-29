"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box,Typography, TextField, Button, Alert, Stack, Card, CardContent, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
// import ZohoIcon from '@mui/icons-material/Zoho';
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
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
        padding: 3,
        marginTop: 25
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, padding: 3 , border: '1px solid black'}}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="black">
            Login
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { color: 'black' } }} // Black font color
                sx={{ input: { color: 'black' } }} // MUI input styling
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ style: { color: 'black' } }} // Black font color
                sx={{ input: { color: 'black' } }} // MUI input styling
              />
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                fullWidth
           
              >
                 <Typography style={{ color: 'black' }}>
            Login
              </Typography>
              </Button>
              {error && (
                <Alert severity="error" variant="outlined">
                  {error}
                </Alert>
              )}
              <Link href="/register" passHref>
              <Box display="flex" justifyContent="center" alignItems="center" >
            <Typography variant="body2" align="right" >
            Dont have an account? <span style={{ textDecoration: 'underline',color:"blue" }}>Register</span>
            </Typography>
            </Box>
            
              </Link>
            </Stack>
          </form>

          <Stack spacing={2} alignItems="center" mt={4}>
            <Button
              variant="outlined"
              color="primary"
       
              onClick={() => signIn("github")}
            
            >
              <GitHubIcon sx={{ marginRight: 1 }} />
              <Typography style={{ color: 'black' }}>
                Sign in with GitHub
              </Typography>
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => signIn("google")}
             
            >
              <GoogleIcon sx={{ marginRight: 1 }} />
              <Typography style={{ color: 'black' }}>
                Sign in with Google
              </Typography>
            </Button>


            <Button
              variant="outlined"
              color="primary"
       
              onClick={() => signIn("zoho")}
            
            >
              
              {/* <ZohoIcon sx={{ marginRight: 1 }} /> */}
              <Typography style={{ color: 'black' }}>
                Sign in with Zoho
              </Typography>
            </Button>


          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
