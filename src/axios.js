import axios from "axios";
import { SERVERAPI } from "./Constants/Routes";

const instance = axios.create({
  baseURL: `${SERVERAPI}/api/v1/`,
});

instance.defaults.withCredentials = true;

export default instance;
