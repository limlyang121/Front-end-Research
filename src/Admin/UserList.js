import './Admin.css';

import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deactivationAccount, getAllNonActiveUsers, getAllUsers, activateAccountAPI } from './adminAxios';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { CircularProgress } from "@material-ui/core";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const myID = sessionStorage.getItem("id");

  const changeList = useCallback((stat) => {
    setStatus(stat);
    setCurrentPage(1); // Reset to the first page when the status changes
  }, [setStatus]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response;
      if (status === "active") {
        response = await getAllUsers(currentPage);
      } else {
        response = await getAllNonActiveUsers();
      }
      setUsers(response);
      setLoading(false);
    };

    fetchData();
  }, [status, currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const deactivateAccount = async (id) => {
    if (window.confirm("Are you sure? ")) {
      await deactivationAccount(id)
        .then((responseData) => {
          alert(responseData);
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);
        })
    }
  };

  const activateAccount = async (id) => {
    if (window.confirm("Are you sure? ")) {
      await activateAccountAPI(id)
        .then((responseData) => {
          alert(responseData);
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);
        })
    }
  };

  const renderActionButtons = (user) => {
    if (status === "active") {
      return (
        <ButtonGroup className='pagination-button'>
          <Button size="sm" color="info" tag={Link} to={`/admin/users/read/${user.id}`}>Read</Button>
          <Button size="sm" color="primary" tag={Link} to={`/admin/users/form/${user.id}`}>Edit</Button>
          <Button size="sm" color="warning" onClick={() => deactivateAccount(user.id)}>Deactivate</Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup>
          <Button size="smcurrentUsers" color="primary" onClick={() => activateAccount(user.id)}>Activate</Button>
        </ButtonGroup>
      );
    }
  };

  const userList = users.map(user => (
    <tr key={user.id}>
      {user.id !== parseInt(myID) && (
        <>
          <td style={{ whiteSpace: 'nowrap' }}>{user.userdetails.firstName}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{user.userdetails.lastName}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{user.userName}</td>
          <td>
            {renderActionButtons(user)}
          </td>
        </>
      )}
    </tr>
  ));

  return (
    <div>
      <Container fluid className='full-height-container'>
        <div className="float-end">
          <Button color="success" tag={Link} to="/admin/users/form/new">Add User</Button>
        </div>
        <h3>User Accounts</h3>
        <Button color='primary' style={{ marginRight: '10px' }} onClick={() => changeList("active")}>Active User</Button>
        <Button color='danger' onClick={() => changeList("nonactive")}>Deactivate User</Button>

        {loading ? (
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <CircularProgress color="primary" />
          </div>
        ) : userList.length === 0 ? (
          <NoDataToDisplay />
        ) : (
          <div>
            <ButtonGroup style={{ gap: "10px" }}>

            </ButtonGroup>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th width="20%">First Name</th>
                  <th width="20%">Last  Name</th>
                  <th width="20%">UserName</th>
                  <th width="10%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList}
              </tbody>
            </Table>
            {/* Pagination */}
            <div>
              <ButtonGroup>
                <Button className='pagination-button' color='primary' onClick={() => paginate(1)} > 1  </Button> 
                <Button className='pagination-button' color='primary' onClick={() => paginate(2)} > 2  </Button>
                <Button className='pagination-button' color='primary' onClick={() => paginate(3)} > 3  </Button>
                <Button className='pagination-button' color='primary' onClick={() => paginate(4)} > 4  </Button>
                <Button className='pagination-button' color='primary' onClick={() => paginate(5)} > 5  </Button>
              </ButtonGroup>
              {/* Add more buttons as needed */}
            </div>



          </div>

        )}

      </Container>
    </div>
  );
};

export default UserList;
