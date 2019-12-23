import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteItem } from "../../actions/itemActions";
import { Button } from "reactstrap";
import "./ItemRow.css";

const ItemRow = props => {
  const onDeleteClick = id => {
    props.deleteItem(id);
  };

  return (
    <div className="row-container">
      <div className="tag">{props.name}</div>
      <div className="tag price-tag">{parseFloat(props.price).toFixed(2)}</div>
      {props.isAuthenticated ? (
        <div>
          <span className="flt-right icon-style">
            <i className="fas fa-wrench grey-tool"></i>
            <Button
              className="flt-right remove-btn "
              color="danger"
              key={props.id}
              size="sm"
              onClick={e => onDeleteClick(props.id)}
            >
              <i class="fas fa-trash-alt"></i>
            </Button>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { deleteItem })(ItemRow);
