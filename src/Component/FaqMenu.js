import React from "react";
import FaqTopList from "./FaqTopList";

const FaqMenu = ({ list, onList }) => {
  return (
    <div className="service_board_hot">
      <ul>
        {list.map((faqlist, index) => (
          <FaqTopList key={index} faqlist={faqlist} onList={onList} />
        ))}
      </ul>
    </div>
  );
};

export default FaqMenu;
