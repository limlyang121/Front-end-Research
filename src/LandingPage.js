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


        {/* <LandingBox /> */}

        {/* <br style={{ marginBottom: "10px" }} />


        <fieldset>
          <legend className='float-none w-auto'>
            <h1>
              ID
            </h1>
          </legend>

          <Container style={{ width: "70%" }}  >

            <Table style={{ textAlign: "center", border: "3px solid black" }} bordered >
              <thead className='thead-dark' >
                <tr>
                  <th> Username </th>
                  <th> Password </th>
                  <th> Role </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> admin </td>
                  <td rowSpan={4}> test123 </td>
                  <td> Admin </td>
                </tr>
                <tr>
                  <td> author </td>
                  <td> Author </td>
                </tr>
                <tr>
                  <td> reviewer </td>
                  <td> Reviewer </td>
                </tr>
                <tr>
                  <td> conference </td>
                  <td> Conference Chair </td>
                </tr>
              </tbody>
            </Table>
            <h4>
              <ol style={{ textAlign: "left" }} >
                <li> User above can't be modified (Update, Delete, Reset password) </li>
                <li> All Password for existing account is 'test123' (can check in postgreSQL which account is premade) </li>
                <li> the username can be check with Admin - User Account</li>
              </ol>
            </h4>
          </Container>


        </fieldset>

        <br />

        <fieldset>
          <legend>
            <h1>
              Register And Edit User
            </h1>
          </legend>

          <Container style={{ width: "70%" }}  >
            <h4>
              <ol style={{ textAlign: "left" }} >
                <li>Only Admin can Register a new User </li>
              </ol>
            </h4>
          </Container>

        </fieldset>

        <br />

        <fieldset>
          <legend>
            <h1>
              How the System Work
            </h1>
          </legend>

          <Container style={{ width: "70%" }}  >
            <h5>
              <ol style={{ textAlign: "left" }} >
                <li>Author add a new Papers</li>
                <li>Reviewers Bid the Papers</li>
                <li>Conferece Allocate/Allow the Reviewers to Reviews </li>
                <li>Reviewer review the Paper </li>
                <li>Once there are more than 5 Review for that paper, Conference can close the Bidding </li>
                <li>Once all reviewer done review the papers, the conference can accept/reject the paper by see the reviewer review </li>
                <li>Once Paper is Accepted/Rejected, Reviewer won't be able to Edit the review </li>
              </ol>


            </h5>

            <div style={{ textAlign: "left" }}>
              <h4>Note</h4>
              <br />
              <h5>

                <ol>
                  <li>In step 6, Conference can Unbid the reviewer bid if needed</li>
                  <li>Author can only delete paper when Bidding still Open. Once close, the author can't delete papers</li>

                </ol>
              </h5>
            </div>



          </Container>
        </fieldset>

        <br /> */}

        <br style={{ marginBottom: "10px" }} />

        {/* <DotBox boxContent={<BoxContent />} /> Pass BoxContent as the child */}

        {/* <CustomSlider /> */}
        {/* <MySlider /> */}
      </Container>


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