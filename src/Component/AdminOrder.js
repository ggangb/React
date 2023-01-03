import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/AdminOrder.css";
import Paging from "./Paging";


function AdminOrder() {

    const [datas, setDatas] = useState([]);
    const orderState = ["상품준비중", "배송중", "배송완료"];
    const [stateSelect, setStateSelect] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const [pagecount, setPageCount] = useState(10);
    const count = datas.length;
    const stateHandler = (e) => {
        setStateSelect(e.target.value);
    }

    const stateChange = (orderlistIdx) => {

        axios.post(
            `http://localhost:8080/admin/orderstate/${orderlistIdx},${stateSelect}`,
            null,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } }
        )
            .then((response) => {
                alert("변경완료");
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const stateCancle = (orderlistIdx) => {
        axios.post(`http://localhost:8080/admin/ordercancle/${orderlistIdx}`, null, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then((response) => {
                alert("취소처리완료");
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        axios.get("http://localhost:8080/admin/order", {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setDatas(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="adminqna_list">
                <div className="adminqna_header"><strong>주문관리</strong></div>
                <table className="admin_order_table">
                    <thead >
                        <tr>
                            <th width="10%">이미지</th>
                            <th width="20%">주문번호</th>
                            <th width="20%">상품이름</th>
                            <th width="15%">주문자</th>
                            <th width="25%">주문일자</th>
                            <th width="20%">주문상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas && datas.slice(offset, offset + 10).map((order, idx) => (
                                    <tr key={idx}>
                                        <td width="10%"><img className="adminorder_img" src={process.env.REACT_APP_API_URL + order.itemThumb} /></td>
                                        <td width="20%">{order.orderNum}</td>
                                        <td width="20%">{order.itemName}</td>
                                        <td width="15%">{order.memEmail}</td>
                                        <td width="25%">{order.orderDate}</td>
                                        <td width="20%">
                                            {order.orderStatus}
                                            {order.orderStatus === "취소처리중" ? <button onClick={() => stateCancle(order.orderlistIdx)}>취소처리완료</button> : <select name="categoryName" onChange={stateHandler}>
                                                <option hidden></option>
                                                {orderState.map((state) => (
                                                    <option
                                                        value={state}
                                                        key={state}
                                                    >
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>}
                                            {order.orderStatus === "취소처리중" ? null : <button onClick={() => stateChange(order.orderlistIdx)}>변경하기</button>}
                                        </td>
                                    </tr>
                                
                            ))
                        }
                    </tbody>
                </table>
                <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
            </div>
        </>

    );
}

export default AdminOrder;