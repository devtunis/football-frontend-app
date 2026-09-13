import { useEffect } from "react";
import socket from "./socket";
import "./socket.css"
import axiosClient from "../axios/endPoint";
import { useState } from "react";


const SocketProvider = ({ children }) => {

    const [isOnline,SetIsOnline] = useState(false)


   useEffect(()=>{

     const checkUserExist = async () => {
       if (["/LoginAccount", "/login", "/CreateAccount"].includes(location.pathname)) return

      try{
      const user = await axiosClient.get("/getmydata")

      if(user.status===200){
        socket.connect()
      }
      }
      catch(err){
         if(err.message == "missing Token")   return


      }

   }

   checkUserExist()


   return()=>{
    socket.disconnect()
   }
   },[])


  useEffect(() => {
    let timeoutId
    const HandeLScoketTabs = () => {
        if (["/LoginAccount", "/login", "/CreateAccount"].includes(location.pathname)) return
      if (document.visibilityState === 'hidden') {

        socket.disconnect()
       // SetIsOnline(false)

      }  else {

        socket.connect()
       // SetIsOnline(true)

          timeoutId = setTimeout(() => {
            SetIsOnline(false)
          }, 2000);


      }

     }


    document.addEventListener('visibilitychange', HandeLScoketTabs)

    return () => {
      document.removeEventListener("visibilitychange", HandeLScoketTabs)
      clearTimeout(timeoutId)

     }


   },[document.visibilityStat])

  return <>
    {
      isOnline &&
        <div className="back-online">
        <span className="online-dot"></span>
        <span>We're back online!</span>
        </div>

   }
    {children}

  </>;
};

export default SocketProvider;
