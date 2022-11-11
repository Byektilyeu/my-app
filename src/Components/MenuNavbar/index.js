import "./style.css";
import { useHistory } from "react-router-dom";

const MenuNavbar = (props) => {
  let history = useHistory();
  return (
    <nav id="menu-navbar">
      <button onClick={history.goBack}>
        <img src={props.back} />
      </button>
      <p>{props.title}</p>
    </nav>
  );
};

export default MenuNavbar;
