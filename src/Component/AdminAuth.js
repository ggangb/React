import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminAuth.css';

function AdminAuth() {

    const navigate = useNavigate();
    const [memPw,setMemPw] = useState('');
    const inputPw = useRef();
    const onChangeAdmin = (e) => setMemPw(e.target.value);
    


    const handlerOnClick = () => {

        axios.post(`http://localhost:8080/admin/comparepw/${sessionStorage.getItem("idx")}`, `memPw=${memPw}`, { 
            headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
          }
        })
        .then(response => {
            if(response.status === 200){
                navigate('/admin/main');
            }
        })
        .catch(error => {
            console.log(error);
            alert('비밀번호가 일치하지 않습니다.');
            // inputPw.current.focus();
            // setMemPw('');
        })
            
}

    return (
        <>
            <div id='main'>
                <div className='admin_wrap'>
                    <div className='admin_title_wrap'>
                        <h2>관리자 페이지</h2>
                    </div>
                    <div className='admin_pwcheck_wrap'>
                        <div className='admin_pwcheck_text'>
                            관리자 비밀번호를 입력해주세요.
                        </div>
                        <div className='admin_input_wrap'>
                            <input type='password' ref={inputPw} value={memPw} placeholder='관리자 비밀번호를 입력해주세요.' onChange={onChangeAdmin} autoComplete='off' />
                        </div>
                        <div className='admin_input_wrap'>
                            <input type='button' id='admin' onClick={handlerOnClick} value='입력완료' />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AdminAuth;