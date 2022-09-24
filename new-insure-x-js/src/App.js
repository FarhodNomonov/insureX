import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootRoutes } from "./routes";
import { setUser } from "./redux/reducer/user";
import NotFoundPage from "./components/Ui/NotFound";

function App() {
  const dispatch = useDispatch();
  const userStorage = useSelector(({ user }) => user);
  let user =
    userStorage.role === "customer"
      ? JSON.parse(localStorage.getItem("insured_person") ?? "{}")
      : userStorage.role === "agent"
      ? JSON.parse(localStorage.getItem("agent") ?? "{}")
      : userStorage.role === "sdp"
      ? JSON.parse(localStorage.getItem("sdp") ?? "{}")
      : userStorage.role === "appraiser"
      ? JSON.parse(localStorage.getItem("appraiser") ?? "{}")
      : {};

  React.useInsertionEffect(() => {
    const cleanUp = () => {
      if (user?.id && !userStorage?.user?.id) {
        console.log(user);
        delete user.sign_picture;
        dispatch(setUser(user));
        console.clear();
      }
    };
    return cleanUp();
  }, [user?.id, userStorage?.user?.id]);

  return (
    <Routes>
      {RootRoutes[userStorage?.role].map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
      <Route path={"*"} element={<NotFoundPage role={userStorage?.role} user={userStorage?.user?.id} />} />
    </Routes>
  );
}

export default App;
