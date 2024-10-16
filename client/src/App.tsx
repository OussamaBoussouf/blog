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

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} index />
          <Route element={<SingleBlog />} path="/blog/:id" />
          <Route element={<EditBlog />} path="/edit/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
            path="/create-blog"
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
