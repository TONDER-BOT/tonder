import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import axiosClient from "../../utils/axiosClient";
import { useAtom, useSetAtom } from "jotai";
import { accountAtom } from "../../model";
import { isAxiosError } from "axios";
import { globalAtom } from "../../model/global";
import { useAccount } from "wagmi";

const RegisterContainer = () => {
  const [validated, setValidated] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setLoading] = useAtom(accountAtom.loading);
  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const { address, isConnected } = useAccount();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) return;

    if (!isConnected) {
      setErrorToast({
        show: true,
        message: "Please connect your wallet first.",
      });
      return;
    }

    setLoading(true);

    // TEST: wait for 600ms to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const fd = new FormData(form);
    fd.append("walletAddress", address);

    // convert the FormData object to a regular object and console it
    console.log(Object.fromEntries(fd));

    try {
      const registerResponse = await axiosClient.post("/register", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    <Card className="w-100">
      <Card.Header className="text-center">
        <Card.Title>Start your life on TONDER.</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form
          id="reg.info"
          className="d-grid gap-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="reg.info.photo">
            <Form.Label>Upload your photo!</Form.Label>
            <Form.Control name="photo" type="file" accept="image/*" />
          </Form.Group>
          <Form.Group controlId="reg.info.username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username..."
              required
            />
          </Form.Group>
          <Form.Group controlId="reg.info.password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password..."
              required
            />
          </Form.Group>
          <Form.Group controlId="reg.info.displayName">
            <Form.Label>Profile Name</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              placeholder="Enter profile name..."
              required
            />
          </Form.Group>
          <Form.Group controlId="reg.info.desc">
            <Form.Label>Self Introduction</Form.Label>
            <Form.Control
              as="textarea"
              name="desc"
              placeholder="Enter self introduction..."
              required
            />
          </Form.Group>
          <Form.Group controlId="reg.info.age">
            <Form.Check
              type="checkbox"
              label="I am over 18 years old"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="reg.info.desc">
            <Form.Label>Self Introduction</Form.Label>
            <Form.Control
              as="textarea"
              name="desc"
              placeholder="Enter self introduction..."
              required
            />
          </Form.Group>
        </Form>
        <hr />
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          form="reg.info"
          disabled={!isAdult || loading}
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
            "Create Account"
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RegisterContainer;
