// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { getAcceptedBidAPI, getMyReviewsAPI, getMyTotalReviewsAPI, getTotalAcceptedBidAPI } from './Axios';
import { dateFormat, downloadFile } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { CircularProgress } from "@material-ui/core";

function ReviewerReviewList() {
    const [status, setStatus] = React.useState("Pending");
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalData, setTotalData] = React.useState();

    const changeList = React.useCallback((stat) => {
        setStatus(stat);
        setCurrentPage(1);
        setLoading(true)
    }, [setStatus]);

    React.useEffect(() => {
        const fetchTotalData = async () => {
            let response;
            try {
                if (status === "Pending") {
                    response = await getTotalAcceptedBidAPI();
                } else if (status === "Complete") {
                    response = await getMyTotalReviewsAPI();
                }
                setTotalData(response);
                console.log("Total Data: ", response);
            } catch (error) {
                console.error("Error fetching total data: ", error);
            }
        };
        fetchTotalData();
    }, [status]);

    React.useEffect(() => {
        const fetchMyData = async () => {
            setLoading(true);
            let response;
            try {
                if (status === "Pending") {
                    response = await getAcceptedBidAPI();
                } else if (status === "Complete") {
                    response = await getMyReviewsAPI();
                }
                setData(response);
                console.log("Fetched Data: ", response);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyData();
    }, [status]);

    const displayBidStatusHeader = () => (
        <tr>
            <th style={{ width: "10%" }}>Bid Status</th>
            <th style={{ width: "20%" }}>Paper Title</th>
            <th style={{ width: "20%" }}>FileName</th>
            <th colSpan={3}>Action</th>
        </tr>
    );

    const displayReviewStatusHeader = () => (
        <tr>
            <th style={{ width: "10%" }}>My Rating</th>
            <th style={{ width: "20%" }}>Review Date</th>
            <th style={{ width: "20%" }}>Paper Title</th>
            <th colSpan={3}>Action</th>
        </tr>
    );

    const displayBidStatus = (bids) => (
        bids.map((bid) => (
            <tr key={bid.bidID}>
                <td style={{ whiteSpace: "nowrap" }}>{bid.status}</td>
                <td style={{ whiteSpace: "nowrap" }}>{bid.paper.paperInfo.title}</td>
                <td style={{ whiteSpace: "nowrap" }}>{bid.paper.paperInfo.filename}</td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }}>
                        <Button color='primary' tag={Link} to={`/reviewer/review/${bid.bidID}/new`}>Review!</Button>
                        <Button size="sm" color="info" onClick={async () => downloadFile(bid.paper.paperID)}>Download</Button>
                    </ButtonGroup>
                </td>
            </tr>
        ))
    );

    const displayReviewStatus = (reviews) => (
        reviews.map((review) => (
            <tr key={review.reviewID}>
                <td style={{ whiteSpace: "nowrap" }}>{review.rate} out of 5</td>
                <td style={{ whiteSpace: "nowrap" }}>{dateFormat(review.reviewDate)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{review.bid.paper.paperInfo.filename}</td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }}>
                        {review.bid.paper.status === "Pending" && (
                            <Button color='info' tag={Link} to={`/reviewer/review/${review.reviewID}/edit`}>Edit Review</Button>
                        )}
                        {review.bid.paper.status !== "Pending" && (
                            <Button color='secondary' onClick={() => alert("Paper is ready to be Accept/Reject")}>Edit Review</Button>
                        )}
                    </ButtonGroup>
                </td>
            </tr>
        ))
    );

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
                        <ButtonGroup style={{ gap: "10px" }}>
                            <Button color='secondary' onClick={() => changeList("Pending")}>Show Pending</Button>
                            <Button color='primary' onClick={() => changeList("Complete")}>Show Reviewed</Button>
                        </ButtonGroup>

                        {data.length === 0 && (
                            <NoDataToDisplay />
                        )}

                        <Table striped bordered hover className="mt-4">
                            <thead>
                                {status === "Pending" && data.length !== 0 && displayBidStatusHeader()}
                                {status === "Complete" && data.length !== 0 && displayReviewStatusHeader()}
                            </thead>
                            <tbody>
                                {status === "Pending" && data.length !== 0 && displayBidStatus(data)}
                                {status === "Complete" && data.length !== 0 && displayReviewStatus(data)}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default ReviewerReviewList;
