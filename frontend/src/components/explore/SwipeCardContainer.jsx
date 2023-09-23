import React from "react";
import SwipeCard from "./SwipeCard";
import { Spinner } from "react-bootstrap";
import { useAtomValue } from "jotai";
import { exploreAtom } from "../../model";

const SwipeCardContainer = () => {
  const loading = useAtomValue(exploreAtom.loading);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <SwipeCard />
      )}
    </>
  );
};

export default SwipeCardContainer;
