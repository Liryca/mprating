import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
     const location = useLocation()
     const auth  = useSelector(state => state.auth);


     if (!auth.isAuth) {
          return <Navigate to={"/"} state={{ from: location }} />;
     }
     return children;


}
export default PrivateRoute;
