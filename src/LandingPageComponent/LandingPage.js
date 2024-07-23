import "./LandingPage.css"
import React from 'react';
import MyInfoBox from "./SideBox/MyInfoBox"
import TrySystem from "./Button/TrySystem";
import { HowItWork, NextUpdate, UserAccount } from "./Text Content/LandingText";
import NewChangeBox from "./ChangeLog/NewChangeBox";


const LandingPage = () => {
    return (
        <div className='background '>
            <div className='glass-background'>

                <div className="centered-box" >
                    <NextUpdate />
                </div>

                <div className="centered-box" >
                    <UserAccount />
                </div>
                <div className="centered-box" >
                    <HowItWork />
                </div>
            </div>
            <NewChangeBox />
            <MyInfoBox />
            <TrySystem />
        </div>
    )
}

export default LandingPage