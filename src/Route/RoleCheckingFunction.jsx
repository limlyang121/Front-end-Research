import {Navigate } from 'react-router-dom';


const RoleCheck = ({ role, children }) => {
    try {
        const myRole = sessionStorage.getItem("myRole");
        if (myRole.toLowerCase() === role) {
            return children
        } else {
            return <Navigate to={"/denied"} />
        }
    } catch (error) {
        alert("Please Login ")
        return <Navigate to={"/login"} />
    }
}

export default RoleCheck