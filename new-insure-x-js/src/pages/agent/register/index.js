import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/Ui/FormElements/Styles";
import StartLayout from "../../../components/Ui/StartLayout/StartLayout";
import Headline from "../../../components/Ui/Headline/Headline";
import Button from "../../../components/Ui/Button/Button";
import ModalIcon from "../../../assets/img/modalIcon.svg";
import {
  errorMessage,
  getFormData,
  getRequest,
  postRequest,
  postSignInAgent,
  successMessage,
} from "../../../utils/requestApi";
import { FormLayout } from "../../../components/Ui/FormElements/FormElements";
import {
  WrapperInput,
  Modal,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
  ModalBody,
  CloseButton,
  SelectCheckboxWrapper,
  SelectCheckboxContainer,
  SelectCheckboxBody,
  SelectCheckbox,
} from "./style";
import { CheckBoxIcon, SelectArrow } from "../../../components/icon";
import Loader from "../../../components/Ui/Loading/loader";
import CustomSelect from "../../../components/Ui/CustomSelect";

const SignIn = () => {
  const navigate = useNavigate();
  const [company, setCompany] = React.useState([]);

  const [succes, setSucces] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [regionData, setRegionData] = React.useState([]);

  React.useInsertionEffect(() => {
    getRequest("/insurance-companies").then(({ message }) => {
      const dataSelect = message?.insurance_companies?.map((item) => {
        return {
          value: item?.id,
          label: item?.title,
        };
      });
      setCompany(dataSelect);
    });
    getRequest("/regions").then(({ message }) => {
      const dataSelect = message?.regions?.map((item) => {
        return {
          value: item?.id,
          label: item?.region_name,
        };
      });
      setRegionData(dataSelect);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [modalSelect, setModalSelect] = React.useState(errors?.insurance_company_ids ? true : false);

  React.useEffect(() => {
    setModalSelect(errors?.insurance_company_ids ? true : false)
    return () =>
      document.removeEventListener(
        "click",
        window.addEventListener("click", () => setModalSelect(false))
      );
  }, [errors?.insurance_company_ids]);



  const SendMessage = (data = {}) => {
    if (!data?.id) return;
    let formData = {
      admin_type: "insurance_companies",
      user_name: data?.first_name,
      user_id: data?.id,
      user_type: "agent",
      id: Math.floor(Math.random() * 10000),
      insurance_company_ids: data?.insurance_company_ids,
      date_time: new Date(),
    };
    postRequest("/insurance-case/messages/create", getFormData(formData));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    data.region_id = data?.region_id?.value;
    data.insurance_company_ids = `{${data.insurance_company_ids}}`;
    postSignInAgent(getFormData(data), setSucces, setIsLoading)
      .then((data) => {
        SendMessage(data?.message?.agent);
        if (data.message.token) {
          reset();
          setSucces(true);
          successMessage("????????????!");
          setIsLoading(false);
          console.clear();
        }
        if (!data?.message?.token) {
          setIsLoading(false);
          errorMessage("???? ?????????? ???? ?????????? ????????????");
        }
      })
      .catch(() => {
        setIsLoading(false);
        errorMessage("???? ?????????? ???? ?????????? ????????????");
      });
  };

  return (
    <StartLayout bigText="????????" textBg="#561D57">
      {isLoading && <Loader />}
      {succes && (
        <Modal style={{ display: "flex" }}>
          <ModalContent>
            <ModalHeader>
              <ModalHeaderIconWrapper>
                <img src={ModalIcon} alt="" />
                <ModalHeaderTitle>???????????? ??????????</ModalHeaderTitle>
              </ModalHeaderIconWrapper>
            </ModalHeader>
            <ModalBody>
              ???????????? ?????????? <br />
              ???????????? ?????????????? <br />
              ???????????? ????????????
            </ModalBody>
            <div style={{ marginBottom: "30px" }}>
              <div onClick={() => navigate("/login/agent", { replace: true })}>
                <Button>
                  <CloseButton>{"????????"}</CloseButton>
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
      <div className="wrap contentWrap">
        <FormLayout>
          <Headline>{"??????????"}</Headline>
          <form onSubmit={handleSubmit(onSubmit)}>
            <WrapperInput>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setModalSelect(!modalSelect);
                }}
              >
                <SelectCheckbox>
                  <p>?????? ???????? ??????????.</p>
                  <SelectArrow open={modalSelect} />
                </SelectCheckbox>
              </div>
              <SelectCheckboxContainer
                style={
                  modalSelect
                    ? { display: "flex" }
                    : {
                        display: "none",
                      }
                }
              >
                <SelectCheckboxBody>
                  {company.length === 0 && "No data"}
                  {company.length > 0 &&
                    company.map((item) => {
                      return (
                        <SelectCheckboxWrapper key={item.value}>
                          <div className="select_checkbox_custom__add">
                            <CheckBoxIcon
                              name="insurance_company_ids"
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
                placeholder={"???? ??????????*"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.second_name && { border: "1px solid red" }}
                {...register("second_name", { required: true })}
                as="input"
                type="text"
                placeholder={"???? ??????????*"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.passport_id && { border: "1px solid red" }}
                {...register("passport_id", { required: true })}
                as="input"
                type="text"
                placeholder={"???????? ????????*"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.phone && { border: "1px solid red" }}
                {...register("phone", { required: true })}
                as="input"
                type="tel"
                placeholder={"?????????? ????????*"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.email && { border: "1px solid red" }}
                {...register("email", { required: true })}
                as="input"
                type="email"
                placeholder={"???????? ????????????????*"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.address && { border: "1px solid red" }}
                {...register("address", { required: true })}
                as="input"
                type="text"
                placeholder={"??????????"}
              />
            </WrapperInput>

            <CustomSelect
              styles={errors.region_id && { border: "1px solid red" }}
              placeholder={"???????? ????????"}
              rules={{ required: true }}
              control={control}
              name="region_id"
              options={regionData ?? []}
            />
            <WrapperInput>
              <Input
                style={errors.employee_number && { border: "1px solid red" }}
                {...register("employee_number", { required: true })}
                as="input"
                type="number"
                placeholder={"???????? ??????????????"}
              />
            </WrapperInput>
            <Button>{"????????"}</Button>
          </form>
          <Link to="/login/agent">
            <Button variant="ghost">{"??????????"}</Button>
          </Link>
        </FormLayout>
      </div>
    </StartLayout>
  );
};

export default SignIn;
