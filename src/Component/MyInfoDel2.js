import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MyInfoDel2.css';

function MyInfoDel2({memIdx}) {

    const inputAgree = useRef();
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    
    const handlerChangeMessage = (e) => {
        setMessage(e.target.value);
        if (e.target.value == "동의합니다.") {
            setIsDisabled(false);
        }else {
            setIsDisabled(true);
        }
    };

    useEffect(() => {
        inputAgree.current.focus();
    })

    const handlerClickDelete = () => {
        if(window.confirm('회원탈퇴 시 계정 복구가 불가합니다. \n정말 탈퇴하시겠습니까?')){
            axios.delete(`http://localhost:8080/member/delete/${memIdx}`,
            {   
                'memIdx': memIdx
                
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(memIdx);
                    alert("탈퇴가 완료되었습니다. \n이용해주셔서 감사합니다.");
                    sessionStorage.clear();
                    navigate('/');
                } else {
                    console.log(memIdx);
                    alert("탈퇴 실패!");
                    return;
                }
            })
            .catch(error => console.log(error));
        } 
    }

    return (
        <>
            <div id='main'>
                <div className='myinfodel2_wrap'>
                <div className='myinfodel2_title_wrap'>
                    <h2>회원탈퇴</h2>
                    </div>
                    <div className='myinfodel2_notice'>
                        <p>
                            1. 사용하고 계신 아이디는 탈퇴 후 재사용 및 복구가 불가합니다.
                        </p>
                        <p>
                            2. 탈퇴 후에도 리뷰, Q&A 등 작성한 글은 그대로 남아 있습니다.
                        </p>
                        <p>
                            3. 탈퇴 후에는 작성한 글을 수정 및 삭제할 수 없습니다.
                        </p>
                    </div>
                    <div className='myinfodel2_pwcheck_wrap'>
                        <div className='myinfodel2_pwcheck_text'>
                           최종 탈퇴를 희망하실 경우 <br/>'동의합니다.' 문구를 입력해주세요.
                        </div>
                        <div className='myinfodel2_input_wrap'>
                            <input type='text' ref={inputAgree} placeholder='동의합니다.' value={message} onChange={handlerChangeMessage} autoComplete='off' />
                        </div>
                        <div className='myinfodel2_input_wrap'>
                            <input type='button' className={isDisabled ? 'myinfodel2_btn_disable' : 'myinfodel2_btn_able'} disabled={isDisabled} onClick={handlerClickDelete} value='입력완료' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyInfoDel2;