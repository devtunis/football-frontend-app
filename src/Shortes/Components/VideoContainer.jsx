 
import HeaderOptions from "./HeaderOptions"
import OptionVideo from "./OptionVideo"
import Pause from "./Pause"
import ProfileContent from "./ProfileContent"
import Sound from "./Sound"

 
 

const Player = ({src,pauseVideo,on,toggleSound,isPause,currentvideoTrack}) => {

 
  
  return (
    <>
  


    <div   className="shorts_video"   >

     <OptionVideo/>

     <ProfileContent/>
  

     
      <video
        src={src}
        autoPlay
        loop
        playsInline
        controls={false}
        preload="metadata"
        onClick={(e)=>pauseVideo(e.target)}
 
      />  

      {
        isPause && 
        <>
         
          <Pause    track={()=>pauseVideo(currentvideoTrack)}  />
          <Sound  isOn={on} setSoundOn={()=>toggleSound()}/>  

  
        
        </>
      }
     




    </div>


    
    
    </>
  )
}

export default Player