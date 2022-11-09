import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
export default ({ children }) => {
  return (
    <Container style={{ backgroundColor: "#fff " }}>
      <div>
        <div>{children}</div>
      </div>
      <footer className="page-footer">
        <div>
          <a href="#">нүүр</a>
          {" | "}
          <a href="#">сургалт</a>
          {" | "}
          <a href="#">фэйсбүүк</a>
        </div>
      </footer>
    </Container>
  );
};
