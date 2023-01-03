import "./css/Survey1.css";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import Questions from "./api/questionsApi.json";

const Step3 = ({ nextSteps, prevSteps }) => {
  const [questionList, setQuestionList] = useState([]); // 문제목록
  const [currentQno, setCurrentQno] = useState(0); // 문제번호
  const [question, setQuestion] = useState({}); // 현재문제

  const getMatchingQuestion = (question) => {
    // 체크값과 매칭되는 문제목록 가져오기
    let checked = JSON.parse(sessionStorage.getItem("checked"));
    let isMatch = false;
    for (let i = 0; i < checked.length; i++) {
      if (question.research_organ === checked[i]) {
        isMatch = true;
        break;
      }
    }
    return isMatch;
  };

  useEffect(() => {
    // 체크값과 매칭되는 문제목록 가져오기
    const QUESTIONS_NOT_FILTERED = Questions;
    const questionList = QUESTIONS_NOT_FILTERED.filter(getMatchingQuestion).map(
      (q, i) => ({ ...q, qno: i, value: "0" })
    );
    setQuestionList(questionList);
    setQuestion(questionList.filter((q) => q.qno === currentQno)[0]);
  }, []);

  const handlerChange = (e) => {
    // 문제에 점수 입력
    questionList[currentQno].value = Number(e.target.value);
  };
  const uncheckAll = () => {
    let radios = document.getElementsByName("likert");
    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  };

  const handlerPrev = (e) => {
    const qno = currentQno - 1;
    setCurrentQno(qno);
    const quest = questionList.filter((q) => q.qno === qno)[0];
    setQuestion(quest);
    if (currentQno === 0) {
      prevSteps();
    }
  };

  const handlerNext = () => {
    if (questionList[currentQno].value >= 1) {
      const qno = currentQno + 1;
      setCurrentQno(qno);
      const quest = questionList.filter((q) => q.qno === qno)[0];
      setQuestion(quest);
      uncheckAll();
      sessionStorage.setItem("questionList", JSON.stringify(questionList));
      let groupByOrgan = questionList.reduce((acc, cur) => {   // 현재 문제목록을 organ별로 묶어서 저장
        if (acc[cur.research_organ] === undefined) {
          acc[cur.research_organ] = [];
        }
        acc[cur.research_organ].push(cur);
    
        return acc;
      }, {});
    
      let sum = 0;
      for (let key in groupByOrgan) {
        for (let i = 0; i < groupByOrgan[key].length; i++) {    // organ별로 묶은 문제목록의 value값을 더해서 sum에 저장
          sum += Number(groupByOrgan[key][i].value);
        }
        groupByOrgan[key] = sum / groupByOrgan[key].length;     //  organ별로 묶은 문제목록의 value값의 평균을 구해서 저장
        sum = 0;
      }
      sessionStorage.setItem("groupByOrgan", JSON.stringify(groupByOrgan));
      if (qno > questionList.length -1) {
        nextSteps();
      }
    } else
      alert("답변을 선택해주세요!");
  };

  


  return (
    <>
      <div className="back1">
        <div className="inside">
          <h2>
            {" "}
            {question.qno + 1} / {questionList.length}
          </h2>
          <h4>{question.research_quest}</h4>
          <div className="step_wrap">
            <form action="">
              <ul className="likert">
                <li>
                  <input
                    type="radio"
                    id="likert"
                    name="likert"
                    value="1"
                    onChange={handlerChange}
                  />
                  <label>전혀 아니다</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="likert"
                    name="likert"
                    value="2"
                    onChange={handlerChange}
                  />
                  <label>아니다</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="likert"
                    name="likert"
                    value="3"
                    onChange={handlerChange}
                  />
                  <label>보통이다</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="likert"
                    name="likert"
                    value="4"
                    onChange={handlerChange}
                  />
                  <label>그렇다</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="likert"
                    name="likert"
                    value="5"
                    onClick={handlerChange}
                  />
                  <label>매우 그렇다</label>
                </li>
              </ul>
            </form>
          </div>
          <div className="step_btn">
            <div className="prev" onClick={handlerPrev}>
              <BsArrowLeftCircle size={75} color="white" />
            </div>
            <div className="next" onClick={handlerNext}>
              <BsArrowRightCircle size={75} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
