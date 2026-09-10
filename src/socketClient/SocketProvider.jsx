import { useEffect } from "react";
import socket from "./socket";
import { useAuth } from "../useContext/UseContext";
import axiosClient from "../axios/endPoint";

const SocketProvider =  ({ children }) => {


   useEffect(()=>{

    const checkUserExist = async()=>{
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
