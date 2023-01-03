import React from "react";
import MemList from "./MemList";

const MemMenu = ({ list, onList }) => {
  return (
    <div className="list-board-hot">
      <ul>
        {list.map((mem, index) => (
          <MemList key={index} mem={mem} onList={onList} />
        ))}
      </ul>
    </div>
  );
};

export default MemMenu;
