import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Header from "../../../components/Ui/Header";
import Footer from "../../../components/Ui/FooterComponent";
import { PaginationNextIcon } from "../../../components/icon";
import Button from "../../../components/Ui/Button/Button";
import DrawerBg from "../../../assets/img/auto_bg.svg";
import { AccidentForm } from "./style";
import {
  CityCache,
  getFormData,
  getRequest,
  patchRequest,
  postFile,
  postRequest,
} from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import {
  FifthStep,
  FirstStep,
  FourthStep,
  SecondStep,
  SixthStep,
  ThirdStep,
  SuccessStep,
  FormBeforeSubmit,
} from "../../../components/steps/Accident.steps";
import PdfModal from "../../../components/Ui/Pdf";
import { messageCar } from "../../../utils/messages";
import { allCities } from "../../../utils/static";

let report = {
  report: {
    insurance_case: {},
    car: {},
    driver: {},
    incident_participants: {},
    witnesData: {},
    victim: {},
    other: {},
  },
};

function Accident() {
  const { hash } = useLocation();
  const personData = useSelector(({ user }) => user?.user);
  let reportStorage = JSON.parse(localStorage.getItem("accident") ?? "{}");
  const [currentPage, setCurrentPage] = React.useState(
    Number(localStorage.getItem("accidentPage") ?? 1) ?? 1
  );
  const [drawerImage, setDrawerImage] = React.useState(
    reportStorage?.report?.car?.damage_picture ?? DrawerBg
  );
  const [drawing, setDrawing] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [stepIsSaved, setStepIsSaved] = React.useState(false);
  const [propertyTypeData, setPropertyTypeData] = React.useState([]);
  const [cityId, setCityId] = React.useState("");
  const [openPdf, setOpenPdf] = React.useState(false);
  const [isReset, setIsReset] = React.useState(true);
  const [insCompData, setInsCompData] = React.useState([]);
  const Person = JSON.parse(localStorage.getItem("insured_person"));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  if (hash.split("#")[1]) {
    report.report = {
      ...reportStorage?.report,
      insurance_case: {
        ...reportStorage?.report.insurance_case,
        id: Number(hash.split("#")[1]),
      },
    };
    localStorage.setItem("accident", JSON.stringify(report));
    if (
      reportStorage?.report?.insurance_case?.id !== Number(hash.split("#")[1])
    ) {
      localStorage.setItem("accidentPage", 1);
    }
  }

  React.useInsertionEffect(() => {
    const fetchData = async () => {
      const response = await getRequest(`/automobile-types`);
      if (!response.error) {
        const customData = response.message?.automobile_types.map((item) => {
          return {
            value: item.id,
            label: item.automobile_type,
          };
        });
        setValue(
          "automobile_type_id",
          customData?.find(
            (data) =>
              data.value === reportStorage?.report?.car?.automobile_type_id
          )
        );
        setPropertyTypeData(customData);
      }
    };
    const fetchDataComp = async () => {
      const response = await getRequest(`/insurance-companies`);
      if (!response.error) {
        const customData = response?.message?.insurance_companies
          ?.filter((cp) =>
            personData?.insurance_company_persons_id?.includes(cp.id)
          )
          ?.map((item) => {
            return {
              value: item.id,
              label: item.title,
            };
          });
        setInsCompData(customData);
      }
    };
    fetchDataComp();
    fetchData();
  }, [personData?.insurance_company_persons_id]);

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      setValue("phone", personData?.phone);
    } else setValue("phone", "");
  }, [currentPage, personData?.phone]);

  React.useEffect(() => {
    if (personData?.city_id) {
      const response = allCities?.find(
        (item) => item.id === Number(personData?.city_id)
      );
      setCityId(response);
    }
  }, [personData?.city_id]);

  React.useInsertionEffect(() => {
    localStorage.setItem("accidentPage", currentPage);
    reset();
  }, [currentPage]);

  React.useInsertionEffect(() => {
    if (reportStorage?.report?.insurance_case?.id) {
      report.report.insurance_case = {
        ...reportStorage?.report?.insurance_case,
      };
      report.report.car = {
        ...reportStorage?.report?.car,
      };
      report.report.driver = {
        ...reportStorage?.report?.driver,
      };
      report.report.incident_participants = {
        ...reportStorage?.report?.incident_participants,
      };
      report.report.incident_type = reportStorage?.report?.incident_type;
      report.report.witnesData = {
        ...reportStorage?.report?.witnesData,
      };
      report.report.victim = {
        ...reportStorage?.report?.victim,
      };
      report.report.other = {
        ...reportStorage?.report?.other,
      };
      localStorage.setItem("accident", JSON.stringify(report));
    }
  }, [reportStorage?.report?.insurance_case?.id, currentPage]);

  const firstStepSubmit = (data) => {
    if (currentPage === 1) {
      report.report = {
        ...reportStorage?.report,
        car: {
          number: data.number,
          model: data.model,
          year: data.year,
          automobile_type_id: Number(data?.automobile_type_id?.value),
        },
      };
      report.report.insurance_case = {
        ...report.report.insurance_case,
        insured_person_id: personData.id,
        policy: data?.policy,
        agent_id: data.agent_id.value ?? Person?.agent_id ?? null,
        city_id: personData?.city_id ?? cityId?.id,
        city: cityId.city_name,
        status_id: 1,
        id: reportStorage?.report?.insurance_case?.id,
      };
      console.clear();
      console.log(report);
      localStorage.setItem("accident", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
  };
  const secondStepSubmit = (data) => {
    if (currentPage === 2) {
      report.report.driver = {
        names: data.names,
        driver_id: data.driver_id,
        phone: data.phone,
        birthday: data.birthday,
        license_number: data.license_number,
        has_permission: data.has_permission,
      };
      console.clear();
      console.log(report);
      localStorage.setItem("accident", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
  };
  const thirdStepSubmit = (data) => {
    if (currentPage === 3) {
      report.report.incident_participants = {
        insurance_case_ids:
          reportStorage?.report?.insurance_case?.id ??
          JSON.parse(localStorage.getItem("accident"))?.report?.insurance_case
            ?.id,
        police: data?.police === "true",
        fire_fighters: data?.fire_fighters === "true",
        tow_truck: data?.tow_truck === "true",
      };
      report.report.insurance_case = {
        ...report.report.insurance_case,
        details: data?.details,
        status_id: 2,
        date: `${data.date}:${data.time}`,
        time: data.time,
        incident_date: data.date,

        address: data.address,
      };
      report.report.witnesData = data.witnesData;
      report.report.car = {
        ...report.report.car,
        damage_picture: drawerImage,
      };
      report.report.incident_type = data.incident_type;
      console.clear();
      console.log(report);
      localStorage.setItem("accident", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
  };
  const fourthStepSubmit = (data) => {
    if (currentPage === 4) {
      report.report.victim = data?.injuryData;
      console.clear();
      console.log(report);
      localStorage.setItem("accident", JSON.stringify(report));
      setCurrentPage(currentPage + 1);
      reset();
    }
  };
  const fifthStepSubmit = (data) => {
    if (currentPage === 5) {
      report.report.other = data;
      console.clear();
      console.log(report);
      localStorage.setItem("accident", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
  };
  const sixthStepSubmit = (data) => {
    if (currentPage === 6) {
      setOpenPdf(true);
      report.report.insurance_case = {
        ...report.report.insurance_case,
        signature: data.whose_signature,
        status_id: 3,
        insured_person: {
          ...report.report.insurance_case.insured_person,
          sign_picture: drawing,
        },
        document_date: data.document_date,
      };
      console.clear();
      console.log(report);
      localStorage.setItem("accident", JSON.stringify(report));
      const Requests = () => {
        setIsLoading(true);

        if (report.report.victim) {
          for (let key of [report.report.victim]) {
            if (key[0]?.city_ids?.value) {
              key[0].city_ids = key[0]?.city_ids?.value;

              postFile(
                `/insurance-case/${
                  reportStorage?.report?.insurance_case?.id ??
                  JSON.parse(localStorage.getItem("accident"))?.report
                    ?.insurance_case?.id
                }/victim`,
                getFormData(key[0])
              )
                .then((res) => {
                  if (!res.error) {
                    setIsLoading(false);
                    setCurrentPage(currentPage + 1);
                    reset();
                  }
                })
                .catch((err) => {
                  setIsLoading(false);
                  console.log(err);
                });
            }
          }
        }
        if (report.report.other) {
          if (report?.report?.other?.is_sue) {
            postRequest(
              `/insurance-case/${
                reportStorage?.report?.insurance_case?.id ??
                JSON.parse(localStorage.getItem("accident"))?.report
                  ?.insurance_case?.id
              }/other`,
              getFormData(report.report.other)
            );
          }
        }

        if (report.report.driver) {
          postRequest(
            `/insurance-case/${
              reportStorage?.report?.insurance_case?.id ??
              JSON.parse(localStorage.getItem("accident"))?.report
                ?.insurance_case?.id
            }/driver`,
            getFormData(report.report.driver)
          );
        }
        if (report.report.witnesData) {
          for (let key of [report.report.witnesData]) {
            postFile(
              `/insurance-case/${
                reportStorage?.report?.insurance_case?.id ??
                JSON.parse(localStorage.getItem("accident"))?.report
                  ?.insurance_case?.id
              }/witness`,
              getFormData(key[0])
            )
              .then((res) => {
                if (!res.error) {
                  setIsLoading(false);
                  setCurrentPage(currentPage + 1);
                  reset();
                }
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
              });
          }
        }
        if (report.report.incident_type) {
          patchRequest(
            `/insurance-case/${
              reportStorage?.report?.insurance_case?.id ??
              JSON.parse(localStorage.getItem("accident"))?.report
                ?.insurance_case?.id
            }/place/${report.report.incident_type}`
          );
        }
        if (report.report.incident_participants) {
          postRequest(
            `/incident-participant`,
            getFormData(report.report.incident_participants)
          );
        }
        if (drawing) {
          patchRequest(
            `/insured-persons/${personData?.id}`,
            getFormData({ sign_picture: drawing })
          ).then((res) => {
            if (!res.error) {
              setIsLoading(false);
            }
          });
        }

        if (report.report.insurance_case) {
          const PatchData = report.report.insurance_case;
          delete PatchData?.id;
          PatchData.role = "customer";
          patchRequest(
            `/insurance-case/${
              reportStorage?.report?.insurance_case?.id ??
              JSON.parse(localStorage.getItem("accident"))?.report
                ?.insurance_case?.id
            }`,
            getFormData(PatchData)
          ).then(({ error }) => {
            if (!error) {
              console.clear();
              if (report.report.car) {
                postRequest(
                  `/insurance-case/${
                    reportStorage?.report?.insurance_case?.id ??
                    JSON.parse(localStorage.getItem("accident"))?.report
                      ?.insurance_case?.id
                  }/car`,
                  getFormData(report.report.car)
                );
              }
            }
          });
        }
      };
      Requests();
    }
  };

  const onSubmit = (data) => {
    setIsReset(false);
    if (!reportStorage?.report?.insurance_case?.id) {
      if (currentPage === 1) {
        const dataForm = {
          insured_person_id: personData?.id,
          property_type_id: 1,
          event_type_id: 1,
          document_date: new Date().toISOString(),
          status_id: 1,
        };
        postRequest("/insurance-case", getFormData(dataForm)).then(
          ({ message }) => {
            report.report = {
              ...report.report,
              car: {
                ...reportStorage?.report?.car,
                number: data.number,
                model: data.model,
                year: data.year,
                automobile_type_id: Number(data?.automobile_type_id?.value),
              },
            };
            report.report.insurance_case = {
              ...report.report.insurance_case,
              id: message?.insurance_case?.id,
              insured_person_id: personData.id,
              policy: data?.policy,
              agent_id: data.agent_id.value ?? Person?.agent_id ?? null,
              city_id: personData?.city_id ?? cityId?.id,
              city: cityId.city_name,
              status_id: 1,
            };
            console.clear();
            console.log(report);
            localStorage.setItem("accident", JSON.stringify(report));
            messageCar(message?.insurance_case?.id, "car");
          }
        );
      }
    }
    firstStepSubmit(data);
    secondStepSubmit(data);
    thirdStepSubmit(data);
    fourthStepSubmit(data);
    fifthStepSubmit(data);
    sixthStepSubmit(data);
    const root = document.getElementById("root");
    root.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  if (currentPage === 10) {
    localStorage.removeItem("accident");
    localStorage.removeItem("accidentPage");
  }

  const ObjectKeyFCWitnessData = () => {
    return Object.keys(report.report.witnesData)
      ?.map((item) => reportStorage?.report?.witnesData[item])
      .map((_, index) => {
        return () => {
          setValue(`witnesData[${index}].names`, _.names);
          setValue(`witnesData[${index}].phone`, _.phone);
        };
      });
  };

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      setValue("number", reportStorage?.report?.car?.number);
      setValue("model", reportStorage?.report?.car?.model);
      setValue("year", reportStorage?.report?.car?.year);
      setValue("policy", reportStorage?.report?.insurance_case?.policy);
    }
    if (currentPage === 2) {
      setValue("names", reportStorage?.report?.driver?.names);
      setValue("driver_id", reportStorage?.report?.driver?.driver_id);
      setValue("has_permission", reportStorage?.report?.driver?.has_permission);
      setValue("license_number", reportStorage?.report?.driver?.license_number);
      setValue("birthday", reportStorage?.report?.driver?.birthday);
      setValue("phone", reportStorage?.report?.driver?.phone);
      ObjectKeyFCWitnessData();
    }
    if (currentPage === 3) {
      setValue("incident_type", reportStorage?.report?.incident_type);

      setValue("details", reportStorage?.report?.insurance_case?.details);
      setValue(
        "tow_truck",
        reportStorage?.report?.incident_participants?.tow_truck
      );
      setValue("police", reportStorage?.report?.incident_participants?.police);
      setValue(
        "fire_fighters",
        reportStorage?.report?.incident_participants?.fire_fighters
      );
      setValue(
        "insurance_case_ids",
        reportStorage?.report?.incident_participants?.insurance_case_ids
      );
      setValue("address", reportStorage?.report?.insurance_case?.address);
      setValue("time", reportStorage?.report?.insurance_case?.time);
      setValue("date", reportStorage?.report?.insurance_case?.incident_date);
    }
    if (currentPage === 4) {
      Object.keys(report.report.victim)
        ?.map((item) => reportStorage?.report?.victim[item])
        .map((_, index) => {
          return () => {
            setValue(`injuryData[${index}].first_name`, _.first_name);
            setValue(`injuryData[${index}].last_name`, _.last_name);
            setValue(`injuryData[${index}].passport_id`, _.passport_id);
            setValue(`injuryData[${index}].phone`, _.phone);
            setValue(`injuryData[${index}].address`, _.address);
          };
        });
    }
    if (currentPage === 5) {
      setValue("car_model", reportStorage?.report?.other?.car_model);
      setValue("is_sue", reportStorage?.report?.other?.is_sue);
      setValue("license_number", reportStorage?.report?.other?.license_number);
      setValue("names", reportStorage?.report?.other?.names);
      setValue(
        "passport_number",
        reportStorage?.report?.other?.passport_number
      );
      setValue("phone", reportStorage?.report?.other?.phone);
    }
  }, [currentPage]);

  return (
    <AccidentForm className="flex__column__ h-100">
      {isLoading && <Loader />}
      <div>
        {currentPage !== 9 && (
          <Header
            text={`שלום ${Person?.first_name}`}
            title={
              currentPage === 7 || currentPage === 8
                ? "רשימת מוסכים"
                : "פתיחת אירוע רכב - תאונת דרכים"
            }
          />
        )}
        {currentPage < 7 && (
          <div className="step_form_container">
            <div className="step_form_paginations">
              <div
                className={`step_form_pagination ${
                  currentPage > 0 && "active"
                }`}
                onClick={() => setCurrentPage(1)}
              />
              <div className="pagination__icon__">
                <PaginationNextIcon />
              </div>
              <div
                className={`step_form_pagination ${
                  currentPage > 1 && "active"
                }`}
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? 2 : currentPage)
                }
              />
              <div className="pagination__icon__">
                <PaginationNextIcon />
              </div>
              <div
                className={`step_form_pagination ${
                  currentPage > 2 && "active"
                }`}
                onClick={() =>
                  setCurrentPage(currentPage > 2 ? 3 : currentPage)
                }
              />
              <div className="pagination__icon__">
                <div className="circle__"></div>
                <PaginationNextIcon />
              </div>
              <div
                className={`step_form_pagination ${
                  currentPage > 3 && "active"
                }`}
                onClick={() =>
                  setCurrentPage(currentPage > 3 ? 4 : currentPage)
                }
              />
              <div className="pagination__icon__">
                <PaginationNextIcon />
              </div>
              <div
                className={`step_form_pagination ${
                  currentPage > 4 && "active"
                }`}
                onClick={() =>
                  setCurrentPage(currentPage > 4 ? 5 : currentPage)
                }
              />
              <div className="pagination__icon__">
                <PaginationNextIcon />
              </div>
              <div
                className={`step_form_pagination ${
                  currentPage > 5 && "active"
                }`}
              />
            </div>
            <div className="step_form_content">
              <div className="step_form_content__header">
                <div className="step_form_content__header__title">
                  {currentPage === 1
                    ? "פרטי המבוטח והפוליסה"
                    : currentPage === 2
                    ? "פרטי הנהג"
                    : currentPage === 3
                    ? "פרטי התאונה"
                    : currentPage === 4
                    ? "נפגעי גוף"
                    : currentPage === 5
                    ? "פרטי המעורב - צד ג'"
                    : currentPage === 6
                    ? "הצהרת המבוטח"
                    : ""}
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="step_form_content__body"
              >
                <FirstStep
                  propertyTypeData={propertyTypeData}
                  errors={errors}
                  register={register}
                  control={control}
                  personData={personData}
                  cityId={cityId}
                  currentPage={currentPage}
                  reportStorage={reportStorage}
                  insCompData={insCompData}
                  watch={watch}
                />
                <SecondStep
                  currentPage={currentPage}
                  errors={errors}
                  register={register}
                />
                <ThirdStep
                  currentPage={currentPage}
                  errors={errors}
                  register={register}
                  personData={personData}
                  setIsLoading={setIsLoading}
                  drawerImage={drawerImage}
                  setDrawerImage={setDrawerImage}
                />
                <FourthStep
                  currentPage={currentPage}
                  errors={errors}
                  register={register}
                  cityData={CityCache()}
                  control={control}
                />
                <FifthStep register={register} currentPage={currentPage} />

                <SixthStep
                  register={register}
                  currentPage={currentPage}
                  setDrawing={setDrawing}
                />
                <SuccessStep
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  isSaved={stepIsSaved}
                  isBack={setStepIsSaved}
                  IsActiveId={
                    reportStorage?.report?.insurance_case?.id ||
                    report?.report?.insurance_case?.id
                  }
                />

                <div className="step_form_content__footer">
                  <div className="step_form_content__footer__button">
                    <Button
                      type="submit"
                      className="step_form_content__footer__button__button"
                    >
                      {currentPage === 6 ? "סיום" : "המשך לשלב הבא"}
                    </Button>
                    <div
                      className="back__step__"
                      onClick={() => {
                        if (currentPage !== 1) {
                          setStepIsSaved(true);
                        }
                      }}
                    >
                      שמור להמשך
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <FormBeforeSubmit
          isReset={isReset}
          isActivePage={7 || 8}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsLoading={setIsLoading}
          IsActiveId={
            reportStorage?.report?.insurance_case?.id ||
            report?.report?.insurance_case?.id
          }
          btnOpen={true}
        />
      </div>

      {currentPage !== 9 && <Footer />}
      <PdfModal
        event_type={"תאונת דרכים"}
        data={reportStorage?.report}
        open={openPdf}
        setOpen={setOpenPdf}
        sign_picture={drawing}
        user={personData}
      />
    </AccidentForm>
  );
}

export default Accident;
