import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

import DashboardRoutes from "./routes/DashboardRoutes";
import PublicRoutes from "./routes/PublicRoutes";

export default function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <AppHeader />}

      <main>
        <Routes>
          {DashboardRoutes()}
          {PublicRoutes()}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      {!hideLayout && <ScrollToTopButton />}
    </>
  );
}
