import { useRef, useState } from "react";
import "./CreateMatch.css";

import {
  Trophy,
  Clock3,
  MapPin,
  Users,
   
  Sparkles,
  X,
} from "lucide-react";
import { use } from "../axios/usehook.js";
import { useParams } from "react-router-dom";
import GhostLoad from "../Loader/Ghost.jsx";
import { useNavigate } from "react-router-dom";
const CreateMatch = () => {
  const { roomId } = useParams();
  const idmatchRef  = useRef(null)
  const [load, setLoad] = useState(false);
  const [showModal, SetshowModal] = useState(false)
  const Nav = useNavigate()
  const [state, setState] = useState({
    time: "",
    location: "",
    maxPlayer: 0,
    desc: "",
  });
  const createMatch = async (type) => {
   
    SetshowModal(false)
     
    const { err, data } = await use(
      "/create/match",
      "post",

      {
        roomId: roomId,
        time: state.time,
        location: state.location,
        maxplayer: state.maxPlayer,
        description: "no description",
        typeMatch:type
      },
      setLoad,
    );
    if (err != null) {
      console.log(err);
      return;
    }
     
 
    console.log(data)
     type=="custom" ?   Nav(`/terrain/${roomId}/${data.genreateKey}/custom`) :Nav(`/home/Scores/${roomId}`)
     
   
  };

  const HandelSeeTypeOfMatch = ()=>{
    SetshowModal(true)
    
  }
 
 
  return (
    <>

      {load && <GhostLoad />}
      {
        showModal &&

          <div className="edit-mode">
          <X size={19} className="close-edit-mode" onClick={()=>SetshowModal(false)}/>
        <button className="custom-player-button" onClick={()=>createMatch("custom")}>Custom Player</button>
        <button className="return-home-button" onClick={()=> createMatch("competitive")}>return  Home</button>
        </div>

      }

      <div className="cm__container">
        <div className="cm__backgroundGlow" />

        <div className="cm__card">
          <div className="cm__logo">
            <Trophy size={42} />
          </div>

          <span className="cm__badge">
            <Sparkles size={15} />
            Football Match
          </span>

          <h1 className="cm__title">Create Match</h1>

          <p className="cm__subtitle">
            Organize your next football game and invite players.
          </p>

          <div className="cm__field">
            <Clock3 size={20} />

            <input
              placeholder="Tomorrow,18:00"
              onChange={(e) =>
                setState({
                  ...state,
                  time: e.target.value,
                })
              }
            />
          </div>

          <div className="cm__field">
            <MapPin size={20} />

            <input
              placeholder="Match Location"
              onChange={(e) =>
                setState({
                  ...state,
                  location: e.target.value,
                })
              }
            />
          </div>

          <div className="cm__field">
            <Users size={20} />

            <input
              type="number"
              placeholder="Maximum Players"
              onChange={(e) =>
                setState({
                  ...state,
                  maxPlayer: e.target.value,
                })
              }
            />
          </div>

          {/* <div className="cm__textarea">
            <FileText size={20} />

            <textarea
              placeholder="Match description..."
              onChange={(e) =>
                setState({
                  ...state,
                  desc: e.target.value,
                })
              }
            />
          </div>*/}

          <button className="cm__button" onMouseUp={() => HandelSeeTypeOfMatch()}>
           Create Match
          </button>

        </div>
      </div>
    </>
  );
};

export default CreateMatch;
