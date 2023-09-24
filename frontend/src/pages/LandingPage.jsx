import React from "react";
import { Button } from "react-bootstrap";

export const LandingPage = () => {
  return (
    <div className="text-center my-5">
      <div style={{ marginBottom: "5rem" }}>
        <h1 className="text-light" style={{ fontSize: "4rem" }}>
          TONDER
        </h1>
        <p className="text-muted">
          The Open Network of Deeply Engaged Relationship
        </p>
      </div>
      <div style={{ marginBottom: "5rem" }}>
        <h3 className="text-light mb-3">
          Prove your personhood and join the network.
        </h3>
        <p className="text-muted">
          TONDER uses World ID to verify your personhood. Zero knowledge proof
          techonology used, privacy protected.
        </p>
      </div>
      <div style={{ marginBottom: "5rem" }}>
        <h3 className="text-light mb-3">
          Meet up, verify, and build your credibility.
        </h3>
        <p className="text-muted">
          TONDER sits on the foundation of credibility. Meet up with people in
          person, send verification when you two are around, we will prove your
          meet up using Zero Knowledge Proof technology.
        </p>
      </div>
      <div style={{ marginBottom: "5rem" }}>
        <h3 className="text-light mb-3">
          Unfakeable, <br />
          Unforgeable.
        </h3>
        <p className="text-muted">
          All the meet up record is stored on the blockchain, unfakeable, and
          last forever. We assure you that you will never be catfished again.
        </p>
      </div>
      <Button className="mb-3" variant="primary" href="/register">
        Start Your Journey.
      </Button>
      <div className="text-muted">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};
