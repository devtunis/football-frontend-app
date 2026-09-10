import { useState } from "react";
import "./CreateMatch.css";

import {
  Trophy,
  Clock3,
  MapPin,
  Users,
  FileText,
  Sparkles,
} from "lucide-react";
import { use } from "../axios/usehook.js";
import { useParams } from "react-router-dom";
import GhostLoad from "../Loader/Ghost.jsx";
const CreateMatch = () => {
  const { roomId } = useParams();
  const [load, setLoad] = useState(false);

  const [state, setState] = useState({
    time: "",
    location: "",
    maxPlayer: 0,
    desc: "",
  });
  const HandeLCreateMatch = async () => {
    const { err, data } = await use(
      "/create/match",
      "post",

      {
        roomId: roomId,
        time: state.time,
        location: state.location,
        maxplayer: state.maxPlayer,
        description: state.desc,
      },
      setLoad,
    );
    if (err != null) {
      console.log(err);
      return;
    }
    console.log(data);
  };
  return (
    <>
      {load && <GhostLoad />}
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

          <div className="cm__textarea">
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
          </div>

          <button className="cm__button" onMouseUp={() => HandeLCreateMatch()}>
            Create Match
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateMatch;
