import StartLayout from "../StartLayout/StartLayout";
import { Link } from "react-router-dom";
import Button from "components/Ui/Button/Button";

function Splash({ role = localStorage.getItem("role") }) {
  return (
    <StartLayout bigText="" textSmall="העמוד לא נמצא" textBg="">
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Link to={`/auth/sign-in/${role ?? "customer"}`}>
          <Button>{"קישור להרשמה או לדף הבית"}</Button>
        </Link>
      </div>
    </StartLayout>
  );
}

export default Splash;
