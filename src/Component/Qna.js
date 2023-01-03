import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/Qna.css";

function Qna({ value }) {
  const qnaIdx = value;
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/qna/contents/${qnaIdx}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <tr className="qna-modal">
      <td colspan="5">
        <div className="qna-modal-cont">
          <strong>Q</strong>
          <div className="qna-content">
            <span>{data.qnaContents}</span>
          </div>
        </div>
        <div className="qna-comment">
          <strong>A</strong>
          <div className="admin-comment">
            <span>
              {data.qnaCommentContent === null
                ? "답변 준비중"
                : data.qnaCommentContent}{" "}
            </span>
          </div>
          <div className="comment-date">
            <span>
              {data.qnaCommentWriteDate === null
                ? null
                : data.qnaCommentWriteDate}
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Qna;
