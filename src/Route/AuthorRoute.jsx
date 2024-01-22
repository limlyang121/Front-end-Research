import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GoogleDriveUpload from '../Author/Test/GoogleDriveUpload';
import PaperPublishList from '../Author/PaperPublishList';
import PaperReview from '../Author/PaperReview';
import PaperRead from '../Author/PaperRead';
import PaperEdit from '../Author/PaperEdit';
import RoleCheck from './RoleCheckingFunction';
import PaperList from '../Author/PaperList';
import PageNotFound from '../General/Component/PageNotFound/PageNotFound';

const AuthorRoute = () => {
    return (
        <RoleCheck role="author" >
            <Routes>
                <Route path='papers' exact={true} element={<PaperList />} />
                <Route path='papers/form/:id' exact={true} element={<PaperEdit />} />
                <Route path='papers/read/:id' exact={true} element={<PaperRead />} />
                <Route path='papers/:id/review' exact={true} element={<PaperReview />} />
                <Route path='papers/publish' exact={true} element={<PaperPublishList />} />
                <Route path='test' exact={true} element={<GoogleDriveUpload />} />
                <Route path='*' exact={true} element={<PageNotFound />} />

            </Routes>
        </RoleCheck>
    )
}

export default AuthorRoute;