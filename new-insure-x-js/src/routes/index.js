import Home from "../pages/customer/home";

const CustomerRoutes = [
  {
    path: "/customer",
    element: <Home />,
  },
  {
    path: "/report",
    element: <>REPORT PAGE</>,
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

export const RootRoutes = {
  agent: AgentRoutes,
  customer: CustomerRoutes,
  sdp: SdpRoutes,
  appraiser: AppraiserRoutes,
};
