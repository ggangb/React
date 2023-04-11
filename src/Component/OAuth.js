
    const CLIENT_ID = "98acc9e0b294dd377bd227daa14666f9";
    const REDIRECT_URI = "http://localhost:8080/user/kakao/callback";


export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;