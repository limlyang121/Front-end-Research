import { saveAs } from "file-saver"
import { format } from "date-fns"
import { downloadPapersAPI } from "./Axios/DownloadAxios";
import Swal from "sweetalert2";


export const downloadFile = async (id) => {
    try {
        Swal.fire({
            title: 'Downloading Paper',
            html: 'Please wait while your file is processing...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading(); // Triggers the native loading spinner animation
            }
        });

        let response = await downloadPapersAPI(parseInt(id))
        const contentDispositionHeader = response.headers['content-disposition'];
        const filename = contentDispositionHeader.split(';')[1].trim().split('=')[1].replace(/"/g, '');

        const blob = new Blob([response.data], { type: "application/pdf" })
        saveAs(blob, filename)

        Swal.close(); 

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Download Failed',
            text: 'An unknown error occurred.',
        });
    }
}

export const dateFormat = (date) => {
    const dateType = new Date(date)

    return (format(dateType, "dd/MM/yyyy"))
}

export const fullName = (paper) => {
    return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
}

export const fullNameDetails = (userdetails) => {
    return userdetails.firstName + " " + userdetails.lastName;
}

export const displayErrorMessage = (error, navigate, link) => {
    if (error.response.status === 403) {
        alert(error.response.data.message)

    } else if (error.response.status === 500)
        alert(error.response.data.message)

    else if (error.response.status === 404)
        alert(error.response.data.message)

    else if (error.response.status === 400) {
        alert(error.response.data.message)
    }

    if (link != null)
        navigate(link)
}