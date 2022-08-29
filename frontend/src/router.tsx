import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/login"
import CheckOTP from "./pages/checkOTP"

import ProtectedRoute from "./helpers/ProtectedRoute"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route path="/checkOTP" element={<CheckOTP />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default Router
