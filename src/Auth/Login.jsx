import "./login.css";
import { LogIn, UserPlus } from "lucide-react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
const  Login =()=> {
  const Nav = useNavigate()

  const HandelLogin = () => {
    Nav("/LoginAccount");
  };
  const CreateAccount = ()=>{
    Nav("/CreateAccount")
  }





  return (
    <div className="login">
      <div className="overlay" />

      <div className="content">
        <img src={"/navbaricon/Koura.png"} alt="Sky Sports" className="logo" />

        <h1>
          Sky <span>Sports</span>
        </h1>

        <p className="subtitle">
          PUSH YOUR LIMITS. ELEVATE <span>YOUR GAME.</span>
        </p>

        <button className="primaryBtn" onClick={()=>HandelLogin()}>
          <LogIn size={20} />
          Log In
        </button>

        <button className="secondaryBtn" onClick={()=>CreateAccount()}>
          <UserPlus size={20} />
          Sign Up
        </button>
      </div>
    </div>
  );
}
export default Login
