
import "./BestLegnedPlayer.css"

const BestLegnedPlayer = ({list  }) => {
    console.log(list)
  return (
    <div className="container-legend-player"> 
    
       
     {
        list.members?.map((item)=> 
        
        <>
         <div key={item.membersId} className="legend_user">
            <img src={item.img} />
            <h2>{item.name}</h2>
        </div>
        
        
        </>)
     }
   
    </div>
  )
}

export default BestLegnedPlayer