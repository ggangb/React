import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/ItemList.css";
import Paging from "./Paging";
function SearchList() {
  const location = useLocation();
  const keyword = location.state.keyword;
  const [datas, setDatas] = useState([]);
  const [select, setSelect] = useState('default');
  const [page, setPage] = useState(1);
  const [itemShowNum, setItemShowNum] = useState(10);

  const offset = (page - 1) * 10;
  const [pagecount, setPageCount] = useState(10);
  const count = datas.length;

  

  const handlerSelect = (e) => {
    setSelect(e.target.value);
  }

  const handlerSelect2 = (e) => {
    setPageCount(e.target.value);
    setItemShowNum(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/searchlist/${keyword}`)
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => console.log(error));
  }, [keyword]);

  const itemCount = datas === null ? 0 : datas;

  return (
    <>
      <div className="itemlist_container">
        <div className="itemlist_contents">
          <div className="itemlist_main">
            <div className="itemlist_title">
                  <h2>{keyword}</h2>
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
                {datas.length === 0
                  ? <ul>
                    <h2>검색 결과가 없습니다.</h2>
                  </ul>
                  : <ul>
                    {datas.slice(offset, offset + 10).map((item, idx) => {
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

            {datas === null ?  null
            :
            <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
              }
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchList;