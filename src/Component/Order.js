import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";
import "../CSS/Order.css";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

function Order() {
    const memIdx = sessionStorage.getItem("idx");
    const memEmail = sessionStorage.getItem("email");
    const location = useLocation([]);
    const item = location.state.orderDto;
    const navigate = useNavigate();
    let totalPrice = 0;
    var date = new Date();
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    var id = components.join("");
    item.forEach((items) => {
        totalPrice += (items.itemPrice * items.itemAmount);
    });
    const [data, setData] = useState([])
    const [checkType, setCheckType] = useState('');
    const [memPostNum, setMemPostNum] = useState('');
    const [addr1, setAddr1] = useState("");
    const [addr2, setAddr2] = useState("");
    const [postCodeError, setPostCodeError] = useState(true);
    const [addr1Error, setAddr1Error] = useState(true);
    const [emailError, setEmailError] = useState(true);
    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const handlerChangeAddr1 = (e) => setAddr1(e.target.value);
    const handlerChangeAddr2 = (e) => setAddr2(e.target.value);
    const handlerChangePostNum = (e) => setMemPostNum(e.target.value);
    const handlerChangeName = (e) => setName(e.target.value);
    const handlerChangePhoneNum = (e) => setPhoneNum(e.target.value.replace(/[^0-9]/g, ""));


    const open = useDaumPostcodePopup(
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    );

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let postCode = data.zonecode;
        let extraAddress = "";
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setAddr1(fullAddress);
        setMemPostNum(postCode);
        setPostCodeError(false);
        setAddr1Error(false);
    };

    const handleOpenSearchAddress = () => {
        open({ onComplete: handleComplete });
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/member/${memEmail}`)
            .then(response => {
                setData(response.data);
                setName(response.data.memName);
                setMemPostNum(response.data.memPostNum);
                setAddr1(response.data.memAddr1);
                setAddr2(response.data.memAddr2);
                setPhoneNum(response.data.memPhone);
            })
            .catch(error => { console.log(error); });
    }, []);

    const orderInfo = item.map(order => ({
        memEmail: data.memEmail,
        memIdx: memIdx,
        address1: addr1,
        address2: addr2,
        address3: memPostNum,
        memPhone: phoneNum,
        itemPrice: order.itemPrice,
        itemNum: order.itemNum,
        itemName: order.itemName,
        itemAmount: order.itemAmount,
        orderNum: id,
        cartIdx: order.cartIdx,
        itemThumb: order.itemThumb,
        recipient: name,
        recipientPhone: phoneNum
    }))

    const [checked, setChecked] = useState(false);

    const handlerClickSubmit = (e) => {
        e.preventDefault();
        if (!checked) {
            alert('필수항목을 확인 후 체크해주세요.');
        } else if (name.length < 1 || addr1.length < 1 || addr2.length < 1 || phoneNum.length < 1) {
            alert('배송정보는 필수 입력 사항입니다.');
        } else {
            if (checkType === 'new') {
                axios.post("http://localhost:8080/order/insert", orderInfo)
                    .then(response => {
                        alert('구매가 완료되었습니다.');
                        
                        navigate("/mypage/myorderlist", { memIdx: { memIdx } })
                    })
                    .catch(error => { console.log(error); })
                navigate("/mypage/myorderlist");
            } else {
                axios.post("http://localhost:8080/order/insert", orderInfo)
                    .then(response => {
                        alert('구매가 완료되었습니다.');
                        
                        navigate("/mypage/myorderlist", { memIdx: { memIdx } })
                    })
                    .catch(error => { console.log(error); })
            }

        }

    }
    const checkedSame = () => {
        setCheckType('same');
    }
    const checkedNew = () => {
        setCheckType('new');
    }

    const handlerClickCancel = () => {
        if (window.confirm('주문을 취소하시겠습니까?')) {
            navigate(-1);
        }
    }

    return (
        <>
            <div className="order_conatiner">
                <div className="order_contents">
                    <div className="order_content_box">
                        <form className="order_form">
                            <div className="order_wrap">
                                <div className="order_title">
                                    <h2>주문서 작성/결제</h2>
                                </div>
                                <div className="order_cont">
                                    <div className="order_cont_list">
                                        <div className="order_cont_title">
                                            <h3>주문상세내역</h3>
                                        </div>
                                        <div className="order_table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>상품 / 옵션 정보</td>
                                                        <td>수량</td>
                                                        <td>상품금액</td>
                                                        <td>배송비</td>
                                                        <td>합계금액</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.map((items, idx) => [
                                                        <tr key={idx}>
                                                            <td className="order_td_item">
                                                                <div className="order_item">
                                                                    <span className="order_item_img"><img src={process.env.REACT_APP_API_URL + items.itemThumb} /></span>
                                                                    <div className="order_item_info">
                                                                        <a>{items.itemName}</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="order_td_amount">
                                                                <div className="order_amount">
                                                                    <strong>{items.itemAmount}</strong>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <strong className="order_item_price">{[items.itemPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                                                            </td>
                                                            <td><span>2,500원</span></td>
                                                            <td>
                                                                <strong className="order_item_totalprice">
                                                                    {[items.itemPrice * items.itemAmount].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                    ])}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="order_price_sum">
                                        <div className="order_sum_cont">
                                            <div className="order_sum_list">
                                                <dl>
                                                    <dt>총 <strong></strong> {item.length}개의 상품금액 </dt>
                                                    <dd><strong>{[totalPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>원</dd>
                                                </dl>
                                                <span><img src="/images/order_price_plus.png" alt="더하기" /></span>
                                                <dl>
                                                    <dt>배송비</dt>
                                                    <dd><strong>2,500</strong>원</dd>
                                                </dl>
                                                <span><img src="/images/order_price_total.png" alt="합계" /></span>
                                                <dl className="price_total">
                                                    <dt>합계</dt>
                                                    <dd><strong>{[totalPrice + 2500].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>원
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order_view_info">
                                        <div className="order_info">
                                            <div className="order_zone_tit">
                                                <h4>주문자 정보</h4>
                                            </div>
                                            <div className="order_table_type">
                                                <table className="table_left">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row"><span className="important">주문하시는 분</span></th>
                                                            <td>
                                                                {data.memName}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"><span className="important">휴대폰 번호</span></th>
                                                            <td>
                                                                {data.memPhone}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"><span className="important">이메일</span></th>
                                                            <td className="member_email">
                                                                {data.memEmail}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="delivery_info">
                                        <div className="order_zone_tit">
                                            <h4>배송정보</h4>
                                        </div>
                                        <div className="order_table_type shipping_info">
                                            <table className="table_left shipping_info_table">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">배송지 확인</th>
                                                        <td>
                                                            <div className="addr_radio">
                                                                <ul>
                                                                    <li>
                                                                        <input
                                                                            type="radio"
                                                                            name="shipping"
                                                                            id="New"
                                                                            defaultChecked={true}
                                                                            onClick={checkedNew}
                                                                        />
                                                                        <label htmlFor="shippingNew" className="choice_s">
                                                                            직접 입력
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            type="radio"
                                                                            name="shipping"
                                                                            id="SameCheck"
                                                                            onClick={checkedSame}
                                                                        />
                                                                        <label
                                                                            htmlFor="shippingSameCheck"
                                                                            className="choice_s"
                                                                        >
                                                                            주문자정보와 동일
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    { }
                                                    <tr>
                                                        <th scope="row">
                                                            <span className="important">받으실분</span>
                                                        </th>
                                                        <td>
                                                            {/* {checkType === 'same' ? <input type="text" name="receiverName" value={data.memName} /> :
                                                                <input type="text" name="receiverName" />} */}
                                                            {
                                                                checkType === 'same' ?
                                                                    <input type="text" readOnly value={data.memName} className='order_readonly' />
                                                                    :
                                                                    <input type="text" onChange={handlerChangeName} className='order_input_name' placeholder="이름을 입력하세요" spellCheck={false} value={name} />
                                                            }

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <span className="important">받으실 곳</span>
                                                        </th>
                                                        <td className="member_address">
                                                            <div className="address_postcode">
                                                                {
                                                                    checkType === 'same' ?
                                                                        <input type="text" name="receiverZonecode" readOnly value={data.memPostNum} className='order_readonly' />
                                                                        :
                                                                        <>
                                                                            <input type="text" name="receiverZonecode" onChange={handlerChangePostNum} className='order_input_post' readOnly value={memPostNum} />
                                                                            <button type="button" className="btn_post_search" onClick={handleOpenSearchAddress}>검색</button>
                                                                        </>
                                                                }
                                                            
                                                              
                                                            </div>
                                                            <div className="address_input">
                                                                {
                                                                    checkType === 'same' ?
                                                                        <>
                                                                            <input type="text" name="address" readOnly value={data.memAddr1} className='order_readonly_addr1' />
                                                                            <div>
                                                                                <input type="text" name="addressDetail" readOnly value={data.memAddr2} className='order_readonly_addr2' />
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <input type="text" onChange={handlerChangeAddr1} name="address" className="order_input_addr1" readOnly value={addr1} />
                                                                            <div className="order_addr2_wrap">
                                                                                <input type="text" placeholder="상세주소를 입력하세요" spellCheck={false} autoComplete="false" onChange={handlerChangeAddr2} className="order_input_addr2" name="addressDetail" value={addr2} />
                                                                            </div>
                                                                        </>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <span className="important">휴대폰 번호</span>
                                                        </th>
                                                        <td>
                                                            {
                                                                checkType === 'same' ?
                                                                    <input type="text" name="address" readOnly value={data.memPhone} className='order_readonly' />
                                                                    :
                                                                    <input type="text" id="receiverCellPhone" className="order_input_phone" onChange={handlerChangePhoneNum} name="receiverCellPhone" value={phoneNum} />
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="payment_progress">
                                        <div className="order_zone_tit">
                                            <h4>결제수단 선택 / 결제</h4>
                                            <p className="js_pay_content">
                                                ※ 고객님은 안전거래를 위해 현금으로 결제시 저희
                                                쇼핑몰에서 가입한 구매안전서비스인 나이스페이의
                                                구매안전(에스크로)서비스를 이용하실 수 있습니다.
                                            </p>
                                        </div>
                                        <div className="payment_progress_list">
                                            <div className="js_pay_content">
                                                <div id="settlekind_general" className="general_payment">
                                                    <dl>
                                                        <dt>일반결제</dt>
                                                        <dd>
                                                            <div className="form_element">
                                                                <ul className="payment_progress_select">
                                                                    <li id="settlekindType_pk">
                                                                        <input
                                                                            type="radio"
                                                                            id="settleKind_pk"
                                                                            name="settleKind"
                                                                            value="pk"
                                                                            defaultChecked={true}
                                                                        />
                                                                        <label htmlFor="settleKind_pk" className="choice_s">
                                                                            카카오페이
                                                                            <img src="/images/kakaopay-PC.png" />
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="card"
                                                                id="settlekind_general_pc"
                                                            ></div>
                                                            <div
                                                                className="account-bank"
                                                                id="settlekind_general_pb"
                                                            ></div>
                                                            <div
                                                                className="virtual-bank"
                                                                id="settlekind_general_pv"
                                                            ></div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment_final">
                                            <div className="payment_final_total">
                                                <dl>
                                                    <dt>최종 결제 금액</dt>
                                                    <dd><span><strong id="totalSettlePriceView">{[totalPrice + 2500].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>원</span></dd>
                                                </dl>
                                            </div>
                                            <div className="payment_final_check">
                                                <div className="form_element">
                                                    <input type="checkbox" id="termAgree_orderCheck" className="require" onChange={() => setChecked(!checked)} />
                                                    <label htmlFor="termAgree_orderCheck" className="check_s"><em><b>(필수)</b> 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.</em></label>
                                                </div>
                                            </div>
                                            <div className="btn_center_box">
                                                <button type='button' onClick={handlerClickCancel} className="btn_order_cancel">취소</button>
                                                <button onClick={handlerClickSubmit} className="btn_order_buy"><em>결제하기</em></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Order;