import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import axiosClient from "../../utils/axiosClient";
import { isAxiosError } from "axios";
import { accountAtom } from "../../model";
import { globalAtom } from "../../model/global";
import { useAtom, useSetAtom } from "jotai";

const LoginContainer = () => {
  const [validated, setValidated] = useState(false);

  const [loading, setLoading] = useAtom(accountAtom.loading);
  const setErrorToast = useSetAtom(globalAtom.errorToast);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) return;

    setLoading(true);

    // TEST: wait for 600ms to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const fd = new FormData(form);

    const data = {
      username: fd.get("username"),
      password: fd.get("password"),
    };

    console.log(data);

    try {
      const registerResponse = await axiosClient.post("/login", data);

      console.log(registerResponse.data);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e.message);
        setLoading(false);
        setErrorToast({
          show: true,
          message: e.message,
        });
        clearForm();
        return;
      }
    }
  };

  const clearForm = () => {
    setValidated(false);
  };

  return (
    <>
      <Card className="w-100 mb-3">
        <Card.Header className="text-center">
          <Card.Title>Login to TONDER.</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form
            id="login.info"
            className="d-grid gap-3"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="login.info.username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username..."
                required
              />
            </Form.Group>

            <Form.Group controlId="login.info.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password..."
                required
              />
            </Form.Group>
          </Form>
          <hr />
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            form="login.info"
            disabled={loading}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Login"
            )}
          </Button>
        </Card.Body>
      </Card>
      <span className="text-muted">
        Do not have an account? <a href="/register">Register</a>
      </span>
    </>
  );
};

export default LoginContainer;
