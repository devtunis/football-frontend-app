
import { use } from "../axios/usehook"
 
import "./BestLegnedPlayer.css"
import { useParams } from "react-router-dom"
import GhostLoad from "../Loader/Ghost"
import { useState } from "react"
const BestLegnedPlayer = ({list ,updateFn,HandelCLoseModalLegend}) => {
  const [lodaingChangePlayer,SetlodaingChangePlayer] = useState(false)
   const {roomId} = useParams()
  const HandelsetBestPlayers = async(item)=>{
   
  
       console.log(roomId,item.name,item.img)
        const {err,data} = await use("/room/setBestPlayers", "post",{
        "roomId":roomId,
        "name":item.name,
        "likes":0,
        "img":item.img,
        "goals":0
    },SetlodaingChangePlayer
    )
    
      if(err!=null){
        console.log(err)
        return
      } 
     console.log(data)
     updateFn(data)
      
  }
  return (

    <>
    
 
   

    

{
  lodaingChangePlayer &&  <div className="loderCenter">  <GhostLoad/></div>
}
     
    <div className="container-legend-player"> 
    <div className="close_legened" onClick={()=>HandelCLoseModalLegend()}>
      <img src="/myTeamIcon/close.svg"/>
    </div>
       
     {
        list.members?.map((item)=>   
         <div onClick={()=>HandelsetBestPlayers(item)} key={item.membersId} className="legend_user">
            <img src={item.img} />
            <h2>{item.name}</h2>
        </div>
        
        
      )
     }
   
    </div>


      </>
  )
}

export default BestLegnedPlayer