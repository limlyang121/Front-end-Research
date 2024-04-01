import React, { useEffect, useState } from 'react';
import { Collapse, FormGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Form, Button, NavbarText, Container } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../General/Axios/Axios';
import { useNavigate } from 'react-router-dom';
import "./AppNavbar.css"


const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [myRole, setRoles] = useState(() => {
    const storedRole = sessionStorage.getItem("myRole");
    return storedRole || '';
  })


  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchMyData = async () => {
      try {
        let roleName = sessionStorage.getItem("myRole")
        if (roleName != null){
          setRoles (roleName)
        }
      }catch {
        alert("System Maintance")
      }

    }

    fetchMyData()
  }, [location.pathname])


  const logoutButton = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure want to log out ")) {
      await logout();
      navigate("/")
    }
  }

  const isLandingOrLoginPage = location.pathname === '/' || location.pathname === '/login';

  // If it's the landing or login page, don't render the navbar
  if (isLandingOrLoginPage) {
    return null;
  }

  return (
    <div>

      <Navbar color="dark" dark expand="md">
        <Container fluid>
          <div style={{ display: "flex"}} >
            <NavbarBrand tag={Link} to="/home" ><h2>Home</h2></NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
              {myRole.includes("ADMIN") && (
                <Nav className='justify-content-start ' style={{ width: "100%", gap: "10px" }} navbar>
                  <NavItem >
                    <Button>
                      <Link to={"/admin/users"} style={{ textDecoration: "none", color: "white" }}>
                        User Accounts
                      </Link>
                    </Button>
                  </NavItem>

                  <NavItem>
                    <Button>
                      <Link to={"/admin/roles"} style={{ textDecoration: "none", color: "white" }}>
                        User Profile
                      </Link>
                    </Button>
                  </NavItem>
                </Nav>
              )}

              {myRole.includes("AUTHOR") && (

                <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                  <NavItem>
                    <Button>
                      <Link tag={Link} to={"/author/papers"} style={{ textDecoration: "none", color: "white" }}>
                        My Papers
                      </Link>
                    </Button>
                  </NavItem>


                  <NavItem>
                    <Button>
                      <Link tag={Link} to={"/author/papers/publish"} style={{ textDecoration: "none", color: "white" }}>
                        Publication
                      </Link>
                    </Button>
                  </NavItem>

                </Nav>
              )}

              {myRole.includes("REVIEWER") && (

                <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                  <NavItem>
                    <Button>
                      <Link to={"/reviewer/reviews"} style={{ textDecoration: "none", color: "white" }}>
                        Review Papers
                      </Link>
                    </Button>
                  </NavItem>

                  <NavItem>
                    <Button>
                      <Link to={"/reviewer/mybids"} style={{ textDecoration: "none", color: "white" }}>
                        Bid Status
                      </Link>
                    </Button>
                  </NavItem>

                  <NavItem>
                    <Button>
                      <Link to={"/reviewer/bid"} style={{ textDecoration: "none", color: "white" }}>
                        Bid Paper
                      </Link>
                    </Button>
                  </NavItem>
                </Nav>
              )}

              {myRole.includes("CONFERENCE") && (

                <Nav className='justify-content-start' style={{ width: "100%", gap: "10px" }} navbar>
                  <NavItem>
                    <Button>
                      <Link to={"/conference/bids"} style={{ textDecoration: "none", color: "white" }}>
                        Reviewer Bid
                      </Link>
                    </Button>
                  </NavItem>

                  <NavItem>
                    <Button>
                      <Link to={"/conference/papers/ready"} style={{ textDecoration: "none", color: "white" }}>
                        Publication
                      </Link>
                    </Button>
                  </NavItem>

                </Nav>
              )}




              <Nav className="justify-content-end" style={{ width: "100%", gap: "10px" }} navbar>
                <NavItem>
                  <Button >
                    <Link to={"/profile"} style={{ textDecoration: "none", color: "white" }}>
                      Profile
                    </Link>
                  </Button>
                </NavItem>

                <NavItem>
                  <Form onSubmit={logoutButton} method="post">
                    <FormGroup>
                      <Button type='submit'>
                        <NavbarText style={{ textDecoration: "none", color: "white" }} >Log out</NavbarText>
                      </Button>
                    </FormGroup>
                  </Form>
                </NavItem>

              </Nav>
            </Collapse>
          </div>

        </Container>

      </Navbar>

      <div className='empty-padding'>
      </div>


    </div>


  );
};

export default AppNavbar;