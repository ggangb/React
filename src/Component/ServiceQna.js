import "../CSS/ServiceQna.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function ServiceQna() {
  return (
    <>
      <div className="serviceqna_board_sec">
        <div className="serviceqna_board_title">
          <h3>1:1문의</h3>
        </div>
        <div className="serviceqna_board_write">
          <form>
            <div className="serviceqna_board_box">
              <table>
                <tbody>
                  <tr>
                    <th>말머리</th>
                    <td>
                      <div className="serviceqna_select">
                        <select>
                          <option value="서비스장애">서비스장애</option>
                          <option value="기타">기타문의사항</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>글쓴이~</td>
                  </tr>
                  <tr>
                    <th>제목</th>
                    <td>
                      <input
                        type="text"
                        className="qna_title"
                        placeholder="문의하실 제목을 입력해주세요(임시)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>본문</th>
                    <td>
                      <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                          console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log("Focus.", editor);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td>
                      <input type="file" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          <div className="serviceqna_btn_box">
            <button className="serviceqna_btn_del">취소</button>
            <button className="serviceqna_btn">저장</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceQna;
