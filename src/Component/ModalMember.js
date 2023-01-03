import React from "react";
import '../CSS/Modal.css';
import AdminMemberUpdate from "./AdminMemberUpdate";

function ModalItemWrite(props) {
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
        <AdminMemberUpdate mem={props.mem} />
      </div>
    </div>
  );
}

export default ModalItemWrite;