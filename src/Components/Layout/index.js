import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
export default ({ children }) => {
  return (
    <Container style={{ backgroundColor: "#fff ", marginBottom: "6rem" }}>
      <div>
        <div>{children}</div>
      </div>
    </Container>
  );
};
