
import "./JoinSession.css";
import { Hash, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import axiosClient from "../axios/endPoint";

const JoinSession = () => {
  const [state,setState]= useState({
    requestSent : false ,
    request_no_room : false ,
    request_conflit : false,
    roomName :''
  })
  const [code,setCode] = useState(null)

  const HandelJoinRoom =  async ()=>{
    try{
      if(!code)return

      const response = await axiosClient.post("/room/joinRoom",
            {
            "roomId":code
             },
             {
              withCredentials:true
             }
        )

        console.log(response ,"<==")
        if(response.data.message == "request sent"){
           setState({
              ...state,
              requestSent:true,
              request_conflit:false,
              roomName : response.data.nameRoom
             })
        }

    }catch(error){

          if(error?.response?.data.error){
             setState({
              ...state,
              request_conflit:true
             })
          }
    }
  }
  return (
     <>

    <div className="container_join_session">
      <div className="containerSession">

        <div className="join_header">
          <div className="icon_circle">
            <Hash size={28} />
          </div>

          <h1>Join Session</h1>

          <p>
            Enter the invitation code to join your football session.
          </p>
        </div>

        <div className="join_input">
          <input
            type="text"
            placeholder="Enter Session Code"
            onInput={(e)=>setCode(e.target.value)}
          />

          <button onClick={()=>HandelJoinRoom()}>
            Join
            <ArrowRight size={18} />

          </button>
         {state.requestSent &&  <div  className="green_rquest" ><h3>request sent to room {state.roomName}..</h3> <Send size={14}/>  </div> }

         {state.request_conflit &&     <div  className="red_rquest_conflit" ><h3>you already Member or room not exist </h3>   </div> }



        </div>

      </div>
    </div>



    </>
  );
};

export default JoinSession;
