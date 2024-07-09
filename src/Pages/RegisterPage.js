import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function RegisterPage({ onCreatedUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // useNavigate hook to navigate to login page

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false || confirm !== password) {
      setValidated(true);
      if (confirm !== password) {
        setIsValid(true);
      }
      return;
    }

    try {
      await axios.post("http://localhost:3004/api/users", {
        name: name,
        email: email,
        password: password,
      });

      onCreatedUser();
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setValidated(false);
      navigate("/login"); // navigate to login page after successful registration
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const checkMatch = () => {
    setIsValid(confirm !== password);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-start min-vh-100 form-container"
      style={{
        maxWidth: "600px",
        marginTop: "15vh",
      }}
    >
      <div
        className="p-4 border rounded-4 shadow-lg bg-white w-100"
        style={{
          border: "1px solid #007bff",
          boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
        <i>Registration</i>
        </h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!name && validated}
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label style={{ fontWeight: "bold" }}>
              Email address
            </Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!email && validated}
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
              isInvalid={!password && validated}
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label style={{ fontWeight: "bold" }}>
              Confirm Password
            </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={checkMatch}
              isInvalid={isValid || (!confirm && validated)}
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {isValid
                ? "Passwords do not match."
                : "Please confirm your password."}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default RegisterPage;
