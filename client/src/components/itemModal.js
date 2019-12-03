import React, { useState, useEffect } from "react";
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
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        {" "}
        Add Item{" "}
      </Button>
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

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);
