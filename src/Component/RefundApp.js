import '../CSS/RefundApp.css';
import s1 from '../Img/s1.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function RefundApp({ memIdx, itemName, orderNum, itemPrice, orderlistIdx, setOpenApp, itemAmount }) {

    const handlerCloseApp = () => {
        if (window.confirm('반품 신청을 취소하시겠습니까?')) {
            setOpenApp(false);
        }
    }

    const [refundReason, setRefundReason] = useState('default');

    const handlerSelect = (e) => {
        setRefundReason(e.target.value);
    }

    const navigate = useNavigate();

    const handlerRefundGo = () => {
        if (refundReason == 'default') {
            alert('반품 사유를 선택해주세요.');
        } else if (window.confirm('해당 제품을 반품신청 하시겠습니까?')) {
            axios.post(`http://localhost:8080/mypage/myorderlist/refundgo/${orderlistIdx}`, {
                memIdx: memIdx,
                itemName: itemName,
                orderlistIdx: orderlistIdx,
                orderNum: orderNum,
                itemPrice: itemPrice*itemAmount,
                refundReason: refundReason
            })
                .then(response => {
                    if (response.status === 200) {
                        alert('반품신청이 완료되었습니다.');
                        navigate('/mypage/myrefund');
                    }
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <>
            <div id='main'>
                <div className='refundapp_title_wrap'>
                    <h2>반품접수</h2>
                </div>
                <div className='myreview_notice'>
                    <p>
                        1. 현재 반품택배비는 무료 이벤트 진행 중입니다!
                    </p>
                    <p>
                        2. 반품신청 시 "반품/환불" 메뉴에서 진행상황 확인이 가능합니다.
                    </p>
                    <p>
                        3. 반품관련 상담이 필요하실 경우 "고객센터 {'>'} 1:1문의" 를 이용해주시길 바랍니다.
                    </p>
                </div>
                <div className='refundapp_form_wrap'>
                    <div className='refundapp_info_wrap'>
                        <div className='refundapp_ordernum_wrap'>
                            <div className='refundapp_text'>주문번호</div>
                            <div className='refundapp_input_ordernum'>
                                <input type='text' readOnly value={orderNum} />
                            </div>
                        </div>
                        <div className='refundapp_itemname_wrap'>
                            <div className='refundapp_text'>제품명</div>
                            <div className='refundapp_input_itemname'>
                                <textarea readOnly value={itemName}>

                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className='refundapp_id_wrap'>
                        <div className='refundapp_reason_wrap'>
                            <div className='refundapp_text'>반품사유</div>
                            <div className='refundapp_select_wrap'>
                                <select defaultValue={refundReason} onChange={handlerSelect}>
                                    {/* {selectList.map((reason, idx) => (
                                            <option value={reason} key={idx}>
                                                {reason}
                                            </option>
                                            ))} */}
                                    <option value='default' disabled hidden>선택해주세요.</option>
                                    <option>마음에 안 들어요.</option>
                                    <option>다른 상품이 잘못 배송됐어요.</option>
                                    <option>상품에 이물질이 있어요.</option>
                                    <option>유통기한이 경과했어요.</option>
                                </select>
                            </div>
                        </div>
                        <div className='refundapp_itemname_wrap'>
                            <div className='refundapp_text'>환불금액</div>
                            <div className='refundapp_input_price'>
                                <textarea readOnly value={[itemPrice * itemAmount].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}>

                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='refundapp_btn_box'>
                    <button className='refundapp_btn_cancel' type='button' onClick={handlerCloseApp}>취소</button>
                    <button className='refundapp_btn_refund' type='button' onClick={handlerRefundGo}>반품신청</button>
                </div>
            </div>


        </>
    );
}

export default RefundApp;