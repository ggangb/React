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
    axios.get(`http://localhost:8080/admin/refund`, { 
      headers: { 
      'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
    }
  })
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handlerRefund = (refundIdx) => {
    if(window.confirm('해당 주문 건을 환불처리 하시겠습니까?')){
    axios.put(`http://localhost:8080/admin/refund/${refundIdx}`,null, { 
      headers: { 
      'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
    }
  })
      .then(response => {
        alert('반품완료 처리되었습니다.');
        window.location.reload();
      })
      .catch(error => console.log(error));
    }
  }

  return (
    <>
    <div className="adminqna_list">
      <div className="adminqna_header"><strong>반품관리</strong></div>
      <table className="admin_refund_table">
        <thead >
          <tr>
            <th width="10%">회원번호</th>
            <th width="15%">주문번호</th>
            <th width="15%">제품명</th>
            <th width="20%">반품사유</th>
            <th width="10%">반품신청일</th>
            <th width="10%">환불금액</th>
            <th width="10%">상태</th>
            <th width="10%">관리</th>
          </tr>
        </thead>
        <tbody>
          {
            datas && datas.slice(offset, offset + 10).map((refund, idx) => (
              
                <tr key={idx}>
                  <td width="10%">{refund.memIdx}</td>
                  <td width="15%">{refund.orderNum}</td>
                  <td width="15%">{refund.itemName}</td>
                  <td width="20%">{refund.refundReason}</td>
                  <td width="10%">{refund.refundDate}</td>
                  <td width="10%">{[refund.itemPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td width="10%">{refund.refundStatus}</td>
                  <td width="10%">
                    {refund.refundStatus === '반품진행중' ? <button onClick={()=> handlerRefund(refund.refundIdx)}>반품처리</button> : '처리완료'}
                    </td>
                </tr>
              
            ))
          }
        </tbody>
      </table>
      <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
    </div>
  </>
  );
};