import "./CreateAccount.css";
import { User, Mail, Lock, Camera, ArrowLeft, Cone, Percent } from "lucide-react";
import { data, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import Spinner from "../Loader/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../useContext/UseContext";
import axiosClient from "../axios/endPoint";
import { useEffect } from "react";
const APICloudinary = import.meta.env.VITE_API_KEY;
const CreateAccount = () => {













    const notify = () =>   toast.success("Account Created!", {
      theme: "colored",
    })
    const Nav = useNavigate()
   const {Username , id  , dispatch}  =  useAuth()

    const navigate = useNavigate();
    const inputRef = useRef(null)
    const username = useRef(null)
    const password = useRef(null)

    const [image,setImage] = useState(null);
    const [File , SetFile] = useState(null)
    const  secureImage = useRef(null)
    const [UserExisit , SetUserExist] = useState(false)

    const HandleImage = (e)=>{

        const file = e.target.files[0];

        if(file){
            SetFile(file)
            setImage(URL.createObjectURL(file));
        }

    }
    const [Error,SetError] =useState(false)
    const [ErrorPass,SetErrorPass] =useState(false)
    const [Loading,SetLoading]  = useState(false)


    const HandelLogin =  async ()=>{

        const dataPerson = {
         username : username.current.value ,
         password : password.current.value ,
         image
        }



        if(!image){
            alert("Put image")
            return
        }
        if(username?.current.value.length<5){
           SetError(true)
           setTimeout(() => {
                SetError(false)
           }, 3000);
           return
        }
        if(username?.current.value.length>5){
           SetError(false)
        }
        if(password?.current.value.length<8){
           SetErrorPass(true)
           setTimeout(() => {
                SetErrorPass(false)
           }, 3000);
           return
        }
        if(password?.current.value.length>=8){
           SetErrorPass(false)

        }

        try{


            SetLoading(true)
            const formData = new FormData();
            formData.append("file", File);
            formData.append("upload_preset", 'football-app');

            const uploadResponse = await axios.post(
                APICloudinary,
                formData
                );

            let  CloudinaryImage = uploadResponse.data.secure_url

            if(CloudinaryImage){
                secureImage.current = CloudinaryImage
                SetLoading(false)
            }






        }

        catch(error){
            SetLoading(false)
            console.log("error cloudinary",error.message)
        }


        try{
            const CreatePerson  = await axiosClient.post(`/create`,{
                "user_name":dataPerson.username,
                "user_img":  secureImage.current,
                "user_password": dataPerson.password
                }

            ,

        {
             withCredentials: true,
        })

                SetLoading(true)


            if(CreatePerson){
                console.log(CreatePerson ," <== creat person")
                 const {id, user_name , img}=  CreatePerson.data.user
                 dispatch({
                    type:"ADD_ID",
                    payload :{
                        id ,
                        UserName : user_name,
                        img

                    }
                 })



                 notify()
                 SetUserExist(false)
                 SetLoading(false)

                 Nav("/login")














            }


        }catch(err){
            SetLoading(false)

            if(err.message =="Request failed with status code 409"){
                SetUserExist(true)



            }

        }





    }

  useEffect(()=>{
        const HandelRefeshPage  =(e)=>{
            e.preventDefault()

            console.log("the user refreh the page")

        }


        window.addEventListener("beforeunload",HandelRefeshPage)
        return()=>{
            window.removeEventListener("beforeunload",HandelRefeshPage)
        }
    },[])
    return (
        <>
        <ToastContainer />

        <div className="createAccount"  >

            <div className="overlay"/>

            <div className="card">

                <button
                    className="backBtn"
                    onClick={()=>navigate("/login")}
                >
                    <ArrowLeft size={18}/>
                </button>

                <h1>Create <span>Account</span></h1>

                <p>
                    Join Sky Sports and start your football journey.

                </p>


                {

                    UserExisit &&

                      <p style={{color:"red",fontFamily:"sans-serif",letterSpacing:"1px",fontSize:"23px"}}>
                    Already exisit {username?.current?.value}
                </p>


                }

                <div
                    className="avatar"
                    onClick={()=>inputRef.current.click()}
                >

                    {
                        image
                        ?

                        <img src={image} alt="profile"/>

                        :

                        <Camera size={35}/>
                    }

                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={HandleImage}
                />

                <div className="inputBox">
                    <User size={20}/>
                    <input

                        type="text"
                        placeholder="Username"
                          style={{color:Error && "red"}}
                        ref={username}
                    />
                </div>

                {/* <div className="inputBox">
                    <Mail size={20}/>
                    <input
                        type="email"
                        placeholder="Email"
                    />
                </div> */}

                <div className="inputBox">
                    <Lock size={20}/>
                    <input
                    style={{color : ErrorPass && "red"}}
                        type="password"
                        placeholder="Password"
                        ref={password}
                    />
                </div>

                <button className="createBtn" onClick={()=>HandelLogin()}>
                    Create Account
                </button>

            </div>

        </div>

        {
            Loading  &&
         <div className="div_spinner">
            <Spinner/>
         </div>


        }

        </>


    )
}

export default CreateAccount;
