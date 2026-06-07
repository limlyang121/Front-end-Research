// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { AcceptBidAPI, cancelBidAPI, fetchPendingBidsAPI, RejectBidAPI } from './Axios';

import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import { MdRestore } from 'react-icons/md';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { CircularProgress } from "@material-ui/core";
import Swal from 'sweetalert2';


function ConferenceReviewerBid() {


    const [bids, setBids] = React.useState([])
    const [status, setStatus] = React.useState("Pending")
    const [sort, setSort] = React.useState("id")
    const [loading, setLoading] = React.useState(true);

    const changeBidsStatus = React.useCallback((stat) => {
        setStatus(stat)
    }, [setStatus])


    React.useEffect(() => {
        const fetchBidsByStatus = async (stat) => {
            let response = await fetchPendingBidsAPI(stat);
            setBids(response)
            setLoading(false)
        }

        setLoading(true)

        fetchBidsByStatus(status);

    }, [status, changeBidsStatus])

    const fullNameBid = (bid) => {
        return bid.reviewer.userdetails.firstName + " " + bid.reviewer.userdetails.lastName;
    }

    const fullNamePaper = (bid) => {
        return bid.paper.paperInfo.authorID.firstName + " " + bid.paper.paperInfo.authorID.lastName;
    }

    const CancelAcceptRejectPaper = async (bid, stat) => {
        let config = {
            title: `Are you sure you want to ${stat.toLowerCase()}?`,
            confirmButtonColor: '#3085d6', // Default blue
            confirmButtonText: `Yes, ${stat.toLowerCase()} it!`
        };

        if (stat === "Accept") {
            config.confirmButtonColor = '#28a745'; // Green
        } else if (stat === "Reject" || stat === "Cancel") {
            config.confirmButtonColor = '#d33'; // Red
        }

        Swal.fire({
            title: config.title,
            text: "This action will update the paper's bidding state.",
            icon: stat === "Accept" ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: config.confirmButtonColor,
            cancelButtonColor: '#6c757d',
            confirmButtonText: config.confirmButtonText,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                // 3. Run the correct API based on the 'stat' parameter inside the loader
                try {
                    let response;
                    if (stat === "Accept") {
                        response = await AcceptBidAPI(bid.bidID);
                    } else if (stat === "Reject") {
                        response = await RejectBidAPI(bid.bidID);
                    } else {
                        response = await cancelBidAPI(bid.bidID);
                    }
                    return response; // Pass API string response forward
                } catch (error) {
                    Swal.showValidationMessage(`Action failed: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            // 4. Once the dynamic API completes successfully
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Success!',
                    text: result.value, // Shows your API string response
                    icon: 'success'
                });

                // 5. Filter the local React state array and re-render
                let updatedBids = [...bids].filter(i => i.bidID !== bid.bidID);
                setBids(updatedBids);
            }
        });
    };

    const BidActionSwitch = (bid) => {
        let showAction;
        switch (status) {
            case "Pending":
                showAction = pendingAction(bid);
                break;
            case "Completed":
                break;
            default:
                showAction = AcceptRejectAction(bid);
                break;

        }
        return showAction
    }

    const sortListByID = () => {
        const sorted = [...bids].sort((a, b) => {
            if (a.bidID < b.bidID) {
                return -1;
            }
            if (a.bidID > b.bidID) {
                return 1;
            }
            return 0;
        });
        setSort("id")
        setBids(sorted);
    }

    const sortListByTitle = () => {
        const sorted = [...bids].sort((a, b) => {
            if (a.paper.paperInfo.title < b.paper.paperInfo.title) {
                return -1;
            }
            if (a.paper.paperInfo.title > b.paper.paperInfo.title) {
                return 1;
            }
            return 0;
        });

        setSort("title")
        setBids(sorted);
    }


    const pendingAction = (bid) => {
        return (
            <ButtonGroup>
                <Button size="sm" color="primary" onClick={async () => CancelAcceptRejectPaper(bid, "Accept")} ><FaCheck /></Button>
                <Button size="sm" color="warning" onClick={async () => CancelAcceptRejectPaper(bid, "Reject")} ><FaRegTimesCircle />  </Button>
            </ButtonGroup>
        )
    }

    const AcceptRejectAction = (bid) => {
        return (
            <ButtonGroup>
                <Button size="sm" color="primary" onClick={async () => CancelAcceptRejectPaper(bid, "Pending")} > <MdRestore /></Button>
            </ButtonGroup>
        )
    }

    const bidsList = bids.map(bid => {
        return (
            <tr key={bid.bidID}>
                <td style={{ whiteSpace: 'nowrap' }}>{fullNamePaper(bid)}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{fullNameBid(bid)}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{bid.paper.paperInfo.title}</td>
                <td>
                    {BidActionSwitch(bid)}
                </td>
            </tr>
        )
    })

    return (
        <div>
            <Container fluid className='full-height-container'>
                <h3>Reviewer Bid</h3>


                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <ButtonGroup style={{ gap: "10px" }}>
                            <Button color='secondary' onClick={() => changeBidsStatus("Pending")} >Show Pending</Button>
                            <Button color='success' onClick={() => changeBidsStatus("Accept")}>Show Accept</Button>
                            <Button color='danger' onClick={() => changeBidsStatus("Reject")}>Show Reject</Button>
                        </ButtonGroup>

                        
                        {bidsList.length === 0 && <NoDataToDisplay />}

                        {bidsList.length !== 0 && (
                            <div>
                                <br />
                                <label style={{ marginRight: "10px" }}>
                                    <input type="radio" onClick={() => sortListByID()} checked={sort === "id"} />
                                    Sort by Date
                                </label>

                                <label>
                                    <input type="radio" onClick={() => sortListByTitle()} checked={sort === "title"} />
                                    Sort by Title
                                </label>


                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th width="20%">Author Name</th>
                                            <th width="20%">Reviewe Name</th>
                                            <th width="20%">Title</th>
                                            <th >Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bidsList}
                                    </tbody>
                                </Table>
                            </div>
                        )}

                    </div>
                )}

            </Container>
        </div>
    );
};

export default ConferenceReviewerBid;