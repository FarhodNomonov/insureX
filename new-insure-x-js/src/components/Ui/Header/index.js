import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { setRole, setUser } from "../../../redux/reducer/user";
import * as i from "../../icon";
import { HeaderStyled } from "./style";

function Header({
  text = "שלום!",
  title = "הרשמה ליישומון",
  head = "יישומון מבוטח",
  bg = "",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setopen] = React.useState(false);
  const user = useSelector(({ user }) => user);

  return (
    <HeaderStyled>
      <div className="header__top__bar" style={{ backgroundColor: bg }}>
        <div className="header__top__bar__logo">
          <p>{head}</p>
          <NavLink to={`/${localStorage.getItem("role") ?? "customer"}`}>
            <i.Logo />
          </NavLink>
        </div>
        <button
          className={`header__top__bar__menu`}
          onClick={() => {
            setopen(!open);
          }}
        >
          <div className="popup">
            <div className="popup_title">
              <i.User />
              <h1>{user?.user?.first_name}</h1>
              <h1>{user?.user?.second_name}</h1>
            </div>
            <div
              className="poput_log_out"
              onClick={() => {
                navigate(`/auth/login/${user?.role}`);
                localStorage.clear();
                dispatch(setUser({}));
                dispatch(setRole("customer"));
              }}
            >
              <i.LogOut />
              <p>התנתק</p>
            </div>
          </div>
          <i.MenuIconList />
          <i.MenuIconList />
          <i.MenuIconList />
        </button>
      </div>
      <div className="header__bottom__bar">
        <div onClick={() => navigate(-1)} className="header__bottom__bar__icon">
          <i.NextIcon />
        </div>
        <div className="header__bottom__bar__text">
          <p>{text}</p>
          <p>{title}</p>
        </div>
      </div>
    </HeaderStyled>
  );
}

export default Header;
