import React from "react";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import ForwardRequestTo from "../../components/ForwardRequestTo";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import API from "../../components/api.approval";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ApprovalEdit = () => {
  const [eventApprovalData, setData] = useState({});
  const [error, setError] = useState({});
  const { id: eventId } = useParams();
  const [lic, setLic] = useState({});
  const [venue, setVenue] = useState({});
  const [budget, setBudget] = useState({});
  const [admin, setAdmin] = useState({});

  const [venueManagers, setVenueManagers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchData();
    getOptions();
  }, [eventId]);

  const fetchData = async () => {
    const fetchRequest = async (requestId, role) => {
      await API.get(`approval/request/${requestId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          switch (role) {
            case "lic":
              setLic(res.data.data);
              break;

            case "venue":
              setVenue(res.data.data);
              break;

            case "budget":
              setBudget(res.data.data);
              break;
            case "admin":
              setAdmin(res.data.data);
              break;
          }
          setError({});
        })
        .catch((err) => {
          console.log(err.response);
          setLic({});
          setVenue({});
          setBudget({});
          setAdmin({});
          setError(err.response);
        });
    };

    await API.get(`approval/event/events/${eventId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.data[0].lic_approval !== null) {
          fetchRequest(res.data.data[0].lic_approval._id, "lic");
        }

        if (res.data.data[0].venue_approval !== null) {
          fetchRequest(res.data.data[0].venue_approval._id, "venue");
        }

        if (res.data.data[0].budget_approval !== null) {
          fetchRequest(res.data.data[0].budget_approval._id, "budget");
        }

        if (res.data.data[0].admin_approval !== null) {
          fetchRequest(res.data.data[0].admin_approval._id, "admin");
        }
        setError({});
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setData({});
        setError(err.response);
      });
  };

  const getOptions = async () => {
    await axios
      .get("http://localhost:5000/api/users/", {
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
              setVenueManagers((venueManagers) => [
                ...venueManagers,
                user.name,
              ]);
              break;
            case "admin":
              setAdmins((admins) => [...admins, user.name]);
              break;
            case "staff":
              setStaffs((staffs) => [...staffs, user.name]);
              break;
          }
        });
        setError({});
      })
      .catch((err) => {
        setError(err.response.data);
        setAdmins([]);
        setVenueManagers([]);
        setStaffs([]);
      });
  };

  return (
    <div className="border-2 m-2 flex flex-col justify-start items-center align-middle h-4/5 ">
      <ToastContainer />
      <div className="h-1/6 flex items-center">
        <h1 className="text-3xl font-sans">Event Approval Requests </h1>
      </div>

      <div className="w-full flex flex-col items-center flex-wrap">
        <ForwardRequestTo
          to="Lecturer-In-Charge"
          options={staffs}
          approver={lic.requested_to}
          request={lic}
          sentTo={lic.requested_to !== null ? lic.requested_to.name : "Loading"}
        />
        <ForwardRequestTo
          to="Venue Manager"
          options={venueManagers}
          approver={venue.requested_to}
          request={venue}
          sentTo={venue.requested_to !== null ? venue.requested_to.name : "Loading"}
        />
        <ForwardRequestTo
          to="Finance Manager"
          options={staffs}
          approverID={budget.requested_to}
          request={budget}
          sentTo={budget.requested_to !== null ? budget.requested_to.name : "Loading"}
        />
        <ForwardRequestTo
          to="Admin"
          options={admins}
          approverID={admin.requested_to}
          request={admin}
          sentTo={admin.requested_to !== null ? admin.requested_to.name : "Loading"}
        />
      </div>

      <div className="m-2 p-2">
        <Button variant="contained" color="primary">
          Complete Request
        </Button>
      </div>
    </div>
  );
};

export default ApprovalEdit;
