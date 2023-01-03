import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../CSS/Nav.css";
import AdminRouter from "../routeAuthor/AdminRouter";


export default function AdminMain() {

  return (
    <>
      <div className="admin_menu_wrap">
        <ul className="header_menu_ul">
          <li>
            <Link to="member">
              <button>회원관리</button>
            </Link>
          </li>
          <li>
            <Link to="order">
              <button>주문관리</button>
            </Link>
          </li>
          <li>
            <Link to="refund">
              <button>반품관리</button>
            </Link>
          </li>
          <li>
            <Link to="review">
              <button>리뷰관리</button>
            </Link>
          </li>
          <li>
            <Link to="qna">
              <button>QNA관리</button>
            </Link>
          </li>
          <li>
            <Link to="item">
              <button>상품관리</button>
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};