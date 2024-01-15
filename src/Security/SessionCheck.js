import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

const SessionCheck = () => {
    const navigate = useNavigate();

    useEffect (async () => {
        try{
            const session = sessionStorage.getItem("username")
            if (!session){
                navigate("/")
            }
        }catch {
            navigate("/")
        }
        
    }, [navigate])

    return null;


}

export default SessionCheck;