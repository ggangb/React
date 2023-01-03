import React from "react";
import QnaWrite from "./QnaWrite";
import '../CSS/Modal.css';

function Modal(props) {

  function closeModal() {
    props.closeModal();
  }

 

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
        <QnaWrite itemName={props.itemName} itemNum={props.itemNum} />
      </div>
    </div>
  );
}

export default Modal;