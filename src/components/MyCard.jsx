import React from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faGreaterThan,
  faPlay,
  faRecordVinyl
} from "@fortawesome/free-solid-svg-icons";

function MyCard(props) {
  return (
    <Col sm="6" className="my-card my-2">
      <Card body className="h-100">
        <CardTitle tag="h5">{props.artistName}</CardTitle>
        <CardText>
          <FontAwesomeIcon icon={faPlay} /> <strong>Track: </strong>
          {props.trackName}
        </CardText>
        <CardText>
          <FontAwesomeIcon icon={faRecordVinyl} /> <strong>Album: </strong>
          {props.albumName}
        </CardText>
        <Link className="link" to={`details/${props.trackID}`}>
          {" "}
          <FontAwesomeIcon icon={faGreaterThan} /> {props.linkText}
        </Link>
      </Card>
    </Col>
  );
}

export default MyCard;
