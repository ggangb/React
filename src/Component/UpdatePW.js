import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Find.css";
 
 function UpdatePW({memIdx}) {
  
  const [memPw, setMemPw] =useState('');
  const [memPw2, setMemPw2] = useState('');
  const navigate = useNavigate();

  const handlerChangePw = (e) => setMemPw(e.target.value);
  const handlerChangePw2 = (e) => setMemPw2(e.target.value);
  const handlerClickUpdate = () => {
    if (memPw !== memPw2) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
    } else {
      console.log(memIdx);
      axios.put(`http://localhost:8080/member/updatepw/${memIdx}`, 
      {memIdx: memIdx,
        memPw : memPw,
        memPw2 : memPw2
      })
      .then((response) => {
        if(response.status ===200) {
          alert("변경이 완료되었습니다.");
          navigate("/login");
          console.log(memIdx);
        }
      })
      .catch((error) => 
      console.log(error)
      );
    }
  }
  return (
        <>
        <div className="updatepw_wrapper">
            <div className="updatepw_container">
            <h2>새로운 비밀번호</h2>
            <div className="updatepw_wrap">
                  <div className="updatepw_text">비밀번호</div>
                  <div className="updatepw_input_wrap">
                    <input type="password" 
                    placeholder="비밀번호를 입력해주세요."
                    value={memPw}
                    onChange={handlerChangePw}
                    />
                  </div>
                </div>

                <div className="updatepwcheck_wrap">
                  <div className="updatepw_text">비밀번호 확인</div>
                  <div className="updatepw_input_wrap">
                    <input type="password" 
                    placeholder="비밀번호를 다시 입력해주세요." 
                    value={memPw2}
                    onChange={handlerChangePw2}
                    />
                  </div>
                </div>

                <div className='updatepw_input_wrap'>
                    <input type='button' onClick={handlerClickUpdate} value='입력완료' />
                </div>

            </div>
        </div>
        </>
     )
    
 }

 export default UpdatePW;