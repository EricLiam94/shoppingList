import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, searchItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

function ShoppingList(props) {
  const getItems = props.getItems;
  const [items, setitems] = useState([]);
  const [search, setsearch] = useState(null);

  useEffect(() => {
    getItems();
  }, [getItems]);
  const onDeleteClick = id => {
    props.deleteItem(id);
  };

  const onChange = e => {
    e.preventDefault();
    props.searchItem(e.target.value);
  };

  return (
    <Container>
      <div>
        <input
          type="text"
          color="dark"
          placeholder="Search item"
          className="form-control mb-5 dark"
          onChange={onChange}
        />
      </div>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {props.display.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {props.isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    key={_id}
                    size="sm"
                    onClick={e => onDeleteClick(_id)}
                  >
                    {" "}
                    &times;
                  </Button>
                ) : (
                  ""
                )}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  display: state.item.display
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchItem }, dispatch);
};

export default connect(mapStateToProps, { getItems, deleteItem, searchItem })(
  ShoppingList
);
