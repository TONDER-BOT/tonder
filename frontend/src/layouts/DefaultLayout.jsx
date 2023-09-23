import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { AlertToast } from "../components/common/AlertToast";
import { useAtom, useAtomValue } from "jotai";
import { globalAtom } from "../model/global";
import { accountAtom } from "../model";

export const DefaultLayout = ({ children }) => {
  const [toast, setErrorToast] = useAtom(globalAtom.errorToast);
  const profile = useAtomValue(accountAtom.profile);

  return (
    <>
      <Navbar expand="md" className="nav" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand className="fw-bold" href="/">
            TONDER
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              <ConnectButton
                showBalance={{ smallScreen: false, largeScreen: false }}
              />
              <div className="ms-4 py-1">
                <a href="/profile">
                  <Image
                    src={profile.photo}
                    roundedCircle
                    style={{
                      maxWidth: "48px",
                      height: "auto",
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    }}
                  />
                </a>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        className="d-flex flex-column w-100 align-items-center p-4"
        style={{ maxWidth: "24rem" }}
      >
        {children}
        <AlertToast
          show={toast.show}
          variant="danger"
          timeout={2000}
          content={toast.message}
          onClose={() => setErrorToast((prev) => ({ ...prev, show: false }))}
        />
      </Container>
    </>
  );
};
