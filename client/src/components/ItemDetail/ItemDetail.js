import React, { useState } from "react";
import * as qs from "query-string";

const ItemDetail = props => {
  console.log();

  return <div> Item detail page {props.match.params.id}</div>;
};

export default ItemDetail;
