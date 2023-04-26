import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

const AddVenue = () => {

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        capacity: "",
        description: "",
        price: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            const imageForm = new FormData();
            imageForm.append("file", image);
            imageForm.append("upload_preset", "co18hzdz");

            axios
                .post("https://api.cloudinary.com/v1_1/dnwg8kvzj/image/upload", imageForm)
                .then((res) => {
                    const image_url = res.data.secure_url;
                    // add venue with image url                
                    axios
                        .post("http://localhost:5000/api/venues", { ...formData, image_url }, {
                            headers: {
                                Authorization: `Bearer ${Cookies.get("accessToken")}`,
                            },
                        })
                        .then((response) => {
                            toast.success("Venue added successfully", {
                                position: toast.POSITION.TOP_CENTER,
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        })
                        .catch((error) => {
                            const errorMessage = error.response?.data?.message || error.message;
                            toast.error(errorMessage, {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        });
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || err.message;
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_CENTER,
                    });
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
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                    >
                        <TextField
                            label="Venue Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Location"
                            variant="outlined"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Capacity"
                            variant="outlined"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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

                        <Box display="flex" justifyContent="flex-end" alignItems="center">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: "#1769aa", color: "#fff" }}
                                onClick={handleSubmit}
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
                    <ToastContainer />
                </Box>
            </>
        </Box>
    );
};

export default AddVenue;
