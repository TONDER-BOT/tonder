import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { accountAtom } from "../../model";
import { useAtomValue } from "jotai";
import MatchedListItem from "./MatchedListItem";

const MatchedList = () => {
  const profile = useAtomValue(accountAtom.profile);

  return (
    <>
      <h3 className="mb-3">Matched</h3>
      <Card className="w-100">
        <ListGroup variant="flush">
          <MatchedListItem profile={profile} />
          <MatchedListItem profile={profile} />
          <MatchedListItem profile={profile} />
          <MatchedListItem profile={profile} />
          <MatchedListItem profile={profile} />
        </ListGroup>
      </Card>
    </>
  );
};

export default MatchedList;
