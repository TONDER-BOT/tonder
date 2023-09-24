import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const ProfilePhotos = () => {
  return (
    <Card className="w-100">
      <Row className="g-0">
        <Col className="p-0" xs={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col className="p-0" xs={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col className="p-0" xs={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col className="p-0" xs={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col className="p-0" xs={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col className="p-0" xs={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ProfilePhotos;
