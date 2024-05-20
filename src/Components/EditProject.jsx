import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { EditProjectAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseURL';
import { editProjectResponseContext } from '../Contex/ContexShare';



function EditProject({ project }) {

    /* console.log(project); */

    const {setEditProjectResponse} =useContext(editProjectResponseContext)

    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })


    const [preview, setPreview] = useState("")



    useEffect(() => {
        projectDetails.projectImage &&
            setPreview(URL.createObjectURL(projectDetails.projectImage))// to convert the file into url
    }, [projectDetails.projectImage])




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleClose1 = () => {
        setProjectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
    }


    const handleEdit = async (e) => {
        e.preventDefault()
        const { id, title, language, github, website, overview, projectImage } = projectDetails
        console.log(id, title, language, github, website, overview, projectImage);


        if (!id || !title || !language || !github || !website || !overview) {
            toast.warning('Please fill the form completely')
        } else {
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
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", projectImage)


            const token = sessionStorage.getItem("token")

            if (preview) { // for previews upload
                const reqHeaders = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`  //bearer - no other credentials/documents is required to verify the data request data holder

                }
                const result = await EditProjectAPI(id, reqBody, reqHeaders)
                console.log(result);
                if (result.status == 200) {
                    toast.success("Project Updated Successfully")
                    handleClose()
                    setEditProjectResponse(result.data)
                }

            } else {  // no uploads
                const reqHeaders = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  //bearer - no other credentials/documents is required to verify the data request data holder

                }
                const result = await EditProjectAPI(id, reqBody, reqHeaders)
                console.log(result);
                if (result.status == 200) {
                    toast.success("Project Updated Successfully")
                    handleClose()
                    setEditProjectResponse(result.data)
                }
            }

        }
        /*    */
    }

    return (

        <>
            <>
                <FontAwesomeIcon style={{ color: 'green', fontWeight: 'bold' }} onClick={handleShow} icon={faPenToSquare} />
            </>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='row'>
                        <div className="col-md-6">
                            <label htmlFor="img">
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file" id='img' style={{ display: 'none' }} />
                                <img style={{ height: '250px' }} className='w-100 ' src={preview ? preview : `${BASE_URL}/uploaded/${project.projectImage}`} alt="" />
                            </label>
                        </div>

                        <div className="col-md-6 ">
                            <div style={{ marginTop: '10px' }}>
                                <input type="text" className='form-control' placeholder='Project Title' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <input type="text" className='form-control' placeholder='Language' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <input type="text" className='form-control' placeholder='GitHub Link' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <input type="text" className='form-control' placeholder='Website Link' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <textarea rows='3' cols='30' type="text" className='form-control' placeholder='Overview' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview}></textarea>
                            </div>

                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose1}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>



            <ToastContainer theme='colored' position='top-center' autoClose={1500} />
        </>

    )
}

export default EditProject