import { Navigate, Route, Routes } from "react-router-dom";
import { GuardedRoute } from "../../guards/GuaardedRoute";
import { useStore } from "../../context/ContextProvider";
import TemporaryDrawer from "../layout/appLayout";

export const AppRoutes = () => {
  const { auth } = useStore();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuardedRoute auth={auth}>
            <TemporaryDrawer />
          </GuardedRoute>
        }
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
