import React from "react";
import { useNavigate } from "react-router-dom";
import UseCamera from "../../hook/useCamera";
import CustomSelect from "../../components/Ui/CustomSelect";
import { WrapperInput, Input } from "../../components/Ui/FormElements/Styles";
import {
  CityCache,
  getFormData,
  getRequest,
  onSavePhoto,
  patchRequest,
  postRequest,
  RegionCache,
} from "../../utils/requestApi";
import {
  AccordArrowIcon,
  AdderIcon,
  Camera,
  CheckBoxIcon,
  Phone,
  Search,
  Galery,
  CloudUpload,
} from "../../components/icon";
import DrawerCanvas from "../../components/Ui/drawerCanvas";
import DrawerUser from "../../components/Ui/DrawerPodpis";
import {
  Modal,
  ModalHeader,
  ModalHeaderTitle,
} from "../../pages/sdp/register/style";
import {
  ModalBody,
  ModalContent,
  ModalHeaderIconWrapper,
} from "../../pages/customer/register/style";
import Button from "../../components/Ui/Button/Button";
import ModalIcon from "../../assets/img/modalIcon.svg";
import { SearchWrapper } from "../../pages/customer/messages/style";

import { SelectComponent } from "../../components/Ui/FormElements/FormElements";
import { Message } from "../../utils/messages";

export const FirstStep = ({
  propertyTypeData,
  errors,
  register,
  control,
  personData,
  cityId,
  currentPage,
  reportStorage,
  insCompData,
  watch,
}) => {
  const [company, setCompany] = React.useState([]);
  const [companyFiltered, setCompanyFiltered] = React.useState([]);

  React.useInsertionEffect(() => {
    if (personData?.insurance_company_persons_id) {
      getRequest(`/agents/select?delete=false`)
        .then((res) => {
          if (!res?.error) {
            const customData = res?.message?.agents
              ?.filter((cp) =>
                cp?.insurance_company_ids?.map((item) =>
                  personData?.insurance_company_persons_id?.includes(item)
                )
              )
              .map((item) => {
                return {
                  value: item?.id,
                  label: `${item?.first_name} ${item?.second_name}`,
                  insurance_company_ids: item?.insurance_company_ids,
                };
              });
            setCompany(customData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [personData?.insurance_company_persons_id]);
  const watchedValueCompany = watch("insurance_company_id")?.value;

  React.useEffect(() => {
    if (!watchedValueCompany) return setCompanyFiltered(company);
    setCompanyFiltered(
      company?.filter((fs) =>
        fs.insurance_company_ids?.includes(Number(watchedValueCompany))
      )
    );
  }, [watchedValueCompany, company]);

  return (
    <>
      {currentPage === 1 && (
        <>
          <CustomSelect
            style={errors.insurance_company_id && { border: "1px solid red" }}
            rules={{ required: true }}
            name={`insurance_company_id`}
            control={control}
            placeholder={"חברת ביטוח"}
            options={insCompData ?? []}
            // defaultValue={insCompData?.find((response) => response.value === 1)}
          />
          <CustomSelect
            isLoading={propertyTypeData.length === 0 ? true : false}
            style={errors.automobile_type_id && { border: "1px solid red" }}
            rules={{ required: true }}
            name={`automobile_type_id`}
            control={control}
            placeholder={"סוג הרכב"}
            options={propertyTypeData ?? []}
            // defaultValue={propertyTypeData?.find(
            //   (response) => response.value === 1
            // )}
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
              style={errors.year && { border: "1px solid red" }}
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
            isLoading={companyFiltered?.length === 0 ? true : false}
            style={errors.agent_id && { border: "1px solid red" }}
            rules={{ required: true }}
            name={`agent_id`}
            control={control}
            placeholder={"שם הסוכן"}
            options={companyFiltered ?? []}
            defaultValue={companyFiltered?.find(
              (data) =>
                data.value === reportStorage?.report?.insurance_case?.agent_id
            )}
          />
          {/* case patches */}

          {/* insured person data start */}
          <WrapperInput>
            <Input
              style={errors.username && { border: "1px solid red" }}
              {...register("username")}
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
              style={errors.passport_id && { border: "1px solid red" }}
              {...register("passport_id")}
              as="input"
              type="text"
              defaultValue={personData?.passport_id ?? ""}
              placeholder={"מספר"}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              style={errors.address && { border: "1px solid red" }}
              {...register("address")}
              as="input"
              type="text"
              defaultValue={personData?.address ?? ""}
              placeholder={"כתובת"}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              as="input"
              type="text"
              defaultValue={cityId.city_name ?? ""}
              placeholder={"עיר"}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              style={errors.phone && { border: "1px solid red" }}
              {...register("phone")}
              as="input"
              type="text"
              defaultValue={personData?.phone ?? ""}
              placeholder={"טלפון"}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              style={errors.email && { border: "1px solid red" }}
              {...register("email")}
              as="input"
              type="text"
              defaultValue={personData?.email ?? ""}
              placeholder={"דואר אלקטרוני"}
            />
          </WrapperInput>
        </>
      )}
      {/* insured person data end */}
    </>
  );
};

export const SecondStep = ({ errors, register, currentPage }) => {
  return (
    <>
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
          <p style={{ fontWeight: 600, color: "#1D3557" }}>תאריך לידה*</p>
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
              style={errors.phone && { border: "1px solid red" }}
              {...register("phone", { required: true })}
              as="input"
              type="text"
              placeholder={`טלפון נייד*`}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              style={errors.license_number && { border: "1px solid red" }}
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
    </>
  );
};

export const ThirdStep = ({
  errors,
  register,
  currentPage,
  setIsLoading,
  drawerImage,
  setDrawerImage,
}) => {
  const reportStorage = JSON.parse(localStorage.getItem("accident"));
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [indexes, setIndexes] = React.useState([0]);
  const [counter, setCounter] = React.useState(1);
  const [openCamera, setOpenCamera] = React.useState(false);

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
  return (
    <>
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
          <p style={{ fontWeight: 600, color: "#1D3557" }}>תאריך האירוע*</p>
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
            <p className="radio_button_group_title">האם היה מעורב באירוע?</p>
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
                          reportStorage?.report?.insurance_case?.id,
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
                          reportStorage?.report?.insurance_case?.id,
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

              <div className="upload_files_container mt-10" onClick={addFriend}>
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
    </>
  );
};

export const FourthStep = ({ currentPage, register, control }) => {
  const [indexes, setIndexes] = React.useState([0]);
  const [counter, setCounter] = React.useState(1);

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };
  const removeFriend = (index) => () => {
    if (indexes.length > 1) {
      setIndexes((prevIndexes) => [
        ...prevIndexes.filter((item) => item !== index),
      ]);
      setCounter((prevCounter) => prevCounter - 1);
    }
  };
  return (
    <>
      {currentPage === 4 && (
        <>
          {indexes.map((res, i) => {
            const injuryData = `injuryData[${res}]`;
            return (
              <fieldset name={injuryData} key={injuryData}>
                <WrapperInput>
                  <Input
                    {...register(`${injuryData}.first_name`)}
                    as="input"
                    type="text"
                    placeholder={"שם פרטי"}
                  />
                </WrapperInput>
                <WrapperInput>
                  <Input
                    {...register(`${injuryData}.last_name`)}
                    as="input"
                    type="text"
                    placeholder={"שם משפחה"}
                  />
                </WrapperInput>
                <WrapperInput>
                  <Input
                    {...register(`${injuryData}.passport_id`)}
                    as="input"
                    type="text"
                    placeholder={`מס' ת"ז`}
                  />
                </WrapperInput>
                <WrapperInput>
                  <Input
                    {...register(`${injuryData}.address`)}
                    as="input"
                    type="text"
                    placeholder={`כתובת הנפגע`}
                  />
                </WrapperInput>
                <CustomSelect
                  name={`${injuryData}.city_ids`}
                  control={control}
                  options={CityCache() ?? []}
                  defaultValue={
                    JSON.parse(localStorage.getItem("accident"))?.report
                      ?.victim[i]?.city_ids
                  }
                  placeholder="עיר"
                />
                <WrapperInput>
                  <Input
                    {...register(`${injuryData}.phone`)}
                    as="input"
                    type="number"
                    placeholder={`טלפון`}
                  />
                </WrapperInput>
                {indexes.length > 1 && (
                  <button
                    style={i === 0 ? { display: "none" } : {}}
                    className="btn_remove"
                    type="button"
                    onClick={removeFriend(res)}
                  >
                    להסיר
                  </button>
                )}
              </fieldset>
            );
          })}

          <div className="upload_files_container mt-10" onClick={addFriend}>
            <div className="upload_files_container_item">
              <div className="icon__upload__">
                <AdderIcon />
              </div>
              <p className="fs-16 fw-500">נפגע נוסף</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const FifthStep = ({ register, currentPage }) => {
  return (
    <>
      {currentPage === 5 && (
        <>
          <WrapperInput>
            <Input
              {...register("license_number", {
                required: false,
              })}
              as="input"
              type="text"
              placeholder={"מספר רישוי"}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              {...register("names", {
                required: false,
              })}
              as="input"
              type="text"
              placeholder={"שם הניזוק"}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              {...register("passport_number", {
                required: false,
              })}
              as="input"
              type="text"
              placeholder={`מס' ת"ז`}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              {...register("car_model", {
                required: false,
              })}
              as="input"
              type="text"
              placeholder={`תוצרת דגם / סוג הרכב`}
            />
          </WrapperInput>
          <WrapperInput>
            <Input
              {...register("phone", {
                required: false,
              })}
              as="input"
              type="number"
              placeholder={`טלפון`}
            />
          </WrapperInput>

          <div className="radio_button_group">
            <p className="radio_button_group_title">
              הנני מעוניין כי תביעת צד ג' שתוגש כנגדי
              <br />
              תטופל/תשולם על ידי החברה
            </p>
            <div className="radio_button_group_container">
              <CheckBoxIcon
                name="is_sue"
                type="radio"
                label="כן"
                value={true}
                checked={false}
                register={register}
                required={false}
              />
              <CheckBoxIcon
                name="is_sue"
                type="radio"
                label="לא"
                value={false}
                checked={false}
                register={register}
                required={false}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const SixthStep = ({ register, currentPage, setDrawing }) => {
  return (
    <>
      {currentPage === 6 && (
        <>
          <div className="policyholder_container">
            <p>
              אני מתחייב להתקשר ולהודיע לחברת הביטוח, מיד עם קבלת הודעה/תביעה
              כלשהי בקשר לתאונה הנ"ל, מכל גורם שהוא. הריני מצהיר כי כל הפרטים
              שמסרתי היום נכונים ומדויקים וכי לא העלמתי כל עובדה ופרט בקשר
              לתאונה. אני מאשר כי הובא לידיעתי ואני מסכים כי הפרטים שמסרתי ו/או
              כל מידע שיגיע לידיעת החברה, יוחזקו במאגר מידע ממוחשב בו נוהגת
              החברה לרכז נתונים בנושא הביטוח. הריני מייפה את כוחה של החברה לטפל
              בכל תביעה עתידית אשר תוגש ע"י צד ג' ו/או מי מטעמו כנגדי ובהסכמתי
              זו יש לראות הסכמה בהתאם לדרישת סעיף 68 לחוק חוזה הביטוח תשמ"א
              1981. הנני מתחייב להעביר את דמי ההשתתפות העצמית עפ"י תנאי הפוליסה,
              מיד עם קבלת הדרישה מן החברה.
            </p>
          </div>
          <p
            style={{
              fontWeight: 600,
              color: "#1D3557",
              marginTop: "10px",
            }}
          >
            תאריך
          </p>
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
    </>
  );
};

export const SuccessStep = ({
  setCurrentPage,
  isSaved = false,
  isBack = () => {},
  IsActiveId = "",
}) => {
  const navigate = useNavigate();
  return (
    <>
      {isSaved && (
        <div className="event_received_container">
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalHeaderIconWrapper>
                  <img src={ModalIcon} alt="" />
                  <ModalHeaderTitle>דיווח אירוע התקבל</ModalHeaderTitle>
                </ModalHeaderIconWrapper>
              </ModalHeader>
              <ModalBody>
                <p>מספר האירוע הוא:</p>
                <h1>{IsActiveId}</h1>
                <p>
                  יש להשלים את הטופס
                  <br /> לצורך קבלת מספר תביעה
                  <br /> והפקדת הרכב במוסך
                </p>
                <Button
                  onClick={() => {
                    if (isSaved) {
                      isBack(false);
                    }
                  }}
                >
                  השלם את הטופס עכשיו
                </Button>
                <Button
                  onClick={() => {
                    if (isSaved) {
                      postRequest(
                        "/insurance-case/messages/create",
                        getFormData({
                          type: "web-client",
                          ms_text: Message.msCustomer20(IsActiveId, IsActiveId),
                          customer_id: JSON.parse(
                            localStorage.getItem("insured_person") ?? "{}"
                          )?.id,
                          is_case_id: IsActiveId,
                          id: Math.floor(Math.random() * 100),
                          date_time: new Date(),
                        })
                      );
                      patchRequest(
                        `/insurance-case/${IsActiveId}`,
                        getFormData({
                          status_id: 2,
                        })
                      );
                      navigate(
                        "/" + localStorage.getItem("role") ?? "customer"
                      );
                      // localStorage.removeItem("accident");
                      // localStorage.removeItem("accidentPage");
                    } else setCurrentPage(9);
                  }}
                >
                  השלם מאוחר יותר
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};

export const FormBeforeSubmit = ({
  currentPage,
  setCurrentPage,
  setIsLoading,
  IsActiveId,
  isActivePage,
  isReset = false,
}) => {
  if (currentPage === isActivePage && isReset) {
    localStorage.removeItem("accidentPage");
    localStorage.removeItem("accident");
    window.location.reload();
  }
  const navigate = useNavigate();
  const [insidentCompany, setInsidentCompany] = React.useState(false);
  const [sdpData, setSdpData] = React.useState([]);
  const [sdpDataFiltered, setSdpDataFiltered] = React.useState([]);
  const [cityId, setCityId] = React.useState(null);
  const [regionId, setRegionId] = React.useState(null);
  const [inputText, setInputText] = React.useState("");
  const [isSdpPhone, setIsSdpPhone] = React.useState(null);

  React.useEffect(() => {
    getRequest("/sdp?delete=false").then(({ message }) => {
      setSdpDataFiltered(message?.sdp);
    });
  }, []);

  React.useEffect(() => {
    if (cityId) {
      if (regionId) {
        setSdpData(
          sdpDataFiltered
            ?.filter((fs) => fs.supplier_type_ids?.includes(5))
            ?.filter(
              (resp) => resp.city_id === cityId && resp.region_id === regionId
            )
        );
      } else {
        setSdpData(
          sdpDataFiltered
            ?.filter((fs) => fs.supplier_type_ids?.includes(5))
            ?.filter((resp) => resp.city_id === cityId)
        );
      }
    }
    if (regionId) {
      if (cityId) {
        setSdpData(
          sdpDataFiltered
            ?.filter((fs) => fs.supplier_type_ids?.includes(5))
            ?.filter(
              (resp) => resp.city_id === cityId && resp.region_id === regionId
            )
        );
      } else {
        setSdpData(
          sdpDataFiltered
            ?.filter((fs) => fs.supplier_type_ids?.includes(5))
            ?.filter((resp) => resp.region_id === regionId)
        );
      }
    } else if (!cityId && !regionId)
      setSdpData(
        sdpDataFiltered?.filter((fs) => fs.supplier_type_ids?.includes(5))
      );
  }, [cityId, regionId, sdpDataFiltered]);

  const filteredData = sdpData?.filter((el) => {
    //if no input the return the original
    if (inputText === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return (
        el.first_name?.toLowerCase().includes(inputText) ||
        el.second_name?.toLowerCase().includes(inputText)
      );
    }
  });

  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  React.useInsertionEffect(() => {
    document.getElementById("root").scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const SdpPatch = (id) => {
    if (IsActiveId && id) {
      setIsLoading(true);
      let agentData = {};
      getRequest(
        `/agetns/select?id=${
          JSON.parse(localStorage.getItem("accident") ?? "{}")?.report
            ?.insurance_case?.agent_id
        }`
      ).then(
        ({ messages }) =>
          (agentData = messages?.agents[0] ? messages.agents[0] : {})
      );
      patchRequest(`/insurance-case/sdp/${IsActiveId}/${id}`)
        .then((__respons) => {
          if (!__respons.error) {
            setIsLoading(false);
            postRequest(
              "/insurance-case/messages/create",
              getFormData({
                type: "web-client",
                ms_text: Message.msCustomer30(
                  sdpDataFiltered?.find((res) => Number(res.id) === Number(id))
                    ?.first_name,
                  IsActiveId,
                  "תאונת דרכים",
                  JSON.parse(localStorage.getItem("insured_person") ?? "{}")
                    ?.first_name
                ),
                ms_agent_text: Message.msAgent30(
                  sdpDataFiltered?.find((res) => Number(res.id) === Number(id))
                    ?.first_name,
                  IsActiveId,
                  "תאונת דרכים",
                  agentData?.first_name
                ),
                spec_id: id,
                agent_id: JSON.parse(localStorage.getItem("accident") ?? "{}")
                  ?.report?.insurance_case?.agent_id,
                case_type: "other",
                id: Math.floor(Math.random() * 100),
                customer_id: JSON.parse(
                  localStorage.getItem("insured_person") ?? "{}"
                )?.id,
                is_case_id: IsActiveId,
                date_time: new Date(),
              })
            );
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {currentPage === 7 && (
        <div className="form_before">
          <SearchWrapper>
            <input type="text" onChange={inputHandler} placeholder="חיפוש" />
            <Search />
          </SearchWrapper>
          <WrapperInput style={{ margin: "10px 0" }}>
            <SelectComponent
              name={`city_id`}
              placeholder="אזור"
              value={CityCache() ?? []}
              setRselect={setCityId}
              defaultValue={CityCache().filter((item) => item.value === cityId)}
              setValue={CityCache().filter((item) => item.value === cityId)}
            />
          </WrapperInput>
          <WrapperInput style={{ margin: "10px 0" }}>
            <SelectComponent
              name={`region_id`}
              placeholder="אזור"
              value={RegionCache() ?? []}
              setRselect={setRegionId}
              defaultValue={RegionCache().filter(
                (item) => item.value === regionId
              )}
              setValue={RegionCache().filter((item) => item.value === regionId)}
            />
          </WrapperInput>
          {(cityId || regionId) && (
            <Button
              style={{
                marginBottom: 10,
              }}
              onClick={() => {
                setRegionId(null);
                setCityId(null);
              }}
            >
              כל המומחים
            </Button>
          )}
          <div className="list_search_result">
            {sdpData?.length === 0 && <p>לא נמצאו תוצאות</p>}

            {(inputText.length > 0 ? filteredData : sdpData).map((item) => {
              return (
                <div
                  onClick={() => setInsidentCompany(item?.id)}
                  key={item?.id}
                  className={`list_search_result__item ${
                    insidentCompany === item?.id ? "active" : ""
                  }`}
                >
                  <p>{`${item?.first_name} ${item?.second_name}`}</p>
                  <AccordArrowIcon />
                </div>
              );
            })}
          </div>
          {insidentCompany && (
            <div className="list_btn_bottom">
              <Button
                onClick={() => {
                  setInsidentCompany(false);
                  setCurrentPage(currentPage + 1);
                  SdpPatch(insidentCompany);
                }}
                className="list_btn"
              >
                הזמנת גרר
              </Button>
              <Button
                onClick={() => {
                  SdpPatch(insidentCompany);
                  localStorage.removeItem("accident");
                  localStorage.removeItem("accidentPage");
                  navigate("/", { replace: true });
                }}
                className="list_btn"
              >
                הגעה עצמית למוסך
              </Button>
            </div>
          )}
        </div>
      )}
      {currentPage === 8 && (
        <div className="form_before">
          <h1>הזמנת גרר</h1>
          <div className="form_before__content">
            {isSdpPhone && (
              <a href={`tel:${isSdpPhone}`}>
                <div className="phone_title">
                  <h1>{isSdpPhone}</h1>
                  <p style={{ lineHeight: "16px" }}>התקשר לגרר משה ובניו</p>
                </div>
                <div className="phone_svg">
                  <Phone />
                </div>
              </a>
            )}
            <SearchWrapper>
              <input type="text" onChange={inputHandler} placeholder="חיפוש" />
              <Search />
            </SearchWrapper>
            <WrapperInput style={{ margin: "10px 0" }}>
              <SelectComponent
                name={`city_id`}
                placeholder="אזור"
                value={CityCache() ?? []}
                setRselect={setCityId}
                defaultValue={CityCache().filter(
                  (item) => item.value === cityId
                )}
              />
            </WrapperInput>
            <WrapperInput style={{ margin: "10px 0" }}>
              <SelectComponent
                name={`city_id`}
                placeholder="אזור"
                value={RegionCache() ?? []}
                setRselect={setRegionId}
                defaultValue={RegionCache().filter(
                  (item) => item.value === regionId
                )}
              />
            </WrapperInput>
            <div className="list_search_result list_space_bettween">
              {(inputText.length > 0 ? filteredData : sdpData).map((item) => {
                return (
                  <div
                    onClick={() => {
                      setInsidentCompany(item?.id);
                      setIsSdpPhone(item?.phone);
                    }}
                    key={item?.id}
                    className={`list_search_result__item ${
                      insidentCompany === item?.id ? "active" : ""
                    }`}
                  >
                    <div className="list_search_svg">
                      <Phone />
                    </div>
                    <div className="list_search_result__item_in">
                      <p>{`${item?.first_name} ${item?.second_name}`}</p>
                      <AccordArrowIcon />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "25px" }} className="list_btn_bottom">
              <Button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  localStorage.removeItem("accident");
                  localStorage.removeItem("accidentPage");
                  navigate("/", { replace: true });
                }}
              >
                סגור את החלון
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
