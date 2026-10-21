import React, { useRef, useState } from "react";
import {
  UploadCloud,
  Video,
  FileVideo,

  Ratio,
  CheckCircle2,
  LoaderCircle,
  CircleAlert,
  MoreVertical,
  SlidersHorizontal,
  Plus,
  
} from "lucide-react";

import "./upload.css";
import socket  from "../../socketClient/socket"
import { useEffect } from "react";
import axios from "axios";
import { generateId } from "../../utils/generateId";
import { useNavigate, useParams } from "react-router-dom";
import { use } from "../../axios/usehook";
import { timeAgo } from "../../utils/timeAgo";
import { formatVideo } from "../utils/formatVideo";
import axiosClient from "../../axios/endPoint";
const APICloudinary = import.meta.env.VITE_API_KEY;
 
function Status({ type, progress }) {
  if (type === "Completed") {
    return (
      <div className="upload-status upload-status--completed">
        <CheckCircle2 size={15} />
        <span>Completed</span>
      </div>
    );
  }

  if (type === "uploading") {
    return (
      <div className="upload-progress">
        <div className="upload-progress__top">
          <span>Uploading...</span>
          <span>{progress}</span>
        </div>

        <div className="upload-progress__bar">
          <div style={{ width: `${progress}` }} />
        </div>
      </div>
    );
  }

  if (type === "processing") {
    return (
      <div className="upload-status upload-status--processing">
        <LoaderCircle size={14} />
        <span>Analyze</span>
      </div>
    );
  }

  return (
    <div className="upload-status upload-status--failed">
      <CircleAlert size={15} />
      <span>Failed</span>
    </div>
  );
}

 function Upload() {




  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [_,setx] = useState(0)

  const Nav = useNavigate()
  const {roomId} = useParams()


  const videos = useRef([])

 



   const HostByCloudinary = async(file)=>{

      let createAssetVideo =   {
        videoId: generateId(),
        filename: file.name,
        caption:"test",
        size: `${((file.size/1024)/1024).toFixed(1)} MB`,
        duration:'00.00',
        status: "uploading",
        progress:"0%",
        videoLink:null,
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500",

      }

     

      const video = document.createElement("video");

      video.preload = "metadata";
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        const duration = video.duration;  
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        createAssetVideo.duration = `${minutes} min ${seconds} sec`


         
        
      };


 

    
    
     
        videos.current.unshift(createAssetVideo)
        
     

       try {
      
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "football");
   
          const uploadResponse = await axios.post(APICloudinary, formData 
              ,
                {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            
              const Idvideo = createAssetVideo.videoId 
              videos.current = videos.current.
              map((item)=>Idvideo==item.videoId ?  {...item , progress:`${percentCompleted}%`}: item)

              setx(p=>p+1)
              
              console.log(`Upload Progress: ${percentCompleted}%`);
              
            },
          }
          
            );

          let Cloudinarysecure_url = uploadResponse.data.secure_url;
          console.log(Cloudinarysecure_url)
        
       

          const UploadVideo  = await use("/upload/video","post",{
            roomId,
            videoId:createAssetVideo.videoId,
            caption:"test!!",
            duration:createAssetVideo.duration,
            videoLink:Cloudinarysecure_url,
            fileName:createAssetVideo.filename,
            size:createAssetVideo.size

          })

          videos.current = videos.current.map((item)=>createAssetVideo.videoId==item.videoId ?  {...item,videoLink:Cloudinarysecure_url,status:"processing"}:   item)
          setx(p=>p+1)

          

          if(UploadVideo.data.message=="good"){

              await use(
                  "/upload/video/analyze",
                  "post",
                    {
                  "videoId":createAssetVideo.videoId,
                  "roomId":roomId,
                  "img":Cloudinarysecure_url
            }
            
            )
              
          
            

          }
        
    
    }catch(err){
      console.log(err)
    }

  }


 

const uploadToB2 = (presignedUrl, file, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", presignedUrl);

    xhr.setRequestHeader("Content-Type", "video/mp4");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round(
          (event.loaded / event.total) * 100
        );

        onProgress(percent);
        console.log(`Uploading: ${percent}%`);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(
          new Error(`B2 upload failed: ${xhr.status} ${xhr.responseText}`)
        );
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network or CORS error during upload"));
    };

    xhr.onabort = () => {
      reject(new Error("Upload cancelled"));
    };

    xhr.send(file);
  });
};


 
 
const uploadVideo = async (file) => {
  try {
    // 1. Request the presigned upload URL
    const { data } = await axiosClient.post("s3/get-presigned-url",);

    console.log("Presigned URL received", data);

    // 2. Upload the video directly to Backblaze
    await uploadToB2(data.presigned, file, (percent) => {
      console.log(`Video upload progress: ${percent}%`);
    });

    console.log("Video uploaded successfully!");
    console.log("Video key:", data.key);

    // 3. Request the playable video URL
    const response2 = await axiosClient.post( "s3/get-video-url", { key: data.key} );

    const data2 = response2.data;

    console.log("Working video URL:", data2.url);

    // Return the video URL for use in React
    return data2.url;

  } catch (error) {
    console.error(
      "Upload error:",
      error.response?.data || error.message
    );

    return null;
  }
};
















 
 

  const handleFiles = async (files) => {
    if (!files?.length) return;

    const file = files[0];

    
    if((file.size/1024)/1024>100){
      console.log("should be use in s3 bucket")
       await uploadVideo(file)
    }
    else{
      await uploadVideo(file)
    }

    

    



    // Your upload logic here
  };

  const handleInput = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };





  useEffect(()=>{
    const  HandelUpdateVideos = async (message)=>{
        console.log(message,"<== result")
        videos.current =  videos.current.map((v)=>v.videoId==message.stream.videoId ? {...v,categorie:message.result,status:message.status} : v)
        setx((p)=>p+1)
    }
    socket.on("updateProgress",HandelUpdateVideos)
    return ()=>{
      socket.off("updateProgress",HandelUpdateVideos)
    }
  },[])



  useEffect(()=>{
    const HandelFetchMyUploadVideos = async ()=>{
      try{

        const {data} = await use("/upload/myvideos","post",{"roomId":roomId})
  
        videos.current = data.myvideo
        setx(p=>p+1)
        console.log(data)

      }catch(err){
        console.log(err)
      }
    }
    HandelFetchMyUploadVideos()
  },[])

  const HandelNavigateReelsSection = ()=>{
        Nav(`/home/shorts/${roomId}`)
  }


  return (
    <div className="upload-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="upload-sidebar">

        <div className="upload-brand" style={{cursor:"pointer"}} onClick={()=>HandelNavigateReelsSection()}>
          <div className="upload-brand__logo">
            ⚽
          </div>

          <div>
            <h2>Koura</h2>
            <span>Football. More than a game.</span>
          </div>
        </div>

        <nav className="upload-navigation">

       

          <a
            href="#"
            className="upload-nav-item upload-nav-item--active"
          >
            <UploadCloud size={19} />
            <span>Upload</span>
          </a>

        </nav>

        <div className="upload-sidebar__quote">
          <span>BETTER PLAYERS</span>
          <span>BIGGER DREAMS</span>
          <i />
        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="upload-main">

        {/* HEADER */}
        <header className="upload-header">

          <div className="upload-header__left">

            <div className="upload-header__icon">
              <UploadCloud size={28} />
            </div>

            <div>
              <h1>Upload Video</h1>
              <p>Share your football moments</p>
            </div>

          </div>

          <div className="upload-video-count">
            <Video size={17} />
            <span>Your videos</span>
            <strong>{videos.length}</strong>
          </div>

        </header>

        {/* ================= DROPZONE ================= */}
        <section
          className={`upload-dropzone ${
            dragging ? "upload-dropzone--dragging" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            hidden
            onChange={handleInput}
          />

          <div className="upload-dropzone__pitch">

            <div className="pitch-line pitch-line--left" />
            <div className="pitch-line pitch-line--right" />

          </div>

          <div className="upload-dropzone__content">

            <div className="upload-dropzone__icon">
              <Video size={30} />
              <UploadCloud size={20} />
            </div>

            <h2>Select video to upload</h2>

            <p>or drag and drop here</p>

            <button
              type="button"
              className="upload-select-button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Plus size={18} />
              Choose video
            </button>

          </div>

        </section>

        {/* ================= INFO ================= */}
        <section className="upload-info">

          <div className="upload-info__item">
            <div className="upload-info__icon">
              <FileVideo size={20} />
            </div>

            <div>
              <h3>File formats</h3>
              <p>MP4, MOV, AVI, MKV, WebM</p>
            </div>
          </div>

          <div className="upload-info__divider" />

          <div className="upload-info__item">
            <div className="upload-info__icon">
              <UploadCloud size={20} />
            </div>

            <div>
              <h3>Max size & duration</h3>
              <p>Max 30 GB • Max 60 minutes</p>
            </div>
          </div>

          <div className="upload-info__divider" />

          <div className="upload-info__item">
            <div className="upload-info__icon">
              <Ratio size={20} />
            </div>

            <div>
              <h3>Aspect ratios</h3>
              <p>16:9 landscape • 9:16 vertical</p>
            </div>
          </div>

        </section>

        {/* ================= UPLOADS HEADER ================= */}
        <div className="upload-list-header">

          <h2>Your uploads</h2>

          <button className="upload-sort">
            <SlidersHorizontal size={15} />
            <span>Newest first</span>
            <span className="upload-sort__arrow">⌄</span>
          </button>

        </div>

        {/* ================= VIDEO LIST ================= */}
        <section className="upload-list">

          {videos.current.map((video) => (
            <div className="upload-video" key={video.videoId}>

              <div className="upload-video__thumbnail">
                  {
                video.videoLink ? (
                  <video
                  muted
                    controls
                    playsInline
                    preload="metadata"
                    onClick={(e) => {
                      if (e.currentTarget.requestFullscreen) {
                        e.currentTarget.requestFullscreen();
                      }
                    }}
                    style={{ width: "100%", height: "auto" }}
                  >
                    <source src={formatVideo(video.videoLink)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={video.image} alt={video.caption} />
                )
              }
                    

                <span>{video.duration}</span>

              </div>

              <div className="upload-video__details">

                <h3>{video.caption}</h3>

                <div className="upload-video__meta">
                  <span>{video.size}</span>
                  <b>•</b>
                  <span>{timeAgo(video.createdAt)}</span>
                  
                </div>
               <div className="upload-video__meta">
                
                  <div className="hastag">#{video?.categorie?.split("=>")[1]}</div>
                   
                  
                </div>
              </div>

              <div className="upload-video__status">
                <Status
                  type={video.status}
                  progress={video.progress}
                />
              </div>

              <button className="upload-video__menu">
                <MoreVertical size={19} />
              </button>

            </div>
          ))}

        </section>

      </main>
    </div>
  );
}
export default  Upload