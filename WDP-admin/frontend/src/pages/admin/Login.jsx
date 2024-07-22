import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/logo.png";
import userIcon from "../../assets/images/user.png";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      const { token, data } = result;
      const { role, ...userData } = data;

      dispatch({ type: "LOGIN_SUCCESS", payload: { ...userData, role } });
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User" />
                </div>
                <h1>Admin Login</h1>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      required
                      value={credentials.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                      value={credentials.password}
                    />
                  </FormGroup>
                  <Button
                    className="btn  auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
