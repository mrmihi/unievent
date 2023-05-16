import { Navigate, Outlet, NavLink } from "react-router-dom";

export default function AdminRoute() {
    return (
        <div>
            <nav>
                <NavLink to="dashboard">View the dashboard</NavLink>
            </nav>
            <Outlet />
        </div>
    );
}
