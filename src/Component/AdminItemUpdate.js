import '../CSS/AdminItemUpdate.css';
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminItemUpdate = (props) => {
  const navigate = useNavigate();
  const categoryList = ["선택", "간", "눈", "비타민", "혈행개선", "장"];
  const [categorySelect, setCategorySelect] = useState(props.item.itemOrgans);

  const [selectedThumb, setSelectedThumb] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const saveThumb = (event) => {
    setSelectedThumb(event.target.files[0]);
  };
  const saveDetailImg = (event) => {
    setSelectedDetail(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    // 파일 데이터 저장
    formData.append("itemThumb", selectedThumb);
    formData.append("itemDetailImg", selectedDetail);

    formData.append("itemsDto", JSON.stringify(itemInfo)); // 직렬화하여 객체 저장

    axios.post("http://localhost:8080/admin/item/update", formData, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then((response) => {
      if (response.status === 200) {
        navigate("/admin/item");
        alert("상품이 수정 되었습니다.");
      } else {
        alert("상품 수정 실패");
      }
    });
  };





  const selectCategoryHandler = (e) => {
    setCategorySelect(e.target.value);
  };
  const [itemInfo, setItemInfo] = useState({
    itemNum: props.item.itemNum,
    itemName: props.item.itemName,
    itemPrice: props.item.itemPrice,
    itemThumb: props.item.itemThumb,
    itemDetailImg: props.item.itemDetailImg,
    itemMaker: props.item.itemMaker,
    itemHow: "",
    itemExpDate: props.item.itemExpDate,
    itemOrgans: categorySelect,
    itemMaterials: "",
    itemSubImg: "",
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    setItemInfo({
      ...itemInfo,
      [name]: value,
    });
  };

  return (
    <div id="main">
    <div className="write_item_wrap ">
      <div className="write_item_form">
        <div className="write_item_title">
          <h3>상품 수정</h3>
        </div>
        <div className="item_board_write">
          <form>
            <div className="item_board_box">
              <table className="admin_item_table">
                <tbody>
                  <tr>
                    <th>분류</th>
                    <td>
                      <div className="write_select" onChange={getValue}>
                        <select name="itemOrgans" onChange={selectCategoryHandler} value={categorySelect}>
                          {categoryList.map((category) => (
                            <option value={category} key={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>글쓴이~</td>
                  </tr>
                  <tr>
                    <th>상품명</th>
                    <td>
                      <input
                        type="text"
                        className="item_write_title"
                        placeholder="상품명을 입력해주세요"
                        onChange={getValue}
                        name="itemName"
                        value={itemInfo.itemName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>상품번호</th>
                    <td>
                      <input
                        type="text"
                        className="item_write_title"
                        placeholder="상품번호를 입력해주세요"
                        onChange={getValue}
                        name="itemNum"
                        value={itemInfo.itemNum}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>유통기한</th>
                    <td>
                      <input
                        type="date"
                        className="item_write_exp"
                        placeholder="유통기한을 입력해주세요"
                        onChange={getValue}
                        name="itemExpDate"
                        min="2022-11-01"
                        max="2050-12-31"
                        value={itemInfo.itemExpDate}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>가격</th>
                    <td>
                      <input
                        type="number"
                        className="item_write_title"
                        placeholder="가격을 입력해주세요"
                        onChange={getValue}
                        name="itemPrice"
                        value={itemInfo.itemPrice}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>제조사</th>
                    <td>
                      <input
                        type="text"
                        className="item_write_title"
                        placeholder="제조사를 입력해주세요"
                        onChange={getValue}
                        name="itemMaker"
                        value={itemInfo.itemMaker}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>제품썸네일</th>
                    <td>
                      <input
                        type="file"
                        name="itemThumb"
                        onInput={saveThumb}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>제품메인이미지</th>
                    <td>
                      <input
                        type="file"
                        name="itemDetailImg"
                        onInput={saveDetailImg}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          <div className="item_write_btn_box">
            <button className="serviceqna_btn" onClick={onFileUpload}>
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminItemUpdate;
