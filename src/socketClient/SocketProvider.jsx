import { useEffect } from "react";
import socket from "./socket";

import axiosClient from "../axios/endPoint";

const SocketProvider =  ({ children }) => {


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




  return <>{children}</>;
};

export default SocketProvider;
