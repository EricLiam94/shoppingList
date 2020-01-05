import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, searchItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ItemRow from "./ItemRow/ItemRow";
import TableTitle from "./TableTitle/TableTitle";

function ShoppingList(props) {
  const getItems = props.getItems;

  useEffect(() => {
    getItems();
  }, [getItems]);

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
      <div style={{ position: "relative" }}>
        <ListGroup>
          <TableTitle length={props.display.length} />
          <TransitionGroup className="shopping-list">
            {props.display.map(({ _id, name, price }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <ItemRow price={price} name={name} id={_id} />
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        {props.display.length > 0 ? (
          ""
        ) : (
          <div id="err_msg" className="err pop-up">
            <i className="fas fa-exclamation-triangle"></i>
            <h1> Ops, no such item </h1>
          </div>
        )}
      </div>
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

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ searchItem }, dispatch);
// };

export default connect(mapStateToProps, { getItems, searchItem })(ShoppingList);
