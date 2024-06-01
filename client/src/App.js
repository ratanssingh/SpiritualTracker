import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import UserForm from "./components/user/UserForm";
import SubmittedForm from "./components/user/SubmittedForm";
import AdminRegister from "./components/admin/AdminRegister";
import AdminLogin from "./components/admin/AdminLogin";
import Panel from "./components/admin/Panel";
import UserFormDetails from "./components/admin/UserFormDetails";
import ForgotPass from "./components/ForgotPass";
import AdminForgPass from "./components/admin/AdminForgPass";
import EditUser from "./components/admin/EditUser";
import Notes from "./components/admin/Notes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/forgot-password" element={<ForgotPass />} />
        <Route path="/" element={<UserForm />} />
        <Route path="/form_submitted" element={<SubmittedForm />} />
        <Route path="/ngo/admin/reg" element={<AdminRegister />} />
        <Route path="/ngo/admin/login" element={<AdminLogin />} />
        <Route path="/ngo/admin/forgot-password" element={<AdminForgPass />} />
        <Route path="/adminpanel" element={<Panel />} />
        <Route path="/details/user/:id" element={<UserFormDetails />} />
        <Route path="/edit/user/detail/:id" element={<EditUser />} />
        <Route path="/write-notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
