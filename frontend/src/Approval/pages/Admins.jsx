
import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../components/api.approval";
import { toast, ToastContainer } from "react-toastify";
import Cookie from "js-cookie";

const Admins = () => {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState([]);
  const { id: approvalID } = useParams();
  const navigate = useNavigate();
  const loggedOrgId = Cookie.get("org_id");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/staff")
      .then((response) => {
        console.log(response.data);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const filteredAdmins = admins.filter((admin) =>
    admin.firstname.toLowerCase().includes(searchText.toLowerCase())
  );

  const createRequest = async (selectedStaffID) => {
    var data = {
      approval_id: approvalID,
      type: "Admin_Request",
      requested_to: selectedStaffID,
      requested_by: loggedOrgId,
      status: "Not_Yet_Sent",
    };

    // console.log(data);
    await API.post("approval/request/", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.data);
        // console.log(res.data.data._id);
        updateEventApproval(res.data.data._id);
      })
      .catch((err) => {
            console.log(err.response.data)
            toast.error("Failed to add to staff", {
            position : "top-right"
            })
        })
  };

  const updateEventApproval = async (id) => {
    var data = {
      status: "Draft",
      admin_approval: id,
    };
    await API.put(`approval/event/${approvalID}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data)
        toast.success("Added to form", {
          position: "top-right",
        });
        setTimeout(() => {
            navigate(`/org/dashboard/events/approval/${res.data.data.event_id}`);
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Failed to add to approval form", {
          position: "top-right",
        });
      });
  };

  const handleAddToFormBtn = (event) => {
    // console.log(event.target.id)
    createRequest(event.target.id)
  };

  return (
  
        <Container maxWidth="md" sx={{ mt: 10 }}>
          <ToastContainer />
            <Container sx={{ mb: 4 }}>
                <TextField
                    label="Search administrators"
                    fullWidth
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </Container>

            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {filteredAdmins.map((admin) => (
                        <Grid item xs={12} sm={6} md={4} key={admin._id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
                                <CardMedia component="img" image={admin.profileimage} alt={admin.firstname} style={{ height: '200px', width: '300px' }} />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {admin.firstname + " " + admin.lastname}
                                        </Typography>
                                        <Button id={admin._id} variant="contained" color="secondary" size="medium" onClick={handleAddToFormBtn} >
                                            Add To Form
                                        </Button>
                                    </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    )
};


export default Admins