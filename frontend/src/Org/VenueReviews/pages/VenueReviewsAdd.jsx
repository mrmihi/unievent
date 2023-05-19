import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import FlexBetween from 'Org/components/FlexBetween';
import Header from 'Org/components/Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VenuesReviewsAdd = () => {
    const navigate = useNavigate();

    const [venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewError, setReviewError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const organizerId = Cookies.get('org_id');

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/venues/eligible/${organizerId}`)
            .then((response) => {
                setVenues(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleVenueClick = (venue) => {
        setSelectedVenue(venue);
        setOpenDialog(true);
    };

    const handleReviewSubmit = () => {
        // Validate rating and review fields
        if (rating === 0) {
            setRatingError(true);
        } else {
            setRatingError(false);
        }

        if (reviewText.trim() === '') {
            setReviewError(true);
        } else {
            setReviewError(false);
        }

        if (rating !== 0 && reviewText.trim() !== '') {        
            axios.post("http://localhost:5000/api/reviews", {
                venue: selectedVenue.venue._id,
                rating: rating,
                review: reviewText,
                manager: selectedVenue.venue.manager,
                event: selectedVenue.event._id,
                booking: selectedVenue._id,
            }, {   
                headers: {
                    Authorization: `Bearer ${Cookies.get("org_accessToken")}`,
                },
            }).then((response) => {
                axios.put(`http://localhost:5000/api/bookings/${selectedVenue._id}`, {
                    review: true,
                }).then((response) => {
                    toast.success("Review added successfully");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }).catch((err) => {
                    toast.error("Error while adding review");
                });
            }).catch((err) => {
                toast.error("Error while adding review");
            });
            
            setSelectedVenue(null);
            setRating(0);
            setReviewText('');
            setOpenDialog(false);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
                    <Header title="Venue Reviews" />
                </FlexBetween>
                <Box mt={3}>
                    <Button variant="contained" color="primary" style={{ marginTop: '10px', marginRight: '5px' }} onClick={() => navigate("/org/dashboard/venues/reviews")} >Not Reviewed</Button>
                    <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => navigate("/org/dashboard/venues/reviews/added")} >Reviewed</Button>
                </Box>
            </div>
            <Box mt={3}>
                <Typography variant="h4" gutterBottom>
                    Available Venues for Adding Review
                </Typography>
                <Box display="flex" flexWrap="wrap">
                    {venues.length === 0 ? (
                        <Typography variant="body1">No venues available for review.</Typography>
                    ) : (
                        venues.map((venue) => (
                            <Card key={venue._id} style={{ width: '300px', margin: '10px' }}>
                                <CardContent>
                                <Typography variant="h5">Event Name: {venue.event.name}</Typography>
                                    <Typography variant="h6">Venue Name: {venue.venue.name}</Typography>
                                    <Typography variant="body1">Venue Location: {venue.venue.location}</Typography>
                                    <img
                                        src={venue.venue.image_url}
                                        alt={venue.venue.image_url}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover', marginTop: '10px' }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '10px' }}
                                        onClick={() => handleVenueClick(venue)}
                                    >
                                        Add Review
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>
            </Box>

            {selectedVenue && (
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                >
                    <DialogTitle variant='h4'>Add A Review</DialogTitle>
                    <DialogContent style={{ width: '600px', height: '250px' }} >
                        <Box mt={2}>
                            <Typography variant="body1" mb={1}>Rating:</Typography>
                            <Rating
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                    setRatingError(false);
                                }}
                            />
                            {ratingError && (
                                <Typography variant="body2" color="error">
                                    Please select a rating
                                </Typography>
                            )}
                        </Box>
                        <Box mt={2}>
                            <Typography variant="body1" mb={1}>Review:</Typography>
                            <TextField
                                multiline
                                rows={4}
                                variant="outlined"
                                label="Review"
                                fullWidth
                                value={reviewText}
                                onChange={(e) => {
                                    setReviewText(e.target.value);
                                    setReviewError(false);
                                }}
                            />
                            {reviewError && (
                                <Typography variant="body2" color="error">
                                    Please enter a review
                                </Typography>
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
                            Submit Review
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <ToastContainer />
        </Box>
    );
};

export default VenuesReviewsAdd;
