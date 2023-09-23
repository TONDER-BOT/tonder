import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar className="nav" variant="dark" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold" href="/">
              TONDER
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/login">
              <Nav.Link href="/login">Login</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="align-items-center">
            <ConnectButton />
            <div className="ms-3 py-1">
              <span className="me-3">User Name</span>
              <Link to="/profile">
                <Image
                  height="48"
                  src="https://dummyimage.com/128"
                  roundedCircle
                />
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-flex flex-column w-100 align-items-center py-4">
        {children}
        {/* <AlertToast
          show={toast.show}
          variant="danger"
          timeout={2000}
          content={toast.message}
          onClose={() => setErrorToast((prev) => ({ ...prev, show: false }))}
        /> */}
      </Container>
    </>
  );
};
