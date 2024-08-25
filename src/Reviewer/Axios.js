import axios from 'axios'
import { getAxiosLink } from '../AxiosUrl';

const api = axios.create({
    baseURL: getAxiosLink(),
    headers: {
        "Content-type": "application/json",
    }
});

api.interceptors.request.use(async (config) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString)
    if (token) {
        config.headers.Authorization = `Bearer ${token.jwt}`
    }
    return config
})

export const getMyReviewerDataAPI = async () => {
    let response = await api.get(`reviewer`)
    return response.data;
}

export const getTotalPendingPapers = async () => {
    let response = await api.get(`papers/bid/total`)
    return response.data;
}

export const getPendingPapers = async (pageNumber) => {
    let response = await api.get(`papers/bid`,{
        params:{
            pageNumber : pageNumber
        }
    })
    return response.data;
}

export const getTotalBanPapers = async () => {
    let response = await api.get(`papers/ban/total`)
    return response.data;
}

export const getBanPapers = async (pageNumber) => {
    let response = await api.get(`papers/ban`, {
        params:{
            pageNumber : pageNumber
        }
    })
    return response.data;
}

export const addToBlackListAPI = async (data) => {
    let response = await api.post(`blacklist`,data)
    return response.data;
}

export const DeleteFromBlackListAPI = async (data) => {
    let response = await api.delete(`blacklist`,{data})
    return response.data;
}

// Bid Part
export const addToBidAPI = async (data) => {
    let response = await api.post(`bids`,data)
    return response.data;
}

export const getBidByStatus = async (id,status) => {
    let response = await api.get(`bids/${id}/${status}`)
    return response.data;
}

export const deleteFromBidAPI = async (id) => {
    let response = await api.delete(`bids/${id}`)
    return response.data;
}

export const getTotalAcceptedBidAPI = async () => {
    let response = await api.get(`bids/accepted/total`)
    return response.data
}

export const getAcceptedBidAPI = async (pageNumber) => {
    let response = await api.get(`bids/accepted`, {
        params:{
            pageNumber : pageNumber
        }
    })
    return response.data;
}

export const getMyTotalReviewsAPI = async () => {
    let response = await api.get(`reviews/myReviews/total`)
    return response.data;
}

export const getMyReviewsAPI = async (pageNumber) => {
    let response = await api.get(`reviews/myReviews`, {
        params: {
            pageNumber : pageNumber
        }
    })
    return response.data;
}

export const getOneReviewsAPI = async (reviewid) => {
    let response = await api.get(`reviews/${reviewid}`)
    return response.data;
}

export const SubmitReviewAPI = async (data) => {
    let response = await api.post(`reviews`, data)
    return response.data;
}

export const UpdateReviewAPI = async (data) => {
    let response = await api.put(`reviews`, data)
    return response.data;
}
