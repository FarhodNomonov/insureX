import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../../../components/Ui/Header";
import Footer from "../../../components/Ui/FooterComponent";
import {
  CheckBoxIcon,
  CloudUpload,
  PaginationNextIcon,
  Camera,
  Galery,
} from "../../../components/icon";
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
import { AccidentForm, Paragraf } from "../CarAccident/style";
import { onSavePhoto } from "../../../utils/requestApi";
import FormBefore from "../../../components/Steps/FormBefore";
import PdfModal from "../../../components/Ui/Pdf";
import UseCamera from "../../../hook/useCamera";
import { Message } from "../../../utils/messages";
let report = { report: {} };

function Burglarys({
  propertyId = 2,
  typeId = 9,
  reportStorageName = "",
  isActivePage = "",
  namePage = "",
}) {
  const location = useLocation();
  const navigate = useNavigate();
  let personData = JSON.parse(localStorage.getItem("insured_person")) ?? {};
  let reportStorage = JSON.parse(localStorage.getItem(reportStorageName));

  const [currentPage, setCurrentPage] = React.useState(
    Number(localStorage.getItem(isActivePage) ?? 1) ?? 1
  );
  const [agentPhone, setAgentPhone] = React.useState({});
  const [companyAgentId, setCompanyAgentId] = React.useState(null);
  const [openCamera, setOpenCamera] = React.useState(false);

  // saving data for api

  const [drawing, setDrawing] = React.useState(null);
  const [openPdf, setOpenPdf] = React.useState(false);

  // isLoading Loader

  const [isLoading, setIsLoading] = React.useState(false);

  // get data from api

  const [companyAgent, setCompanyAgent] = React.useState([]);
  const [cityId, setCityId] = React.useState("");
  const [iscurrent, setIscurrent] = React.useState(false);
  const Person = JSON.parse(localStorage.getItem("insured_person"));
  const [insCompData, setInsCompData] = React.useState([]);
  const [changeCmpId, setChangeCmpId] = React.useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  React.useInsertionEffect(() => {
    localStorage.setItem(isActivePage, currentPage);
    reset();
  }, [currentPage]);

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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeCmpId]);

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
  const [isReset, setIsReset] = React.useState(true);

  const onSubmit = (data) => {
    setIsReset(false);
    if (!reportStorage?.report?.insurance_case?.id) {
      const dataForm = {
        insured_person_id: personData?.id,
        property_type_id: propertyId,
        event_type_id: typeId,
        document_date: new Date().toISOString(),
        status_id: 1,
        agent_phone: agentPhone?.phone,
      };
      postRequest("/insurance-case", getFormData(dataForm)).then(
        ({ message }) => {
          report.report.insurance_case = {
            ...reportStorage.report.insurance_case,
            id: message?.insurance_case?.id,
            insured_person_id: personData.id,
            policy: data?.policy,
            agent_id: companyAgentId ?? Person?.agent_id ?? null,
            city_id: personData?.city_id ?? cityId?.id,
            city: cityId.city_name,
            status_id: 1,
          };
          console.log(report);
          localStorage.setItem(reportStorageName, JSON.stringify(report));
          //messageOther(message?.insurance_case?.id, "other");
        }
      );
    }
    if (currentPage === 1) {
      if (agentPhone) {
        report.report.insurance_case = {
          ...reportStorage.report.insurance_case,
          agent_id:
            companyAgentId ??
            agentPhone?.id ??
            reportStorage?.report?.insurance_case?.agent_id,
          policy: data.policy,
          agent_phone: agentPhone?.phone,
          document_date: new Date().toISOString(),
          insured_person_id: personData?.id,
          city_id: personData?.city_id ?? cityId.id,
        };
        console.log(report);
        localStorage.setItem(reportStorageName, JSON.stringify(report));
      }
      reset();
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 2) {
      report.report.insurance_case = {
        ...reportStorage.report.insurance_case,
        address: data.address,
        details: data?.details,
        date: `${data.date} : ${data.time}`,
        time: data.time,
        incident_date: data.date,
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
      report.report.incident_participants = {
        insurance_case_ids: reportStorage?.report?.insurance_case?.id,
        police: data?.police === "true",
      };
      report.report.burglary_details = {
        insurance_case_ids: reportStorage?.report?.insurance_case?.id,
        has_evidences: data.has_evidences === "true",
      };
      console.log(report);
      localStorage.setItem(reportStorageName, JSON.stringify(report));
      reset();
      setCurrentPage(currentPage + 1);
    }

    if (currentPage === 4) {
      setOpenPdf(true);
      report.report.insurance_case = {
        ...reportStorage.report.insurance_case,
        document_date: data.document_date,
        whose_signature: data.whose_signature,
        claim_amount: data.claim_amount,
        status_id: 3,
      };
      const Requests = () => {
        setIsLoading(true);
        if (report.report.burglary_details) {
          postRequest(
            `/insurance-case/${
              reportStorage?.report?.insurance_case?.id ??
              report?.report?.insurance_case?.id
            }/bulgary-details`,
            getFormData(report.report.burglary_details)
          );
        }
        if (report.report.incident_participants) {
          postRequest(
            `/incident-participant`,
            getFormData(report.report.incident_participants)
          );
        }
        postRequest("/estate", getFormData(report.report.estate));
        report.report.insurance_case.status_id = 3;
        const PatchData = report.report.insurance_case;
        delete PatchData?.id;
        PatchData.role = "customer";
        patchRequest(
          `/insurance-case/${
            reportStorage?.report?.insurance_case?.id ??
            report?.report?.insurance_case?.id
          }`,
          getFormData(PatchData)
        ).then(({ error }) => {
          if (!error) {
            patchRequest(
              `/insured-persons/${personData?.id}`,
              getFormData({ sign_picture: drawing })
            ).then((res) => {
              if (!res.error) {
                setIsLoading(false);
              }
            });
          }
        });
      };
      reset();
      Requests();
      setCurrentPage(currentPage + 1);
      console.log(report);
      localStorage.setItem(reportStorageName, JSON.stringify(report));
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
      setValue("address", personData?.address);
    } else setValue("address", "");
  }, [currentPage]);

  React.useInsertionEffect(() => {
    if (reportStorage?.report?.insurance_case?.id) {
      report = {
        ...reportStorage,
      };
      // console.clear();
      console.log(reportStorage);
      localStorage.setItem(reportStorageName, JSON.stringify(report));
    }
  }, [reportStorage?.report?.insurance_case?.id]);
  // setCurrentPage;

  React.useInsertionEffect(() => {
    report.report.insurance_case = {
      ...reportStorage?.report?.insurance_case,
      agent_phone:
        agentPhone?.phone ?? reportStorage?.report?.insurance_case?.agent_phone,
    };
    localStorage.setItem(reportStorageName, JSON.stringify(report));
  }, [agentPhone?.phone, currentPage]);

  React.useInsertionEffect(() => {
    if (companyAgentId) {
      getRequest(`/agents/select?id=${companyAgentId}`).then((res) => {
        setAgentPhone(res?.message?.agents?.find((status) => !status.delete));
      });
    }
  }, [companyAgentId]);

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
      setValue("details", reportStorage?.report?.insurance_case?.details);
      setValue("time", reportStorage?.report?.insurance_case?.time);
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
        "police",
        `${reportStorage?.report?.incident_participants?.police}`
      );
      setValue(
        "has_evidences",
        `${reportStorage?.report?.burglary_details?.has_evidences}`
      );
    }
  }, [currentPage]);

  return (
    <AccidentForm className="flex__column__ h-100">
      {isLoading && <Loader />}
      <div>
        <Header
          title="?????????? ?????????? ???????? - ?????????? / ??????????"
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
                // onClick={() => setCurrentPage(currentPage > 2 ? 3 : currentPage)}
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
                    ? "?????????? ?????????? ??????????/??????????"
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
                    <WrapperInput>
                      <Input
                        {...register("agent_phone")}
                        as="input"
                        type="text"
                        defaultValue={agentPhone?.phone}
                        placeholder={"?????????? ??????????"}
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
                        defaultValue={personData?.address ?? ""}
                        placeholder={"??????????"}
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
                        style={errors.has_evidences && { color: "red" }}
                      >
                        ?????? ?????????? ???????????? ?????????????????
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="has_evidences"
                          type="radio"
                          label="????"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="has_evidences"
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
                        style={errors.police && { color: "red" }}
                      >
                        ?????? ?????????? ?????????????
                      </p>
                      <div className="radio_button_group_container">
                        <CheckBoxIcon
                          name="police"
                          type="radio"
                          label="????"
                          value="true"
                          checked={false}
                          register={register}
                          required={true}
                        />
                        <CheckBoxIcon
                          name="police"
                          type="radio"
                          label="????"
                          value="false"
                          checked={false}
                          register={register}
                          required={true}
                        />
                      </div>
                      <p
                        style={{
                          color: "#1D3557",
                          fontWeight: 500,
                          fontSize: "16px",
                          marginBottom: "20px",
                        }}
                      >
                        (???????? ???????? ???????? ?????????? ?????????? ??????????)
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 4 && (
                  <>
                    <div className="policyholder_container">
                      <p>
                        ?????? ???????????? ???????????? ?????????????? ?????????? ????????????, ?????? ???? ????????
                        ??????????/?????????? ?????????? ???????? ???????????? ????"??, ?????? ???????? ????????. ??????????
                        ?????????? ???? ???? ???????????? ???????????? ???????? ???????????? ???????????????? ?????? ????
                        ???????????? ???? ?????????? ???????? ???????? ????????????. ?????? ???????? ???? ????????
                        ?????????????? ???????? ?????????? ???? ???????????? ???????????? ??/???? ???? ???????? ??????????
                        ???????????? ??????????, ???????????? ?????????? ???????? ???????????? ???? ?????????? ??????????
                        ???????? ???????????? ?????????? ????????????. ?????????? ?????????? ???? ???????? ???? ??????????
                        ???????? ?????? ?????????? ???????????? ?????? ???????? ??"?? ???? ??' ??/???? ???? ??????????
                        ?????????? ???????????????? ???? ???? ?????????? ?????????? ?????????? ???????????? ???????? 68
                        ???????? ???????? ???????????? ??????"?? 1981. ???????? ???????????? ???????????? ???? ??????
                        ???????????????? ???????????? ????"?? ???????? ??????????????, ?????? ???? ???????? ???????????? ????
                        ??????????.
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
                    <Paragraf>???????? ?????????? ???????????? ??"????</Paragraf>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#1D3557",
                        marginTop: "25px",
                      }}
                    >
                      ??????????
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
                        placeholder={`?????????? ???????? ??"??`}
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
                        // setCurrentPage(
                        //   currentPage > 1 ? currentPage - 1 : currentPage
                        // );
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
        namePage={namePage}
        suppliyerType={6}
      />

      {(currentPage === 6 || iscurrent) && (
        <div className="event_received_container">
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalHeaderIconWrapper>
                  <img src={ModalIcon} alt="" />
                  <ModalHeaderTitle>?????????? ?????????? ??????????</ModalHeaderTitle>
                </ModalHeaderIconWrapper>
              </ModalHeader>
              <ModalBody>
                <p>???????? ???????????? ??????:</p>
                <h1>
                  {reportStorage?.report?.insurance_case?.id ??
                    report?.report?.insurance_case?.id}
                </h1>
                <p>
                  ???????? ???????????? ???????? ???????????? <br /> ?????????? 24 ?????????? ??????????????
                </p>
                {iscurrent && (
                  <Button onClick={() => setIscurrent(false)}>????????</Button>
                )}
                <Button
                  onClick={() => {
                    if (currentPage === 6) {
                      localStorage.removeItem(reportStorageName);
                      localStorage.removeItem(isActivePage);
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
                  ????????
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
      <Footer />
      <PdfModal
        event_type={"?????????? / ??????????"}
        data={reportStorage?.report}
        open={openPdf}
        setOpen={setOpenPdf}
        sign_picture={drawing}
      />
    </AccidentForm>
  );
}

export default Burglarys;
