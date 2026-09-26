 
 
import "../styleComponent/HeaderOptions.css"
import {useAuth} from "../../useContext/UseContext"
const HeaderOptions = () => {
    const {img }   = useAuth()
     
  return (
    <div className="HeaderOptions">
        <img src="/shorts-assets/add.svg" className="icon-header-option"/>
        <div className="center-inforamtion">
            <h1>Reels</h1>
            <h1 className="active">Freinds</h1>
            <div className="imges-containers d">
                   <img src={img}/>
                   <img src={img}/>
                   <img src={img}/>
            </div>
        </div>
    </div>
  )
}

export default HeaderOptions