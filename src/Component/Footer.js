import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/Footer.css";

const Footer = () => {

  return (
    <div id="footer">
      <div className="footer_wrap">
        <div className="footer_top">
          <ul>
            <li>
            <Link to="/company"><span>회사소개</span></Link>
            </li>
            <li>
            <Link to="/agreement"><span>이용약관</span></Link>
            </li>
            <li>
            <Link to="/private"><span>개인정보처리방침</span></Link>
            </li>
            <li>
            <Link to="/"><b>제휴/마케팅</b></Link>
            </li>
            <li>
              <Link to="/service/serviceqna">서비스 장애 신고</Link>
            </li>
          </ul>
        </div>
        <div className="footer_bottom">
          <div className="footer_company_info">
            <ul>
              <li>상호 : 주식회사 영양갱 / 대표 : 강프로</li>
              <li>
                사업자등록번호 : 123-45-67890 / 통신판매업신고번호 :
                2022-서울종로-1027
              </li>
              <li>대표번호 : 1234-5678 / 팩스번호 : 070-0000-1111</li>
              <li>주소 : 서울특별시 종로구 인사동길 12 대일빌딩 7층, 15층</li>
              <li>메일 : cshelp@gungang.com</li>
              <li>개인정보관리자 : 상만</li>
            </ul>
          </div>
          <div className="footer_cs">
            <ul>
              <li>고객센터</li>
              <li className="footer_cs_phone">1234-5678</li>
              <li>월 ~ 목 09 : 00 ~ 18 : 00</li>
              <li>금 09 : 00 ~ 13 : 00</li>
              <li>점심식사 13 : 00 ~ 14 : 30</li>
              <li>공휴일 / 토, 일 휴무</li>
            </ul>
          </div>
          <div className="footer_authority">
            <ul>
              <li>
                온라인몰 내 등록된 제품 이미지 및 모든 정보는 당사의 소중한
                자산입니다.
              </li>
              <li>
                무단 도용할 경우 법적인 책임이 따를 수 있으니 주의하시길
                바랍니다.
              </li>

              <li>
                <p>ⓒ Gungang Inc. All Rights Reserved.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
