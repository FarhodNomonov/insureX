import React from "react";
import Home from "../pages/customer/home";
import ReportPage from "../pages/customer/report";
import SignInCustomer from "../pages/customer/register";
import LoginCustomer from "../pages/customer/login";
import LoginAppraiser from "../pages/appraiser/login";
import SignInAgent from "../pages/agent/register";
import LoginAgent from "../pages/agent/login";
import MessagesCustomer from "../pages/customer/messages";
import StatusCustomer from "../pages/customer/status";
import EventsCustomer from "../pages/customer/events";
import EventDocsCustomer from "../pages/customer/event-docs";
import HomeAgent from "../pages/agent/home";
import WithFooterComponent from "../components/Ui/WithFooter";
import Accident from "../pages/customer/accident";
import Burglarys from "../pages/customer/Burglarys";
import CarBurglary from "../pages/customer/CarBurg";
import FireDamage from "../pages/customer/FireDamage";
import NatureHome from "../pages/customer/NatureHome";


const CustomerRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/report",
    element: <ReportPage />,
  },
  {
    path: "/messages",
    element: <MessagesCustomer />,
  },
  {
    path: "/status",
    element: <StatusCustomer />,
  },
  {
    path: "/events",
    element: <EventsCustomer />,
  },
  {
    path: "/events/:id",
    element: <EventsCustomer />,
  },
  {
    path: "/event-docs/:id",
    element: <EventDocsCustomer />,
  },
  {
    path: "/accident",
    element: <Accident />,
  },
  {
    path: "/carburglary",
    element: <CarBurglary />,
  },
  {
    path: "/burglary-home",
    element: (
      <Burglarys
        propertyId={2}
        typeId={6}
        reportStorageName={"burglaryHome"}
        isActivePage={"burglaryHomePage"}
        pageName={"פריצה / גניבה"}
      />
    ),
  },
  {
    path: "/burglary-office",
    element: (
      <Burglarys
        propertyId={3}
        typeId={6}
        reportStorageName={"burglaryOffice"}
        isActivePage={"burglaryOfficePage"}
        pageName={"פריצה / גניבה"}
      />
    ),
  },
  {
    path: "/fire-damage-home",
    element: (
      <FireDamage
        headerTitle={"פתיחת אירוע רכוש - אש"}
        propertyId={2}
        typeId={4}
        reportStorageName={"fireDamageHome"}
        isActivePage={"fireHomePage"}
        pageName={"אש"}
      />
    ),
  },
  {
    path: "/fire-damage-office",
    element: (
      <FireDamage
        headerTitle={"פתיחת אירוע רכוש - אש"}
        propertyId={3}
        typeId={4}
        reportStorageName={"fireDamageOffice"}
        isActivePage={"fireOfficePage"}
        pageName={"אש"}
      />
    ),
  },
  {
    path: "/nature-damage-home",
    element: <NatureHome />,
  },
];

const AgentRoutes = [
  {
    path: "/",
    element: <WithFooterComponent Component={() => <HomeAgent />} />,
  },
  {
    path: "/report",
    element: <>REPORT PAGE</>,
  },
];

const SdpRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/report",
    element: <>REPORT PAGE</>,
  },
];

const AppraiserRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/report",
    element: <>REPORT PAGE</>,
  },
];

const AuthRoutes = [
  {
    path: "/login",
    element: <LoginCustomer />,
  },
  {
    path: "/sign-in",
    element: <SignInCustomer />,
  },
  {
    path: "/login/appraiser",
    element: <LoginAppraiser />,
  },
  {
    path: "/login/agent",
    element: <LoginAgent />,
  },
  {
    path: "/sign-in/agent",
    element: <SignInAgent />,
  },
];

export const RootRoutes = {
  agent: AgentRoutes,
  customer: CustomerRoutes,
  sdp: SdpRoutes,
  appraiser: AppraiserRoutes,
  none: AuthRoutes,
};
