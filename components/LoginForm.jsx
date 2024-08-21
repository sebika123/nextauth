// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Container, Typography, TextField, Button, Alert, Stack } from "@mui/material";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (res.error) {
//         setError("Invalid Credentials");
//         return;
//       }

//       router.replace("/dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container
//       component="main"
//       maxWidth="xs"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom>
//         Login
//       </Typography>

//       <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//         <Stack spacing={3}>
//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//           >
//             Login
//           </Button>
//           {error && (
//             <Alert severity="error" variant="outlined">
//               {error}
//             </Alert>
//           )}
//           <Link href="/register" passHref>
//             <Typography variant="body2" align="right">
//               Dont have an account? <span style={{ textDecoration: 'underline' }}>Register</span>
//             </Typography>
//           </Link>
//         </Stack>
//       </form>
//     </Container>
//   );
// }
