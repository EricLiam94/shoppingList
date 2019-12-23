import React, { useState, Fragment } from "react";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import LoginModal from "./auth/LoginModal";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";

function AppNavBar(props) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = props.auth;
  const toggle = () => {
    //inverse
    setOpen(!open);
  };

  // Guest user
  const guestLink = (
    <Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </Fragment>
  );

  // authoriazed user
  const authLink = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          {" "}
          <strong>{user ? `Welcome ${user.name}` : ""} </strong>{" "}
        </span>{" "}
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand herf="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

AppNavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);
