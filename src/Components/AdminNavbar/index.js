import { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import ham1 from "../../Assets/Hamburger_icon.svg.png";
import "./index.css";
import { logout } from "../../redux/actions/userActions";

const AdminNavbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const onLogout = () => {
    props.logout();
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
              <NavLink to={`/admin/${props.user.objID}`}>Нүүр</NavLink>
            </li>
            {props.user.role === "manager" && (
              <li>
                <NavLink to={`/admin/${props.user.objID}/void`}>
                  Буцаалт
                </NavLink>
              </li>
            )}
            {props.user.role === "admin" && (
              <li>
                <NavLink to="/admin/createrestaurant">
                  create-restaurant
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/admin" onClick={onLogout}>
                Гарах
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
