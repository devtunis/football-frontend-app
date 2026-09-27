 
import "../styleComponent/optionvideo.css"
import WrapperContainerIcon from "./WrapperContainerIcon"
 
const OptionVideo = () => {
  return (
    <div className="option-video-shorts" >
         <WrapperContainerIcon src={"/video-assets/heart.svg"} text={10000}/>
         <WrapperContainerIcon src={"/video-assets/comment.svg"} text={43}/>
         <WrapperContainerIcon src={"/video-assets/repost.svg"} text={3}/>
         <WrapperContainerIcon src={"/video-assets/send.svg"} text={333}/>
        
    </div>
  )
}

export default OptionVideo