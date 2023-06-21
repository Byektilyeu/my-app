import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";
import { MDBSpinner } from "mdb-react-ui-kit";
import ToastContainer, { toast } from "react-light-toast";

function SettingsPage(props) {
  const [settings, setSettings] = useState("");
  const [objectID, setObjectID] = useState(props.match.params.objid);
  const [loading, setLoading] = useState(false);
  var obj = "";

  // input-iin utgiig settings state ruu  save hiij  bna
  const checkIP = (text) => {
    setSettings({ ...settings, IP: text.target.value });
  };
  const checkPort = (text) => {
    setSettings({ ...settings, port: text.target.value });
  };
  const checkUsername = (text) => {
    setSettings({ ...settings, username: text.target.value });
  };
  const checkPassword = (text) => {
    setSettings({ ...settings, password: text.target.value });
  };
  const checkStationID = (text) => {
    setSettings({ ...settings, stationID: text.target.value });
  };
  const checkPaymentID = (text) => {
    setSettings({ ...settings, paymentID: text.target.value });
  };
  const checkWaiterID = (text) => {
    setSettings({ ...settings, waiterID: text.target.value });
  };
  const checkStationCode = (text) => {
    setSettings({ ...settings, stationCode: text.target.value });
  };

  useEffect(() => {
    getSettings();
  }, []);

  //  get settings request
  const getSettings = () => {
    axios
      .post(`${SERVERAPI}/api/v1/settings/getsettings`, {
        objID: parseInt(objectID),
      })
      .then((result) => {
        if (result.data.data.length !== 0) {
          // console.log("hooson bna", result.data.data);
          setSettings(result.data.data[0]);
        } else {
          console.log("hooson bna");
        }
        setLoading(true);
      })
      .catch((err) => console.log(err.message));
  };

  //save settings req
  const saveSettings = async () => {
    const configSaveSettings = {
      method: "post",
      url: `${SERVERAPI}/api/v1/settings/createsettings`,
      data: {
        IP: settings.IP,
        port: settings.port,
        username: settings.username,
        password: settings.password,
        stationID: settings.stationID,
        paymentID: settings.paymentID,
        waiterID: settings.waiterID,
        stationCode: settings.stationCode,
        objID: objectID,
      },
    };
    let saveSettings = await axios(configSaveSettings);
    console.log(saveSettings.data.success);

    if (saveSettings.data.success) {
      toast.success("Амжилттай хадгалагдлаа", {
        autoClose: true, // disable auto close | default: true
        closeDuration: 1500, // close duration in ms | default: 3000
      });
    }
  };

  // Tuhain restaurantiin hallplan, table, price ,menu-uudiig r-keeper ruu request ywuulj, mongodb ruu bichih commandiig ogch bna
  const getMenu = () => {
    requestGetHallPlans();
    requestGetMenuItems();
    requestGetPrice();
  };

  // requestGetHallPlans
  const requestGetHallPlans = () => {
    axios
      .post("http://10.0.0.104:8011/api/v1/hallplans", {
        objID: parseInt(objectID),
        IP: "10.0.0.104",
        PORT: 8086,
        username: "http_user1",
        password: "9",
      })
      .then((result) => {
        console.log("result hallplans", result.data);
      })
      .catch((err) => console.log(err.message));

    // const configGetHallPlans = {
    //   method: "post",
    //   url: "http://10.0.0.103:8011/api/v1/hallplans",
    //   data: {
    //     objID: parseInt(objectID),
    //     IP: "10.0.0.111",
    //     PORT: 8086,
    //     username: "http_user1",
    //     password: "9",
    //     // IP: settings.IP,
    //     // PORT: settings.PORT,
    //     // username: settings.username,
    //     // password: settings.password,
    //   },
    // };
    // console.log(" settings IP: ", settings.IP);
    // let hallPlans = axios(configGetHallPlans);
    // console.log("hallPlans ====> ", hallPlans.data.data);
  };

  // requestGetMenuItems
  const requestGetMenuItems = () => {
    axios
      .post("http://10.0.0.104:8011/api/v1/menuitems", {
        objID: parseInt(objectID),
        IP: "10.0.0.104",
        PORT: 8086,
        username: "http_user1",
        password: "9",
      })
      .then((result) => {
        console.log("result menuitems", result.data);
      })
      .catch((err) => console.log(err.message));

    // const configGetMenuItems = {
    //   method: "post",
    //   url: "http://10.0.0.103:8011/api/v1/menuitems",
    //   data: {
    //     objID: parseInt(objectID),
    //     IP: "10.0.0.111",
    //     PORT: 8086,
    //     username: "http_user1",
    //     password: "9",
    //     // IP: settings.IP,
    //     // PORT: settings.PORT,
    //     // username: settings.username,
    //     // password: settings.password,
    //   },
    // };

    // let menuItems = axios(configGetMenuItems);
    // console.log(" settings password: ", settings.password);
    // console.log("menuItems ====> ", menuItems.data.data);
  };

  // requestGetOrderMenu
  const requestGetPrice = () => {
    axios
      .post("http://10.0.0.104:8011/api/v1/price", {
        objID: parseInt(objectID),
        IP: "10.0.0.104",
        PORT: 8086,
        username: "http_user1",
        password: "9",
      })
      .then((result) => {
        console.log("result price", result.data);
      })
      .catch((err) => console.log(err.message));

    // const configGetPrice = {
    //   method: "post",
    //   url: "http://10.0.0.103:8011/api/v1/price",
    //   data: {
    //     objID: parseInt(objectID),
    //     IP: "10.0.0.111",
    //     PORT: 8086,
    //     username: "http_user1",
    //     password: "9",
    //     // IP: settings.IP,
    //     // PORT: settings.PORT,
    //     // username: settings.username,
    //     // password: settings.password,
    //   },
    // };

    // let price = axios(configGetPrice);
    // console.log(" settings username: ", settings.username);
    // console.log("orderMenu ====> ", orderMenu.data.data);
  };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav">
            <MyNavbar title="Тохиргоо" />
          </div>
        </header>

        {loading ? (
          <div className="form">
            <div className="input">
              <label className="labels">IP:</label>
              <input
                type="text"
                name="IP"
                defaultValue={""}
                value={settings.IP}
                placeholder="IP"
                onChange={checkIP}
              />
            </div>
            <div className="input">
              <label className="labels">Port:</label>
              <input
                type="text"
                name="PORT"
                defaultValue={""}
                value={settings.port}
                placeholder="PORT"
                onChange={checkPort}
              />
            </div>
            <div className="input">
              <label className="labels">Username:</label>
              <input
                type="text"
                name="Username"
                defaultValue={""}
                value={settings.username}
                placeholder="Username"
                onChange={checkUsername}
              />
            </div>
            <div className="input">
              <label className="labels">Password:</label>
              <input
                type="text"
                name="Password"
                defaultValue={""}
                value={settings.password}
                placeholder="Password"
                onChange={checkPassword}
              />
            </div>
            <div className="input">
              <label className="labels">Station id:</label>
              <input
                type="text"
                name="StationID"
                defaultValue={""}
                value={settings.stationID}
                placeholder="StationID"
                onChange={checkStationID}
              />
            </div>
            <div className="input">
              <label className="labels">Payment id:</label>
              <input
                type="text"
                name="PaymentID"
                defaultValue={""}
                value={settings.paymentID}
                placeholder="PaymentID"
                onChange={checkPaymentID}
              />
            </div>
            <div className="input">
              <label className="labels">Waiter id:</label>
              <input
                type="text"
                name="WaiterID"
                defaultValue={""}
                value={settings.waiterID}
                placeholder="WaiterID"
                onChange={checkWaiterID}
              />
            </div>
            <div className="input">
              <label className="labels">Station code:</label>
              <input
                type="text"
                name="StationCode"
                defaultValue={""}
                value={settings.stationCode}
                placeholder="StationCode"
                onChange={checkStationCode}
              />
            </div>
            <div className="input">
              <label className="labels">Object id:</label>
              <input name="ObjID" value={parseInt(objectID)} />
            </div>
            <div className="buttons">
              <div>
                <button onClick={saveSettings} className="button">
                  Хадгалах
                </button>
              </div>
              <div>
                <button onClick={getMenu} className="button">
                  Меню авах
                </button>
              </div>
            </div>
            <ToastContainer
              options={{
                reverse: true,
                position: "top-left",
              }}
            />
          </div>
        ) : (
          <MDBSpinner className="spinner" color="success" />
        )}
      </Layout>
      <div id="foot">
        <PageFooter />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // loadedCategories: state.categoryReducer.loadedCategories,
    // loading: state.categoryReducer.loading,
    // loadedMenu: state.menuReducer.loadedMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadCategories: () => dispatch(actionsCategory.loadCategories()),
    // loadMenu: () => dispatch(actionsMenu.loadMenu()),
    // loadSettings: () => dispatch(actionsSettings.loadSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
