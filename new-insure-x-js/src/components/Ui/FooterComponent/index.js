import React from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import {
//  toast,
//   useToasterStore,
// } from "react-hot-toast";
import { Email, List, Localition, Home } from "../../../components/icon";
import { FooterWrapper } from "./footer.styled";
// import { _URL } from "../../../utils/requestApi";
// import CallerModal from "../CallerModal";
// import {
//   setScreenShot,
//   setAppraiserId,
// } from "../../../redux/reducer/takeScreenShotReducer";

import { setNewMessage } from "../../../redux/reducer/user";

export const socket = io("https://api.insurextest.link", { reconnect: true });

function Footer({ links = [] }) {
  // const { toasts } = useToasterStore();
  const location = useLocation();
  // const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  // const [call, setCall] = React.useState(true);
  // react-redux store state

  // const clientMessage = [];

  // localStorage items
  // const insuredPerson = JSON.parse(
  //   localStorage.getItem("insured_person") || "{}"
  // );
  // const AgentStorage = JSON.parse(localStorage.getItem("agent") || "{}");
  // const SdpStorage = JSON.parse(localStorage.getItem("sdp") || "{}");
  // const AppraiserStorage = JSON.parse(
  //   localStorage.getItem("appraiser") || "{}"
  // );
  // const [isCAll, setIsCAll] = React.useState({});
  const isReadMessage = useSelector(({ user }) => user?.new_massage);

  // function getRoleIdForMessage() {
  //   if (role === "customer") {
  //     return insuredPerson?.id;
  //   } else if (role === "agent") {
  //     return AgentStorage?.id;
  //   } else if (role === "sdp") {
  //     return SdpStorage?.id;
  //   } else if (role === "appraiser") {
  //     return AppraiserStorage?.id;
  //   }
  // }

  // let storageMessage = clientMessage ?? [];

  // React.useEffect(() => {
  //   socket.on("screen", (res) => {
  //     if (
  //       role === "sdp" &&
  //       Number(res?.sdp_id) === Number(getRoleIdForMessage()) &&
  //       res.screen
  //     ) {
  //       dispatch(setScreenShot(true));
  //       dispatch(setAppraiserId(res?.appraiser_id));
  //     }
  //     if (
  //       role === "appraiser" &&
  //       Number(res?.appraiser_id) === Number(getRoleIdForMessage()) &&
  //       res.screenshot &&
  //       res?.screen_url
  //     ) {
  //       toast.success("screen shot received google drive 📸");
  //     }
  //   });
  // }, []);

  // React.useEffect(() => {
  //   toasts
  //     .filter((t) => t.visible)
  //     .filter((_, i) => i >= 1)
  //     .forEach((t) => toast.dismiss(t.id));
  // }, [toasts]);

  // React.useEffect(() => {
  //   socket.on("message-send", (msg) => {
  //     storageMessage = [...storageMessage, msg];
  //     if (role === "sdp") {
  //       if (Number(getRoleIdForMessage()) === Number(msg?.sdp_id)) {
  //         if (msg?.call === "true") {
  //           // setCall(true);
  //           // setIsCAll(msg);
  //         }
  //         // toast.success("צילום מסך צולם 📩");
  //       }
  //     }
  //   });
  // }, []);

  const footerLinks = [
    {
      title: "ראשי",
      link: "/",
      icon: <Home />,
    },
    {
      title: "דואר",
      link: "/messages",
      icon: <Email message={isReadMessage} />,
    },
    {
      title: "סטאטוס",
      link: "/status",
      icon: <Localition />,
    },
    {
      title: "ארכיון",
      link: "/events",
      icon: <List />,
    },
  ];

  return (
    <FooterWrapper>
      {/* <CallerModal isOpen={call} msg={isCAll} setCall={setCall} /> */}
      <div className="footer">
        <div className="footer-content">
          {(links.length === 0 ? footerLinks : links).map((item, i) => {
            return (
              <Link
                className={item?.link === location.pathname ? "active" : ""}
                key={item?.title}
                to={item?.link}
                onClick={() => {
                  if (i === 1) {
                    dispatch(setNewMessage(false));
                  }
                }}
              >
                <div>{item?.icon}</div>
                <p>{item?.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
