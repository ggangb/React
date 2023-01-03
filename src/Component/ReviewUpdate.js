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

function ReviewUpdate({ setOpen2, handlerClose2, reviewIdx ,itemThumb }) {

    const [data, setData] = useState({});
    const [itemName, setItemName] = useState('');

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
    const sendReview = () => {
        let score = clicked.filter(Boolean).length;
    };

    useEffect(() => {
        sendReview();
        axios.get(`http://localhost:8080/mypage/myreview/modify/${reviewIdx}`)
        .then(response => {
            setData(response.data);
            inputContents.current.focus();
        })
        .catch(error => console.log(error))
    }, [clicked]); //컨디마 컨디업

    const handlerModify = () => {
        if (contents.length < 1) {
            alert('공백은 입력이 불가합니다.');
            setContents('');
            inputContents.current.focus();
        } else {
            axios.put(`http://localhost:8080/mypage/myreview/modify/${reviewIdx}`, { 'reviewIdx': reviewIdx, 'reviewContents': contents })
                .then(response => {
                    if (response.status === 200) {
                        alert('수정이 완료되었습니다.');
                        setOpen2(false);
                        navigate('/mypage/myorderlist');
                    } else {
                        alert('수정을 실패하였습니다.');
                        return;
                    }
                })
                .catch(error => console.log(error))
        }
    }

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
                                {data.itemName}
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
                                    <textarea className='reviewwrite_text' ref={inputContents} maxLength={300} value={data.contents} onChange={handlerChangeContents}
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
                        <button className='reviewwrite_del_btn' type='button' onClick={handlerClose2} >취소</button>
                        <button className='reviewwrite_btn' type='button' onClick={handlerModify}>수정완료</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ReviewUpdate;