import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

function MyNav(props) {
  return (
    <Navbar color="dark" dark>
      <NavbarBrand className="heading" href="/">
        {props.text}
      </NavbarBrand>
    </Navbar>
  );
}

export default MyNav;
