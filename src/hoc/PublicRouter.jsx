import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRouter({ children }) {

  const { auth } = useSelector((state) => state);
  console.log(auth)

  if (auth.isAuth) {
    return <Navigate to={"/main"} />;
  }
  return children;
}

export default PublicRouter;
