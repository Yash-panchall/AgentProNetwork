import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import {
  Container,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CssBaseline,
  Avatar,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useStoreInLocal1 } from '../Store/Auth';


const LoginForm = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
    username: '',
    password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const loginData = {
        username: formData.username,
        password: formData.password
        };

        try {

        const response = await fetch('http://localhost:5000/api/agent/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        console.log('Login Data:', data);

        //Our Own Hook - to store token into Browsers local storage
        useStoreInLocal1(data.token)

        if (response.ok) {
            console.log('Login successful');
            setFormData({ username: '', password: ''})
            navigate('/agent/profile')

        } else {
            console.error('Login failed');
        }
        } catch (error) {
        console.error('Error logging in:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Agent Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    );
    };

export default LoginForm;