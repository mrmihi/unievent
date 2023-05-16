import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';

const ReviewCard = ({ user, rating, description }) => {
    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Avatar alt="User's photo" src="/path/to/photo.jpg" />
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                            {user}
                        </Typography>
                        <Rating name="rating" value={rating} readOnly />
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </Box>
        </Paper>
    );
};

export default ReviewCard;
