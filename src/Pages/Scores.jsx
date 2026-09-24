import   { useEffect, useState } from 'react'
import "./scores.css"
import CardInfo from "../Component/CardInfo.jsx"
import FinshedMatches  from "../Component/FinshedMatches.jsx"


import {  Plus   } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../useContext/UseContext.jsx'
import PendingAcceptPersonRequest from './PendingAcceptPersonRequest.jsx'
import Online from '../online/Online.jsx'
import  {use} from "../axios/usehook.js"
import BestLegnedPlayer from '../Component/BestLegnedPlayer.jsx'
const Scores = () => {

 const {Username , id ,img }  =  useAuth()
 const [uncomingMatches,SetuncomingMatches]  = useState([])
 const [finishedmatches,Setfinishedmatches]  = useState([])
 const [Permision,SetPermision] = useState(false)
 const [TheirNews , SetTheirNews] =  useState(false)
 const [messageNews,SetMessagesNews] = useState("no")
 const [count,seetCount] = useState(33)
 const [off,Setoff] = useState(false)
 const idRoom   = useParams()
 const Nav = useNavigate()
 const [showLegnedPLayer,setshowLegnedPLayer] = useState(false)
 const [legendUser,setlegendUser] = useState([])




 const FetchUncomingMatches = async()=>{

    const {err,data} = await use("/room/verifyAndBringData","post",{"roomId":idRoom.roomId})
    if(err!=null)
    {

      if(!err.isMember){
        Nav("/login")
      }
      return
    }
    console.log(data.uncomingMatches)
    
    SetuncomingMatches(data.uncomingMatches)
    Setfinishedmatches(data.finishedmatches)
    SetPermision(data.permision)
    }




  useEffect(()=>{
    if(!idRoom.roomId)
    {
      Nav("/login")
    }
  },[])
  useEffect(()=>{

    const FetchUncomingMatches = async()=>{

    const {err,data} = await use("/room/verifyAndBringData","post",{"roomId":idRoom.roomId})
    if(err!=null)
    {

      if(!err.isMember){
        Nav("/login")
      }
      return
    }
    console.log(data.uncomingMatches)
    
    SetuncomingMatches(data.uncomingMatches)
    Setfinishedmatches(data.finishedmatches)
    SetPermision(data.permision)
    }

    FetchUncomingMatches()

  },[])
    useEffect(()=>{

    const HandelGetLastNews = async()=>{

    const {err,data} = await use("/room/getlastnews","post",{"roomId":idRoom.roomId})
    if(err!=null)return
 
    SetMessagesNews(data.news)
    }

    HandelGetLastNews()

  },[])









 const HandelUpdateUncoming = async (matchId) =>  {
 
  //  const filterNewUncomingMatches = uncomingMatches.map((item)=>item.matchId ===matchId  ?{...item,currentPlayer:[...item.currentPlayer,{id,img,x:0,y:0}]} : item)
  //  SetuncomingMatches(filterNewUncomingMatches)

  await  FetchUncomingMatches()
   
 }





const HandelGetListOfLegend = async ()=>{
  setshowLegnedPLayer(p=>!p)
  const {err,data} = await use("/room/getMembers", "post",{
    "roomId":idRoom.roomId
})

  if(err!=null){
    console.log(err)
    return
  }
  console.log(data)
  setlegendUser(data)
}






  return (

      <>
 
    {
      showLegnedPLayer &&  
      
      <>  
      <BestLegnedPlayer list={legendUser} /> 
      <div className="wrapperTerrain"></div>  
      </>
    }

     <div className="Container">

      <div className="navbar">


        <div className="logo-content-container">
          <div className="avatar-logo" style={{cursor:"pointer"}} onClick={()=>Nav("/myTeam")}>
           <img src="/navbaricon/Koura.png"  alt="Ghaith"/>
          </div>

          <h1 onClick={()=>console.log(Username , id )}>Koura</h1>
        </div>



        <div className="info-content-container">
          <div className="search">
            <img src="/myTeamIcon/search.svg"/>
          </div>


          <div className="notifaction"   onClick={()=>{  Nav(`/home/notifaction/${idRoom.roomId}`)}}>
                <span className="popup"></span>
                <img src="/myTeamIcon/notifaction.svg" style={{cursor:"pointer"}}/>
          </div>

          <div className="avatar-user" onClick={()=>{Nav(`/home/profile/${idRoom.roomId}`)}}>
          <span className="popup2"></span>

             <img src={img ? img : "/testpic/man2.png"}/>


          </div>
        </div>

      </div>

      <div className="watchScreen">

        <img src="/testpic/bbg.png" loading="lazy" />

          {
            messageNews=="no"?  <p className="description">Welcome back , {Username&& Username}    </p>


              : <>
                <div className="breaknews"><h1>News</h1></div>
                <p className="description2"> {messageNews}  </p>
              </>
          }

          <h1 className="description-mem">Play football.</h1>
          <div className="description-mem2">
          <h1 className="first-desc">Make</h1>
          <h1 className="seconde-one">memories.</h1>
        </div>

        <div className="viewAll">
          <span>view all</span>
         <img src="/myTeamIcon/view2.svg" loading="lazy"/>

        </div>

      <div className="info-koura">
           <h1>Incoming Matches</h1>
           <small className="small"></small>
            <span>{uncomingMatches.length} upcoming</span>

        </div>


      </div>
 

     <div className="viewAllList">


       {
        uncomingMatches.length>0  ?
        uncomingMatches.map((item)=>  <CardInfo
          key={item.matchId} 
          data={item}
          update={HandelUpdateUncoming}  />  
            )


        :

        <>


    <div className="no-matches">
      <div className="logo-matches-assets">
        <img src='/nomatchesAssets/ball.png'/>
      </div>
      <div className="content-matches-assets">
        <h1>No upcoming matches</h1>
        <h3>The pitch is waiting for your.⚽ </h3>
        <h3>Create a match and invite your freinds to play.</h3>
      </div>
 {
  Permision && <div className="content-button">
        <button><Plus size={20}/> Create Match</button>
      </div>
 }
    </div>
</>
    }


      </div>


{
  finishedmatches.length>0  ?  <>

    <div className="FinshedMatches">
      <div className="left">
        <h1>Finished Matches</h1>
      </div>

         <div className="right">

         <img src="/myTeamIcon/view1.svg" loading="lazy"/>
         </div>


    </div>


  <div className="Banner-Finsih" >


        {

          finishedmatches.map((item)=>    <FinshedMatches key={item.finishedId} data={item}/>)

        }
  </div>



 <div className="Section-cards">


    <div className="news_card">

         <div className="left_news_cards">
          <img src='/Memories/b.jpg'/>
         </div>

          <div className="right_news_cards">


             <div className="leftnew_card__">
              <h1>Goals</h1>

              <div className='spnumber'>4</div>
             </div>


             <div className="middle_news_card__"></div>

             <div className="right_news_cards__">

              <h1>Likes</h1>
              <div className="info_button_likes">
               <h1>{count}</h1>
               <img src='/myTeamIcon/heart.svg' onClick={()=>seetCount((prev)=>prev+10)}/>
              </div>
             </div>





          </div>
{

  Permision&&

  
        <div className='edit-section-card' onClick={()=>HandelGetListOfLegend()} >
          <img src='/myTeamIcon/edit1.svg'/>  
        </div>

}

    
    </div>








 </div>


</>
:<>
<div className='findMatch-off'>

  <img src='/finishedmatches/cup.png'/>
  <h2>No finished matches yet</h2>
  <h3>Your post matches will appear here </h3>
  <h3>after your complete a game</h3>

</div>

</>

 }






{
  Permision && <>
    <div className="container-card-choise" style={{cursor:"pointer"}}>







      <div onClick={()=>Nav(`/CreateMatche/${idRoom.roomId}`)}
      className={`first_box_1 bounce ${off && 'disable'}`}>
        <h1>Match</h1>
        <img src='/myTeamIcon/blueCreate.svg'/>

      </div>

      <div onClick={()=>Nav(`/FinshedMatchComp/${idRoom.roomId}`)} className={`first_box_2 bounce  ${off && 'disable'}`}>
        <h1>Finshed</h1>
          <img src='/myTeamIcon/plus.svg'/>
      </div>

      <div className="plus_containr_i" onClick={()=>Setoff((prev)=>!prev)}>
        <Plus size={20}/>
      </div>
    </div>

  </>
}



</div>


<Online/>


      </>

  )
}

export default Scores
