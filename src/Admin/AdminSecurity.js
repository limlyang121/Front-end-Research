// @flow strict

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSecurity() {
    const navigate = useNavigate();

    React.useEffect(() => {
        try {
            const role = sessionStorage.getItem("myRole")
            if (role.toLowerCase() !== "admin") {
                navigate("/denied")
            }
        }catch {
            alert("Please Log in First")
            navigate("/login")
        }
        
    }, [navigate])

};

export default AdminSecurity;