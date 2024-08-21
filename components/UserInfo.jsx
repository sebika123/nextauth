"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Container, Typography, Button, Paper, Stack } from "@mui/material";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
 <>
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: '#f5f5f5', // Adjust as needed
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">
          Name: <Typography component="span" fontWeight="bold">{session?.user?.name}</Typography>
        </Typography>
        <Typography variant="h6">
          Email: <Typography component="span" fontWeight="bold">{session?.user?.email}</Typography>
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </Paper>
    </Container>
    
    </>
  );
}
