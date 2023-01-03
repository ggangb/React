import axios from "axios";
import React, { useEffect, useState } from "react";
import Paging from "./Paging";


export default function AdminReview() {

  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const [pagecount, setPageCount] = useState(10);
  const count = datas.length;

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/review`, { 
      headers: { 
      'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
    }
  })
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handlerBlind = (reviewIdx) => {
    if(window.confirm('해당 리뷰를 블라인드 처리할까요?')){
    axios.delete(`http://localhost:8080/admin/review/remove/${reviewIdx}`, { 
      headers: { 
      'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
    }
  })
      .then(response => {
        if(response.status === 200){
          alert('블라인드 성공');
          window.location.reload();
        }
      })
      .catch(error => console.log(error));
    }
  }

  const handlerShow = (reviewIdx) => {
    if(window.confirm('해당 리뷰를 블라인드 해제할까요?')){
      axios.delete(`http://localhost:8080/admin/review/show/${reviewIdx}`, { 
        headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
      }
    })
        .then(response => {
          if (response.status === 200) {
            alert('블라인드 해제완료');
            window.location.reload();
          }
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <>
    <div className="adminqna_list">
      <div className="adminqna_header"><strong>리뷰관리</strong></div>
      <table className="admin_review_table">
        <thead >
          <tr>
            <th width="10%">리뷰번호</th>
            <th width="5%">회원번호</th>
            <th width="15%">주문번호</th>
            <th width="30%">리뷰내용</th>
            <th width="10%">작성일</th>
            <th width="10%">수정일</th>
            <th width="10%">블라인드</th>
            <th width="10%">관리</th>
          </tr>
        </thead>
        <tbody>
          {datas && datas.slice(offset, offset + 10).map((review, idx) => (
                <tr key={idx}>
                  <td width="10%">{review.reviewIdx}</td>
                  <td width="5%">{review.memIdx}</td>
                  <td width="15%">{review.orderNum}</td>
                  <td width="30%">{review.reviewContents}</td>
                  <td width="10%">{review.reviewWriteDate}</td>
                  <td width="10%">{review.reviewUpdateDate}</td>
                  <td width="10%">{review.reviewDeleteYn}</td>
                  <td width="10%">
                    {review.reviewDeleteYn === 'Y' ? <button onClick={()=>handlerShow(review.reviewIdx)}>블라인드취소</button> : <button onClick={()=>handlerBlind(review.reviewIdx)}>블라인드</button> }
                  </td>
                </tr>
            ))}
        </tbody>
      </table>
      <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
    </div>
    </>
  );
};