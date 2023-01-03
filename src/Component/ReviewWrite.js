import '../CSS/ReviewWrite.css';
import reviewBanner from '../Img/reviewbanner.jpg';
import reviewIcon from '../Img/reviewicon.png';
import s1 from '../Img/s1.jpg';
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function ReviewWrite({ setOpen, handlerClose, itemName, orderNum ,orderlistIdx, itemThumb}) {

   
    const [contents, setContents] = useState('');
    
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const array = [0, 1, 2, 3, 4];

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    const inputContents = useRef();
    const navigate = useNavigate();
    const handlerChangeContents = (e) => setContents(e.target.value);

    const handlerCreateReview = () => {
        if (contents.length < 1) {
            alert('공백은 입력이 불가합니다.');
            setContents('');
            inputContents.current.focus();
        } else {
            axios.put(`http://localhost:8080/mypage/myreview/write/${orderlistIdx}`, { 'orderlistIdx': orderlistIdx ,'orderNum': orderNum, 'reviewContents': contents })
                .then(response => {
                    if (response.status === 200) {
                        alert('정상적으로 등록되었습니다.');
                        setOpen(false);
                        navigate('/mypage/myorderlist');
                    } else {
                        alert('등록을 실패하였습니다.');
                        return;
                    }
                })
                .catch(error => console.log(error))
        }
    }
    useEffect(() => {
        inputContents.current.focus();
        sendReview();
    }, [clicked]); //컨디마 컨디업

    const sendReview = () => {
        let score = clicked.filter(Boolean).length;
    };

    const Stars = styled.div`
display: flex;
padding-top: 5px;

& svg {
  color: gray;
  cursor: pointer;
}

.yellowStar {
  color: #fcc419;
}
`;

    return (
        <>
            <div id='main'>
                <div className='reviewwrite_form_wrap'>

                    <div className='reviewwrite_table'>
                        <div className='reviewwrite_table_img'>
                            <img src={process.env.REACT_APP_API_URL + itemThumb} />
                        </div>
                        <div className='reviewwrite_table_cell'>
                            <div className='reviewwrite_item_title'>
                                {itemName}
                            </div>
                            <div className='reviewwrite_item_rate'>
                                <div className='reviewwrite_modify_rate'>
                                    <Stars>
                                        {array.map((el, idx) => {
                                            return (
                                                <FaStar
                                                    key={idx}
                                                    size="30"
                                                    onClick={() => handleStarClick(el)}
                                                    className={clicked[el] && 'yellowStar'}
                                                />
                                            );

                                        })}

                                    </Stars>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reviewwrite_detail'>
                        <div className='reviewwrite_detail_form'>
                            <div className='reviewwrite_detail_title'>리뷰내용</div>
                            <div className='reviewwrite_detail_cont'>
                                    <textarea className='reviewwrite_text' ref={inputContents} maxLength={300} value={contents} onChange={handlerChangeContents}
                                        placeholder='다른 소비자에게 도움이 되도록 솔직한 평가를 남겨주세요.' autoComplete='off' spellCheck='false'>

                                    </textarea>
                            </div>
                        </div>
                        <div className='reviewwrite_detail_file'>
                            <div className='reviewwrite_file_title'>
                                사진첨부
                            </div>
                            <div className='reviewwrite_file_box'>
                                <input type='file' />
                            </div>
                        </div>
                    </div>

                    <div className='reviewwrite_btn_box'>
                        <button className='reviewwrite_del_btn' type='button' onClick={handlerClose}>취소</button>
                        <button className='reviewwrite_btn' type='button' onClick={handlerCreateReview}>등록하기</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ReviewWrite;