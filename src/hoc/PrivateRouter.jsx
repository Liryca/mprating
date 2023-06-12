import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {

    const { auth } = useSelector((state) => state);

    if (auth.isAuth) {
         return children
    }
      return <Navigate to={"/"} />;
   
}
export default PrivateRoute;
