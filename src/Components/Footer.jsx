import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact,faInstagram,faFacebook,faTwitter,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

function Footer()
 {
  return (

    <>
       <div className=' row p-5 m-2' style={{backgroundColor:'deepskyblue' ,color:'white'}}>

        <div className="col-md-4">
       <h2 className='me-2'><FontAwesomeIcon icon={faReact} />Project Archive</h2>
       <br />
       This website shows different projects which are created using HTML,CSS,JAVASCRIPT & BOOSTRAP. Some of the projects are made using REACT Vite.

        </div>

        <div className="col-md-2">
        <h2>Links</h2><br />
        <ul>
          <li><Link to={'/'} className='fs-5' style={{textDecoration:'none',color:'white'}} href="">Home</Link></li>
          <li><a className='fs-5' style={{textDecoration:'none',color:'white'}} href="">Login</a></li>
          <li><a className='fs-5' style={{textDecoration:'none',color:'white'}} href="">Register</a></li>
        </ul>
        </div>

        <div className="col-md-2">
        <h2>Guides</h2>
        <br />
        <a href="" className='fs-5' style={{textDecoration:'none',color:'white'}}>React</a><br />
        <a href="" className='fs-5' style={{textDecoration:'none',color:'white'}}>React Bootstrap</a><br />
        <a href="" className='fs-5' style={{textDecoration:'none',color:'white'}}>Bootswatch</a>
        </div>

        <div className="col-md-3">
          <div className='d-flex '> <input placeholder='Enter email id' style={{width:'155px',margin:'5px'}} type="text" className='form-control' /> <button style={{margin:'5px'}}  className='btn btn-warning'>Subscribe</button></div>
       <br />
       <div style={{fontSize:'30px'}} className='d-flex justify-content-between mt-4 '>
       <a style={{textDecoration:'none',color:'white'}} href="https://www.instagram.com/_akshaykrishna_p?igsh=dmxscjdpZDdyMm8x"><FontAwesomeIcon icon={faInstagram} /></a> 
       <a style={{textDecoration:'none',color:'white'}} href="https://www.facebook.com/profile.php?id=100008730258997&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a> 
       <a style={{textDecoration:'none',color:'white'}} href="https://x.com/AkshayKrishnaP7?t=UTn0dfSx6CJ3AWoRBAHpyQ&s=09"><FontAwesomeIcon icon={faTwitter} /></a> 
       <a style={{textDecoration:'none',color:'white'}} href="https://www.linkedin.com/in/akshay-krishna-p-0a807123b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"> <FontAwesomeIcon icon={faLinkedin} /></a>
       </div>
        </div>

        </div> 

    </>

  )
}

export default Footer