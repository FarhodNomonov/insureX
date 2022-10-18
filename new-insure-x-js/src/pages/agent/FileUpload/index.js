import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CameraUpload,
  FileUploadFile,
  FileUploadImage,
  FolderIcon,
} from "../../../components/icon";
import Button from "../../../components/Ui/Button/Button";
import Header from "../../../components/Ui/Header";
import { EventList, FileUploadContainer } from "./upload.styled";
import { onSavePhoto } from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import IconJpg from "../../../components/Icons/iconJPG.png";
import IconPng from "../../../components/Icons/iconPNG.png";
import IconSvg from "../../../components/Icons/iconSVG.png";
import IconGif from "../../../components/Icons/iconGIF.png";
import IconPdf from "../../../components/Icons/iconPDF.png";
import UseCamera from "../../../hook/useCamera";

function FileUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [uploadedPhotos, setUploadedPhotos] = React.useState([]);
  const [takedPhotos, setTakedPhotos] = React.useState([]);
  const Agent = JSON.parse(localStorage.getItem("agent"));

  const HandleUpload = (e, id, type) => {
    if (id) {
      setIsLoading(true);
      onSavePhoto(e, setIsLoading, id)
        .then((res) => {
          if (!res?.error) {
            setIsLoading(false);

            if (type === "files") {
              setUploadedFiles([...uploadedFiles, e.target.files[0]]);
            }
            if (type === "photos") {
              setUploadedPhotos([...uploadedPhotos, e.target.files[0]]);
            }
            if (type === "taked") {
              setTakedPhotos([...takedPhotos, e.target.files[0]]);
            }
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      console.log("no id");
    }
  };

  const FileType = (type) => {
    return type?.split(".")[type?.split(".").length - 1] === "jpg" ||
      type?.split(".")[type?.split(".").length - 1] === "jpeg" ? (
      <img src={IconJpg} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "svg" ? (
      <img src={IconSvg} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "png" ? (
      <img src={IconPng} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "gif" ? (
      <img src={IconGif} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "pdf" ? (
      <img src={IconPdf} alt="icon" />
    ) : (
      <FolderIcon />
    );
  };

  return (
    <>
      <UseCamera
        isTakedData={takedPhotos}
        setIsTakedData={setTakedPhotos}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        id={id}
        setIsLoading={setIsLoading}
        position={"top"} // top, bottom, left, right
        mode={"modal"} // mode values: modal, fullscreen, static
        transition={"0.3s"} // transition speed
        takeButton={<div>takeButton</div>} // take button component
        startButton={<div>startButton</div>} // start button component
        stopButton={<div>stopButton</div>} // stop button component
      />

      <Header
        bg="#561D57"
        head="יישומון סוכן"
        text={`שלום ${Agent?.first_name}`}
        title={`העלאת קבצים - תאונת דרכים ${id ? `(${id})` : ""} `}
      />
      {isLoading && <Loader />}
      <FileUploadContainer>
        <div className="btn_content">
          <label onClick={() => setOpenModal(true)}>
            <div>
              <CameraUpload />
              <p>צלם תמונה/וידאו</p>
            </div>
          </label>
          {takedPhotos.map((_res, i) => (
            <EventList key={i}>
              {_res?.name}
              {FileType(_res?.name)}
            </EventList>
          ))}
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                HandleUpload(e, id, "photos");
              }}
            />
            <div>
              <FileUploadImage />
              <p>העלה מהגלריה</p>
            </div>
          </label>
          {uploadedPhotos.map((_res, i) => (
            <EventList key={i}>
              {_res?.name}
              {FileType(_res?.name)}
            </EventList>
          ))}
          <label>
            <input
              type="file"
              onChange={(e) => {
                HandleUpload(e, id, "files");
              }}
            />
            <div>
              <FileUploadFile />
              <p>העלה קבצים</p>
            </div>
          </label>
          {uploadedFiles.map((_res, i) => (
            <EventList key={i}>
              {_res?.name}
              {FileType(_res?.name)}
            </EventList>
          ))}
        </div>
        <div className="btn_submit">
          <Button
            onClick={() => {
              navigate(`/agent/events/event-docs/${id}`);
            }}
          >
            העלה
          </Button>
        </div>
      </FileUploadContainer>
    </>
  );
}

export default FileUpload;
