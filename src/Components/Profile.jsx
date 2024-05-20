import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { updateProjectAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseURL';


function Profile() {
  const [open, setOpen] = useState(false);

  const [preview, setPreview] = useState("")

  const [existingImage, setExistingImage] = useState("")

  const [update, setUpdate] = useState(false)

  const [userProfile, setProfile] = useState({
    username: "",
    emailid: "",
    password: "",
    github: "",
    linkedin: "",
    profile: ""
  })
  console.log(userProfile);


  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('existingUser'))
    setProfile({
      ...userProfile, username:user.username, emailid:user.mailId, password:user.password,
      github:user.github, linkedin:user.linkedin
    })

    // if there is any uploaded image
    setExistingImage(user.profile)


  }, [])

  useEffect(() => {
    userProfile.profile &&
      setPreview(URL.createObjectURL(userProfile.profile)) // to convert img to url

  }, [userProfile.profile])

  console.log(preview);

  const handleUpdate = async (e) => {
    e.preventDefault()

    const { username, emailid, password, github, linkedin, profile } = userProfile

    if (!github || !linkedin) {
      toast.info("Please fill the form completely")
    } else {
      const reqBody = new FormData()
      // to add data to the body - use apped() can add only  only one item at a time
      reqBody.append("username", username)
      reqBody.append("emailid", emailid)
      reqBody.append("github", github)
      reqBody.append("password", password)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImage)


    }

    const token = sessionStorage.getItem("token")

    if (preview) {
      const reqHeaders = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`  //bearer - no other credentials/documents is required to verify the data request data holder

      }

      const result = await updateProjectAPI(reqBody, reqHeaders)
      if (result.status == 200) {
        toast.success("Project Updated Successfully")
        setUpdate(true) // update status
        sessionStorage.setItem("existingUser", JSON.stringify(result.data))

      }

    } else {
      const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  //bearer - no other credentials/documents is required to verify the data request data holder

      }

      const result = await updateProjectAPI(reqBody, reqHeaders)
      if (result.status == 200) {
        toast.success("Project Updated Successfully")
        setUpdate(true)
        sessionStorage.setItem("existingUser", JSON.stringify(result.data))

      }


    }


  }


  return (

    <>

      <div className="rounded border shadow p-4" onMouseEnter={() => setOpen(true)}>
        <div className="d-flex justify-content-between">
          <h3>Profile</h3>
          <button onClick={() => setOpen(!open)} style={{ backgroundColor: 'orange', color: 'white' }} className='btn'>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>

        <Collapse in={open}>
          <div className="row p-3 tex">
            <label htmlFor="profile">
              <input onChange={(e) => setProfile({ ...userProfile, profile:e.target.files[0] })} type="file" id='profile' style={{ display: 'none' }} />
              {existingImage == "" ?
                <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src={preview?preview :'https://cdn-icons-png.freepik.com/256/3177/3177440.png'} alt="" />
                :
                <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="" />
              }

            </label>
            <div className="mb-3 mt-5">
              <input type="text" value={userProfile.github} className='form-control' onChange={(e) => setProfile({ ...userProfile, github:e.target.value })} placeholder='GitHub' />
            </div>
            <div className="mb-3 ">
              <input type="text" value={userProfile.linkedin} className='form-control' onChange={(e) => setProfile({ ...userProfile, linkedin:e.target.value })} placeholder='LinkedIn' />
            </div>
            <div className="mb-3 ">
              <button onClick={(e)=>handleUpdate(e)} style={{ backgroundColor: 'deepskyblue', color: 'white' }} className='btn w-100'>Update</button>
            </div>
          </div>
        </Collapse>

      </div>

      <ToastContainer theme='colored' position='top-center' autoClose={1500} />

    </>

  )
}



export default Profile