import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Header from "../../../components/Ui/Header";
import { ReadSms, Search, Unread } from "../../../components/icon";
import {
  MessageBody,
  MessageHeader,
  MessagesContainer,
  MessagesWrapper,
  SearchWrapper,
} from "./style";
import Button from "../../../components/Ui/Button/Button";
import Footer, { socket } from "../../../components/Ui/FooterComponent";
import { setMessage } from "../../../redux/reducer/messages";
import { getRequest } from "../../../utils/requestApi";

function Messages() {
  const dispatch = useDispatch();
  const data = useSelector(({ messages }) => messages);
  const Person = useSelector(({ user }) => user?.user);
  const [clientMessage, setClientMessage] = React.useState(data ?? []);

  React.useInsertionEffect(() => {
    socket.on("message-send", (msg) => {
      if (msg.type && Number(msg.customer_id) === Number(Person.id)) {
        setClientMessage([...data, msg]);
      }
    });
  }, [Person.id]);

  React.useInsertionEffect(() => {
    getRequest("/push/messages").then(({ messages }) => {
      dispatch(
        setMessage(
          messages?.filter(
            (_respons) =>
              Number(_respons.customer_id) === Number(Person?.id) &&
              _respons.type
          )
        )
      );
      setClientMessage(
        messages?.filter(
          (_respons) =>
            Number(_respons.customer_id) === Number(Person?.id) && _respons.type
        )
      );
    });
  }, []);

  return (
    <div className="client">
      <Header text={`שלום ${Person?.first_name}`} title="דואר" />
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
                    <p className="text__message">{item?.ms_text}</p>
                    <div className="text__message">פרטי הודעה:</div>
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
                      {item?.messageNew ? <ReadSms /> : <Unread />}
                    </div>
                  </MessageHeader>
                  <NavLink to={`/events/${item?.is_case_id}`}>
                    <Button>{"פרטי האירוע"}</Button>
                  </NavLink>
                </MessageBody>
              </MessagesWrapper>
            ))}
        </MessagesContainer>
      </div>
      <Footer />
    </div>
  );
}

export default Messages;
