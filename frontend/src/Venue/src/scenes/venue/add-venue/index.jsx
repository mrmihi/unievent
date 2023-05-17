import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";

const VAddVenue = () => {
    const [image, setImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        if (image) {
            const imageForm = new FormData();
            imageForm.append("file", image);
            imageForm.append("upload_preset", "co18hzdz");

            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dnwg8kvzj/image/upload", imageForm);
                const image_url = response.data.secure_url;
                await axios.post("http://localhost:5000/api/venues", { ...formData, image_url }, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                });
                toast.success("Venue added successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            toast.error("Please upload an image", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };


    return (
        <Box m="1.5rem 2.5rem">
            <>
                <FlexBetween>
                    <Header
                        title="Add a Venue"
                        subtitle="Welcome to venue adding page"
                    />
                </FlexBetween>
                <Box>
                    <Stack
                        sx={{
                            width: '75%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                            margin: 'auto',
                        }}
                    >
                        <Box
                            component="form"
                            mt={10}
                            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                        >
                            <TextField
                                label="Venue Name"
                                variant="outlined"
                                name="name"
                                {...register("name", { required: true })}
                                error={errors.name}
                                helperText={errors.name && "Venue name is required"}
                            />
                            <TextField
                                label="Location"
                                variant="outlined"
                                name="location"
                                {...register("location", { required: true })}
                                error={errors.location}
                                helperText={errors.location && "Location is required"}
                            />
                            <TextField
                                label="Capacity"
                                variant="outlined"
                                name="capacity"
                                {...register("capacity", { required: true })}
                                error={errors.capacity}
                                helperText={errors.capacity && "Capacity is required"}
                            />
                            <TextField
                                label="Price"
                                variant="outlined"
                                name="price"
                                {...register("price", { required: true })}
                                error={errors.price}
                                helperText={errors.price && "Price is required"}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                name="description"
                                {...register("description", { required: true })}
                                error={errors.description}
                                helperText={errors.description && "Description is required"}
                            />

                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: 'inherit'
                                        }
                                    }}
                                >
                                    Upload Venue Image
                                    <input
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        onChange={(e) => { setImage(e.target.files[0]) }}
                                    />
                                </Button>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={5}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ backgroundColor: "#1769aa", color: "#fff" }}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Add Venue
                                </Button>

                                <Box marginLeft={1}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: "#ff4569", color: "#fff" }}
                                        onClick={() => window.location.reload()}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                    <ToastContainer />
                </Box>
            </>
        </Box>
    );
};

export default VAddVenue;
