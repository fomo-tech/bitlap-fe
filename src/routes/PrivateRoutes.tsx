import { Navigate } from "react-router-dom";
import { useAuthApp } from "store/useAuthApp";

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  const { logged } = useAuthApp()
  return logged ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
