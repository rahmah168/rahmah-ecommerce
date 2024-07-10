import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const AdminPanale = 'admin@gmail.com'

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await axios.get(`https://rahmahsaif-app-9ed0f6bb8452.herokuapp.com/api/users/${email}/${password}`);
      if (response.data && response.data.length > 0) {
        onLogin(response.data);
        if (email === AdminPanale){
          navigate('/admin')
        }else{
          navigate("/product");
        }
      } else {
        setErrorMessage("Invalid Email or Password");
        setValidated(false); // Ensure the form is marked as invalid
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setValidated(false); // Ensure the form is marked as invalid
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-start min-vh-100" style={{ maxWidth: "600px",  marginTop: "30vh" }}>
      <div className="p-4 border rounded-3 shadow-lg bg-light w-100">
        <h2 className="text-center mb-4"><i>Login</i></h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label style={{ fontWeight: "bold" }}>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={validated && !email} // Display invalid state based on validation and empty value
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={validated && !password} // Display invalid state based on validation and empty value
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
