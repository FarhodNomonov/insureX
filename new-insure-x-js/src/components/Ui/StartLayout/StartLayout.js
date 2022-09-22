import * as s from "./Styles";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";

const StartLayout = ({
  children,
  textSmall = "יישומון",
  textBg = "fff",
  bigText = "מבוטח",
}) => {
  return (
    <s.Box>
      <s.LogoArea>
        <s.Logo as={Logo} />
        <s.SubText style={{ background: textBg }}>
          <div className="inner">
            {textSmall}
            <small>{bigText}</small>
          </div>
        </s.SubText>
      </s.LogoArea>
      {children}
    </s.Box>
  );
};

export default StartLayout;
