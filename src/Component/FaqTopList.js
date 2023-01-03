import React from "react";

const FaqTopList = ({ faqlist, onList }) => {
  const { title } = faqlist;
  return <li onClick={() => onList(title)}>{title}</li>;
};

export default FaqTopList;
