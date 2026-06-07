// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { deleteFromBidAPI, getBidByStatus } from './Axios';
import { downloadFile } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';

import { CircularProgress } from "@material-ui/core";
import Swal from 'sweetalert2';


function ReviewerBidStatus() {

    const [myBid, setBids] = React.useState([]);
    const [status, setStatus] = React.useState("Pending");
    const id = sessionStorage.getItem("id")
    const [loading, setLoading] = React.useState(true);

    const changeList = React.useCallback((stat) => {
        setStatus(stat);
    }, [setStatus])

    React.useEffect(() => {
        const fetchBidData = async (id, stat) => {
            let response = await getBidByStatus(id, stat)
            setBids(response)
            setLoading(false)
        }

        setLoading(true)
        fetchBidData(id, status)


    }, [id, status, changeList])

    const deleteFromBid = async (id) => {
        Swal.fire({
            title: 'Unbid the paper?',
            text: "You can re-bid later if the window is still open.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, unbid it!',
            showLoaderOnConfirm: true, // 1. Enable the built-in loader
            preConfirm: async () => {
                // 2. This runs AFTER they click confirm, showing the loading spinner automatically
                try {
                    const response = await deleteFromBidAPI(id);
                    return response; // Pass the response to the next .then()
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading() // Prevent closing the alert by clicking outside while loading
        }).then((result) => {
            // 3. This runs once the API call finishes successfully
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Unbidded!',
                    text: result.value, // This is the response returned from preConfirm
                    icon: 'success'
                });

                // 4. Update state
                let updatedGroups = [...myBid].filter(i => parseInt(i.bidID) !== parseInt(id));
                setBids(updatedGroups);
            }
        });
    };

    const PendingAction = (bid) => {
        return (
            <ButtonGroup style={{ gap: "10px" }} >
                <Button color='primary' onClick={async () => downloadFile(bid.paper.paperID)} > Download</Button>
                <Button color="warning" onClick={async () => deleteFromBid(bid.bidID)} > Unbid</Button>
            </ButtonGroup>
        )
    }

    const AcceptAction = (bid) => {
        return (
            <ButtonGroup style={{ gap: "10px" }} >
                <Button color='primary' tag={Link} to={"/reviewer/review/" + bid.bidID + "/new"} >Review it</Button>
            </ButtonGroup>
        )
    }

    const RejectAction = (bid) => {
        return (
            <ButtonGroup style={{ gap: "10px" }} >
                <Button color='danger'  >You been Reject to review this Paper</Button>
            </ButtonGroup>
        )
    }

    const displayBidStatus = myBid.map(bid => {
        return (
            <tr key={bid.bidID} >
                <td style={{ whiteSpace: "nowrap" }} > {bid.status}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paper.paperInfo.filename}  </td>
                <td>
                    {status === "Pending" && PendingAction(bid)}
                    {status === "Accept" && AcceptAction(bid)}
                    {status === "Reject" && RejectAction(bid)}
                </td>
            </tr>
        )
    })


    return (
        <div>
            <Container fluid className='full-height-container'>
                <h3>Bid Status</h3>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <ButtonGroup style={{ gap: "10px" }} >
                            <Button color='secondary' onClick={() => changeList("Pending")}  >Show Pending</Button>
                            <Button color='primary' onClick={() => changeList("Accept")}  >Show Accept</Button>
                            <Button color='danger' onClick={() => changeList("Reject")}  >Show Reject</Button>

                        </ButtonGroup>

                        {myBid.length === 0 &&
                            <NoDataToDisplay />
                        }

                        {myBid.length !== 0 && (

                            <Table striped bordered hover className="mt-4">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }} >Bid Status </th>
                                        <th style={{ width: "20%" }} >Paper Title </th>
                                        <th style={{ width: "20%" }} >FileName </th>
                                        <th colSpan={3}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayBidStatus}
                                </tbody>
                            </Table>

                        )}

                    </div>

                )}


            </Container>
        </div>
    );
};

export default ReviewerBidStatus;