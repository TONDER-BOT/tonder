import React, { useState } from "react";
import SwipeCard from "./SwipeCard";
import { Spinner } from "react-bootstrap";
import { useAtomValue } from "jotai";
import { exploreAtom } from "../../model";
import MatchModal from "./MatchModal";

const SwipeCardContainer = () => {
  const loading = useAtomValue(exploreAtom.loading);
  const [matchModalShow, setMatchModalShow] = useState(false);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <SwipeCard
          onMatch={() => {
            setMatchModalShow(true);
          }}
        />
      )}
      <MatchModal
        show={matchModalShow}
        onClose={() => {
          setMatchModalShow(false);
        }}
      />
    </>
  );
};

export default SwipeCardContainer;
