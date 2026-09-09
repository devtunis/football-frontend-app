import React from "react";
import "./CreateSession.css";
import { Camera,  PlusCircle } from "lucide-react";
import { useState } from "react";
import axiosClient from "../axios/endPoint";
import axios from "axios";
 
import { toast  ,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GhostLoad from "../Loader/Ghost";
 
 
const APICloudinary = import.meta.env.VITE_API_KEY;
const CreateSession = () => {
      const Nav = useNavigate()

      const [state ,SetState]= useState({
        sesssionName:'',
        bioName:''
      })

      const notify = () =>   toast.success("Room Created!", {
        theme: "colored",
      })

      const [image,setImage] = useState(null);
      const [File , SetFile] = useState(null)
      const [loading,setLoading] = useState(false)
      
      
  
      const HandleImage = (e)=>{
  
          const file = e.target.files[0];
  
          if(file){
            
              SetFile(file)
              setImage(URL.createObjectURL(file));
               




              
          }
  
      }

      const HandelCreateSession = async ()=>{
        try{
          
     

          

            setLoading(true)
            const formData = new FormData();
          
            formData.append("file", File);
            formData.append("upload_preset", 'football-app');
           
            const uploadResponse = await axios.post(APICloudinary,formData );
      
         
         
            if(uploadResponse){

              setLoading(false)

              const data = await axiosClient.post("/room/create",
                   {
                  "nameRoom" :state.sesssionName,
                  "bioRoom":state.bioName,
                  "img" :uploadResponse.data.secure_url
                },
                {
                  withCredentials:true
                }
                )
              if(data)
              {
                notify()
                console.log(data)
                Nav("/myTeam")
              }
            }


        }catch(error){
          setLoading(false)
          console.log(error.response)
        }
      }


  return (

    <> 
 
    {
      loading && <GhostLoad/> 
    }
   <ToastContainer/>
    <div className="container_create_session">

      <div className="createSession">

        <div className="create_header">

          <div className="create_icon">
            <PlusCircle size={30} />
          </div>

          <h1>Create Session</h1>

          <p>
            Build your football room and invite your friends.
          </p>

        </div>

        <div className="upload_image">

          <label htmlFor="image">
 


               {
                image ? <img src={image} style={{width:"60px",height:"60px",borderRadius:"100%",objectFit:"cover"}}/> :   <Camera size={35} />
               }
          

            <span>Upload Cover Image</span>

          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e)=>HandleImage(e)}
          />

        </div>

        <input
          type="text"
          placeholder="Session Name"
          onInput={(e)=>SetState(
          {
              ...state,
            sesssionName : e.target.value
          }
            
          )}
        />

             <input
          type="text"
          placeholder="Team Name"
          onInput={(e)=>SetState(
          {
              ...state,
            bioName : e.target.value
          }
            
          )}
        />

        <button onClick={()=>HandelCreateSession()}>
          Create Session
        </button>

      </div>

    </div>
  
     </>


  );
};

export default CreateSession;