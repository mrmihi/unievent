import React from 'react'
import Header from '../components/layout/Header';
import { Link } from "react-router-dom"


const EventDraft = () => {
    function handleRequestApprovalClick(){
        useEffect(() => {
            function fetchData(){
                const data = fetch(`http://localhost:3000/api/approval/event/events/${eventId}`,
                {
                    method: 'GET',,,<main></main>
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                );
                const json = data.json();
            }
        
            if(!isRendered){
                setEventApprovals(json.data)
                setIsFetchSuccessful(json.success)
                setFetchMessage(json.message)
            }
            setIsRendered(false)
    
            fetchData()
            .catch(err => console.log(err))
    
            return () => {
                setIsRendered(true)
            }
        }, [fetchData])
    }
    const [eventID, setEventID] = React.useState("643e6ca96030148f194b771d")
    return (
        <div>
            <Header/>
            <div className='flex flex-row w-full justify-between m-2 px-8'>
                <h1 className='p-2 font-bold text-2xl color text-slate-800'>My Event</h1>
                <button className='bg-blue-600 hover:bg-blue-700 text-slate-200  p-2 rounded'
                   onClick={handleRequestApprovalClick} >
                Request Approval
                </button>
                <button className='bg-blue-600 hover:bg-blue-700 text-slate-200  p-2 rounded'>
                <Link to={`../approval/${eventID}`} relative="path">View Approval</Link>
                </button>
            </div>
            <div className='flex flex-row w-full'>
                
            </div>
        </div>
    )
}

export default EventDraft
