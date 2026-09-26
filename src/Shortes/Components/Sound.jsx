 
const Sound = ({isOn,setSoundOn}) => {
 
  return (
    <div className="center2 pointer glass-safari p3 d full-radius" onClick={()=>setSoundOn()}>
       <img fetchPriority="high"  src={isOn ? "/shorts-assets/audio-volume-high.svg": "/shorts-assets/audio-volume-mute.svg"}   className="size-img2"/>
    </div>
  )
}

export default Sound