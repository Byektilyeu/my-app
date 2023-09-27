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
import toast, { Toaster } from "react-hot-toast";
import "./style.css";

function VoidOrderPage(props) {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [paymentName, setPaymentName] = useState("");
  const [orderID, setOrderID] = useState("");
  let history = useHistory();

  useEffect(() => {
    getVoidOrder();
    console.log("void page props datas", props);
  }, []);

  //  get void order
  const getVoidOrder = () => {
    axios
      .post(`${SERVERAPI}/api/v1/orders/getvoidorder`, {
        objID: props.loadedShift.objID,
        shiftNum: props.loadedShift.shiftNum,
        visit: props.match.params.ordervisit,
      })
      .then((result) => {
        console.log("get void order", result.data.data);
        setOrder(result.data.data);
        setStatus(result.data.data[0].status);
        setPaymentName(result.data.data[0].transiactionInfo.paymentName);
        // setOrderID(result.data.data[0].transiactionInfo.order_id); // product
        setOrderID(result.data.data[0].transiactionInfo.order_id.substring(21)); //test version
      })
      .catch((err) => console.log(err.message));
  };

  // void order pass
  const voidOrder = () => {
    // voidOrderRkeeper();
    switch (paymentName) {
      case "pass":
        axios
          .post(`${SERVERAPI}/api/v1/pass/order_void_pass`, {
            objID: props.loadedShift.objID,
            ecommerce_token: props.loadedSettings.passToken,
            order_id: orderID,
          })
          .then((result) => {
            console.log(" void order result ==> ", result.data);
            if (result.data.data.status_code == "ok") {
              // toast.error(
              //   "Pass error: Буцаалт амжилтгүй боллоо!!!, status code: ",
              //   result.data.data.status_code
              // );
              voidOrderRkeeper();
            } else {
              toast.error(
                "Pass error: Буцаалт амжилтгүй боллоо!!!, status code: ",
                result.data.data.status_code
              );
            }
          })
          .catch((err) => console.log(err.message));
        break;
      default:
        break;
    }
  };

  const voidOrderRkeeper = () => {
    axios
      .post(`${SERVERAPI}/api/v1/rkeeper/deletereceipt`, {
        receiptNum: order[0].payOrder.checkNum,
        objID: props.loadedShift.objID,
      })
      .then((result) => {
        const obj = JSON.parse(result.data.data);
        const managerID = JSON.parse(result.data.managerID);
        if (obj.RK7QueryResult._attributes.Status == "Ok") {
          deleteReceiptSuccess(obj.RK7QueryResult._attributes, managerID);
          toast.success(
            "R-Keeper,  Буцаалт  амжилттай хийгдлээ. Дансаа шалгана уу?"
          );

          //  void info insert to mongo db database
        } else {
          toast.error(
            "R-Keeper error: Буцаалт амжилтгүй боллоо!!!,  error text r-keeper: ",
            obj.RK7QueryResult._attributes.ErrorText
          );
        }
        console.log(
          "void order rkeeper !!!!!!!!!!!!!!  ==>",
          obj.RK7QueryResult._attributes.Status
        );
      })
      .catch((err) => console.log(err.message));
  };

  const deleteReceiptSuccess = (objResult, managerID) => {
    axios
      .post(`${SERVERAPI}/api/v1/orders/deletereceiptsuccess`, {
        visit: props.match.params.ordervisit,
        status: 7,
        cashierID: managerID,
        deletedDate: objResult.DateTime,
        deletedPerson: props.user.username,
      })
      .then((result) => {
        console.log("deleteReceiptSuccess amjilttai");
      })
      .catch((err) => console.log(err.message));
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
      <Toaster position="top-center" reverseOrder={false} />

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
                    <TableCell align="right">
                      {product.price / 100} x {product.quantity} =
                      {(product.price * product.quantity) / 100}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </TableContainer>
        <div className="buttons">
          {status == 6 && (
            <Button onClick={voidOrder} variant="outlined" color="error">
              Устгах
            </Button>
          )}
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
    loadedSettings: state.settingsReducer.loadedSettings,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VoidOrderPage);
