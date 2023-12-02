"use client"
import React from 'react';
import {
  Container,
  Link,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Box,
} from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import GoogleButton from 'react-google-button';

const Signin = () => {
  const { data: session } = useSession();

  return (
    <Container maxWidth="xs" className="mt-10">
      <Paper elevation={5} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mt-3">
          Don't have an account?
          <Link href="/Sign-up" className="ml-1">
            Sign Up here
          </Link>
        </Typography>

     
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember Me"
            />

            <Button
              variant="outlined"
              color="primary"
              fullWidth
             
            >
              Sign In
            </Button>

            <GoogleButton onClick={() => signIn('google', { callbackUrl: '/' })} className="mt-4" />

            <Typography variant="body2" color="textSecondary" className="mt-4">
              <Link href="/forgot-password">Forgot Password?</Link>
            </Typography>
          </Box>
        
      </Paper>
    </Container>
  );
};

export default Signin;
