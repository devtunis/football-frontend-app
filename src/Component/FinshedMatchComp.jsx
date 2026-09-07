import   { useState } from 'react'
import "./FinshedMatchComp.css"
import { TeamA, TeamB } from '../Teams/arrayTeams'
import {use} from "../axios/usehook.js"
import { useNavigate, useParams } from 'react-router-dom'
 
import FirstView from '../Loader/FirstView'
const FinshedMatchComp = () => {


//Team A
const [PicTeamAIcon, setPicTeamA] = useState(null);
const [PicTeamACountIncrement, setPicTeamACountIncrement] = useState(5);
 
//Team B
const [PicTeamBIcon, setPicTeamB] = useState(null);
const [PicTeamBCountIncrement, setPicTeamBCountIncrement] = useState(2);
const {roomid} = useParams()

const [Loader,SetLoad] = useState(false)
 

const getResult = async () =>{

   
    const copy = {
        TeamAScore :  {...PicTeamAIcon ,res: PicTeamACountIncrement} ,
        TeamBScore : {...PicTeamBIcon  ,res:PicTeamBCountIncrement }
      
    } 
 
    const {err,data} = await use("/create/Finished","post",
          {
            "roomId":roomid,
            "imgA": copy.TeamAScore.logo,
            "nameA":copy.TeamAScore.name,
            "imgB": copy.TeamBScore.logo,
            "nameB": copy.TeamBScore.name,
            "result": `${copy.TeamAScore.res} - ${copy.TeamBScore.res}`
        }  
        ,SetLoad
    )
    if(err!=null){
        console.log(err)
        return 
    }

     

}

 const Nav = useNavigate()
  return (
    <>
    
{
    Loader &&    <FirstView/> 
}
    <div className='FinshedMatchContainer'> 
        
         <h1 style={{cursor:"pointer"}} onClick={()=>Nav(`/home/Scores/${roomid}`)}>Koura </h1>
        
        <div className="TeamContainerSectionFinshedMatches">
            
            <div className="box_container__">
        
          {
            PicTeamAIcon &&   <div className='view'><img src={PicTeamAIcon?.logo}/></div> 
          }
                {
                    TeamA.map((item,index)=> <div
                    key={index}
                    onClick={()=>setPicTeamA(item)}
                    className="card_finished_match">
                        <img src={item.logo} loading='lazy'/>
                    </div>  )
                }
             
                
            </div>
          

            <div className="box_container__">
                { PicTeamBIcon &&  <div className='view'><img src={PicTeamBIcon?.logo}/></div> }
  
                {
                    TeamB.map((item,index)=> <div  
                    key={index} 
                    onClick={()=>setPicTeamB(item)}
                    
                    className="card_finished_match">
                        
                        <img src={item.logo} loading='lazy'/>
                    </div>  )
                }
             

            </div>



        </div>


        <div className="inputContainer__" style={{cursor:"pointer"}}>

            <div className="cardPlust_input">
               <div className="cardPluuss bounce" onClick={()=>setPicTeamACountIncrement((prev)=>prev+1 )}><img src='/myTeamIcon/plus.svg'/></div>
               <div className="CoutnerView bounce">{PicTeamACountIncrement}</div>
               <div className="cardMInus bounce" onClick={()=>setPicTeamACountIncrement((prev)=>    PicTeamACountIncrement>=1 ? prev-1 : 0)}><img src='/myTeamIcon/minus.svg'/></div>
            </div>
          
                 <div className="cardPlust_input">
               <div className="cardMInus bounce" onClick={()=>setPicTeamBCountIncrement((prev)=>PicTeamBCountIncrement>=1 ? prev-1 : 0)}><img src='/myTeamIcon/minus.svg'/></div>
               <div className="CoutnerView bounce">{PicTeamBCountIncrement}</div>
               <div className="cardPluuss bounce" onClick={()=>setPicTeamBCountIncrement((prev)=>prev+1)}><img src='/myTeamIcon/plus.svg'/></div>

             
            </div>
          


        </div>

        
     <div className="resultTeamAB">
        <h1>{PicTeamACountIncrement}</h1>
        <h1>-</h1>
        <h1>{PicTeamBCountIncrement}</h1>
        

     </div>



    <div className="resultButtonPush">
        <button onClickCapture={()=>getResult()}>Save</button>
    </div>
        
    </div>
      </>
  )
}

export default FinshedMatchComp