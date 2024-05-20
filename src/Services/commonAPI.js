import axios from "axios"




export const commonAPI = async (httpRequest, url, reqBody, reqHeaders) => {
    const reqConfig = {
        method: httpRequest,
        url: url,
        data: reqBody,
        headers: reqHeaders ? reqHeaders : { 'Content-Type': 'application/json' } /* Since there are 2 types of data we use this way- request with uploaded content & request without uploaded content */
    }

    return await axios(reqConfig).then((result) => {
        return result
    }).catch((error) => {
        return error
    })


} 
