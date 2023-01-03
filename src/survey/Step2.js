import "./css/Survey1.css";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useState } from "react";

const Step2 = ({ nextSteps, prevSteps }) => {
  //체크된 값 저장할 리스트
  const [checked, setChecked] = useState([]);

  //체크된 값 저장하는 함수
  const onChecked = (e) => {
    //체크된 값이 없으면 추가하고, 체크된 값이 있으면 제거
    if (checked.indexOf(e.target.value) === -1) {
      setChecked([...checked, e.target.value]);
    } else {
      setChecked(checked.filter((item) => item !== e.target.value));
    }
  };
  sessionStorage.setItem("checked", JSON.stringify(checked));

  const nextStep = (e) => {
    if (checked.length === 0) {
      alert("하나 이상 선택해주세요");
    } else {
      nextSteps();
    }
  };

  return (
    <>
      <div className="back1">
        <div className="inside">
          <h2>나에게 맞춤 영양제 찾기</h2>
          <h4>걱정되는 건강항목을 체크 해주세요.</h4>
          <div className="organcheck">
            <div className="organ_radio">
              <ul>
                <li>
                  <input
                    className="radio"
                    type="checkbox"
                    name="organ"
                    value="간"
                    onChange={onChecked}
                  />{" "}
                  간
                </li>
                <li>
                  <input
                    className="radio"
                    type="checkbox"
                    name="organ"
                    value="눈"
                    onChange={onChecked}
                  />{" "}
                  눈
                </li>
                <li>
                  <input
                    className="radio"
                    type="checkbox"
                    name="organ"
                    value="비타민"
                    onChange={onChecked}
                  />{" "}
                 비타민
                </li>
                <li>
                  <input
                    className="radio"
                    type="checkbox"
                    name="organ"
                    value="혈관"
                    onChange={onChecked}
                  />{" "}
                  혈관
                </li>
                <li>
                  <input
                    className="radio"
                    type="checkbox"
                    name="organ"
                    value="장"
                    onChange={onChecked}
                  />{" "}
                  장
                </li>
              </ul>
            </div>
          </div>
          <div className="step_btn">
            <div className="prev" onClick={prevSteps}>
              <BsArrowLeftCircle size={75} color="white" />
            </div>
            <div className="next" onClick={nextStep}>
              <BsArrowRightCircle size={75} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;