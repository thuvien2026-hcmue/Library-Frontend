import DashNav from "./Dashboard/DashNav";
import Header from "./Header";

export default function AppHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* ADMIN BAR */}
      {user && <DashNav />}

      {/* PUBLIC HEADER */}
      <Header />
    </>
  );
}
