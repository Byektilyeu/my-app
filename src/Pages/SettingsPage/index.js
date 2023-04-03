import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";

function HomePage(props) {
  const [settings, setSettings] = useState("");

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
  const checkRestCode = (text) => {
    setSettings({ ...settings, restCode: text.target.value });
  };

  useEffect(() => {}, []);

  //save settings req
  const saveSettings = async () => {
    const configSaveSettings = {
      method: "post",
      url: `${SERVERAPI}/api/v1/settings2/createsettings`,
      data: {
        IP: settings.IP,
        port: settings.port,
        username: settings.username,
        password: settings.password,
        stationID: settings.stationID,
        paymentID: settings.paymentID,
        waiterID: settings.waiterID,
        stationCode: settings.stationCode,
        restCode: settings.restCode,
      },
    };
    let saveSettings = await axios(configSaveSettings);
    console.log("saveSettings ====> ", saveSettings.data.data);
  };

  const getMenu = async () => {
    //get menu req
  };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav">
            <MyNavbar title="Тохиргоо" />
          </div>
        </header>

        <div className="form">
          <div className="input">
            <input
              type="text"
              name="IP"
              value={settings.IP}
              placeholder="IP"
              onChange={checkIP}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="PORT"
              value={settings.port}
              placeholder="PORT"
              onChange={checkPort}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="Username"
              value={settings.username}
              placeholder="Username"
              onChange={checkUsername}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="Password"
              value={settings.password}
              placeholder="Password"
              onChange={checkPassword}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="StationID"
              value={settings.stationID}
              placeholder="StationID"
              onChange={checkStationID}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="PaymentID"
              value={settings.paymentID}
              placeholder="PaymentID"
              onChange={checkPaymentID}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="WaiterID"
              value={settings.waiterID}
              placeholder="WaiterID"
              onChange={checkWaiterID}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="StationCode"
              value={settings.stationCode}
              placeholder="StationCode"
              onChange={checkStationCode}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="RestCode"
              value={settings.restCode}
              placeholder="RestCode"
              onChange={checkRestCode}
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
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
