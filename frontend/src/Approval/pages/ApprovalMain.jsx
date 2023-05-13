import { useCallback, useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import API from "../components/api.approval";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { toast, ToastContainer } from "react-toastify";
import ApprovalCard from "../components/ApprovalCard";
import { Button, Typography } from "@mui/material";

export default function ApprovalMain(props) {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const { id: eventId } = useParams();
  const [approvalID, setApprovalID] = useState("");
  const navigate = useNavigate()

  const fetchData = async () => {
    await API.get(`approval/event/events/${eventId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setData(res.data.data[0]);
        setApprovalID(res.data.data[0]._id);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  useEffect(() => {
    fetchData().catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  function handlePrintBtn() {
    navigate(`/approval/print/${approvalID}`)
  }

  const handleDiscardBtn = () => {
    console.log(approvalID)
    const deleteEventApproval = async () => {
      await API.delete(`approval/event/${approvalID}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          toast.success("Event Approval deleted successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          return <Navigate to={`/event-draft/${eventId}`} />;
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error("Error deleting event approval", {
            position: "top-center",
            autoClose: 2000,
          });
        });
    };

    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete the event approval?",
      buttons: [
        {
          label: "Yes",
          onClick: deleteEventApproval,
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="flex flex-col w-full items-center align-middle justify-start p-4 h-screen">
      <div className="w-2/3 py-4 flex flex-row justify-around">
        <Typography variant="h5" component="h5">
          Event Approval Process Summary
        </Typography>

        <Button
          variant="contained"
          color="primary"
          className="m-2"
          component={Link}
          to={`/approval/edit/${eventId}`}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="m-2"
          onClick={handlePrintBtn}
        >
          Print
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="m-2"
          onClick={handleDiscardBtn}
        >
          Discard
        </Button>
      </div>

      <div className="w-2/3 flex flex-col m-4 items-center align-middle justify-start">
        <ApprovalCard data={data} />
      </div>
    </div>
  );
}
