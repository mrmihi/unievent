import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="flex flex-col ">
            <h1 className="underline m-2 border-2 w-max p-2">Home Page</h1>
            <Link className="m-2 border-2 w-max p-2" to="contact">Contact</Link>
            <Link className="m-2 border-2 w-max p-2" to="event-draft">Event Draft</Link>
        </div>
    )
}

export default Home
