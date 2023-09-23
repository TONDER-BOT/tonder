import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { exploreAtom } from "../../model";

const SwipeCard = () => {
  const swipeCard = useAtomValue(exploreAtom.swipeCard);
  const setLoading = useSetAtom(exploreAtom.loading);

  const handleUnlike = async () => {
    console.log("unlike");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
  };

  const handleLike = async () => {
    console.log("like");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={swipeCard.imgURL} />
      <Card.Body>
        <Card.Title>{swipeCard.name}</Card.Title>
        <Card.Text>{swipeCard.desc}</Card.Text>
        <Row>
          <Col xs={6} className="pe-0">
            <Button
              className="w-100"
              variant="light"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              onClick={handleUnlike}
            >
              🚫 Unlike
            </Button>
          </Col>
          <Col xs={6} className="ps-0">
            <Button
              className="w-100"
              variant="primary"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              onClick={handleLike}
            >
              😍 Like
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SwipeCard;
