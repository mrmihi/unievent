import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'

const AnimatedRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home/>} />
            <Route path="contact" element={<Contact/>}/>
        </Routes>
    )
}

export default AnimatedRoutes
