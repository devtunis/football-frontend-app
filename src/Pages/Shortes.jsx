 
import { useEffect, useRef,useState } from "react";
import "./shorts.css"
import "../Shortes/main.css"
import VideoContainer from "../Shortes/Components/VideoContainer"
import HeaderOptions from "../Shortes/Components/HeaderOptions";
 


const Shortes = () => {




    let ContainerShortRef = useRef(null)
    const [soundOn, setSoundOn] = useState(false);
    const [pause,SetPause]  = useState(false)
    const [currentTrack,setcurrentTrack ] = useState(null)

 
    const [Reels, SetReels] = useState([
    // "/VideoDemos/v7.mp4",
    "/VideoDemos/v19.mp4",
    "/VideoDemos/v2.mp4",
    "/VideoDemos/v14.mp4",
    "/VideoDemos/v0.mp4",
    "/VideoDemos/v21.mp4",
    "/VideoDemos/v9.mp4",
    "/VideoDemos/v4.mp4",
    "/VideoDemos/v17.mp4",
    "/VideoDemos/v11.mp4",
    "/VideoDemos/v22.mp4",
    "/VideoDemos/v5.mp4",
    "/VideoDemos/v13.mp4",
    "/VideoDemos/v1.mp4",
    "/VideoDemos/v20.mp4",
    "/VideoDemos/v8.mp4",
    "/VideoDemos/v15.mp4",
    "/VideoDemos/v3.mp4",
    "/VideoDemos/v18.mp4",
    "/VideoDemos/v10.mp4",
    "/VideoDemos/v6.mp4",
    "/VideoDemos/v16.mp4",
    "/VideoDemos/v12.mp4",
  ]);

    useEffect(()=>{



        const options = {
          root: ContainerShortRef.current,
          threshold: 0.83,
        };

        const videos = ContainerShortRef.current.querySelectorAll("video");
        if(!videos)return
      

      
        const intersectionCallback = (entries) => {
          entries.forEach((entry) => {
              
          
            if (entry.isIntersecting) {
            
              entry.target.playsInline = true;
              entry.target.muted = true;
              setcurrentTrack(entry.target)
          
 

              if(soundOn){
                entry.target.muted = false;
              
              } 
            
            
            

              entry.target.play().catch((error) => {
                console.log("Autoplay blocked:", error);
              });
            
            }else{
                entry.target.pause()
                entry.target.currentTime = 0;
                SetPause(false)
            }
          });


  };
        const observer = new IntersectionObserver(intersectionCallback, options);
        
        videos.forEach(el=> {observer.observe(el)})

        
      return () => {
          observer.disconnect();
        };


    },[soundOn])

  

           

   const pauseVideo = (vd)=>{
    
    SetPause(prev =>  {
        if(prev){
          vd.play()
          
        }else{
          vd.pause()
        }
        return !prev
      }
    
    )
    
  }


  const HandelCurrentFeeds = (typeFeeds)=>{
    console.log(typeFeeds)

  }
 
  return (
    <div className='Shortes ' ref={ContainerShortRef} >


      <HeaderOptions Feeds={HandelCurrentFeeds}/>
    

    
    {
      Reels.map((item,index)=><VideoContainer
   
       pauseVideo={(video)=>pauseVideo(video)}
       toggleSound={()=>setSoundOn(p=>!p)}
       currentvideoTrack = {currentTrack}


       
       key={index}
       src={item} 
       isPause={pause}
       on={soundOn}
       />)
    }
 
 

   

    </div>
  )
}

export default Shortes 