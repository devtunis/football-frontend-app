
import HeaderOptions from "./HeaderOptions";
import OptionVideo from "./OptionVideo";
import Pause from "./Pause";
import ProfileContent from "./ProfileContent";
import Sound from "./Sound";

const Player = ({
  src,
  pauseVideo,
  on,
  toggleSound,
  isPause,
  currentvideoTrack,
}) => {
  const handleVideoError = (e) => {
    const video = e.currentTarget;

    console.error("❌ Video failed to load");
    console.error("Video URL:", video.currentSrc || src);
    console.error("Error code:", video.error?.code);
    console.error("Error message:", video.error?.message);

    if (video.error) {
      switch (video.error.code) {
        case 1:
          console.error("Video loading was aborted.");
          break;
        case 2:
          console.error("Network error while loading video.");
          break;
        case 3:
          console.error("Video decoding failed.");
          break;
        case 4:
          console.error("Video format or source is not supported.");
          break;
        default:
          console.error("Unknown video error.");
      }
    }
  };

  return (
    <div className="shorts_video">
      <OptionVideo />
      <ProfileContent />

      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        preload="metadata"
        onClick={(e) => pauseVideo(e.currentTarget)}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;

          console.log("✅ Video metadata loaded");
          console.log("URL:", video.currentSrc);
          console.log("Duration:", video.duration);
          console.log("Video size:", video.videoWidth, video.videoHeight);
        }}
        onCanPlay={() => {
          console.log("✅ Video can play");
        }}
        onError={handleVideoError}
      />

      {isPause && (
        <>
          <Pause track={() => pauseVideo(currentvideoTrack)} />
          <Sound isOn={on} setSoundOn={() => toggleSound()} />
        </>
      )}
    </div>
  );
};

export default Player;
