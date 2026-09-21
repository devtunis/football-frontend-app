import React from 'react'
import "./CardInfo.css"
import Avtar from './Avtar'
import { useNavigate, useParams } from 'react-router-dom'
 
import { useState } from 'react'
import { use } from '../axios/usehook'
import { useAuth } from '../useContext/UseContext'
import { useEffect } from 'react'

const CardInfo = ({data,update}) => {
  const {id} = useAuth()
  const [isinRoom,SetisinRoom]  = useState(false)
 


  
  useEffect(()=>{
     
    if(id){
      //  const existPlayer = data.currentPlayer.find((item)=>item.id === id) ? true : false 
      //   SetisinRoom(existPlayer)
        SetisinRoom(data.registerPlayer.find((item)=>item.id === id) ? true : data.currentPlayer.find((item)=>item.id === id) )
         
    }
  },[id,data])
 


  const {roomId} = useParams()
  const teamFull  = data.currentPlayer.length>=data.maxplayer
  const users = data.currentPlayer.slice(0, 5)


   
 


  
 
    const Nav = useNavigate()
    const  HandelViewDetails = ()=>{
      
      
         Nav(`/terrain/${roomId}/${data.matchId}/custom`)
     

  }
 
  const HandelJoinSession = async (item)=>{
   
    const {err,data:d} = await use("/create/match/joinSession","post",{
     "matchId":data.matchId,
     "roomId":roomId
})
    if(err!=null){
      console.log(err)
      return
    }
     
    update(item.matchId)
     
  }
  return (
    <div className='card-info'>

     <div className="left-card-info-data">
        <div className='start-in'><h1>STARTING IN</h1></div>
        <div className="timeStart ">  <img src='/myTeamIcon/time.svg'/> <h1>{data ?data.time :"Tomorrow , 18:00" }</h1>  </div>
        <div className="timeStart"><img src='/myTeamIcon/location.svg'/>{data ?data.location :<h1>Tunis City Arena</h1>}  </div>
        <div className="timeStart"><img src='/myTeamIcon/owner.svg'/> <h1>Created by {data? data.author: "author"}</h1> </div>

     </div>


     <div className="middlehr"></div>


     <div className="right-card-info-data">

         <div className='Player'><h1>Players</h1></div>
         <div className="numberOfPlayer-in-room">
           
          
             <span className='seconden'>{data?data.currentPlayer.length:6}</span>
             <span className='divn'>/</span>
             <span className='firstn'>{data?data.maxplayer:0}</span>
            
         </div>

         <div className="personJoin">
       
        {
          users.map((item,index)=> 
            
             <Avtar key={item.img} url={item.img} />
         )
        }
       
       {
        users.length>4 &&  <Avtar url="plus6" />
       }

         </div>



         {(isinRoom)?  <>

         <div className="inforamtionLockedProfile">
           {teamFull && 
           <> 
           <div className="TeamFull">
            <img src='/VerfiedIcon/green.svg'/>
            <h1>Team is Full</h1>
           </div>
           

           <div className="middleitem"></div>

            <div className="TeamFull2">
            <img src='/VerfiedIcon/lock.svg'/>
            <h1>Reserve of</h1>
           </div>
          </>
}

         </div>
         <div className="butttonSession2">
          <button onClick={()=>HandelViewDetails()} >View Details</button>
         </div>

         </>:


          <div className="butttonSession">
          <button style={{cursor:"pointer"}} onClick={()=>HandelJoinSession(data)} >Join Session</button>
         </div>
            }
     </div>


    </div>
  )
}

export default CardInfo
