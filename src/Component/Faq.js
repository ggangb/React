import "../CSS/Faq.css";

function Faq({ faq }) {
  return (
    <tr className="faq-modal" key={faq.faqIdx}>
      <td colSpan="3">
        <div className="faq-modal-cont">
          <strong>Q</strong>
          <div className="faq-content">
            <span>{faq.faqTitle}</span>
          </div>
        </div>
        <div className="faq-comment">
          <strong>A</strong>
          <div className="admin-comment">
            <span>{faq.faqContents}</span>
          </div>
          <div className="comment-date" hidden>
            <span>{faq.faqCreatedAt}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Faq;
