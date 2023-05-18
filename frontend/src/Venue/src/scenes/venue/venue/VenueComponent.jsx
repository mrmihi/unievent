import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardMedia,
} from "@mui/material";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const VenueComponent = ({ venue, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        onEdit(venue._id);
    };

    const handleDelete = () => {
        // show confirmation dialog using SweetAlert2
        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete this venue?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'info',
                    title: 'Deleting...',
                    showConfirmButton: false,
                    timer: 500,
                    timerProgressBar: true
                }).then(() => {
                    onDelete(venue._id);
                });
            }
        });
    };

    const goToVenueProfile = () => {
        navigate(`/admin/venue/venues/${venue._id}`);
    };

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "auto",
                padding: "1rem",
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 150, height: 150, marginRight: "1rem" }}
                image={venue.image_url}
                alt={venue.name}
            />
            <CardContent sx={{ flexGrow: 1 }} onClick={goToVenueProfile}>
                <Typography variant="h5" component="div" sx={{ marginBottom: "0.5rem", fontSize: 14 }}>
                    {venue.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "1rem", fontSize: 14 }}>
                    {venue.location}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "0.5rem", fontSize: 14 }}>
                    Capacity: {venue.capacity}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "0.5rem", fontSize: 14 }}>
                    Price: ${(venue.price).toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "0.5rem", fontSize: 14 }}>
                    Description: {venue.description}
                </Typography>
            </CardContent>

            <CardActions sx={{ marginLeft: "auto" }}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#1769aa", color: "#fff", marginRight: "0.5rem" }}
                    onClick={handleEdit}>
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#ff4569", color: "#fff" }}
                    onClick={handleDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default VenueComponent;
