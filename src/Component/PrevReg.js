import { Link } from 'react-router-dom';
import './css/prevreg.css';
import './css/reset.css';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

function PrevReg() {


    return (
        <>
            <div className="firstRegContainer">
                <Link to="/secondReg" className="spmRegister">
                    <div className="firstRegBoxOne">
                        쇼핑몰 회원가입
                    </div>
                </Link>
                <hr />
                <Link to="/toFacebookRegister" className="faceBookRegister">    
                    <div className="firstRegBoxTwo">
                        <div className="facebookReg"><img className="facebookLogo" alt="facebookLogo" src="img/facebookLogo.png"></img></div>
                        페이스북 아이디 회원가입
                    </div>
                </Link>

                <Link to="/toNaverRegister" className="naverRegister">
                <div className="firstRegBoxThree">
                    <div className="naverReg"><img className="naverLogo" alt="naverLogo" src="img/naverLogo.jpg"></img></div>
                    네이버 아이디 회원가입
                </div>
                </Link>

                <Link to="/toKktRegister" className="kktRegister">
                <div className="firstRegBoxFour">
                    <div className="kktReg"><img className="kktLogo" alt="kktLogo" src="img/kktLogo.jpg"></img></div>
                    카카오 아이디 회원가입
                </div>
                </Link>
                <div className="underInfo">               
                <p><AiOutlineExclamationCircle/>&nbsp;SNS계정을 연동하여 빠르고 쉽고 안전하게 회원가입 할 수 있습니다.<br/>
                &nbsp; &nbsp; 이 과정에서 고객님의 데이터는 철저하게 보호됩니다.</p>
                </div>
            </div>


        </>

    )
}

export default PrevReg;