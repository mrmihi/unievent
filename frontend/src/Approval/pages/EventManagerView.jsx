import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import API from "../components/api.approval";
import { toast, ToastContainer } from "react-toastify";

function EventManagerView() {
  const { id: eventID } = useParams();
  const boxColor = "#f2f2f2";
  const [error, setError] = useState({});
  const [eventData, setEventData] = useState({});
  const [venueData, setVenueData] = useState({});
  const [resourceData, setResourceData] = useState({});
  const [budgetData, setBudgetData] = useState({});
  const [approvalData, setApprovalData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getEventDetails = async () => {
      await API.get(`/events/${eventID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          // console.log(res.data.data)
          setEventData(res.data.data);
        })
        .catch((err) => {
          setEventData({});
          setError(err.response.data);
        });
    };

    const getApprovalDetails = async () => {
      const createApprovalRequest = async () => {
        await API.post(
          `approval/event/`,
          {
            event_id: eventID.toString(),
            status: "Initiated",
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
          .then((res) => {
            // console.log(res.data.data);
            if (res.data.data._id != "") {
              setApprovalData(res.data.data);
            } else {
              toast.error("Could not create a reference to event", {
                position: "top-right",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to create a reference to event", {
              position: "top-right",
            });
          });
      };

      await API.get(`approval/event/events/${eventID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.data[0] != "") {
            // console.log(res.data.data[0]);
            setApprovalData(res.data.data[0]);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setApprovalData({});
          if (err.response.data.data.length == 0) {
            createApprovalRequest();
            toast.error("Create Request", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
    };

    //kavindi
    const getResourceDetails = async () => {};

    //Maleesha
    const getBudgetDetails = async () => {};

    //Sapumal
    const getVenueDetails = async () => {};

    getEventDetails();
    getApprovalDetails();
  }, [eventID]);

  const handleAddVenueBtn = () => {
    navigate(`/venue/list`);
  };
  const handleAddResourceBtn = () => {
    navigate(`/admin/resources`);
  };
  const handleCreateBudgetBtn = () => {
    navigate(`/budget/create/${eventID}`);
  };
  const handleFullApprovalRequestBtn = () => {
    navigate(`/approval/${eventID}`);
  };


  function approvalStatus(status){
    switch (status) {
        case "Initiated":
            return "Initiated"
            case "Draft":
                return "Draft"
        case "LIC_Awaiting":
            return "Request Sent To LIC"
        case "FM_Awaiting":
            return "LIC Approved"
        case "VM_Awaiting":
            return "Budget Approved"
        case "Admin_Awaiting":
            return "Venue Manager Approved"
        case "Approved":
            return "Event Approved"
        case "Rejected":
            return "Rejected"
        default:
            return "Unknown"
        }
    }

  return (
    <div className="w-full">
      <ToastContainer />
      <Box className="px-8 w-full">
        <Typography id="eventName" variant="h2">
          {eventData != null ? eventData.name : "Event Name"}
        </Typography>
        <Typography id="eventDescription" variant="h4">
          {eventData != null ? eventData.description : "Description"}
        </Typography>
        <Typography id="eventDate" variant="h5">
          {eventData != null
            ? String(eventData.startTime).split("T")[0]
            : "Date"}
        </Typography>
        <Typography id="eventStartTime" variant="h5">
          {eventData != null
            ? String(eventData.startTime).split("T")[1]
            : "Start Time"}
        </Typography>
        <Typography id="eventEndTime" variant="h5">
          {eventData != null
            ? String(eventData.endTime).split("T")[1]
            : "End Time"}
        </Typography>

        <Box className="flex flex-row flex-wrap my-4">
          <Box
            id="venueBox" width="48%" bgcolor={boxColor} mb="1%" mr="1%" height={200} 
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventVenue" color="secondary">
                Event Venue
              </Typography>
              <Typography variant="h5" id="eventVenueStatus" color="secondary">
                Not Added Yet
              </Typography>
              <Typography variant="h6" id="eventVenue" color="secondary"></Typography>
              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large" onClick={handleAddVenueBtn} >
                  Add Venue
                </Button>
                <Button variant="outlined" color="secondary" size="large" disabled >
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="Box"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            ml="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventResource" color="secondary">
                Event Resources
              </Typography>
              <Typography
                variant="h5"
                id="eventResourceStatus"
                color="secondary"
              >
                Not Added Yet
              </Typography>
              <Typography
                variant="h6"
                id="eventResource"
                color="secondary"
              ></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleAddResourceBtn}
                >
                  Add Resources
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>

          <Box id="budgetBox" width="48%" bgcolor={boxColor} mt="1%" mr="1%" height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400" >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventbudget" color="secondary">
                Event Budget
              </Typography>
              <Typography variant="h5" id="eventBudgetStatus" color="secondary">
                Not Created Yet
              </Typography>
              <Typography variant="h6"id="eventBudget"color="secondary"></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large" onClick={handleCreateBudgetBtn} >
                  Create Budget
                </Button>
                <Button variant="outlined" color="secondary" size="large" disabled >
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>

          <Box id="approvalBox" width="48%" bgcolor={boxColor} mt="1%" ml="1%" height={200} 
          className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400" >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventApproval" color="secondary">
                Event Approval
              </Typography>
              <Typography variant="h5" id="eventApprovalStatus"color="secondary">
                {approvalData != null ? approvalStatus(approvalData.status) : "Unavailable"}
              </Typography>
              <Typography variant="h6" id="eventApproval" color="secondary"></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button variant="contained" color="secondary" size="large" onClick={handleFullApprovalRequestBtn} >
                  Fill Request Form
                </Button>
                <Button variant="outlined" color="secondary" size="large" disabled>
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default EventManagerView;
