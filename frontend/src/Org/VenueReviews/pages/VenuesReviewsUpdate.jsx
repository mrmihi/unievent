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
import Swal from 'sweetalert2';

const VenuesReviewsUpdate = () => {
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
            .get(`http://localhost:5000/api/reviews/organizer/${organizerId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("org_accessToken")}`,
                },
            })
            .then((response) => {
                setVenues(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleVenueClick = (review) => {
        setRating(review.rating);
        setReviewText(review.review);

        setRatingError(false);
        setReviewError(false);

        setSelectedVenue(review);
        setOpenDialog(true);
    };

    const handleReviewUpdateSubmit = () => {
        // Validate rating and review fields
        if ((!rating || rating < 1 || rating > 5) && !reviewText.trim()) {
            setRatingError(true);
            setReviewError(true);
        } else if (!rating || rating < 1 || rating > 5) {
            setRatingError(true);
            setReviewError(false);
        } else if (!reviewText.trim()) {
            setRatingError(false);
            setReviewError(true);
        } else {
            setRatingError(false);
            setReviewError(false);

            axios.put(`http://localhost:5000/api/reviews/${selectedVenue._id}`, {
                rating: rating,
                review: reviewText,
            }).then((response) => {
                toast.success('Review updated successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }).catch((err) => {
                console.log(err);
                toast.error('Error updating review!');
            });

            setSelectedVenue(null);
            setRating(0);
            setReviewText('');
            setOpenDialog(false);
        }
    };



    const handleDeleteReview = (review) => {
        const reviewId = review._id;
        const bookingId = review.booking.toString();

        // Display SweetAlert confirmation dialog
        Swal.fire({
            title: 'Delete Review',
            text: 'Are you sure you want to delete this review?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed the deletion

                // delete review from database
                axios.delete(`http://localhost:5000/api/reviews/${reviewId}`)
                    .then((response) => {
                        // update bookings review to false
                        axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
                            review: false
                        })
                            .then((response) => {
                                toast.success('Review deleted successfully!');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);
                            })
                            .catch((err) => {
                                console.log(err);
                                toast.error('Error updating booking!');
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error('Error deleting review!');
                    });

                setSelectedVenue(null);
                setRating(0);
                setReviewText('');
                setOpenDialog(false);
            }
        });
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
                    Already Added Reviews for Venues
                </Typography>
                <Box display="flex" flexWrap="wrap">
                    {venues.length === 0 ? (
                        <Typography variant="body1">You haven't reviewed any venue yet.</Typography>
                    ) : (
                        venues.map((venue) => (
                            <Card key={venue._id} style={{ width: '300px', margin: '10px' }}>
                                <CardContent>
                                    <Typography variant="h5">Event Name: {venue.event.name}</Typography>
                                    <Typography variant="h6">Venue Name: {venue.venue.name}</Typography>
                                    <Typography variant="body1" mb={2}>Venue Location: {venue.venue.location}</Typography>

                                    <Typography variant="body1">My Rating: {venue.rating}</Typography>
                                    <Typography variant="body1">My Review: {venue.review}</Typography>
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
                                        Update Review
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginTop: '10px', marginLeft: '5px', backgroundColor: "#ff4569", color: "#fff" }}
                                        onClick={() => handleDeleteReview(venue)}
                                    >
                                        Delete Review
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
                        <Button variant="contained" color="primary" onClick={handleReviewUpdateSubmit}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <ToastContainer />
        </Box>
    );
};

export default VenuesReviewsUpdate;
