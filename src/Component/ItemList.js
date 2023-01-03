import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/ItemList.css";
import Paging from "./Paging";
function ItemList() {
  const location = useLocation();
  const organs = location.state.organs;
  const [datas, setDatas] = useState([]);
  const [items, setItems] = useState([]);
  const [select, setSelect] = useState('default');

  const [itemShowNum, setItemShowNum] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const [pagecount, setPageCount] = useState(10);
  const count = datas.length;
  const count1 = items.length;
  

  const handlerSelect = (e) => {
    setSelect(e.target.value);
  }

  const [select2, setSelect2] = useState('default2');

  const handlerSelect2 = (e) => {
    setPageCount(e.target.value);
    setItemShowNum(e.target.value);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/item")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/item/organs/${organs}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.log(error));
  }, [organs]);
  const itemCount = organs === null ? datas : items;
  return (
    <>
      <div className="itemlist_container">
        <div className="itemlist_contents">
          <div className="itemlist_main">
            <div className="itemlist_title">
              {organs === null ? <h2>전체상품</h2> :

                <>
                  <h2>{organs}</h2>
                </>
              }
            </div>
            <div className="itemlist_box">
              <div className="itemlist_inbox">
                <span className="itemlist_num">
                  <strong>{itemCount.length}개의 상품</strong>
                </span>
                <div className="itemlist_view_num">
                  <select name="sort" defaultValue={select} className="itemlist_chosen" onChange={handlerSelect} >
                    <option value="default">
                      추천상품순
                    </option>
                    <option value="sellcnt">판매인기순</option>
                    <option value="asc">낮은가격순</option>
                    <option value="desc">높은가격순</option>
                  </select>
                </div>
                <div className="itemlist_view_num">
                  <select name="page_num" className="itemlist_chosen" onChange={handlerSelect2}>
                    <option value="10">10개씩보기</option>
                    <option value="20">
                      20개씩보기
                    </option>
                    <option value="30">30개씩보기</option>
                    <option value="40">40개씩보기</option>
                  </select>
                </div>
              </div>
            </div>
            {/* <div className="main_items_sales">
              {dummy.topitem.map((item, id) => (
                <Link to="/item">
                  <div key={id} className="main_items">
                    <div className="main_items_img_wrap">
                      <img src={item.img} />
                    </div>
                    <div className="main_items_name">{item.title}</div>
                    <div className="main_items_price">{item.price}</div>
                  </div>
                </Link>
              ))}
            </div> */}
            <div className="itemlist_items">
              <div className="itemlist_items_cont">
                {organs === null
                  ? <ul>
                    {datas.slice(offset, offset + itemShowNum).map((item, idx) => {
                      return <Link key={idx} to={`/item/${item.itemNum}`} state={{ item: datas }}>
                        <li>
                          <div className="itemlist_items_box">
                            <div className="itemlist_items_img">
                              <img src={process.env.REACT_APP_API_URL + item.itemThumb} />
                            </div>
                          </div>
                          <div className="itemlist_info">
                            <div className="itemlist_info_title">
                              <strong>{item.itemName}</strong>
                            </div>
                            <div className="itemlist_info_money">
                              <strong>{[item.itemPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</strong>
                            </div>
                          </div>
                        </li>
                      </Link>;
                    })}
                  </ul>
                  : <ul>
                    {items.slice(offset, offset + 10).map((item, idx) => {
                      return <Link key={idx} to={`/item/${item.itemNum}`} state={{ item: datas }}>
                        <li>
                          <div className="itemlist_items_box">
                            <div className="itemlist_items_img">
                              <img src={process.env.REACT_APP_API_URL + item.itemThumb} />
                            </div>
                          </div>
                          <div className="itemlist_info">
                            <div className="itemlist_info_title">
                              <strong>{item.itemName}</strong>
                            </div>
                            <div className="itemlist_info_money">
                              <strong>{[item.itemPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</strong>
                            </div>
                          </div>
                        </li>
                      </Link>;
                    })}
                  </ul>}
              </div>
            </div>

            {organs === null ?  <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
            :
            <div><Paging page={page} setPage={setPage} count={count1} pagecount={pagecount} /></div>
              }
          </div>
        </div>
      </div>
    </>
  );
}
export default ItemList;