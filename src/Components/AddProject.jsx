import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AddProjectAPI } from '../Services/allAPI';
import { addProjectResponseContext } from '../Contex/ContexShare';


function AddProject() {

const {setAddProjectResponse}=useContext(addProjectResponseContext)

    const [show, setShow] = useState(false);

    // state to  change key for url to file type
    const [key, setKey] = useState(false)

    // for tokens
    const [token, setToken] = useState("")



    //state to hold details of the project
    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })

    // state to store the url to file
    const [preview, setPreview] = useState("")
    useEffect(() => {
        projectDetails.projectImage &&
            setPreview(URL.createObjectURL(projectDetails.projectImage))// to convert the file into url
    }, [projectDetails.projectImage])




    // function to reset
    const handleClose1 = () => {
        setProjectDetails({
            title: "",
            language: "",
            github: "",
            website: "",
            overview: "",
            projectImage: ""
        })
        setPreview("")
        setKey(!key)
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])
    console.log(token);

    // function to add project 
    const handleAdd = async (e) => {
        e.preventDefault()

        const { title, language, github, website, overview, projectImage } = projectDetails

        if (!title || !language || !github || !website || !overview || !projectImage) {
            toast.warning('Please fill the form completely')
        }
        else {
            // request body - formdata class object
            // if your request contains uploaded content the body have to send in formuate of formdat
            // 1) create an object for formdata class
            const reqBody = new FormData()
            // To add data to the body - use can add only one item at a time
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            // request header
            if (token) {
                const reqHeaders = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`          // bearer - no other credential / document is required to verify the request
                }
                // call api
                const result = await AddProjectAPI(reqBody, reqHeaders)
                console.log(result);
                if(result.status==200){
                    toast.success('Project Uploaded Succefully')
                    handleClose()
                    setAddProjectResponse(result.data)
                }
                else{
                    toast.warning(result.response.data)
                    handleClose()
                }
            }


        }
    }





    console.log(projectDetails);



    const handleClose = () =>{ setShow(false);
    handleClose1()}
    const handleShow = () => setShow(true);

    return (


        <>
            <div>
                <button onClick={handleShow} style={{ color: 'white', backgroundColor: 'RoyalBlue', fontWeight: 'bold' }} className='btn '>
                    Add Project
                </button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='row'>
                        <div className="col-md-6">
                            <label htmlFor="img">
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file" id='img' key={key} style={{ display: 'none' }} />
                                <img style={{ height: '250px' }} className='w-100 ' src={preview ? preview : "https://studentprojectguide.com/wp-content/uploads/2019/12/student-projetc.jpg"} alt="" />
                            </label>
                        </div>

                        <div className="col-md-6">
                            <div style={{ marginTop: '10px' }}>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} type="text" className='form-control' placeholder='Project Title' />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} type="text" className='form-control' placeholder='Language' />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.gitgub} type="text" className='form-control' placeholder='GitHub Link' />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} type="text" className='form-control' placeholder='Website Link' />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <textarea onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} rows='3' cols='30' type="text" className='form-control' placeholder='Overview'></textarea>
                            </div>

                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose1}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer theme='colored' position='top-center' autoClose={1500} />
        </>

    )
}

export default AddProject