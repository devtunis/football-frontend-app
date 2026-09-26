import "../styleComponent/ProfileContent.css"
const ProfileContent = () => {
  return (
    <div className="ProfileContent">

        <div className="ProfileContent-view">
            <div className="owner-video-img"></div>
             <div className="owner-name-verify">
                <h3>nahdiGhaith</h3>
                <img src="/VerfiedIcon/blue.svg"/>
             </div>
             <button>Follow</button>
            
        </div>

        <div className="description-file-content">
           <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus facilis necessitatibus maxime commodi sit et laboriosam vitae tenetur, magnam praesentium.
           </p>
        </div>
    </div>
  )
}

export default ProfileContent