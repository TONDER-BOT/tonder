import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const MatchedListItem = ({ profile }) => {
  return (
    <ListGroup.Item className="d-flex align-items-center py-3">
      <Image
        src={profile.photo}
        roundedCircle
        style={{
          maxWidth: "40%",
          height: "auto",
          objectFit: "cover",
          aspectRatio: "1/1",
        }}
      />
      <div className="ps-3">
        <h4 className="mb-2">{profile.displayName}</h4>
        {profile.desc}
      </div>
    </ListGroup.Item>
  );
};

MatchedListItem.propTypes = {
  profile: PropTypes.objectOf({
    photo: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchedListItem;
