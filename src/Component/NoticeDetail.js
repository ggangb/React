import '../CSS/NoticeDetail.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


function NoticeDetail() {
    let { noticeIdx } = useParams();
    const [data, setData] = useState([]);

    useEffect(()=> {
        axios(`http://localhost:8080/notice/${noticeIdx}`)
        .then((response)=> {
            setData(response.data)
        }) .catch((error) => {
            console.log(error);
          });
        }
    )

    return (
        <>
            <div id="noticedetail_container">
                <div id="noticedetail_contents">
                    <div className="noticedetail_main_contents">
                        <div className="noticedetail_side_cont">
                            <div className="noticedetail_side_box">
                                <h2>고객센터</h2>
                                <ul className="noticedetail_side_menu">
                                    <Link to="/service/center"><li>FAQ</li></Link>
                                    <Link to="/service/notice"><li>공지사항</li></Link>
                                    <Link to="/service/serviceqna"><li>1:1문의</li></Link>
                                </ul>
                            </div>
                        </div>
                        <div className="noticedetail_main_cont">
                            <div className="noticedetail_board_sec">
                                <div className="noticedetail_board_title">
                                    <h3>공지사항</h3>
                                </div>
                                <div className='noticedetail_view_title'>
                                    <h3>{data.noticeTitle}</h3>
                                </div>
                                <div className='noticedetail_view_info'>
                                    <span className='noticedetail_writer'>관리자</span>
                                    <span className='noticedetail_date'>{data.noticeWriteDate}</span>
                                </div>
                                <div className='noticedetail_view_content'>
                                    <textaarea>{data.noticeContents}</textaarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NoticeDetail;