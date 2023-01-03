import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/MyOrderList.css";
import Paging from "./Paging";
import RefundApp from "./RefundApp";

function MyOrderList() {
  const [datas, setDatas] = useState([]);
  const memIdx = sessionStorage.getItem("idx");

  let [count1, setCount1] = useState(0);
  let [count2, setCount2] = useState(0);
  let [count3, setCount3] = useState(0);
  let [count4, setCount4] = useState(0);
  let [count5, setCount5] = useState(0);

  let countCheck = (datas) => {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;

    for (let i = 0; i < datas.length; i++) {
      if (datas[i].orderStatus === "주문완료") {
        count1++;
      } else if (datas[i].orderStatus === "상품준비중") {
        count2++;
      } else if (datas[i].orderStatus === "배송중") {
        count3++;
      } else if (datas[i].orderStatus === "배송완료") {
        count4++;
      } else if (datas[i].orderStatus === "구매확정") {
        count5++;
      }
    }

    setCount1(count1);
    setCount2(count2);
    setCount3(count3);
    setCount4(count4);
    setCount5(count5);
  };

  const handlerCancelNow = (oderlistIdx) => {
    if (window.confirm("해당 상품의 주문을 취소하시겠습니까?")) {
      axios
        .put(`http://localhost:8080/mypage/myorderlist/now/${oderlistIdx}`)
        .then((response) => {
          if (response.status === 200) {
            alert("취소가 완료되었습니다.");
            window.location.reload();
          } else {
            alert("취소가 실패하였습니다.");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handlerCancelPlz = (oderlistIdx) => {
    if (
      window.confirm("발송 준비 중인 상품입니다. \n취소 신청 하시겠습니까?")
    ) {
      axios
        .put(`http://localhost:8080/mypage/myorderlist/plz/${oderlistIdx}`)
        .then((response) => {
          if (response.status === 200) {
            alert(
              "신청이 완료되었습니다. \n판매자의 승인 후 취소가 완료됩니다."
            );
            window.location.reload();
          } else {
            alert("취소가 실패하였습니다.");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  //////////////////////////////////////////// 페이지

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const count = datas.length;
  const [pagecount, setPageCount] = useState(10);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/mypage/myorderlist/${memIdx}`)
      .then((response) => {
        setDatas(response.data);
        countCheck(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [openApp, setOpenApp] = useState(false);

  const [orderNum, setOrderNum] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);
  const [orderlistIdx, setOrderlistIdx] = useState("");

  const handlerOpenApp = (orderNum, itemName, itemPrice, itemAmount,orderlistIdx) => {
    setOrderNum(orderNum);
    setItemName(itemName);
    setItemPrice(itemPrice);
    setItemAmount(itemAmount);
    setOpenApp(true);
    setOrderlistIdx(orderlistIdx);
  };

  const handlerDelete = (orderlistIdx) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      axios
        .put(`http://localhost:8080/mypage/myorderlist/delete/${orderlistIdx}`)
        .then((response) => {
          if (response.status === 200) {
            alert("삭제 완료되었습니다.");
            window.location.reload();
          } else {
            alert("삭제 실패하였습니다.");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  const handlerPurchase = (
    memIdx,
    itemName,
    itemNum,
    orderNum,
    itemAmount,
    orderlistIdx,
  ) => {
    if (
      window.confirm(
        "구매확정 후 반품신청이 어렵습니다. \n구매확정 하시겠습니까?"
      )
    ) {
      axios
        .put(
          `http://localhost:8080/mypage/myorderlist/purchase/${orderlistIdx}`
        )
        .then((response) => {
          if (response.status === 200) {
            axios
              .post(
                `http://localhost:8080/mypage/myorderlist/purchase/${orderlistIdx}`,
                {
                  memIdx: memIdx,
                  itemName: itemName,
                  itemNum: itemNum,
                  orderNum: orderNum,
                  itemAmount : itemAmount,
                  orderlistIdx: orderlistIdx,
                }
              )
              .then((response) => {
                if (response.status === 200) {
                  alert(
                    "구매확정 처리되었습니다. \n해당 상품의 리뷰를 작성해주세요!"
                  );
                  window.location.reload();
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => alert("오류발생!!!"));
    }
  };

  const handlerMoveReivew = () => {
    navigate("/mypage/myreview");
  };
  return (
    <>
      <div className="myorderlist_wrap">
        {openApp ? (
          <RefundApp
            setOpenApp={setOpenApp}
            memIdx={memIdx}
            orderNum={orderNum}
            itemName={itemName}
            itemPrice={itemPrice}
            itemAmount={itemAmount}
            orderlistIdx={orderlistIdx}
          />
        ) : (
          <>
            <div className="myorderlist_title_wrap">
              <h2>주문현황</h2>
            </div>
            <div className="myorderlist_stat_wrap">
              <ul>
                <li>
                  <div className="myorderlist_stat">주문완료</div>
                  <div className="myorderlist_stat_count">{count1}</div>
                </li>
                <li>
                  <div className="myorderlist_stat">상품준비중</div>
                  <div className="myorderlist_stat_count">{count2}</div>
                </li>
                <li>
                  <div className="myorderlist_stat">배송중</div>
                  <div className="myorderlist_stat_count">{count3}</div>
                </li>
                <li>
                  <div className="myorderlist_stat">배송완료</div>
                  <div className="myorderlist_stat_count">{count4}</div>
                </li>
                <li>
                  <div className="myorderlist_stat">구매확정</div>
                  <div className="myorderlist_stat_count">{count5}</div>
                </li>
              </ul>
            </div>

            <div className="myorderlist_order_wrap">
              <table>
                <thead>
                  <tr>
                    <td>제품이미지</td>
                    <td>제품명</td>
                    <td>주문날짜</td>
                    <td>주문번호</td>
                    <td>금액</td>
                    <td>수량</td>
                    <td colSpan={2} className="myorderlist_order_stat_th">
                      주문상태
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {datas.length === 0 ? (
                   <tr>

                   <td colSpan={6}>주문내역이 없습니다.</td>

                 </tr>
                   ) :(
                  datas.slice(offset, offset + 10).map((order, orderIdx) => (
                    <tr key={orderIdx}>
                      <td className="myorderlist_item_info_td">
                        <div className="myorderlist_item_info_wrap">
                          <img
                            src={
                              process.env.REACT_APP_API_URL + order.itemThumb
                            }
                            className="myorderlist_item_img"
                          />
                         
                        </div>
                      </td>
                      <td>
                      <div className="myorderlist_item_name">
                            <Link to={`/item/${order.itemNum}`}>
                              {order.itemName}
                            </Link>
                          </div>
                      </td>
                      <td className="myorderlist_order_date_td">
                        {order.orderDate}
                      </td>
                      <td>{order.orderNum}</td>
                      <td className="myorderlist_item_price_td">
                        {[order.itemPrice * order.itemAmount].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </td>
                      <td className="myorderlist_item_count_td">
                        {order.itemAmount}
                      </td>
                      <td className="myorderlist_order_stat_td">
                        {order.orderStatus}
                      </td>
                      <td className="myorderlist_order_btn_td">
                        <input type="hidden" value={order.itemNum} />
                        <input type="hidden" value={order.memIdx} />
                        <div>
                          {order.orderStatus === "취소완료" ? (
                            <button
                              onClick={() => handlerDelete(order.orderlistIdx)}
                            >
                              내역 삭제
                            </button>
                          ) : null}
                          {order.orderStatus === "취소처리중" ? "" : null}
                          {order.orderStatus === "주문완료" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handlerCancelNow(order.orderlistIdx)
                              }
                            >
                              취소요청
                            </button>
                          ) : (
                            ""
                          )}
                          {order.orderStatus === "상품준비중" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handlerCancelPlz(order.orderlistIdx)
                              }
                            >
                              취소요청
                            </button>
                          ) : (
                            ""
                          )}
                          {order.orderStatus === "배송중" ? (
                            <button type="button">배송조회</button>
                          ) : (
                            ""
                          )}
                          {order.orderStatus === "배송완료" ? (
                            <>
                              <button type="button">배송조회</button>
                              <button
                                type="button"
                                onClick={() =>
                                  handlerOpenApp(
                                    order.orderNum,
                                    order.itemName,
                                    order.itemPrice,
                                    order.itemAmount,
                                    order.orderlistIdx
                                  )
                                }
                              >
                                반품요청
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handlerPurchase(
                                    order.memIdx,
                                    order.itemName,
                                    order.itemNum,
                                    order.orderNum,
                                    order.itemAmount,
                                    order.orderlistIdx
                                  )
                                }
                              >
                                구매확정
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                          {order.orderStatus === "구매확정" ? (
                            <>
                              <button type="button">배송조회</button>
                              <button type="button" onClick={handlerMoveReivew}>
                                리뷰작성
                              </button>
                            </>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  )))}
                  
                </tbody>
              </table>
            </div>
            <Paging
              page={page}
              setPage={setPage}
              count={count}
              pagecount={pagecount}
            />
          </>
        )}
      </div>
    </>
  );
}

export default MyOrderList;
