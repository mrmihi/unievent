import {
  Grid,
  Container,
  Button,
  Typography,
  Rating,
  ButtonGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import React, { useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const VViewVenueProfile = () => {
  const { id } = useParams();
  const { vid } = useParams();

  const [venue, setVenue] = useState({});
  const [reviews, setReviews] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [averageRating, setAverageRating] = useState(0);
  const [randomVenues, setRandomVenues] = useState([]);

  useEffect(() => {
    // Fetch subscription status
    axios
      .get(`http://localhost:5000/api/subscribe/venue/${id}`)
      .then((res) => {
        console.log(res.data.venueSubscriptions.active);
        setSubscribed(res.data.venueSubscriptions.active);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRequestQuote = () => {
    // Handle quotation request
  };

  const handleSubscribe = () => {
    const newSubscribedStatus = !subscribed;
    try {
      if (newSubscribedStatus) {
        axios
          .post(`http://localhost:5000/api/subscribe/venue/${id}`, {
            organizer: Cookies.get('org_id'),
          })
          .then((res) => {
            toast.success('Subscribed successfully!');
          })
          .catch((err) => {
            toast.error('Something went wrong!');
          });
      } else {
        axios
          .post(`http://localhost:5000/api/subscribe/venue/${id}`, {
            organizer: Cookies.get('org_id'),
          })
          .then((res) => {
            toast.success('Unsubscribed successfully!');
          })
          .catch((err) => {
            toast.error('Something went wrong!');
          });
      }
      setSubscribed(newSubscribedStatus);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch venue details
    axios
      .get(`http://localhost:5000/api/venues/${id}`)
      .then((res) => {
        console.log(res.data);
        setVenue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Fetch venue reviews
    axios
      .get(`http://localhost:5000/api/reviews/venue/${id}`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
        const average =
          res.data.reduce((acc, review) => acc + review.rating, 0) /
          res.data.length;
        setAverageRating(average);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // get all venues
    axios
      .get('http://localhost:5000/api/venues')
      .then((res) => {
        const random = res.data
          .sort(() => Math.random() - Math.random())
          .slice(0, 3);
        setRandomVenues(random);
        console.log(random);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const buttonColor = subscribed ? 'error' : 'success';
  const buttonText = subscribed ? 'Subscribed' : 'Subscribe';

  return (
    <Container className="mt-20">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <img
            className="w-full object-cover object-center rounded-lg shadow-lg"
            src={venue.image_url}
          />
        </Grid>
        <Grid item xs={4}>
          <div className="flex flex-col justify-between h-full">
            <div className="mt-20">
              <Typography variant="h2">Name: {venue.name}</Typography>
              <Typography variant="h5">Location: {venue.location}</Typography>
              <Typography variant="h5">Price: {venue.price}</Typography>
              <Rating
                name="rating"
                value={averageRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div
              className="space-x-2"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color={buttonColor}
                style={{ marginTop: '1rem' }}
                onClick={handleSubscribe}
              >
                {buttonText}
              </Button>
              <Button
                variant="contained"
                primary
                style={{ marginTop: '1rem' }}
                onClick={handleRequestQuote}
              >
                Request Quote
              </Button>
            </div>
            <div
              className="mt-5 w-3/4"
              style={{ marginTop: '-6rem', marginBottom: '3.5rem' }}
            >
              <Button
                variant="contained"
                className="w-full"
                style={{ marginTop: '1rem' }}
                component={Link}
                to={`/venue/${vid}/book/${id}`}
              >
                Book Venue
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="mt-10"
        style={{ width: '100%' }}
      >
        <Grid container item justifyContent="center">
          <Box sx={{ mt: 2, width: '100%' }}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
              style={{ marginTop: '1rem' }}
            >
              <Button
                onClick={() => handleTabClick('description')}
                className={
                  activeTab === 'description'
                    ? 'MuiButton-containedPrimary'
                    : ''
                }
              >
                Description
              </Button>
              <Button
                onClick={() => handleTabClick('ratings')}
                className={
                  activeTab === 'ratings' ? 'MuiButton-containedPrimary' : ''
                }
              >
                Ratings
              </Button>
              <Button
                onClick={() => handleTabClick('related')}
                className={
                  activeTab === 'related' ? 'MuiButton-containedPrimary' : ''
                }
              >
                Related Venues
              </Button>
            </ButtonGroup>

            {activeTab === 'description' && (
              <Box
                sx={{
                  borderColor: 'grey.500',
                  borderRadius: 1,
                  mt: 2,
                  p: 2,
                  width: '100%',
                }}
              >
                <p className="text-gray-700">{venue.description}</p>
              </Box>
            )}

            {activeTab === 'ratings' && (
              <Box className="mb-10 mt-10">
                {reviews.map((data, index) => (
                  <ReviewCard
                    key={90}
                    user={data.organizer.name}
                    rating={data.rating}
                    description={data.review}
                  />
                ))}
              </Box>
            )}

            {activeTab === 'related' && (
              <Box sx={{ mt: 2, mb: 10 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {randomVenues.map((venue, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardMedia
                              component="img"
                              height="120"
                              image={venue.image_url}
                              alt="Venue image"
                              style={{ height: '200px', width: '100%' }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Name: {venue.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Location: {venue.location}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: {venue.price}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default VViewVenueProfile;
