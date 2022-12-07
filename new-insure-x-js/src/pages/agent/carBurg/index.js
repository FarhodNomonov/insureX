import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../../../components/Ui/Header";
import {
  CheckBoxIcon,
  CloudUpload,
  PaginationNextIcon,
  Camera,
  Galery,
  AdderIcon,
} from "../../../components/icon";
import {
  Input,
  WrapperInput,
} from "../../../components/Ui/FormElements/Styles";
import Button from "../../../components/Ui/Button/Button";
import DrawerCanvas from "../../../components/Ui/drawerCanvasBurglary";
import DrawerBg from "../../../assets/img/auto_car_bg.svg";
import DrawerUser from "../../../components/Ui/DrawerPodpis";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
} from "../RegisterPage/style";
import ModalIcon from "../../../assets/img/modalIcon.svg";
import {
  getFormData,
  getRequest,
  patchRequest,
  postFile,
  postRequest,
  onSavePhoto,
} from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import { AccidentForm } from "../accident/style";
import CustomSelect from "../../../components/Ui/CustomSelect";
import FormBefore from "../../../components/Steps/FormBefore";
import PdfModal from "../../../components/Ui/Pdf";
import UseCamera from "../../../hook/useCamera";
import { CityCache } from "../../../utils/requestApi";
import { Message, messageCar } from "../../../utils/messages";

import { SelectComponent } from "../../../components/Ui/FormElements/FormElements";

let report = { report: {} };

function StepForm() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  let personData = JSON.parse(localStorage.getItem("insured_person")) ?? {};
  let reportStorage = JSON.parse(localStorage.getItem("car_burglary"));
  const [currentPage, setCurrentPage] = React.useState(
    Number(localStorage.getItem("carBurglaryPage") ?? 1) ?? 1
  );

  // drawer canvas

  const [drawerImage, setDrawerImage] = React.useState(DrawerBg);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [drawing, setDrawing] = React.useState(null);
  const [openCamera, setOpenCamera] = React.useState(false);
  // isLoading Loader

  const [isLoading, setIsLoading] = React.useState(false);

  // set Form data
  const [indexes, setIndexes] = React.useState(
    reportStorage?.report?.witnesData
      ? reportStorage?.report?.witnesData?.map((_, index) => index)
      : [0]
  );
  const [counter, setCounter] = React.useState(
    reportStorage?.report?.witnesData?.length ?? 1
  );
  const [openPdf, setOpenPdf] = React.useState(false);
  // get data from api

  const [propertyTypeData, setPropertyTypeData] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [cityId, setCityId] = React.useState("");
  const [isCurrent, setIsCurrent] = React.useState(false);
  const Person = JSON.parse(localStorage.getItem("insured_person"));
  const [insCompData, setInsCompData] = React.useState([]);
  const [changeCmpId, setChangeCmpId] = React.useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
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
    localStorage.setItem("car_burglary", JSON.stringify(report));
    if (
      reportStorage?.report?.insurance_case?.id !== Number(hash.split("#")[1])
    ) {
      localStorage.setItem("carBurglaryPage", 1);
    }
  }

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      if (changeCmpId) {
        getRequest(`/agents/select?insurance_company_id=${changeCmpId}`)
          .then((res) => {
            if (!res?.error) {
              const customData = res?.message?.agents
                ?.filter((status) => !status.delete)
                .map((item) => {
                  return {
                    value: item?.id,
                    label: `${item?.first_name} ${item?.second_name}`,
                  };
                });
              setCompany(customData);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [reportStorage?.report?.insurance_case?.id, currentPage, changeCmpId]);

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      const fetchData = async () => {
        const response = await getRequest(`/automobile-types`);
        if (!response.error) {
          const customData = response.message?.automobile_types.map((item) => {
            return {
              value: item.id,
              label: item.automobile_type,
            };
          });
          setPropertyTypeData(customData);
        }
      };
      fetchData();
    }
  }, [currentPage]);
  React.useInsertionEffect(() => {
    localStorage.setItem("carBurglaryPage", currentPage);
    reset();
  }, [currentPage]);

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      setValue(
        "automobile_type_id",
        propertyTypeData?.find(
          (res) => res?.value === reportStorage?.report?.car?.automobile_type_id
        )
      );
      setValue("number", reportStorage?.report?.car?.number);
      setValue("model", reportStorage?.report?.car?.model);
      setValue("year", reportStorage?.report?.car?.year);
      setValue("policy", reportStorage?.report?.insurance_case?.policy);
      setValue(
        "agent_id",
        company?.find(
          (res) =>
            res?.value === reportStorage?.report?.insurance_case?.agent_id
        )
      );
      setValue(
        "username",
        personData?.first_name + " " + personData?.second_name
      );
      setValue("passport_id", personData?.passport_id);
      setValue("adderss", personData?.adderss);
      setValue(
        "city",
        CityCache()?.find((res) => res?.value === personData?.city_id)?.label
      );
      setValue("phone", personData?.phone);
      setValue("email", personData?.email);
    }
    if (currentPage === 2) {
      setValue("names", reportStorage?.report?.driver?.names);
      setValue("driver_id", reportStorage?.report?.driver?.driver_id);
      setValue("birthday", reportStorage?.report?.driver?.birthday);
      setValue("phone_driver", reportStorage?.report?.driver?.phone);
      setValue("license_number", reportStorage?.report?.driver?.license_number);
      setValue("has_permission", reportStorage?.report?.driver?.has_permission);
    }
    if (currentPage === 3) {
      setValue(
        "fire_fighters",
        reportStorage?.report?.incident_participants?.fire_fighters
      );
      setValue("police", reportStorage?.report?.incident_participants?.police);
      setValue(
        "tow_truck",
        reportStorage?.report?.incident_participants?.tow_truck
      );
      setValue("address", reportStorage?.report?.insurance_case?.address);
      setValue("details", reportStorage?.report?.insurance_case?.details);
      setValue("date", reportStorage?.report?.insurance_case?.incident_date);
      setValue("time", reportStorage?.report?.insurance_case?.time);
      setValue("incident_type", reportStorage?.report?.incident_type);
      reportStorage?.report?.witnesData?.map((_, index) => {
        return () => {
          setValue(`witnesData[${index}].names`, _.names);
          setValue(`witnesData[${index}].phone`, _.phone);
        };
      });
    }
  }, [currentPage]);

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      if (personData?.city_id) {
        const getCity = async () => {
          const response = await getRequest(`/city/${personData?.city_id}`);
          if (!response.error) {
            const customData = response.message?.city;
            setCityId(customData);
          }
        };
        getCity();
      }
      const fetchDataComp = async () => {
        const response = await getRequest(`/insurance-companies`);
        if (!response.error) {
          const customData = response?.message?.insurance_companies
            .filter((cp) =>
              personData?.insurance_company_persons_id?.includes(Number(cp.id))
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
    }
  }, [reportStorage?.report?.insurance_case?.id, currentPage]);

  // form fields
  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };
  const [isReset, setIsReset] = React.useState(true);

  const onSubmit = (data) => {
    setIsReset(false);
    if (
      !reportStorage?.report?.insurance_case?.id ||
      !reportStorage?.report?.insurance_case?.id
    ) {
      const dataForm = {
        insured_person_id: personData?.id,
        property_type_id: 1,
        event_type_id: 3,
        document_date: new Date().toISOString(),
        status_id: 1,
      };
      postRequest("/insurance-case", getFormData(dataForm)).then(
        ({ message }) => {
          console.log(
            message?.insurance_case?.id,
            "message?.insurance_case?.id"
          );
          report.report.car = {
            ...report.report.car,
            number: data.number,
            model: data.model,
            year: data.year,
            automobile_type_id: Number(data?.automobile_type_id?.value),
          };
          report.report.insurance_case = {
            ...report.report.insurance_case,
            id: message?.insurance_case?.id,
            status_id: 1,
            insured_person_id: personData.id,
            policy: data?.policy,
            agent_id: data?.agent_id?.value ?? null,
            address: data.address,
            city_id: personData?.city_id ?? cityId?.id,
          };
          console.log(report);
          localStorage.setItem("car_burglary", JSON.stringify(report));
          //messageCar(message?.insurance_case?.id, "car");
        }
      );
    }
    if (currentPage === 1) {
      report.report.car = {
        ...report.report.car,
        number: data.number,
        model: data.model,
        year: data.year,
        automobile_type_id: Number(data?.automobile_type_id?.value),
      };
      report.report.insurance_case = {
        ...report.report.insurance_case,
        status_id: 1,
        insured_person_id: personData.id,
        policy: data?.policy,
        agent_id: data?.agent_id?.value ?? null,
        address: data.address,
        city_id: personData?.city_id ?? cityId?.id,
      };
      console.clear();
      console.log(report);
      localStorage.setItem("car_burglary", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 2) {
      report.report.driver = {
        names: data.names,
        driver_id: data.driver_id,
        phone: data.phone_driver,
        birthday: data.birthday,
        license_number: data.license_number,
        has_permission: data.has_permission,
      };
      console.clear();
      console.log(report);
      localStorage.setItem("car_burglary", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 3) {
      report.report.insurance_case = {
        ...report.report.insurance_case,
        details: data?.details,
        date: `${data.date}:${data.time}`,
        time: data.time,
        incident_date: data.date,
        address: data.address,
      };
      report.report.witnesData = data.witnesData;
      report.report.incident_participants = {
        insurance_case_id: reportStorage?.report?.insurance_case?.id,
        police: data?.police === "true",
        fire_fighters: data?.fire_fighters === "true",
        tow_truck: data?.tow_truck === "true",
      };
      report.report.car = {
        ...report.report.car,
        damage_picture: drawerImage,
      };
      report.report.incident_type = data.incident_type;
      console.clear();
      console.log(report);
      localStorage.setItem("car_burglary", JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 4) {
      setOpenPdf(true);
      report.report.insurance_case = {
        ...report.report.insurance_case,
        document_date: data.document_date,
        signature: data.whose_signature,
        status_id: 3,
      };
      console.clear();
      console.log(report);
      localStorage.setItem("car_burglary", JSON.stringify(report));
      setIsLoading(true);

      const Requests = () => {
        if (report.report.driver) {
          postRequest(
            `/insurance-case/${reportStorage?.report?.insurance_case?.id}/driver`,
            getFormData(report.report.driver)
          );
        }
        if (report.report.witnesData) {
          for (let key of report.report.witnesData) {
            postFile(
              `/insurance-case/${reportStorage?.report?.insurance_case?.id}/witness`,
              getFormData(key)
            )
              .then((res) => {
                if (!res.error) {
                  setIsLoading(false);
                  setIndexes([0]);
                  setCounter(1);
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
            `/insurance-case/${reportStorage?.report?.insurance_case?.id}/place/${report.report.incident_type}`
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
          patchRequest(
            `/insurance-case/${
              hash.split("#")[1] ?? reportStorage?.report?.insurance_case?.id
            }`,
            getFormData(PatchData)
          ).then(({ error }) => {
            if (!error) {
              console.clear();
              if (report.report.car) {
                postRequest(
                  `/insurance-case/${reportStorage?.report?.insurance_case?.id}/car`,
                  getFormData(report.report.car)
                );
              }
            }
          });
        }
      };
      Requests();
    }

    const root = document.getElementById("root");
    root.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  React.useInsertionEffect(() => {
    if (reportStorage?.report?.insurance_case?.id) {
      report = {
        report: {
          ...reportStorage?.report,
        },
      };
      console.clear();
      console.log(reportStorage);
      localStorage.setItem("car_burglary", JSON.stringify(report));
    }
    if (!reportStorage?.report?.insurance_case?.id) {
      report.report = {
        ...report.report,
        insurance_case: {
          property_type_id: 1,
          event_type_id: 3,
          id: reportStorage?.report?.insurance_case?.id,
        },
      };
      if (reportStorage?.report?.insurance_case?.id) {
        console.clear();
        console.log(report);
        localStorage.setItem("car_burglary", JSON.stringify(report));
      }
    }
  }, [reportStorage?.report?.insurance_case?.id]);

  return (
    <AccidentForm className="flex__column__ h-100">
      {isLoading && <Loader />}
      <div>
        <Header
          title="פתיחת אירוע רכב - פריצה"
          text={`שלום ${Person?.first_name}`}
        />
        {/* Top Bar */}
        {currentPage < 5 && (
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
                    ? "הצהרת המבוטח"
                    : ""}
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="step_form_content__body"
              >
                {/* Step first  start */}
                {currentPage === 1 && (
                  <>
                    {/* car start end */}

                    <SelectComponent
                      value={insCompData}
                      setRselect={(value) => {
                        setChangeCmpId(value);
                        setValue("insurance_company_id", value);
                      }}
                      placeholder={"חברת ביטוח"}
                      // defaultValue={insCompData?.find(
                      //   (item) =>
                      //     item.value ===
                      //     reportStorage?.report?.insurance_case?.agent_id
                      // )}
                    />

                    <CustomSelect
                      name="automobile_type_id"
                      placeholder={"סוג הרכב"}
                      options={propertyTypeData}
                      control={control}
                      rules={{ required: true }}
                      defaultValue={{
                        value: 3,
                        label: "אופנוע",
                      }}
                      styles={
                        errors.automobile_type_id && { border: "1px solid red" }
                      }
                    />
                    <WrapperInput>
                      <Input
                        style={errors.number && { border: "1px solid red" }}
                        {...register("number", { required: true })}
                        as="input"
                        type="text"
                        placeholder={"מס' רישוי רכב*"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.model && { border: "1px solid red" }}
                        {...register("model", { required: true })}
                        as="input"
                        type="text"
                        placeholder={"תוצר ודגם*"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={
                          errors.year && {
                            border: "1px solid red",
                            borderRadius: "8px",
                          }
                        }
                        {...register("year", { required: true })}
                        as="input"
                        type="number"
                        placeholder={"שנת יצור*"}
                      />
                    </WrapperInput>

                    {/* car data end */}

                    {/* case patches */}
                    <WrapperInput>
                      <Input
                        {...register("policy")}
                        as="input"
                        type="text"
                        placeholder={"מס' פוליסה"}
                      />
                    </WrapperInput>
                    <CustomSelect
                      name="agent_id"
                      placeholder={"שם הסוכן"}
                      options={company}
                      control={control}
                      rules={{ required: true }}
                      styles={
                        errors.agent_id && {
                          border: "1px solid red",
                          borderRadius: "8px",
                        }
                      }
                    />

                    {/* case patches */}

                    {/* insured person data start */}
                    <WrapperInput>
                      <Input
                        style={errors.username && { border: "1px solid red" }}
                        {...register("username", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={
                          personData?.first_name !== undefined
                            ? personData?.first_name
                            : "" + personData?.second_name !== undefined
                            ? personData?.second_name
                            : ""
                        }
                        placeholder={"שם משתמש"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={
                          errors.passport_id && { border: "1px solid red" }
                        }
                        {...register("passport_id", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={personData?.passport_id ?? ""}
                        placeholder={"מספר"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.address && { border: "1px solid red" }}
                        {...register("address", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={personData?.address ?? ""}
                        placeholder={"כתובת"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        {...register("city")}
                        as="input"
                        type="text"
                        defaultValue={cityId.city_name ?? ""}
                        placeholder={"עיר"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.phone && { border: "1px solid red" }}
                        {...register("phone", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={personData?.phone ?? ""}
                        placeholder={"טלפון"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.email && { border: "1px solid red" }}
                        {...register("email", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={personData?.email ?? ""}
                        placeholder={"דואר אלקטרוני"}
                      />
                    </WrapperInput>
                    {/* insured person data end */}
                  </>
                )}
                {/* Step first  end */}

                {/* Step second start */}
                {currentPage === 2 && (
                  <>
                    <WrapperInput>
                      <Input
                        style={errors.names && { border: "1px solid red" }}
                        {...register("names", { required: true })}
                        as="input"
                        type="text"
                        placeholder={"שם הנהג*"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        {...register("driver_id")}
                        as="input"
                        type="number"
                        placeholder={`מס' ת"ז*`}
                      />
                    </WrapperInput>
                    <p style={{ fontWeight: 600, color: "#1D3557" }}>
                      תאריך לידה*
                    </p>
                    <WrapperInput>
                      <Input
                        style={errors.birthday && { border: "1px solid red" }}
                        {...register("birthday", { required: true })}
                        as="input"
                        type="date"
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={
                          errors.phone_driver && { border: "1px solid red" }
                        }
                        {...register("phone_driver", { required: true })}
                        as="input"
                        type="text"
                        placeholder={`טלפון נייד*`}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={
                          errors.license_number && { border: "1px solid red" }
                        }
                        {...register("license_number", { required: false })}
                        as="input"
                        type="text"
                        placeholder={"מס' רישיון נהיגה"}
                      />
                    </WrapperInput>
                    <div className="radio_button_group">
                      <p
                        className="radio_button_group_title"
                        style={errors.has_permission && { color: "red" }}
                      >
                        האם נהג ברשות המבוטח?
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="has_permission"
                          type="radio"
                          label="כן"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="has_permission"
                          type="radio"
                          label="לא"
                          value="false"
                          checked={false}
                          register={register}
                          required={true}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* Step second  end */}

                {/* Step third start */}
                {currentPage === 3 && (
                  <>
                    <UseCamera
                      isOpen={openCamera}
                      setIsOpen={setOpenCamera}
                      setIsLoading={setIsLoading}
                      id={reportStorage?.report?.insurance_case?.id}
                      position={"top"}
                      mode={"modal"}
                    />
                    <p style={{ fontWeight: 600, color: "#1D3557" }}>
                      תאריך האירוע*
                    </p>
                    <WrapperInput>
                      <Input
                        style={errors.date && { border: "1px solid red" }}
                        {...register("date", { required: true })}
                        as="input"
                        type="date"
                        placeholder={`תאריך האירוע*`}
                      />
                    </WrapperInput>
                    <p style={{ fontWeight: 600, color: "#1D3557" }}>שעה*</p>
                    <WrapperInput>
                      <Input
                        style={errors.time && { border: "1px solid red" }}
                        {...register("time", { required: true })}
                        as="input"
                        type="time"
                        placeholder={`תאריך האירוע*`}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.address && { border: "1px solid red" }}
                        {...register("address", { required: true })}
                        as="input"
                        type="text"
                        placeholder={"מקום/כתובת אתר האירוע*"}
                      />
                    </WrapperInput>
                    <div className="radio_button_group">
                      <p className="radio_button_group_title">
                        האם היה מעורב באירוע?
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="tow_truck"
                          type="checkbox"
                          label="גרר"
                          value={true}
                          checked={false}
                          register={register}
                          required={false}
                        />
                        <CheckBoxIcon
                          name="police"
                          type="checkbox"
                          label="משטרה"
                          value={true}
                          checked={false}
                          register={register}
                          required={false}
                        />
                        <CheckBoxIcon
                          name="fire_fighters"
                          type="checkbox"
                          label="מכבי אש"
                          value={true}
                          checked={false}
                          register={register}
                          required={false}
                        />
                      </div>
                    </div>
                    <WrapperInput>
                      <Input
                        {...register("details", { required: true })}
                        as="textarea"
                        type="text"
                        style={{
                          resize: "vertical",
                          minHeight: "200px",
                          maxHeight: "400px",
                          height: "280px",
                          border: errors.details && "1px solid red",
                        }}
                        placeholder={"תיאור מפורט של התאונה*"}
                      />
                    </WrapperInput>
                    <div className="impact_area_chart">
                      <p className="impact_area_chart_title">
                        תרשים איזור הפגיעה (לחץ להגדלה)
                      </p>
                      <div
                        className="drawer_opener_button_"
                        onClick={() => setOpenDrawer(true)}
                      >
                        <img src={drawerImage} alt="" />
                      </div>
                      <div className="impact_area_chart_container">
                        <DrawerCanvas
                          open={openDrawer}
                          setOpen={setOpenDrawer}
                          setImageBg={setDrawerImage}
                        />
                      </div>
                      <div className="impact_area_chart">
                        <p className="impact_area_chart_title">המקרה אירע:</p>
                        <div className="radio_button_group">
                          <div
                            className="radio_button_group_container"
                            style={{
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "20px",
                            }}
                          >
                            <CheckBoxIcon
                              name="incident_type"
                              type="radio"
                              label="בדרך לעבודה"
                              value={1}
                              checked={false}
                              register={register}
                              required={true}
                            />
                            <CheckBoxIcon
                              name="incident_type"
                              type="radio"
                              label="במהלך העבודה"
                              value={2}
                              checked={false}
                              register={register}
                              required={true}
                            />
                            <CheckBoxIcon
                              name="incident_type"
                              type="radio"
                              label="בדרך ממקום העבודה"
                              value={3}
                              checked={false}
                              register={register}
                              required={true}
                            />
                          </div>
                          <p
                            className="impact_area_chart_title"
                            style={{ marginTop: "30px" }}
                          >
                            העלאת תמונות וקבצים
                          </p>
                          <div className="upload_files_container mt-10">
                            <label className="upload_files_container_item">
                              <input
                                type="file"
                                name="file"
                                accept="image/*,video/*,audio/*,application/pdf"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  onSavePhoto(
                                    e,
                                    setIsLoading,
                                    reportStorage?.report?.insurance_case?.id ??
                                      report?.report?.insurance_case?.id ??
                                      hash.split("#")[1],
                                    "docs"
                                  );
                                }}
                              />
                              <div className="icon__upload__">
                                <CloudUpload />
                              </div>
                              <p className="fs-16 fw-500">העלאת קבצים</p>
                            </label>
                          </div>
                          <div
                            className="upload_files_container mt-10"
                            onClick={() => setOpenCamera(true)}
                          >
                            <label className="upload_files_container_item">
                              <div className="icon__upload__">
                                <Camera />
                              </div>
                              <p className="fs-16 fw-500">צלם תמונות מהאירוע</p>
                            </label>
                          </div>
                          <div className="upload_files_container mt-10">
                            <label className="upload_files_container_item">
                              <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => {
                                  onSavePhoto(
                                    e,
                                    setIsLoading,
                                    reportStorage?.report?.insurance_case?.id ??
                                      report?.report?.insurance_case?.id ??
                                      hash.split("#")[1],
                                    "images"
                                  );
                                }}
                                style={{ display: "none" }}
                              />
                              <div className="icon__upload__">
                                <Galery />
                              </div>
                              <p className="fs-16 fw-500">בחר תמונות מהגלריה</p>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="witnesses_container">
                        <p className="witnesses_title">עדים למקרה</p>
                      </div>

                      <div className="witnesses_container">
                        {indexes?.map((index, i) => {
                          const witnesData = `witnesData[${index}]`;
                          return (
                            <fieldset name={witnesData} key={witnesData}>
                              <div className="witnesses_container_item">
                                <WrapperInput>
                                  <Input
                                    {...register(`${witnesData}.names`, {
                                      required: false,
                                    })}
                                    as="input"
                                    type="text"
                                    placeholder={"שם העד"}
                                  />
                                </WrapperInput>
                              </div>

                              <div className="witnesses_container_item">
                                <WrapperInput>
                                  <Input
                                    {...register(`${witnesData}.phone`, {
                                      required: false,
                                    })}
                                    as="input"
                                    type="text"
                                    placeholder={"טלפון"}
                                  />
                                </WrapperInput>
                              </div>

                              {indexes.length > 1 && (
                                <button
                                  style={i === 0 ? { display: "none" } : {}}
                                  className="btn_remove"
                                  type="button"
                                  onClick={removeFriend(index)}
                                >
                                  להסיר
                                </button>
                              )}
                            </fieldset>
                          );
                        })}

                        <div
                          className="upload_files_container mt-10"
                          onClick={addFriend}
                        >
                          <div className="upload_files_container_item">
                            <div className="icon__upload__">
                              <AdderIcon />
                            </div>
                            <p className="fs-16 fw-500">עד נוסף</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentPage === 4 && (
                  <>
                    <div
                      style={{ direction: "ltr" }}
                      className="policyholder_container"
                    >
                      <p>
                        אני מתחייב להתקשר ולהודיע לחברת הביטוח, מיד עם קבלת
                        הודעה/תביעה כלשהי בקשר לתאונה הנ"ל, מכל גורם שהוא. הריני
                        מצהיר כי כל הפרטים שמסרתי היום נכונים ומדויקים וכי לא
                        העלמתי כל עובדה ופרט בקשר לתאונה. אני מאשר כי הובא
                        לידיעתי ואני מסכים כי הפרטים שמסרתי ו/או כל מידע שיגיע
                        לידיעת החברה, יוחזקו במאגר מידע ממוחשב בו נוהגת החברה
                        לרכז נתונים בנושא הביטוח. הריני מייפה את כוחה של החברה
                        לטפל בכל תביעה עתידית אשר תוגש ע"י צד ג' ו/או מי מטעמו
                        כנגדי ובהסכמתי זו יש לראות הסכמה בהתאם לדרישת סעיף 68
                        לחוק חוזה הביטוח תשמ"א 1981. הנני מתחייב להעביר את דמי
                        ההשתתפות העצמית עפ"י תנאי הפוליסה, מיד עם קבלת הדרישה מן
                        החברה.
                      </p>
                    </div>
                    <p style={{ fontWeight: 600, color: "#1D3557" }}>תאריך</p>
                    <WrapperInput>
                      <Input
                        as="input"
                        type="date"
                        placeholder={"תאריך"}
                        {...register("document_date", { required: true })}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        as="input"
                        type="text"
                        placeholder={`הטופס מולא ע"י`}
                        {...register("whose_signature", { required: true })}
                      />
                    </WrapperInput>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#1D3557",
                        marginBottom: "10px",
                      }}
                    >
                      חתימת המבוטח (חתימה על המסך)
                    </p>
                    <div className="impact_area_chart_container">
                      <DrawerUser setImageBg={setDrawing} />
                    </div>
                  </>
                )}

                {/* Step seventh  end */}

                <div className="step_form_content__footer">
                  <div className="step_form_content__footer__button">
                    <Button
                      type="submit"
                      className="step_form_content__footer__button__button"
                    >
                      {currentPage > 3 ? "סיום" : "המשך לשלב הבא"}
                    </Button>
                    <div
                      className="back__step__"
                      onClick={() => {
                        if (currentPage !== 1) {
                          setIsCurrent(true);
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
        {/* Top Bar */}
      </div>

      <FormBefore
        isReset={isReset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsLoading={setIsLoading}
        firstPage={5}
        storageName={"car_burglary"}
        storagePage={"carBurglaryPage"}
        pageName={"פריצה"}
        btnOpen={true}
        suppliyerType={4}
      />

      {(currentPage === 6 || isCurrent) && (
        <div className="event_received_container">
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalHeaderIconWrapper>
                  <img src={ModalIcon} alt="" />
                  <ModalHeaderTitle>דיווח אירוע התקבל</ModalHeaderTitle>
                </ModalHeaderIconWrapper>
              </ModalHeader>
              <ModalBody style={{ marginBottom: "0" }}>
                <p>מספר האירוע הוא:</p>
                <h1>
                  {reportStorage?.report?.insurance_case?.id ??
                    report?.report?.insurance_case?.id}
                </h1>
                <p>
                  יש להשלים את הטופס
                  <br /> לצורך קבלת מספר תביעה
                  <br />
                  והפקדת הרכב במוסך
                </p>

                <Button
                  style={{ marginTop: "40px" }}
                  onClick={() => {
                    if (isCurrent) {
                      setIsCurrent(false);
                      setDrawing(null);
                    }
                    if (!isCurrent) {
                      localStorage.removeItem("car_burglary");
                      localStorage.removeItem("carBurglaryPage");
                      navigate(
                        "/" + localStorage.getItem("role") ?? "customer"
                      );
                      setDrawing(null);
                    }
                  }}
                >
                  השלם את הטופס עכשיו
                </Button>

                <Button
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    if (currentPage === 6) {
                      localStorage.removeItem("car_burglary");
                      localStorage.removeItem("carBurglaryPage");
                      report = { report: {} };
                      setDrawing(null);
                    } else {
                      postRequest(
                        "/insurance-case/messages/create",
                        getFormData({
                          type: "web-client",
                          ms_text: Message.msCustomer21(
                            Person?.first_name + Person?.second_name,
                            reportStorage?.report?.insurance_case?.id ??
                              report?.report?.insurance_case?.id
                          ),
                          case_type: "other",
                          id: Math.floor(Math.random() * 100),
                          customer_id: JSON.parse(
                            localStorage.getItem("insured_person") ?? "{}"
                          )?.id,
                          is_case_id:
                            reportStorage?.report?.insurance_case?.id ??
                            report?.report?.insurance_case?.id,
                          date_time: new Date(),
                        })
                      );
                    }
                    navigate("/" + localStorage.getItem("role") ?? "customer");
                  }}
                >
                  השלם מאוחר יותר
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}

      <PdfModal
        event_type={"פריצה"}
        data={reportStorage?.report}
        open={openPdf}
        setOpen={setOpenPdf}
        sign_picture={drawing}
      />
    </AccidentForm>
  );
}

export default StepForm;
