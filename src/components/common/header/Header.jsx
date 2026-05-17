import { useRef, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

// imgs
import profileImg from "../../../assets/profile.webp";

// styles
import styles from "../../../styles/styles";
import "./headerStyle.css";

// font awesome bars
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";

// bars
const menuIcon = <FontAwesomeIcon icon={faBars} />;
const bellIcon = <FontAwesomeIcon icon={faBell} />;

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const { isLoggedOut, user } = UserAuth();

  const menuBtn = useRef(null); // useRef hook for button
  const links = useRef(null);
  const actchild = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    };
    window.addEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    if (menuBtn.current) {
      // Check if ref is assigned a DOM element
      menuBtn.current.addEventListener("click", () => {
        links.current.classList.toggle("active-list");
        links.current.classList.toggle("links");
        actchild.current.classList.toggle("actchild");
      });
    }
  }, []);

  window.addEventListener("resize", () => {
    if (windowWidth > 1192) {
      links.current.classList.remove("active-list");
      links.current.classList.add("links");
      actchild.current.classList.remove("actchild");
    }
  });

  return (
    <header className={` flex items-start justify-between ${styles.myPadding}`}>
      {/* logo */}
      <div className="z-10">
        <h3 className="flex text-[30px] text-second-color">
          <span
            className="italic flex items-center justify-center rounded-full text-[50px]
            w-[50px] h-[50px] text-main-color bg-dark-green"
          >
            J{" "}
          </span>
          Planner
        </h3>
      </div>

      {/* links */}
      <ul ref={links} className={`links z-[3]`}>
        <div ref={actchild} className={`flex`}>
          <NavLink to="/" exact="true" activeclassname="active">
            <li className={styles.linkStyle}>Home</li>
          </NavLink>

          <NavLink to="/places" activeclassname="active">
            <li className={styles.linkStyle}>Places</li>
          </NavLink>
          <NavLink
            to={isLoggedOut ? "/login" : "/plans"}
            activeclassname="active"
          >
            <li className={styles.linkStyle}>Plans</li>
          </NavLink>
        </div>
        {/* profiles */}
        {isLoggedOut ? (
          <div className="lg:ml-5 lg:flex">
            <NavLink to="/signup" activeclassname="active">
              <li className={`${styles.linkStyle} :hidden`}>Sign Up</li>
            </NavLink>
            <Link to="/login">
              <li className={`${styles.linkStyle} bg-dark-green text-[white]`}>
                Login
              </li>
            </Link>
          </div>
        ) : (
          <div className="">
            <Link to="/profile" className="">
              <p
                className={`${styles.linkStyle} w-full flex items-center justify-center px-3 py-1`}
              >
                <span className="w-[40px] h-[40px] cursor-pointer mr-2 rounded-full overflow-hidden">
                  <img className="w-full" src={profileImg} alt="profile" />
                </span>
                {user?.name || "Profile"}
              </p>
            </Link>
          </div>
        )}
      </ul>

      {/* menu */}
      <button
        ref={menuBtn}
        className="flex text-[40px] z-[5] relative w-[50px] h-[50px] items-center justify-center clg:hidden"
      >
        {menuIcon}
      </button>
    </header>
  );
};

export default Header;
