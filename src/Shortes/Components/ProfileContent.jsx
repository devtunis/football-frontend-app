import { useAuth } from "../../useContext/UseContext"
import "../styleComponent/ProfileContent.css"
const ProfileContent = () => {
  const {img} = useAuth()
  return (
    <div className="ProfileContent">

        <div className="ProfileContent-view">
            <div className="owner-video-img"><img src={img}/></div>
             <div className="owner-name-verify">
                <h3>nahdiGhaith</h3>
                <img src="/VerfiedIcon/blue.svg"/>
             </div>
             <button>Follow</button>
            
        </div>

        <div className="description-file-content">
           <p>
            مرحباً، أتمنى الخير للجميع في هذا العالم.
           </p>
        </div>
    </div>
  )
}

export default ProfileContent