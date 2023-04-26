import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";

const VVenuePage = () => {
    const navigate = useNavigate();
    const id = useParams().id;

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [image_url, setImageUrl] = useState('');

    useEffect(() => {
        const venue = axios.get(`http://localhost:5000/api/venues/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        })
            .then((response) => {
                setName(response.data.name);
                setLocation(response.data.location);
                setCapacity(response.data.capacity);
                setPrice(response.data.price);
                setDescription(response.data.description);
                setImage(response.data.image_url);
                setImageUrl(response.data.image_url);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
        setName(venue.name);
        setLocation(venue.location);
        setCapacity(venue.capacity);
        setPrice(venue.price);
        setDescription(venue.description);
        setImage(venue.image_url);
    }, [id]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleCapacityChange = (e) => setCapacity(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const imageForm = new FormData();
        imageForm.append("file", image);
        imageForm.append("upload_preset", "co18hzdz");
        if (image) {
            axios.post("https://api.cloudinary.com/v1_1/dnwg8kvzj/image/upload", imageForm)
                .then((res) => {
                    const image_url = res.data.secure_url;
                    axios.put(`http://localhost:5000/api/venues/${id}`, {
                        image_url: image_url,
                    }, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                    })
                        .then((response) => {
                            toast.success("Venue image updated successfully", {
                                position: toast.POSITION.TOP_CENTER,
                            });
                            setTimeout(() => {
                                navigate("/admin/venue/venues");
                            }, 2000);
                        }
                        )
                        .catch((error) => {
                            const errorMessage = error.response?.data?.message || error.message;
                            toast.error(errorMessage, {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        }
                        );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/venues/${id}`, {
            name: name,
            location: location,
            capacity: capacity,
            price: price,
            description: description,
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        })
            .then((response) => {
                toast.success("Venue updated successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });
                setTimeout(() => {
                    navigate("/admin/venue/venues");
                }, 2000);
            }
            )
            .catch((error) => {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            );
    };



    const handleGoBack = () => {
        navigate("/admin/venue/venues");
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box>
                <FlexBetween>
                    <Header title="Venue Page" subtitle="" />
                </FlexBetween>
            </Box>

            {/* update venue image */}
            <Box>
                {/* show image */}
                <Box mt={5} mb={5}>
                    <img src={image_url} alt="venue" width="40%" height="40%"/>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }} mt={5} mb={5}>
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
                            onChange={handleImageChange}
                            required
                        />
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#1769aa", color: "#fff" }}
                    onClick={handleImageUpload}
                >
                    Update the venue image
                </Button>
            </Box>




            {/* update other details */}
            <Box>
                <Box
                    component="form"
                    mt={10}
                    sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                    <TextField
                        label="Venue Name"
                        variant="outlined"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder={name ? "" : "Enter venue name"}
                        required
                        error={!name}
                        helperText={!name ? "Venue name is required" : ""}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        name="location"
                        value={location}
                        onChange={handleLocationChange}
                        placeholder={location ? "" : "Enter venue location"}
                        required
                        error={!location}
                        helperText={!location ? "Venue location is required" : ""}
                    />
                    <TextField
                        label="Capacity"
                        variant="outlined"
                        name="capacity"
                        value={capacity}
                        onChange={handleCapacityChange}
                        placeholder={capacity ? "" : "Enter venue capacity"}
                        required
                        error={!capacity}
                        helperText={!capacity ? "Venue capacity is required" : ""}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        name="price"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder={price ? "" : "Enter venue price"}
                        required
                        error={!price}
                        helperText={!price ? "Venue price is required" : ""}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder={description ? "" : "Enter venue description"}
                        required
                        error={!description}
                        helperText={!description ? "Venue description is required" : ""}
                    />

                    <Box display="flex" justifyContent="flex-end" alignItems="center" mt={5} mb={10}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#1769aa", color: "#fff" }}
                            onClick={handleSubmit}
                        >
                            Update the venue
                        </Button>

                        <Box marginLeft={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: "#ff4569", color: "#fff" }}
                                onClick={handleGoBack}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <ToastContainer />
            </Box>
        </Box >
    );
};

export default VVenuePage;
