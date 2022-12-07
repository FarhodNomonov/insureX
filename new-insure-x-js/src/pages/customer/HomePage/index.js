import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  CaseTypeExtract,
  getRequest,
  StatusName,
} from "../../../utils/requestApi";

import {
  Client,
  NextArrow,
  QuestionIcon,
  Question,
  MessageIcon,
} from "../../../components/icon";
import Footer from "../../../components/Ui/FooterComponent";
import Header from "../../../components/Ui/Header";
import { FooterQuestionBtn, HomeContainer, Overlay } from "./style";
import Loader from "../../../components/Ui/Loading/loader";
import Button from "../../../components/Ui/Button/Button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
  WrapperInput,
} from "../RegisterPage/style";
import { Input } from "../../../components/Ui/FormElements/Styles";

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [caseData, setCaseData] = React.useState([]);
  const [isActive, setIsActive] = React.useState(0);
  const [isSlide, setIsSlide] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHelpModal, setIsHelpModal] = React.useState(0);
  const Person = useSelector(({ user }) => user?.user);

  React.useInsertionEffect(() => {
    if (!Person?.id) return;
    setIsLoading(true);
    getRequest(`/insurance-case/?insured_person_id=${Person?.id}`)
      .then(({ message }) => {
        setCaseData(
          message?.insurance_cases
            ?.filter((status) => !status.delete)
            ?.sort((a, b) => b.id - a.id)
        );
        setIsLoading(false);
        console.clear();
      })
      .catch((err) => {
        console.clear();
        console.log(err);
        setCaseData([]);
        setIsLoading(false);
      });
  }, [Person?.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsHelpModal(2);
    reset();
  };
  return (
    <HomeContainer className="flex__column__ h-100">
      <div style={{ position: "relative", zIndex: "2" }}>
        <Header title="מסך ראשי" text={` שלום ${Person?.first_name}`} />
      </div>

      {isLoading && <Loader />}
      {!isLoading && caseData.length > 0 && (
        <>
          <Button
            style={{ margin: "0 auto" }}
            onClick={() => navigate("/report")}
          >
            פתח אירוע
          </Button>
          <div className="flex_container">
            {caseData.length > 1 && (
              <button
                className="next_button"
                onClick={() => {
                  setIsSlide("animation_svg_right");
                  setIsActive(
                    isActive >= 1 ? isActive - 1 : caseData.length - 1
                  );
                }}
              >
                <NextArrow />
              </button>
            )}
            <div style={{ display: "flex", direction: "ltr" }}>
              {caseData?.map((data, i) => {
                return (
                  <React.Fragment key={i}>
                    {isActive === i && (
                      <div className={`client`} key={data?.id}>
                        <div className={`client_body ${isSlide}`}>
                          <button
                            className="client_title"
                            style={{ background: "none", border: "none" }}
                            onClick={() => {
                              if (data.status_id >= 3) {
                                navigate(`/status#${data?.id}`);
                              } else {
                                navigate(
                                  `/${CaseTypeExtract(data)?.link}#${data?.id}`
                                );
                              }
                            }}
                          >
                            <small>{CaseTypeExtract(data)?.name}</small>
                            <p style={{ color: "#1d3557" }}>{data?.id}</p>
                            <small style={{ color: "#1d3557" }}>
                              {StatusName(data ?? {})}
                            </small>
                          </button>
                          <Client status={data?.status_id - 1} />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {caseData.length > 1 && (
              <button
                onClick={() => {
                  setIsSlide("animation_svg_left");
                  setIsActive(
                    caseData.length - 1 > isActive ? isActive + 1 : 0
                  );
                }}
              >
                <NextArrow />
              </button>
            )}
          </div>
        </>
      )}
      {caseData.length === 0 && (
        <div className={`client`}>
          <div className={`client_body`}>
            <button
              className="client_title"
              onClick={() => navigate("/report", { replace: true })}
            >
              <p>פתח</p>
              <p>אירוע</p>
            </button>
            <Client status={-1} />
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        <FooterQuestionBtn>
          {isOpen && (
            <>
              <Button
                onClick={() => {
                  setIsHelpModal(1);
                }}
              >
                בקשת עזרה
              </Button>
              <Button>יצירת קשר</Button>
            </>
          )}

          <Question
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </FooterQuestionBtn>
        <Overlay isOpen={isOpen} />
      </div>
      <div style={{ position: "relative", zIndex: "2" }}>
        <Footer />
      </div>
      {isHelpModal > 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal>
            <ModalContent
              style={{
                maxWidth: isHelpModal === 2 ? "350px" : "400px",
                margin: "10px auto",
                width: "calc(100% - 20px)",
              }}
            >
              <ModalHeader>
                <ModalHeaderIconWrapper>
                  <QuestionIcon />
                  <ModalHeaderTitle>בקשת עזרה</ModalHeaderTitle>
                </ModalHeaderIconWrapper>
              </ModalHeader>
              {isHelpModal === 1 && (
                <ModalBody>
                  <WrapperInput style={{ margin: "0" }}>
                    <Input
                      {...register("name", { required: true })}
                      style={{
                        margin: "7.5px 0",
                        border: errors.name && "1px solid red",
                      }}
                      as="input"
                      type="text"
                      placeholder="שם מלא"
                    />
                    <Input
                      {...register("passport_id", { required: true })}
                      style={{
                        margin: "7.5px 0",
                        border: errors.passport_id && "1px solid red",
                      }}
                      as="input"
                      type="text"
                      placeholder="מזהה דרכון"
                    />
                    <Input
                      {...register("address", { required: true })}
                      style={{
                        margin: "7.5px 0",
                        border: errors.address && "1px solid red",
                      }}
                      as="input"
                      type="text"
                      placeholder="כתובת"
                    />
                    <Input
                      {...register("comment", { required: true })}
                      style={{
                        margin: "7.5px 0",
                        border: errors.comment && "1px solid red",
                      }}
                      as="textarea"
                      type="text"
                      placeholder="פרטי הפנייה"
                    />
                    <div style={{ textAlign: "center" }}>
                      <Button type="submit">שלח</Button>
                    </div>
                  </WrapperInput>
                </ModalBody>
              )}
              {isHelpModal === 2 && (
                <ModalBody>
                  <MessageIcon />
                  <p style={{ textAlign: "center", fontSize: "28px" }}>
                    פנייתך התקבלה
                    <br /> ותטופל ביום
                    <br /> העסקים הקרוב
                  </p>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsHelpModal(0);
                        setIsOpen(false);
                      }}
                    >
                      סגור
                    </Button>
                  </div>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </form>
      )}
    </HomeContainer>
  );
}

export default HomePage;
