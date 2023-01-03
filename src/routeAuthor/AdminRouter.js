import { Navigate } from "react-router-dom"

const AdminRouter = ({ children }) => {
    
    const admin = sessionStorage.getItem("role")

    if (admin!=='ROLE_ADMIN') {
        alert("관리자만 접근 가능한 페이지입니다.")
        return <Navigate to="/" />
    } else {
        return children
    }

}

export default AdminRouter;