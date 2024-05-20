import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Project from './Pages/Project'
import DashBoard from './Pages/DashBoard'
import Footer from './Components/Footer'
import Authentication from './Components/Authentication'


function App() {
  



  return (


    <>

<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/project' element={<Project/>}/>
  <Route path='/dashboard' element={<DashBoard/>}/>
  <Route path='/login' element={<Authentication/>}/>
  <Route path='/register' element={<Authentication register/>}/>
</Routes>
<Footer/>

    </>


  )
}

export default App
