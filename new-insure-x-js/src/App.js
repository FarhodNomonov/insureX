import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootRoutes } from "./routes";
import Login from "./pages/customer/login/login";
import { setUser } from "./redux/reducer/user";

function App() {
  const dispatch = useDispatch();
  const userStorage = useSelector(({ user }) => user);
  console.log(RootRoutes[userStorage.role], userStorage.role);

  const user =
    userStorage.role === "customer"
      ? JSON.parse(localStorage.getItem("insured_person") ?? "{}")
      : userStorage.role === "agent"
      ? JSON.parse(localStorage.getItem("agent") ?? "{}")
      : userStorage.role === "sdp"
      ? JSON.parse(localStorage.getItem("sdp") ?? "{}")
      : userStorage.role === "appraiser"
      ? JSON.parse(localStorage.getItem("appraiser") ?? "{}")
      : {};

  React.useEffect(() => {
    if (user?.id && !userStorage?.user?.id) {
      dispatch(setUser(user));
    }
  }, [user?.id, userStorage?.user?.id]);

  return (
    <Routes>
      {RootRoutes[userStorage.role].map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
      <Route path={"/auth/login/customer"} element={<Login />} />
    </Routes>
  );
}

export default App;
