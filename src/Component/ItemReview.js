import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/ItemReview.css";

function Review(props) {
  const reviewIdx = props.value;
  const [datas, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/review/${reviewIdx}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <tr className="review-modal">
      <td colSpan="3">
        <div className="review-modal-cont">{datas.itemName}</div>
        <div className="review-comment">
          <span className="comment-name">코멘트</span>
          <div>
            <span>{datas.reviewContents}</span>
          </div>
          <div className="comment-date">
            <span>{datas.reviewWriteDate}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Review;