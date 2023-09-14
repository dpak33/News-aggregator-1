import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const user = useSelector(state => state.user);

    if (user && user.userId) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;