import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProject from '../Components/MyProject'
import Profile from '../Components/Profile'
import { parse } from '@fortawesome/fontawesome-svg-core'


function DashBoard() {

  const [username, setUserName] = useState("")

  useEffect(() => {
    setUserName(JSON.parse(sessionStorage.getItem("existingUser")).username)
  }, [])





  return (


    <>

      <Header />

      <h2 className='m-4'>Welcome <span className='text-danger'>{username}</span> </h2>
      <div className="row my-5 p-5" >
        <div className="col-md-8">
          <MyProject />
        </div>

        <div className="col-md-4 mt-5 mt-md-8nn">
          <Profile />
        </div>
      </div>
      

    </>


  )
}

export default DashBoard