import React, { useState } from "react";
import Paging from "./Paging";
import { Link } from "react-router-dom";
import MemInfo from "./MemInfo";
import "../CSS/List.css";

const MemberList = ({ memlist }) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 15;
  const count = memlist.length;
  const [pagecount, setPageCount] = useState(15);

  return (
    <>
      <div className="list-contents">
        {memlist.slice(offset, offset + 15).map((mem) => (
          <MemInfo key={mem.memIdx} mem={mem} />
        ))}
      </div>
      <Paging
        page={page}
        setPage={setPage}
        count={count}
        pagecount={pagecount}
      />
    </>
  );
};

export default MemberList;
