import React from "react";
import { useSelector } from "react-redux";
import Footer from "../FooterComponent";
import * as Icons from "../../icon";

const WithFooterComponent = ({ Component }) => {
  const user = useSelector(({ user }) => user);
  const links = {
    agent: [
      {
        title: "ראשי",
        link: "/",
        icon: <Icons.Home />,
      },
      {
        title: "דואר",
        link: "/messages",
        icon: <Icons.Email message={user?.new_massage} />,
      },
      {
        title: "אירועי לקוחות",
        link: "/events",
        icon: <Icons.CalendarIcon />,
      },
      {
        title: "פתח אירוע",
        link: "/person-list",
        icon: <Icons.FlagIcon />,
      },
      {
        title: "ארכיון",
        link: "/archive",

        icon: <Icons.List />,
      },
    ],
    sdp: [
      {
        title: "ראשי",
        link: "/",
        icon: <Icons.Home />,
      },
      {
        title: "דואר",
        link: "/messages",
        icon: <Icons.Email message={user?.new_massage} />,
      },
      {
        title: "יומן",
        link: "/calendar",
        icon: <Icons.CalendarAppreiser />,
      },
      {
        title: user?.user?.supplier_type_ids?.some((item) => Number(item) === 5)
          ? "אירועים במוסך"
          : "אירועים בטיפול",
        link: "/open-event",
        icon: <Icons.CalendarIcon />,
      },
      {
        title: user?.user?.supplier_type_ids?.some((item) => Number(item) === 5)
          ? " אירועים בדרך"
          : "ממתינים  לטיפול",
        link: "/event-list-wait",
        icon: <Icons.TimerSpec />,
      },
    ],
    appraiser: [
      {
        title: "ראשי",
        link: "/",
        icon: <Icons.Home />,
      },
      {
        title: "דואר",
        link: "/messages",
        icon: <Icons.Email message={user?.new_massage} />,
      },
      {
        title: "אירועי לקוחות",
        link: "/cases-list",
        icon: <Icons.CalendarIcon />,
      },
      {
        title: "פתח אירוע",
        link: "/calendar",
        icon: <Icons.CalendarAppreiser />,
      },
      {
        title: "ארכיון",
        link: "/archives",
        icon: <Icons.List />,
      },
    ],
  };
  return (
    <div className="flex__column__ h-100">
      {Component()}
      <Footer links={links[user?.role]} />
    </div>
  );
};

export default WithFooterComponent;
