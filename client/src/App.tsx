
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import SingleBlog from "./pages/SingleBlog"
import Login from "./pages/Login"
import Register from "./pages/Register"


function App() {

  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route element={<Home/>} path="/"/>
            <Route element={<SingleBlog/>} path="/1"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
        </Route>
    </Routes>
  )
}

export default App
