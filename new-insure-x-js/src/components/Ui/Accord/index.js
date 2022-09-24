import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFormData,
  postRequest,
  patchRequest,
  getRequest,
} from "../../../utils/requestApi";
import * as ic from "../../../components/icon";
import { AccordStyled } from "./style";
import Loader from "../Loading/loader";
import { Message, messageCar, messageOther } from "../../../utils/messages";

function Accord({ linkGlobal = "/customer" }) {
  const personData = useSelector(({ user }) => user?.user);
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const AccordList = [
    {
      id: 1,
      title: "רכב",
      svg: <ic.Car />,
      child: [
        {
          id: 1,
          link: linkGlobal + "/accident",
          title: "תאונת דרכים",
          protoId: 1,
          eventId: 1,
          type: "car",
        },
        {
          id: 2,
          link: linkGlobal + "/carburglary",
          title: "פריצה",
          protoId: 1,
          eventId: 3,
          type: "car",
        },
        {
          id: 3,
          link: linkGlobal + "/theftcar",
          title: "גניבה",
          protoId: 1,
          eventId: 5,
          type: "other",
        },
      ],
    },
    {
      id: 2,
      title: "עסק",
      svg: <ic.Works />,
      child: [
        {
          id: 1,
          link: linkGlobal + "/water-damage-home",
          title: "מים",
          protoId: 2,
          eventId: 2,
          type: "other",
        },
        {
          id: 2,
          link: linkGlobal + "/fire-damage-home",
          title: "אש",
          protoId: 2,
          eventId: 4,
          type: "other",
        },
        {
          id: 3,
          link: linkGlobal + "/nature-damage-home",
          title: "נזקי טבע",
          protoId: 2,
          eventId: 9,
          type: "other",
        },
        {
          id: 4,
          link: linkGlobal + "/burglary-home",
          title: "פריצה / גניבה",
          protoId: 2,
          eventId: 6,
          type: "other",
        },
        {
          id: 5,
          link: linkGlobal + "/person-3d-home",
          title: "צד שלישי",
          protoId: 2,
          eventId: 7,
          type: "other",
        },
        {
          id: 6,
          link: linkGlobal + "/others-home",
          title: "אחר",
          protoId: 2,
          eventId: 8,
          type: "other",
        },
      ],
    },
    {
      id: 3,
      title: "דירה",
      svg: <ic.HomeBtn />,
      child: [
        {
          id: 1,
          link: linkGlobal + "/water-damage-office",
          title: "מים",
          protoId: 3,
          eventId: 2,
          type: "other",
        },
        {
          id: 2,
          link: linkGlobal + "/fire-damage-office",
          title: "אש",
          protoId: 3,
          eventId: 4,
          type: "other",
        },
        {
          id: 3,
          link: linkGlobal + "/nature-damage-office",
          title: "נזקי טבע",
          protoId: 3,
          eventId: 9,
          type: "other",
        },
        {
          id: 4,
          link: linkGlobal + "/burglary-office",
          title: "פריצה / גניבה",
          protoId: 3,
          eventId: 6,
          type: "other",
        },
        {
          id: 5,
          link: linkGlobal + "/person-3d-office",
          title: "צד שלישי",
          protoId: 3,
          eventId: 7,
          type: "other",
        },
        {
          id: 6,
          link: linkGlobal + "/others-office",
          title: "אחר",
          protoId: 3,
          eventId: 8,
          type: "other",
        },
      ],
    },
  ];

  let accident = JSON.parse(localStorage.getItem("accident"));
  let carBurglary = JSON.parse(localStorage.getItem("car_burglary"));
  let theftCar = JSON.parse(localStorage.getItem("theft_car"));
  let waterDamageHome = JSON.parse(localStorage.getItem("waterDamageHome"));
  let waterDamageOffice = JSON.parse(localStorage.getItem("waterDamageOffice"));
  let fireDamageHome = JSON.parse(localStorage.getItem("fireDamageHome"));
  let fireDamageOffice = JSON.parse(localStorage.getItem("fireDamageOffice"));
  let burglaryHome = JSON.parse(localStorage.getItem("burglaryHome"));
  let burglaryOffice = JSON.parse(localStorage.getItem("burglaryOffice"));
  let person3dHomePage = JSON.parse(localStorage.getItem("person-3d-home"));
  let person3dOfficePage = JSON.parse(localStorage.getItem("person-3d-office"));
  let natureDamageHome = JSON.parse(localStorage.getItem("natureDamageHome"));
  let natureDamageOffice = JSON.parse(
    localStorage.getItem("natureDamageOffice")
  );
  let otherHome = JSON.parse(localStorage.getItem("OtherHome"));
  let otherOffice = JSON.parse(localStorage.getItem("OtherOffice"));

  const [agent, setAgent] = React.useState({});
  const [appraiserCmp, setAppraiserCmp] = React.useState([]);
  React.useInsertionEffect(() => {
    if (!personData?.agent_id || !personData?.region_id) return;
    getRequest("/agents/select?id=" + personData?.agent_id).then(
      ({ message }) => {
        setAgent(message?.agents[0] ?? {});
      }
    );
    getRequest(
      "/appraisal-companies?delete=false&&region_id=" + personData?.region_id
    ).then(({ message }) => {
      setAppraiserCmp(message?.appraisal_companies ?? []);
    });
  }, [personData.agent_id, personData?.region_id]);

  const handleClick = ({ link, protoId, eventId, type }) => {
    // setIsLoading(true);
    if (!link || !personData?.id) return alert("Error Person id");
    let case_type = type;
    const data = {
      insured_person_id: personData?.id,
      property_type_id: protoId,
      event_type_id: eventId,
      document_date: new Date().toISOString(),
      status_id: 1,
    };

    const randomAppraiserComp = (data, iscar = false) => {
      let RandomComp = appraiserCmp?.filter(
        (acmp) => acmp.region_id === personData?.region_id
      )[
        Math.floor(
          Math.random() *
            appraiserCmp?.filter(
              (acmp) => acmp.region_id === personData?.region_id
            )?.length
        )
      ];
      if (!data?.insured_event?.id || !RandomComp) return null;

      patchRequest(
        `/insured-events/${data?.insured_event?.id}`,
        getFormData({
          appraisal_company_id: RandomComp?.id,
        })
      ).then(() => {
        postRequest(
          "/insurance-case/messages/create",
          getFormData({
            type: "web-client",
            customer_id: personData?.id,
            date_time: new Date(),
            ms_text: iscar
              ? Message.msCustomer40(
                  RandomComp?.appraisal_company_name,
                  personData?.first_name
                )
              : Message.msCustomer41(
                  RandomComp?.appraisal_company_name,
                  personData?.first_name
                ),
            ms_agent_text: iscar
              ? Message.msAgent40(
                  RandomComp?.appraisal_company_name,
                  agent?.first_name
                )
              : Message.msAgent41(
                  RandomComp?.appraisal_company_name,
                  agent?.first_name
                ),
            agent_id: personData?.agent_id,
            is_case_id: data?.id,
            id: Math.floor(Math.random() * 100),
            admin_type: true,
            is_create_case: true,
            user_type: "event_create",
            user_name: "new event_created",
            insurance_company_id: data?.insured_event?.insurance_company_id,
            appraisal_company_id: data?.insured_event?.appraisal_company_id,
          })
        );
      });
    };

    if (protoId === 1 && eventId === 1) {
      if (!accident?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            localStorage.setItem(
              "accident",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            messageCar(message?.insurance_case?.id, case_type);
            randomAppraiserComp(message?.insurance_case, true);
            setIsLoading(false);
            navigate(link);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 1 && eventId === 3) {
      if (!carBurglary?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageCar(message?.insurance_case?.id, case_type);
            randomAppraiserComp(message?.insurance_case, true);
            localStorage.setItem(
              "car_burglary",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 1 && eventId === 5) {
      if (!theftCar?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id, case_type);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "theft_car",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 2 && eventId === 2) {
      if (!waterDamageHome?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "waterDamageHome",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 3 && eventId === 2) {
      if (!waterDamageOffice?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "waterDamageOffice",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 2 && eventId === 4) {
      if (!fireDamageHome?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "fireDamageHome",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 3 && eventId === 4) {
      if (!fireDamageOffice?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "fireDamageOffice",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 2 && eventId === 6) {
      if (!burglaryHome?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "burglaryHome",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 3 && eventId === 6) {
      if (!burglaryOffice?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "burglaryOffice",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 2 && eventId === 7) {
      if (!person3dHomePage?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "person-3d-home",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 3 && eventId === 7) {
      if (!person3dOfficePage?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "person-3d-office",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 2 && eventId === 9) {
      if (!natureDamageHome?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "natureDamageHome",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 3 && eventId === 9) {
      if (!natureDamageOffice?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "natureDamageOffice",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            setIsLoading(false);
            navigate(link);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 2 && eventId === 8) {
      if (!otherHome?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "OtherHome",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
    if (protoId === 3 && eventId === 8) {
      if (!otherOffice?.report?.insurance_case?.id) {
        postRequest("/insurance-case", getFormData(data)).then(
          ({ message }) => {
            messageOther(message?.insurance_case?.id);
            randomAppraiserComp(message?.insurance_case);
            localStorage.setItem(
              "OtherOffice",
              JSON.stringify({
                report: {
                  insurance_case: {
                    id: message?.insurance_case?.id,
                  },
                },
              })
            );
            navigate(link);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        navigate(link);
      }
    }
  };

  return (
    <AccordStyled>
      {isLoading && <Loader />}
      {AccordList.map((__res, i) => {
        return (
          <div
            className={`accord ${isActive === __res?.id ? "active" : ""}`}
            key={i}
          >
            <div
              className="accord__opener"
              onClick={() => {
                setIsActive(isActive === __res?.id ? null : __res?.id);
              }}
            >
              <div className="accord__opener__title">
                <h3>{__res?.title}</h3>
                <div className="accord__opener__title__icon">{__res?.svg}</div>
              </div>
            </div>
            {__res?.child.map((_item) => {
              return (
                <div
                  className="accord__list"
                  key={_item?.title}
                  onClick={() => handleClick(_item)}
                >
                  <ic.AccordArrowIcon />
                  <div className="accord_body_item">
                    <div className="accord_body_item__title">
                      <h3>{_item?.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </AccordStyled>
  );
}

export default Accord;
