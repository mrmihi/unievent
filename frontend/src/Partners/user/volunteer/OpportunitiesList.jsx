import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// add a search bar
const CustomizedInputBase = (props) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Opportunities"
        inputProps={{ 'aria-label': 'search opportunities' }}
        value={props.query}
        onChange={props.handleSearch}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

const OpportunitiesList = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [query, setQuery] = useState('');
  const isLoading = false;

  //fetch Opportunities data
  const fetchData = async () => {
    const res = await axios.get(`/api/partners/opportunities/${eventID}`);
    setOpportunitiesData(res.data.data);
  };

  //search function
  let searchResult;
  if (query === '') {
    searchResult = opportunitiesData.map((x) => x);
  } else {
    searchResult = opportunitiesData.filter((opportunity) => {
      const re = new RegExp(`${query}`, 'i');
      console.log(opportunity.name.match(re));
      if (opportunity.name.match(re) === null) {
        return false;
      } else {
        return true;
      }
    });
  }

  //handle the search field
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mb-12">
      <div className="mt-12 mb-12">
        <Typography variant="h2" textAlign="center">
          Volunteer Opportunities
        </Typography>
      </div>
      <div className="text-center">
        <div className="justify-center flex mt-5">
          <CustomizedInputBase query={query} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="flex items-center justify-center mt-12 mb-12">
        {isLoading ? (
          <div className="flex items-center justify-center mt-24">
            <Typography variant="h1" color="initial">
              Loading...
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-5/6">
            {searchResult &&
              searchResult?.map((opportunity) => {
                return (
                  <Card key={opportunity._id} sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      title="green iguana"
                      image={opportunity.opportunityImage}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                      >
                        {opportunity.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        textAlign="center"
                      >
                        {opportunity.description}
                      </Typography>
                    </CardContent>

                    <div className="flex items-center justify-center pb-6 pt-4">
                      <Button
                        onClick={() =>
                          navigate(`/event/opportunity/${opportunity._id}`)
                        }
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          padding: 1,
                          maxWidth: '100px',
                          maxHeight: '40px',
                          minWidth: '100px',
                          minHeight: '40px',
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default OpportunitiesList;
