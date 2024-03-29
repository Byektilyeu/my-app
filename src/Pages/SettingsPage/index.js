import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
// import MyNavbar from "../../Components/Navbar";
import AdminNavbar from "../../Components/AdminNavbar";
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";
import { MDBSpinner } from "mdb-react-ui-kit";
import ToastContainer, { toast } from "react-light-toast";
import { setSettingsData } from "../../redux/actions/settingsActions";

function SettingsPage(props) {
  const [settings, setSettings] = useState("");
  const [objectID, setObjectID] = useState(props.match.params.objid);
  const [loading, setLoading] = useState(false);
  var obj = "";

  // input-settings-iin utgiig settings state ruu  save hiij  bna
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
  const checkOrderType = (text) => {
    setSettings({ ...settings, orderType: text.target.value });
  };
  const checkCashierCode = (text) => {
    setSettings({ ...settings, cashierCode: text.target.value });
  };
  const checkPassToken = (text) => {
    setSettings({ ...settings, passToken: text.target.value });
  };
  const checkManagerID = (text) => {
    setSettings({ ...settings, managerID: text.target.value });
  };
  const checkManagerPassword = (text) => {
    setSettings({ ...settings, managerPassword: text.target.value });
  };
  const checkDeleteReasonID = (text) => {
    setSettings({ ...settings, deleteReasonID: text.target.value });
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
          console.log("hooson bna", result.data.data[0]);
          setSettings(result.data.data[0]);
          props.setSettingsData(result.data.data[0]);
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
        orderType: settings.orderType,
        cashierCode: settings.cashierCode,
        passToken: settings.passToken,
        managerID: settings.managerID,
        managerPassword: settings.managerPassword,
        deleteReasonID: settings.deleteReasonID,
      },
    };
    let saveSettings = await axios(configSaveSettings);
    console.log("]]]]]]]", saveSettings.data.success);

    if (saveSettings.data.success) {
      props.setSettingsData(settings);
      toast.success("Амжилттай хадгалагдлаа", {
        autoClose: true, // disable auto close | default: true
        closeDuration: 1500, // close duration in ms | default: 3000
      });
    }
  };

  // Tuhain restaurantiin hallplan, table, price ,menu-uudiig r-keeper ruu request ywuulj, mongodb ruu bichih commandiig ogch bna
  const getMenu = () => {
    requestGetHallPlans();
    requestGetTables();
    requestGetMenuItems();
    requestGetPrice();
  };

  // requestGetHallPlans
  const requestGetHallPlans = () => {
    axios
      .post(`${SERVERAPI}/api/v1/hallplans`, {
        objID: parseInt(objectID),
        IP: props.loadedSettings.IP,
        PORT: props.loadedSettings.port,
        username: props.loadedSettings.username,
        password: props.loadedSettings.password,
      })
      .then((result) => {
        console.log("result hallplans", result.data);
      })
      .catch((err) => console.log(err.message));
  };

  // requestGetHallPlans
  const requestGetTables = () => {
    axios
      .post(`${SERVERAPI}/api/v1/tables`, {
        objID: parseInt(objectID),
        IP: props.loadedSettings.IP,
        PORT: props.loadedSettings.port,
        username: props.loadedSettings.username,
        password: props.loadedSettings.password,
      })
      .then((result) => {
        console.log("result tables", result.data);
      })
      .catch((err) => console.log(err.message));
  };

  // requestGetMenuItems
  const requestGetMenuItems = () => {
    axios
      .post(`${SERVERAPI}/api/v1/menuitems`, {
        objID: parseInt(objectID),
        IP: props.loadedSettings.IP,
        PORT: props.loadedSettings.port,
        username: props.loadedSettings.username,
        password: props.loadedSettings.password,
      })
      .then((result) => {
        console.log("result menuitems", result.data);
      })
      .catch((err) => console.log(err.message));
  };

  // requestGetOrderMenu
  const requestGetPrice = () => {
    axios
      .post(`${SERVERAPI}/api/v1/price`, {
        objID: parseInt(objectID),
        IP: props.loadedSettings.IP,
        PORT: props.loadedSettings.port,
        username: props.loadedSettings.username,
        password: props.loadedSettings.password,
      })
      .then((result) => {
        console.log("result price", result.data);
      })
      .catch((err) => console.log(err.message));

    // const configGetPrice = {
    //   method: "post",
    //   url: "http://10.0.0.105:8011/api/v1/price",
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
            <AdminNavbar />
          </div>
        </header>

        {loading ? (
          <div className="form-settings">
            <div className="input-settings ">
              <label className="labels-settings">IP:</label>
              <input
                className="border"
                type="text"
                name="IP"
                defaultValue={""}
                value={settings.IP}
                placeholder="IP"
                onChange={checkIP}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Port:</label>
              <input
                className="border"
                type="text"
                name="PORT"
                defaultValue={""}
                value={settings.port}
                placeholder="PORT"
                onChange={checkPort}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Username:</label>
              <input
                className="border"
                type="text"
                name="Username"
                defaultValue={""}
                value={settings.username}
                placeholder="Username"
                onChange={checkUsername}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Password:</label>
              <input
                className="border"
                type="text"
                name="Password"
                defaultValue={""}
                value={settings.password}
                placeholder="Password"
                onChange={checkPassword}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Station id:</label>
              <input
                className="border"
                type="text"
                name="StationID"
                defaultValue={""}
                value={settings.stationID}
                placeholder="StationID"
                onChange={checkStationID}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Payment id:</label>
              <input
                className="border"
                type="text"
                name="PaymentID"
                defaultValue={""}
                value={settings.paymentID}
                placeholder="PaymentID"
                onChange={checkPaymentID}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Waiter id:</label>
              <input
                className="border"
                type="text"
                name="WaiterID"
                defaultValue={""}
                value={settings.waiterID}
                placeholder="WaiterID"
                onChange={checkWaiterID}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Order type:</label>
              <input
                className="border"
                type="text"
                name="OrderType"
                defaultValue={""}
                value={settings.orderType}
                placeholder="OrderType"
                onChange={checkOrderType}
              />
            </div>
            <div className="input-settings">
              <label className="labels-settings">Station code:</label>
              <input
                className="border"
                type="text"
                name="StationCode"
                defaultValue={""}
                value={settings.stationCode}
                placeholder="StationCode"
                onChange={checkStationCode}
              />
            </div>

            <div className="input-settings">
              <label className="labels-settings">Cashier code:</label>
              <input
                className="border"
                type="text"
                name="CashierCode"
                defaultValue={""}
                value={settings.cashierCode}
                placeholder="cashierCode"
                onChange={checkCashierCode}
              />
            </div>

            <div className="input-settings">
              <label className="labels-settings">Pass token:</label>
              <input
                className="border"
                type="text"
                name="PassToken"
                defaultValue={""}
                value={settings.passToken}
                placeholder="passToken"
                onChange={checkPassToken}
              />
            </div>

            <div className="input-settings">
              <label className="labels-settings">Manager ID:</label>
              <input
                className="border"
                type="text"
                name="ManagerID"
                defaultValue={""}
                value={settings.managerID}
                placeholder="managerID"
                onChange={checkManagerID}
              />
            </div>

            <div className="input-settings">
              <label className="labels-settings">Manager Password:</label>
              <input
                className="border"
                type="text"
                name="ManagerPassword"
                defaultValue={""}
                value={settings.managerPassword}
                placeholder="managerPassword"
                onChange={checkManagerPassword}
              />
            </div>

            <div className="input-settings">
              <label className="labels-settings">Delete Reason ID:</label>
              <input
                className="border"
                type="text"
                name="DeleteReasonID"
                defaultValue={""}
                value={settings.deleteReasonID}
                placeholder="deleteReasonID"
                onChange={checkDeleteReasonID}
              />
            </div>

            <div className="input-settings">
              <label className="labels-settings">Object id:</label>
              <input
                className="border"
                name="ObjID"
                value={parseInt(objectID)}
              />
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
    loadedSettings: state.settingsReducer.loadedSettings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadCategories: () => dispatch(actionsCategory.loadCategories()),
    // loadMenu: () => dispatch(actionsMenu.loadMenu()),
    setSettingsData: (settings) => dispatch(setSettingsData(settings)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
