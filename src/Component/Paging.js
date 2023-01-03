import { useState } from "react";
import Pagination from "react-js-pagination";
import "../CSS/Paging.css";

function Paging({ page, count, setPage, pagecount }) {
  const numPages = Math.ceil(count / 10);

  return (
    <div id="paging">
      <Pagination
        activePage={page} //현재 페이지
        itemsCountPerPage={pagecount} //한 페이지에 보여줄 아이템 갯수
        totalItemsCount={count} //총 아이템 갯수
        pageRangeDisplayed={numPages} //보여줄 페이지의 범위
        prevPageText={"‹"}
        nextPageText={"›"}
        firstPageText={"«"}
        lastPageText={"»"}
        onChange={setPage} //페이지 바뀔 때 핸들링함수
      />
    </div>
  );
}

export default Paging;
