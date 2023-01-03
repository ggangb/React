import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../CSS/MemberDetail.css";

const MemberDetail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  let { memIdx } = useParams();
  const [memName, setMemName] = useState();
  const [memDeletedYn, setMemDeletedYn] = useState("");
  const handlerChangeName = (e) => setMemName(e.target.value);
  const handlerChangeDeleted = (e) => setMemDeletedYn(e.target.value);
  const handlerClickCancle = () => navigate("/admin_mem");

  const handlerClickUpdate = () => {
    axios
      .put(`http://localhost:8080/admin-mem/${memIdx}`, {
        memName: memName,
        memDeletedYn: memDeletedYn,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("수정되었습니다.");
          navigate("/admin_mem");
        } else {
          alert("수정에 실패했습니다");
          return;
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin-mem/${memIdx}`)
      .then((response) => {
        console.log(data);
        setData(response.data);
        setMemName(response.data.memName);
        setMemDeletedYn(response.data.memDeletedYn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="m-detail-container">
      <div className="m-detail-wrap">
        <div className="m-detail-info">
          <h1>회원정보</h1>
          <div className="m-detail-info-box">
            <div className="m-detail-box">
              <div className="m-left">
                <div className="m-top-box">
                  <div className="m-title">이름</div>
                  <input
                    type="text"
                    value={memName}
                    onChange={handlerChangeName}
                  />
                </div>

                <div className="m-top-box">
                  <div className="m-title">이메일</div>
                  <strong>{data.memEmail}</strong>
                </div>

                <div className="m-top-box">
                  <div className="m-title">생년월일</div>
                  <strong>{data.memBirth}</strong>
                </div>

                <div className="m-top-box">
                  <div className="m-title">연락처</div>
                  <strong>{data.memPhone}</strong>
                </div>
              </div>

              <div className="m-right">
                <div className="m-top-box2">
                  <div className="m-r-title">주소</div>
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    value={data.memPostNum}
                  />
                  <input type="text" value={data.memAddr1} />
                  <input type="text" value={data.memAddr2} />
                </div>

                <div className="m-top-box">
                  <div className="m-title">가입일</div>
                  <strong>{data.memRegDate}</strong>
                </div>

                <div className="m-top-box">
                  <div className="m-title">탈퇴이력</div>
                  <select name="" id="" onChange={handlerChangeDeleted}>
                    <option value="" hidden></option>
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </div>
              </div>
              <div className="m-btn-wrap">
                <input
                  type="button"
                  className="m-btn-cancle"
                  value="취소"
                  onClick={handlerClickCancle}
                />
                <input
                  type="button"
                  className="m-btn-modify"
                  value="수정하기"
                  onClick={handlerClickUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
