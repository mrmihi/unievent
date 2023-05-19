import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import resourcesService from '../resources.service';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/mrmihi/ITP_WD_B01_G11">
        UniEventPro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const CustomizedInputBase = (props) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Resources"
        inputProps={{ 'aria-label': 'search resources' }}
        value={props.keyword}
        onChange={props.handleKeywordChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

export default function AllResources({ resources }) {
  const { eid } = useParams();
  //const { vid } = useParams();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="relative">
        <Toolbar>
          <ShoppingBagIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Resources
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {resources.map((resource) => (
              <Grid item key={resource._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '0%',
                    }}
                    image={resource.image_url}
                    alt="resource"
                  />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {resource.name}
                    </Typography>
                      <div className="items-center justify-center">
                        <Button
                          variant="contained"
                          className="w-full"
                          component={Link}
                          to={`/resource/${resource._id}/reservation/${eid}`}
                        >
                          Reserve
                        </Button>
                      </div>
            
                  </CardContent>
                  
                </Card>
              </Grid>
              
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
