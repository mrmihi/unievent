import { Button, Card, CardContent, Typography } from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect } from "react";
import { useState } from "react";
import API from './api.approval'
import { Link } from "react-router-dom";


function ApprovalCard(props){
    const [eventApproval, setEventApprovals] = useState(props.data)
    const [approvalID, setApprovalID] = useState(props.data._id)
    
    const [licApproval, setLicApproval] = useState({})
    const [venueManagerApproval, setVMApproval] = useState({})
    const [budgetApproval, setBudgetApproval] = useState({})
    const [adminApproval, setAdminApproval] = useState({})

    const [error, setError] = useState({})
    
    const getApprovalRequest = async (requestId, requestOf) => {
        await API.get(`approval/request/${requestId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,}
                )
                .then(res => {
                    switch (requestOf) {
                        case "lic":
                            setLicApproval(res.data.data)
                            break;
                        
                        case "venue":
                            setVMApproval(res.data.data)
                            break;
                        
                        case "budget":
                            setBudgetApproval(res.data.data)
                            break;
                        
                        case "admin":
                            setAdminApproval(res.data.data)
                            break;
                    }
                    setError({})
                })
                .catch(err => {
                    setLicApproval({})
                    setVMApproval({})
                    setBudgetApproval({})
                    setAdminApproval({})
                    setError(err.response.data)
                })
    }

    useEffect(() => {
        if(props.data.lic_approval !== null){
            getApprovalRequest(props.data.lic_approval._id, "lic")
        }
        if(props.data.venue_approval !== null){
            getApprovalRequest(props.data.venue_approval._id, "venue")
        }
        if(props.data.budget_approval !== null){
            getApprovalRequest(props.data.budget_approval._id, "budget")    
        }
        if(props.data.admin_approval !== null){
            getApprovalRequest(props.data.admin_approval._id, "admin")
        }
        
        setEventApprovals(props.data)
    }, [props])
    
    const approvalStatus = (status) =>{
        switch (status) {
            case "Initiated":
                return "Initiated"
                case "Draft":
                    return "Draft"
            case "LIC_Awaiting":
                return "Request Sent To LIC"
            case "FM_Awaiting":
                return "LIC Approved"
            case "VM_Awaiting":
                return "Budget Approved"
            case "Admin_Awaiting":
                return "Venue Manager Approved"
            case "Approved":
                return "Event Approved"
            case "Rejected":
                return "Rejected"
            default:
                return "Unknown"
        }
    } 
    return (
        <Card className=" w-full rounded border-2 items-center align-middle justify-center">
        { eventApproval.event_id !== null ? 
        <CardContent>
            
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Approval Status
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            { approvalStatus(eventApproval.status) }
            </Typography>
        </div>
        
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event Name
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {eventApproval.event_id.name}
            </Typography>
        </div>

        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event Description
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {eventApproval.event_id.description}
            </Typography>
        </div>

        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event Start Time
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {String(eventApproval.event_id.startTime).split("T")[0] !== null ? String(eventApproval.event_id.startTime).split("T")[0] : "Not Yet Set"}
            </Typography>
        </div>

        {/* Event LIC Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            LIC Approval
            </Typography>
            {(licApproval.requested_to !== null) ? 
                (
                    <div className="flex flex-row w-1/2">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    {licApproval.requested_to.name}
                    </Typography>
                    </div>
                )
                :
                (
                    <div className="flex w-1/2  flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    Not Yet Sent
                    </Typography>
                    </div>
                )}
        </div>

        {/* Event Venue Manager Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Venue Manager Approval
            </Typography>
            {(venueManagerApproval.requested_to !== null) ? 
                (
                    <div className="flex w-1/2 flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    {venueManagerApproval.requested_to.name}
                    </Typography>
                    </div>
                )
                : 
                (
                    <div className="flex w-1/2 flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    Not Yet Sent
                    </Typography>
                    </div>
                )}
        </div>

        {/* Event Budget Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Budget Approval
            </Typography>
            {(budgetApproval.requested_to !== null) ? 
                (
                    <div className="w-1/2 flex flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    {budgetApproval.requested_to.name}
                    </Typography>
                    </div>
                )
                : 
                (
                    <div className="w-1/2 flex flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    Not Yet Sent
                    </Typography>
                    </div>
                )}
        </div>

        {/* Event Admin Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Admin Approval
            </Typography>
            {(adminApproval.requested_to !== null) ? 
                (
                    <div className="w-1/2 flex flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    {adminApproval.requested_to.name}
                    </Typography>
                    </div>
                )
                : 
                (
                    <div className="w-1/2 flex flex-row">
                    <Typography variant="h5" component="h5" className="w-1/2">
                    Not Yet Sent
                    </Typography>
                    </div>
                )}
        </div>
        </CardContent>
        : <Typography variant="h6"  component="h5" className="w-1/2">
            No Event Found
        </Typography>}
        </Card>
    )
}

export default ApprovalCard