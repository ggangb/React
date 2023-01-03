import '../CSS/MyPageResearch.css';
import { Link } from 'react-router-dom';
import researchbanner from '../Img/research_banner.jpg';
import { alignPropType } from 'react-bootstrap/esm/types';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function MyPageResearch() {

    const [datas, setDatas] = useState([]);
    const [checkedIdx, setCheckedIdx] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/mypage/myresearch')
            .then(response => {
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleCheck = (e) => {
        const idx = e.target.value;

        if (checkedIdx.includes(idx)) {
            setCheckedIdx(checkedIdx.filter(item => item !== idx));
        } else {
            setCheckedIdx([...checkedIdx, idx]);
        }
    }


    const handlerClickDelete = () => {
        checkedIdx.map(idx => {
            axios.delete(`http://localhost:8080/mypage/result/${idx}`)
                .then(response => {
                    if (response.status === 200) {
                        alert("정상적으로 삭제되었습니다.");
                        window.location.reload();
                    } else {
                        alert("삭제에 실패했습니다.");
                        return;
                    }
                })
                .catch(error => console.log(error));
        })
    }


    const email = sessionStorage.getItem('email');
    const filteredDatas = datas.filter(data => data.memEmail === email);

    return (
        <>
            <div className="mypageresearch_main">
                <div className='mypageresearch_title_wrap'>
                    <h2>나의설문</h2>

                </div>
                <div className='mypageresearch_subtitle'>
                    <img src={researchbanner} />
                    <div className="mypageresearch_list">
                        <table>
                            <thead>
                                <tr>
                                    <th width="15%">선택</th>
                                    <th width="65%">설문자</th>
                                    <th width='20%'>저장날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredDatas && filteredDatas.map(result => (
                                        <tr key={result.resultIdx} >
                                            <td><input type='checkbox' onChange={handleCheck} value={result.resultIdx}></input></td>
                                            <td id='MyPageResearchDetail' > <Link to={`../result/${result.resultIdx}`}>{result.resultUser}</Link></td>
                                            <td>{result.resultDate}</td>
                                        </tr>
                                    ))
                                }
                                {
                                    datas.length === 0 && (
                                        <tr>
                                            <td colSpan="4">일치하는 데이터가 없습니다.</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='mypageresearch_btn'>
                        <button className='mypageresearch_btn_del' onClick={handlerClickDelete}>삭제</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageResearch;