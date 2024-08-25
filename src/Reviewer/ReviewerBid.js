import * as React from 'react';
import { getPendingPapers, addToBlackListAPI, getBanPapers, DeleteFromBlackListAPI, addToBidAPI, getTotalPendingPapers, getTotalBanPapers } from './Axios';
import { Button, ButtonGroup, Container, Table, Form, Input } from 'reactstrap';
import { dateFormat, downloadFile, fullName } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { CircularProgress } from "@material-ui/core";

function ReviewerBid() {

    const [displayPapers, setDisplayPaper] = React.useState([])
    const [status, setStatus] = React.useState("bid");
    const id = sessionStorage.getItem("id")
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPaper, setTotalPaper] = React.useState();

    const changeStatus = React.useCallback((stat) => {
        setStatus(stat)
        setCurrentPage(1)
    }, [setStatus])

    React.useEffect(() => {
        const fetchTotalPaper = async () => {
            let response;
            if (status === "bid") {
                response = await getTotalPendingPapers();
                setTotalPaper(response)
            } else if (status === "hide") {
                response = await getTotalBanPapers();
                setTotalPaper(response)
            }
        }
        fetchTotalPaper();
    }, [status])


    React.useEffect(() => {
        const fetchBidData = async () => {
            let response = await getPendingPapers(currentPage);
            setDisplayPaper(response)
            setLoading(false)
        }
        const fetchBanData = async () => {
            let response = await getBanPapers(currentPage);
            setDisplayPaper(response)
            setLoading(false)
        }

        setLoading(true)

        if (status === "bid") {
            fetchBidData()
        } else {
            fetchBanData()
        }

        // console.log("Total papaer is " + totalPaper)
    }, [status, currentPage])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const addToBlackList = async (event) => {
        event.preventDefault();

        if (window.confirm("Hide the paper?")) {
            const form = event.target;
            const formData = new FormData(form);
            const blacklist = {
                reviewer: {
                    reviewerID: formData.get('reviewer.reviewerID')
                },
                paper: {
                    paperID: formData.get('paper.paperID')
                }
            };
            await addToBlackListAPI(blacklist).then(() => {
                let updatedPapers = [...displayPapers].filter(i => parseInt(i.paperID) !== parseInt(blacklist.paper.paperID));
                setDisplayPaper(updatedPapers)
            })
        }
    }

    const DeleteFromBlackList = async (event) => {
        event.preventDefault();

        if (window.confirm("Unhide?")) {

            const form = event.target;
            const formData = new FormData(form);
            const blacklist = {
                reviewer: {
                    reviewerID: formData.get('reviewer.reviewerID')
                },
                paper: {
                    paperID: formData.get('paper.paperID')
                }
            };

            await DeleteFromBlackListAPI(blacklist)
                .then(() => {
                    let updatedPapers = [...displayPapers].filter(i => parseInt(i.paperID) !== parseInt(blacklist.paper.paperID));
                    setDisplayPaper(updatedPapers)
                });
        }

    }

    const addToBid = async (event) => {
        event.preventDefault();

        if (window.confirm("Bid the papers?")) {
            const form = event.target;
            const formData = new FormData(form);
            const bid = {
                paper: {
                    paperID: formData.get('paper.paperID')
                },
                reviewer: {
                    reviewerID: formData.get('reviewer.reviewerID'),
                },
                status: ""
            }

            await addToBidAPI(bid).then((response) => {
                alert(response)
                let updatedPapers = [...displayPapers].filter(i => parseInt(i.paperID) !== parseInt(bid.paper.paperID));
                setDisplayPaper(updatedPapers)
            })
        }
    }

    const BidButtonDsiplay = (paper) => {
        return (

            <ButtonGroup style={{ gap: "10px" }}>
                <Button size="sm" color="info" onClick={async () => downloadFile(paper.paperID)} >Download</Button>
                <Form onSubmit={addToBid}>
                    <Input name="reviewer.reviewerID" id="reviewer.reviewerID" value={id} type="hidden" />
                    <Input name="paper.paperID" id="paper.paperID" value={paper.paperID} type="hidden" />
                    <Button size="sm" color="primary" type='submit'>Bid Papers</Button>

                </Form>
                <Form onSubmit={addToBlackList} >
                    <Input name="reviewer.reviewerID" id="reviewer.reviewerID" value={id} type="hidden" />
                    <Input name="paper.paperID" id="paper.paperID" value={paper.paperID} type="hidden" />

                    <Button type='submit' size="sm" color="danger" > Hide</Button>
                </Form>
            </ButtonGroup>

        )
    }

    const BanButtonDsiplay = (paper) => {
        return (
            <ButtonGroup style={{ gap: "10px" }}>
                <Form onSubmit={DeleteFromBlackList} >
                    <Input name="reviewer.reviewerID" id="reviewer.reviewerID" value={id} type="hidden" />
                    <Input name="paper.paperID" id="paper.paperID" value={paper.paperID} type="hidden" />

                    <Button type='submit' size="sm" color="primary" >Show</Button>
                </Form>
            </ButtonGroup>

        )
    }

    const displayBidPapers = (displayPapers.map(paper => (
        <tr key={paper.paperID}>
            <td style={{ whiteSpace: "nowrap" }}>{paper.paperInfo.title}</td>
            <td style={{ whiteSpace: "nowrap" }}>{dateFormat(paper.paperInfo.upload)}</td>
            <td style={{ whiteSpace: "nowrap" }}>{fullName(paper)}</td>
            <td>
                {status === "bid" && (
                    <>
                        {BidButtonDsiplay(paper)}
                    </>
                )}

                {status === "hide" && (
                    <>
                        {BanButtonDsiplay(paper)}
                    </>
                )}
            </td>
        </tr>
    ))
    );

    const totalPages = Math.ceil(totalPaper / 5);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);



    return (
        <div>
            <Container fluid className='full-height-container'>
                <h3>Bid Papers</h3>
                <ButtonGroup style={{ gap: "10px" }}>
                    <Button color='primary' onClick={() => changeStatus("bid")} >Show Bid</Button>
                    <Button color='danger' onClick={() => changeStatus("hide")} >Show Hide</Button>
                </ButtonGroup>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        {displayPapers.length === 0 &&
                            <NoDataToDisplay />
                        }

                        {displayPapers.length !== 0 && (
                            <div>

                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%" }} >Paper Title </th>
                                            <th style={{ width: "20%" }}>Paper Upload Date </th>
                                            <th style={{ width: "20%" }}>Author Name </th>
                                            <th width="40%" colSpan={3}>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayBidPapers}
                                    </tbody>

                                </Table>

                                <div>
                                    <ButtonGroup>
                                        {pageNumbers.map(number => (
                                            <Button
                                                key={number}
                                                className='pagination-button'
                                                color='primary'
                                                onClick={() => paginate(number)}
                                            >
                                                {number}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </div>

                            </div>

                        )}
                    </div>

                )}


            </Container>
        </div>
    );
};

export default ReviewerBid;