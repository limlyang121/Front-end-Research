import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReviewerBid from '../Reviewer/ReviewerBid';
import ReviewerBidStatus from '../Reviewer/ReviewerBidStatus';
import ReviewerReviewList from '../Reviewer/ReviewerReviewList';
import ReviewerReviewForm from '../Reviewer/ReviewerReviewForm';
import RoleCheck from './RoleCheckingFunction';
import PageNotFound from '../General/Component/PageNotFound/PageNotFound';


const ReviewerRoute = () => {
    return (
        <RoleCheck role="reviewer" >
            <Routes>
                <Route path='bid' exact={true} element={<ReviewerBid />} />
                <Route path='mybids' exact={true} element={<ReviewerBidStatus />} />
                <Route path='reviews' exact={true} element={<ReviewerReviewList />} />
                <Route path='review/:id/:status' exact={true} element={<ReviewerReviewForm />} />
                <Route path='*' exact={true} element={<PageNotFound />} />

            </Routes>
        </RoleCheck>
    )
}

export default ReviewerRoute