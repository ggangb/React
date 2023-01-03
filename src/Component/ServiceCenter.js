import "../CSS/ServiceCenter.css";
import search from "../Img/search.png";
import { useState } from "react";
import FaqMenu from "./FaqMenu";
import { useEffect } from "react";
import axios from "axios";
import FaqList from "./FaqList";
import Paging from "./Paging";

function ServiceCenter() {
  // let [faqModal, setFaqModal] = useState(false);
  const [list, setList] = useState([
    { title: "회원가입/정보" },
    { title: "결제/배송" },
    { title: "환불/반품" },
    { title: "기타" },
  ]);
  const [faq, setFaq] = useState([]);
  const [allFaq, setAllFaq] = useState([]);

  // 페이지네이션

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 15;
  const count = faq.length;
  const [pagecount, setPageCount] = useState(15);

  useEffect(() => {
    axios
      .get("http://localhost:8080/service")
      .then((response) => {
        console.log(response);
        setFaq(response.data);
        setAllFaq(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onList = (title) => {
    if (title === "all") {
      setFaq(allFaq);
    } else {
      setFaq(allFaq.filter((faq) => faq.faqClass === title));
    }
  };

  return (
    <>
      <div className="service_board_sec">
        <div className="service_search_box">
          <form>
            <div className="service_search_data">
              <h2>자주묻는 질문 검색</h2>
              <div className="service_search_area">
                <input
                  type="text"
                  className="service_search_bar"
                  spellCheck="false"
                  maxLength="64"
                  placeholder="검색어를 입력해주세요."
                />
                <button type="submit" className="service_search_btn">
                  <div className="header_search_img" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="service_board_title">
          <h3>FAQ</h3>
        </div>
        <div className="service_board_list">
          <FaqMenu list={list} onList={onList} />
          <table>
            <thead></thead>
            <tbody>
              {faq.slice(offset, offset + 10).map((faq) => (
                <FaqList key={faq.faqIdx} faq={faq} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Paging
        page={page}
        setPage={setPage}
        count={count}
        pagecount={pagecount}
      />
    </>
  );
}

export default ServiceCenter;
