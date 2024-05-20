import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '../src/bootstrap.min.css'
import ContexShare from './Contex/ContexShare.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ContexShare>
     <BrowserRouter> 
     <App />
     </BrowserRouter>
   </ContexShare>
  </React.StrictMode>,
)
