import Item from "./Component/Item";
import Main from "./Component/Main";
import Topbutton from "./Topbutton";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Intro from "./survey/Intro";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPage from "./Component/MyPage";
import ServiceCenter from "./Component/ServiceCenter";
import Notice from "./Component/Notice";
import NoticeDetail from "./Component/NoticeDetail";
import ScrollToTop from "./ScrollToTop";
import MyCart from "./Component/MyCart";
import ItemList from "./Component/ItemList";
import ServiceQna from "./Component/ServiceQna";
import Step1 from "./survey/Step1";
import Survey from "./survey/Survey";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Agreement from "./Component/Agreement";
import Private from "./Component/Private";
import Company from "./Component/Compnay";
import FindAccount from "./Component/FindAccount";
import FindID from "./Component/FindID";
import FindPW from "./Component/FindPW";
import MyOrderList from "./Component/MyOrderList";
import MyRefund from "./Component/MyRefund";
import MyReview from "./Component/MyReview";
import MyPageResearch from "./Component/MyResearch";
import MyInfoUp1 from "./Component/MyInfoUp1";
import MyInfoUp2 from "./Component/MyInfoUp2";
import MyInfoDel1 from "./Component/MyInfoDel1";
import MyInfoDel2 from "./Component/MyInfoDel2";
import Service from "./Component/Service";
import Order from "./Component/Order";
import Result from "./Component/MyResearchDetail";
import AdminQna from "./Component/AdminQna";
import AdminMember from "./Component/AdminMember";
import AdminReview from "./Component/AdminReview";
import AdminRefund from "./Component/AdminRefund";
import AdminAuth from "./Component/AdminAuth";
import AdminMain from "./Component/AdminMain";
import AdminOrder from "./Component/AdminOrder";
import ReviewWrite from "./Component/ReviewWrite";
import MemberDetail from "./Component/MemberDetail";
import Member from "./Component/Member";
import PrivateRoute from "./routeAuthor/PrivateRoute";
import PublicRoute from "./routeAuthor/PublicRoute";
import QnaWrite from "./Component/QnaWrite";
import AdminItem from "./Component/AdminItem";
import AdminRouter from "./routeAuthor/AdminRouter";

function App() {
  const memIdx = sessionStorage.getItem("idx");

  return (
    <>
     
      <ScrollToTop />
      <Header />
      <div id="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/service/*"
            element={
                <Service />
            }
          >
            <Route path="center" element={<ServiceCenter />} />
            <Route path="serviceqna" element={<ServiceQna />} />
            <Route path="notice" element={<Notice />} />
            
          </Route>
          {/* <Route path="/servicecenter" element={<ServiceCenter />} /> */}
          <Route
            path="/mypage/*"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          >
            <Route
              path="myorderlist"
              element={<MyOrderList memIdx={memIdx} />}
            />
            <Route path="myrefund" element={<MyRefund memIdx={memIdx} />} />
            <Route path="mycart" element={<MyCart />} />
            <Route path="myreview" element={<MyReview memIdx={memIdx} />} />

            <Route path="myresearch" element={<MyPageResearch />} />
            <Route path="myinfo" element={<MyInfoUp1 memIdx={memIdx} />}/>
            {/* <Route path="modify" element={<MyInfoUp2 memIdx={memIdx} />} /> */}
            <Route path="myinfodel" element={<MyInfoDel1 memIdx={memIdx} />} />
            {/* <Route path="unregister" element={<MyInfoDel2 memIdx={memIdx} />} /> */}
            <Route path="result/:resultIdx" element={<Result />} />
          </Route>
          <Route path="/item/:itemNum" element={<Item />} />
          <Route path="/order" element={<Order />} />
          <Route path="/noticedetail/:noticeIdx" element={<NoticeDetail />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/join" element={<PublicRoute><Register/></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/private" element={<Private />} />
          <Route path="/company" element={<Company />} />
          <Route path="/findAccount" element={<PublicRoute><FindAccount /></PublicRoute>} />
          <Route path="/findid" element={<PublicRoute><FindID /></PublicRoute>} />
          <Route path="/findpw" element={<PublicRoute><FindPW memIdx={memIdx} /></PublicRoute>}/>
          {/* <Route path="/updatepw" element={<UpdatePW/>}/> */}
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/surveyStart" element={<Survey />} />
          {/* <Route path="/admin/auth/*" element={<AdminRouter><AdminAuth /></AdminRouter>} > */}
          <Route path="/admin/*" element={<AdminRouter><AdminMain /></AdminRouter>} >
            <Route path="member" element={<AdminMember />} />
            <Route path="review" element={<AdminReview />} />
            <Route path="refund" element={<AdminRefund />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="qna" element={<AdminQna />} />
            <Route path="item" element={<AdminItem />} />
          </Route>
          <Route path="/qnaWrite" element={<QnaWrite />} />
          <Route path="admin_mem" element={<Member />} />
        </Routes>
        
      </div>
      <Footer />
      {/* <Route path="/surveyStart" element={<Step1}><Survey /></Route>  */}
      <Topbutton></Topbutton>
    </>
  );
}

export default App;
