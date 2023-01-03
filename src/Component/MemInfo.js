import React from "react";
import { Link } from "react-router-dom";

const MemInfo = ({ mem }) => {
  const { memIdx, memName, memEmail, memRegDate, memDeletedYn } = mem;
  return (
    <div>
      <ul key={memIdx}>
        <li>
          <input type="checkbox" />
        </li>
        <li>{memIdx}</li>
        <li>
          <Link to={`/admin_mem/detail/${mem.memIdx}`} state={{ mem: mem }}>
            {memName}
          </Link>
        </li>
        <li>{memEmail}</li>

        <li>{memRegDate}</li>
        <li>{memDeletedYn}</li>
      </ul>
    </div>
  );
};

export default MemInfo;
