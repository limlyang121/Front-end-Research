import React from 'react';
import './App.css';
import './LandingPage.css'
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import DotBox from './LandingPageComponent/DotBox';
import BoxContent from './LandingPageComponent/BoxContent';
import MyInfoBox from './LandingPageComponent/SideBox/MyInfoBox';
import MySlider from './LandingPageComponent/Slider/MySlider';
import CustomSlider from './LandingPageComponent/Slider/CustomSlider';
import NewChangeBox from './LandingPageComponent/ChangeLog/NewChangeBox';

const LandingPage = () => {

  const nextUpdate = [
    "Add Page Numbering in Table (Front-End)",
    "Add Page indexing when Grabbing user Data (Back-End)",
    "Add More animation for better User experience",
    "Design a better Landing page"
  ]



  const boxContent = 'This is the box content.';
  const dotContents = ['', 'Content 2', 'Content 3'];

  return (
    <div className='background'>
      <div className='glass-background'>
        
      </div>
      {/* <h2 style={{ textAlign: "center" }}>Next Update</h2>
      <div style={{ color: "#3498db", textAlign: "center" }}>
        {nextUpdate.map((item, index) => (
          <span key={index} >
            {index + 1}. {item} <br />
          </span>
        ))}

      </div> */}

      <Container fluid className='full-height-container'>


        <br style={{ marginBottom: "10px" }} />

        {/* <DotBox boxContent={<BoxContent />} /> Pass BoxContent as the child */}

        {/* <CustomSlider /> */}
        {/* <MySlider /> */}
      </Container>
      
      <NewChangeBox />
      <MyInfoBox />


      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
        <Button className='rounded-circle raised-button' style={{ display: "flex" }} color='primary' tag={Link} to="/login">
          <div>Try the System</div>
        </Button>
      </div>

    </div>

  );
}

export default LandingPage;