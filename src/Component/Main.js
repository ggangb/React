import "../CSS/Main.css";
import Banner from "./Banner";
import Items from "./Items";
import Items2 from "./Items2";

function Main() {
  return (
    <>
      <Banner />
      <div id="main">
        <div className="main_wrap">
          <div className="main_items_wrap">
            <div className="main_items_title">판매량 BEST🏆</div>
            <Items />
            <div className="main_items_title">신상품😘</div>
            <Items2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
