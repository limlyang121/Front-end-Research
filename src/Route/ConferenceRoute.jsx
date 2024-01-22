import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RoleCheck from './RoleCheckingFunction';
import ConferenceReviewerBid from '../ConferenceChair/ConferenceReviewerBid';
import ConferencePaperList from '../ConferenceChair/ConferencePaperList';
import ConferenceAllReviewerReviews from '../ConferenceChair/ConferenceAllReviewerReviews';
import ConferenceCheckReviewerBidProcess from '../ConferenceChair/ConferenceCheckReviewerBidProcess';
import PageNotFound from '../General/Component/PageNotFound/PageNotFound';


const ConferenceRoute = () => {
    return (
        <RoleCheck role="conference" >
            <Routes>
                <Route path='bids' exact={true} element={<ConferenceReviewerBid />} />
                <Route path='papers/ready' exact={true} element={<ConferencePaperList />} />
                <Route path='papers/:id/reviews/:status' exact={true} element={<ConferenceAllReviewerReviews />} />
                <Route path='papers/:id/bids' exact={true} element={<ConferenceCheckReviewerBidProcess />} />
                <Route path='*' exact={true} element={<PageNotFound />} />

            </Routes>
        </RoleCheck>
    )
}

export default ConferenceRoute;