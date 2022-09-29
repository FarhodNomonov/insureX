import { useRef, useState, useEffect } from "react";
import { onSavePhoto } from "../utils/requestApi";
import { StyledCameraContainer } from "./camera.styled";

function UseCamera({
  isOpen,
  setIsOpen,
  position,
  id,
  setIsLoading,
  mode,
  isTakedData,
  setIsTakedData,
  ...props
}) {
  const [isFileName, setIsFileName] = useState("image");
  const [isSave, setIsSave] = useState(false);
  let videoRef = useRef(null);
  let canvasRef = useRef(null);

  const handleTakePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/png");

    video.pause();
    if (isSave) {
      UrlToFileData(data);
    }
  };

  const handleStopVideo = async () => {
    const video = videoRef.current;
    await video.pause();
    video.srcObject = null;
    await setIsSave(true);
    video.currentTime = 0;
  };

  const handleStartVideo = async () => {
    const video = videoRef.current;
    const constraints = {
      audio: false,
      video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
      },
    };
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async (stream) => {
        video.srcObject = stream;
        await video.play();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsSave(false);
  };

  useEffect(() => {
    if (isOpen) {
      handleStartVideo();
    } else {
      handleStopVideo();
    }
  }, [isOpen]);

  const UrlToFileData = (url) => {
    const xhr = new XMLHttpRequest();
    let file;
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      if (this.status === 200) {
        const blob = this.response;
        setIsOpen(false);
        setIsTakedData &&
          isTakedData &&
          setIsTakedData([
            ...isTakedData,
            new File([blob], `${isFileName}.png`, { type: "image/png" }),
          ]);
        e.target.files = [
          new File([blob], `${isFileName}.png`, { type: "image/png" }),
        ];
        onSavePhoto(e, setIsLoading, id, "photos");
      }
    };
    xhr.send();
    return file;
  };

  return (
    <StyledCameraContainer
      {...props}
      position={position}
      mode={mode}
      style={isOpen ? {} : { display: "none" }}
    >
      <div className="camera">
        <div className="video">
          <button
            type="button"
            className="back"
            onClick={() => {
              setIsOpen(false);
              handleStopVideo();
            }}
          >
            גב
          </button>

          <video ref={videoRef} />
          <canvas ref={canvasRef} />
        </div>
        <div className="btn_camera">
          {isSave && (
            <input
              type="text"
              value={isFileName}
              onChange={(e) => setIsFileName(e.target.value)}
            />
          )}
          <button
            type="button"
            onClick={() => {
              setIsSave(true);
              handleTakePhoto();
            }}
          >
            צלם תמונה
          </button>
        </div>
      </div>
    </StyledCameraContainer>
  );
}
export default UseCamera;
