import "../CSS/Notice.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { SiTeradata } from "react-icons/si";
import { useState } from "react";
import axios from "axios";
import Paging from "./Paging";

function Notice() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 15;
  const count = data.length;
  const [pagecount, setPageCount] = useState(15);


  useEffect(() => {
    axios
      .get("http://localhost:8080/notice")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="notice_main_cont">
        <div className="notice_board_sec">
          <div className="notice_board_title">
            <h3>공지사항</h3>
          </div>
          <div className="notice_board_list">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(offset, offset + 10).map((notice) => (
                  < tr >
                  <td>{notice.noticeIdx}</td>
                  <td>
                    {" "}
                    <Link to={`/noticedetail/${notice.noticeIdx}`}>{notice.noticeTitle}</Link>
                  </td>
                  <td>{notice.noticeWriteDate}</td>
                  <td>관리자</td>
                </tr> 
                ))}
            </tbody>
          </table>
          <Paging
            page={page}
            setPage={setPage}
            count={count}
            pagecount={pagecount}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default Notice;
