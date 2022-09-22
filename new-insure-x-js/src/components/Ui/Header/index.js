import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Logo, LogOut, MenuIconList, NextIcon, User } from "../../Icons";
import { HeaderStyled } from "./header.style";

function Header({
  text = "שלום!",
  title = "הרשמה ליישומון",
  head = "יישומון מבוטח",
  bg = "",
}) {
  const navigate = useNavigate();
  const [open, setopen] = React.useState(false);
  const roleState = localStorage.getItem("role") ?? "customer";
  const [role, setRole] = useState(roleState ?? "customer");
  const Person = JSON.parse(localStorage.getItem("insured_person"));
  const Agent = JSON.parse(localStorage.getItem("agent"));
  const Sdp = JSON.parse(localStorage.getItem("sdp"));
  const Appraiser = JSON.parse(localStorage.getItem("appraiser"));

  return (
    <HeaderStyled>
      <div className="header__top__bar" style={{ backgroundColor: bg }}>
        <div className="header__top__bar__logo">
          <p>{head}</p>
          <NavLink to={`/${localStorage.getItem("role") ?? "customer"}`}>
            <Logo />
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
              <User />
              <h1>
                {role === "customer"
                  ? Person?.first_name
                  : role === "agent"
                  ? Agent?.first_name
                  : role === "sdp"
                  ? Sdp?.first_name
                  : role === "appraiser"
                  ? Appraiser?.first_name
                  : ""}
              </h1>
              <h1>
                {role === "customer"
                  ? Person?.second_name
                  : role === "agent"
                  ? Agent?.second_name
                  : role === "sdp"
                  ? Sdp?.second_name
                  : role === "appraiser"
                  ? Appraiser?.second_name
                  : ""}
              </h1>
            </div>
            <div
              className="poput_log_out"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <LogOut />
              <p>התנתק</p>
            </div>
          </div>
          <MenuIconList />
          <MenuIconList />
          <MenuIconList />
        </button>
      </div>
      <div className="header__bottom__bar">
        <div onClick={() => navigate(-1)} className="header__bottom__bar__icon">
          <NextIcon />
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
