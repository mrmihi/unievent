import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
});

export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // const accessToken = Cookies.get("accessToken");
        // const role = Cookies.get("role");
        // const _id = Cookies.get("id");

    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { email, password } = values;
                const response = await axios.post(
                    "http://localhost:3000/api/users/login",
                    JSON.stringify({ email, password }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                const accessToken = response?.data?.token;
                const role = response?.data?.role;
                const _id = response?.data?._id; 

                
                console.log(response.data);
                console.log(_id); 

                Cookies.set("id", _id, { expires: 1 });
                Cookies.set("accessToken", accessToken, { expires: 1 });
                Cookies.set("role", role, { expires: 1 });

                if (accessToken && role === "accountant") {
                    navigate("/accountant/dashboard");
                }
                else if (accessToken && role === "resource") {
                    navigate("/admin/resources/dashboard");
                }
                else if (accessToken && role === "admin") {
                    navigate("/admin/dashboard");
                } else if (accessToken && role === "student") {
                    navigate("/register");
                }
                else if(accessToken&&role==="staff"){
                    navigate("/staff/dashboard")
                }

            } catch (error) {
                toast.error("Login Failed", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://res.cloudinary.com/da0y8gypt/image/upload/v1681987513/UniEventPro_pdqtqm.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                    }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <Box
                        sx={{
                            my: 16,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                            borderRadius: '10px',
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                            padding: '20px',
                        }}
                    >

                        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Sign In
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                            component="form"
                            onSubmit={formik.handleSubmit}
                            noValidate
                            sx={{ mt: 2 }}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Show Password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 35, mb: 4 }} />
        </ThemeProvider>
    );
}

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="">
                UniEventPro
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}