import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";

import "../CSS/register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
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
    setAddr1(fullAddress);
    setPostCode(postCode);
    setPostCodeError(false);
    setAddr1Error(false);
  };

  // 주소검색창 팝업열기
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const handleOpenSearchAddress = () => {
    open({ onComplete: handleComplete });
  };

  const datas = [
    { id: 0, title: "만 14세 이상입니다." },
    { id: 1, title: "이용 약관 동의" },
    { id: 2, title: "개인정보처리방침 동의" },
    { id: 3, title: "마케팅 수신 동의" },
  ];

  const [checkItems, setCheckItems] = useState([]);

  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [postCode, setPostCode] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [postCodeError, setPostCodeError] = useState(true);
  const [addr1Error, setAddr1Error] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);

  const handlerChangeName = (e) => setName(e.target.value);
  const handlerChangePhoneNum = (e) =>
    setPhoneNum(e.target.value.replace(/[^0-9]/g, "")); //숫자만 입력가능
  const handlerChangePostCode = (e) => setPostCode(e.target.value);
  const handlerChangeAddr1 = (e) => setAddr1(e.target.value);
  const handlerChangeAddr2 = (e) => setAddr2(e.target.value);

  const handlerClickSubmit = (e) => {
    e.preventDefault();

    if (!name || !phoneNum || !postCode || !addr1 || !addr2 || emailError || !password || confirmPasswordError || !checkEmailValid || ((!checkItems.includes(0)) || (!checkItems.includes(1)) || (!checkItems.includes(2)))) {
      return `${false} ${alert("필수항목 확인 후 다시 시도해주세요.")}`;
    }

    const memInfo = {
      "memName": name,
      "memPhone": phoneNum,
      "memPostNum": postCode,
      "memAddr1": addr1,
      "memAddr2": addr2,
      "memEmail": email,
      "memPw": password
    };

    axios
      .post("http://localhost:8080/member/join", memInfo)
      .then((response) => {
        if (response.status === 200) {
          alert("가입을 축하드립니다! \n로그인 후 이용해주세요.");
          navigate("/login");
        }
      })
      .catch((error) => {
        alert("필수항목 확인 후 다시 시도해주세요.");

      });
  };

  const checkEmailValid = (e) => {
    e.preventDefault();
    // axios.get("http://localhost:8080/api/member/" + email)
    axios.get(`http://localhost:8080/member/checkemail/${email}`)
      .then(response => {
        if (email.length < 1) {
          alert('이메일을 입력해주세요.');
        } else if (response.status === 200) {
          alert("이미 가입된 이메일입니다.");
        }
      })
      .catch(error => {
        alert("사용 가능한 이메일입니다.");
      });
  };

  const onChangeEmail = (e) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // useEffect(() => {
  //   console.log(checkItems)
  //   console.log((checkItems.includes(0)) && (checkItems.includes(1)) && (checkItems.includes(2)));
  //   console.log(email)
  // });

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      datas.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };
  return (
    <>
      <div className="sign_container">
        <h2>회원가입</h2>
        <div className="sign_wrap">
          <Form>
            <Form.Group>
              {!name && (
                <div
                  className="invalid-input"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  (필수항목)
                </div>
              )}
              <Form.Label style={{ color: "grey" }}>이름</Form.Label>
              <Form.Control
                style={{ width: "450px" }}
                type="name"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={handlerChangeName}
                required
              />
            </Form.Group>

            <Form.Group>
              {!phoneNum && (
                <div
                  className="invalid-input"
                  style={{ marginTop: "20px", color: "red", fontSize: "13px" }}
                >
                  (필수항목)
                </div>
              )}
              <Form.Label style={{ color: "grey", display: "block" }}>
                연락처
              </Form.Label>
              <Form.Control
                className="phonenumForm"
                style={{ display: "inline-block", width: "300px" }}
                type="phonenumber"
                placeholder="연락처를 '-'없이 입력하세요"
                value={phoneNum}
                onChange={handlerChangePhoneNum}
              />

            </Form.Group>
            <Form.Group>
              {!postCode && (
                <div
                  className="invalid-input"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  (필수항목)
                </div>
              )}
              <Form.Label style={{ color: "grey" }}>우편번호</Form.Label>
              <br />
              <Form.Control
                className="postCodeInput"
                type="postCode"
                readOnly
                value={postCode}
              // onChange={onChangePostCode}
              />
              <button
                className="searchPostCode btn text-white"
                type="button"
                onClick={handleOpenSearchAddress}
                style={{ marginLeft: "20px" }}
              >
                검색
              </button>
            </Form.Group>
            <Form.Group>
              {!addr1 && (
                <div
                  className="invalid-input"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  (필수항목)
                </div>
              )}
              <Form.Label style={{ color: "grey" }}>주소</Form.Label>
              <Form.Control
                style={{ width: "450px", marginBottom: "30px" }}
                type="address"
                name="address"
                placeholder="주소를 입력하세요"
                readOnly
                value={addr1}
                // onChange={handlerChangeAddr1}
                required
              />
              {!addr2 && (
                <div
                  className="invalid-input"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  (필수항목)
                </div>
              )}
              <Form.Label style={{ color: "grey" }}>상세주소</Form.Label>
              <Form.Control
                style={{ width: "450px" }}
                type="addressDetail"
                placeholder="상세주소를 입력하세요"
                required
                value={addr2}
                onChange={handlerChangeAddr2}
              />
            </Form.Group>

            <hr style={{ margin: "20px 0px", width: "450px" }}></hr>
            <Form.Group>
              {emailError && (
                <div
                  className="invalid-input"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  (필수항목)이메일 형식으로 아이디를 입력해주세요.
                </div>
              )}
              <Form.Label style={{ display: "block", color: "grey" }}>
                이메일(ID)
              </Form.Label>
              <Form.Control
                className="emailForm"
                style={{
                  marginBottom: "20px",
                  display: "inline-block",
                  width: "300px",
                }}
                type="email"
                placeholder="아이디(이메일형식)을 입력하세요."
                value={email}
                onChange={onChangeEmail}
                required
              />
              <button
                className="checkOverlapEmail btn text-white"
                type="button"
                style={{ marginLeft: "20px", width: "127px" }}
                onClick={checkEmailValid}
              >
                중복확인
              </button>

              {!password && (
                <span style={{ color: "red", fontSize: "13px" }}>
                  (필수항목)
                </span>
              )}
              <br />
              <Form.Label style={{ color: "grey" }}>비밀번호</Form.Label>
              <Form.Control
                className="passwordForm"
                style={{ width: "300px" }}
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={onChangePassword}
                required
              />

              <Form.Label style={{ color: "grey" }}>비밀번호 확인</Form.Label>
              <Form.Control
                className="passwordCheckForm"
                style={{ width: "300px" }}
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                required
              />
              {confirmPasswordError && (
                <span style={{ color: "red", fontSize: "13px" }}>
                  (필수항목)비밀번호가 일치하지 않습니다.
                </span>
              )}
            </Form.Group>
              <table>
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        className="agree_box"
                        type="checkbox"
                        label="모두 동의하기"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                        onChange={(e) => {
                          handleAllCheck(e.target.checked);
                        }}
                        checked={
                          checkItems.length === datas.length ? true : false
                        }
                      />
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <hr style={{ margin: "20px 0px", width: "450px" }}></hr>
                    </td>
                  </tr>
                  {datas?.map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <Form.Check
                            className="agree_box"
                            type="checkbox"
                            label={`${data.title} ${data.id === 3 ? "(선택)" : "(필수)"
                              }`}
                            required={data.id === 3 ? false : true}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, data.id)
                            }
                            checked={checkItems.includes(data.id) ? true : false}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            <div className="second_register_btn_wrapper">
              <input
                className="second_regbtn"
                type="submit"
                id="submit"
                value="회원가입"
                onClick={handlerClickSubmit}
              />
              <button className="secondKktRegbtn btn text" type="button">
                <RiKakaoTalkFill size="30" />
                카카오톡 회원가입
              </button>
              <button className="secondFacebookRegbtn btn text" type="button">
                <FaFacebookF size="30" color="white" />
                페이스북 회원가입
              </button>
              <button className="secondNaverRegbtn btn text" type="button">
                <SiNaver size="30" color="white" />
                네이버 회원가입
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
