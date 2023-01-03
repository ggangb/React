import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MyReview.css';
import ReviewWrite from './ReviewWrite.js';
import axios from 'axios';
import ReviewUpdate from './ReviewUpdate';
import { useEffect } from 'react';


function MyReview() {
    const memIdx = sessionStorage.getItem("idx");
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [btnActive, setBtnActive] = useState([true, false]);


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [itemName, setItemName] = useState('');
    const [reviewIdx, setReviewIdx] = useState(0);
    const [orderNum, setOrderNum] = useState(0);
    const [orderlistIdx, setOrderlistIdx] = useState();
    const [itemThumb, setItemThumb] = useState('');
    const navigate = useNavigate();

    const handlerOpen = (itemName, orderNum, orderlistIdx, itemThumb) => {
        setItemName(itemName);
        setOrderNum(orderNum);
        setOrderlistIdx(orderlistIdx);
        setItemThumb(itemThumb);
        setOpen(true);


    }


    const handlerOpen2 = (reviewIdx, itemThumb) => {
        setReviewIdx(reviewIdx);
        setOpen2(true);
        setItemThumb(itemThumb);
    }

    const handlerClose = () => {
        if (window.confirm('작성을 취소하시겠습니까?')) {
            navigate('/mypage/myreview');
            setOpen(false);
        }
    }

    const handlerClose2 = () => {
        if (window.confirm('작성을 취소하시겠습니까?')) {
            navigate('/mypage/myreview');
            setOpen2(false);

        }
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/mypage/myreview/able/${memIdx}`)
            .then(response => {
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handlerDidReview = () => {
        setBtnActive([false, true]);
        axios.get(`http://localhost:8080/mypage/myreview/did/${memIdx}`)
            .then(response => {
                setDatas2(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <>
            <div id='main'>
                <div className="myreview_wrap">
                    <div className='myreview_title_wrap'>
                        <h2>나의리뷰</h2>
                    </div>
                    <div className='myreview_notice'>
                        <p>
                            1. 리뷰는 "주문 현황" 메뉴에서 "구매확정" 후 작성이 가능하며, 작성 후 수정은 가능하지만 삭제는 불가합니다.
                        </p>
                        <p>
                            2. 구매한 제품과 무관한 내용은 임의 삭제될 수 있습니다!
                        </p>
                        <p>
                            3. 욕설, 비방글, 성적인 수치심을 유발하는 내용 등 다른 사람이 보기에 기분나쁠 수 있는 글은 작성하지 말아주세요.
                        </p>
                        <p>
                            4. 주소, 주민번호, 연락처 등 개인정보 기입은 절대 안 돼요!
                        </p>
                    </div>
                    {open ? <ReviewWrite setOpen={setOpen} handlerClose={handlerClose} itemName={itemName} orderNum={orderNum} orderlistIdx={orderlistIdx} itemThumb={itemThumb} /> :
                        <>
                            {open2 ? <ReviewUpdate handlerClose2={handlerClose2} setOpen2={setOpen2} reviewIdx={reviewIdx} itemThumb={itemThumb} /> :
                                <div className='myreview_review_wrap'>
                                    <div className='myreview_menu_wrap'>
                                        <button className={btnActive[0] ? "myreview_able_btn_active" : "myreview_able_btn"} onClick={() => {
                                            setBtnActive([true, false]);
                                        }} >작성 가능한 리뷰</button>
                                        <button className={btnActive[1] ? "myreview_did_btn_active" : "myreview_did_btn"} onClick={handlerDidReview}>작성한 리뷰</button>
                                    </div>

                                    <div className='myreview_list_wrap'>
                                        {btnActive[0] ?
                                            <div className='myreview_able_wrap'>
                                                {datas.length === 0 ? <div className='myreview_nondata'>구매확정한 주문 건이 없습니다.</div> :
                                                    <ul>
                                                        {datas.map((able, idx) => (
                                                            <li key={idx}>
                                                                <div className='myreview_img_wrap'>
                                                                    <img className='myreview_img' src={process.env.REACT_APP_API_URL + able.itemThumb} />
                                                                </div>
                                                                <div className='myreview_item_name'>
                                                                    {able.itemName}
                                                                </div>
                                                                <div>
                                                                    주문일자 :&nbsp;
                                                                    {able.orderDate}

                                                                </div>
                                                                <input type="hidden" value={able.orderNum} />
                                                                <div className='myreview_btn_box'>
                                                                    <button type='button' className='myreview_write_btn' onClick={() => handlerOpen(able.itemName, able.orderNum, able.orderlistIdx, able.itemThumb)} >작성</button>
                                                                    {/* <Link to='reviewwrite'><button type='button' className='myreview_write_btn' onClick={() => handlerOpen(able.itemNum, able.orderNum)} >작성</button></Link> */}
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                            :
                                            <div className='myreview_able_wrap'>
                                                {datas2.length === 0 ? <div className='myreview_nondata'>작성한 리뷰가 없습니다.</div> :
                                                    <ul>
                                                        {datas2.map((did, idx) => (
                                                            <li key={idx}>
                                                                <div className='myreview_img_wrap'>
                                                                    <img className='myreview_img' src={process.env.REACT_APP_API_URL + did.itemThumb} />
                                                                </div>
                                                                <div>
                                                                    작성일자 :&nbsp;
                                                                    {did.reviewWriteDate}
                                                                </div>
                                                                <div>
                                                                    상품명 :
                                                                    {did.itemName}
                                                                </div>
                                                                <div className='myreview_did_contents'>
                                                                    {
                                                                        did.reviewDeleteYn !== 'N' ? <><b>관리자에 의해 블라인드 처리되었습니다.</b> <br /> </> :
                                                                            did.reviewContents
                                                                    }
                                                                </div>
                                                                <input type="hidden" value={did.reviewIdx} />
                                                                <div className='myreview_btn_box'>
                                                                    {
                                                                        did.reviewDeleteYn !== 'N' ? <button type='button' className='myreview_blind_btn' disabled>수정</button> :
                                                                            <button type='button' className='myreview_update_btn' onClick={() => handlerOpen2(did.reviewIdx, did.itemThumb)}>수정</button>
                                                                    }
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>

                                        }
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default MyReview;