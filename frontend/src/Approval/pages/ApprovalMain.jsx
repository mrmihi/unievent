import { Box, Typography, Button, css, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API from "../components/api.approval";

function ApprovalMain() {
  const { id: eventID } = useParams();
  const [eventApprovalData, setData] = useState({});
  const [error, setError] = useState({});
  const [lic, setLic] = useState({});
  const [licReq, setLicReq] = useState({});
  const [venue, setVenue] = useState({});
  const [venueReq, setVenueReq] = useState({});
  const [budget, setBudget] = useState({});
  const [budgetReq, setBudgetReq] = useState({});
  const [admin, setAdmin] = useState({});
  const [adminReq, setAdminReq] = useState({});
  const [org, setOrg] = useState({});
  const navigate = useNavigate();

  const handleLicApproval = () => {
    toast.info("LIC Approval Request Sent", {
      position: "top-right",
    });
  };

  const boxColor = "#f2f2f2";
  const NotYetSentBtn = "#808080;";
  const SentBtn = "#007bff";
  const ViewedBtn = "#17a2b8";
  const ApprovedBtn = "#28a745";
  const RejectedBtn = "#dc3545";
  const normalBtn = "#007bff";

  const fetchApproval = async () => {
    const fetchRequests = async (requestId, role) => {
      await API.get(`approval/request/${requestId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data.data);
          console.log(res.data.data.requested_to);
          switch (role) {
            case "lic":
              setLicReq(res.data.data);
              break;
            case "budget":
              setBudgetReq(res.data.data);
              break;
            case "admin":
              setAdminReq(res.data.data);
              break;
          }
          setError({});
        })
        .catch((err) => {
          console.log(err.response);
          setLic({});
          setBudget({});
          setAdmin({});
          setError(err.response);
        });
    };

    const fetchOrgDetails = async (orgId) => {
      await API.get(`org/${orgId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          //   console.log(res.data);
          setOrg(res.data);
          setLic(res.data.incharge);
        })
        .catch((err) => {
          setLic({});
          setOrg({});
          console.log(err.response);
        });
    };

    const fetchVenueBookingDetails = async () => {
      await API.get(`booking/${eventID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          setVenueReq(res.data);
        })
        .catch((err) => {
          setVenueReq({});
          console.log(err.response);
        });
    };

    const fetchVenueManagerDetails = async (venueManagerID) => {
      await API.get(`users/${venueManagerID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          setVenue(res.data);
        })
        .catch((err) => {
          setVenue({});
          console.log(err.response);
        });
    };

    await API.get(`approval/event/events/${eventID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setData(res.data.data[0]);
        // console.log(res.data.data[0].event_id);
        // console.log(res.data.data[0].event_id.orgId);
        fetchOrgDetails(res.data.data[0].event_id.orgId);
        if (res.data.data[0].lic_approval != null) {
          fetchRequests(res.data.data[0].lic_approval._id, "lic");
        }

        if (res.data.data[0].budget_approval != null) {
          fetchRequests(res.data.data[0].budget_approval._id, "budget");
        }

        if (res.data.data[0].admin_approval != null) {
          fetchRequests(res.data.data[0].admin_approval._id, "admin");
        }

        fetchVenueBookingDetails();

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

  function getStatus(status) {
    switch (status) {
      case "Not_Yet_Sent":
        return "Not Yet Sent";
      case "Sent":
        return "Sent";
      case "Viewed":
        return "Viewed";
      case "Approved":
        return "Approved";
      case "Rejected":
        return "Rejected";
      default:
        return "Unavailable Status";
    }
  }

  const statusText =
    lic.status === "Not_Yet_Sent"
      ? NotYetSentBtn
      : lic.status === "Sent"
      ? SentBtn
      : lic.status === "Viewed"
      ? ViewedBtn
      : lic.status === "Approved"
      ? ApprovedBtn
      : lic.status === "Rejected"
      ? RejectedBtn
      : normalBtn;

  const handleAddAdminBtn = () => {
    navigate(`/admin/list/${eventID}`);
  };
  const handleAddStaffBtn = () => {
    navigate(`/staff/list/${eventID}`);
  };

  useEffect(() => {
    fetchApproval();
  }, [eventID]);

  return (
    <div className="w-full">
      <ToastContainer />
      <Box className="px-8 w-full">
        <Typography id="eventName" variant="h2">
          Event Approval Request Form
        </Typography>

        <Box className="flex flex-row flex-wrap my-4">
          <Box
            id="licBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h3" id="licApproval" fontWeight="bold">
                {lic._id != null ? lic.name : "Not Added Yet"}
              </Typography>
              <Typography variant="h5">Lecturer-In-Charge</Typography>
              <Typography variant="h5">
                {licReq._id != null ? licReq.requested_on : "Not Sent Yet"}
              </Typography>
              {licReq._id != null ? (
                <Typography variant="h5" color={statusText}>
                  {getStatus(lic.status)}
                </Typography>
              ) : null}

              <Box className="flex w-full justify-between flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLicApproval}
                  disabled
                >
                  Send Request
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Appointment
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="venueBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h3" id="venueApproval" fontWeight="bold">
                {venue._id != null ? venue.name : "Not Added Yet"}
              </Typography>
              <Typography variant="h5">Venue Manager</Typography>
              <Typography variant="h5">
                {venueReq._id != null ? venueReq.createdAt : "Not Sent Yet"}
              </Typography>
              {venueReq._id != null ? (
                <Typography variant="h5" color={statusText}>
                  {venueReq.booking_status}
                </Typography>
              ) : null}

              <Box className="flex w-full justify-between flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Make Payment
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Appointment
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="budgetBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              {budget._id != null ? (
                <Typography variant="h3" fontWeight="bold">
                  {budget.name}
                </Typography>
              ) : (
                <div className="flex flex-row justify-between">
                  <Typography variant="h3" fontWeight="bold">
                    Not Added Yet
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleAddStaffBtn}
                  >
                    Add
                  </Button>
                </div>
              )}

              <Typography variant="h5">Budget Approval</Typography>
              <Typography variant="h5">
                {budgetReq._id != null
                  ? budgetReq.requested_on
                  : "Not Sent Yet"}
              </Typography>
              {budgetReq._id != null ? (
                <Typography variant="h5" color={statusText}>
                  {getStatus(budget.status)}
                </Typography>
              ) : null}

              <Box className="flex w-full justify-between flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Send Request
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Appointment
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="adminBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              {admin._id != null ? (
                <Typography variant="h3" fontWeight="bold">
                  {admin.name}
                </Typography>
              ) : (
                <div className="flex flex-row justify-between">
                  <Typography variant="h3" fontWeight="bold">
                    Not Added Yet
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleAddAdminBtn}
                  >
                    Add
                  </Button>
                </div>
              )}

              <Typography variant="h5">Admin</Typography>
              <Typography variant="h5">
                {adminReq._id != null ? adminReq.requested_on : "Not Sent Yet"}
              </Typography>
              {adminReq._id != null ? (
                <Typography variant="h5" color={statusText}>
                  {getStatus(admin.status)}
                </Typography>
              ) : null}

              <Box className="flex w-full justify-between flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Send Request
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Appointment
                </Button>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ApprovalMain;
