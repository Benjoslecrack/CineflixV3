import React, { useRef, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/context";
import cookies from "js-cookie";

import "./header.scss";

import logo from "../../assets/tmovie.png";
import Avatar from "../Avatar/Avatar.jsx";

const headerNav = [
  {
    display: "Accueil",
    path: "/",
  },
  {
    display: "Films",
    path: "/movie",
  },
  {
    display: "Séries",
    path: "/tv",
  },
];

const Header = () => {
  const { sharedState, dispatch } = useAppContext();

  const [showDropdown, setShowDropdown] = useState(false);
  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Router
  const history = useHistory();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    cookies.remove("access_token");
    dispatch("user", null);
    history.push("/");
    toggleDropdown();
  };

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          {sharedState.user === null ? (
            <Link to="/auth/login" className="btn login-btn">
              Connexion
            </Link>
          ) : (
            <div
              className="relative cursor-pointer"
              onClick={handleAvatarClick}
              ref={dropdownRef}
            >
              <Avatar
                src={`images/${sharedState.user.profil_pic}`}
                alt={sharedState.user.name}
              />
              {showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li>
                      <Link to="/profile" className="cursor-pointer">
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link to="/watchlist" className="cursor-pointer">
                        WatchList
                      </Link>
                    </li>
                    <li>
                      <Link to="/watchedlist" className="cursor-pointer">
                        Films vus
                      </Link>
                    </li>
                    <li className="cursor-pointer" onClick={handleLogout}>
                      Déconnexion
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
