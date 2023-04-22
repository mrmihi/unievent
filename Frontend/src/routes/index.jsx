import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import EventDraft from '../pages/EventDraft'
import ApprovalMain from '../pages/ApprovalMain'
import ApprovalRequestMain from '../pages/ApprovalRequestMain.jsx'

const AnimatedRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home/>} />
            <Route path="contact" element={<Contact/>}/>
            <Route path="event-draft" element={<EventDraft/>}/>
            <Route path="approval/:id" element={<ApprovalMain/>}/>
            <Route path="approval/request/:id" element={<ApprovalRequestMain/>}/>
        </Routes>
    )
}

export default AnimatedRoutes
