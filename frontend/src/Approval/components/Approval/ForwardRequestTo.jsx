import React, { useEffect } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// Define custom styles
const useStyles = makeStyles((theme) => ({
  myCard: {
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 0,
    },
    "& .MuiCardContent-root ": {
      padding: 0,
    },
  },
  notYetSentBtn: {
    color: "#808080",
    borderColor: "#808080",
    border: 0,
    fontWeight: "bold",
  },
  SentBtn: {
    color: "#007bff",
    borderColor: "#007bff",
    border: 0,
    fontWeight: "bold",
  },
  ViewedBtn: {
    color: "#17a2b8",
    borderColor: "#17a2b8",
    border: 0,
    fontWeight: "bold",
  },
  ApprovedBtn: {
    color: "#28a745",
    borderColor: "#28a745",
    border: 0,
    fontWeight: "bold",
  },
  RejectedBtn: {
    color: "#dc3545",
    borderColor: "#dc3545",
    border: 0,
    fontWeight: "bold",
  },
  normalBtn: {
    color: "#007bff",
    borderColor: "#007bff",
    border: 0,
    fontWeight: "bold",
  },
}));

function ForwardRequestTo(props) {
  const classes = useStyles();

  const [requestTo, setRequestTo] = useState(props.to);
  const [approver, setApprover] = useState(props.approver);
  const [request, setRequest] = useState(props.request);
  const [name, setName] = useState("");
  const [options, setOptions] = useState(props.options);

  useEffect(() => {
    setOptions(props.options);
    setApprover(props.approver);
    setRequestTo(props.to);
    if (props.approver != null) setName(props.approver.name);
    if (props.request != null) setRequest(props.request);
  }, [props]);

  const [isButtonClicked, setButtonClicked] = useState(false);

  const handleViewButtonClick = () => {
    setButtonClicked(!isButtonClicked);
    document.getElementById(requestTo).classList.toggle("hidden");
  };

  const handleAddFromListButtonClick = () => {
    // Handle add from list button click
  };

  const handleClearButtonClick = () => {
    // Handle clear button click
  };

  return (
    <div className="flex flex-col w-4/5 m-2 ">
      {/* Selection DIV*/}
      <div className="flex w-full align-middle justify-between items-center p-2">
        {/* Label */}
        <div className="flex-shrink-0 w-1/5">
          <label className="mr-2 text-2xl">{requestTo} : </label>
        </div>

        <div className="w-2/5">
          <TextField
            className="w-full"
            value={props.sentTo}
            variant="outlined"
            InputProps={{ readOnly: true }}
            label={requestTo}
          />
        </div>

        <div className="flex w-2/5 justify-around">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleViewButtonClick}
          >
            {isButtonClicked ? "Hide" : "View"}
          </Button>
          <Button variant="outlined" color="primary" onClick={handleViewButtonClick}>
            Request Appointment
          </Button>

          

          {request.status != null ? (
            <Button
              variant="outlined"
              className={
                request.status === "Not_Yet_Sent"
                  ? classes.notYetSentBtn
                  : request.status === "Sent"
                  ? classes.SentBtn
                  : request.status === "Viewed"
                  ? classes.ViewedBtn
                  : request.status === "Approved"
                  ? classes.ApprovedBtn
                  : request.status === "Rejected"
                  ? classes.RejectedBtn
                  : classes.normalBtn
              }
            >
              {request.status === "Not_Yet_Sent"
                ? "Not Yet Sent"
                : request.status === "Sent"
                ? "Sent"
                : request.status === "Viewed"
                ? "Viewed"
                : request.status === "Approved"
                ? "Approved"
                : request.status === "Rejected"
                ? "Rejected"
                : "Unavailable"}
            </Button>
          ) : null}
        </div>
      </div>

      {/* Details DIV */}
      <div id={requestTo} name={requestTo} className="w-full p-2 hidden">
        <div className="w-full flex flex-col align-middle justify-between items-center">
          <Card
            className={`${classes.myCard} w-full rounded items-center align-middle justify-center`}
          >
            <CardContent>
              {/* Request Note */}
              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    Request Note
                  </Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    {request.request_note}
                  </Typography>
                </div>
              </div>

              {/* Sent on */}
              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    Requested On
                  </Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    {String(request.requested_at).split("T")[0]}
                  </Typography>
                </div>
              </div>

              {/* Sent on */}
              {request.status == "Viewed" ? (
                <div className="flex flex-row items-center justify-between">
                  <div className="w-1/2 flex justify-center align-middle items-center">
                    <Typography variant="h6" component="h6">
                      Viewed On
                    </Typography>
                  </div>
                  -
                  <div className="w-1/2 flex justify-center align-middle items-center">
                    <Typography variant="h6" component="h6">
                      {String(request.viewed_at).split("T")[0]}
                    </Typography>
                  </div>
                </div>
              ) : null}

              {/* LIC Name*/}
              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    LIC Name
                  </Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    {approver != null ? approver.name : null}
                  </Typography>
                </div>
              </div>

              {/* Request Appointment */}
              <div className="flex flex-row items-center justify-center align-middle my-2">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/approval/r/appointment/${request._id}`}
                >
                  Request Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ForwardRequestTo;
