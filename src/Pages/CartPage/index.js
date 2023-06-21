import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Layout from "../../Components/Layout";
import { SERVERAPI } from "../../Constants/Routes";
import { MDBListGroup, MDBListGroupItem, MDBSpinner } from "mdb-react-ui-kit";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
} from "../../redux/actions/CartActions";
import "./style.css";
import CartNavbar from "../../Components/CartNavbar/index";
import back from "../../Assets/back.png";
import { setOrderStatusAction } from "../../redux/actions/guidActions";

function CartPage(props) {
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [orders, setOrders] = useState([{}]);
  let ListCart = [];
  let TotalCart = 0;

  useEffect(() => {
    setLoading(true);
  }, [loading]);

  // console.log("LoadedSettingsCartPage", props.loadedSettings);

  // list cart ruu cart-iin zahialguudiig push hiij hiih
  Object.keys(props.loadedCartOrders).forEach(function (item) {
    TotalCart +=
      (props.loadedCartOrders[item].quantity *
        props.loadedCartOrders[item].price) /
      100;
  });

  // Get monpay token
  const monpayGetTokenRequest = async () => {
    // getToken req
    const configGetToken = {
      method: "post",
      url: `${SERVERAPI}/api/v1/monpay/getmonpaytoken`,
    };
    let getTokenResult = await axios(configGetToken);

    const token = getTokenResult.data.data.access_token;

    // create Invoice request
    const configCreateInvoice = {
      method: "post",
      url: `${SERVERAPI}/api/v1/monpay/createinvoice`,
      data: {
        token: getTokenResult.data.data.access_token,
        hallplanID: props.match.params.hallplansid,
        tableID: props.match.params.tableid,
        totalPrice: TotalCart,
      },
    };
    let createInvoiceResult = await axios(configCreateInvoice);
    const invoiceID = createInvoiceResult.data.data.result.id;
    console.log(
      "uri ====>   " + createInvoiceResult.data.data.result.redirectUri
    );

    // redirectUri open
    window.open(createInvoiceResult.data.data.result.redirectUri, "_blank");
    // redirectUri(createInvoiceResult.data.data.result.redirectUri);

    //checkInvoice

    var checkStatus = null;
    var timer = 0;
    var interval = setInterval(async () => {
      const configCheckInvoice = {
        method: "post",
        url: `${SERVERAPI}/api/v1/monpay/checkinvoice`,
        data: {
          token: token,
          invoiceID: invoiceID,
        },
      };
      let checkInvoiceResult = await axios(configCheckInvoice);
      checkStatus = checkInvoiceResult.data.data.result.status;
      console.log(
        " checkInvoiceResult ===> ",
        checkInvoiceResult.data.data.result.status
      );

      if (checkStatus == "PAID" || timer == 59) {
        clearInterval(interval);
      }
      timer++;
    }, 3000);
  };

  // getSystemInfo
  const getSystemInfo = async () => {
    const configSystemInfo = {
      method: "post",
      url: `${SERVERAPI}/api/v1/rkeeper/getsysteminfo`,
    };
    let systemInfo = await axios(configSystemInfo);

    const myObj = JSON.parse(systemInfo.data.data);

    console.log("System info ====> ", myObj.RK7QueryResult._attributes.NetName);
  };

  // Save Order
  const saveOrder = async () => {
    setDisable(false);
    const cartOrders = props.loadedCartOrders;
    console.log("CArts: ", cartOrders);
    const guid = props.loadedGuid;
    const orderVisit = props.loadedOrderVisit;
    const orderNumber = props.loadedOrderNumber;
    var orderStatus = props.loadedOrderStatus;
    console.log("order Status1 :: ", orderStatus);

    if (orderStatus == 0) {
      // await createOrderMongoDB(orderVisit, orderNumber, guid, cartOrders);
    } else {
      // await updateOrderMongoDB(guid, cartOrders);
    }

    orderStatus = orderStatus + 1;
    props.setOrderStatusAction(orderStatus);

    const configSaveOrder = {
      method: "post",
      url: `${SERVERAPI}/api/v1/rkeeper/saveorder`,
      data: {
        orders: cartOrders,
        guid: guid,
      },
    };
    let saveOrder = await axios(configSaveOrder);
    const myObj = JSON.parse(saveOrder.data.data);
    console.log("Save order ====> ", myObj);
  };

  // update order mongoDB
  const updateOrderMongoDB = async (guid, cartOrders) => {
    const orderAmount = TotalCart;
    const configUpdateOrderMongoDB = {
      method: "post",
      url: `${SERVERAPI}/api/v1/orders/updateorder`,
      data: {
        orderAmount: orderAmount,
        orderGuid: guid,
        products: cartOrders,
      },
    };
    let updateOrderMongoDB = await axios(configUpdateOrderMongoDB);
    console.log("updateOrderMongoDB ====> ", updateOrderMongoDB.data.data);
  };

  const DecreaseQuantityHandle = (key) => {
    props.DecreaseQuantity(key);
    setLoading(false);
  };
  const IncreaseQuantityHandle = (key) => {
    props.IncreaseQuantity(key);
    setLoading(false);
  };

  // createOrderMongoDB
  const createOrderMongoDB = async (
    orderVisit,
    orderNumber,
    guid,
    cartOrders
  ) => {
    const payments = {
      paymentID: "",
      amount: 0,
      paymentStatus: false,
      invoiceNumber: 0,
    };
    const orderAmount = TotalCart;
    const configCreateOrderMongoDB = {
      method: "post",
      url: `${SERVERAPI}/api/v1/orders/createorder`,
      data: {
        orderVisit: orderVisit,
        orderNumber: orderNumber,
        orderAmount: orderAmount,
        orderGuid: guid,
        payments: payments,
        dDTD: 123456789,
        products: cartOrders,
      },
    };
    let createOrderMongoDB = await axios(configCreateOrderMongoDB);
    console.log("createOrderMongoDB ====> ", createOrderMongoDB.data.data);
  };

  return (
    <Layout>
      <div className="list-nav">
        <CartNavbar
          title="Таны сагс"
          back={back}
          restaurant={props.match.params.restaurantid}
          hallplan={props.match.params.hallplansid}
          table={props.match.params.tableid}
        />
      </div>

      {loading ? (
        <div>
          <div className="cards">
            {props.loadedCartOrders.map((item, key) => {
              return (
                <div key={key} className="list-card">
                  <div className="list-card-name">
                    <p>{item.name}</p>
                  </div>
                  <div className="list-card-img">
                    <img src={item.image} />
                  </div>
                  <div className="list-card-price">
                    <div className="card-price">
                      =
                      {Number(
                        (item.price * item.quantity) / 100
                      ).toLocaleString("en-US")}
                    </div>
                    <div className="list-card-quantity">
                      <span
                        className="list-card-btn"
                        onClick={() => DecreaseQuantityHandle(key)}
                      >
                        -
                      </span>
                      <span className="list-card-quantity">
                        {item.quantity}
                      </span>
                      <span
                        className="list-card-btn"
                        onClick={() => IncreaseQuantityHandle(key)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="buttons">
            <div className="total-price">
              Нийт дүн: {Number(TotalCart).toLocaleString("en-US")} ₮
            </div>
            <button onClick={saveOrder} className="button">
              <p>Захиалга зөв байна</p>
            </button>
            <button
              // onClick={monpayGetTokenRequest}
              disabled={disable}
              className="button"
            >
              <p>Төлөх</p>
            </button>
            {/* <div onClick={getSystemInfo} className="grid-text">
          <p>getSystemInfo</p>
        </div> */}
          </div>{" "}
        </div>
      ) : (
        <MDBSpinner className="spinner" color="success" />
      )}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  console.log("stateCartPage", state.cartReducer.Carts);
  console.log("loadedGuid", state.guidReducer.guid);
  console.log("loadedOrderStatus", state.guidReducer.orderStatus);

  return {
    loadedCartOrders: state.cartReducer.Carts,
    loadedCategories: state.categoryReducer.loadedCategories,
    loadedSettings: state.settingsReducer.loadedSettings,
    loadedGuid: state.guidReducer.guid,
    loadedOrderVisit: state.guidReducer.orderVisit,
    loadedOrderNumber: state.guidReducer.orderNumber,
    loadedOrderStatus: state.guidReducer.orderStatus,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    DecreaseQuantity: (item) => dispatch(DecreaseQuantity(item)),
    IncreaseQuantity: (item) => dispatch(IncreaseQuantity(item)),
    DeleteCart: (item) => dispatch(DeleteCart(item)),
    setOrderStatusAction: (orderStatus) =>
      dispatch(setOrderStatusAction(orderStatus)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
