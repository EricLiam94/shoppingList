import React, { useState } from "react";
import "./TableTitle.css";
import { connect } from "react-redux";
import { sortByPriceASC, sortByPriceDESC } from "../../actions/itemActions";

const TableTitle = props => {
  const [ASC, setASC] = useState(false);
  const [DESC, setDESC] = useState(false);

  const priceASC = e => {
    props.sortByPriceASC();
    setASC(true);
    setDESC(false);
  };

  const priceDESC = e => {
    props.sortByPriceDESC();
    setDESC(true);
    setASC(false);
  };

  return (
    <div>
      {props.length > 0 ? (
        <div className="row-container black-container title-padding">
          <div>
            <h3> Name </h3>
          </div>
          <div className="sort-container ">
            <h3>
              {" "}
              Price($)
              <i
                className={
                  "fas fa-sort-amount-up-alt sort-icon " +
                  (ASC ? "sort-icon-activate" : "")
                }
                onClick={priceASC}
              ></i>
              <i
                className={
                  "fas fa-sort-amount-down sort-icon " +
                  (DESC ? "sort-icon-activate" : "")
                }
                onClick={priceDESC}
              ></i>{" "}
            </h3>
          </div>
          {props.isAuth && <h3> Operation </h3>}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { sortByPriceASC, sortByPriceDESC })(
  TableTitle
);
