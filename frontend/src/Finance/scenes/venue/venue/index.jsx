import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardMedia,
    TextField,
} from "@mui/material";

const Venue = () => {
    const [editMode, setEditMode] = useState(false);
    const [imageSrc, setImageSrc] = useState("https://source.unsplash.com/random/200x200");

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Code to update venue details
        setEditMode(false);
    };

    const handleImageChange = () => {
        // Code to open image picker and update imageSrc state with new image
        setImageSrc("https://source.unsplash.com/random/300x300");
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box>
                <FlexBetween>
                    <Header title="Venues Overview" subtitle="All my venues" />
                </FlexBetween>
                <Card sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Venue Name
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Location
                        </Typography>
                        {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Capacity"
                                    defaultValue="100 guests"
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Facilities"
                                    defaultValue="Audio/Visual equipment, catering facilities"
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Layout"
                                    defaultValue="2 Rooms, Balcony"
                                    margin="normal"
                                />
                                <CardActions>
                                    <Button size="small" type="submit">
                                        Save
                                    </Button>
                                    <Button size="small" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </CardActions>
                            </form>
                        ) : (
                            <Typography variant="body2">
                                Capacity: 100 guests <br />
                                Facilities: Audio/Visual equipment, catering facilities <br />
                                Layout: 2 Rooms, Balcony <br />
                            </Typography>
                        )}
                        <CardActions>
                            {editMode ? (
                                ""
                            ) : (
                                <Button sx={{ color: "#1976d2" }} size="small" onClick={handleEdit}>
                                    Edit
                                </Button>
                            )}
                            <Button sx={{ color: "#f44336" }} size="small">
                                Delete
                            </Button>
                            {editMode ? (
                                ""
                            ) : (
                                <Button sx={{ color: "#000000" }} size="small" onClick={handleImageChange}>
                                    Change Image
                                </Button>
                            )}
                        </CardActions>
                    </CardContent>
                    <CardMedia component="img" sx={{ width: 200 }} image={imageSrc} alt="Venue Image" />
                </Card>
            </Box>
        </Box>
    );
};

export default Venue;
