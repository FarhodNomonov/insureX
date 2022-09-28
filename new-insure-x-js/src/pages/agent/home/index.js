import { useState, useInsertionEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../../../components/Ui/Header";
import {
  List,
  CalendarIcon,
  EmailTwo,
  FlagIcon,
  Logo,
} from "../../../components/icon";
import { HomeContainer } from "./style";
import { getRequest } from "../../../utils/requestApi";

function HomePage() {
  const clientMessage = useSelector(({ messages }) => messages);
  const [eventCount, setEventCount] = useState(0);
  const Agent = useSelector(({ user }) => user?.user);

  useInsertionEffect(() => {
    getRequest(`/insurance-case/?agent_id=${Agent?.id}`).then(({ message }) => {
      setEventCount(
        message?.insurance_cases?.filter((_status) => !_status.delete)?.length
      );
    });
  }, [Agent?.id]);

  return (
    <>
      <Header
        bg="#561D57"
        head="יישומון סוכן"
        text={`שלום ${Agent?.first_name}`}
        title="מסך ראשי"
      />
      <HomeContainer>
        <div className="client">
          <div className="client_body">
            <div className="anchor__card__cont">
              <NavLink to={"/agent/messages"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <EmailTwo />
                </div>
                <div className="anchor__card__text">
                  <h1>דואר </h1>
                  <p>יש לך {clientMessage?.length} הודעות חדשות</p>
                </div>
              </NavLink>
              <NavLink to={"/agent/events"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <CalendarIcon />
                </div>
                <div className="anchor__card__text">
                  <h1>אירועי לקוחות</h1>
                  <p>
                    יש לך {eventCount} <br /> אירועים פתוחים
                  </p>
                </div>
              </NavLink>
              <NavLink to={"/agent/person-list"} className="anchor__card__">
                <div className="anchor__card__icon">
                  <FlagIcon />
                </div>
                <div className="anchor__card__text">
                  <h1>פתח אירוע </h1>
                </div>
              </NavLink>
              <NavLink to={"/agent/archive"} className="anchor__card__">
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
