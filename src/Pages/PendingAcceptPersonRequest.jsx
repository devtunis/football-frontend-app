

import  {ArrowLeft, RefreshCcw} from "lucide-react"
import "./PendingAcceptPersonRequest.css"
import PendingRequest from "../Component/PendingRequest"
import { useEffect, useState } from "react"
import axiosClient from "../axios/endPoint"
import FirstView from "../Loader/FirstView"
import {  useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../useContext/UseContext"



const PendingAcceptPersonRequest = () => {

 const [loading,setLoading] = useState(false)
 const [requests,setRequestes] = useState([])
 const [name ,setUsername]= useState("user")
 const [hide,setHide] = useState(false)
 const {Username , id , img} = useAuth()

 const Nav = useNavigate()


  useEffect(()=>{
      if(id){

        setUsername(Username)
        return
      }

    },[id])


 const idRoom   = useParams()


  useEffect(()=>{
    if(!idRoom.roomId)
    {
      Nav("/login")
    }
  },[])



 useEffect(()=>{

  const getRequest =async ()=>{
    try{


         const response = await axiosClient.post("/room/seeRequests" ,{
        "roomId" : idRoom.roomId
       })
       if(response?.data.info =="return to team home"){
        Nav("/myTeam")

        return
       }

       console.log(response)
       if(response?.data?.info =="you not the owner"){
        setHide(true)
       }

      setRequestes(response.data.data)

    }catch(error){
        console.log(error.response?.data);
    }
  }
  getRequest()
 },[])



 const FilterIds = (id)=>{


   setRequestes((prevRequests) =>
    prevRequests.filter((item) => item.userId !== id)
  )


 }



 const HandelRefreshData = async()=>{
       setLoading(true)
       const Response = await axiosClient.post("/room/seeRequests" ,{
        "roomId" : idRoom.roomId
       })

         if(Response?.data.info =="return to team home"){
        Nav("/myTeam")

        return
       }


          if(Response.data.info =="you not the owner"){
            setHide(true)
          }


       setRequestes(Response.data.data)
        setLoading(false)
 }

  return (
     <>

   {
      loading && <FirstView/>
    }
     <div className="PendingAcceptPersonRequest">
        <div className="headerPendingNotifaction"> <ArrowLeft onClick={()=>Nav(`/home/Scores/${idRoom.roomId}`)} size={30}/> <h2>Welcome {name}</h2> </div>
        <div className="PendingRequest">







{!hide   &&      <>        <div className="headr_request">
             <h1 className="Pending">Pending</h1>
              <h1 className="Pending sp"  onClick={()=>HandelRefreshData()} ><RefreshCcw size={20}/></h1>
           </div>
            <div className="PendingSectionRoom">




              {
                requests.length>0  ?
                requests.map((item)=> <PendingRequest
                                       fetchId ={FilterIds}
                                       setL={setLoading}
                                       key={item.userId}
                                       data={item}
                                       type={"Pending"}/>  )


                : <h1 style={{color:"white"}}>you dont have notification</h1>
              }

            </div>


            </>}

              <h1 className="Pending">News</h1>
               <div className="newSectionRoom">
              <PendingRequest type={"news"}/>

            </div>

        </div>
     </div>

     </>
  )
}

export default PendingAcceptPersonRequest
