import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
import rkeeper from "../../Assets/rkeeper.webp";
import ham1 from "../../Assets/Hamburger_icon.svg.png";
// import { ReactComponent as Brand } from "../../assets/icons/logo.svg";
import "./index.css";

const AdminNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="navbarAdmin">
      <div className="containerAdmin">
        <div className="rkeeper">r_keeper</div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={ham1} />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Нүүр</NavLink>
            </li>
            <li>
              <NavLink to="/admin/void">Буцаалт</NavLink>
            </li>
            <li>
              <NavLink to="/nav1">Nav1</NavLink>
            </li>
            <li>
              <NavLink to="/nav2">Nav3</NavLink>
            </li>
            <li>
              <NavLink to="/nav3">Хэрэглэгч</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
