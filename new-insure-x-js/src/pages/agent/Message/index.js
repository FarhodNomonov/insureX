import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { socket } from "../../../components/Ui/FooterComponent";
import Header from "../../../components/Ui/Header";
import { ReadSms, Search, Unread } from "../../../components/icon";
import {
  MessageBody,
  MessageHeader,
  MessagesContainer,
  MessagesWrapper,
  SearchWrapper,
} from "./styles";
import Button from "../../../components/Ui/Button/Button";
import { setMessage } from "../../../redux/reducer/messages";
import { _URL } from "../../../utils/requestApi";

function Messages() {
  const dispatch = useDispatch();
  const data = useSelector(({ message }) => message);
  const Agent = JSON.parse(localStorage.getItem("agent") ?? "{}");
  const [clientMessage, setClientMessage] = React.useState(data ?? []);

  React.useInsertionEffect(() => {
    socket.on("message-send", (msg) => {
      if (msg.type && Number(msg.agent_id) === Number(Agent.id)) {
        setClientMessage([...data, msg]);
      }
    });
  }, []);

  React.useInsertionEffect(() => {
    axios.get(`${_URL}/push/messages`).then(({ data }) => {
      dispatch(
        setMessage(
          data?.messages.filter(
            (_respons) =>
              Number(_respons.agent_id) === Number(Agent?.id) && _respons.type
          )
        )
      );
      setClientMessage(
        data?.messages.filter(
          (_respons) =>
            Number(_respons.agent_id) === Number(Agent?.id) && _respons.type
        )
      );
    });
  }, []);

  return (
    <>
      <div className="client">
        <Header
          bg="#561D57"
          head="יישומון סוכן"
          text={`שלום ${Agent?.first_name}`}
          title="תיבת הודעות"
        />
        <div style={{ minHeight: "70vh" }}>
          <MessagesContainer className="messages__body__">
            <SearchWrapper className="messages__search__bar">
              <input type="text" placeholder="חיפוש" />
              <Search />
            </SearchWrapper>
            {[...clientMessage]
              ?.sort(function (a, b) {
                return (
                  moment(b.date_time).format("X") -
                  moment(a.date_time).format("X")
                );
              })
              .map((item, i) => (
                <MessagesWrapper key={i}>
                  <MessageBody>
                    <MessageHeader>
                      <p
                        style={
                          item?.read
                            ? { color: "#999999", fontWeight: "400" }
                            : {}
                        }
                        className="text__message"
                      >
                        {item?.ms_agent_text}
                      </p>
                      <div
                        style={
                          item?.read
                            ? { color: "#999999", fontWeight: "400" }
                            : {}
                        }
                        className="text__message"
                      >
                        פרטי הודעה:
                      </div>
                    </MessageHeader>
                    <MessageHeader>
                      <p
                        className="text__message"
                        style={{
                          direction: "ltr",
                        }}
                      >
                        {moment(new Date(item?.date_time)).format(
                          "DD MMMM YYYY , LTS"
                        )}
                      </p>
                      <div className="__message_staus__icon">
                        {item?.read ? <ReadSms /> : <Unread />}
                      </div>
                    </MessageHeader>
                    <NavLink to={`/agent/events/${item?.is_case_id}`}>
                      <Button>{"פרטי האירוע"}</Button>
                    </NavLink>
                  </MessageBody>
                </MessagesWrapper>
              ))}
          </MessagesContainer>
        </div>
      </div>
    </>
  );
}

export default Messages;
