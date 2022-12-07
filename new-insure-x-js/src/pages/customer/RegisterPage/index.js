import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/Ui/FormElements/Styles";
import StartLayout from "../../../components/Ui/StartLayout/StartLayout";
import Headline from "../../../components/Ui/Headline/Headline";
import Button from "../../../components/Ui/Button/Button";
import ModalIcon from "../../../assets/img/modalIcon.svg";
import {
  FormLayout,
  SelectComponent,
} from "../../../components/Ui/FormElements/FormElements";
import {
  WrapperInput,
  Modal,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
  ModalBody,
  CloseButton,
} from "./style";
import {
  errorMessage,
  getFormData,
  postRequest,
  postSignInCustomer,
  successMessage,
  getRequest,
} from "../../../utils/requestApi";
import CustomSelect from "../../../components/Ui/CustomSelect";
import Loader from "../../../components/Ui/Loading/loader";
import {
  SelectCheckbox,
  SelectCheckboxBody,
  SelectCheckboxContainer,
  SelectCheckboxWrapper,
} from "../../sdp/register/style";
import { CheckBoxIcon, SelectArrow } from "../../../components/icon";
import { setRole, setUser } from "../../../redux/reducer/user";
import { CityCache } from "./../../../utils/requestApi";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = React.useState([]);
  const [agentData, setAgentData] = React.useState([]);
  const [region, setRegion] = React.useState();
  const [succes, setSucces] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalSelect, setModalSelect] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const SendMessage = (data = {}) => {
    if (!data?.id) return;
    let formData = {
      admin_type: "insurance_company",
      user_name: data?.first_name,
      user_id: data?.id,
      user_type: "persons",
      id: Math.floor(Math.random() * 10000),
      insurance_company_id: data?.insurance_company_id,
      date_time: new Date(),
    };
    postRequest("/insurance-case/messages/create", getFormData(formData));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (region) {
      data.insurance_company_id = data.insurance_company_persons_id[0];
      data.insurance_company_persons_id = `{${data.insurance_company_persons_id}}`;
      data.agent_id = data?.agent_id?.value ?? "";
      data.city_id = region ?? "";
      data.role = "insured_person";
      postSignInCustomer(getFormData(data)).then((__res) => {
        if (__res?.message?.token) {
          SendMessage(__res?.message?.insured_person);
          setIsLoading(false);
          setSucces(true);
          localStorage.setItem("token", __res?.message?.token);
          dispatch(setUser(__res?.message?.insured_person));
          localStorage.setItem(
            "insured_person",
            JSON.stringify(__res?.message?.insured_person)
          );
          successMessage("בהצלחה!");
        } else {
          setIsLoading(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("insured_person");
          errorMessage("שם משתמש או סיסמה שגויים");
        }
      });
      if (succes) {
        reset();
      }
    } else {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setModalSelect(errors?.insurance_company_persons_id);
    return () =>
      document.removeEventListener(
        "click",
        window.addEventListener("click", () => setModalSelect(false))
      );
  }, [errors?.insurance_company_persons_id]);

  React.useInsertionEffect(() => {
    getRequest("/insurance-companies").then(({ message }) => {
      const customOptions = message?.insurance_companies
        ?.filter((s) => !s.delete)
        ?.map((item) => ({
          value: item.id,
          label: item.title,
        }));
      setCompany(customOptions ?? []);
    });
    getRequest("/agents/select").then(({ message }) => {
      const customOptions = message?.agents
        ?.filter((s) => !s.delete)
        ?.map((item) => ({
          value: item.id,
          label: item.first_name,
        }));
      setAgentData(customOptions ?? []);
    });
  }, []);
  return (
    <StartLayout style={isLoading ? { opacity: "0.3" } : {}}>
      {isLoading && <Loader />}
      {succes && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalHeaderIconWrapper>
                <img src={ModalIcon} alt="" />
                <ModalHeaderTitle>הפרטים נקלטו</ModalHeaderTitle>
              </ModalHeaderIconWrapper>
            </ModalHeader>
            <ModalBody>הפרטים נקלטו במערכת וההרשמה בוצעה בהצלחה!</ModalBody>
            <div style={{ marginBottom: "30px" }}>
              <div
                onClick={() => {
                  navigate("/");
                  localStorage.setItem("role", "customer");
                  dispatch(setRole("customer"));
                }}
              >
                <Button>
                  <CloseButton>{"סגור"}</CloseButton>
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
      <div className="wrap contentWrap">
        <FormLayout>
          <Headline>{"כניסה"}</Headline>
          <form onSubmit={handleSubmit(onSubmit)}>
            <WrapperInput>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setModalSelect(!modalSelect);
                }}
                style={modalSelect ? { zIndex: 25 } : {}}
              >
                <SelectCheckbox style={modalSelect ? { zIndex: 25 } : {}}>
                  <p
                    style={
                      errors.insurance_company_persons_id
                        ? { color: "red" }
                        : {}
                    }
                  >
                    חברת ביטוח
                  </p>
                  <SelectArrow open={modalSelect} />
                </SelectCheckbox>
              </div>
              <SelectCheckboxContainer
                style={modalSelect ? { display: "flex" } : { display: "none" }}
              >
                <SelectCheckboxBody>
                  {company.length > 0 &&
                    company.map((item) => {
                      return (
                        <SelectCheckboxWrapper key={item.value}>
                          <div className="select_checkbox_custom__add">
                            <CheckBoxIcon
                              name="insurance_company_persons_id"
                              type="checkbox"
                              label={item?.label}
                              checked={false}
                              register={register}
                              required={true}
                              value={item?.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalSelect(true);
                              }}
                            />
                          </div>
                        </SelectCheckboxWrapper>
                      );
                    })}
                </SelectCheckboxBody>
              </SelectCheckboxContainer>
            </WrapperInput>

            <WrapperInput>
              <Input
                style={errors.first_name && { border: "1px solid red" }}
                {...register("first_name", { required: true })}
                as="input"
                type="text"
                placeholder={"שם פרטי*"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.second_name && { border: "1px solid red" }}
                {...register("second_name", { required: true })}
                as="input"
                type="text"
                placeholder={`שם משפחה*`}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.passport_id && { border: "1px solid red" }}
                {...register("passport_id", { required: true })}
                as="input"
                type="text"
                placeholder={`מספר ת"ז*`}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.phone && { border: "1px solid red" }}
                {...register("phone", { required: true })}
                as="input"
                type="number"
                placeholder={"טלפון נייד*"}
              />
            </WrapperInput>

            <WrapperInput>
              <Input
                style={errors.address && { border: "1px solid red" }}
                {...register("address", { required: true })}
                as="input"
                type="text"
                placeholder={"רחוב ומספר*"}
              />
            </WrapperInput>
            <WrapperInput>
              <SelectComponent
                value={CityCache() ?? []}
                placeholder={"עיר"}
                setRselect={setRegion}
              />
            </WrapperInput>

            <WrapperInput>
              <Input
                style={errors.email && { border: "1px solid red" }}
                {...register("email", { required: true })}
                as="input"
                type="email"
                placeholder={"דואר אלקטרוני*"}
              />
            </WrapperInput>
            <CustomSelect
              style={errors.agent_id && { border: "1px solid red" }}
              rules={{ required: true }}
              name={`agent_id`}
              control={control}
              placeholder={"בחירת סוכן - הקלד שם*"}
              options={agentData ?? []}
            />
            <Button>{"הרשם"}</Button>
          </form>
          <Link to="/login">
            <Button variant="ghost">{"להירשם מאוחר יותר"}</Button>
          </Link>
        </FormLayout>
      </div>
    </StartLayout>
  );
};

export default SignIn;
