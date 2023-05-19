import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>Admin-View</h1>

                    <NavLink to="admin">Admin</NavLink>
                </nav>
            </header>
        </div>
    );
}

