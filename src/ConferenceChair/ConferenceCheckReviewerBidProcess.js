import * as React from 'react';
import { Button, Container, Table } from 'reactstrap';
import { fetchAllBidsByPaperIDAPI } from './Axios';
import { Link, useParams } from 'react-router-dom';
import { deleteFromBidAPI } from '../Reviewer/Axios';
import { dateFormat, fullNameDetails } from '../General/GeneralFunction';
import { CircularProgress } from "@material-ui/core";


function ConferenceCheckReviewerBidProcess() {
    const [bidList, setBidsList] = React.useState([]);
    const { id } = useParams()
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAllBidsByPaperID = async (id) => {
            let response = await fetchAllBidsByPaperIDAPI(id);
            setBidsList(response);
            setLoading(false)
        }

        setLoading(true)

        fetchAllBidsByPaperID(id);
    }, [id])

    const deleteBid = async (bidID) => {
        if (window.confirm("Delete this Bid? ")) {
            await deleteFromBidAPI(bidID).then((response) => {
                alert(response);
                let updatedBids = [...bidList].filter(i => i.bidID !== bidID);
                setBidsList(updatedBids);
            })
        }
    }

    return (
        <div>
            <Container fluid className='full-height-container'>

                <br />

                <h3>Bid Status </h3>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th style={{ width: "20%" }} > Reviewer Name </th>
                                    <th style={{ width: "20%" }} > Paper Upload Date </th>
                                    <th style={{ width: "20%" }} > Bid Date </th>
                                    <th style={{ width: "20%" }} > Status </th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bidList.map((bid) => {
                                    return (
                                        <tr key={bid.bidID}>
                                            <td> {fullNameDetails(bid.reviewer.userdetails)}</td>
                                            <td> {dateFormat(bid.paper.paperInfo.upload)} </td>
                                            <td> {dateFormat(bid.bidDate)} </td>
                                            {bid.status === "Complete" ? (
                                                <React.Fragment>
                                                    <td style={{ color: "green" }} > {bid.status} </td>
                                                    <td> <Button color='secondary' disabled> Unbid </Button>  </td>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <td style={{ color: "red" }}> {bid.status} </td>
                                                    <td> <Button color='warning' onClick={async () => deleteBid(bid.bidID)}> Unbid </Button>  </td>
                                                </React.Fragment>
                                            )}
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </Table>
                        {bidList.every(item => item.status === "Complete")
                            ? <Button color='primary' tag={Link} to={`/conference/papers/` + id + `/reviews/Ready`} > Accept/Reject </Button>
                            : <Button color='secondary' disabled > Accept/Reject </Button>
                        }

                    </div>

                )}

            </Container>
        </div>
    );
};

export default ConferenceCheckReviewerBidProcess;