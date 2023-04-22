import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const ApprovalRequestMain = () => {
    const { id : requestId } = useParams()
    const [approvalRequest, setApprovalRequest] = useState([])
    const [isRendered, setIsRendered] = useState(false)
    const [isFetchSuccessful, setIsFetchSuccessful] = useState(false)
    const [fetchMessage, setFetchMessage] = useState("")

    const fetchData = useCallback(async () => {
        const data = await fetch(`http://localhost:3000/api/approval/request/${requestId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        const json = await data.json();

        if(!isRendered){
            setApprovalRequest(json.data)
            setIsFetchSuccessful(json.success)
            setFetchMessage(json.message)
        }
    }, [requestId])

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
            {(<div key={approvalRequest._id}>
                <p>Event Approval ID - {approvalRequest._id}</p>
                    
                <div className='flex flex-row'>
                <p>LIC - </p>
                {approvalRequest.requested_to != null 
                ? 
                 <Link to={`../user/${approvalRequest.requested_to._id}`}>
                        <p>{ approvalRequest.requested_to.name }</p> 
                    </Link>
                : <p>Not Yet Sent</p>}
                </div>

                <div className='flex flex-row'>
                <p>LIC Name - </p>
                {approvalRequest.requested_to != null 
                ? 
                <Link to={`../org/${approvalRequest.requested_by._id}`}>
                <p>{ approvalRequest.requested_by.name }</p> 
                </Link>
                : <p>Not Yet Sent</p>}
                </div>



                
                </div>)}     
        </div>
    )
}

export default ApprovalRequestMain