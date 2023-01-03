import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/QnaWrite.css";

function QnaWrite({ itemName, itemNum }) {
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaContent, setQnaContent] = useState("");
  const navigate = useNavigate();
  const memEmail = sessionStorage.getItem("email");

  const handlerTitle = (e) => {
    setQnaTitle(e.target.value);
  };
  const handlerContent = (e) => {
    setQnaContent(e.target.value);
  };
  if (memEmail === null) {
    alert("로그인 후 이용해주세요.");
    window.location.href = "/login";
  }

  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const handlerClickSubmit = () => {
    if (qnaTitle === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (qnaContent === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    const qnaDto = {
      qnaTitle: qnaTitle,
      qnaContents: qnaContent,
      memEmail: memEmail,
      itemNum: itemNum,
    };
    console.log(qnaDto);

        axios.post("http://localhost:8080/qna/write", qnaDto)
            .then(response => {
                if (response.status === 200) {
                    alert("문의글이 정상적으로 등록되었습니다.");
                    navigate(`/item/${itemNum}`)
                    window.location.reload();
                } else {
                    alert("문의글 등록에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    }



  return (
    <>
      <div className="qnaWrite_board_sec">
        <div className="qnaWrite_board_title">
          <h3>상풍문의 글 작성</h3>
        </div>
        <div className="qnaWrite_board_write">
          <form>
            <div className="qnaWrite_board_box">
              <table>
                <tbody>
                  <tr>
                    <th>
                      <img></img>
                    </th>
                    <td>{itemName}</td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>{memEmail}</td>
                  </tr>
                  <tr>
                    <th>제목</th>
                    <td>
                      <input
                        onChange={handlerTitle}
                        type="text"
                        className="qna_title"
                        placeholder="문의하실 제목을 입력해주세요(임시)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td>
                      <textarea
                        onChange={handlerContent}
                        className="qna_content"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          <div className="qnaWrite_btn_box">
            <button onClick={handlerClickSubmit} className="qnaWrite_btn">
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default QnaWrite;
