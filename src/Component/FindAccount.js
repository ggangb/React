import "../CSS/FindAccount.css";
import { Link } from "react-router-dom";

function FindAccount() {
  return (
    <>
      <div className="find_account_wrapper">
        <div className="find_account_btn_wrapper">
          <h2>아이디 / 비밀번호 찾기</h2>
          <div className="find_btn_acc_wrap">
            <div className="find_btn_box">
              <Link to="/findid">
                <button className="find_btn_acc" type="button">
                  아이디 찾기
                </button>
              </Link>
              <Link to="/findpw">
                <button className="find_btn_acc" type="button">
                  비밀번호 찾기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindAccount;
