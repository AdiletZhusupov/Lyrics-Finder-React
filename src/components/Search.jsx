import React from "react";
import { Container, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Search(props) {
  return (
    <Container className="border my-3 py-5">
      <h1>
        <FontAwesomeIcon icon={faMusic} /> {props.text1}
      </h1>
      <h6>{props.text2}</h6>
      <Input
        value={props.searchText}
        onKeyPress={(e) => {
          props.handlePress(e);
        }}
        onChange={(e) => {
          props.handleChange(e);
        }}
        placeholder={props.placeholder}
        className="my-3"
      />
      <Button
        onClick={() => {
          props.handleClick();
        }}
        className="w-100"
        color="primary"
      >
        {props.text3}
      </Button>
    </Container>
  );
}

export default Search;
