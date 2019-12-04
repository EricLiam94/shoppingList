import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

function ItemModal(props) {
  const [modal, setmodal] = useState(false);
  const [name, setname] = useState("");

  const toggle = () => {
    setmodal(!modal);
  };

  const onChange = e => {
    setname(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: name
    };
    props.addItem(newItem);
    toggle();
  };

  return (
    <div>
      {props.isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          {" "}
          Add Item{" "}
        </Button>
      ) : (
        <h4 className="mb-3 ml-4"> Please login to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To List </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item"></Label>
              <Input
                id="item"
                type="text"
                name="name"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {" "}
                Confirm{" "}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
