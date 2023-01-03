import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MyInfoUp1.css';
import MyInfoDel2 from './MyInfoDel2';
import MyInfoUp2 from './MyInfoUp2';

function MyInfoUp1({ memIdx }) {
    const [isNow, setIsNow] = useState(false);
    const [memPw, setMemPw] = useState('');
    const inputPw = useRef();
    const handlerChangePw = (e) => setMemPw(e.target.value);

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
                <div className='myinfoup1_wrap'>
                    {
                        isNow === false ? <>

                            <div className='myinfoup1_title_wrap'>
                                <h2>회원정보수정</h2>
                            </div>
                            <div className='myinfoup1_pwcheck_wrap'>
                                <div className='myinfoup1_pwcheck_text'>
                                    정보 변경을 위해 현재 비밀번호를 입력해주세요.
                                </div>
                                <div className='myinfoup1_input_wrap'>
                                    <input type='password' ref={inputPw} value={memPw} placeholder='비밀번호를 입력해주세요.' onChange={handlerChangePw} autoComplete='off' />
                                </div>
                                <div className='myinfoup1_input_wrap'>
                                    <input type='button' id='MyInfoUp2' onClick={handlerOnClick} value='입력완료' />
                                </div>
                            </div>
                        </>
                            : <MyInfoUp2 memIdx={memIdx} />
                    }
                </div>
            </div>

        </>
    );
}

export default MyInfoUp1;