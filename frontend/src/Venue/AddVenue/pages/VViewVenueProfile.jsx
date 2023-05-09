import {
    Grid,
    Container,
    Button,
    Typography,
    Rating,
    ButtonGroup,
    Box,
    Avatar,
    Card,
    CardContent,
    CardMedia,
    Paper
} from '@mui/material';
import React, { useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import { Link } from 'react-router-dom';

const VViewVenueProfile = ({ venue }) => {
    // const { name, location, price, ratings, image, description, relatedVenues } = venue;
    const name = 'G1103';
    const location = 'New Building, SLIIT, Malabe.';
    const price = 'LKR: 25000 Per Day';
    const ratings = 4.5;
    const image = 'https://thumbs.dreamstime.com/b/conference-hall-7641763.jpg';
    const description = 'Venue Description';

    const relatedVenues = [
        {
            name: 'Venue Name 1',
            location: 'Venue Location 1',
            price: 'Venue Price 1',
            ratings: 'Venue Ratings 1',
            image: 'https://images.unsplash.com/photo-1616480461415-8e1b5f9b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'Venue Name 2',
            location: 'Venue Location 2',
            price: 'Venue Price 2',
            ratings: 'Venue Ratings 2',
            image: 'https://images.unsplash.com/photo-1616480461415-8e1b5f9b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'Venue Name 1',
            location: 'Venue Location 1',
            price: 'Venue Price 1',
            ratings: 'Venue Ratings 1',
            image: 'https://images.unsplash.com/photo-1616480461415-8e1b5f9b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        }
    ]

    const [subscribed, setSubscribed] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleRequestQuote = () => {
        // Handle quotation request
    };

    const handleSubscribe = () => {
        setSubscribed((prevSubscribed) => !prevSubscribed);
    };

    const buttonColor = subscribed ? 'error' : 'success';
    const buttonText = subscribed ? 'Subscribed' : 'Subscribe';

    return (
        <Container className='mt-20'>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <img className='w-full object-cover object-center rounded-lg shadow-lg' src={image} alt={name} />
                </Grid>
                <Grid item xs={4}>
                    <div className='flex flex-col justify-between h-full'>
                        <div className='mt-20'>
                            <Typography variant='h2'>{name}</Typography>
                            <Typography variant='h5'>{location}</Typography>
                            <Typography variant='h5'>{price}</Typography>
                            <Rating name="rating" value={ratings} precision={0.5} readOnly />
                        </div>
                        <div className='space-x-2' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Button variant="contained" color={buttonColor} style={{ marginTop: '1rem' }} onClick={handleSubscribe}>{buttonText}</Button>
                            <Button variant="contained" primary style={{ marginTop: '1rem' }} onClick={handleRequestQuote}>Request Quote</Button>
                        </div>
                        <div className='mt-5 w-3/4' style={{ marginTop: '-6rem', marginBottom: '3.5rem' }}>
                            <Button 
                                variant="contained" 
                                className='w-full'
                                style={{ marginTop: '1rem' }}
                                component={Link}
                                to={'/venue/book'}
                            >Book Venue</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" className='mt-10' style={{ width: '100%' }}>
                <Grid container item justifyContent="center">
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" style={{ marginTop: '1rem' }}>
                            <Button onClick={() => handleTabClick('description')} className={activeTab === 'description' ? 'MuiButton-containedPrimary' : ''}>
                                Description
                            </Button>
                            <Button onClick={() => handleTabClick('ratings')} className={activeTab === 'ratings' ? 'MuiButton-containedPrimary' : ''}>
                                Ratings
                            </Button>
                            <Button onClick={() => handleTabClick('related')} className={activeTab === 'related' ? 'MuiButton-containedPrimary' : ''}>
                                Related Venues
                            </Button>
                        </ButtonGroup>

                        {activeTab === 'description' && (
                            <Box sx={{ borderColor: 'grey.500', borderRadius: 1, mt: 2, p: 2, width: '100%' }}>
                                <p className="text-gray-700">{description}</p>
                            </Box>
                        )}

                        {activeTab === 'ratings' && (
                            <Box className="mb-10">
                                <ReviewCard key={90} user={"Peter Parker"} rating={5} description={"Nice place"}/>    
                            </Box>
                        )}

                        {activeTab === 'related' && (
                            <Box sx={{ mt: 2, mb: 10 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>Related Venues</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            {/* card 1 */}
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{ height: '100%' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={image}
                                                        alt="Venue image"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">Venue Name</Typography>
                                                        <Typography variant="body2" color="text.secondary">Price</Typography>
                                                        <Rating name="rating" value={4} readOnly />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            {/* card 2 */}
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{ height: '100%' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={image}
                                                        alt="Venue image"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">Venue Name</Typography>
                                                        <Typography variant="body2" color="text.secondary">Price</Typography>
                                                        <Rating name="rating" value={4} readOnly />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            {/* card 3 */}
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{ height: '100%' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={image}
                                                        alt="Venue image"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">Venue Name</Typography>
                                                        <Typography variant="body2" color="text.secondary">Price</Typography>
                                                        <Rating name="rating" value={4} readOnly />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};

export default VViewVenueProfile;
