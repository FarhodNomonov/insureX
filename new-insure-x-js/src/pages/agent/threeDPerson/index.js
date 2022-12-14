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
} from "../../../components/icon";
import { Paragraf } from "./styles";
import {
  Input,
  WrapperInput,
} from "../../../components/Ui/FormElements/Styles";
import { SelectComponent } from "../../../components/Ui/FormElements/FormElements";
import Button from "../../../components/Ui/Button/Button";
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
  postRequest,
} from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import { AccidentForm } from "../accident/style";
import { onSavePhoto } from "../../../utils/requestApi";
import FormBefore from "../../../components/Steps/FormBefore";
import PdfModal from "../../../components/Ui/Pdf";
import UseCamera from "../../../hook/useCamera";
import { Message } from "../../../utils/messages";

let report = { report: {} };

function ThreeDPerson({
  propertyId = 2,
  typeId = 7,
  reportStorageName = "",
  isActivePage = "",
}) {
  const location = useLocation();
  const navigate = useNavigate();
  let reportStorage = JSON.parse(localStorage.getItem(reportStorageName));
  let personData = JSON.parse(localStorage.getItem("insured_person")) ?? {};
  const Person = JSON.parse(localStorage.getItem("insured_person"));

  const [currentPage, setCurrentPage] = React.useState(
    Number(localStorage.getItem(isActivePage) ?? 1) ?? 1
  );
  const [agentPhone, setAgentPhone] = React.useState(null);
  const [companyAgentId, setCompanyAgentId] = React.useState(null);
  const [threeDPerson, setThreeDPerson] = React.useState(
    reportStorage?.report?.third_person?.threeDPerson !== undefined
      ? true
      : false
  );
  const [openCamera, setOpenCamera] = React.useState(false);
  const [isReset, setIsReset] = React.useState(true);

  // drawer canvas

  const [drawing, setDrawing] = React.useState(null);
  const [openPdf, setOpenPdf] = React.useState(false);

  // isLoading Loader

  const [isLoading, setIsLoading] = React.useState(false);

  // get data from api

  const [companyAgent, setCompanyAgent] = React.useState([]);
  const [cityId, setCityId] = React.useState("");
  const [iscurrent, setIscurrent] = React.useState(false);
  const [insCompData, setInsCompData] = React.useState([]);
  const [changeCmpId, setChangeCmpId] = React.useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  if (location?.hash.split("#")[1]) {
    report.report = {
      ...reportStorage?.report,
      insurance_case: {
        ...reportStorage?.report.insurance_case,
        id: Number(location?.hash.split("#")[1]),
      },
    };
    localStorage.setItem(reportStorageName, JSON.stringify(report));
    if (
      reportStorage?.report?.insurance_case?.id !==
      Number(location?.hash.split("#")[1])
    ) {
      localStorage.setItem(isActivePage, 1);
    }
  }

  React.useInsertionEffect(() => {
    localStorage.setItem(isActivePage, currentPage);
    reset();
  }, [currentPage]);

  React.useInsertionEffect(() => {
    if (!changeCmpId) return;
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
          setCompanyAgent(customData);
          setCompanyAgentId(customData[0]?.id);
          const FindDate = res?.message?.agents?.find(
            (res) => res?.id === reportStorage?.report?.insurance_case?.agent_id
          );
          setValue("agent_id", {
            label: `${FindDate?.first_name} ${FindDate?.second_name}`,
            value: FindDate?.id,
          });
          setValue("agent_phone", FindDate?.phone);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeCmpId]);

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      setValue("address", personData?.address);
    } else setValue("address", "");
  }, [currentPage]);

  React.useInsertionEffect(() => {
    if (personData?.city_id) {
      const getCity = async () => {
        const response = await getRequest(`/city/${personData?.city_id}`);
        if (!response.error) {
          const customData = response.message?.city;
          setCityId(customData);
        }
      };

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
      getCity();
    }
  }, []);

  React.useInsertionEffect(() => {
    if (companyAgentId) {
      getRequest(`/agents/select?id=${companyAgentId}`).then((res) => {
        setAgentPhone(res?.message?.agents?.find((status) => !status.delete));
      });
    }
  }, [companyAgentId]);

  // form fields
  React.useMemo(() => {
    if (reportStorage?.report?.insurance_case?.id) {
      report.report.insurance_case = {
        ...reportStorage?.report?.insurance_case,
        id:
          reportStorage?.report?.insurance_case?.id ??
          report?.report?.insurance_case?.id,
      };
      report.report.estate = {
        ...reportStorage?.report?.estate,
      };
      report.report.third_person = {
        ...reportStorage?.report?.third_person,
      };

      console.clear();
      console.log(reportStorage);
      localStorage.setItem(reportStorageName, JSON.stringify(report));
    }
  }, [reportStorage, reportStorageName]);

  const onSubmit = (data) => {
    setIsReset(false);
    if (!reportStorage?.report?.insurance_case?.id) {
      if (currentPage === 1) {
        const dataForm = {
          insured_person_id: personData?.id,
          property_type_id: propertyId,
          event_type_id: typeId,
          document_date: new Date().toISOString(),
          status_id: 1,
          agent_id:
            companyAgentId ??
            agentPhone?.id ??
            reportStorage?.report?.insurance_case?.agent_id,
        };
        if (agentPhone) {
          postRequest("/insurance-case", getFormData(dataForm)).then(
            ({ message }) => {
              report.report.insurance_case = {
                ...report.report.insurance_case,
                agent_id:
                  companyAgentId ??
                  agentPhone?.id ??
                  reportStorage.report.insurance_case.agent_id,
                policy: data.policy,
                id: message?.insurance_case?.id,
                status_id: message?.insurance_case?.status_id,
                city_id: personData?.city_id ?? cityId.id,
                insured_person_id: personData?.id,
              };
              console.clear();
              console.log(report);
              localStorage.setItem(reportStorageName, JSON.stringify(report));
            }
          );
        }
      }
    }

    if (currentPage === 1) {
      if (agentPhone) {
        report.report.insurance_case = {
          ...report.report.insurance_case,
          agent_id:
            agentPhone?.id ?? reportStorage?.report?.insurance_case?.agent_id,
          agent_phone: agentPhone?.phone,
          policy: data.policy,
          insured_person_id: personData?.id,
          city_id: personData?.city_id ?? cityId.id,
          document_date: new Date().toISOString(),
        };
        console.log(report);
        localStorage.setItem(reportStorageName, JSON.stringify(report));
      }
      reset();
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 2) {
      report.report.insurance_case = {
        ...report.report.insurance_case,
        address: data.address,
        details: data?.details,
        date: `${data.date} : ${data.time}`,
        time: data.time,
        incident_date: data.date,
        agent_id:
          agentPhone?.id ?? reportStorage?.report?.insurance_case?.agent_id,
      };
      report.report.estate = {
        damage_amount: data.damage_amount,
        single_owner: data.single_owner === "true",
        were_damaged: data.were_damaged === "true",
        has_additional_insurance: data.has_additional_insurance === "true",
        additional_insurance_info: data.additional_insurance_info,
        has_tenant: data.has_tenant === "true",
        insurance_case_ids: reportStorage?.report?.insurance_case?.id,
      };
      console.log(report);
      localStorage.setItem(reportStorageName, JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 3) {
      if (threeDPerson === true) {
        report.report.third_person = data;
      }
      if (threeDPerson === false) {
        report.report.third_person = {
          threeDPerson: false,
        };
      }
      console.log(report);
      localStorage.setItem(reportStorageName, JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }

    if (currentPage === 4) {
      setOpenPdf(true);
      report.report.insurance_case = {
        ...report.report.insurance_case,
        document_date: data.document_date,
        whose_signature: data.whose_signature,
        claim_amount: data.claim_amount,
        status_id: 3,
        id: reportStorage?.report?.insurance_case?.id,
      };
      localStorage.setItem(reportStorageName, JSON.stringify(report));
      const Requests = () => {
        setIsLoading(true);
        patchRequest(
          `/insured-persons/${personData?.id}`,
          getFormData({ sign_picture: drawing })
        );

        if (report.report.third_person) {
          threeDPerson &&
            postRequest(
              `/insurance-case/${reportStorage?.report?.insurance_case?.id}/3d-person`,
              getFormData(report.report.third_person)
            );
          const PatchData = report.report.insurance_case;
          delete PatchData?.id;
          PatchData.role = "customer";
          patchRequest(
            `/insurance-case/${
              location?.hash.split("#")[1] ??
              reportStorage?.report?.insurance_case?.id ??
              report?.report?.insurance_case?.id
            }`,
            getFormData(PatchData)
          ).then((res) => {
            if (!res.error) {
              setIsLoading(false);
              report.report.insurance_case.id = res.message.insurance_case.id;
            }
          });
        }

        if (report.report.incident_participants) {
          postRequest(
            `/incident-participant`,
            getFormData(report.report.incident_participants)
          );
        }

        postRequest("/estate", getFormData(report.report.estate));
      };
      localStorage.setItem(reportStorageName, JSON.stringify(report));
      reset();
      Requests();
      setCurrentPage(currentPage + 1);
      console.log(report);
    }
    const root = document.getElementById("root");
    root.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  React.useInsertionEffect(() => {
    if (currentPage === 1) {
      setValue("policy", reportStorage?.report?.insurance_case?.policy);
      setValue(
        "username",
        personData?.first_name + " " + personData?.second_name
      );

      setValue("passport_id", personData?.passport_id);
      setValue("adderss", personData?.adderss);
      setValue("phone", personData?.phone);
      setValue("email", personData?.email);
    }
    if (currentPage === 2) {
      setValue("date", reportStorage?.report?.insurance_case?.incident_date);
      setValue("time", reportStorage?.report?.insurance_case?.time);
      setValue("details", reportStorage?.report?.insurance_case?.details);
      setValue(
        "additional_insurance_info",
        reportStorage?.report?.estate?.additional_insurance_info
      );
      setValue("address", reportStorage?.report?.insurance_case?.address);
      setValue("damage_amount", reportStorage?.report?.estate?.damage_amount);
      setValue(
        "single_owner",
        `${reportStorage?.report?.estate?.single_owner}`
      );
      setValue(
        "were_damaged",
        `${reportStorage?.report?.estate?.were_damaged}`
      );
      setValue("has_tenant", `${reportStorage?.report?.estate?.has_tenant}`);
      setValue(
        "has_additional_insurance",
        `${reportStorage?.report?.estate?.has_additional_insurance}`
      );
    }
    if (currentPage === 3) {
      setValue(
        "threeDPerson",
        `${reportStorage?.report?.third_person?.threeDPerson}`
      );
      setValue("address", reportStorage?.report?.third_person?.address);
      setValue("damage_info", reportStorage?.report?.third_person?.damage_info);
      setValue("first_name", reportStorage?.report?.third_person?.first_name);
      setValue("last_name", reportStorage?.report?.third_person?.last_name);
      setValue("phone", reportStorage?.report?.third_person?.phone);
    }
  }, [currentPage]);

  return (
    <AccidentForm className="flex__column__ h-100">
      {isLoading && <Loader />}
      <div>
        <Header
          title="?????????? ?????????? ???????? - ?????? ?????? ??'"
          text={`???????? ${Person?.first_name}`}
        />
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
              />
            </div>
            <div className="step_form_content">
              <div className="step_form_content__header">
                <div className="step_form_content__header__title">
                  {currentPage === 1
                    ? "???????? ???????????? ????????????????"
                    : currentPage === 2
                    ? "?????????? ????????"
                    : currentPage === 3
                    ? "?????????? ?????????? ???????? ???? ??'"
                    : currentPage === 4
                    ? "?????????? ????????????"
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
                      placeholder={"???????? ??????????"}
                      // defaultValue={insCompData?.find(
                      //   (item) =>
                      //     item.value ===
                      //     reportStorage?.report?.insurance_case?.agent_id
                      // )}
                    />

                    <WrapperInput>
                      <Input
                        {...register("policy")}
                        as="input"
                        type="text"
                        placeholder={"????' ????????????"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <SelectComponent
                        value={companyAgent}
                        setRselect={setCompanyAgentId}
                        placeholder={"???? ??????????"}
                        defaultValue={companyAgent?.find(
                          (item) =>
                            item.value ===
                            reportStorage?.report?.insurance_case?.agent_id
                        )}
                      />
                    </WrapperInput>

                    <WrapperInput>
                      <Input
                        {...register("agent_phone")}
                        as="input"
                        type="tel"
                        value={agentPhone?.phone}
                        placeholder={"?????????? ??????????"}
                        onChange={(e) =>
                          setAgentPhone({
                            ...agentPhone,
                            phone: e.target.value,
                          })
                        }
                      />
                    </WrapperInput>
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
                        placeholder={"???? ??????????"}
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
                        placeholder={"????????"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.address && { border: "1px solid red" }}
                        {...register("address", { required: true })}
                        as="input"
                        type="text"
                        value={personData?.address ?? ""}
                        placeholder={"??????????"}
                        readOnly={true}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        {...register("city")}
                        as="input"
                        type="text"
                        defaultValue={cityId.city_name ?? ""}
                        placeholder={"??????"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.phone && { border: "1px solid red" }}
                        {...register("phone", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={personData?.phone ?? ""}
                        placeholder={"??????????"}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.email && { border: "1px solid red" }}
                        {...register("email", { required: true })}
                        as="input"
                        type="text"
                        defaultValue={personData?.email ?? ""}
                        placeholder={"???????? ????????????????"}
                      />
                    </WrapperInput>
                    {/* insured person data end */}
                  </>
                )}
                {/* Step first  end */}

                {currentPage === 2 && (
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
                      ?????????? ????????
                    </p>
                    <WrapperInput>
                      <Input
                        style={errors.date && { border: "1px solid red" }}
                        {...register("date", { required: true })}
                        as="input"
                        type="date"
                        placeholder={`?????????? ????????????*`}
                      />
                    </WrapperInput>
                    <p style={{ fontWeight: 600, color: "#1D3557" }}>
                      ?????? ????????
                    </p>
                    <WrapperInput>
                      <Input
                        style={errors.time && { border: "1px solid red" }}
                        {...register("time", { required: true })}
                        as="input"
                        type="time"
                        placeholder={`?????????? ????????????*`}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        style={errors.address && { border: "1px solid red" }}
                        {...register("address", { required: true })}
                        as="input"
                        type="text"
                        placeholder={"?????????? ???????? ????????"}
                      />
                    </WrapperInput>
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
                        placeholder={"?????????? ??????????"}
                      />
                    </WrapperInput>
                    <div className="impact_area_chart">
                      <p className="impact_area_chart_title">
                        ?????????? ???????????? ????????????
                      </p>

                      <div className="impact_area_chart">
                        <div className="radio_button_group">
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
                                      report?.report?.insurance_case?.id,
                                    "docs"
                                  );
                                }}
                              />
                              <div className="icon__upload__">
                                <CloudUpload />
                              </div>
                              <p className="fs-16 fw-500">?????????? ??????????</p>
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
                              <p className="fs-16 fw-500">?????? ???????????? ??????????????</p>
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
                                      report?.report?.insurance_case?.id,
                                    "images"
                                  );
                                }}
                                style={{ display: "none" }}
                              />
                              <div className="icon__upload__">
                                <Galery />
                              </div>
                              <p className="fs-16 fw-500">?????? ???????????? ??????????????</p>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <WrapperInput>
                      <Input
                        {...register("damage_amount")}
                        as="input"
                        type="text"
                        placeholder={"???? ???????? ???? ???? ???????? ???????? ???????? ??????"}
                        style={{ fontSize: "20px" }}
                      />
                    </WrapperInput>
                    <div className="radio_button_group">
                      <p
                        className="radio_button_group_title"
                        style={errors.single_owner && { color: "red" }}
                      >
                        ?????? ?????? ???????????? ???????????? ???? ?????????? ?????????????
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="single_owner"
                          type="radio"
                          label="????"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="single_owner"
                          type="radio"
                          label="????"
                          value="false"
                          checked={false}
                          register={register}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="radio_button_group">
                      <p
                        className="radio_button_group_title"
                        style={errors.were_damaged && { color: "red" }}
                      >
                        ?????? ?????? ?????????? ???????? ?????????? ???????????
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="were_damaged"
                          type="radio"
                          label="????"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="were_damaged"
                          type="radio"
                          label="????"
                          value="false"
                          checked={false}
                          register={register}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="radio_button_group">
                      <p
                        className="radio_button_group_title"
                        style={
                          errors.has_additional_insurance && { color: "red" }
                        }
                      >
                        ?????? ???????? ?????????? ???????? ???? ?????????? ?????????????
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="has_additional_insurance"
                          type="radio"
                          label="????"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="has_additional_insurance"
                          type="radio"
                          label="????"
                          value="false"
                          checked={false}
                          register={register}
                          required={true}
                        />
                      </div>
                    </div>
                    <WrapperInput>
                      <Input
                        {...register("additional_insurance_info", {
                          required: true,
                        })}
                        as="textarea"
                        type="text"
                        style={{
                          resize: "vertical",
                          minHeight: "200px",
                          maxHeight: "400px",
                          height: "280px",
                          border:
                            errors.additional_insurance_info && "1px solid red",
                        }}
                        placeholder={"???? ???? ?????? ????????"}
                      />
                    </WrapperInput>
                    <div className="radio_button_group">
                      <p
                        className="radio_button_group_title"
                        style={errors.has_tenant && { color: "red" }}
                      >
                        ?????? ???????? ?????? ???????????? ??-60 ??????????
                      </p>
                      <p className="radio_button_group_title"> ?????????????????</p>

                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="has_tenant"
                          type="radio"
                          label="????"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="has_tenant"
                          type="radio"
                          label="????"
                          value="false"
                          checked={false}
                          register={register}
                          required={true}
                        />
                      </div>
                    </div>
                  </>
                )}

                {currentPage === 3 && (
                  <>
                    <div className="radio_button_group">
                      <p
                        className="radio_button_group_title"
                        style={errors.threeDPerson && { color: "red" }}
                      >
                        ?????? ?????????? ?????????? ?????? ???????????
                      </p>
                      <div className="radio_button_group_container">
                        <div onClick={() => setThreeDPerson(true)}>
                          <CheckBoxIcon
                            name="threeDPerson"
                            type="radio"
                            label="????"
                            value="true"
                            checked={
                              reportStorage?.report?.third_person
                                ?.threeDPerson !== undefined
                                ? true
                                : false
                            }
                            register={register}
                            required={true}
                          />
                        </div>
                        <div onClick={() => setThreeDPerson(false)}>
                          <CheckBoxIcon
                            name="threeDPerson"
                            type="radio"
                            label="????"
                            value="false"
                            checked={
                              reportStorage?.report?.third_person
                                ?.threeDPerson === undefined
                                ? true
                                : false
                            }
                            register={register}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "#1D3557",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      ???? ???????????? ?????? ???? ???? ???????? ?????????? ???? ???? ??????????:
                    </p>
                    <div
                      style={{
                        opacity: threeDPerson ? 1 : 0.5,
                        pointerEvents: threeDPerson ? "auto" : "none",
                      }}
                    >
                      <div>
                        <WrapperInput>
                          <Input
                            style={{
                              border:
                                threeDPerson &&
                                errors.first_name &&
                                "1px solid red",
                            }}
                            as="input"
                            type="text"
                            placeholder={`???? ????????`}
                            {...register("first_name", {
                              required: threeDPerson,
                            })}
                          />
                        </WrapperInput>
                        <WrapperInput>
                          <Input
                            style={{
                              border:
                                threeDPerson &&
                                errors.last_name &&
                                "1px solid red",
                            }}
                            as="input"
                            type="text"
                            placeholder={`???? ??????????`}
                            {...register("last_name", {
                              required: threeDPerson,
                            })}
                          />
                        </WrapperInput>
                        <WrapperInput>
                          <Input
                            style={{
                              border:
                                threeDPerson && errors.phone && "1px solid red",
                            }}
                            as="input"
                            type="text"
                            placeholder={`???????? ?????????? ???????????? ??????`}
                            {...register("phone", { required: threeDPerson })}
                          />
                        </WrapperInput>
                        <WrapperInput>
                          <Input
                            {...register("address", { required: threeDPerson })}
                            as="textarea"
                            type="text"
                            style={{
                              resize: "vertical",
                              minHeight: "200px",
                              maxHeight: "400px",
                              height: "280px",
                              border:
                                threeDPerson &&
                                errors.address &&
                                "1px solid red",
                            }}
                            placeholder={
                              "???????? ????????                                (???? ???????? ???????????? ??????????????                  ???????????? ????????)"
                            }
                          />
                        </WrapperInput>
                        <WrapperInput>
                          <Input
                            {...register("damage_info", {
                              required: threeDPerson,
                            })}
                            as="textarea"
                            type="text"
                            style={{
                              resize: "vertical",
                              minHeight: "200px",
                              maxHeight: "400px",
                              height: "280px",
                              border:
                                threeDPerson &&
                                errors.damage_info &&
                                "1px solid red",
                            }}
                            placeholder={`?????? ?????????? ???? ???????? ??????????              ?????????? ???? ??'`}
                          />
                        </WrapperInput>{" "}
                      </div>
                    </div>
                    <div
                      style={{
                        maxWidth: "300px",
                        color: "#1D3557",
                        fontWeight: 500,
                      }}
                      className="placeholder_paragraff"
                    >
                      <p style={{ width: "350px" }}>
                        ???????? ?????????? 68 ???????? ???????? ???????????? ????????":?? ,1981 ?????????? ??????????
                        ???????? ?????????????? ?????????? ???? ??'. ?????????? ???????? ?????????????? ?????????? ????????
                        ???????? ????, ???????? ?????????????? ?????????? ?????????? ?????????? ????????????
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 4 && (
                  <>
                    <div className="policyholder_container">
                      <p>
                        ???????? ?????? ?????????????? ????"??, ??????????/?? ???????? ?????? ???????????? ????????????
                        ???????????? ???? ???? ?????????? ???????????? ????????????, ?????????? ???????????????? ?????? ????
                        ???????????? ???????????? ????????, ?????????????? ???? ???? ???????? ??????????????, ?????????? ????
                        ???????????? ???? ???? ???????????? .???????? <br />
                        ???????? ?????????? ???? ???????????? ?????????? ???? ?????????? ?????????? ?????????? ?????? ????
                        ???????????? ???? ???????????????????? ??/???? ?????????? .???????????? ??????????
                      </p>
                    </div>
                    <Paragraf style={{ marginTop: "20px" }}>
                      ?????????? ?????????? ???? ?????? ?????? ????
                    </Paragraf>
                    <WrapperInput>
                      <Input
                        style={
                          errors.claim_amount && { border: "1px solid red" }
                        }
                        {...register("claim_amount", { required: true })}
                        as="input"
                        type="text"
                        placeholder={"???????? ????????????"}
                      />
                    </WrapperInput>
                    <Paragraf
                      style={{ marginBottom: "30px", marginTop: "-10px" }}
                    >
                      ?????????? ???? ???????? ???????? ?????????? ????
                    </Paragraf>
                    <Paragraf>
                      ?????????? ?????????? ???? ?????? ???????? ?????????? ???????? ???????? ??????????
                    </Paragraf>
                    <Paragraf>????"?? ???????????? ?????????? ????????</Paragraf>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#1D3557",
                        marginTop: "25px",
                      }}
                    >
                      ???? ????????????
                    </p>
                    <WrapperInput>
                      <Input
                        as="input"
                        type="date"
                        placeholder={"??????????"}
                        {...register("document_date", { required: true })}
                      />
                    </WrapperInput>
                    <WrapperInput>
                      <Input
                        as="input"
                        type="text"
                        placeholder={`???? ????????????`}
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
                      ?????????? ???????????? (?????????? ???? ????????)
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
                      {currentPage === 4 ? "????????" : "???????? ???????? ??????"}
                    </Button>
                    <div
                      className="back__step__"
                      onClick={() => {
                        if (currentPage !== 1) {
                          setIscurrent(true);
                        }
                      }}
                    >
                      ???????? ??????????
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <FormBefore
        isReset={isReset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsLoading={setIsLoading}
        firstPage={5}
        storageName={reportStorageName}
        storagePage={isActivePage}
        suppliyerType={6}
      />

      {(currentPage === 6 || iscurrent) && (
        <div className="event_received_container">
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalHeaderIconWrapper style={{ direction: "ltr" }}>
                  <img src={ModalIcon} alt="" />
                  <ModalHeaderTitle>?????????? ?????????? ??????????</ModalHeaderTitle>
                </ModalHeaderIconWrapper>
              </ModalHeader>
              <ModalBody style={{ marginBottom: "0" }}>
                <p>???????? ???????????? ??????:</p>
                <h1>
                  {report?.report?.insurance_case?.id ??
                    reportStorage?.report?.insurance_case?.id}
                </h1>
                <p style={{ marginBottom: "40px" }}>
                  ???????????? ???????? ?????????? ?????????? <br /> ?????????? 24 ?????????? ??????????????
                </p>
                {iscurrent && (
                  <Button onClick={() => setIscurrent(false)}>????????</Button>
                )}
                <Button
                  onClick={() => {
                    if (currentPage === 6) {
                      localStorage.removeItem(reportStorageName);
                      localStorage.removeItem(isActivePage);
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
                  ????????
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}

      <PdfModal
        event_type={"???? ??????????"}
        data={reportStorage?.report}
        open={openPdf}
        setOpen={setOpenPdf}
        sign_picture={drawing}
      />
    </AccidentForm>
  );
}

export default ThreeDPerson;
