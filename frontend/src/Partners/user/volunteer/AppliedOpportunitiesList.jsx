import {
  Button,
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AppliedOpportunitiesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [registeredData, setRegisteredData] = useState([]);
  const [opportunityData, setOpportunityData] = useState([]);

  const navigate = useNavigate();

  let { userID } = useParams();
  userID = userID.toString();
  console.log(typeof userID);

  const getRegisteredData = async () => {
    try {
      const response = await axios.get(`/api/partners/volunteers/${userID}`);
      console.log(response.data.data);
      setRegisteredData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRegisteredData = async () => {
      setIsLoading(true);
      await getRegisteredData();
      setIsLoading(false);
    };
    fetchRegisteredData();
  }, []);

  useEffect(() => {
    const fetchOpportunityData = async () => {
      try {
        const promises = registeredData.map((data) => {
          console.log(data.opportunityID);
          return axios.get(
            `/api/partners/opportunities/opportunity/${data.opportunityID}`
          );
        });
        const results = await Promise.all(promises);
        console.log('result', results);
        const data = results.map((result) => result.data.data);
        setOpportunityData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOpportunityData();
  }, [registeredData]);

  console.log(registeredData);
  console.log(opportunityData);

  const status = ['Pending', 'Approved', 'Rejected'];

  return (
    <div>
      <div className="mt-12 mb-12 ">
        <Typography variant="h2" textAlign="center">
          Applied Volunteer Opportunities
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
          <div className="grid ml-10 mr-10 grid-cols-2 lg:grid-cols-3 gap-8">
            {registeredData &&
              registeredData?.map((data, index) => {
                const opData = opportunityData[index] || {};
                return (
                  <Card key={index} sx={{ marginBottom: '30px' }}>
                    <CardMedia
                      sx={{ height: 300 }}
                      title={opData.name}
                      image={opData.opportunityImage}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                      >
                        {opData?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        textAlign="center"
                      >
                        {opData.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        textAlign="center"
                        sx={{ marginTop: '20px' }}
                      >
                        <span className="font-bold">Applied On: </span>
                        {opData.date}
                      </Typography>

                      <Box sx={{ width: '100%', marginTop: '20px' }}>
                        <Stepper
                          activeStep={status.indexOf(data.status) + 2}
                          alternativeLabel
                        >
                          <Step>
                            <StepLabel>Applied</StepLabel>
                          </Step>

                          {status.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </Box>
                    </CardContent>

                    <div className="flex items-center justify-around pb-6 pt-4">
                      <Button
                        onClick={() =>
                          navigate(
                            `/event/updateVolunteerApplication/${data._id}`,
                            {
                              state: { volunteer: data },
                            }
                          )
                        }
                        variant="contained"
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
                      <Button
                        onClick={() =>
                          navigate(
                            `/event/appliedOpportunities/schedule/${data.opportunityID}`
                          )
                        }
                        variant="contained"
                        size="small"
                        sx={{
                          padding: 1,
                          maxWidth: '100px',
                          maxHeight: '40px',
                          minWidth: '100px',
                          minHeight: '40px',
                        }}
                      >
                        Schedule
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
export default AppliedOpportunitiesList;
