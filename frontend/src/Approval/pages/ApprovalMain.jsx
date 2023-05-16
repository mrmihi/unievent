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
  const [licReq, setLicReq] = useState(null);
  const [venue, setVenue] = useState({});
  const [venueReq, setVenueReq] = useState(null);
  const [venueBooking, setVenueBooking] = useState({});
  const [budget, setBudget] = useState({});
  const [budgetReq, setBudgetReq] = useState(null);
  const [admin, setAdmin] = useState({});
  const [adminReq, setAdminReq] = useState(null);
  const [org, setOrg] = useState({});
  const loggedOrgId = "644557c3276961373d2c608c";
  const [requestNoteLIC, setRequestNoteLIC] = useState("");
  const [requestNoteBudget, setRequestNoteBudget] = useState("");
  const [requestNoteAdmin, setRequestNoteAdmin] = useState("");
  const navigate = useNavigate();

  const handleLicApprovalSendRequest = () => {
    if (requestNoteLIC != "") {
      createApprovalRequest("lic");
    } else {
      toast.error("Add Request Note to proceed", {
        position: "top-right",
      });
    }
  };
  const handleBudgetApprovalSendRequest = () => {
    if (requestNoteBudget != "") {
      createApprovalRequest("budget");
    } else {
      toast.error("Add Request Note to proceed", {
        position: "top-right",
      });
    }
  };
  const handleAdminApprovalSendRequest = () => {
    if (requestNoteAdmin != "") {
      createApprovalRequest("admin");
    } else {
      toast.error("Add Request Note to proceed", {
        position: "top-right",
      });
    }
  };

  const updateEventApproval = async (role, status) => {
    var data = null;
    switch (role) {
      case "venue":
        data = {
          status: status,
          venue_approval: venueReq._id,
        };
        break;

      case "lic":
        data = {
          status: status,
          lic_approval: licReq._id,
        };
        break;

      case "budget":
        data = {
          status: status,
          budget_approval: budgetReq._id,
        };
        break;

      case "admin":
        data = {
          status: status,
          admin_approval: adminReq._id,
        };
        break;
    }

    await API.put(`approval/event/${eventApprovalData._id}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Approval Request sending failed", {
          position: "top-right",
        });
      });
  };

  const createApprovalRequest = async (role) => {
    var data = null;
    switch (role) {
      case "venue":
        data = {
          approval_id: eventApprovalData._id,
          type: "Venue_Request",
          requested_at: venueBooking.created_at,
          requested_to: venue._id,
          requested_by: loggedOrgId,
          status: "Not_Yet_Sent",
        };
        break;

      case "lic":
        data = {
          approval_id: eventApprovalData._id,
          type: "LIC_Request",
          requested_to: lic._id,
          requested_by: loggedOrgId,
          status: "Not_Yet_Sent",
        };
        break;

      case "budget":
        data = {
          approval_id: eventApprovalData._id,
          type: "Budget_Request",
          requested_to: budget._id,
          requested_by: loggedOrgId,
          status: "Not_Yet_Sent",
        };
        break;

      case "admin":
        data = {
          approval_id: eventApprovalData._id,
          type: "Admin_Request",
          requested_to: admin._id,
          requested_by: loggedOrgId,
          status: "Not_Yet_Sent",
        };
        break;
    }

    await API.post(`approval/request/`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        switch (role) {
          case "venue":
            setVenueReq(res.data.data);
            updateEventApproval("venue", "Draft");
            break;

          case "lic":
            setLicReq(res.data.data);
            updateEventApproval("lic", "Draft");
            break;

          case "budget":
            setBudgetReq(res.data.data);
            updateEventApproval("budget", "Draft");
            break;

          case "admin":
            setAdminReq(res.data.data);
            updateEventApproval("admin", "Draft");
            break;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const fetchRequests = async (requestId, role) => {
    await API.get(`approval/request/${requestId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        switch (role) {
          case "lic":
            setLicReq(res.data.data);
            break;
          case "venue":
            setVenueReq(res.data.data);
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

  const fetchVenueBookingDetails = async () => {
    const fetchVenueManagerDetails = async (venueManagerID) => {
      await API.get(`users/${venueManagerID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          setVenue(res.data);
        })
        .catch((err) => {
          setVenue({});
          console.log(err.response);
        });
    };

    await API.get(`bookings/event/${eventID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setVenueBooking(res.data[0]);
        fetchVenueManagerDetails(res.data[0].venue.manager);
        if (eventApprovalData.venue_approval == null) {
          createApprovalRequest("venue");
        }
      })
      .catch((err) => {
        setVenueBooking({});
        console.log(err.response);
      });
  };

  const fetchApproval = async () => {
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

    await API.get(`approval/event/events/${eventID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setData(res.data.data[0]);
        fetchOrgDetails(res.data.data[0].event_id.orgId);

        if (res.data.data[0].lic_approval != null) {
          fetchRequests(res.data.data[0].lic_approval._id, "lic");
        }

        if (res.data.data[0].venue_approval != null) {
          fetchRequests(res.data.data[0].venue_approval._id, "venue");
        }

        if (res.data.data[0].budget_approval != null) {
          fetchRequests(res.data.data[0].budget_approval._id, "budget");
        }

        if (res.data.data[0].admin_approval != null) {
          fetchRequests(res.data.data[0].admin_approval._id, "admin");
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

  const handleAddAdminBtn = () => {
    navigate(`/admin/list/${eventID}`);
  };
  const handleAddStaffBtn = () => {
    navigate(`/staff/list/${eventID}`);
  };
  const handleNoteChange = (event) => {
    console.log(event.target.id);
    const role = event.target.id;
    if (event.target.value.length < 500) {
      if ((role = "lic")) {
        setRequestNoteLIC(event.target.value);
      } else if (role == "budget") {
        setRequestNoteBudget(event.target.value);
      } else if (role == "admin") {
        setRequestNoteAdmin(event.target.value);
      }
    } else {
      toast.error("Note must be less than 500 characters", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchApproval();
    fetchVenueBookingDetails();
  }, [eventID]);

  useEffect(() => {
    if (eventApprovalData.lic_approval != null) {
      fetchRequests(eventApprovalData.lic_approval._id, "lic");
    }

    if (eventApprovalData.venue_approval != null) {
      fetchRequests(eventApprovalData.venue_approval._id, "venue");
    }

    if (eventApprovalData.budget_approval != null) {
      fetchRequests(eventApprovalData.budget_approval._id, "budget");
    }

    if (eventApprovalData.admin_approval != null) {
      fetchRequests(eventApprovalData.admin_approval._id, "admin");
    }
    // fetchVenueBookingDetails()
  }, [eventApprovalData]);

  const boxColor = "#f2f2f2";
  const NotYetSentBtn = "#808080;";
  const SentBtn = "#007bff";
  const ViewedBtn = "#17a2b8";
  const ApprovedBtn = "#28a745";
  const RejectedBtn = "#dc3545";
  const normalBtn = "#007bff";

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

              {licReq != null ? (
                <div>
                  <Typography variant="h5" color={statusText}>
                    {getStatus(licReq.status)}
                  </Typography>
                  <Typography variant="h5"> {licReq.requested_on} </Typography>
                </div>
              ) : (
                <TextField
                  id="lic"
                  size="small"
                  className="w-full my-2"
                  variant="outlined"
                  value={requestNoteAdmin}
                  label="Request Note"
                  onChange={handleNoteChange}
                />
              )}

              <Box className="flex w-full justify-between flex-row my-2">
                {licReq == null ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleLicApprovalSendRequest}
                  >
                    Send Request
                  </Button>
                ) : licReq.status != "Not_Yet_Sent" ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Request Appointment
                  </Button>
                ) : (
                  <Button variant="outlined" color="secondary" size="large">
                    Request Appointment
                  </Button>
                )}
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
                {venue != null ? venue.name : "Not Added Yet"}
              </Typography>

              <Typography variant="h5">Venue Manager</Typography>

              <Typography variant="h5">
                {venueBooking != null
                  ? "Sent On : " + String(venueBooking.created_at).split("T")[0]
                  : null}
              </Typography>

              {venueBooking != null ? (
                <Typography variant="h5" color={statusText}>
                  Booking Status : {venueBooking.booking_status}
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

                {venueReq != null ? (
                  <Button variant="outlined" color="secondary" size="large">
                    Request Appointment
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Request Appointment
                  </Button>
                )}
              </Box>
            </div>
          </Box>

          <Box id="budgetBox" width="48%" bgcolor={boxColor} mb="1%" mr="1%" height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              {budget.name != null ? (
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
                {budgetReq != null
                  ? "Sent On : " + budgetReq.requested_on
                  : null}
              </Typography>

              {budgetReq != null ? (
                <Typography variant="h5" color={statusText}>
                  Approval Status : {getStatus(budgetReq.status)}
                </Typography>
              ) : (
                <TextField
                  id="budget"
                  size="small"
                  className="w-full my-2"
                  variant="outlined"
                  value={requestNoteBudget}
                  label="Request Note"
                  onChange={handleNoteChange}
                />
              )}

              <Box className="flex w-full justify-between flex-row my-2">
                {budgetReq == null ? (
                  budget.name != null ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleBudgetApprovalSendRequest}
                    >
                      Send Request
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      disabled
                    >
                      Send Request
                    </Button>
                  )
                ) : budgetReq.status != "Not_Yet_Sent" ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Request Appointment
                  </Button>
                ) : (
                  <Button variant="outlined" color="secondary" size="large">
                    Request Appointment
                  </Button>
                )}
              </Box>
            </div>
          </Box>

          <Box id="adminBox" width="48%" bgcolor={boxColor} mb="1%" mr="1%" height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400">
            <div className="p-4 flex flex-col justify-between h-full">
              {admin.name != null ? (
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
                {adminReq != null ? adminReq.requested_on : null}
              </Typography>
              {adminReq != null ? (
                <Typography variant="h5" color={statusText}>
                  Approval status : {getStatus(adminReq.status)}
                </Typography>
              ) : (
                <TextField
                  id="admin"
                  size="small"
                  className="w-full my-2"
                  variant="outlined"
                  value={requestNoteAdmin}
                  label="Request Note"
                  onChange={handleNoteChange}
                />
              )}

              <Box className="flex w-full justify-between flex-row my-2">
              {adminReq == null ? (
                  budget.name != null ? (
                    <Button
                    id="admin"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleAdminApprovalSendRequest}
                    >
                      Send Request
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      disabled
                    >
                      Send Request
                    </Button>
                  )
                ) : adminReq.status != "Not_Yet_Sent" ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Request Appointment
                  </Button>
                ) : (
                  <Button variant="outlined" color="secondary" size="large">
                    Request Appointment
                  </Button>
                )}
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ApprovalMain;
