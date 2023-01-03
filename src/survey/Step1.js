import "./css/Survey1.css";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Step1 = ({ nextSteps }) => {
  const [info, setInfo] = useState({
    name: "",
    height: "",
    age: "",
    weight: "",
    gender: "",
  });

  const onChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const saveInfo = (e) => {
    let sessionStorage = window.sessionStorage;
    sessionStorage.setItem("info", JSON.stringify(info));
  };

  const nextStep = (e) => {
    if (
      info.name === "" ||
      info.height === "" ||
      info.age === "" ||
      info.weight === ""
    ) {
      alert("모든 항목을 입력해주세요");
    } else {
      saveInfo();
      nextSteps();
    }
  };

  return (
    <>
      <div className="back1">
        <div className="inside">
          <h2>나에게 맞춤 영양제 찾기</h2>

          <div className="inside_line">
            <div className="namePut">
              이름 :{" "}
              <input
                className="surveyinputName"
                type="text"
                name="name"
                value={info.name}
                onChange={onChangeInfo}
              />
            </div>
            <div className="heightPut">
              키 :{" "}
              <input
                className="surveyinput"
                type="number"
                name="height"
                min={150}
                max={200}
                value={info.height}
                onChange={onChangeInfo}
              />
              Cm
            </div>
          </div>
          <div className="inside_line">
            <div className="agePut">
              {" "}
              나이 : 만{" "}
              <input
                className="surveyinput"
                type="number"
                name="age"
                min={10}
                max={100}
                value={info.age}
                onChange={onChangeInfo}
              />
              세
            </div>
            <div className="weightPut">
              몸무게 :{" "}
              <input
                className=" surveyinput"
                type="number"
                name="weight"
                min={30}
                max={200}
                value={info.weight}
                onChange={onChangeInfo}
              />
              Kg
            </div>
          </div>
          <div className="radios">
            <div className="genderPut">
              성별 :
              <input
                className="radio"
                type="radio"
                id="male"
                name="gender"
                defaultValue="male"
                onChange={onChangeInfo}
              />
              남성
              <input
                className="radio"
                type="radio"
                id="femali"
                name="gender"
                defaultValue="female"
                onChange={onChangeInfo}
              />
              여성
            </div>
          </div>
          <div className="step_btn">
            <div className="prev">
              <Link to="/Intro">
                <BsArrowLeftCircle size={75} color="white" />
              </Link>
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

export default Step1;
