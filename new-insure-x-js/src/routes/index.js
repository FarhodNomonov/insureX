import Home from "../pages/customer/home";
import ReportPage from "../pages/customer/report";
import SignInCustomer from "../pages/customer/register";
import LoginCustomer from "../pages/customer/login";
import LoginAppraiser from "../pages/appraiser/login";
import MessagesCustomer from "../pages/customer/messages";
import StatusCustomer from "../pages/customer/status";
import EventsCustomer from "../pages/customer/events";
import EventDocsCustomer from "../pages/customer/event-docs";

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
];

const AgentRoutes = [
  {
    path: "/",
    element: <Home />,
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
];

export const RootRoutes = {
  agent: AgentRoutes,
  customer: CustomerRoutes,
  sdp: SdpRoutes,
  appraiser: AppraiserRoutes,
  none: AuthRoutes,
};
