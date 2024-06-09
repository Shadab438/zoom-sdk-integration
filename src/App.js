import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./components/DashboardLayout/dashboard";
import UserDashboard from "./components/userDashboard/userDashboard";
import SignIn from "./components/SignIn/sign-in";
import SignUp from "./components/SignUp/sign-up";
import { ProtectedRoute } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/" element={<Dashboard />} />

        <Route path="/sign-in" element={<SignIn />} exact />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
