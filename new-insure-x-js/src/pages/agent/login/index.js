import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../../../components/Ui/FormElements/Styles";
import StartLayout from "../../../components/Ui/StartLayout/StartLayout";
import Headline from "../../../components/Ui/Headline/Headline";
import Button from "../../../components/Ui/Button/Button";
import { FormLayout } from "../../../components/Ui/FormElements/FormElements";
import { WrapperInput } from "./style";
import {
  errorMessage,
  postLogin,
  successMessage,
} from "../../../utils/requestApi";
import { CheckBoxIcon } from "../../../components/icon";
import Loader from "../../../components/Ui/Loading/loader";
import { setRole, setUser } from "../../../redux/reducer/user";

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
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("role", "agent");
    postLogin(formData)
      .then((res) => {
        if (!res?.message?.user?.agent?.authentification) {
          setIsLoading(false);
          toast.error("החשבון שלך אינו מאומת");
          return false;
        }
        if (!res?.error && res?.message?.user?.agent) {
          setIsLoading(false);
          localStorage.setItem("token", res?.message?.token);
          localStorage.setItem("role", "agent");
          localStorage.setItem("user", JSON.stringify(res?.message?.user));
          localStorage.setItem(
            "agent",
            JSON.stringify(res?.message?.user?.agent)
          );
          dispatch(setRole("agent"));
          successMessage("בהצלחה!");
          dispatch(setUser(res?.message?.user?.agent));
          navigate("/", { replace: true });
          reset();
        } else {
          setIsLoading(false);
          errorMessage("שם משתמש או סיסמה שגויים");
        }
      })
      .catch((err) => {
        console.log(err, "err");
        setIsLoading(false);
      });
  };

  return (
    <StartLayout bigText="סוכן" textBg="#561D57">
      {isLoading && <Loader />}
      <div className="wrap contentWrap">
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
              <span
                style={errors.oferta ? { color: "red" } : { color: "#1d3557" }}
              >
                {"תנאי שימוש"}
              </span>
              <CheckBoxIcon
                name="oferta"
                type="checkbox"
                label=""
                checked={false}
                register={register}
                required={true}
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
            <Button>{"התחבר"}</Button>
          </form>

          <Link to="/sign-in/agent">
            <Button variant="ghost">משלב</Button>
          </Link>
        </FormLayout>
      </div>
    </StartLayout>
  );
};

export default Login;
