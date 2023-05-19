
function RequestCard(){
    return (
        <Card className=" w-full rounded border-2 items-center align-middle justify-center">
        <CardContent>
        
        {/* Approval Status */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Approval Status
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {eventApproval.status}
            </Typography>
        </div>

        {/* Event Name */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event Name
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {eventApproval.event_id.name}
            </Typography>
        </div>

        {/* Event Description */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event Description
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {eventApproval.event_id.description}
            </Typography>
        </div>

        {/* Event Start Time */}
        <div className="flex flex-row items-center justify-between m-4 m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event Start Time
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {/* {eventApproval.event_id.startTime} */}
            2023-04-22T20:00:00.000Z
            </Typography>
        </div>

        {/* Event End Time */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Event End Time
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {/* {eventApproval.event_id.endtime} */}
            2023-04-22T20:00:00.000Z
            </Typography>
        </div>

        {/* Event LIC Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            LIC Approval
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {(eventApproval.lic_approval !== null) ? eventApproval.lic_approval._id : "Not Yet Sent"}
            </Typography>
        </div>

        {/* Event Venue Manager Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Venue Manager Approval
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {(eventApproval.vm_approval !== null) ? eventApproval.vm_approval._id : "Not Yet Sent"}
            </Typography>
        </div>

        {/* Event Budget Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Budget Approval
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {(eventApproval.budget_approval !== null) ? eventApproval.budget_approval._id : "Not Yet Sent"}
            </Typography>
        </div>

        {/* Event Admin Approval */}
        <div className="flex flex-row items-center justify-between m-4">
            <Typography variant="h6"  component="h5" className="w-1/2">
            Admin Approval
            </Typography>
            <Typography variant="h5" component="h5" className="w-1/2">
            {(eventApproval.admin_approval !== null) ? eventApproval.admin_approval._id : "Not Yet Sent"}
            </Typography>
        </div>
        </CardContent>
  </Card>
    )
} 

export default RequestCard