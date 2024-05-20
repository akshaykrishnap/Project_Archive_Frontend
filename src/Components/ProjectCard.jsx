import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import s3 from '../assets/s3.png'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../Services/baseURL';



function ProjectCard({projectkey}) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true);


    return (

        <>
            <Card onClick={handleShow} className='shadow m-md-4 p-3' style={{ width: '20rem' }}>
                <Card.Img variant="top" src={projectkey?`${BASE_URL}/uploaded/${projectkey.projectImage}`:null} />
                <Card.Body>
                    <Card.Title className='text-center'>{projectkey.title}</Card.Title>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{projectkey.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Row>
                    <Col sm={12} md={6}>
                        <img src={projectkey.projectImage} alt="imag" className='w-100' />
                    </Col>

                    <Col sm={12} md={6}>
                        <h2>Description</h2>
                        <p>{projectkey.overview}
                        </p>

                        <h2>Technologies</h2>
                        <p>{projectkey.language}</p>

                    </Col>
                  </Row>
                </Modal.Body>

                <Modal.Footer>
<div className='me-auto'>
                    <Link to={projectkey.github} target='_blank'>  <FontAwesomeIcon style={{color:'black'}} size='2xl' icon={faGithub} /> </Link>
    
                    <Link to={projectkey.website} target='_blank' >  <FontAwesomeIcon style={{color:'black'}} size='2xl' icon={faLink} /> </Link>
</div>
                </Modal.Footer>
            </Modal>

        </>

    )
}

export default ProjectCard