import React from "react";
import '../CSS/Modal.css';
import AdminItemUpdate from "./AdminItemUpdate";

function ModalItemUpdate(props) {
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
        <AdminItemUpdate item={props.item} />
      </div>
    </div>
  );
}

export default ModalItemUpdate;