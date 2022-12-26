import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
} from "../../redux/actions/CartActions";
import "./style.css";
import CartNavbar from "../../Components/CartNavbar/index";
import back from "../../Assets/back.png";
import { connect } from "react-redux";
import axios from "axios";
import https from "https";

function CartPage(props) {
  console.log("LoadedSettingsCartPage", props.loadedSettings);
  let ListCart = [];
  let TotalCart = 0;
  Object.keys(props.itemsHaha).forEach(function (item) {
    TotalCart +=
      (props.itemsHaha[item].quantity * props.itemsHaha[item].price) / 100;
    ListCart.push(props.itemsHaha[item]);
  });

  function TotalPrice(price, tonggia) {
    return Number((price * tonggia) / 100).toLocaleString("en-US");
  }

  const createOrder = async () => {
    const resp = await axios({
      url: "https://10.0.0.111:8086/rk7api/v0/xmlinterface.xml",
      method: "POST",
      auth: {
        username: "http_user1",
        password: "9",
      },
      httpsAgent: new https.request({
        rejectUnauthorized: false,
      }),
    });

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST", "https://10.0.0.111:8086/rk7api/v0/xmlinterface.xml");
    // var xmlDoc;
    // xmlhttp.onreadystatechange = function () {
    //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //     xmlDoc = xmlhttp.responseXML;
    //     console.log(xmlDoc);
    //   }
    // };
    // xmlhttp.setRequestHeader("Content-Type", "application/xml");
    // var xml = `<?xml version="1.0" encoding="UTF-8"?>
    //   <RK7Query>
    //       <RK7CMD CMD="CreateOrder">
    //           <Order>
    //               <Table code="2"/>
    //               <Waiter code="7"/>
    //               <Station id="15002"/>
    //           </Order>
    //       </RK7CMD>
    //   </RK7Query>`;
    // xmlhttp.send(xml);
  };

  return (
    <Layout>
      <div className="list-nav">
        <CartNavbar
          title="Таны сагс"
          back={back}
          hallplan={props.match.params.hallplansid}
          table={props.match.params.tableid}
        />
      </div>

      <div className="cards">
        {ListCart.map((item, key) => {
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
                  ={TotalPrice(item.price, item.quantity)}₮
                </div>
                <div className="list-card-quantity">
                  <span
                    className="list-card-btn"
                    onClick={() => props.DecreaseQuantity(key)}
                  >
                    -
                  </span>
                  <span className="list-card-quantity">{item.quantity}</span>
                  <span
                    className="list-card-btn"
                    onClick={() => props.IncreaseQuantity(key)}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pay">
        <div onClick={createOrder} className="grid-text">
          <p>Төлөх</p>
        </div>
        <div className="total-price">
          Нийт дүн: {Number(TotalCart).toLocaleString("en-US")} ₮
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  console.log("stateCartPage", state.cartReducer.Carts);
  return {
    itemsHaha: state.cartReducer.Carts,
    loadedCategories: state.categoryReducer.loadedCategories,
    loadedSettings: state.settingsReducer.loadedSettings,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    DecreaseQuantity: (item) => dispatch(DecreaseQuantity(item)),
    IncreaseQuantity: (item) => dispatch(IncreaseQuantity(item)),
    DeleteCart: (item) => dispatch(DeleteCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
