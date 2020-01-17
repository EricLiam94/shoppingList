import React, { useEffect } from "react";
import styled from "./ItemDetail.module.css";
import { connect } from "react-redux";
import { loadingImg } from "../../actions/imgAction";
import { NavLink } from "react-router-dom";

const ItemDetail = props => {
  const name = props.match.params.name;
  const desc = props.location.state.desc;
  const price = props.location.state.price;
  const idx = props.location.state.idx;
  const items = props.items;
  // console.log(props.location.state);
  const leftIdx = idx === 0 ? items.length - 1 : idx - 1;
  const rightIdx = idx === items.length - 1 ? 0 : idx + 1;
  const nextPage = (input_idx, input_item) => {
    return {
      pathname: `/item/${input_item.name}/${input_item._id}`,
      state: {
        desc: input_item.description,
        idx: input_idx,
        price: input_item.price
      }
    };
  };

  useEffect(() => {
    props.loadingImg(name);
  }, [name]);

  return (
    <div className={styled.container}>
      {props.loading && (
        <div>
          <div className={styled.loader}> </div>
          <span> Loading</span>
        </div>
      )}
      {props.img && (
        <ControllerComponent
          leftPage={nextPage(leftIdx, items[leftIdx])}
          rightPage={nextPage(rightIdx, items[rightIdx])}
          url={props.img}
          name={name}
          desc={desc}
        />
      )}
      {props.img && (
        <p className={styled.detail_info}>
          <span className={styled.font_price}> Price : {price} </span>
        </p>
      )}
    </div>
  );
};

const ImgComponent = props => {
  return (
    <div className={styled.polaroid}>
      <div className={styled.face_container}>
        <img
          src={props.url}
          className={styled.img + " " + styled.front_face}
        ></img>{" "}
        <div className={styled.back_face}>
          <p>{props.desc}</p>
        </div>
      </div>
      <div className={styled.img_desc}>
        <p> {props.name} </p>
      </div>
    </div>
  );
};

const ControllerComponent = props => (
  <div className={styled.flex_container}>
    <NavLink to={props.leftPage}>
      {" "}
      <i className={"fas fa-chevron-circle-left " + styled.big_icon}> </i>{" "}
    </NavLink>
    <ImgComponent url={props.url} name={props.name} desc={props.desc} />
    <NavLink to={props.rightPage}>
      {" "}
      <i className={"fas fa-chevron-circle-right " + styled.big_icon}></i>{" "}
    </NavLink>
  </div>
);

const mapStateToProps = state => ({
  img: state.img.img,
  loading: state.img.loading,
  error: state.img.error,
  items: state.item.items
});

export default connect(mapStateToProps, { loadingImg })(ItemDetail);
