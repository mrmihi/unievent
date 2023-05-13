import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import API from "../components/api.approval"
import { toast, ToastContainer } from "react-toastify";


function EventManagerView() {
  const { id: eventID } = useParams();
  const boxColor = "#f2f2f2";
  const [error, setError] = useState({})
  const [eventData, setEventData] = useState({})
  const [venueData, setVenueData] = useState({})
  const [resourceData, setResourceData] = useState({})
  const [budgetData, setBudgetData] = useState({})
  const [approvalData, setApprovalData] = useState({})

  const [approvalStatus, setApprovalStatus] = useState()

  useEffect(() => {
    const getEventDetails = async () => {
        await API
        .get(`/events/${eventID}`, { 
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data)
            setEventData(res.data);
          })
        .catch((err) => {
            setEventData({})
            setError(err.response.data);
        });
    };

    const getApprovalDetails = async() => {
        await API
        .get(`approval/events/event/${eventID}`, { 
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data.data[0])
            setApprovalData(res.data.data[0]);
          })
        .catch((err) => {
            setApprovalData({})
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
        });
    }

    const getResourceData = async () =>{

    }

    const getBudgetData = async () => {

    }

    const getVenueData = async () => {

    }




  }, [])

  const handleAddVenueBtn = () => {
    
  }

  return (
    <div className="w-full">
      <Box className="px-8 w-full">
        <Typography id="eventName" variant="h4">Event Name</Typography>
        <Typography id="eventDescription" variant="h6">Description : {"Event Description"}</Typography>
        <Typography id="eventStartTime" variant="h6">Start : {Date().toString()}</Typography>
        <Typography id="eventEndTime" variant="h6">End : {Date().toString()}</Typography>

        <Box className="flex flex-row flex-wrap my-4">
          <Box id="venueBox" width="48%" bgcolor={boxColor} mb="1%" mr="1%"  height={200}
                className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventVenue"  color="secondary">Event Venue</Typography>
              <Typography variant="h6" id="eventVenueStatus" color="secondary">Not Added Yet</Typography>
              <Typography variant="h6" id="eventVenue" color="secondary"></Typography>
              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large">Add Venue</Button>
                <Button variant="outlined" color="secondary" size="large" disabled>Request Approval</Button>
              </Box>
            </div>
          </Box>

          <Box id="Box" width="48%" bgcolor={boxColor}  mb="1%" ml="1%" height={200}
                className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventResource" color="secondary">Event Resources</Typography>
              <Typography variant="h6" id="eventResourceStatus" color="secondary">Not Added Yet</Typography>
              <Typography variant="h6" id="eventResource" color="secondary"></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large">Add Resources</Button>
                <Button variant="outlined" color="secondary" size="large" disabled>Request Approval</Button>
              </Box>
            </div>
          </Box>

          <Box id="budgetBox" width="48%" bgcolor={boxColor}  mt="1%" mr="1%" height={200}
                className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventbudget" color="secondary">Event Budget</Typography>
              <Typography variant="h6" id="eventBudgetStatus" color="secondary">Not Created Yet</Typography>
              <Typography variant="h6" id="eventBudget" color="secondary"></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large">Create Budget</Button>
                <Button variant="outlined" color="secondary" size="large" disabled>Request Approval</Button>
              </Box>
            </div>
          </Box>

          <Box id="approvalBox" width="48%" bgcolor={boxColor}  mt="1%" ml="1%" height={200}
                className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventApproval" color="secondary">Event Approval</Typography>
              <Typography variant="h6" id="eventApprovalStatus" color="secondary">Not Requested Yet</Typography>
              <Typography variant="h6" id="eventApproval" color="secondary"></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large">Fill Request Form</Button>
                <Button variant="outlined" color="secondary" size="large" disabled>Request Approval</Button>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default EventManagerView;
