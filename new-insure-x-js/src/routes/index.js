import React from "react";
import Home from "../pages/customer/HomePage";
import ReportPage from "../pages/customer/EventsCreate";
import SignInCustomer from "../pages/customer/RegisterPage";
import LoginCustomer from "../pages/customer/LoginPage";
import LoginAppraiser from "../pages/appraiser/login";
import SignInAgent from "../pages/agent/register";
import LoginAgent from "../pages/agent/login";
import MessagesCustomer from "../pages/customer/messages";
import StatusCustomer from "../pages/customer/status";
import EventsCustomer from "../pages/customer/MyEvents";
import EventDocsCustomer from "../pages/customer/EventDocs";
import HomeAgent from "../pages/agent/home";
import WithFooterComponent from "../components/Ui/WithFooter";
import Accident from "../pages/customer/CarAccident";
import Burglarys from "../pages/customer/Burglarys";
import CarBurglary from "../pages/customer/CarBurglary";
import FireDamage from "../pages/customer/FireDamage";
import NatureHome from "../pages/customer/NatureDamageHome";
import NatureOffice from "../pages/customer/NatureDamegeOffice";
import ThreeDPerson from "../pages/customer/ThreeDPerson";
import WaterDamage from "../pages/customer/WaterDamage";
import MessagesAgent from "../pages/agent/Message";

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
        pageName={"?????????? / ??????????"}
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
        pageName={"?????????? / ??????????"}
      />
    ),
  },
  {
    path: "/fire-damage-home",
    element: (
      <FireDamage
        headerTitle={"?????????? ?????????? ???????? - ????"}
        propertyId={2}
        typeId={4}
        reportStorageName={"fireDamageHome"}
        isActivePage={"fireHomePage"}
        pageName={"????"}
      />
    ),
  },
  {
    path: "/fire-damage-office",
    element: (
      <FireDamage
        headerTitle={"?????????? ?????????? ???????? - ????"}
        propertyId={3}
        typeId={4}
        reportStorageName={"fireDamageOffice"}
        isActivePage={"fireOfficePage"}
        pageName={"????"}
      />
    ),
  },
  {
    path: "/nature-damage-home",
    element: <NatureHome />,
  },
  {
    path: "/nature-damage-office",
    element: <NatureOffice />,
  },
  {
    path: "/person-3d-home",
    element: (
      <ThreeDPerson
        propertyId={2}
        typeId={7}
        isActivePage="person3dHomePage"
        reportStorageName="person-3d-home"
        pageName={"???? ??????????"}
      />
    ),
  },
  {
    path: "/person-3d-office",
    element: (
      <ThreeDPerson
        propertyId={3}
        typeId={7}
        isActivePage="person3dOfficePage"
        reportStorageName="person-3d-office"
        pageName={"???? ??????????"}
      />
    ),
  },
  {
    path: "/water-damage-home",
    element: (
      <WaterDamage
        headerTitle={"?????????? ?????????? ???????? - ???????? ?????? "}
        propertyId={3}
        typeId={2}
        reportStorageName={"waterDamageOffice"}
        isActivePage={"waterOfficePage"}
        pageName={"??????"}
        noFilterSdp
      />
    ),
  },
  {
    path: "/water-damage-office",
    element: (
      <WaterDamage
        headerTitle={"?????????? ??????"}
        propertyId={3}
        typeId={8}
        reportStorageName={"OtherOffice"}
        isActivePage={"OtherOfficePage"}
        pageName={"??????"}
        suppliyerType={8}
        noFilterSdp
      />
    ),
  },
];

const AgentRoutes = [
  {
    path: "/",
    element: <WithFooterComponent Component={() => <HomeAgent />} />,
  },
  {
    path: "/messages",
    element: <MessagesAgent />,
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
