import axios from "axios";
import React, { useEffect, useState } from "react";
import Paging from "./Paging";
import {
  MdOutlineDelete,MdCreate
} from "react-icons/md";
import ModalMember from "./ModalMember";


const AdminMember = () => {

  const [memList, setMemList] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const [pagecount, setPageCount] = useState(10);
  const count = memList.length;

  const [memberUpdate, setMemberUpdate] = useState(false);
  const [memIdx, setMemIdx] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:8080/admin/mem", { 
      headers: { 
      'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
    }
  }).then((res) => {
      setMemList(res.data);
    });
  }, []);


  const memberDelete = (memIdx) => {
    if(window.confirm("정말 삭제하시겠습니까?"))
    axios.post(`http://localhost:8080/admin/memberdelete/${memIdx}`,null,{
      headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
      }
    }).then(response => {
      if (response.status === 200) {
        window.location.reload();
        alert("정상적으로 삭제되었습니다.");
    } else {
        alert("삭제에 실패했습니다.");
        return;
    }
    })
  }

  return (
    <>
    <div className="adminqna_list">
      <div className="adminqna_header"><strong>회원관리</strong></div>
      <table className="admin_memeber_table">
        <thead >
          <tr>
            <th width="10%">회원번호</th>
            <th width="10%">이메일</th>
            <th width="10%">이름</th>
            <th width="10%">전화번호</th>
            <th width="25%">주소</th>
            <th width="10%">상세주소</th>
            <th width="10%">가입일</th>
            <th width="5%">탈퇴여부</th>
            <th width="10%">관리자여부</th>
            <th width="10%">관리</th>
          </tr>
        </thead>
        <tbody>
          {memList && memList.slice(offset, offset + 10).map((mem, idx) => (
              <tr key={idx}>
                  <td width="10%">{mem.memIdx}</td>
                  <td width="10%">{mem.memEmail}</td>
                  <td width="10%">{mem.memName}</td>
                  <td width="10%">{mem.memPhone}</td>
                  <td width="25%">{mem.memAddr1}</td>
                  <td width="10%">{mem.memAddr2}</td>
                  <td width="10%">{mem.memRegDate}</td>
                  <td width="5%">{mem.memDeletedYn}</td>
                  {mem.role === 'ROLE_ADMIN' ? <td width="10%">admin</td> : <td width="10%">X</td>}
                  <td width="10%">
                    {mem.memDeletedYn === 'N' ? 
                    <>
                    <button onClick={() => { setMemberUpdate(!memberUpdate); setMemIdx(mem.memIdx); }}><MdCreate/></button>
                    {memberUpdate === true ? <ModalMember mem={memIdx} closeModal={() => setMemberUpdate(!memberUpdate)} /> : null}
                    
                    <button onClick={()=>memberDelete(mem.memIdx)}><MdOutlineDelete/></button>
                    </> 
                    : 
                    null}
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

export default AdminMember;