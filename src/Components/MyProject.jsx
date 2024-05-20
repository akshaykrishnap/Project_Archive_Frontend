import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DeleteProjectAPI, UserProjectAPI } from '../Services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../Contex/ContexShare'
import { Link } from 'react-router-dom'



function MyProject() {

// destructuring context state to update
  const { addProjectResponse } = useContext(addProjectResponseContext)
  const {editProjectResponse} = useContext(editProjectResponseContext)


  const [userProject, setUserProject] = useState([])


  const getUserProject = async () => {
    const token = sessionStorage.getItem('token')
    const reqHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await UserProjectAPI(reqHeaders)
    /*  console.log(result.data); */
    if (result.status===200) {
      setUserProject(result.data)
    } else {
      console.log(result.response.data);
    }
  }

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token')
    const reqHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await DeleteProjectAPI(id,reqHeaders)
    /*  console.log(result.data); */
    if (result.status==200) {
      getUserProject()
    } else {
      console.log(result.response.data);
    }
  }



  useEffect(() => {
    getUserProject()
  }, [addProjectResponse,editProjectResponse])

  return (


    <>
      <div className='row border rounded shadow p-4'>
        <div className="mt-4 d-flex">
          <h2 style={{ color: 'blue' }}>My Project</h2>
          <div className='ms-auto'>
            <AddProject />
          </div>


        </div>

        <div className="mt-4">
          {userProject?.length > 0 ?
            userProject?.map((item) => (<div className='border bg-light rouded p-2 d-flex'>
              <h5>{item.title}</h5>
              <div className='d-flex ms-auto'>
                <EditProject project={item} />
                <Link to={item.github} target='_blank'>
                  <FontAwesomeIcon style={{ color: 'deepskyblue' }} icon={faGithub} className='ms-3' />
                </Link >
              <Link onClick={()=>handleDelete(item._id)}>
                  <FontAwesomeIcon  style={{ color: 'red' }} icon={faTrash} className='ms-3 ' />
              </Link >
              </div>
            </div>)) : <h5 className='mt-5 text-danger' >No Project Added Yet.....</h5>}
        </div>

        

      </div>

    </>

  )
}

export default MyProject