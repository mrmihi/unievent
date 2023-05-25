import React from "react";
import { Box, Button } from "@mui/material";
import Header from "../../../components/Header"
import FlexBetween from "../../../components/FlexBetween";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Rating } from "@mui/material";
import FileSaver from 'file-saver';

const getDescription = (description) => {
    if (!description) {
        return null;
    }

    const words = description.split(' ');
    const lineBreakInterval = 12; // Number of words before adding a line break
    const lines = [];

    for (let i = 0; i < words.length; i += lineBreakInterval) {
        const lineWords = words.slice(i, i + lineBreakInterval);
        const line = lineWords.join(' ');
        lines.push(line);
    }

    return (
        <div>
            {lines.map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </div>
    );
};

const VVenueProfile = () => {
    const id = useParams().id;
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [venue, setVenue] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/venues/${id}/profile`)
            .then((res) => {
                setVenue(res.data.venue);
                setReviews(res.data.reviews);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, []);

    const handleGoBack = () => {
        navigate("/admin/venue/venues");
    };

    const handleSortByHighest = () => {
        const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
        setReviews(sortedReviews);
    };

    const handleSortByLowest = () => {
        const sortedReviews = [...reviews].sort((a, b) => a.rating - b.rating);
        setReviews(sortedReviews);
    };

    const downloadQRCode = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/venues/qr/${id}`, {
                responseType: 'arraybuffer', // Set the response type to array buffer
            });

            // Get the content type from the response headers
            const contentType = response.headers['content-type'];

            // Create a new blob from the response data and content type
            const blob = new Blob([response.data], { type: contentType });

            // Use the FileSaver.js library to save the blob as a file
            FileSaver.saveAs(blob, `${venue.name}-${venue.location}.png`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box>
                <FlexBetween>
                    <Header title="Venue Profile" subtitle="Welcome to the venue profile" />
                </FlexBetween>
            </Box>

            <Box mt="1rem">
                <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#1769aa", color: "#fff" }}
                    onClick={handleGoBack}>Go back</Button>
                <ToastContainer />
            </Box>
            <Box mt="1rem">
                <Card sx={{ display: "flex", marginBottom: "1.5rem" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: "500px", height: "500px" }}
                        image={venue.image_url}
                        alt={venue.name}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ marginBottom: "0.5rem", fontSize: 18 }}>
                                {venue.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "1rem", fontSize: 18 }}>
                                {venue.location}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "0.5rem", fontSize: 18 }}>
                                Capacity: {venue.capacity}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "0.5rem", fontSize: 18 }}>
                                Price: ${parseFloat(venue.price).toFixed(2)}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "0.5rem", fontSize: 18 }}>
                                Description: {getDescription(venue.description)}
                            </Typography>
                            <Button onClick={downloadQRCode}>Download the Venue QR Code</Button>
                        </CardContent>
                    </Box>

                </Card>
                <Box>
                    <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
                        Reviews
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
                        <Box mt="1rem">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: "#1769aa", color: "#fff", marginRight: "1rem" }}
                                onClick={handleSortByHighest}>Sort by Highest Rating</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: "#1769aa", color: "#fff" }}
                                onClick={handleSortByLowest}>Sort by Lowest Rating</Button>
                            <ToastContainer />
                        </Box>
                    </Box>
                    {reviews.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No reviews yet.
                        </Typography>
                    ) : (
                        reviews.map((review) => (
                            <Card key={review._id} sx={{ marginBottom: "1rem" }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.5rem" }}>
                                        {review.review}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: "0.5rem" }}>
                                        <Rating name="read-only" value={review.rating} readOnly />
                                        <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '0.5rem' }}>
                                            by {review.organizer.name} on {new Date(review.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>
                <Box
                    sx={{
                        padding: "2rem",
                        color: "#000000",
                        fontSize: "1.2rem",
                        position: "relative",
                        bottom: 0,
                        width: "100%",
                        height: "4rem",
                        textAlign: "center",
                        mt: "5rem",
                    }}
                >
                    <Typography variant="body1">
                        &copy; 2023 UniEventPro. All Rights Reserved.
                    </Typography>
                </Box>
            </Box>
        </Box >
    );
};

export default VVenueProfile;
