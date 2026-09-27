 
 
import "../styleComponent/HeaderOptions.css"
import {useAuth} from "../../useContext/UseContext"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
const HeaderOptions = ({Feeds}) => {
    const {img }   = useAuth()
    const [currentActive,setcurrentActive] = useState("Reels")
    const [searchParams, setSearchParams] = useSearchParams();
    const getType = searchParams.get("type") || "Reels"



    useEffect(()=>{ Feeds(getType)},[searchParams])


    const setMode = (mode)=>{
      setcurrentActive(mode)
      setSearchParams({ type: mode });


    }
 


  return (
    <div className="HeaderOptions">
        <img src="/shorts-assets/add.svg" className="icon-header-option"/>
        <div className="center-inforamtion">
            <h1 onClick={()=>setMode("Reels")}  className={currentActive=="Reels"?"active":"no_active"}>Reels</h1>
            <h1 onClick={()=>setMode("Freinds")} className={currentActive=="Freinds"?"active":"no_active"}>Freinds</h1>
            
             
          <div className="imges-containers d">
                   
                   <img src={img} loading="Lazy" alt="pic1"/>
                   <img src={img} loading="Lazy" alt="pic2"/>
                   <img src={img} loading="Lazy" alt="pic3"/>
            </div>  
        </div>
    </div>
  )
}

export default HeaderOptions