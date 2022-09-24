import StartLayout from "../StartLayout/StartLayout";
import { Link } from "react-router-dom";
import Button from "../../../components/Ui/Button/Button";

function NotFoundPage({ role = localStorage.getItem("role"), user = false }) {
  const isRole = ["customer", "none"].includes(role) ? false : true;
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
        <Link to={!user ? `/login${`${isRole ? `/${role}` : ""}`}` : "/"}>
          <Button>{"דף הבית"}</Button>
        </Link>
      </div>
    </StartLayout>
  );
}

export default NotFoundPage;
