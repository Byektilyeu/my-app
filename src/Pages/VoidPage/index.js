import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";
import AdminNavbar from "../../Components/AdminNavbar";
import { Link } from "react-router-dom";
import "./style.css";

function VoidPage(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
    console.log("void page props datas", props);
  }, []);

  //  get orders
  const getOrders = () => {
    axios
      .post(`${SERVERAPI}/api/v1/orders/getshiftorders`, {
        objID: props.loadedShift.objID,
        shiftNum: props.loadedShift.shiftNum,
      })
      .then((result) => {
        console.log("void datas", result.data);
        setOrders(result.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container-void">
        {orders.map((i, key) =>
          i.status == 6 ? (
            <Link
              key={key}
              to={`/admin/${props.user.objID}/void/${i.visit}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="grid-item-void">
                <div className="text-sm">{i.orderDetails.orderNumber}</div>
                <div className="text-sm">
                  {i.transiactionInfo.date_time} ? 2023.07.24 12:54 ?
                </div>
                <div className="text-sm">Status: {i.status}</div>
                <div className="text-sm">{i.transiactionInfo.amount}</div>
                <div className="text-sm">Яармаг ПОС 1 ?</div>
                <div className="text-sm">Alex ?</div>
                <div className="text-xs mt-2 ">
                  {i.transiactionInfo.amount} MNT
                </div>
              </div>
            </Link>
          ) : (
            <Link
              key={key}
              to={`/admin/${props.user.objID}/void/${i.visit}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="grid-item-void-status">
                <div className="text-sm">{i.orderDetails.orderNumber}</div>
                <div className="text-sm">
                  {i.transiactionInfo.date_time} ? 2023.07.24 12:54 ?
                </div>
                <div className="text-sm">Status: {i.status}</div>
                <div className="text-sm">{i.transiactionInfo.amount}</div>
                <div className="text-sm">Яармаг ПОС 1 ?</div>
                <div className="text-sm">Alex ?</div>
                <div className="text-xs mt-2 ">
                  {i.transiactionInfo.amount} MNT
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadedShift: state.shiftReducer.loadedShift,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VoidPage);
