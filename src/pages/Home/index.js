import React, { useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import QrReader from "react-qr-reader";
import Axios from "axios";
import { API_URL } from "../../helpers/constants";
// import { Cookies } from "react-cookie";

const Home = (props) => {
  const [state, setState] = useState(null);
  // const cookie = new Cookies();
  const token = localStorage.getItem("user");
  if (!token) props.history.push("/account/login");

  const handleScan = async (data) => {
    if (data) {
      setState(data);
      try {
        await Axios({
          method: "POST",
          url: `${API_URL}/api/qr-code/add`,
          headers: { Authorization: `JWT ${token}` },
          data: { qrcode: `${data}` },
        });
        props.history.push("/success");
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const handleClick = async () => {
    try {
      await Axios({
        method: "POST",
        url: `${API_URL}/api/qr-code/add`,
        headers: { Authorization: `JWT ${token}` },
        data: { qrcode: "coding is easy" },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div>
      <h1> Home </h1>
      <Row className="flex-column">
        <Col md={6} sm={12}>
          <Card>
            <CardBody>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
            </CardBody>
          </Card>
        </Col>

        <div className="col-md-6">
          <Card>
            <Button onClick={() => handleClick()}>click</Button>
            <CardBody>
              <p>{state}</p>
            </CardBody>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Home;
