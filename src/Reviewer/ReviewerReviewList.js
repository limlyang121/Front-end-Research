// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { getAcceptedBidAPI, getMyReviewsAPI } from './Axios';
import { dateFormat, downloadFile } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { CircularProgress } from "@material-ui/core";



function ReviewerReviewList() {

    const [status, setStatus] = React.useState("Pending")
    const [bids, setBids] = React.useState([])
    const [reviews, setReviews] = React.useState([])
    const [loading, setLoading] = React.useState(true);


    const changeList = React.useCallback((stat) => {
        setStatus(stat);
    }, [setStatus])

    React.useEffect(() => {
        const fetchAcceptedData = async () => {
            let response = await getAcceptedBidAPI()
            setBids(response)
        }

        const fetchCompletedData = async () => {
            let response = await getMyReviewsAPI()
            setReviews(response)
            setLoading(false)

        }

        fetchAcceptedData();
        fetchCompletedData();



    }, [])


    const displayBidStatusHeader = () => {
        return (
            <tr>
                <th style={{ width: "10%" }} > Bid Status </th>
                <th style={{ width: "20%" }} > Paper Title </th>
                <th style={{ width: "20%" }} > FileName </th>
                <th colSpan={3}>Action</th>
            </tr>
        )
    }

    const displayReviewStatusHeader = () => {
        return (
            <tr>
                <th style={{ width: "10%" }} > My Rating </th>
                <th style={{ width: "20%" }} > Review Date </th>
                <th style={{ width: "20%" }} > Paper Title </th>
                <th colSpan={3}>Action</th>
            </tr>
        )
    }



    const displayBidStatus = () => {
        return bids.map((bid) => (
            <tr key={bid.bidID} >
                <td style={{ whiteSpace: "nowrap" }} > {bid.status}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paper.paperInfo.filename}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }} >
                        <Button color='primary' tag={Link} to={`/reviewer/review/${bid.bidID}/new`}> Review!</Button>
                        <Button size="sm" color="info" onClick={async () => downloadFile(bid.paper.paperID)} > Download</Button>
                    </ButtonGroup>
                </td>
            </tr>
        ));
    }

    const displayReviewStatus = () => {
        return reviews.map((reviews) => (
            <tr key={reviews.reviewID} >
                <td style={{ whiteSpace: "nowrap" }} > {reviews.rate} out of 5  </td>
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat(reviews.reviewDate)}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {reviews.bid.paper.paperInfo.filename}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }} >
                        {reviews.bid.paper.status === "Pending" &&
                            <Button color='info' tag={Link} to={`/reviewer/review/${reviews.reviewID}/edit`}> Edit Review</Button>
                        }
                        {reviews.bid.paper.status !== "Pending" &&
                            <Button color='secondary' onClick={() => alert("Paper is ready to be Accept/Reject")} > Edit Review</Button>
                        }
                    </ButtonGroup>
                </td>
            </tr>
        ))
    }


    return (
        <div>
            <Container fluid className='full-height-container'>
                <h3>Review List</h3>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <ButtonGroup style={{ gap: "10px" }} >
                            <Button color='secondary' onClick={() => changeList("Pending")} > Show Pending</Button>
                            <Button color='primary' onClick={() => changeList("Complete")}> Show Reviewed</Button>

                        </ButtonGroup>

                        {status === "Pending" && bids.length === 0 && (
                            <NoDataToDisplay />
                        )}

                        {status === "Complete" && reviews.length === 0 && (
                            <NoDataToDisplay />
                        )}

                        <Table striped bordered hover className="mt-4">
                            <thead>
                                {status === "Pending" && bids.length !== 0 && displayBidStatusHeader()}
                                {status === "Complete" && reviews.length !== 0 && displayReviewStatusHeader()}
                            </thead>
                            <tbody>
                                {status === "Pending" && bids.length !== 0 && displayBidStatus()}
                                {status === "Complete" && reviews.length !== 0 && displayReviewStatus()}
                            </tbody>
                        </Table>

                    </div>

                )}
            </Container>
        </div>
    );
};

export default ReviewerReviewList;