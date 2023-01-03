import React from "react";
import { Link, Outlet } from "react-router-dom";

const Service = () => {
  return (
    <>
      <div id="serviceqna_container">
        <div id="serviceqna_contents">
          <div className="serviceqna_main_contents">
            <div className="serviceqna_side_cont">
              <div className="serviceqna_side_box">
                <h2>고객센터</h2>
                <ul className="serviceqna_side_menu">
                  <Link to="center">
                    <li>FAQ</li>
                  </Link>
                  <Link to="notice">
                    <li>공지사항</li>
                  </Link>
                  <Link to="serviceqna">
                    <li>1:1문의</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="serviceqna_main_cont">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
