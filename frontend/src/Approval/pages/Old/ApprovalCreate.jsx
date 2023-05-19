import Header from "../../components/layout/Header";
import React from "react";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../components/api.approval";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Request from "../../components/Request";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBeforeUnload,
  unstable_useBlocker as useBlocker,
} from "react-router-dom";

const ApprovalCreate = (props) => {
  const [lic, setLic] = useState(null);
  const [venue, setVenue] = useState(null);
  const [budget, setBudget] = useState(null);
  const [admin, setAdmin] = useState(null);
  const { id: event_id } = useParams();
  const [eventApprovalID, setEventApprovalID] = useState("");

  const [userError, setUserError] = useState({});
  const [venueManagers, setVenueManagers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
  const [isSaved, setIsSaved] = useState(true);

  const getApprovers = async () => {
    await axios
      .get(`http://localhost:5000/api/users/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setVenueManagers([]);
        setAdmins([]);
        setStaffs([]);

        res.data.map((user) => {
          switch (user.role) {
            case "venue":
              setVenueManagers((venueManagers) => [...venueManagers, user]);
              break;
            case "admin":
              setAdmins((admins) => [...admins, user]);
              break;
            case "staff":
              setStaffs((staffs) => [...staffs, user]);
              break;
          }
        });
        setUserError({});
      })
      .catch((err) => {
        setUserError(err.response.data);
      });
  };

  useEffect(() => {
    getApprovers();
    getApprovalRequest();
  }, []);

  function getApproverRequestID(role, id) {
    console.log(id, role);
    switch (String(role).toLowerCase()) {
      case String("Lecturer-In-Charge").toLowerCase():
        setLic(id);
        break;

      case String("Venue Manager").toLowerCase():
        setVenue(id);
        break;

      case String("Budget Approver").toLowerCase():
        setBudget(id);
        break;

      case String("Admin").toLowerCase():
        setAdmin(id);
        break;

      default:
        setLic(null);
        setVenue(null);
        setBudget(null);
        setAdmin(null);
        break;
    }
  }

  const getApprovalRequest = async () => {
    //Get event approval Request id if it exists
    //If it does not exist, create a new one
    const createApprovalRequest = async () => {
      await API.post(
        `approval/event/`,
        {
          event_id: event_id.toString(),
          status: "Initiated",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data._id != "") {
            setEventApprovalID(res.data.data._id);
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

    await API.get(`approval/event/events/${event_id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.data[0]._id != "") {
          setEventApprovalID(String(res.data.data[0]._id));
        }
      })
      .catch((err) => {
        if (err.response.data.data.length == 0) {
          console.log(err.response.data);
          createApprovalRequest();
        } else console.log(err.response.data);
      });
  };


  const handleComplete = async () => {
    const updateRequstsToSend = async (id) => {
      await API.put(
        `approval/request/${id}`,
        {
          status: "Sent",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error("Updating failed", {
            position: "top-right",
          });
        });
    };
    if (lic == null || venue == null || budget == null || admin == null) {
      toast.error("Please save the added Approvers to proceed", {
        position: "top-right",
      });
    } else {
      if (eventApprovalID != "") {
        await API.put(
          `approval/event/${eventApprovalID}`,
          {
            lic_approval: lic,
            venue_approval: venue,
            budget_approval: budget,
            admin_approval: admin,
            status: "Initiated",
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
          .then((res) => {
            console.log(res.data.data.lic_approval);
            updateRequstsToSend(res.data.data.lic_approval)
            updateRequstsToSend(res.data.data.venue_approval)
            updateRequstsToSend(res.data.data.budget_approval)
            updateRequstsToSend(res.data.data.admin_approval)
            toast.success("Approval Request sent successfully", {
              position: "top-right",
            });
            navigate(`/event-draft/${event_id}`);
          })
          .catch((err) => {
            console.log(err.response.data);
            toast.error("Approval Request sending failed", {
              position: "top-right",
            });
          });
      } else {
        getApprovalRequest();
      }
    }
  };

  const navigate = useNavigate();
  const handleSaveDraft = async () => {
    if (eventApprovalID != "") {
      await API.put(
        `approval/event/${eventApprovalID}`,
        {
          status: "Draft",
          lic_approval: lic,
          venue_approval: venue,
          budget_approval: budget,
          admin_approval: admin,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res.data);
          toast.success("Approval Request saved successfully", {
            position: "top-right",
          });
          setIsSaved(true);
          navigate(`/event-draft/${res.data.data._id}`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Approval Request sending failed", {
            position: "top-right",
          });
        });
    } else {
      getApprovalRequest();
    }
  };

  const handleReset = async () => {
    if (eventApprovalID != "") {
      await API.delete(`approval/event/${eventApprovalID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data.data);

          setEventApprovalID("");
          navigate(`/approval/create/${event_id}}`);
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error("Approval Request reset failed", {
            position: "top-right",
          });
        });
    }
  };

  return (
    <div className="m-2 flex flex-col justify-start items-center align-middle h-4/5 ">
      <ToastContainer />
      <div className="h-1/6 flex items-center">
        <h1 className="text-3xl font-sans">Event Approval Requests </h1>
      </div>

      <div className="w-full flex flex-col items-center flex-wrap">
        <Request
          to="Lecturer-In-Charge"
          options={staffs}
          eventApprovalRequestID={eventApprovalID}
          getID={getApproverRequestID}
          shouldISave={setIsSaved}
        />
        <Request
          to="Venue Manager"
          options={venueManagers}
          eventApprovalRequestID={eventApprovalID}
          getID={getApproverRequestID}
          shouldISave={setIsSaved}
        />
        <Request
          to="Budget Approver"
          options={staffs}
          eventApprovalRequestID={eventApprovalID}
          getID={getApproverRequestID}
          shouldISave={setIsSaved}
        />
        <Request
          to="Admin"
          options={admins}
          eventApprovalRequestID={eventApprovalID}
          getID={getApproverRequestID}
          shouldISave={setIsSaved}
        />
      </div>

      <div className="w-1/2 flex flex-row justify-around p-2 m-2">
        <Button variant="outlined" color="primary" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ fontSize: "18px", height: "50px" }}
          onClick={handleComplete}
        >
          Complete & Send Request
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ApprovalCreate;
