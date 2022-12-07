import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Footer from "../../../components/Ui/FooterComponent";
import Header from "../../../components/Ui/Header";
import Accord from "../../../components/Ui/Accord";
import Button from "../../../components/Ui/Button/Button";
import { FooterQuestionBtn, Overlay } from "../HomePage/style";
import { MessageIcon, Question, QuestionIcon } from "../../../components/icon";
import {
  Input,
  WrapperInput,
} from "../../../components/Ui/FormElements/Styles";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
  Modal,
} from "../RegisterPage/style";

function ReportPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHelpModal, setIsHelpModal] = React.useState(0);
  const Person = useSelector(({ user }) => user?.user);

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
    <div className="flex__column__ report__cont h-100">
      <div>
        <div style={{ position: "relative", zIndex: "2" }}>
          <Header text={`שלום ${Person?.first_name}`} title="פתח אירוע" />
        </div>
        <div className="accord___container">
          <Accord />
        </div>
      </div>
      <div>
        <div style={{ position: "relative", marginBottom: "25px" }}>
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
      </div>
    </div>
  );
}

export default ReportPage;
