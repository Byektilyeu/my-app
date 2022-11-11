import "./style.css";

const Navbar = (props) => {
  return (
    <nav id="navbar">
      <p>{props.title}</p>
    </nav>
  );
};

export default Navbar;
