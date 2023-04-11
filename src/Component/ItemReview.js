import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/ItemReview.css";

function Review(props) {
  const reviewIdx = props.value;
  const [datas, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review/${reviewIdx}`)
      .then((response) => {
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