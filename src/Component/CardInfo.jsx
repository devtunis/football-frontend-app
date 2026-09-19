import React from 'react'
import "./CardInfo.css"
import Avtar from './Avtar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
const CardInfo = ({data}) => {
 
  const teamFull  = data.currentPlayer.length>=data.maxplayer
  const [users] = useState(
    ()=>{
      const currentPlayer = [...data.currentPlayer]
      return currentPlayer.slice(0,5)
    }

  )
  const Nav = useNavigate()
  const handleVibrate = () => { navigator.vibrate(700) }
 
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
          users.map((item)=> 
             <Avtar key={item.id} url={item.img} />
         )
        }
        <Avtar url="plus6" />

         </div>



         {teamFull ?  <>

         <div className="inforamtionLockedProfile">

           <div className="TeamFull">
            <img src='/VerfiedIcon/green.svg'/>
            <h1>Team is Full</h1>
           </div>

           <div className="middleitem"></div>

            <div className="TeamFull2">
            <img src='/VerfiedIcon/lock.svg'/>
            <h1>Reserve of</h1>
           </div>



         </div>
         <div className="butttonSession2">
          <button onClick={()=>handleVibrate()}>View Details</button>
         </div>

         </>:


          <div className="butttonSession">
          <button style={{cursor:"pointer"}} onMouseUp={()=>handleVibrate()}>Join Session</button>
         </div>
            }
     </div>


    </div>
  )
}

export default CardInfo
