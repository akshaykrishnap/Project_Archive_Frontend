import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import {logoutResponseContext} from '../Contex/ContexShare'


function Header() {

  const {AuthorToken,setAuthorToken} = useContext(logoutResponseContext)

  const navigate =useNavigate()

  const handleLogOut = ()=>{
    sessionStorage.removeItem("")
    sessionStorage.removeItem("token")
    navigate('/')
  }



  return (

    <>
      <Navbar style={{ backgroundColor: 'deepskyblue' }} className="">
        <Container>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand className=' d-flex'>
              <FontAwesomeIcon style={{ color: 'white', fontSize: '25px' }} icon={faReact} />
              <p style={{ color: 'white', fontSize: '25px' }} >Project Archive</p>
              <div><button onClick={handleLogOut} className='btn btn-danger ms-2'>Log Out</button></div>
            </Navbar.Brand>
          </Link >
        </Container>
      </Navbar>

    </>

  )
}

export default Header