import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact} from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import s2 from '../assets/s2.png'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { HomeProjectAPI } from '../Services/allAPI'



 function Home() {

const [isLogin,setIsLogin] = useState(false)
const [homeProject,setHomeProject]= useState([])

useEffect(()=>{
  if(sessionStorage.getItem("token")){
   setIsLogin(true)
  }

},[])

const getHomeProject = async()=>{
  const result = await HomeProjectAPI()
 /*  console.log(result.data); */
  setHomeProject(result.data)
}
console.log(homeProject);


useEffect (()=>{
  getHomeProject()
},[])

  return (

    <>
    
    <div style={{width:'100%',height:'100vh',backgroundColor:'deepskyblue' ,color:'white'}}>

<div className="container-fluid rounded">
<Row className='align-items-center p-5 '>

<Col sm={12} md={6}>
<h1 style={{}} className='me-2'><FontAwesomeIcon icon={faReact} />Project Archive</h1>
<p style={{fontSize:'20px'}} className='mt-3'>This website shows different projects which are created using HTML,CSS,JAVASCRIPT & BOOSTRAP. Some of the projects are made using REACT+Vite. </p>

{isLogin?<Link to={'/dashboard'}><button className='btn w-25 btn-warning m-3'>Manage Projects
  <FontAwesomeIcon icon={faArrowRight}/></button></Link>


:<Link to={'/login'}> {/* login & register button */}
  <button className='btn w-25 btn-warning m-3'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button>
</Link>}

</Col>

<Col  sm={12} md={6}>
<img className='w-100' src={s2} alt="" />
</Col>

</Row>

</div>

    </div>
    
     <div className='mt-5'>
      <h1 className='text-center'>Explore Our Projects</h1>
     </div>

     <marquee scrollAmount={15}> 
     <div className='d-flex mt-5 mb-5 ' >  
    {homeProject?.length>0?
      

    <div className='row'>
        {homeProject.map((item)=>(<div className='col-md-4'><ProjectCard projectkey={item}/> </div>))}
    
        
     
     
        </div> :null}
     </div>
     </marquee>

    <div style={{color:'black'}} className='text-center mb-5'>
      <Link to={'/project'}>See More Project</Link>
    </div>

    </>


  )
}
export default Home