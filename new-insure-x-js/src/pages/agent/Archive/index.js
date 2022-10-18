import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Ui/Header";
import { Search } from "../../../components/icon";
import {
  AgentArchiveTitle,
  MessageBody,
  MessageHeader,
  MessagesContainer,
  MessagesWrapper,
  SearchWrapper,
} from "./styles";
import Button from "../../../components/Ui/Button/Button";
import { getRequest } from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";

function Archive() {
  const navigate = useNavigate();
  let agent = JSON.parse(localStorage.getItem("agent"));
  const [eventData, setEventData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const Agent = JSON.parse(localStorage.getItem("agent"));

  React.useInsertionEffect(() => {
    getRequest(`/insured-persons?agent_id=${agent?.id}`)
      .then((res) => {
        setEventData(res?.message?.insured_persons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loginFromPerson = (data) => {
    setIsLoading(true);
    getRequest(`/insured-persons/temporary/authorization/${data?.login_id}`)
      .then((res) => {
        localStorage.setItem(
          "insured_person",
          JSON.stringify(res?.message?.user?.insured_person)
        );
        setIsLoading(false);
        navigate("/agent/report", { replace: true });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const List = ({ item }) => {
    return (
      <MessagesWrapper>
        <MessageBody>
          <MessageHeader className={`fwe-600 ${isLoading ? "isloading" : ""}`}>
            <p className="text__message">
              {isLoading ? "" : `${item?.first_name} ${item?.second_name}`}
            </p>
          </MessageHeader>
          <div className="row">
            <small>מס' טלפון:</small>
            <p>{item?.phone}</p>
          </div>
          <Button onClick={() => loginFromPerson(item)}>פתח אירוע</Button>
        </MessageBody>
      </MessagesWrapper>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="client">
        <Header
          bg="#561D57"
          head="יישומון סוכן"
          text={`שלום ${Agent?.first_name}`}
          title="פתיחת אירוע"
        />
        <div>
          <AgentArchiveTitle>
            <h1>בחר מבוטח</h1>
          </AgentArchiveTitle>
          <MessagesContainer className="messages__body__">
            <SearchWrapper className="messages__search__bar">
              <input type="text" placeholder="חיפוש" />
              <Search />
            </SearchWrapper>
            {eventData.map((item, i) => (
              <List item={item} key={item?.id ?? i} />
            ))}
          </MessagesContainer>
        </div>
      </div>
    </>
  );
}

export default Archive;
