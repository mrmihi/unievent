import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OpportunitiesList = () => {
  const navigate = useNavigate();
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const isLoading = false;

  const fetchData = async () => {
    const res = await axios.get(
      '/api/partners/opportunities/642e6937973a5984d960f4cd'
    );
    setOpportunitiesData(res.data.data);
    console.log(res.data.data);
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
      <div className="flex items-center justify-center mt-12 mb-12">
        {isLoading ? (
          <div className="flex items-center justify-center mt-24">
            <Typography variant="h1" color="initial">
              Loading...
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {opportunitiesData &&
              opportunitiesData?.map((opportunity) => {
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
                          navigate(
                            `/users/event/opportunity/${opportunity._id}`
                          )
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
