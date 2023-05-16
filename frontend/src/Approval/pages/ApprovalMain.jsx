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
  const [venueBooking, setVenueBooking] = useState(null);
  const [budget, setBudget] = useState({});
  const [budgetReq, setBudgetReq] = useState(null);
  const [admin, setAdmin] = useState({});
  const [adminReq, setAdminReq] = useState(null);
  const [org, setOrg] = useState({});
  const loggedOrgId = "6448be13969607971f3761a3";
  const [requestNoteLIC, setRequestNoteLIC] = useState("");
  const [requestNoteBudget, setRequestNoteBudget] = useState("");
  const [requestNoteAdmin, setRequestNoteAdmin] = useState("");
  const navigate = useNavigate();

  const handleLicApprovalSendRequest = () => {
    if (requestNoteLIC != "") {
      sendApprovalRequest("lic", licReq._id);
    } else {
      toast.error("Add Request Note to proceed", {
        position: "top-right",
      });
    }
  };
  const handleBudgetApprovalSendRequest = () => {
    if (requestNoteBudget != "") {
      sendApprovalRequest("budget", budgetReq._id);
    } else {
      toast.error("Add Request Note to proceed", {
        position: "top-right",
      });
    }
  };
  const handleAdminApprovalSendRequest = () => {
    if (requestNoteAdmin != "") {
      sendApprovalRequest("admin", adminReq._id);
    } else {
      toast.error("Add Request Note to proceed", {
        position: "top-right",
      });
    }
  };

  const handleRequestAppointmentBtn = (event) => {
    const role = event.target.id;
    var requestId = "";
    switch (role) {
      case "venue":
        requestId = venueReq._id;
        break;

      case "lic":
        requestId = licReq._id;
        break;

      case "budget":
        requestId = budgetReq._id;
        break;

      case "admin":
        requestId = adminReq._id;
        break;
    }
    navigate(`/org/dashboard/approval/appointment/${requestId}`);
  };
  const handleAddAdminBtn = () => {
    navigate(`/org/dashboard/admin/list/${eventApprovalData._id}`);
  };
  const handleAddStaffBtn = () => {
    navigate(`/org/dashboard/staff/list/${eventApprovalData._id}`);
  };
  const handlePrintBtn = () => {
    navigate(`/org/dashboard/events/approval/print/${eventApprovalData._id}`);
  };

  const handleNoteChange = (event) => {
    const role = event.target.id;
    if (event.target.value.length < 500) {
      if (role == "lic") {
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

  const updateEventApproval = async (role, status, id) => {
    var data = null;
    switch (role) {
      case "venue":
        data = {
          status: status,
          venue_approval: id,
        };
        break;

      case "lic":
        data = {
          status: status,
          lic_approval: id,
        };
        break;

      case "budget":
        data = {
          status: status,
          budget_approval: id,
        };
        break;

      case "admin":
        data = {
          status: status,
          admin_approval: id,
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
          status: "Sent",
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
        console.log(res.data.data);
        switch (role) {
          case "venue":
            setVenueReq(res.data.data);
            updateEventApproval("venue", "Draft", res.data.data._id);
            break;

          case "lic":
            setLicReq(res.data.data);
            updateEventApproval("lic", "Draft", res.data.data._id);
            break;
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const sendApprovalRequest = async (role, id) => {
    var data = null;
    switch (role) {
      case "lic":
        data = {
          requested_at: Date(),
          status: "Sent",
          requested_note: requestNoteLIC,
        };
        break;

      case "budget":
        data = {
          requested_at: Date(),
          status: "Sent",
          requested_note: requestNoteLIC,
        };
        break;

      case "admin":
        data = {
          requested_at: Date(),
          status: "Sent",
          requested_note: requestNoteLIC,
        };
        break;
    }

    await API.put(`approval/request/${id}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.data);
        fetchApproval();
        toast.success("Request sent successfully", {
          position: "top-center",
        });
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
        // console.log("fetchRequests " + role);
        // console.log(res.data.data.requested_to);
        switch (role) {
          case "lic":
            setLicReq(res.data.data);
            break;
          case "venue":
            setVenueReq(res.data.data);
            break;
          case "budget":
            setBudget(res.data.data.requested_to);
            setBudgetReq(res.data.data);
            break;
          case "admin":
            setAdmin(res.data.data.requested_to);
            setAdminReq(res.data.data);
            break;
        }
        setError({});
      })
      .catch((err) => {
        console.log(err.response);
        setLicReq(null);
        setBudgetReq(null);
        setAdminReq(null);
        setVenueReq(null);
        setError(err.response);
      });
  };

  const fetchOrgDetails = async (orgId) => {
    await API.get(`org/${orgId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        // console.log("fetchOrgDetails");
        // console.log(res.data);
        setOrg(res.data);
        setLic(res.data.incharge);
      })
      .catch((err) => {
        setLic({});
        setOrg({});
        console.log(err.response);
      });
  };

  const fetchApproval = async () => {
    await API.get(`approval/event/events/${eventID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        // console.log(res.data.data[0]);
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

        setData(res.data.data[0]);
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

  const fetchVenueBookingDetails = async () => {
    const fetchVenueManagerDetails = async (venueManagerID) => {
      await API.get(`users/${venueManagerID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          // console.log("fetchVenueManagerDetails");
          console.log(res.data);
          setVenue(res.data);
        })
        .catch((err) => {
          setVenue({});
          console.log(err);
        });
    };

    await API.get(`bookings/event/${eventID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        // console.log(res.data[0]);
        setVenueBooking(res.data[0]);
        fetchVenueManagerDetails(res.data[0].venue.manager);
      })
      .catch((err) => {
        setVenueBooking({});
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchVenueBookingDetails();
    fetchApproval();
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
  }, [eventApprovalData]);

  useEffect(() => {
    if (eventApprovalData.venue_approval == null && venueBooking != null) {
      createApprovalRequest("venue");
    }
  }, [venueBooking]);

  useEffect(() => {
    if (eventApprovalData.lic_approval == null && lic != null) {
      createApprovalRequest("lic");
    }
  }, [lic]);

  const boxColor = "#f2f2f2";
  const NotYetSentBtn = "#808080;";
  const SentBtn = "#007bff";
  const ViewedBtn = "#17a2b8";
  const ApprovedBtn = "#28a745";
  const RejectedBtn = "#dc3545";
  const normalBtn = "#007bff";

  const statusText = (request) => {
    if (request.status === "Not_Yet_Sent") return NotYetSentBtn;
    if (lic.status === "Sent") return SentBtn;
    if (lic.status === "Viewed") return ViewedBtn;
    if (lic.status === "Approved") return ApprovedBtn;
    if (lic.status === "Rejected") return RejectedBtn;
    else return normalBtn;
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

  return (
    <div className="w-full">
      <ToastContainer />
      <Box className="px-8 w-full">
        <div className="flex flex-row px-8 justify-between w-full align-middle">
          <div>
            <Typography id="eventName" variant="h2">
              Event Approval Request Form
            </Typography>
          </div>
          <div>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handlePrintBtn}
            >
              Print
            </Button>
          </div>
        </div>

        <Box className="flex flex-row flex-wrap my-4">
          <Box
            id="licBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={300}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h3" id="licApproval" fontWeight="bold">
                {lic._id != null
                  ? lic.firstname + " " + lic.lastname
                  : "Not Added Yet"}
              </Typography>

              <Typography variant="h5">
                {org._id != null ? org.name : "Not Added Yet"}
              </Typography>

              <Typography variant="h5">Lecturer-In-Charge</Typography>

              {licReq != null ? (
                <Typography variant="h5" color={statusText(licReq)}>
                  Approval Status : {getStatus(licReq.status)}
                </Typography>
              ) : null}

              {licReq != null && licReq.status != "Not_Yet_Sent" ? (
                <Typography variant="h5">
                  {" "}
                  Requested On : {licReq.requested_at}{" "}
                </Typography>
              ) : (
                <TextField
                  id="lic"
                  size="small"
                  className="w-full my-2"
                  variant="outlined"
                  value={requestNoteLIC}
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
                    disabled
                  >
                    Send Request
                  </Button>
                ) : licReq.status == "Not_Yet_Sent" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleLicApprovalSendRequest}
                  >
                    Send Request
                  </Button>
                ) : (
                  <Button
                    id="lic"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleRequestAppointmentBtn}
                  >
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
            height={300}
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
                <Typography variant="h5">
                  Booking Status : {venueBooking.booking_status}
                </Typography>
              ) : null}

              {venueBooking != null ? (
                <Typography variant="h5">
                  Payment Status : {venueBooking.payment_status}
                </Typography>
              ) : null}

              <Box className="flex w-full justify-between flex-row my-2">
                {venueReq != null ? (
                  <Button
                    id="venue"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleRequestAppointmentBtn}
                  >
                    Request Appointment
                  </Button>
                ) : (
                  <Button
                    id="venue"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    disabled
                    onClick={handleRequestAppointmentBtn}
                  >
                    Request Appointment
                  </Button>
                )}
              </Box>
            </div>
          </Box>

          <Box
            id="budgetBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={300}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
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

              {budgetReq != null ? (
                <Typography variant="h5" color={statusText(budgetReq)}>
                  Approval Status : {getStatus(budgetReq.status)}
                </Typography>
              ) : null}

              {budgetReq != null && budgetReq.status != "Not_Yet_Sent" ? (
                <Typography variant="h5">
                  {" "}
                  Requested On : {budgetReq.requested_at}{" "}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Send Request
                  </Button>
                ) : budgetReq != null && budgetReq.status == "Not_Yet_Sent" ? (
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
                    id="budget"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleRequestAppointmentBtn}
                  >
                    Request Appointment
                  </Button>
                )}
              </Box>
            </div>
          </Box>

          <Box
            id="adminBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={300}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
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

              <Typography variant="h5">Administration</Typography>

              {adminReq != null ? (
                <Typography variant="h5" color={statusText(adminReq)}>
                  Approval Status : {getStatus(adminReq.status)}
                </Typography>
              ) : null}

              {adminReq != null && adminReq.status != "Not_Yet_Sent" ? (
                <Typography variant="h5">
                  {" "}
                  Requested On : {adminReq.requested_at}{" "}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Send Request
                  </Button>
                ) : adminReq != null && adminReq.status == "Not_Yet_Sent" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleAdminApprovalSendRequest}
                  >
                    Send Request
                  </Button>
                ) : (
                  <Button
                    id="admin"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleRequestAppointmentBtn}
                  >
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
