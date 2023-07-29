import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRouter({ children }) {

  const auth = useSelector(state => state.auth);
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/main';


  if (auth.isAuth) {
    return <Navigate to={fromPage} state={{ from: location }} />
  } else {
    return children;
  }

}

export default PublicRouter;
