import '../CSS/MyPageCart.css';
import { useState } from "react";

function MyPageCart() {

    const data = [
        { id: 0 },
        { id: 1 }
    ]


    const [checkItems, setCheckItems] = useState([]);
    //체크박스 하나 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
        } else {
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    //전체 선택
    const handleAllCheck = (checked) => {
        if(checked){
            const idArray = [];
            data.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        }else{
            setCheckItems([]);
        }
    }

    return (
        <>
            <div className='cartsection'>
                <div className='cartlistwrap'>
                    <h1> 장바구니 </h1>
                    <div>
                        <input type="checkbox" onChange={(e) => handleAllCheck(e.target.checked)} checked={checkItems.length === data.length ? true : false} />
                        전체 선택
                    </div>
                    <ul className='cartul'>
                        {data.map((data, key) => (
                        <li className='cartitemlist' key = {key}>
                            <div className='cartitem'>
                                <div className='cartcheckboxarea'>
                                    <input type="checkbox" onChange={(e) => handleSingleCheck(e.target.checked, data.id)} checked = {checkItems.includes(data.id) ? true : false} />
                                </div>
                                <div className='cartthumbnail'>
                                    <img src="img/jang1.jpg" className='cartthumbnailimg' />
                                </div>
                                <div className='cartiteminfo'>
                                    <p className='cartiteminfoname'>제품이름ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅇㅇㅇㅇㅇㅇㅇfffffffffffffffffffffㅇㅇㅇㅇㅇ</p>
                                    <p className='cartiteminfoprice'>17,900원</p>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    <div className='btnarea'>
                        <div className='btnareainner'>
                            <button className='deletebtn'>선택 항목 삭제</button>
                            <button className='buybtn'>구매하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageCart;