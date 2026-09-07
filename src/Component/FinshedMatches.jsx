import React from 'react'
import "./FinshedMatches.css"
const FinshedMatches = ({data}) => {
  return (
    <div className='FinshedMatchesS'>

        <div className="top">
            <div className="left">
                <div className="avtarVlag">
                    <img src={data.imgA}/>
                </div>
                <h1>{data.nameA}</h1>
            </div>
            
            <div className="middle-score"><h1>{data.result}</h1></div>
            <div className="right">

                  <div className="avtarVlag">
                    <img src={data.imgB}/>
                </div>
               <h1>{data.nameB} </h1>


            </div>
        </div>

        <div className="down">
            <h1>{`${data.date.split("T")[0] }` }</h1>
        </div>
    </div>
  )
}

export default FinshedMatches