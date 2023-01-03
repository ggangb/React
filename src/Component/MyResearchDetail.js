import '../CSS/MyResearchDetail.css';
import researchbanner from '../Img/research_banner.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Result from '../survey/api/resultApi.json';
import { Link, useParams } from 'react-router-dom'


function MyPageResearchDetail({  }) {

    const {resultIdx} = useParams();
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [showResultList, setShowResultList] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/mypage/result/${resultIdx}`)
            .then(response => {
                const d = response.data;
                setData(d);
                setName(d.resultUser);
                const organList = [
                    { '혈관': d.resultBlood }, 
                    { '장': d.resultDiges },
                    { '눈': d.resultEyes }, 
                    { '간': d.resultLiver }, 
                    { '몸': d.resultVitamin }
                ];
                setInitValue(organList);
            })
            .catch(error => console.log(error));
    }, []);

    const setInitValue = (organList) => {
        let list = [];
        organList.map(organ => {
            let key = Object.keys(organ)[0];
            let value = organ[key];
            list.push({ 'research_organ': key, 'value': value });
        });
    
        let resultList = [];
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < Result.length; j++) {
                if (list[i].research_organ === Result[j].research_organ) {
                    if (list[i].value === Result[j].score) {
                        resultList.push(Result[j]);
                    }
                }
            }
        }                
        setShowResultList(resultList);
    };



    return (
        <>
            <div className="mypageresearch_main">
                <div className="mypageresearch_main">
                    <div className='mypageresearch_title_wrap'>
                        <h2>나의설문</h2>

                    </div>

                    <div className='researchData'>
                        <div className="back1">
                            <div className="inside">
                                <h4>{name}님을 위한 추천 영양제</h4>
                                <div className="researchDate">
                                    설문 완료일 : {data.resultDate}
                                </div>
                                <div className="wrapResearch">
                                    <Swiper
                                        cssMode={true}
                                        navigation={true}
                                        pagination={true}
                                        mousewheel={false}
                                        keyboard={true}
                                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                        className="resultSwiper"
                                    >
                                      {showResultList.map((result, i) => (
                                <SwiperSlide key={i}>
                                    <div className="titleResult">
                                         {result.research_organ}
                                    </div>
                                    <div className="resultImg">
                                        <img src={`${result.src}`} />
                                    </div>
                                    <div className="priceSurvey">
                                     
                                        <Link to ={result.url}>상품 보러가기</Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                                    </Swiper>
                                </div>
                                <div className='reseachBack' id="MyResearch"><Link to="/mypage/myresearch">목록으로</Link></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </>
    );
}

export default MyPageResearchDetail;