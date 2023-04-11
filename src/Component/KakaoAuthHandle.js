import axios from "axios"
import { useEffect } from "react"



const KakaoAuthHandle = (props) => {
    useEffect(()=> {
        let code = new URL(window.location.href).searchParams.get('code')

        const kakaoLogin = async () => {
            await axios
                .get(`http://localhost:8080/user/kakao/callback?code=${code}`)
                .then((res) => {
                    localStorage.seteItem('token', res.headers.authorization)
                    window.location.href = "/";
                })
        }
        kakaoLogin()
    }, [props.history])


return (
    <></>
)
}

export default KakaoAuthHandle;