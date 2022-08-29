import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({ Component }: { Component: React.FC }) {
  const navigate = useNavigate()
  useEffect(() => {
    async function checkAuthState() {
      try {
        if (
          !localStorage.getItem("isLogin") ||
          localStorage.getItem("isLogin") === "false"
        ) {
          navigate("/login")
        }
      } catch (err) {
        navigate("/login")
      }
    }
    checkAuthState()
  })
  return <Component />
}
