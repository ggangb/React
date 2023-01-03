import axios from 'axios';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MyInfoDel1.css';
import MyInfoDel2 from './MyInfoDel2';

function MyInfoDel1({ memIdx }) {

    const [isNow, setIsNow] = useState(false);

    const [memPw, setMemPw] = useState('');

  const handlerChangePw = (e) => setMemPw(e.target.value);

    const inputPw = useRef();
    const navigate = useNavigate();


    const handlerOnClick = () => {
        axios.post(`http://localhost:8080/member/comparepw/${memIdx}`, `memPw=${memPw}`)
            .then(response => {
                if (response.status === 200) {
                    setIsNow(true);
                }
            })
            .catch(error => {
                console.log(error);
                alert('비밀번호가 일치하지 않습니다.');
                inputPw.current.focus();
                setMemPw('');
            })
    }


    return (
        <>
            <div id='main'>
                <div className='myinfodel1_wrap'>
                    {
                        isNow === false ? <>
                    <div className='myinfodel1_title_wrap'>
                    <h2>회원탈퇴</h2>
                    </div>
                    
                    <div className='myinfodel1_pwcheck_wrap'>
                        <div className='myinfodel1_pwcheck_text'>
                           회원탈퇴를 위해 현재 비밀번호를 입력해주세요.
                        </div>
                        <div className='myinfodel1_input_wrap'>
                            <input type='password' ref={inputPw} onChange={handlerChangePw} value={memPw} placeholder='비밀번호를 입력해주세요.' autoComplete='off' />
                        </div>
                        <div className='myinfodel1_input_wrap'>
                            <input type='button' onClick={handlerOnClick} value='입력완료' />
                        </div>
                    </div>
                    </>
                            :
                            <MyInfoDel2 memIdx={memIdx} />
                    }
                </div>

            </div>
        </>
    );
}

export default MyInfoDel1;
