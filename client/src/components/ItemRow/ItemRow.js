import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateItem, deleteItem } from "../../actions/itemActions";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./ItemRow.css";

const ItemRow = props => {
  const [readMode, setreadMode] = useState(true);
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  useEffect(() => {
    setname(props.name);
    setprice(props.price);
  }, [props]);

  const onDeleteClick = id => {
    props.deleteItem(id);
  };

  const priceOnChange = e => {
    setprice(e.target.value);
  };

  const nameOnChange = e => {
    setname(e.target.value);
  };

  const modifyClick = () => setreadMode(!readMode);

  const confirmClick = () => {
    modifyClick();
    props.updateItem({ _id: props.id, name, price });
  };

  return (
    <div className="row-container">
      <input
        type="text"
        value={name}
        readOnly={readMode}
        onChange={nameOnChange}
        className={"tag input-middle"}
      />
      <input
        type="number"
        className={"tag price-tag input-middle"}
        onChange={priceOnChange}
        value={readMode ? parseFloat(price).toFixed(2) : price}
        readOnly={readMode}
      />
      {props.isAuthenticated ? (
        <div className="icon-container">
          <span className="flt-right icon-style">
            <NavLink to={`/item/${props.id}`}>
              <i class="fas fa-directions grey-tool"></i>{" "}
            </NavLink>
            {readMode ? (
              <i className="fas fa-wrench grey-tool" onClick={modifyClick}></i>
            ) : (
              <i className="fas fa-check grey-tool" onClick={confirmClick}></i>
            )}

            <Button
              className="flt-right remove-btn "
              color="danger"
              key={props.id}
              size="sm"
              onClick={e => onDeleteClick(props.id)}
            >
              <i className="fas fa-trash-alt"></i>
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

export default connect(mapStateToProps, { updateItem, deleteItem })(ItemRow);
