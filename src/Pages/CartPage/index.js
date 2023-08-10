import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../Components/Layout";
import { SERVERAPI } from "../../Constants/Routes";
import { MDBSpinner } from "mdb-react-ui-kit";
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
  const [orderPage, setOrderPage] = useState(false);
  const [orderGuid, setOrderGuid] = useState("");
  const [orderVisit, setOrderVisit] = useState("");
  let TotalCart = 0;

  useEffect(() => {
    setLoading(true);
    setOrderGuid(props.loadedGuid);
    setOrderVisit(props.loadedOrderVisit);
  }, [loading, orderPage]);

  // list cart ruu cart-iin zahialguudiig push hiij hiih
  Object.keys(props.loadedCartOrders).forEach(function (item) {
    TotalCart +=
      (props.loadedCartOrders[item].quantity *
        props.loadedCartOrders[item].price) /
      100;
  });

  // *********************************************************** PASS ****************************************************/

  // create order request pass
  const createOrderPass = async () => {
    const configCreateOrderPass = {
      method: "post",
      url: `${SERVERAPI}/api/v1/pass/createorderpass`,
      data: {
        ecommerce_token: "fb44cca836e94582a73371462ac2eeab",
        amount: TotalCart,
      },
    };
    let createOrderResponse = await axios(configCreateOrderPass);
    let createOrderResponseJson = JSON.parse(createOrderResponse.data.data);
    //  open pass app // deeplink
    window.open(
      `pass://deeplink.io/order/${createOrderResponseJson.ret.order_id}`,
      "_blank"
    );
    console.log("create_order_pass_response: ", createOrderResponseJson);
    console.log(
      "create_order_pass_response: ",
      `pass://deeplink.io/order/${createOrderResponseJson.ret.order_id}`
    );
    if (createOrderResponseJson.status_code === "ok") {
      await orderInquiryPass(createOrderResponseJson.ret.order_id);
    } else {
      toast.error("Уучлаарай, амжилтгүй боллоо!");
    }
  };

  // order inquiry request pass
  const orderInquiryPass = async (order_id) => {
    var timer = 0;
    var interval = setInterval(async () => {
      const configOrderInquiryPass = {
        method: "post",
        url: `${SERVERAPI}/api/v1/pass/order_inquiry_pass`,
        data: {
          ecommerce_token: "fb44cca836e94582a73371462ac2eeab",
          order_id: order_id,
        },
      };
      let orderInquiryResponse = await axios(configOrderInquiryPass);
      let orderInquiryResponseJson = JSON.parse(orderInquiryResponse.data.data);
      console.log("order_inquiry_pass_response: ", orderInquiryResponseJson);
      console.log("first", props);

      if (orderInquiryResponseJson.ret.resp_code == "000") {
        // popup allowed
        if (orderInquiryResponseJson.ret.status === "paid") {
          clearInterval(interval);
          const visit = props.loadedOrderVisit;
          const configInsertOrderPass = {
            method: "post",
            url: `${SERVERAPI}/api/v1/orders/insertordertransiactioninfo`,
            data: {
              paymentName: "pass",
              visit: visit,
              extra_data: orderInquiryResponseJson.ret.extra_data,
            },
          };
          setOrderPage(true);
          setLoading(false);
          toastNotif();
          payOrder();
          let insertOrderPassResponse = await axios(configInsertOrderPass);
        }
      } else if (timer == 59) {
        toast.error("Уучлаарай, Амжилтгүй боллоо!!!");
        clearInterval(interval);
      }
      timer++;
    }, 3000);
  };
  const toastNotif = () =>
    toast.success("Амжилттай төлөгдлөө!", { duration: 20000 });

  // ************************************************************* MONPAY ************************************************************************/
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

  // ************************************************************************* R-KEEPER **************************************************************/

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

  // Save Order R-keeper
  const saveOrder = async () => {
    setDisable(false);
    const settings = props.loadedSettings;

    const cartOrders = props.loadedCartOrders;
    console.log("CArts: ", cartOrders);
    const guid = props.loadedGuid;
    const orderVisit = props.loadedOrderVisit;
    const orderNumber = props.loadedOrderNumber;
    var orderStatus = props.loadedOrderStatus;

    const shiftNum = props.loadedShift.shiftNum;
    const objID = props.loadedShift.objID;
    console.log("order Status1 :: ", orderStatus);

    if (orderStatus == 0) {
      await createOrderMongoDB(
        orderVisit,
        orderNumber,
        guid,
        cartOrders,
        shiftNum,
        objID
      );
    } else {
      await updateOrderMongoDB(guid, cartOrders, orderVisit);
    }

    orderStatus = orderStatus + 1;
    props.setOrderStatusAction(orderStatus);

    const configSaveOrder = {
      method: "post",
      url: `${SERVERAPI}/api/v1/rkeeper/saveorder`,
      data: {
        orders: cartOrders,
        guid: guid,
        username: settings.username,
        password: settings.password,
        hostname: settings.IP,
        port: settings.port,
      },
    };
    let saveOrder = await axios(configSaveOrder);
    const myObj = JSON.parse(saveOrder.data.data);
    console.log("Save order ====> ", myObj);
  };

  // Pay Order R-keeper
  const payOrder = async () => {
    const settingsData = props.loadedSettings;

    const configPayOrder = {
      method: "post",
      url: `${SERVERAPI}/api/v1/rkeeper/payorder`,
      data: {
        username: settingsData.username,
        password: settingsData.password,
        guid: orderGuid,
        stationCode: settingsData.stationCode,
        paymentID: settingsData.paymentID,
        amount: TotalCart * 100,
        cashierCode: settingsData.cashierCode,
        hostname: settingsData.IP,
        port: settingsData.port,
      },
    };
    let payOrder = await axios(configPayOrder);
    const myObj = JSON.parse(payOrder.data.data);
    const orderAmount = myObj.RK7QueryResult.PrintCheck._attributes.amount;
    const checkNum = myObj.RK7QueryResult.PrintCheck._attributes.CheckNum;
    const closedDate = myObj.RK7QueryResult.PrintCheck._attributes.printTime;
    const dDTD = myObj.RK7QueryResult.PrintCheck._attributes.GlobalFiscalID;

    // if (myObj.status === "ok") {

    const configInsertPayOrder = {
      method: "post",
      url: `${SERVERAPI}/api/v1/orders/insertpayorder`,
      data: {
        visit: orderVisit,
        dDTD: dDTD,
        orderAmount: orderAmount,
        checkNum: checkNum,
        closedDate: closedDate,
      },
    };
    let insertPayOrderResponse = await axios(configInsertPayOrder);
    // }
  };

  // ******************************************************* MONGO DB ***************************************************/

  // update order mongoDB
  const updateOrderMongoDB = async (guid, cartOrders, orderVisit) => {
    const configUpdateOrderMongoDB = {
      method: "post",
      url: `${SERVERAPI}/api/v1/orders/insertorderdetails`,
      data: {
        visit: orderVisit,
        orderVisit: orderVisit,
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
    cartOrders,
    shiftNum,
    objID
  ) => {
    const configCreateOrderMongoDB = {
      method: "post",
      url: `${SERVERAPI}/api/v1/orders/insertorderdetails`,
      data: {
        shiftNum: shiftNum,
        objID: objID,
        visit: orderVisit,
        orderVisit: orderVisit,
        orderNumber: orderNumber,
        orderGuid: guid,
        products: cartOrders,
      },
    };
    let createOrderMongoDB = await axios(configCreateOrderMongoDB);
    console.log("createOrderMongoDB ====> ", createOrderMongoDB.data.data);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
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
        {orderPage && (
          <div className="success-order">Таны захиалга амжилттай боллоо.</div>
        )}

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
            <div className="total-price">
              Нийт дүн: {Number(TotalCart).toLocaleString("en-US")} ₮
            </div>
          </div>
        ) : (
          <MDBSpinner className="spinner" color="success" />
        )}
        {!orderPage && (
          <div className="buttons">
            <button onClick={saveOrder} className="button">
              <p>Захиалга зөв байна</p>
            </button>
            <button
              // onClick={monpayGetTokenRequest}
              // pass
              onClick={createOrderPass}
              disabled={disable}
              className="button"
            >
              <p>Төлөх</p>
            </button>
            {/* <div onClick={getSystemInfo} className="grid-text">
          <p>getSystemInfo</p>
        </div> */}
          </div>
        )}
      </Layout>
    </div>
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
    loadedShift: state.shiftReducer.loadedShift,
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
