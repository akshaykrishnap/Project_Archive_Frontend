import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI'
import { useContext } from 'react'
import {logoutResponseContext} from '../Contex/ContexShare'


function Authentication({ register }) {

    const {AuthorToken,setAuthorToken} = useContext(logoutResponseContext)

    // state to store data
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
 
    const navigate = useNavigate() // naviagte to login

    console.log(userData);


    const RegisterForm = register ? true : false



    // function to register
    const handleRegister = async (e) => {
        e.preventDefault()  // to prevent data loss
        const { username, email, password } = userData
        if (!username || !email || !password) {
            toast.info('Please fill the form completely')
        } else {
            /*   toast.success('Proceed') */

            // api call
            const result = await registerAPI(userData)
            console.log(result);

            if (result.status == 200) {
                toast.success('Registration is successfull')
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else {
                toast.error(result.response.data)
            }

        }
    }


    // function to login
    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = userData

        if (!email || !password) {
            toast.info('Please fill the form completely')
        }
        else {
            const result = await loginAPI(userData)
            console.log(result);

            if (result.status == 200) {

                // adding data to session storage
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)

                toast.success('Login Successfull')
                setAuthorToken(true)
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        }

    }


    return (


        <>

            <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>

                <div className='w-57 container'>
                    <Link to={'/'} style={{ textDecoration: 'none' }} >
                        <h5 className='mb-3' style={{ color: 'deepskyblue' }}> <FontAwesomeIcon className='me-3' icon={faArrowLeft} />Back to Home  </h5>
                    </Link >

                    <div className='rounded text-light p-5' style={{ backgroundColor: 'deepskyblue' }}>
                        <Row className='align-items-center '>
                            <Col className='' sm={12} md={6}>
                                <img className='rounded w-100' src="https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif" alt="" />
                            </Col>

                            <Col className='d-flex justify-content-center align-items-center flex-column ' sm={12} md={6}>
                                <h2> <FontAwesomeIcon icon={faReact} />Project Archive</h2>

                                <h5 className='mt-3'>
                                    {
                                        RegisterForm ? 'Sign Up to Your Account ' : 'Sign In to Your Account'
                                    }
                                </h5>

                                <form className='' action="">

                                    {RegisterForm && <input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} placeholder='Enter Your Username' className='form-control' />}

                                    <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="text" className='form-control mt-3' placeholder='Enter Your Email ID' />
                                    <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" className='form-control mt-3' placeholder='Enter Your Password' />
                                    
                                    {RegisterForm ? <div>
                                        <button onClick={handleRegister} className='btn btn-warning mt-5 w-100'>Register</button>
                                        <p> Already a User? Click  Here to <Link style={{ color: 'OrangeRed' }} to={'/login'}>Login</Link> </p>
                                    </div> :
                                        <div>
                                            <button onClick={handleLogin} className='btn btn-warning mt-5 w-100'>Login</button>
                                            <p>New User? Click Here to <Link style={{ color: 'OrangeRed' }} to={'/register'}>Register</Link> </p>
                                        </div>
                                    }


                                </form>


                            </Col>

                        </Row>
                    </div>

                </div>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={1500} />
        </>


    )

}



export default Authentication