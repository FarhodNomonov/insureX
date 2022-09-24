import { Controller } from "react-hook-form";
import Select from "react-select";
import { WrapperInput } from "../../../components/Ui/FormElements/Styles";
import * as s from "../FormElements/Styles";


function CustomSelect({
  name = "",
  control,
  rules = {},
  options = [],
  placeholder = "",
  styles = {},
  defaultValue,
  isLoading = false,
  isMulti = false,
  ...props
}) {
  return (
    <WrapperInput style={styles}>
      <Controller
        {...props}
        name={`${name}`}
        control={control}
        rules={rules}
        render={({ field }) => (
          <s.Select
            as={Select}
            isLoading={isLoading}
            styles={{
              control: (styles) => ({
                ...styles,
                height: "100%",
                boxShadow: "inset 0px 4px 4px rgb(0 0 0 / 25%)",
                borderRadius: "8px",
                color: "#000",
                padding: "10px",
                fontSize: "24px",
                border: "none",
                fweight: "500",
              }),
            }}
            placeholder={placeholder}
            {...field}
            options={options ?? []}
            defaultValue={defaultValue}
            isMulti={isMulti}
            menuPosition={'fixed'}
          />
        )}
      />
    </WrapperInput>
  );
}

export default CustomSelect;
