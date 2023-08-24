import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";
import AdminNavbar from "../../Components/AdminNavbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Layout from "../../Components/Layout";
import { useHistory } from "react-router-dom";
import "./style.css";

function VoidOrderPage(props) {
  const [order, setOrder] = useState([]);
  const [paymentName, setPaymentName] = useState("");
  const [orderID, setOrderID] = useState("");
  let history = useHistory();

  useEffect(() => {
    getVoidOrder();
    console.log("void page props datas", props);
  }, []);

  //  get pass orders
  const getVoidOrder = () => {
    axios
      .post(`${SERVERAPI}/api/v1/orders/getvoidorder`, {
        objID: 992500001,
        shiftNum: 876,
        visit: props.match.params.ordervisit,
      })
      .then((result) => {
        console.log("get void order", result.data.data);
        setOrder(result.data.data);
        setPaymentName(result.data.data[0].transiactionInfo.paymentName);
        setOrderID(result.data.data[0].transiactionInfo.order_id);
      })
      .catch((err) => console.log(err.message));
  };

  // void order pass
  const voidOrder = () => {
    switch (paymentName) {
      case "pass":
        axios
          .post(`${SERVERAPI}/api/v1/pass/order_void_pass`, {
            objID: 992500001,
            ecommerce_token: "fb44cca836e94582a73371462ac2eeab",
            order_id: orderID,
          })
          .then((result) => {
            console.log(" void order result", result.data);
          })
          .catch((err) => console.log(err.message));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <AdminNavbar />
      </div>

      <Layout>
        <TableContainer component={Paper}>
          {order.map((e, key) => (
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Object ID: {e.objID}</TableCell>
                  <TableCell align="right">
                    Shift Number: {e.shiftNum}
                  </TableCell>
                  <TableCell align="right">Order visit: {e.visit}</TableCell>
                  <TableCell align="right">
                    Order number: {e.orderDetails.orderNumber}
                  </TableCell>
                </TableRow>
              </TableHead>
              <div></div>
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell align="right">Name:</TableCell>
                  <TableCell align="right">Quantity: </TableCell>
                  <TableCell align="right">Price:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {e.orderDetails.products.map((product, key) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </TableContainer>
        <div className="buttons">
          <Button onClick={voidOrder} variant="outlined" color="error">
            Устгах
          </Button>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            color="warning"
          >
            Хаах
          </Button>
        </div>
      </Layout>
      <div>
        {/* {voidOrder.map((e, key) => (
          <div key={key}>
            <div>Object ID: {e.objID}</div>
            <div>Shift Number: {e.shiftNum}</div>
            <div>Order visit: {e.visit}</div>
            <div>Order number: {e.orderDetails.orderNumber}</div>
            <div>
              {e.orderDetails.products.map((product, key) => (
                <div key={key}>
                  <div>Name : {product.name}</div>
                  <div> Quantity : {product.quantity}</div>
                  <div> Price : {product.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(VoidOrderPage);
