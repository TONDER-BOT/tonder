import { useAtomValue } from "jotai";
import React from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { exploreAtom } from "../../model";
import PropTypes from "prop-types";

const MatchModal = (props) => {
  const { show, onClose } = props;
  const swipeCard = useAtomValue(exploreAtom.swipeCard);

  return (
    <Modal size="sm" show={show} centered>
      <Modal.Body className="pt-4 pb-3 px-4 text-center">
        <Image
          src={swipeCard.imgURL}
          className="mb-3"
          roundedCircle
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
        <h3 className="text-primary">It's a Match!</h3>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary">Chat</Button>
        <Button variant="light" onClick={onClose}>
          Keep Swipe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MatchModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MatchModal;
