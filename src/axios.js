import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.0.105:8011/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
