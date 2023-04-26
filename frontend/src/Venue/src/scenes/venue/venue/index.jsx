import React, { useState } from "react";
import { Box, Container, Grid, TextField } from "@mui/material";
import VenueComponent from "./VenueComponent"
import Header from "../../../components/Header"
import FlexBetween from "../../../components/FlexBetween";
import axios from "axios";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";

const VVenue = () => {
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/venues")
            .then((response) => setVenues(response.data))
            .catch((error) => console.error(error));
    }, []);


    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/venues/${id}`)
            .then((response) => {
                setVenues(venues.filter((venue) => venue.id !== id));
                toast.success("Venue deleted successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                toast.error("Error deleting venue");
            });
    };

    const handleEdit = (id) => {
        navigate(`/admin/venue/venues/edit/${id}`);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const filteredVenues = venues.filter((venue) => {
        return venue.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header
                    title="Venues"
                    subtitle="Welcome to venue page"
                />
            </FlexBetween>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <TextField
                    id="search"
                    label="Search venues"
                    variant="outlined"
                    size="medium"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: "100%", maxWidth: 600 }}
                />
                {searchTerm &&
                    <Button
                        variant="outlined"
                        onClick={handleClearSearch}
                        sx={{ ml: 1 }}
                        color="primary"
                        style={{ backgroundColor: "#2196f3", color: "#fff" }}
                    >
                        Clear
                    </Button>
                }
            </Box>


            <Container>
                {filteredVenues.length === 0 ? (
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            mt: 10,
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            border: "2px dashed gray",
                            p: 2
                        }}
                    >
                        No venues in the database.
                    </Typography>

                ) : (
                    <Box container spacing={2} mt={5}>
                        {filteredVenues.map((venue) => (
                            <Grid item xs={12} sm={6} md={4} key={venue.id} mb={2}>
                                <VenueComponent
                                    venue={venue}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            </Grid>
                        ))}
                    </Box>
                )}
            </Container>
            <ToastContainer />
        </Box>
    );
};

export default VVenue;
