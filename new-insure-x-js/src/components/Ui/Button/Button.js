import * as s from "./Styles";

const Button = ({
  variant,
  children,
  theme = {
    colors: { primaryDarken: "#132339", primary: "#1d3557" },
  },
  onClick,
  ...props
}) => {
  return (
    <s.Box {...props} variant={variant} theme={theme}>
      <button {...props} onClick={onClick}>
        {children}
      </button>
    </s.Box>
  );
};

export default Button;
