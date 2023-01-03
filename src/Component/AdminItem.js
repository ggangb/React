import axios from "axios";
import { useEffect, useState } from "react";
import ModalItemUpdate from "./ModalItemUpdate";
import ModalItemWrite from "./ModalItemWrite";
import Paging from "./Paging";
import {
    MdOutlineDelete,MdCreate,MdSave
} from "react-icons/md";
import "../CSS/AdminItem.css";
  


function AdminItem() {

    const [data, setData] = useState([]);
    const [items, setItems] = useState({});
    const [qnaWrite, setQnaWrite] = useState(false);
    const [itemWrite, setItemWrite] = useState(false);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const [pagecount, setPageCount] = useState(10);
    const count = data.length;

    useEffect(() => {
        axios
            .get("http://localhost:8080/admin/item", {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handlerDelete = (itemNum) => {
        axios.post(`http://localhost:8080/admin/item/delete${itemNum}`, null, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("삭제 완료되었습니다.");
                    window.location.reload();
                } else {
                    alert("삭제 실패하였습니다.");
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <div className="adminqna_list">
                <div className="adminqna_header"><strong>상품관리</strong></div>
                <button className="admin_itemsave" onClick={() => {setItemWrite(!itemWrite);} }><MdSave/></button>
                {itemWrite && (
                                        <ModalItemWrite closeModal={() => setItemWrite(!itemWrite)} >
                                        </ModalItemWrite>
                                    )}
                <table className="admin_item-table">
                    <thead >
                        <tr>
                            <th width="10%">상품이미지</th>
                            <th width="20%">상품번호</th>
                            <th width="20%">상품이름</th>
                            <th width="15%">가격</th>
                            <th width="25%">등록일자</th>
                            <th width="20%">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.slice(offset, offset + 10).map((item, idx) => (
                               
                                    <tr key = {idx}>
                                        <td width="10%"><img className="adminorder_img" src={process.env.REACT_APP_API_URL + item.itemThumb} /></td>
                                        <td width="20%">{item.itemNum}</td>
                                        <td width="20%">{item.itemName}</td>
                                        <td width="15%">{[item.itemPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                        <td width="25%">{item.itemCreatedAt}</td>
                                        <td width="20%">
                                            <button onClick={() => { setQnaWrite(!qnaWrite); setItems(item) }}><MdCreate/></button>
                                            {qnaWrite && (
                                                <ModalItemUpdate closeModal={() => setQnaWrite(!qnaWrite)} item={items} >
                                                </ModalItemUpdate>
                                            )}
                                            <button onClick={() => handlerDelete(item.itemNum)}><MdOutlineDelete/></button>
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

export default AdminItem;