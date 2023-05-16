import Cookies from "js-cookie"

const Logout = () => {
    Cookies.remove("staff_accessToken")
    Cookies.remove("staff_role")
    Cookies.remove("staff_id")
    window.location.href = "/admin"
}

export default Logout
