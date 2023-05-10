import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1 className="underline">Home Page</h1>
            <Link to="contact">Contact</Link>
        </div>
    )
}

export default Home
