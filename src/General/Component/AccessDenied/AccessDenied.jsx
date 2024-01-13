import { useNavigate } from "react-router-dom"
import "./AccessDenied.css"

export default function AccessDenied(){
    const navigate = useNavigate()

    return (
        <div className="AccessDenied">
            <h1>Error 401</h1>
            <hr/>
            <h2>You are not authorized to visit this Page</h2>
            <button onClick={() => navigate("/home") }>Click here to return to home</button>
        </div>
    )
}