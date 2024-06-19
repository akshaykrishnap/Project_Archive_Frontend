
import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"



// request to register an user


export const registerAPI = async (reqBody) => {
    return await commonAPI('POST', `${BASE_URL}/user/register`, reqBody, "")
}


// request to login an user

export const loginAPI = async (reqBody) => {
    return await commonAPI('POST', `${BASE_URL}/user/login`, reqBody, "")
}


// request to add project

export const AddProjectAPI = async (reqBody, reqHeaders) => {
    return await commonAPI('POST', `${BASE_URL}/user/add-project`, reqBody, reqHeaders)
}


// request to get home project

export const HomeProjectAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/home-project`, "", "")
}


// request to get all project

// query parameter = path?key=Value
// eg; https://www.google.com/search?q=mecrury

export const AllProjectAPI = async (searchKey, reqHeaders) => {
    return await commonAPI('GET', `${BASE_URL}/all-project?search=${searchKey}`, "", reqHeaders)
}


// request to get user project

export const UserProjectAPI = async (reqHeaders) => {
    return await commonAPI('GET', `${BASE_URL}/user/all-project`, "", reqHeaders)
}


// request to delete user project
export const DeleteProjectAPI = async (id, reqHeaders) => {
    return await commonAPI('DELETE', `${BASE_URL}/user-project/delete/${id}`, {}, reqHeaders)
}


// request to edit user project
export const EditProjectAPI = async (projectId, reqBody, reqHeaders) => {
    return await commonAPI('PUT', `${BASE_URL}/project/edit/${projectId}`, reqBody, reqHeaders)
}


// request to update profile
export const updateProjectAPI = async (reqBody, reqHeaders) => {
    return await commonAPI('PUT', `${BASE_URL}/profile-update`, reqBody, reqHeaders)
}