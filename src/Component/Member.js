import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MemMenu from "./MemMenu";
import "../CSS/List.css";
import MemberList from "./MemberList";

const Member = () => {
  const [allDatas, setAllDatas] = useState([]);
  const [datas, setDatas] = useState([]);

  const onList = (value) => {
    if (value === "all") {
      setDatas(allDatas);
    } else {
      setDatas(allDatas.filter((mem) => mem.memDeletedYn === value));
    }
  };

  const [list, setList] = useState([
    { name: "전체", value: "all" },
    { name: "회원", value: "N" },
    { name: "탈퇴회원", value: "Y" },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/mem", { 
        headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
 }})
      .then((response) => {
        // setMemDeletedYn(response.data.memDeletedYn);
        setAllDatas(response.data);
        setDatas(response.data);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  // const [page, setPage] = useState(1); // 페이지
  // const limit = 15; //list 노출 최대 갯수
  // const offset = (page - 1) * limit; // 시작과 끝 구하는 offset

  // const postsData = (memlist) => {
  //   if (memlist) {
  //     let result = memlist.slice(offset, offset + limit);
  //     return result;
  //   }
  // };

  return (
    <div className="list-container">
      <div className="list-wrap">
        <div className="list-board-title">
          <h3>회원정보</h3>
        </div>
        <MemMenu list={list} onList={onList} />
        <div className="list">
          <div className="list-top">
            <ul>
              <li>
                <input type="checkbox" />
              </li>
              <li>회원번호</li>
              <li>이름</li>
              <li>이메일</li>
              <li>가입일</li>
              <li>탈퇴이력</li>
            </ul>
          </div>
          <MemberList memlist={datas} />
        </div>
      </div>
    </div>
  );
};

export default Member;
