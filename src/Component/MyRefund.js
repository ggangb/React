import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../CSS/MyRefund.css";
import s3 from "../Img/s3.jpg";
import Paging from "./Paging";

function MyRefund() {
  const [datas, setDatas] = useState([]);

  const memIdx = sessionStorage.getItem("idx");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/mypage/myrefund/${memIdx}`)
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const count = datas.length;
  const [pagecount, setPageCount] = useState(10);

  const handlerRefundCancel = (orderlistIdx, refundIdx) => {
    if (window.confirm("해당 주문 건의 반품을 철회하시겠습니까?")) {
      const refundDto = {
        orderlistIdx: orderlistIdx,
        refundIdx: refundIdx,
      };
      axios
        .post("http://localhost:8080/mypage/myrefund/refundcancle", refundDto)
        .then((response) => {
          if (response.status === 200) {
            alert("반품신청을 철회하였습니다.");
            window.location.reload();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="myrefund_wrap">
        <div className="myrefund_title_wrap">
          <h2>반품/환불</h2>
        </div>
        <div className="myrefund_list_wrap">
          <table>
            <thead>
              <tr>
                <td>제품이미지</td>
                <td>제품명</td>
                <td>반품신청일</td>
                <td>반품사유</td>
                <td>환불금액</td>
                <td>반품상태</td>
              </tr>
            </thead>
            <tbody>
              {datas.length === 0 ? 
                <tr>

                <td colSpan={5}>환불/반품내역이 없습니다.</td>

              </tr>
              :
              (datas.slice(offset, offset + 10).map((refund, idx) => (
                <tr key={idx}>
                  <td className="myrefund_item_info_td">
                    <div className="myrefund_item_info_wrap">
                      <img
                        src={process.env.REACT_APP_API_URL + refund.itemThumb}
                        className="myrefund_item_img"
                      />
                    </div>
                  </td>
                  <td>
                  <div className="myrefund_item_name">
                        {refund.itemName}
                      </div>
                  </td>
                  <td>{refund.refundDate}</td>
                  <td className="myrefund_refund_reason_td">
                    {refund.refundReason}
                  </td>
                  <td className="myrefund_item_price_td">{[refund.itemPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td className="myrefund_status_btn_td">
                    <input type="hidden" value={refund.refundIdx} />
                    {refund.refundStatus}
                    {refund.refundStatus === "반품진행중" ? (
                      <div>
                        <button
                          onClick={() =>
                            handlerRefundCancel(
                              refund.orderlistIdx,
                              refund.refundIdx
                            )
                          }
                        >
                          반품철회
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              )))
            }
              
            </tbody>
          </table>
        </div>

        <Paging
          page={page}
          setPage={setPage}
          count={count}
          pagecount={pagecount}
        />
      </div>
    </>
  );
}

export default MyRefund;
