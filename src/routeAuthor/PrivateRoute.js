import { useNavigate, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => { 
  const isLogin = !!sessionStorage.getItem("token");

if (isLogin) 
    return children;
  else {
    alert("로그인 후 이용해 주세요.");
    return <Navigate to="/login"/>;
  }
};

export default PrivateRoute;