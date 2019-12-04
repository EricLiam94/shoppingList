import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../../actions/authAction";
import Proptypes from "prop-types";

function Logout(props) {
  return (
    <Fragment>
      <NavLink onClick={props.logout} href="#">
        {" "}
        Logout{" "}
      </NavLink>
    </Fragment>
  );
}

Logout.propTypes = {
  logout: Proptypes.func.isRequired
};

export default connect(null, { logout })(Logout);
