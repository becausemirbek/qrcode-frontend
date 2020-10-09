import React, { useState } from "react";
import { isUserAuthenticated } from "../../helpers/authUtils";
import { Redirect } from "react-router-dom";
import {
  Alert,
  Card,
  Container,
  Button,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
  Row,
} from "reactstrap";
// import { Cookies } from "react-cookie";
import Axios from "axios";
import { API_URL } from "../../helpers/constants";

const Login = (props) => {
  const [state, setState] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleValidSubmit = async (e) => {
    e.preventDefault();
    // const cookie = new Cookies();
    const values = {
      email,
      password,
    };
    try {
      const { data } = await Axios.post(`${API_URL}/api/auth/login`, values);
      // cookie.set("user", JSON.stringify({ token: data.token }));
      localStorage.setItem("user", data.token);
      props.history.push("/");
      // console.log(data);
    } catch (e) {
      setState(e.response);
    }
  };

  if (isUserAuthenticated()) return <Redirect to="/" />;
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col md={6} xs={12}>
          <Card
            className="my-2"
            style={{ boxShadow: "-5px 9px 22px -2px #ddd4d4" }}
          >
            <CardBody>
              {message ? (
                <Alert color="info">{message}</Alert>
              ) : state?.data?.message ? (
                <Alert color="info">{state?.data?.message}</Alert>
              ) : null}
              <h2>Login</h2>
              <Form onSubmit={handleValidSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button className="w-100">Submit</Button>
              </Form>
              <Row className="justify-content-center flex-direction-column">
                <div>
                  У меня нет Аккаунта{" "}
                  <a
                    href="#"
                    onClick={() => props.history.push("/account/register")}
                  >
                    Зарегистрироваться
                  </a>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
