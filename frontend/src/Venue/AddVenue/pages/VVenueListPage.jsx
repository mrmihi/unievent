import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VVenueListPage = () => {
    const [searchText, setSearchText] = useState('');
    const [venues, setVenues] = useState([]);
    const { vid } = useParams();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    // const venues = [
    //     {
    //         id: 1,
    //         name: 'Venue 1',
    //         imageUrl: 'https://via.placeholder.com/300x200.png?text=Venue+1',
    //         description: 'This is the first venue',
    //     },
    //     {
    //         id: 2,
    //         name: 'Venue 2',
    //         imageUrl: 'https://via.placeholder.com/300x200.png?text=Venue+2',
    //         description: 'This is the second venue',
    //     },
    //     {
    //         id: 3,
    //         name: 'Venue 3',
    //         imageUrl: 'https://via.placeholder.com/300x200.png?text=Venue+3',
    //         description: 'This is the third venue',
    //     },
    // ];


    useEffect(() => {
        axios.get('http://localhost:5000/api/venues').then((response) => {
            console.log(response.data);
            setVenues(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Container sx={{ mb: 4 }}>
                <TextField
                    label="Search venues"
                    fullWidth
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </Container>

            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {filteredVenues.map((venue) => (
                        <Grid item xs={12} sm={6} md={4} key={venue._id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardActionArea component={Link} to={`/venue/${vid}/list/${venue._id}`}>
                                <CardMedia component="img" image={venue.image_url} alt={venue.name} style={{ height: '200px', width: '300px' }} />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {venue.name}- {venue.location}
                                        </Typography>
                                        <Typography>Price: {venue.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                                        <Typography>Capacity: {venue.capacity}</Typography>
                                        <Typography >Description: {venue.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
};

export default VVenueListPage;
