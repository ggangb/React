import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../CSS/login.css";
import { BsWindowSidebar } from "react-icons/bs";
import { useNavigate } from "react-router-dom/dist";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const handlerSubmit = (e) => {
    e.preventDefault();


    axios.post("http://localhost:8080/login", { "memEmail": email, "memPw": password })
      .then(response => {
        if (response.status === 200 && response.data !== "") {
            
            const token = response.data;
            sessionStorage.setItem("token", token);
           
            // JWT 페이로드의 정보(회원 정보)를 가져오는 부분
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const memberInfo = JSON.parse(jsonPayload);
            console.log(memberInfo);
             sessionStorage.setItem("name", memberInfo.name);
             sessionStorage.setItem("email", memberInfo.email);
             sessionStorage.setItem("idx",memberInfo.idx);
             sessionStorage.setItem("role",memberInfo.role);
             if(memberInfo.deleteyn == 'Y'){
              sessionStorage.clear();
              alert('이미 탈퇴된 계정이므로 로그인이 불가합니다.')
            }else{
            alert(`${memberInfo.name}님 환영합니다.`);
            navigate('/');
            window.location.reload();
            }
        } 
      })
      .catch(error => {
        alert("아이디 혹은 비밀번호를 확인해주세요.");
        console.log(error)
      });
  };
  return (
    <>
      <div className="login_main">
        <div className="panel">
          <Form className="panel_box">
            <h2>로그인</h2>
            <div className="panel_input_box">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextId"
              >
                <Col sm>
                  <Form.Control
                    type="email"
                    placeholder="아이디(이메일)"
                    value={email}
                    onChange={onChangeEmail}
                    autoComplete="off"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChangePassword}
                  />
                </Col>
              </Form.Group>


              <div>
                <Button
                  id="login_button"
                  type="submit"
                  onClick={handlerSubmit}
                >
                  로그인
                </Button>
              </div>
              <div className="register">
                <ul>
                  <li>
                    <Link to="/join">회원가입</Link>
                  </li>
                  <li className="linkRegister">
                    <Link to="/findAccount">아이디/비밀번호 찾기</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sns_box">
              <div className="hr-sect">OR</div>
              <div className="simplelogin">
                <h3>SNS 간편 로그인</h3>
              </div>
              <div className="sns_box">
                <ul className="btn_sns_join">
                  <li>
                    <Link to="/kktLogin">
                      <img src="/images/kakao.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/naverLogin">
                      <img src="/images/naver.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/kktLogin">
                      <img src="/images/google.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/facebookLogin">
                      <img src="/images/facebook.png" alt="" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
