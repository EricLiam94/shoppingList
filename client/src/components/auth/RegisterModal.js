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
import { register } from "../../actions/authAction";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errAction";

function RegisterModal(props) {
  const [modal, setmodal] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState(null);

  const toggle = useCallback(() => {
    props.clearErrors();
    setmodal(!modal);
  }, [modal, props]);

  const onChange = e => {
    setname(e.target.value);
  };
  const onPwChange = e => {
    setpassword(e.target.value);
  };
  const onEmailChange = e => {
    setemail(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password
    };
    props.register(newUser);
  };

  useEffect(() => {
    const { error, isAuthenticated } = props;
    if (error.id === "REGISTER_FAIL") setmsg(error.msg.msg);
    else setmsg(null);
    if (modal) if (isAuthenticated) toggle();
  }, [props.error, props.isAuthenticated, toggle, modal, props]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        {" "}
        Register{" "}
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register new user</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg} </Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                className="mb-3"
                placeholder="Name"
                onChange={onChange}
              />

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
                Register{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
