import { useContext , useEffect, useReducer  } from "react"
import { reducer } from "./reducer"
import { createContext } from "react"
import axios from "axios"
import axiosClient from "../axios/endPoint"
import { useNavigate } from "react-router-dom"
import socket from "../socketClient/socket"
import { RefreshTheToken } from "../RefreshToken/RefrshTokenL"
// off the connection tcp socket when the user leave the sessions

const initialState = {
    id : null,
    UserName :null,
    img  : null, 

}
export const useGlobalContext = createContext()


const UseContext = ({children}) => {
    const [state,dispatch] = useReducer(reducer , initialState)
    const Nav = useNavigate()
   


    
    useEffect(()=>{
         if (location.pathname === "/login") {
            return;
         }
      const HandelTryConnect   = async(data)=>{
         if(data.reason==="TOKEN_EXPIRED"){


 
            const res =   await RefreshTheToken()
            if(res.status===200){
               socket.disconnect().connect()
               console.log("we try to connect again")
            }
            else{
         
               await axiosClient.post("/api/deleteCookies")
              
               Nav("/login")
            }


         }

  

      }
      socket.on("auth_error",HandelTryConnect) 


      return()=>{
         socket.off("auth_error",HandelTryConnect)
      }

    },[])
    useEffect(() => {
       
        const initializeUserDataIFweNeedIt  = async () => {
        
            if (location.pathname === "/login") {
               return;
            }
         try{


               if (!state.UserName || !state.id || !state.img ) {
                  
  
                 const {data}= await axiosClient.get("/getmydata")
              
                // console.log(data)
                 // fix issues here
                 
   
  
  
                 if (data) {
                    dispatch({
                       type: "ADD_ID",
                       payload: {
                          id: data.id,
                          UserName: data.user_name,
                          img: data.img
  
                       }
                    })
                 }
  
  
               }


         }catch(err){
            console.log(err.message ,"temp")
          
            if(err.message==="missing Token"  ||err.message =="expired Refresh token")
            {
               await axiosClient.post("/api/deleteCookies")
                
               Nav("/login")
             
            }
         }
      
 
        }
  
        initializeUserDataIFweNeedIt ()
     }, [])
    



     
    
  return (
     <>
     
     <useGlobalContext.Provider value={{
          dispatch,
          id:state.id,
          Username : state.UserName,
         img : state.img}}>

            {children}

     </useGlobalContext.Provider>
       
        
         
     
     </>
  )
}
export const useAuth = ()=>{
    return useContext(useGlobalContext)
}
export default UseContext