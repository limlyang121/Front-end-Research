import { useNavigate } from "react-router-dom"
import "./PageNotFound.css"

export default function PageNotFound(){
    const navigate = useNavigate()

    return (
        <div className="PageNotFound">
            <h1>Page not found</h1>
            <button onClick={() => navigate("/home") }>Click here to return to home</button>
        </div>
    )
}