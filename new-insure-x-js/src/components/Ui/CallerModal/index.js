import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../pages/customer/RegisterPage/style";
import Button from "components/Ui/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  patchRequest,
  getFormData,
  typeCase,
  postRequest,
} from "utils/requestsApi";
import toast from "react-hot-toast";
import { Message } from "utils/messages";

function CallerModal({ msg, setCall, isOpen }) {
  const GlobalState = useSelector((state) => state);
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  const [caseType, setCaseType] = React.useState(
    typeCase?.find(
      (tp) =>
        Number(tp.event_type_id) ===
          Number(
            GlobalState?.cases?.find(
              (cs) => Number(cs.id) === Number(msg?.is_case_id)
            )?.event_type_id
          ) &&
        Number(tp.property_type_id) ===
          Number(
            GlobalState?.cases?.find(
              (cs) => Number(cs.id) === Number(msg?.is_case_id)
            )?.property_type_id
          )
    )
  );
  const [isCustomer, setIsCustomer] = React.useState(
    GlobalState?.customers?.find(
      (apr) =>
        Number(apr.id) ===
        Number(
          GlobalState?.cases.find(
            (cs) => Number(cs.id) === Number(msg?.is_case_id)
          )?.insured_person_id
        )
    )
  );
  const [isAgent, setIsAgent] = React.useState(
    GlobalState?.agents?.find(
      (apr) =>
        Number(apr.id) ===
        Number(
          GlobalState?.cases.find(
            (cs) => Number(cs.id) === Number(msg?.is_case_id)
          )?.agent_id
        )
    )
  );
  const [isAppraiser, setIsAppraiser] = React.useState(
    GlobalState?.appraiser.find(
      (apr) =>
        Number(apr.id) ===
        Number(
          GlobalState?.cases.find(
            (cs) => Number(cs.id) === Number(msg?.is_case_id)
          )?.appraiser_id
        )
    )
  );

  React.useEffect(() => {
    setCaseType(
      typeCase?.find(
        (tp) =>
          Number(tp.event_type_id) ===
            Number(
              GlobalState?.cases?.find(
                (cs) => Number(cs.id) === Number(msg?.is_case_id)
              )?.event_type_id
            ) &&
          Number(tp.property_type_id) ===
            Number(
              GlobalState?.cases?.find(
                (cs) => Number(cs.id) === Number(msg?.is_case_id)
              )?.property_type_id
            )
      )
    );
    setIsAppraiser(
      GlobalState?.appraiser.find(
        (apr) =>
          Number(apr.id) ===
          Number(
            GlobalState?.cases.find(
              (cs) => Number(cs.id) === Number(msg?.is_case_id)
            )?.appraiser_id
          )
      )
    );
    setIsCustomer(
      GlobalState?.customers?.find(
        (apr) =>
          Number(apr.id) ===
          Number(
            GlobalState?.cases.find(
              (cs) => Number(cs.id) === Number(msg?.is_case_id)
            )?.insured_person_id
          )
      )
    );
    setIsAgent(
      GlobalState?.agents?.find(
        (apr) =>
          Number(apr.id) ===
          Number(
            GlobalState?.cases.find(
              (cs) => Number(cs.id) === Number(msg?.is_case_id)
            )?.agent_id
          )
      )
    );
  }, [
    GlobalState?.cases,
    msg?.is_case_id,
    GlobalState?.appraiser,
    GlobalState?.customers,
  ]);

  const messageSend = () => {
    postRequest(
      "/insurance-case/messages/create",
      getFormData({
        type: "web-client",
        customer_id: isCustomer?.id,
        agent_id: isAgent?.id,
        ms_text: ["accident", "carburglary", "theftcar"]?.includes(
          caseType?.link
        )
          ? Message.msCustomer70(
              isAppraiser?.first_name,
              msg?.is_case_id,
              caseType?.name,
              isCustomer?.first_name
            )
          : Message.msCustomer71(
              isAppraiser?.first_name,
              msg?.is_case_id,
              caseType?.name,
              isCustomer?.first_name
            ),
        ms_agent_text: ["accident", "carburglary", "theftcar"]?.includes(
          caseType?.link
        )
          ? Message.msAgent70(
              isAppraiser?.first_name,
              msg?.is_case_id,
              caseType?.name,
              isCustomer?.first_name
            )
          : Message.msAgent70(
              isAppraiser?.first_name,
              msg?.is_case_id,
              caseType?.name,
              isCustomer?.first_name
            ),
        case_type: ["accident", "carburglary", "theftcar"]?.includes(
          caseType?.link
        )
          ? "car"
          : "other",
        is_case_id: msg?.is_case_id,
        id: Math.floor(Math.random() * 100000000),
        date_time: new Date(),
      })
    );
  };

  const ConfirmedCase = () => {
    messageSend();
    toast.promise(
      patchRequest(
        `/insurance-case/${msg?.is_case_id}`,
        getFormData({ status_id: 5 })
      )
        .then((res) => {
          navigate(`/${role}/meeting?${msg?.room}#${msg?.meet_id}#${msg?.is_case_id}`);
          setCall((prev) => !prev);
          messageSend();
        })
        .catch((err) => {
          console.log(err, "err");
        }),
      {
        loading: "תרכובת",
        success: "מחובר",
        error: "לא ניתן ליצור קשר",
      }
    );
  };

  return (
    <>
      {isOpen && msg?.call && (
        <Modal style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "15px",
              margin: "30px auto",
            }}
            className="modal_container"
          >
            <div className="modal_title">
              <h1 style={{ color: "#fff" }}>קבלת שיחה משמאי</h1>
            </div>
            <div style={{ gap: "15px", display: "flex" }} className="modal_btn">
              <Button
                style={{
                  backgroundColor: "green",
                  color: "#000",
                  borderRadius: "5px",
                }}
                onClick={ConfirmedCase}
              >
                קבל
              </Button>
              <Button
                onClick={() => setCall((prev) => !prev)}
                style={{ backgroundColor: "red", borderRadius: "5px" }}
              >
                דחה
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default CallerModal;
