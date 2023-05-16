import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import EventDraft from '../pages/Approval/EventDraft'
import ApprovalMain from '../pages/Approval/ApprovalMain'
import ApprovalRequestMain from '../pages/Approval/ApprovalRequestMain.jsx'
import ApprovalEdit from '../pages/Approval/ApprovalEdit.jsx';
import RequestAppointment from '../pages/Approval/RequestAppointment.jsx';
import ApprovalCreate from '../pages/Old/ApprovalCreate'
import PrintAll from '../pages/Approval/PrintAll'

const AnimatedRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home/>} />
            <Route path="contact" element={<Contact/>}/>
            <Route path="event-draft/:id" element={<EventDraft/>}/> 
            <Route path="approval/:id" element={<ApprovalMain/>}/>
            <Route path="approval/create/:id" element={<ApprovalCreate/>}/>
            <Route path="approval/edit/:id" element={<ApprovalEdit/>}/>
            <Route path="approval/request/:id" element={<ApprovalRequestMain/>}/>
            <Route path="approval/print/:id" element={<PrintAll/>}/>
            <Route path="approval/r/appointment/:id" element={<RequestAppointment/>}/>
        </Routes>
    )
}

export default AnimatedRoutes
