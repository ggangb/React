import React from "react";
import { useState } from "react";
import Faq from "./Faq";
import Paging from "./Paging";

const FaqList = ({ faq }) => {
  let [faqModal, setFaqModal] = useState(false);
  const [faqindex, setFaqIndex] = useState("");

  const { faqIdx, faqClass, faqTitle } = faq;

  return (
    <>
      <tr
        key={faq}
        onClick={() => {
          setFaqIndex(faqIdx);
        }}
      >
        <td>Q</td>
        <td
          onClick={() => {
            setFaqModal(!faqModal);
          }}
        >
          {faqTitle}
        </td>
        <td>{faqClass}</td>
      </tr>
      {faqModal === true && faqindex === faqIdx ? (
        <Faq faq={faq} value={faqIdx} />
      ) : null}
    </>
  );
};

export default FaqList;
