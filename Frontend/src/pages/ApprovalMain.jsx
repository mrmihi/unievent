import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const ApprovalMain = () => {
    const { id : eventId } = useParams()
    const [eventApprovals, setEventApprovals] = useState([])
    const [isRendered, setIsRendered] = useState(false)
    const [isFetchSuccessful, setIsFetchSuccessful] = useState(false)
    const [fetchMessage, setFetchMessage] = useState("")

    const fetchData = useCallback(async () => {
        const data = await fetch(`http://localhost:3000/api/approval/event/events/${eventId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        const json = await data.json();

        if(!isRendered){
            setEventApprovals(json.data)
            setIsFetchSuccessful(json.success)
            setFetchMessage(json.message)
        }
    }, [eventId])

    useEffect(() => {
        setIsRendered(false)

        fetchData()
        .catch(err => console.log(err))

        return () => {
            setIsRendered(true)
        }
    }, [fetchData])
    
    
    return(
        <div>
            <h1>Approval Main Page</h1>
            {isFetchSuccessful ? <p>{fetchMessage}</p> : <p>{fetchMessage}</p>}
            <h2>---</h2>
            <h2>Data</h2>
            {eventApprovals.map((eventApproval) => 
                (<div key={eventApproval._id}>
                    <p>Event Approval ID - {eventApproval._id}</p>
                    <p>Event Approval Status - {eventApproval.status}</p>
                    {/* <p>Event ID - {eventApproval.event_id._id}</p> */}
                    <p>Event Name - {eventApproval.event_id.name}</p>
                    <p>Event Description - {eventApproval.event_id.description}</p>
                    <p>Event Start Time - {eventApproval.event_id.startTime}</p>
                    <p>Event End Time - {eventApproval.event_id.endTime}</p>
                
                    <div className='flex flex-row'>
                    <p>Event LIC Approval - </p>
                    {eventApproval.lic_approval != null 
                    ? <Link to={`../approval/request/${eventApproval.lic_approval._id}`}>
                        <p>{ eventApproval.lic_approval._id }</p> 
                    </Link>
                    : <p>Not Yet Sent</p>}
                    </div>
                
                    <div className='flex flex-row'>
                    <p>Event Venue Manage Approval - </p>
                    {eventApproval.venue_approva != null 
                    ? <Link to={`../approval/request/${eventApproval.venue_approva._id}`}>
                        <p>{ eventApproval.venue_approva._id }</p> 
                    </Link>
                    : <p>Not Yet Sent</p>}
                    </div>

                    <div className='flex flex-row'>
                    <p>Event Finance Approval - </p>
                    {eventApproval.budget_approval != null 
                    ? <Link to={`../approval/request/${eventApproval.budget_approval._id}`}>
                        <p> {eventApproval.budget_approval._id }</p> 
                    </Link>
                    : <p>Not Yet Sent</p>}
                    </div>

                    <div className='flex flex-row'>
                    <p>Event Admin Approval - </p>
                    {eventApproval.admin_approval != null 
                    ? <Link to={`../approval/request/${eventApproval.admin_approval._id}`}>
                        <p>{ eventApproval.admin_approval._id }</p> 
                    </Link>
                    : <p>Not Yet Sent</p>}
                    </div>
                </div>)
            )}     
        </div>
    )
}

export default ApprovalMain