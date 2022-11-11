import "./style.css";
import fb from "../../Assets/fb.png";
import ig from "../../Assets/ig.png";
import vk from "../../Assets/vk.png";

export default () => {
  return (
    <div id="footer">
      <img src={fb} alt="fb" />
      <img src={ig} alt="ig" />
      <img src={vk} alt="vk" />
    </div>
  );
};
