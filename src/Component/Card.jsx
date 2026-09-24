import React, { useState } from 'react'
import "./Card.css"
import { useNavigate } from 'react-router-dom'
import { JoystickIcon } from 'lucide-react'
import AvatarCard from './AvatarCard'
import { useAuth } from '../useContext/UseContext'
const Card = ({info}) => {
  
  const Nav = useNavigate()
  const [load,setLoad] = useState(false)
  
 

  const {id} = useAuth()
 
  const   HandelRotueUser = ()=>{
    setLoad(true)
     Nav(`/home/Scores/${info.roomId}`)
  
  }
    
  return (

   <>
   


    <div className='Card'  

    style={{...(id == info.ownerId && {
    background: `
      radial-gradient(circle at 30% 10%, rgba(200, 230, 70, 0.16), transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(0, 160, 90, 0.18), transparent 35%),
      linear-gradient(135deg, #020403 0%, #0b1510 40%, #102318 70%, #050806 100%)
    `,
    border: "1px solid rgba(180, 220, 80, 0.22)",
    boxShadow: `
      0 0 30px rgba(120, 190, 40, 0.08),
      inset 0 1px 0 rgba(255,255,255,0.06)
    `
  })
}}
    
    >

     {id==info.ownerId &&    <div className="winsfloat">
          <img src='/myteamPics/svgicon/king.svg'/>
        </div>}

        <div className="__logo_pictuer">
          <div className="logoBg">
            {/* <img src='/myteamPics/Badge/Python.png' alt='w'/> */}
             <img src={info.img} alt='w'/>
            
          </div>
        </div>
        <div className="__card_name_team">
           <h1>{info.nameRoom}</h1>
        </div>
        <div className="__card_little_name">
          <h2>{info.bioRoom}</h2>
        </div>

        
        <div className="__card__img__sesctions">
        
       {
       info.members.length>0 &&  info.members.slice(0,5).map((item)=>   <AvatarCard  key={item.membersId} url={item.img}/>)
       }
   


         
        </div>
        
        <div className="trophy__card__section">

          <div className="first__trophy_blok">
            <img src='/myteamPics/svgicon/cup.svg'/>
            <h1>152</h1>
          </div>
          <div className="first__trophy_blok">
            <img src='/myteamPics/svgicon/start.svg'/>
            <h1>{info.rate}</h1>
          </div>
          <div className="first__trophy_blok">
            <img src='/myteamPics/svgicon/community-.svg'/>
            <h1>{info.members.length}</h1>
          </div>

         
        </div>

        <div className="__button_workingon">
          <button onClick={()=>HandelRotueUser()}>{load ? 'waiting':'Join'}</button>
          {
            id==info.ownerId &&  <div className="divOption">
            <img src='/myteamPics/svgicon/option.svg'/>
          </div> 
          }
        </div>
 

    </div>
    
   </>
  )
}

export default Card