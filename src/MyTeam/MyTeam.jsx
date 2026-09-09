import   { useEffect, useState } from 'react'
import "./MyTeam.css"
import { useNavigate } from 'react-router-dom'
import Card from '../Component/Card'
import {   ArrowRight,    Compass,   Plus,     X } from 'lucide-react'
import { useAuth } from '../useContext/UseContext'
 
import axiosClient from '../axios/endPoint'
 
import Online from '../online/Online'
import CardSkeleton from '../Loader/CardSkeleton'

const MyTeam = () => {
    const [off,SetOff] = useState(true)
    const {id}  =  useAuth()
    const [rooms,SetRooms] = useState([])
    const [isFollowRoom,SetisFollowRoom]= useState(false)
    const [Skeleton,SetSkeleten] = useState(false)




    const Nav = useNavigate()
    





   useEffect(()=>{


    const getMyRooms =async ()=>{

      try{
      SetSkeleten(true)
      const roomListResponse =  await axiosClient.get("/room/getrooms")

      if(roomListResponse.data.err =="you dont follow any rooms ."){
        console.log("no room ")
        SetisFollowRoom(true)
        SetSkeleten(false)

      }

      if(roomListResponse?.data?.info?.length==0){
        SetisFollowRoom(true)
          SetSkeleten(false)


      }
      if(roomListResponse?.data?.info?.length>0){
         console.log(roomListResponse.data)
         SetisFollowRoom(false)
         SetRooms(roomListResponse.data.info)
         SetSkeleten(false)
      }



      }catch(err){
        SetSkeleten(false)
        console.log(err.message)
      }
      finally{
         SetSkeleten(false)
      }

    }

    getMyRooms()
   },[])

  const HandelRefresh = async()=> {
      try{
      SetSkeleten(true)
      const roomListResponse =  await axiosClient.get("/room/getrooms")

      if(roomListResponse.data.err =="you dont follow any rooms ."){
        console.log("no room ")
        SetisFollowRoom(true)
        SetSkeleten(false)
      }

      if(roomListResponse?.data?.info?.length==0){
        SetisFollowRoom(true)
         SetSkeleten(false)


      }
      if(roomListResponse?.data?.info?.length>0){
         console.log(roomListResponse.data)
         SetisFollowRoom(false)
         SetSkeleten(false)
         SetRooms(roomListResponse.data.info)
      }



      }catch(err){
          SetSkeleten(false)
        console.log(err.message)
      }
      finally{
          SetSkeleten(false)
      }

  }





  return (
    <div className='myTeam'>

      <div className="navbar-heaedr">


        <div className="nav-option">
            <div className="first-nav-option">
                <img src="./myTeamIcon/arrow.svg" alt=""   />
                <h1 onClick={()=>console.log("my id",id)}>My Team</h1>
            </div>
            <div className="seconde-nav-option">

                 <img src="./myTeamIcon/search.svg"  alt="" />
                 <img src="./myTeamIcon/Option.svg" alt="" />

            </div>
        </div>

      </div>


         <div className="refresh_option">
                  <img src="./myTeamIcon/refresh.svg" alt="" onClick={()=>HandelRefresh()} />
         </div>

        <div className="Session-groups">

                    {isFollowRoom ?
                     <div className="youdontfollowroomdes">
                      <img src='/myteamPics/no-follow/picnofollow.png' alt='loading'/>

                      <h1>you don't follow </h1>
                      <h2>any room yet</h2>
                      <p>Follow rooms to get updates ,matches alertes</p>
                      <p>and announcements in one place</p>
                      <button className='button-session-desing'><Compass/> Explore rooms<ArrowRight/></button>
                     </div>


                    :
                    Skeleton?
                    <>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    </>
                    :
                      rooms.map((item)=><Card info={item} key={item.roomId}/>)
                    }


        </div>


  <div className="add__session bounce" style={{cursor:"pointer"}} onClick={()=>SetOff((prev)=>!prev)}>
 
    {off ?   <Plus size={25}/>  :  <X size={25}/>}
  </div>

<div className="ContainerSessionadding" style={{ zIndex:off&& -1 ,cursor:"pointer"}}>


  <div
  onClick={()=>Nav("/JoinSession")}

  className={`create_session_card bounce ${off&& 'off'} `}>
    <h1>Join Session</h1>
    <div className='avatar_create__session_card'>
      <img src='/navbaricon/Koura.png'/>
    </div>
  </div>


    <div
    onClick={()=>Nav("/CreateSession")}

    className={`create_session_card2 bounce ${off && 'off'}`}>
    <h1>Create Session</h1>
    <div className='avatar_create__session_card2'>
      <img src='\myTeamIcon/plus.svg'/>
    </div>
  </div>




</div>


<Online/>
    </div>
  )
}

export default MyTeam
