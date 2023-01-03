import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import '../CSS/AdminQna.css'
import AdminQnaModal from "./AdminQnaModal";
import Paging from "./Paging";


const AdminBoard = () => {

  let [qnaModal, setQnaModal] = useState(false);
  const [qnaDatas, setQnaDatas] = useState([]);
  const [qnaIdx, setQnaIdx] = useState();

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const [pagecount, setPageCount] = useState(10);
  const count = qnaDatas.length;


  // useEffect(() => {
  //   const admin = sessionStorage.getItem('adminCheck')
  //   if (admin !== '1') {
  //     alert("관리자만 접근 가능합니다.");
  //     Navigate('/login');
  //   }
  // }, [])


  useEffect(() => {
    axios.get("http://localhost:8080/admin/qna", {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(response => {
        setQnaDatas(response.data);
      })
      .catch(error => { console.log(error); });
  }, []);

  return (
    <>
      <div className="adminqna_list">
        <div className="adminqna_header"><strong>관리자 QNA</strong></div>
        <table className="admin_qna_table">
          <thead >
            <tr>
              <th width="11%">글번호</th>
              <th width="16%">상품번호</th>
              <th width="40%">제목</th>
              <th width="15%">작성자</th>
              <th width="11%">작성일자</th>
              <th width="7%">답변상태</th>
            </tr>
          </thead>
          <tbody>
            {qnaDatas && qnaDatas.slice(offset, offset + 10).map((result, idx) => (
              <>
                <tr key={idx} onClick={() => { setQnaIdx(result.qnaIdx); }}>
                  <td width="11%">{result.qnaIdx}</td>
                  <td width="16%">{result.itemNum}</td>
                  <td width="40%" onClick={() => { setQnaModal(!qnaModal); }}>{result.qnaTitle}</td>
                  <td width="15%">{result.memEmail}</td>
                  <td width="11%">{result.qnaWriteDate}</td>
                  <td width="7%">{result.qnaAns === 'Y' ? '답변완료' : '답변대기'}</td>
                </tr>
                {qnaModal === true && qnaIdx === result.qnaIdx ?
                  <AdminQnaModal value={result.qnaIdx} />
                  : null}
              </>
            ))}
          </tbody>
        </table>
        <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
      </div>
    </>
  );
};

export default AdminBoard;