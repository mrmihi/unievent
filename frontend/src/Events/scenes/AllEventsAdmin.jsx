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
import eventService from '../event.service';
import { useState, useEffect } from 'react';
//import SearchBar from './components/SearchBar';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EventPDF from 'Events/pdf/EventPDF';

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

// const Search = (props) => {
//   return <input value={props.keyword} onChange={props.handleKeywordChange} />;
// };

const CustomizedInputBase = (props) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Events."
        inputProps={{ 'aria-label': 'search events' }}
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

export default function AllEventsAdmin() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    eventService.getAll().then((response) => setEvents(response));
  }, []);

  // Search Functionality
  let searchResult;
  if (keyword === '') {
    searchResult = events.map((x) => x);
  } else {
    searchResult = events.filter((event) => {
      const re = new RegExp(`${keyword}`, 'i');
      console.log(event.name.match(re));
      if (event.name.match(re) === null) {
        return false;
      } else {
        return true;
      }
    });
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* <h3>Search 🔍</h3>
      <Search keyword={keyword} handleKeywordChange={handleKeywordChange} /> */}
      <div className="justify-center flex mt-5">
        <CustomizedInputBase
          keyword={keyword}
          handleKeywordChange={handleKeywordChange}
        />
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {' '}
          <EventPDF tableData={searchResult} />
        </Paper>
      </div>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {searchResult.map((event) => (
              <Grid item key={event._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Link to={`/events/${event._id}`}>
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        //pt: '56.25%'
                        pt: '0%',
                      }}
                      image={event.headerImage}
                      alt="random"
                    />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {event.name}
                    </Typography>
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
