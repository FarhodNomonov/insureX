import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  errorMessage,
  getFormData,
  postLogin,
  successMessage,
} from "../../../utils/requestApi";
import { Input } from "../../../components/Ui/FormElements/Styles";
import StartLayout from "../../../components/Ui/StartLayout/StartLayout";
import Headline from "../../../components/Ui/Headline/Headline";
import Button from "../../../components/Ui/Button/Button";
import { FormLayout } from "../../../components/Ui/FormElements/FormElements";
import { CheckBoxIcon } from "../../../components/Icons";
import Loader from "../../../components/Ui/Loading/loader";
import { setUser, setRole } from "../../../redux/reducer/user";
import { WrapperInput } from "./style";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    delete data.oferta;
    data.role = "insured_person";
    postLogin(getFormData(data))
      .then((__respons) => {
        setIsLoading(false);
        if (__respons?.error) return errorMessage("שם משתמש או סיסמה שגויים");
        if (__respons?.message?.user?.insured_person) {
          setIsLoading(false);
          successMessage("בהצלחה!");
          localStorage.setItem("token", __respons?.message?.token);
          localStorage.setItem("role", "customer");
          dispatch(setRole("customer"));
          dispatch(setUser(__respons?.message?.user?.insured_person));
          localStorage.setItem(
            "insured_person",
            JSON.stringify(__respons?.message?.user?.insured_person ?? {})
          );
          localStorage.setItem(
            "user",
            JSON.stringify(__respons?.message?.user ?? {})
          );
          reset();
          navigate("/customer", { replace: false });
        } else {
          setIsLoading(false);
          errorMessage("שם משתמש או סיסמה שגויים");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <StartLayout textBg="">
      <div className="wrap contentWrap" >
        {isLoading && <Loader />}
        <FormLayout>
          <Headline>{"כניסה"}</Headline>
          <form onSubmit={handleSubmit(onSubmit)}>
            <WrapperInput>
              <Input
                style={errors.username && { border: "1px solid red" }}
                {...register("username", { required: true })}
                as="input"
                type="text"
                placeholder={"תעודת זהות"}
              />
            </WrapperInput>
            <WrapperInput>
              <Input
                style={errors.password && { border: "1px solid red" }}
                {...register("password", { required: true })}
                as="input"
                type="text"
                placeholder={"טלפון"}
              />
            </WrapperInput>
            <div
              style={{
                margin: "10px 0px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span style={errors.oferta && { color: "red" }}>
                {"תנאי שימוש"}
              </span>
              <CheckBoxIcon
                name="oferta"
                type="checkbox"
                label=""
                checked={false}
                register={register}
                required={false}
              />
            </div>
            <div
              style={{
                margin: "10px 0px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            ></div>
            <Button type="submit">{"התחבר"}</Button>
          </form>

          <Link to="/auth/sign-in/customer">
            <Button variant="ghost">{"משלב"}</Button>
          </Link>
        </FormLayout>
      </div>
    </StartLayout>
  );
};

export default Login;
