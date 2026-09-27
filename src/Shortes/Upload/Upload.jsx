import "./upload.css"




import  { useRef, useState } from "react";
 

const videos = [
  {
    id: 1,
    title: "Nature Sunset",
    size: "2.4 MB",
    time: "2 minutes ago",
    duration: "01:42",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300&q=80",
  },
  {
    id: 2,
    title: "City Walk",
    size: "12.8 MB",
    time: "5 minutes ago",
    duration: "03:15",
    status: "uploading",
    progress: 68,
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80",
  },
  {
    id: 3,
    title: "Underwater",
    size: "8.3 MB",
    time: "12 minutes ago",
    duration: "02:27",
    status: "processing",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&q=80",
  },
  {
    id: 4,
    title: "Mountain View",
    size: "18.6 MB",
    time: "28 minutes ago",
    duration: "04:12",
    status: "queued",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80",
  },
  {
    id: 5,
    title: "Forest Path",
    size: "6.7 MB",
    time: "35 minutes ago",
    duration: "01:05",
    status: "failed",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
  },
];

function Status({ video }) {
  if (video.status === "completed") {
    return (
      <span className="upload-status upload-status--completed">
        <span className="status-icon">✓</span>
        Completed
      </span>
    );
  }

  if (video.status === "uploading") {
    return (
      <div className="upload-progress">
        <div className="upload-progress__top">
          <span>Uploading...</span>
          <span>{video.progress}%</span>
        </div>

        <div className="upload-progress__bar">
          <div style={{ width: `${video.progress}%` }} />
        </div>
      </div>
    );
  }

  if (video.status === "processing") {
    return (
      <span className="upload-status upload-status--processing">
        <span className="status-icon">◷</span>
        Processing
      </span>
    );
  }

  if (video.status === "queued") {
    return (
      <span className="upload-status upload-status--queued">
        <span className="status-icon">◷</span>
        Queued
      </span>
    );
  }

  return (
    <span className="upload-status upload-status--failed">
      <span className="status-icon">!</span>
      Failed
    </span>
  );
}

const  Upload = () =>{
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const chooseVideo = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files) => {
    if (!files?.length) return;

    const file = files[0];

    if (!file.type.startsWith("video/")) {
      alert("Please select a video file.");
      return;
    }

    console.log("Selected video:", file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="upload-page">
      <div className="upload-card">

        {/* Header */}
        <div className="upload-header">
          <div className="upload-title-wrapper">
            <div className="upload-logo">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="4" />
                <path d="M10 9l5 3-5 3z" />
              </svg>
            </div>

            <div>
              <h1>Upload Video</h1>
              <p>Add your video and it will be processed.</p>
            </div>
          </div>

          <div className="your-videos">
            <svg viewBox="0 0 24 24">
              <path d="M12 16V4" />
              <path d="M8 8l4-4 4 4" />
              <path d="M5 15v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2" />
            </svg>

            <span>Your videos</span>
            <b>{videos.length}</b>
          </div>
        </div>

        {/* Upload zone */}
        <div
          className={`upload-dropzone ${
            dragging ? "upload-dropzone--dragging" : ""
          }`}
          onClick={chooseVideo}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="upload-cloud">
            <svg viewBox="0 0 24 24">
              <path d="M12 16V4" />
              <path d="M8 8l4-4 4 4" />
              <path d="M5 15v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2" />
            </svg>
          </div>

          <button
            className="choose-video-btn"
            onClick={(e) => {
              e.stopPropagation();
              chooseVideo();
            }}
          >
            <span>+</span>
            Choose Video
          </button>

          <p>or drag and drop here</p>
          <small>MP4, MOV, AVI • Max 2GB</small>

          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Videos header */}
        <div className="videos-heading">
          <h2>Your Uploads</h2>

          <button className="sort-button">
            <svg viewBox="0 0 24 24">
              <path d="M4 6h16" />
              <path d="M7 12h10" />
              <path d="M10 18h4" />
            </svg>

            Newest first

            <span>⌄</span>
          </button>
        </div>

        {/* Queue */}
        <div className="video-list">
          {videos.map((video) => (
            <div className="video-item" key={video.id}>

              <div className="video-thumbnail">
                <img src={video.image} alt={video.title} />
                <span>{video.duration}</span>
              </div>

              <div className="video-info">
                <h3>{video.title}</h3>

                <p>
                  {video.size}
                  <span>•</span>
                  {video.time}
                </p>
              </div>

              <div className="video-status">
                <Status video={video} />
              </div>

              <button className="video-menu">
                <span />
                <span />
                <span />
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



 

export default Upload