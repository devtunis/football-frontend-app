import React, { useRef, useState } from "react";
import {
  UploadCloud,
  Video,
  FileVideo,
  Clock3,
  Ratio,
  Home,
  MessageSquare,
  BarChart3,
  Trophy,
  CheckCircle2,
  LoaderCircle,
  CircleAlert,
  MoreVertical,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

import "./upload.css";

const videos = [
  {
    id: 1,
    title: "Amazing Goal vs City",
    size: "142.6 MB",
    time: "2 minutes ago",
    duration: "02:42",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500",
    status: "completed",
  },
  {
    id: 2,
    title: "City Walk",
    size: "368.4 MB",
    time: "12 minutes ago",
    duration: "05:18",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500",
    status: "uploading",
    progress: 68,
  },
  {
    id: 3,
    title: "Underwater Training",
    size: "98.7 MB",
    time: "28 minutes ago",
    duration: "01:24",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500",
    status: "processing",
  },
  {
    id: 4,
    title: "Forest Path",
    size: "215.3 MB",
    time: "46 minutes ago",
    duration: "03:56",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500",
    status: "failed",
  },
];

function Status({ type, progress }) {
  if (type === "completed") {
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
          <span>{progress}%</span>
        </div>

        <div className="upload-progress__bar">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  if (type === "processing") {
    return (
      <div className="upload-status upload-status--processing">
        <LoaderCircle size={14} />
        <span>Processing</span>
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

  const handleFiles = (files) => {
    if (!files?.length) return;

    const file = files[0];

    console.log("Selected video:", file);

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

  return (
    <div className="upload-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="upload-sidebar">

        <div className="upload-brand">
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

          {videos.map((video) => (
            <div className="upload-video" key={video.id}>

              <div className="upload-video__thumbnail">

                <img
                  src={video.image}
                  alt={video.title}
                />

                <span>{video.duration}</span>

              </div>

              <div className="upload-video__details">

                <h3>{video.title}</h3>

                <div className="upload-video__meta">
                  <span>{video.size}</span>
                  <b>•</b>
                  <span>{video.time}</span>
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