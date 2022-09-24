import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../../components/Ui/FooterComponent";
import Header from "../../../components/Ui/Header";
import {
  getRequest,
  onSavePhoto,
  deleteRequest,
} from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import { Input } from "../../../components/Ui/FormElements/Styles";
import {
  EventAdder,
  EventDocsContainer,
  EventDocsMain,
  EventDocsStyled,
  EventList,
  EventListInfo,
  EventListTitle,
  FileNotFound,
  SortableButton,
} from "./style";
import {
  FolderIcon,
  DotsFunction,
  PlusIcon,
  ToTopIcon,
  SortIcon,
  HistoryIcon,
  FileIcon,
  Search,
} from "../../../components/icon";
import IconSvg from "../../../components/icon/iconSVG.png";
import IconGif from "../../../components/icon/iconGIF.png";
import IconPdf from "../../../components/icon/iconPDF.png";
import FolderImages from "../../../components/icon/folderImages.png";
import FolderPhotos from "../../../components/icon/folderPhotos.png";
import FolderDocs from "../../../components/icon/folderDocs.png";

function EventDocs() {
  const { id } = useParams();
  const Person = useSelector(({ user }) => user?.user);
  const [isOpen, setIsOpen] = React.useState(false);
  const [eventListData, setEventListData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSort, setIsSort] = React.useState(true);
  const [isDesign, setIsDesign] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [isNowUpload, setIsNowUpload] = React.useState(false);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const handleClickOutside = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleClick = React.useCallback(() => {
    setIsOpen(true);
  }, []);
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  React.useInsertionEffect(() => {
    if (id) {
      setIsLoading(true);
      getRequest(`/insurance-case/${id}`)
        .then((res) => {
          if (!res?.error) {
            setIsLoading(false);
            setEventListData(res?.message?.insurance_case?.insured_event.files);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [isNowUpload, id]);

  const FileUpload = (e, id) => {
    setIsNowUpload(false);
    onSavePhoto(e, setIsLoading, id, isOpenMenu)
      .then((res) => {
        if (!res?.error) {
          setIsNowUpload(true);
        }
      })
      .catch((err) => {
        setIsNowUpload(false);
        console.log(err);
      });
  };

  const FileType = (type, link) => {
    return type?.split(".")[type?.split(".").length - 1] === "jpg" ||
      type?.split(".")[type?.split(".").length - 1] === "jpeg" ? (
      <img src={link?.split("&export")[0]} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "svg" ? (
      <img src={IconSvg} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "png" ? (
      <img src={link?.split("&export")[0]} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "gif" ? (
      <img src={IconGif} alt="icon" />
    ) : type?.split(".")[type?.split(".").length - 1] === "pdf" ? (
      <img src={IconPdf} alt="icon" />
    ) : (
      <FolderIcon />
    );
  };

  const filteredData = eventListData
    ?.filter((res) => res?.folder_type === isOpenMenu)
    ?.filter((el) => {
      //if no input the return the original
      if (inputText === "") {
        return el;
      }
      //return the item which contains the user input
      else {
        return el.file_name?.toLowerCase().includes(inputText);
      }
    });

  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const deleteFile = (drive_id) => {
    setIsLoading(true);
    setIsNowUpload(true);
    deleteRequest(`/insurance-case/${id}/delete-files/${drive_id}`)
      .then((res) => {
        if (!res?.error) {
          setIsNowUpload(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsNowUpload(false);
        console.log(err);
      });
  };

  return (
    <div className="flex__column__ h-100">
      <div>
        {isLoading && <Loader />}
        <Header
          text={`שלום ${Person?.first_name}`}
          title={`מסמכים ${id ? `(${id})` : ""} `}
        />
        <EventDocsMain>
          <SortableButton>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isOpenMenu && (
                <div
                  className="speace"
                  onClick={() => {
                    setIsOpenMenu(null);
                    setIsDesign(false);
                  }}
                >
                  <ToTopIcon style={{ transform: "rotate(45deg)" }} />
                  <p>Back</p>
                </div>
              )}
              {isOpenMenu && (
                <div
                  className="speace"
                  onClick={() => {
                    if (isSort) {
                      setIsSort(false);
                      setEventListData(
                        eventListData.sort(function (a, b) {
                          return a.id - b.id;
                        })
                      );
                    }
                    if (!isSort) {
                      setIsSort(true);
                      setEventListData(
                        eventListData.sort(function (a, b) {
                          if (a.file_name < b.file_name) {
                            return -1;
                          }
                          if (a.file_name > b.file_name) {
                            return 1;
                          }
                          return 0;
                        })
                      );
                    }
                  }}
                >
                  <p>{isSort ? "Date" : "Name"}</p>
                  {isSort ? <HistoryIcon /> : <ToTopIcon />}
                </div>
              )}
              {!isOpenMenu && (
                <div className="speace">
                  <img src={FolderDocs} alt="..." className="icon" />
                  <p>{id} - Event Folders</p>
                </div>
              )}
            </div>
            {isOpenMenu && (
              <label className="search_bar">
                <Input
                  onChange={inputHandler}
                  type="text"
                  className="search_input"
                  as={"input"}
                  placeholder="חיפוש קובץ או תמונה"
                />
                <Search />
              </label>
            )}
            {isOpenMenu && (
              <div
                className="between"
                onClick={() => {
                  setIsDesign(!isDesign);
                }}
              >
                <SortIcon isDesign={isDesign} />
              </div>
            )}
          </SortableButton>
          <EventDocsStyled>
            <EventDocsContainer theme={isDesign}>
              {isOpenMenu && (
                <>
                  {(inputText.length > 0
                    ? filteredData
                    : eventListData?.filter(
                        (res) => res?.folder_type === isOpenMenu
                      )
                  )?.length === 0 ? (
                    <FileNotFound>
                      <FileIcon />
                      <p>
                        קובץ או תמונה אינם זמינים כלל או שאינך מחובר לאינטרנט!{" "}
                        <br />
                        כאן אתה מעלה קובץ או תמונה
                      </p>
                    </FileNotFound>
                  ) : (
                    (inputText.length > 0
                      ? filteredData
                      : eventListData?.filter(
                          (res) => res?.folder_type === isOpenMenu
                        )
                    )?.map((data, i) => (
                      <EventList
                        className={`${isOpen === i ? "active" : ""}`}
                        key={i}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleClick();
                          setIsOpen(i);
                        }}
                      >
                        <a
                          href={`${data?.link ?? "/"}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <EventList>
                            {FileType(data?.file_name, data?.link)}
                            <EventListInfo>
                              <EventListTitle>{data?.file_name}</EventListTitle>
                            </EventListInfo>
                          </EventList>
                        </a>
                        <DotsFunction
                          className="dots_"
                          onClick={() => {
                            handleClick();
                            setIsOpen(i);
                          }}
                          isOpen={isOpen === i}
                          lists={[
                            {
                              text: "Delete",
                              onClick: () => {
                                deleteFile(data?.file_google_drive_id);
                              },
                              className: "error",
                            },
                          ]}
                        />
                      </EventList>
                    ))
                  )}
                </>
              )}
              {!isOpenMenu && (
                <>
                  <EventList onClick={() => setIsOpenMenu("images")}>
                    <a href="#docs">
                      <EventList>
                        <img
                          src={FolderImages}
                          alt=""
                          className="icon"
                          style={{
                            mixBlendMode: "darken",
                          }}
                        />
                        <EventListInfo>
                          <EventListTitle>Images</EventListTitle>
                        </EventListInfo>
                      </EventList>
                    </a>
                  </EventList>
                  <EventList onClick={() => setIsOpenMenu("photos")}>
                    <a href="#docs">
                      <EventList>
                        <img src={FolderPhotos} alt="" className="icon" />
                        <EventListInfo>
                          <EventListTitle>Photos</EventListTitle>
                        </EventListInfo>
                      </EventList>
                    </a>
                  </EventList>
                  <EventList onClick={() => setIsOpenMenu("docs")}>
                    <a href="#docs">
                      <EventList>
                        <img src={FolderDocs} alt="" className="icon" />
                        <EventListInfo>
                          <EventListTitle>Docs</EventListTitle>
                        </EventListInfo>
                      </EventList>
                    </a>
                  </EventList>
                </>
              )}
            </EventDocsContainer>
          </EventDocsStyled>
          {isOpenMenu && (
            <EventAdder theme={eventListData?.length === 0}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  FileUpload(e, id);
                }}
                name=""
                id=""
              />
              <PlusIcon />
            </EventAdder>
          )}
        </EventDocsMain>
      </div>
      <Footer />
    </div>
  );
}

export default EventDocs;
