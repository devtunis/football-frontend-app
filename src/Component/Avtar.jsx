 
import "./Avtar.css"
const Avtar = ({url}) => {
  return (
    <div className='Avtar'>
      
        {url=="plus6"?  <span className='insideAvtar'>+6</span>  :   <img src={url}/>}
    </div>
  )
}

export default Avtar