import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OpportunityDetails = () => {
  const { opportunityID } = useParams();
  const [opportunity, setOpportunity] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get(
      `/api/partners/opportunities/opportunity/${opportunityID}`
    );
    setOpportunity(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="flex flex-col w-3/5 md:w-4/5  rounded-lg bg-white shadow-lg  md:flex-row">
        <img
          className="h-96 md:w-3/6 rounded-t-lg  md:rounded-none md:rounded-l-lg"
          src={opportunity?.opportunityImage}
          alt=""
        />
        <div className="flex flex-col justify-start p-6">
          <div className="mb-4 text-xl font-medium text-black">
            <Typography variant="h3" textAlign="center">
              {opportunity?.name}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" textAlign="center">
              {opportunity?.description}
            </Typography>
            <div className="mt-12 flex flex-col items-center justify-start">
              <div className="flex items-center justify-start mb-8">
                <Typography variant="h6" sx={{ marginRight: '10px' }}>
                  Date:
                </Typography>
                <Typography variant="h6">{opportunity?.date}</Typography>
              </div>
              <div className="flex items-center justify-start">
                <Typography variant="h6" sx={{ marginRight: '10px' }}>
                  Time:
                </Typography>
                <Typography variant="h6">{opportunity?.time}</Typography>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button
                onClick={() =>
                  navigate(`/applyAsAVolunteer/${opportunity?._id}`)
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
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OpportunityDetails;
