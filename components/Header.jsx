"use client";

import { useSession } from "next-auth/react";
import { Container, Typography, Button, Box } from "@mui/material";
import LoginButton from "./LoginButton";

export default function Header() {
  const { data: session, status } = useSession();

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
        mt: -16,
      }}
    >
      {status === "authenticated" ? (
        <>
          <Typography variant="h4">Welcome,</Typography>
          <Typography variant="h5" fontWeight="bold">
            {session.user.name}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h4">Login to get started</Typography>
          <LoginButton />
        </>
      )}
    </Container>
  );
}
