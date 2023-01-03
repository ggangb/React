import "../CSS/MyPage.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function MyPage() {
  const [memName, setMemName] = useState("");

  const memIdx = sessionStorage.getItem("idx");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/member/myinfo/${memIdx}`)
      .then((response) => {
        setMemName(response.data.memName);
      })
      .catch((error) => console.log(error));
  });

  // let headingElements = [];
  // useEffect(() => {
  //  headingElements = Array.from(document.querySelectorAll(["div"]));
  //  console.log(headingElements);
  // }, []);

  /*
 <ScrollspyNav
            scrollTargetIds={headingElements}
            activeNavClass="is-active"
          >

          </ScrollspyNav>
 
 */

  return (
    <>
      <div id="main">
        <div className="mypage_main_wrap">
          <div className="mypage_side">
            <div className="mypage_side_in">
              <div className="mypage_profile_wrap">
                <div>Welcome!</div>
                <span>{memName}</span> 님
              </div>
              <div className="mypage_sidemenu">
                <ul>
                  <li>
                    <Link to="myorderlist">
                      <div>주문 현황</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myrefund">
                      <div>반품/환불</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="mycart">
                      <div>장바구니</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myreview">
                      <div>나의 리뷰</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myresearch">
                      <div>나의 설문</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myinfo">
                      <div>회원정보 수정</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myinfodel">
                      <div>회원탈퇴</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="my_component">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
