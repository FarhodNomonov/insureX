import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../../components/Ui/Header";
import { List, CalendarIcon, EmailTwo, Logo } from "../../../components/icon";
import { HomeContainer } from "./style";
import { CalendarAppreiser } from "../../../components/icon";

function HomePage() {
  const clientMessage = [];

  const Appraiser = useSelector(({ user }) => user?.user);

  return (
    <>
      <Header
        bg="#444444"
        head="יישומון שמאי"
        text={`שלום ${Appraiser?.first_name}`}
        title="מסך ראשי"
      />
      <HomeContainer>
        <div className="client">
          <div className="client_body">
            <div className="anchor__card__cont">
              <NavLink to={"/appraiser/messages"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <EmailTwo />
                </div>
                <div className="anchor__card__text">
                  <h1>דואר </h1>
                  <p>יש לך {clientMessage?.length} הודעות חדשות</p>
                </div>
              </NavLink>
              <NavLink to={"/appraiser/calendar"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <CalendarAppreiser />
                </div>
                <div className="anchor__card__text">
                  <h1>יומן</h1>
                </div>
              </NavLink>

              <NavLink to={"/appraiser/cases-list"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <CalendarIcon />
                </div>
                <div className="anchor__card__text">
                  <h1>אירועים</h1>
                  <h1>פתוחים</h1>
                </div>
              </NavLink>

              <NavLink to={"/appraiser/archives"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <List />
                </div>
                <div className="anchor__card__text">
                  <h1>ארכיון </h1>
                </div>
              </NavLink>

              <div className="logo__center__">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </HomeContainer>
    </>
  );
}

export default HomePage;
