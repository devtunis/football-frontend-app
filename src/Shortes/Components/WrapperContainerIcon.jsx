 
const WrapperContainerIcon = ({src,text}) => {
  return (
      <div className="wrapper-icon-container ">
        <img src={src} />
        <span>{text>=1000 ? text>=1000000 ?text>=1000000000 ?`${text/1000000000}B` :`${text/1000000} m` :`${text/1000} k`: text}</span>
      </div>
  )
}

export default WrapperContainerIcon