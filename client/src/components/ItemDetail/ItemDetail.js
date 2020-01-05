import React, { useEffect } from "react";
import styled from "./ItemDetail.module.css";
import { connect } from "react-redux";
import { loadingImg } from "../../actions/imgAction";

const ItemDetail = props => {
  const name = props.match.params.name;

  useEffect(() => {
    props.loadingImg(name);
  }, [name]);

  return (
    <div className={styled.container}>
      {props.loading ? <div className={styled.loader}></div> : null}
      {props.img ? <ImgComponent url={props.img} name={name} /> : null}
      Item detail page {props.match.params.id}
    </div>
  );
};

const ImgComponent = props => {
  return (
    <div className={styled.polaroid}>
      <img src={props.url} className={styled.img}></img>{" "}
      <div className={styled.img_desc}>
        <p> {props.name} </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  img: state.img.img,
  loading: state.img.loading,
  error: state.img.error
});

export default connect(mapStateToProps, { loadingImg })(ItemDetail);
