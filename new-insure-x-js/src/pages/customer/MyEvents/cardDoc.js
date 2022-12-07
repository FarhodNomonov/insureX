import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Ui/Button/Button";
import { CaseTypeExtract, StatusName } from "../../../utils/requestApi";
import { GetTypecaseICon, UpArrowIcon } from "../../../components/icon";


function CardDoc({ _res, isOpened, isOPenDetails }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(
    isOpened === true ? true : Number(isOpened) === _res?.id
  );
  return (
    <div className="my_docs_body" id={_res?.id}>
      {isOpen && (
        <div className="my_docs_body_title">
          <h1>אירועים פתוחים</h1>
        </div>
      )}
      <div className="my_docs_body_content">
        {isOpened === true ? (
          ""
        ) : (
          <div
            className="my_docs_body_content_icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <UpArrowIcon
              style={isOpen ? {} : { transform: "rotate(180deg)" }}
            />
          </div>
        )}
        <div
          className="my_docs_body_content_text"
          onClick={() => {
            if (isOpened !== true) {
              navigate(`/events/${_res?.id}`);
            }
          }}
        >
          <p>{CaseTypeExtract(_res)?.name}</p>
          <p
            style={
              !isOPenDetails && isOpen
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {_res?.id}
          </p>
          <p style={isOPenDetails ? { display: "block" } : { display: "none" }}>
            טופס נשלח למרכז התביעות.
          </p>
          <p style={isOpen ? { display: "block" } : { display: "none" }}>
            {StatusName(_res ?? {})}
          </p>
        </div>
        <div
          className="my_docs_content_text_left"
          onClick={() => {
            if (isOpened !== true) {
              navigate(`/events/${_res?.id}`);
            }
          }}
        >
          <p>סוג אירוע:</p>
          <p
            style={
              !isOPenDetails && isOpen
                ? { display: "block" }
                : { display: "none" }
            }
          >
            מס' אירוע:
          </p>
          <p style={isOpen ? { display: "block" } : { display: "none" }}>
            סטאטוס:
          </p>
        </div>
        <div className="my_docs_content_icon_left">
          {GetTypecaseICon(CaseTypeExtract(_res)?.icon)}
        </div>
      </div>
      <div
        style={isOpen ? { display: "flex" } : { display: "none" }}
        className="my_docs_body_btn"
      >
        <Button
          onClick={() => {
            navigate(
              isOPenDetails
                ? `/event-docs/${_res?.id}`
                : `/events/${_res?.id}`
            );
          }}
        >
          {isOPenDetails ? "מסמכים" : "סטאטוס"}
        </Button>
      </div>
    </div>
  );
}

export default CardDoc;
