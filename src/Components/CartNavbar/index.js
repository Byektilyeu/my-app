import "./style.css";
import { useHistory } from "react-router-dom";

const CartNavbar = (props) => {
  const history = useHistory();

  // console.log("params11111 ____________________", props);

  const routeChange = () => {
    let path = `/${props.hallplan}/${props.table}/menus`;
    history.push(path);
  };

  return (
    <nav id="menu-navbar">
      <button onClick={routeChange}>
        <img src={props.back} />
      </button>
      <p>{props.title}</p>
    </nav>
  );
};

export default CartNavbar;
