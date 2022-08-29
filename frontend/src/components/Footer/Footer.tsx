import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import toastConfig from "../../helpers/toastConfig"

export default function Footer() {
  const navigate = useNavigate()
  async function logout() {
    localStorage.removeItem("isLogin")
    toast.success("Logout!", toastConfig.success())
    navigate("/login")
  }
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          Copyright © 2022 - All right reserved by Gabriel Dutra/Ezops.Cloud
        </p>
        <button className="btn btn-error btn-xs" onClick={logout}>
          Logout
        </button>
      </div>
    </footer>
  )
}
