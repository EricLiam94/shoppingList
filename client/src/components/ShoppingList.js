import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

function ShoppingList(props) {
  const getItems = props.getItems;
  useEffect(() => {
    getItems();
  }, [getItems]);
  const onDeleteClick = id => {
    console.log(id);
    props.deleteItem(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {props.item.items.map(({ _id, name }) => (
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
