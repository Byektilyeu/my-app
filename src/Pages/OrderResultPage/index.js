import React, { useEffect } from "react";

import Layout from "../../Components/Layout";

// busad
function OrderResultPage(props) {
  useEffect(() => {
    console.log("params", props.match.params);
  }, []);

  return (
    <Layout>
      <div style={{ textAlign: "center", margin: "100px" }}>
        Order result page
      </div>
    </Layout>
  );
}

export default OrderResultPage;
