import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import SingleBlog from "./pages/SingleBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContextProvider } from "./context/userContext";
import EditBlog from "./pages/EditBlog";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} index />
          <Route element={<SingleBlog />} path="/blog/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Unauthorized />} path="/unauthorized" />
          <Route element={<ProtectedRoute />}>
            <Route element={<CreateBlog />} path="/create-blog" />
            <Route element={<EditBlog />} path="/edit/:id" />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
