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
        objID: 992500001,
        shiftNum: 876,
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
        {orders.map((i, key) => (
          <Link
            key={key}
            to={`/admin/void/${i.visit}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="grid-item-void">
              <div className="text-sm">{i.orderDetails.orderNumber}</div>
              <div className="text-sm">2023.07.24 12:54</div>
              <div className="text-sm">57188/1</div>
              <div className="text-sm">7000.00</div>
              <div className="text-sm">Яармаг ПОС 1</div>
              <div className="text-sm">Alex</div>
              <div className="text-xs mt-2 ">45000.00 MNT</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadedShift: state.shiftReducer.loadedShift,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VoidPage);
