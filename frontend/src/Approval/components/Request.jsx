import React, { useEffect, useRef } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import API from "./api.approval";
import Cookies from "js-cookie";
import { css } from '@emotion/react';

const myCardStyles = css`
  & .MuiCardContent-root:last-child {
    padding-bottom: 0;
  }

  & .MuiCardContent-root {
    padding: 0;
  }
`;
const input = css`
    minWidth: "200px";
`;

function Request(props) {
  const [inputValue, setInputValue] = useState("");
  const [requestTo, setRequestTo] = useState(props.to);
  const [options, setOptions] = useState(props.options);
  const [requestID, setRequestID] = useState("");
  const [eventApprovalID, setEventApprovalID] = useState("");
  const [selection, setSelection] = useState({});
  const [requestNote, setRequestNote] = useState("");
  const { id: eventID } = useParams();

  const saveRequest = async (approvalID) => {
    //const org = Cookies.get("orgId");

    function requestType() {
      if (requestTo == "Lecturer-In-Charge") return "LIC_Request";
      else if (requestTo == "Venue Manager") return "VM_Request";
      else if (requestTo == "Budget Approver") return "Budget_Request";
      else if (requestTo == "Admin") return "Admin_Request";
      else return "Invalid";
    }

    if (eventApprovalID != "") {
      await API.post(
        "approval/request/",
        {
          approval_id: approvalID,
          type: requestType(requestTo),
          requested_at: new Date().toISOString(),
          requested_to: selection._id,
          requested_by: "644557c3276961373d2c608c",
          status: "Not_Yet_Sent",
          request_note: requestNote,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
        .then((res) => {
          setRequestID(res.data.data._id);
          toast.success("Request has been saved", {
            position: "top-right",
          });
          props.getID(requestTo, res.data.data._id);
          props.shouldISave(true);
        })
        .catch((err) => {
          toast.success(err.response, {
            position: "top-right",
          });
        });
    } else {
      toast.error("Failed to create a reference for event", {
        position: "top-right",
      });
    }
  };

  const clearRequest = async () => {
    await API.delete(`approval/request/${requestID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        setRequestID("");
        props.getID(requestTo, null);
        props.shouldISave(false);
        setRequestNote("");
        setSelection({});
        setInputValue("");
        if (
          document
            .getElementById(requestTo.toString())
            .classList.contains("hidden")
        )
          document
            .getElementById(requestTo.toString())
            .classList.toggle("hidden");
      })
      .catch((err) => {
        if (err.response.data !== null)
          toast.error(err.response.data.message, {
            position: "top-right",
          });
        else {
          toast.error(err.response, {
            position: "top-right",
          });
        }
      });
  };

  useEffect(() => {
    setOptions(props.options);
    setRequestTo(props.to);
    setEventApprovalID(props.eventApprovalRequestID);

    // console.log("eventApprovalID - " + props.eventApprovalRequestID);
  }, [props]);

  const handleView = () => {
    const approverChosen = document.getElementById(`chooseApprover${requestTo}`).value;
    if (approverChosen !== null && approverChosen != "") {
      document.getElementById(requestTo).classList.toggle("hidden");
    } else {
      toast.error("Please select a Staff to View Details", {
        position: "top-right",
      });
    }
  };

  const handleClearRequest = async () => {
    if (requestID == "") {
      toast.error("No yet saved to clear", {
        position: "top-right",
      });
    } else clearRequest();
  };

  const handleSaveRequestButtonClick = () => {
    if (requestNote == "") {
      toast.error("Please enter a note", {
        position: "top-right",
      });
    } else {
      saveRequest(eventApprovalID);
    }
  };

  const handleInputChange = (event, value, params) => {
    options.map((option) => {
      if (option.name == value) {
        setSelection(option);
      }
    });
    setInputValue(value);
  };

  const handleNoteChange = (event) => {
    if (event.target.value.length < 500) {
      setRequestNote(event.target.value);
    } else {
      toast.error("Note must be less than 500 characters", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex flex-col w-4/5 border-2 m-2 ">
      {/* Selection DIV*/}
      <div className="flex w-full align-middle justify-between items-center p-2">
        {/* Label */}
        <div className="flex-shrink-0 w-1/5">
          <label className="mr-2 text-2xl">{requestTo} : </label>
        </div>

        <div className={"w-2/5"} id="chooseApproverDiv">
          <Autocomplete
            id={"chooseApprover"+requestTo}
            css={input}
            options={options}
            getOptionLabel={(option) => option.name}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField {...params} label="Select" variant="outlined" />
            )}
          />
        </div>
        <div className="flex w-2/5 justify-around">
          <ToastContainer />

          <Button
            variant="outlined"
            color="primary"
            onClick={handleView}
          >
            View
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearRequest}
          >
            Clear Request
          </Button>
        </div>
      </div>

      {/* Details DIV */}
      <div id={requestTo} name={requestTo} className="w-full p-2 hidden">
        <div className="w-full flex flex-col align-middle justify-between items-center">
          <div
          css={myCardStyles}
            className={" w-full rounded border-2 items-center align-middle justify-center"}
          >
            <CardContent>
              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    Name
                  </Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    {selection.name}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    Email
                  </Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    {selection.email}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    Role
                  </Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6" component="h6">
                    {selection.role == "admin"
                      ? "Admin"
                      : selection.role == "staff"
                      ? "Staff"
                      : "Venue Manager"}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <Typography variant="h6">Add Approver</Typography>
                </div>
                -
                <div className="w-1/2 flex justify-center align-middle items-center">
                  <TextField
                    className="w-3/4"
                    variant="outlined"
                    value={requestNote}
                    label="Request Note"
                    onChange={handleNoteChange}
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-center align-middle my-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveRequestButtonClick}
                >
                  Save Request
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;
