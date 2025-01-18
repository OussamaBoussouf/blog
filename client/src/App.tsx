import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import { UserContextProvider } from "./context/userContext";
import Unauthorized from "./pages/Unauthorized";
import Loading from "./components/Loading";

const EditBlog = lazy(() => import("./pages/EditBlog"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const SingleBlog = lazy(() => import("./pages/SingleBlog"));

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} index />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <SingleBlog />
              </Suspense>
            }
            path="/blog/:id"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Unauthorized />} path="/unauthorized" />
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <CreateBlog />
                </Suspense>
              }
              path="/create-blog"
            />
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <EditBlog />
                </Suspense>
              }
              path="/edit/:id"
            />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
