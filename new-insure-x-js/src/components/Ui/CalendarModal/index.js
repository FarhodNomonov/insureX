import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
} from "pages/spec/RegisterForm/Styles";
import Button from "components/Ui/Button/Button";
import {
  patchRequest,
  getFormData,
  postRequest,
  typeCase,
} from "utils/requestsApi";
import Loader from "../Loading/loader";
import { CalendarAppreiser } from "components/Icons";
import { toast } from "react-hot-toast";
import { Message } from "utils/messages";

function CalendarModal({ id = null, onClose = () => {}, values = {} }) {
  const GlobalState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    if (id && data?.time) {
      values = {
        ...values,
        date: `${data?.date} ${data?.time}`,
        meet_id: id,
      };

      const messageSendEdited = () => {
        postRequest(
          "/insurance-case/messages/create",
          getFormData({
            type: "web-client",
            ms_text: ["accident", "carburglary", "theftcar"]?.includes(
              typeCase?.find(
                (tp) =>
                  Number(tp.event_type_id) ===
                    Number(
                      GlobalState?.cases?.find(
                        (cs) =>
                          Number(cs.id) ===
                          Number(
                            GlobalState?.meeting?.find(
                              (meet) => Number(meet?.id) === Number(id)
                            )?.insurance_case_id
                          )
                      )?.event_type_id
                    ) &&
                  Number(tp.property_type_id) ===
                    Number(
                      GlobalState?.cases?.find(
                        (cs) =>
                          Number(cs.id) ===
                          Number(
                            GlobalState?.meeting?.find(
                              (meet) => Number(meet?.id) === Number(id)
                            )?.insurance_case_id
                          )
                      )?.property_type_id
                    )
              )?.link
            )
              ? Message.msAppraiser130(
                  GlobalState?.meeting?.find(
                    (meet) => Number(meet?.id) === Number(id)
                  )?.insurance_case_id,
                  typeCase?.find(
                    (tp) =>
                      Number(tp.event_type_id) ===
                        Number(
                          GlobalState?.cases?.find(
                            (cs) =>
                              Number(cs.id) ===
                              Number(
                                GlobalState?.meeting?.find(
                                  (meet) => Number(meet?.id) === Number(id)
                                )?.insurance_case_id
                              )
                          )?.event_type_id
                        ) &&
                      Number(tp.property_type_id) ===
                        Number(
                          GlobalState?.cases?.find(
                            (cs) =>
                              Number(cs.id) ===
                              Number(
                                GlobalState?.meeting?.find(
                                  (meet) => Number(meet?.id) === Number(id)
                                )?.insurance_case_id
                              )
                          )?.property_type_id
                        )
                  )?.name,
                  GlobalState?.sdp?.find(
                    (sdps) =>
                      Number(sdps?.id) ===
                      Number(
                        GlobalState?.meeting?.find(
                          (meet) => Number(meet?.id) === Number(id)
                        )?.sdp_id
                      )
                  )?.first_name,
                  GlobalState?.appraiser?.find(
                    (sdps) =>
                      Number(sdps?.id) ===
                      Number(
                        GlobalState?.meeting?.find(
                          (meet) => Number(meet?.id) === Number(id)
                        )?.appraiser_id
                      )
                  )?.first_name
                )
              : Message.msAppraiser131(
                  GlobalState?.meeting?.find(
                    (meet) => Number(meet?.id) === Number(id)
                  )?.insurance_case_id,
                  typeCase?.find(
                    (tp) =>
                      Number(tp.event_type_id) ===
                        Number(
                          GlobalState?.cases?.find(
                            (cs) =>
                              Number(cs.id) ===
                              Number(
                                GlobalState?.meeting?.find(
                                  (meet) => Number(meet?.id) === Number(id)
                                )?.insurance_case_id
                              )
                          )?.event_type_id
                        ) &&
                      Number(tp.property_type_id) ===
                        Number(
                          GlobalState?.cases?.find(
                            (cs) =>
                              Number(cs.id) ===
                              Number(
                                GlobalState?.meeting?.find(
                                  (meet) => Number(meet?.id) === Number(id)
                                )?.insurance_case_id
                              )
                          )?.property_type_id
                        )
                  )?.name,
                  GlobalState?.sdp?.find(
                    (sdps) =>
                      Number(sdps?.id) ===
                      Number(
                        GlobalState?.meeting?.find(
                          (meet) => Number(meet?.id) === Number(id)
                        )?.sdp_id
                      )
                  )?.first_name,
                  GlobalState?.appraiser?.find(
                    (sdps) =>
                      Number(sdps?.id) ===
                      Number(
                        GlobalState?.meeting?.find(
                          (meet) => Number(meet?.id) === Number(id)
                        )?.appraiser_id
                      )
                  )?.first_name
                ),
            appraiser_id: GlobalState?.appraiser?.find(
              (sdps) =>
                Number(sdps?.id) ===
                Number(
                  GlobalState?.meeting?.find(
                    (meet) => Number(meet?.id) === Number(id)
                  )?.appraiser_id
                )
            )?.id,
            case_type: ["accident", "carburglary", "theftcar"]?.includes(
              typeCase?.find(
                (tp) =>
                  Number(tp.event_type_id) ===
                    Number(
                      GlobalState?.cases?.find(
                        (cs) =>
                          Number(cs.id) ===
                          Number(
                            GlobalState?.meeting?.find(
                              (meet) => Number(meet?.id) === Number(id)
                            )?.insurance_case_id
                          )
                      )?.event_type_id
                    ) &&
                  Number(tp.property_type_id) ===
                    Number(
                      GlobalState?.cases?.find(
                        (cs) =>
                          Number(cs.id) ===
                          Number(
                            GlobalState?.meeting?.find(
                              (meet) => Number(meet?.id) === Number(id)
                            )?.insurance_case_id
                          )
                      )?.property_type_id
                    )
              )?.link
            )
              ? "car"
              : "other",
            is_case_id: GlobalState?.meeting?.find(
              (meet) => Number(meet?.id) === Number(id)
            )?.insurance_case_id,
            id: Math.floor(Math.random() * 100000000),
            date_time: new Date(),
          })
        );
      };

      setIsLoading(true);
      patchRequest(`/meetings/${id}`, getFormData(values))
        .then((_response) => {
          messageSendEdited();
          if (!_response?.error) {
            toast.success("הצלחה");
            navigate(`/${localStorage.getItem("role")}`);
            setIsLoading(false);
            onClose();
            reset();
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <Modal>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={isLoading ? { display: "none" } : {}}
      >
        <ModalContent>
          <ModalHeader>
            <ModalHeaderIconWrapper>
              <CalendarAppreiser />
              <ModalHeaderTitle
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "10px",
                }}
              >
                <p>הגדר את השעה</p>
              </ModalHeaderTitle>
            </ModalHeaderIconWrapper>
            <button
              style={{
                backgroundColor: "#1d3557",
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              className="back-button"
              type="button"
              onClick={onClose}
            >
              חזור
            </button>
          </ModalHeader>
          <div className="modal_content_body">
            <p>בחירת תאריך</p>
            <input
              {...register("date", { required: true })}
              style={errors.date ? { borderColor: "red" } : {}}
              type="date"
            />
            <p>בחר שעה</p>
            <input
              {...register("time", { required: true })}
              style={errors.time ? { borderColor: "red" } : {}}
              type="time"
            />
          </div>
          <div className="modal_content_footer">
            <Button type={"submit"}>שמר</Button>
          </div>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default CalendarModal;
