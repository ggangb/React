import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import "../CSS/MyInfoUp2.css";

function MyInfoUp2({ memIdx }) {
  const [data, setData] = useState({});
  // const [memIdx, setMemIdx] = useState('');
  const [memName, setMemName] = useState("");
  const [memPhone, setMemPhone] = useState("");
  const [memPostNum, setMemPostNum] = useState("");
  const [memAddr1, setMemAddr1] = useState("");
  const [memAddr2, setMemAddr2] = useState("");
  const [memEmail, setMemEmail] = useState("");
  const [memPw, setMemPw] = useState("");
  const [memPw2, setMemPw2] = useState("");

  const handlerChangeName = (e) => setMemName(e.target.value);
  const handlerChangePhone = (e) =>
    setMemPhone(e.target.value.replace(/[^0-9]/g, "")); //숫자만 입력받기 replace를 이용한 필터링
  const handlerChangePostNum = (e) => setMemPostNum(e.target.value);
  const handlerChangeAddr1 = (e) => setMemAddr1(e.target.value);
  const handlerChangeAddr2 = (e) => setMemAddr2(e.target.value);
  const handlerChangeEmail = (e) => setMemEmail(e.target.value);
  const handlerChangePw = (e) => setMemPw(e.target.value);
  const handlerChangePw2 = (e) => setMemPw2(e.target.value);

  const inputPw = useRef();
  const inputPhone = useRef();

  const navigate = useNavigate();

  //주소
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const handleOpenSearchAddress = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let postCode = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setMemAddr1(fullAddress);
    setMemPostNum(postCode);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/member/myinfo/${memIdx}`)
      .then((response) => {
        setData(response.data);
        setMemName(response.data.memName);
        setMemPhone(response.data.memPhone);
        setMemPostNum(response.data.memPostNum);
        setMemAddr1(response.data.memAddr1);
        setMemAddr2(response.data.memAddr2);
        setMemEmail(response.data.memEmail);
        inputPw.current.focus();
      })
      .catch((error) => console.log(error));
  }, []);

  const handlerClickUpdate = () => {
    if (memPw !== memPw2) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      setMemPw("");
      setMemPw2("");
      inputPw.current.focus();
    } else if (memPw == "" || memPw2 == "") {
      alert("변경하실 비밀번호를 입력해주세요.");
      setMemPw("");
      setMemPw2("");
      inputPw.current.focus();
    } else if (memPhone.length < 10) {
      alert("휴대폰번호를 올바르게 입력해주세요.");
      setMemPhone("");
      inputPhone.current.focus();
    } else {
      axios
      .put(`http://localhost:8080/member/updateinfo/${memIdx}`, {
          memIdx: memIdx,
          memName: memName,
          memPhone: memPhone,
          memPostNum: memPostNum,
          memAddr1: memAddr1,
          memAddr2: memAddr2,
          memEmail: memEmail,
          memPw: memPw,
          memPw2: memPw2,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("변경이 완료되었습니다.");
            navigate("/mypage/myorderlist");
          } else {
            alert("회원정보 수정이 실패하였습니다.");
            return;
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handlerClickCancel = () => {
    if (window.confirm("정보 변경을 취소하시겠습니까?")) {
      alert("마이페이지로 이동합니다.");
      navigate("/mypage/myorderlist");
    }
  };

  return (
    <>
      <div id="main">
        <div className="myinfoup2_wrap">
          <div className="myinfoup2_title_wrap">
            <h2>회원정보수정</h2>
          </div>
          <form>
            <div className="myinfoup2_form_wrap">
              <div className="myinfoup2_info_wrap">
                <div className="myinfoup2_name_wrap">
                  <div className="myinfoup2_text">
                    이름{" "}
                    <label className="myinfoup2_help">
                      {"(이름 변경이 필요할 경우 고객센터로 문의 바랍니다.)"}
                    </label>
                  </div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="text"
                      className="myinfoup2_readonly"
                      readOnly
                      value={memName}
                      onChange={handlerChangeName}
                    />
                  </div>
                </div>
                <div className="myinfoup2_phone_wrap">
                  <div className="myinfoup2_text">휴대폰번호</div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="text"
                      placeholder="연락처('-'제외)를 입력해주세요."
                      maxLength="11"
                      ref={inputPhone}
                      value={memPhone}
                      onChange={handlerChangePhone}
                    />
                  </div>
                </div>
                <div className="myinfoup2_adr_wrap">
                  <div className="myinfoup2_text">주소</div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="text"
                      className="myinfoup2_post"
                      value={memPostNum}
                      onChange={handlerChangePostNum}
                      readOnly
                      placeholder="우편번호"
                    />
                    <input
                      type="button"
                      className="myinfoup2_searchaddress"
                      onClick={handleOpenSearchAddress}
                      value="검색"
                    />
                  </div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="text"
                      className="myinfoup2_readonly"
                      value={memAddr1}
                      onChange={handlerChangeAddr1}
                      readOnly
                    />
                  </div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="text"
                      placeholder="상세 주소를 입력해주세요."
                      spellCheck={false}
                      value={memAddr2}
                      onChange={handlerChangeAddr2}
                    />
                  </div>
                </div>
              </div>
              <div className="myinfoup2_id_wrap">
                <div className="myinfoup2_email_wrap">
                  <div className="myinfoup2_text">이메일 (ID)</div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="email"
                      className="myinfoup2_readonly"
                      value={memEmail}
                      onChange={handlerChangeEmail}
                      readOnly
                    />
                  </div>
                </div>
                <div className="myinfoup2_pw_wrap">
                  <div className="myinfoup2_text">비밀번호</div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      ref={inputPw}
                      value={memPw}
                      onChange={handlerChangePw}
                    />
                  </div>
                </div>
                <div className="myinfoup2_pw_wrap">
                  <div className="myinfoup2_text">비밀번호 확인</div>
                  <div className="myinfoup2_input_wraps">
                    <input
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요."
                      value={memPw2}
                      onChange={handlerChangePw2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="myinfoup2_btn_wrap">
              <input
                type="button"
                className="myinfoup2_btn_cancle"
                value="취소"
                onClick={handlerClickCancel}
              />
              <input
                type="button"
                className="myinfoup2_btn_modify"
                onClick={handlerClickUpdate}
                value="수정하기"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyInfoUp2;