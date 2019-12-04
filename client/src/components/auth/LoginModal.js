import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import { login } from "../../actions/authAction";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errAction";

function LoginModal(props) {
  const [modal, setmodal] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState(null);

  const toggle = useCallback(() => {
    props.clearErrors();
    setmodal(!modal);
  }, [modal, props]);

  const onPwChange = e => {
    setpassword(e.target.value);
  };
  const onEmailChange = e => {
    setemail(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const user = { email, password };
    //attemp to login
    props.login(user);
  };

  useEffect(() => {
    const { error, isAuthenticated } = props;
    if (error.id === "LOGIN_FAIL") setmsg(error.msg.msg);
    else setmsg(null);
    if (modal) if (isAuthenticated) toggle();
  }, [props.error, props.isAuthenticated, toggle, modal, props]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        {" "}
        Login{" "}
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg} </Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="mb-3"
                name="email"
                placeholder="Email"
                onChange={onEmailChange}
              />
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                className="mb-3"
                placeholder="Password"
                onChange={onPwChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {" "}
                Login{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
