import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AllProjectAPI } from '../Services/allAPI'

function Project() {
  const [isToken, setIsToken] = useState(false)
  const [allProject, setAllProject] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")

      const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await AllProjectAPI(searchKey,reqHeaders)
      /* console.log(result); */
      if (result.status >= 200 && result.status < 300) {
        setAllProject(result.data)
      } else {
        console.log(result.response.data);
      }

    }
  }
  /* console.log(allProject); */

  console.log(searchKey);

useEffect(()=>{
  getAllProject()
},[searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
   
  }, [])


  return (

    <>

      <Header />

      <h2 className='text-center mt-3 '> All Projects</h2>
      {isToken ?
        <div className='mt-5 justify-content-center align-items-center flex-column d-flex'>

          <div className='justify-content-center align-items-center w-100 p-4 d-flex'>
            <input type="text"onChange={(e)=>setSearchKey(e.target.value)} className='form-control mb-5 mt-4' placeholder='Search by Technologies' />
            <FontAwesomeIcon style={{ marginLeft: '-35px', marginTop: '-20px', color: 'grey' }} icon={faMagnifyingGlass} />
          </div>

          <Row className='container-fluid'>

            {allProject?.length > 0 ?
              allProject?.map(item => (
                <Col sm={12} md={6} lg={4}>
                  <ProjectCard projectkey={item} />
                </Col>


              ))
              :
              <p>No Projects</p>
            }
          </Row>

        </div> :

        <div className='justify-content-center align-items-center d-flex m-5 mt-5'>
          <img className='' style={{ width: '300px', height: '300px' }} src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/D74t1SWF5f.gif" alt="" />

          <h2 style={{ color: 'navy' }}>Please <span style={{ color: 'red' }}>Login</span> to See More Projects</h2>

        </div>}



    </>

  )
}

export default Project