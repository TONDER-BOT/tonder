import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { exploreAtom } from "../../model";
import PropTypes from "prop-types";

const SwipeCard = (props) => {
  const { onMatch } = props;

  const swipeCard = useAtomValue(exploreAtom.swipeCard);
  const [liking, setLiking] = useAtom(exploreAtom.liking);
  const [loading, setLoading] = useAtom(exploreAtom.loading);

  const handleUnlike = async () => {
    console.log("unlike");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
  };

  const handleLike = async () => {
    console.log("like");
    setLiking(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    onMatch();
    setLiking(false);
  };

  return (
    <Card className="w-100">
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
              disabled={liking || loading}
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
              disabled={liking || loading}
            >
              {liking ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "😍 Like"
              )}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

SwipeCard.propTypes = {
  onMatch: PropTypes.func.isRequired,
};

export default SwipeCard;
