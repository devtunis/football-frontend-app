import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  {BrowserRouter as Router} from "react-router-dom"
import UseContext from './useContext/UseContext.jsx'
 
createRoot(document.getElementById('root')).render(
 
       <Router>  
          <UseContext>

               <App /> 
          </UseContext>
   
       </Router>
   ,
)
