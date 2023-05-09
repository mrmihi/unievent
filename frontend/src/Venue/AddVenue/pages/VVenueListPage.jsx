import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const VVenueListPage = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const venues = [
        {
            id: 1,
            name: 'Venue 1',
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Venue+1',
            description: 'This is the first venue',
        },
        {
            id: 2,
            name: 'Venue 2',
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Venue+2',
            description: 'This is the second venue',
        },
        {
            id: 3,
            name: 'Venue 3',
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Venue+3',
            description: 'This is the third venue',
        },
    ];

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
                        <Grid item xs={12} sm={6} md={4} key={venue.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardActionArea component={Link} to={`/venue/list/${venue.id}`}>
                                    <CardMedia component="img" image={venue.imageUrl} alt={venue.name} />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {venue.name}
                                        </Typography>
                                        <Typography>{venue.description}</Typography>
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
