import * as s from "./Styles";
import Select from "react-select";

export const SelectComponent = ({
  placeholder,
  setRselect,
  value,
  defaultValue,
  isClearable = false,
  setValue = null,
  ...props
}) => {
  const customInputStyle = {
    control: (styles) => ({
      ...styles,
      height: "100%",
      border: "none",
      boxShadow: "inset 0px 4px 4px rgb(0 0 0 / 25%)",
      borderRadius: "8px",
      padding: "0 .4em",
      color: "#000",
    }),
  };
  return setValue ? (
    <s.Select
      {...props}
      styles={customInputStyle}
      as={Select}
      options={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => setRselect(e.value)}
      isClearable={isClearable}
      value={setValue}
      menuPosition={"fixed"}
    />
  ) : (
    <s.Select
      {...props}
      styles={customInputStyle}
      as={Select}
      options={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => setRselect(e.value)}
      isClearable={isClearable}
      menuPosition={"fixed"}
    />
  );
};

export const Input = ({ name, placeholder, value }) => {
  return (
    <s.Input
      name={name}
      value={value}
      placeholder={placeholder}
      as="input"
      type="text"
    />
  );
};

export const FormLayout = ({ children }) => {
  return <s.FormBox>{children}</s.FormBox>;
};
