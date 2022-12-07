import React, { useRef, useInsertionEffect, useEffect } from "react";
import { Modal } from "../../../pages/customer/RegisterPage/style";
import { getFormData, getRequest, PostPDF } from "../../../utils/requestApi";

function PdfModal({ data, open, event_type, sign_picture = null }) {
  const [agents, setAgents] = React.useState([]);
  let PersonData = JSON.parse(localStorage.getItem("insured_person") || "{}");
  const pdfExportComponent = useRef(null);
  const Rerender = useRef(false);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  useInsertionEffect(() => {
    Rerender.current = true;
    if (open && pdfExportComponent) {
      getRequest(`/insurance-case/${data?.insurance_case?.id}`).then((res) => {
        if (document.querySelector(".body-pdf") === null) {
          return;
        }
        PostPDF(
          getFormData({
            content: pdfExportComponent.current.outerHTML,
            folderId:
              res?.message?.insurance_case?.insured_event
                ?.folder_google_drive_id,
            insuredEventId: res?.message?.insurance_case?.insured_event_id,
            folderType: "docs",
            fileName: `${data?.insurance_case?.id}.${new Date().toLocaleString(
              "lt",
              options
            )}`,
          })
        ).then((res) => console.log(res));
      });
    }
  }, [open]);

  useEffect(() => {
    if (data?.insurance_case?.agent_id) {
      getRequest(`/agents/select?id=${data?.insurance_case?.agent_id}`).then(
        (res) => {
          setAgents(
            `${res?.message?.agents[0]?.first_name} ${res?.message?.agents[0]?.second_name}`
          );
        }
      );
    }
  }, [data?.insurance_case?.agent_id]);

  return (
    <>
      {open && (
        <Modal style={{ opacity: "0", pointerEvents: "none" }}>
          <div ref={pdfExportComponent} className="body-pdf">
            <div id="inner-width">
              <style>{` 
                * {
                   line-height: 1.1;
                   font-size: 16px;
                   padding: 0;
                   margin: 0;
                   font-family: "Assistant", sans-serif;
                   font-weight: 500;
                 }
                  .body-pdf {
                    width: 6.2in;
                    min-height: 4.5in;
                    overflow: hidden;
                    margin: 0 auto;
                  }
                  #inner-width {
                    transition: 150ms ease-in-out;
                    margin: 0 auto;
                    padding: 20px;
                    border: none;
                    background: #fff;
                    direction: rtl;
                  }
           
                  .modal_logo img {
                    width: 70px;
                    min-height: 70px;
                  }
                  .modal_header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row-reverse;
                    gap: 10px;
                  }
                  .modal_title {
                    background: #092a8d;
                    width: 100%;
                    padding: 10px;
                    display: flex;
                    border-radius: 4px;
                  }
                  .modal_title h1 {
                    color: #fff;
                    min-width: 120px;
                  }
                  .print_date {
                    display: flex;
                    gap: 10px;
                    color: #000;
                    margin-bottom: 10px;
                  }
                  .print_date h2 {
                    min-width: 120px;
                  }
                  .personal_information .person_title h2 {
                    color: #fff;
                  }
                  .personal_information .person_title {
                    background: #092a8d;
                    border-radius: 4px;
                    padding: 10px;
                    margin-bottom: 10px;
                  }
                  .person_information_title h1 {
                    color: #000;
                    width: 120px;
                  }
                  .person_information_title h2 {
                    color: #000;
                    line-height: 1.1;
                    min-width: 120px;
                  }
                  .person_information_title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 5px;
                  }
                  .personal_information {
                    width: 100%;
                    margin-bottom: 10px;
                  }

                  .row_icon svg {
                    transition: 0.3s;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .row_title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #000;
                  }
                  .row {
                    width: 200px;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 10px;
                  }
                  .img-sign-picture{ 
                    width: 150px;
                    height: 70px;
                    object-fit: contain;
                  }
                `}</style>
              <div className="modal_header">
                <div className="modal_title">
                  <h1>אירוע מידע</h1>
                </div>
              </div>
              <div className="print_date">
                <h2>תאריך הדפסה:</h2>
                <h2>{new Date().toLocaleString()}</h2>
              </div>
              {PersonData && (
                <div className="personal_information">
                  <div className="person_title">
                    <h2>מידע אישי:</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>שָׁם:</h1>
                    <h2>{`${PersonData?.first_name} ${PersonData?.second_name}`}</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>דוא״ל:</h1>
                    <h2>{PersonData?.email}</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>טלפון:</h1>
                    <h2>{PersonData?.phone}</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>מען:</h1>
                    <h2>{PersonData?.address}</h2>
                  </div>
                </div>
              )}
              {data?.insurance_case?.id && (
                <div className="personal_information">
                  <div className="person_title">
                    <h2>מידע על האירוע:</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>מספר אירוע:</h1>
                    <h2>{data?.insurance_case?.id}</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>מען:</h1>
                    <h2>{data?.insurance_case?.address}</h2>
                  </div>
                  {data?.insurance_case?.document_date && (
                    <div className="person_information_title">
                      <h1>תאריך מסמך:</h1>
                      <h2>
                        {new Date(
                          data?.insurance_case?.document_date
                        ).toLocaleDateString()}
                      </h2>
                    </div>
                  )}
                  {data?.insurance_case?.city && (
                    <div className="person_information_title">
                      <h1>מען:</h1>
                      <h2>{data?.insurance_case?.city}</h2>
                    </div>
                  )}
                  {data?.insurance_case?.date && (
                    <div className="person_information_title">
                      <h1>תמר:</h1>
                      <h2>{data?.insurance_case?.date}</h2>
                    </div>
                  )}
                  {data?.insurance_case?.details && (
                    <div className="person_information_title">
                      <h1>פרטים:</h1>
                      <h2>{data?.insurance_case?.details}</h2>
                    </div>
                  )}
                  {data?.insurance_case?.incident_date && (
                    <div className="person_information_title">
                      <h1>תאריך האירוע:</h1>
                      <h2>{data?.insurance_case?.incident_date}</h2>
                    </div>
                  )}
                  {data?.insurance_case?.policy && (
                    <div className="person_information_title">
                      <h1>מדיניות:</h1>
                      <h2>{data?.insurance_case?.policy}</h2>
                    </div>
                  )}
                  <div className="person_information_title">
                    <h1>סוכן:</h1>
                    <h2>{agents}</h2>
                  </div>
                </div>
              )}
              {data?.estate?.additional_insurance_info && (
                <div className="personal_information">
                  <div className="person_title">
                    <h2>נדל ן:</h2>
                  </div>
                  {data?.estate?.additional_insurance_info && (
                    <div className="person_information_title">
                      <h1>מידע נוסף על הביטוח:</h1>
                      <h2>{data?.estate?.additional_insurance_info}</h2>
                    </div>
                  )}
                  {data?.estate?.has_additional_insurance && (
                    <div className="person_information_title">
                      <h1>יש לו ביטוח נוסף</h1>
                      <h2>{data?.estate?.has_additional_insurance && "כן"}</h2>
                    </div>
                  )}
                  {data?.estate?.has_tenant && (
                    <div className="person_information_title">
                      <h1>יש דייר</h1>
                      <h2>{data?.estate?.has_tenant && "כן"}</h2>
                    </div>
                  )}
                  {data?.estate?.single_owner && (
                    <div className="person_information_title">
                      <h1>בעלים יחיד </h1>
                      <h2>{data?.estate?.single_owner && "כן"}</h2>
                    </div>
                  )}
                  {data?.estate?.were_damaged && (
                    <div className="person_information_title">
                      <h1>ניזוקו</h1>
                      <h2>{data?.estate?.were_damaged && "כן"}</h2>
                    </div>
                  )}
                  {data?.estate?.damage_amount && (
                    <div className="person_information_title">
                      <h1>סכום הנזק:</h1>
                      <h2>{data?.estate?.damage_amount}</h2>
                    </div>
                  )}
                  {data?.insurance_case?.document_date && (
                    <div className="person_information_title">
                      <h1>תאריך מסמך:</h1>
                      <h2>
                        {new Date(
                          data?.insurance_case?.document_date
                        ).toLocaleDateString()}
                      </h2>
                    </div>
                  )}
                  {data?.insurance_case?.city && (
                    <div className="person_information_title">
                      <h1>מען:</h1>
                      <h2>{data?.insurance_case?.city}</h2>
                    </div>
                  )}
                  <div className="person_information_title">
                    <h1>סוכן:</h1>
                    <h2>{agents}</h2>
                  </div>
                  <div className="person_information_title">
                    <h1>סוג אירוע:</h1>
                    <h2>{event_type}</h2>
                  </div>
                </div>
              )}
              {data?.car?.automobile_type_id && (
                <div className="personal_information">
                  <div className="person_title">
                    <h2>מכונית:</h2>
                  </div>
                  {data?.car?.automobile_type_id && (
                    <div className="person_information_title">
                      <h1>מזהה סוג רכב:</h1>
                      <h2>{data?.car?.automobile_type_id}</h2>
                    </div>
                  )}
                  {data?.car?.model && (
                    <div className="person_information_title">
                      <h1>מודל:</h1>
                      <h2>{data?.car?.model}</h2>
                    </div>
                  )}
                  {data?.car?.number && (
                    <div className="person_information_title">
                      <h1>מספר:</h1>
                      <h2>{data?.car?.number}</h2>
                    </div>
                  )}
                  {data?.car?.year && (
                    <div className="person_information_title">
                      <h1>שנה:</h1>
                      <h2>{data?.car?.year}</h2>
                    </div>
                  )}
                </div>
              )}
              {data?.driver?.driver_id && (
                <div className="personal_information">
                  <div className="person_title">
                    <h2>נהג:</h2>
                  </div>
                  {data?.driver?.birthday && (
                    <div className="person_information_title">
                      <h1>מזהה סוג רכב:</h1>
                      <h2>{data?.driver?.birthday}</h2>
                    </div>
                  )}
                  {data?.driver?.driver_id && (
                    <div className="person_information_title">
                      <h1>מזהה סוג רכב:</h1>
                      <h2>{data?.driver?.driver_id}</h2>
                    </div>
                  )}
                  {data?.driver?.license_number && (
                    <div className="person_information_title">
                      <h1>מספר רישיון:</h1>
                      <h2>{data?.driver?.license_number}</h2>
                    </div>
                  )}
                  {data?.driver?.names && (
                    <div className="person_information_title">
                      <h1>שָׁם:</h1>
                      <h2>{data?.driver?.names}</h2>
                    </div>
                  )}
                </div>
              )}
              {data?.incident_participants?.tow_truck ||
                data?.incident_participants?.fire_fighters ||
                (data?.incident_participants?.police && (
                  <div className="personal_information">
                    <div className="person_title">
                      <h2>משתתפי האירוע:</h2>
                    </div>
                    {data?.incident_participants?.tow_truck && (
                      <div className="person_information_title">
                        <h2>
                          {data?.incident_participants?.tow_truck &&
                            "משאית גרירה "}
                        </h2>
                      </div>
                    )}
                    {data?.incident_participants?.fire_fighters && (
                      <div className="person_information_title">
                        <h2>
                          {data?.incident_participants?.fire_fighters &&
                            "לוחמי אש"}
                        </h2>
                      </div>
                    )}
                    {data?.incident_participants?.police && (
                      <div className="person_information_title">
                        <h2>
                          {data?.incident_participants?.police && "משטרה"}
                        </h2>
                      </div>
                    )}
                  </div>
                ))}
              {data?.other?.car_model && (
                <div className="personal_information">
                  <div className="person_title">
                    <h2>חברים אחרים:</h2>
                  </div>
                  {data?.other?.car_model && (
                    <div className="person_information_title">
                      <h2>{data?.other?.car_model && "דגם רכב "}</h2>
                    </div>
                  )}
                  {data?.other?.is_sue && (
                    <div className="person_information_title">
                      <h2>{data?.other?.is_sue && "הוא לתבוע"}</h2>
                    </div>
                  )}
                  {data?.other?.license_number && (
                    <div className="person_information_title">
                      <h2>{data?.other?.license_number && "משטרה"}</h2>
                    </div>
                  )}
                  {data?.other?.names && (
                    <div className="person_information_title">
                      <h2>{data?.other?.names}</h2>
                    </div>
                  )}
                  {data?.other?.phone && (
                    <div className="person_information_title">
                      <h2>{data?.other?.phone}</h2>
                    </div>
                  )}
                  {data?.other?.passport_number && (
                    <div className="person_information_title">
                      <h2>{data?.other?.passport_number}</h2>
                    </div>
                  )}
                </div>
              )}
              {sign_picture && (
                <img
                  className="img-sign-picture"
                  src={sign_picture}
                  alt="sign_picture"
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default PdfModal;
