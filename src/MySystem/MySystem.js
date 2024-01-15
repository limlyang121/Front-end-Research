import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProfileUpdate from '../General/ProfileUpdate';
import UserList from '../Admin/UserList';
import UserEdit from '../Admin/UserEdit';
import UserRead from '../Admin/UserRead';
import ProfileList from '../Admin/ProfileList';
import ProfileEdit from '../Admin/ProfileEdit';
import PaperList from '../Author/PaperList';
import PaperEdit from '../Author/PaperEdit';
import PaperRead from '../Author/PaperRead';
import PaperReview from '../Author/PaperReview';
import PaperPublishList from '../Author/PaperPublishList';
import GoogleDriveUpload from '../Author/Test/GoogleDriveUpload';
import ReviewerBid from '../Reviewer/ReviewerBid';
import ReviewerBidStatus from '../Reviewer/ReviewerBidStatus';
import ReviewerReviewList from '../Reviewer/ReviewerReviewList';
import ReviewerReviewForm from '../Reviewer/ReviewerReviewForm';
import ConferenceReviewerBid from '../ConferenceChair/ConferenceReviewerBid';
import ConferencePaperList from '../ConferenceChair/ConferencePaperList';
import ConferenceAllReviewerReviews from '../ConferenceChair/ConferenceAllReviewerReviews';
import ConferenceCheckReviewerBidProcess from '../ConferenceChair/ConferenceCheckReviewerBidProcess';
import Home from "../Home";
import ErrorBoundary from '../ErrorBoundary';
import AppNavbar from '../Navbar/AppNavbar';
import Footer from '../Navbar/Footer';

export const MySystem = () => {
    return (
        <div>

            <ErrorBoundary >

                {/* <AppNavbar /> */}
                <Home />

                <Routes>

                    {/* General */}
                    <Route path='/profile' exact={true} element={<ProfileUpdate />} />


                    {/* Admin */}
                    <Route path='/admin/users' exact={true} element={<UserList />} />
                    <Route path='/admin/users/form/:id' element={<UserEdit />} />
                    <Route path='/admin/users/read/:id' element={<UserRead />} />
                    <Route path='/admin/roles' element={<ProfileList />} />
                    <Route path='/admin/roles/form/:name' element={<ProfileEdit />} />



                    {/* Auhor */}
                    <Route path='/author/papers' exact={true} element={<PaperList />} />
                    <Route path='/author/papers/form/:id' exact={true} element={<PaperEdit />} />
                    <Route path='/author/papers/read/:id' exact={true} element={<PaperRead />} />
                    <Route path='/author/papers/:id/review' exact={true} element={<PaperReview />} />
                    <Route path='/author/papers/publish' exact={true} element={<PaperPublishList />} />
                    <Route path='/author/test' exact={true} element={<GoogleDriveUpload />} />


                    {/* Reviewer */}
                    <Route path='/reviewer/bid/' exact={true} element={<ReviewerBid />} />
                    <Route path='/reviewer/mybids' exact={true} element={<ReviewerBidStatus />} />
                    <Route path='/reviewer/reviews' exact={true} element={<ReviewerReviewList />} />
                    <Route path='/reviewer/review/:id/:status' exact={true} element={<ReviewerReviewForm />} />


                    {/* Conference Chaiar */}
                    <Route path='/conference/bids' exact={true} element={<ConferenceReviewerBid />} />
                    <Route path='/conference/papers/ready' exact={true} element={<ConferencePaperList />} />
                    <Route path='/conference/papers/:id/reviews/:status' exact={true} element={<ConferenceAllReviewerReviews />} />
                    <Route path='/conference/papers/:id/bids' exact={true} element={<ConferenceCheckReviewerBidProcess />} />

                </Routes>
                <Footer />
            </ErrorBoundary>
        </div>
    )
}