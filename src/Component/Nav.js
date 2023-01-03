import React from "react";

import { Link } from "react-router-dom";
import "../CSS/Nav.css";

const Nav = () => {
  if (window.location.pathname === "/admin") return null;
  if (window.location.pathname === "/admin/member") return null;
  if (window.location.pathname === "/admin/review") return null;
  if (window.location.pathname === "/admin/order") return null;
  if (window.location.pathname === "/admin/qna") return null;
  if (window.location.pathname === "/admin/refund") return null;
  if (window.location.pathname === "/admin/item") return null;

  return (
    <div className="header_menu_wrap">
      <div className="header_menu_area">
        <ul className="header_menu_ul">
          <li>
            <Link to="/itemlist" state={{ organs: null }}>
              <button>전체상품</button>
            </Link>
          </li>
          <li>
            <Link to="/itemlist" state={{ organs: "간" }}>
              <button>간</button>
            </Link>
          </li>
          <li>
            <Link to="/itemlist" state={{ organs: "눈" }}>
              <button>눈</button>
            </Link>
          </li>
          <li>
            <Link to="/itemlist" state={{ organs: "비타민" }}>
              <button>비타민</button>
            </Link>
          </li>
          <li>
            <Link to="/itemlist" state={{ organs: "장" }}>
              <button>장</button>
            </Link>
          </li>
          <li>
            <Link to="/itemlist" state={{ organs: "혈행개선" }}>
              <button>혈행개선</button>
            </Link>
          </li>
          <li>
            <Link to="/intro">
              <button className="header_research_btn">설문하기</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
