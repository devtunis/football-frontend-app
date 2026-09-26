 export const pauseVideo = (vd,SetPause)=>{
    SetPause(prev =>  {
        if(prev){
          vd.target.play()
          
        }else{
          vd.target.pause()
        }
        return !prev
      }
    
    )
    
  }
