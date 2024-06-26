// @flow strict

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Container, Form } from 'reactstrap';
import { acceptPaperToPublishAPI, getPaperReviewsAPI, rejectPaperToPublishAPI } from './Axios';
import { CircularProgress } from "@material-ui/core";

function ConferencePaperReview() {

    const [paperReview, setPaperReviews] = React.useState([]);
    const [average, setAverage] = React.useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchReview = async (id) => {
            let response = await getPaperReviewsAPI(id);
            setPaperReviews(response);

            const sum = response.reduce((acc, review) => acc + review.rate, 0);
            setAverage(sum / response.length);
        }

        fetchReview(id)

    }, [])

    const getFullName = (review) => {
        return (
            review.bidDTO.reviewerDTO.userdetails.firstName + " " + review.bidDTO.reviewerDTO.userdetails.lastName
        )
    }

    const displayReview = () => {
        if (paperReview.length === 0) {
            return (
                <h2 style={{ textAlign: 'center' }}>Currently no review Yet</h2>
            )
        }

        return paperReview.map((review, index) => (
            <div key={index}>
                <Card>
                    <CardHeader>
                        Review {index + 1}
                    </CardHeader>

                    <CardBody>
                        Comment: {review.comment}
                    </CardBody>
                    <CardFooter>
                        {getFullName(review)}, Rating : {review.rate}
                    </CardFooter>
                </Card>

                <br /> <br />
            </div>
        ));
    }


    const acceptPaperToPublish = async (id) => {
        if (window.confirm("Are you sure want to Publish this Paper?")) {

            await acceptPaperToPublishAPI(id).then((response) => {
                alert(response);

                navigate("/home")
            })
        }
    }

    const rejectPaperToPublish = async (id) => {
        if (window.confirm("Are you sure want to Reject this Paper?")) {
            await rejectPaperToPublishAPI(id).then((response) => {
                alert(response);

                navigate("/home")
            })
        }
    }


    return (
        <div>
            <Container fluid className='full-height-container'>
                <br />
                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        {displayReview()}

                        Average is : {average}

                        <Form>
                            <ButtonGroup style={{ gap: "10px" }}>
                                <Button color='primary' onClick={async () => acceptPaperToPublish(id)}> Accept</Button>
                                <Button color='danger' onClick={async () => rejectPaperToPublish(id)}>  Reject</Button>
                            </ButtonGroup>
                        </Form>

                    </div>

                )}



            </Container>
        </div>
    );
};

export default ConferencePaperReview;