import React, { useState } from "react";
import "./LoginYourAccount.css";
import { Mail, Lock, LogIn, AwardIcon, User, LampFloor } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useContext/UseContext";
 
import axiosClient from "../axios/endPoint";
import LoaderLogin from "../Component/LoaderLogin";
import socket from "../socketClient/socket";
    



const LoginYourAccount = () => {

  
    const Nav = useNavigate()
    const {Username , id ,dispatch}  =  useAuth() 
    const [Loading,setLoading] = useState(false)
    const [LoadingUsP,setLoadingUsp] = useState(false)
    
     

    const [State , SetState] = useState({
       username: '',
       password : ''
    })

    const HandelLogin  = async () => {
     
      try{
        if(!State.username ||!State.password){

          return 
        }

         setLoading(true)
         const {username , password} = State
         
         const LoginRequest = await axiosClient.post("/login",{
          Username:username,
          password:password},{
            withCredentials:true
        })

        if(LoginRequest.statusText ==="OK"){
  
      
          dispatch({
            type : "ADD_ID",
            payload :{
              id : LoginRequest.data.info.id ,
              UserName :LoginRequest.data.info.username,
              img : LoginRequest.data.info.img
              
            }
          })
          console.log("sucess login")
     
          socket.connect()
          
          Nav("/myTeam")
          setLoading(false)
        }


      }
      
      catch(err){
        console.log(err.response)
        setLoading(false)
        if(err.response){
          if(err.response.data.message=="username or password incorrect"){
            setLoading(false)
          
            setLoadingUsp(true)
            setTimeout(() => {
              setLoadingUsp(false)
              
            }, 3000);
          }
        }
       
      }

     finally{
            setLoading(false)
            setLoadingUsp(true)
     }
  

    
    }
 
 
  return (

    <>

    {
      Loading && 
    <LoaderLogin/>
    }
    
  

    
    <div className="container_login">

      <div className="login_card">

        <div className="login_header">

          <div className="login_icon">
            <LogIn size={30} />
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to continue your football journey.

          </p>
            {
              LoadingUsP &&     <div className="errorPasswordIncorret">
                  user name or password incorrect
                </div>
            }

        </div>

        <div className="input_box">
          <User size={20} />
          <input
            type="text"
            placeholder="user name"
            onInput={(e)=>SetState({
              ...State ,
              username : e.target.value

            })}
          />
        </div>  

        <div className="input_box">
          <Lock size={20} />
          <input
            type="password"
            placeholder="Password"
            onInput={(e)=>SetState({
              ...State , 
              password : e.target.value
            })}
          />
        </div>

        <button className="login_btn" onClick={()=>HandelLogin()}>
          Login
        </button>

      </div>

    </div>

      </>
  );
};

export default LoginYourAccount;