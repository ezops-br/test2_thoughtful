import { useState, FormEvent, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import toastConfig from "../helpers/toastConfig"
import InputLogin from "../components/InputLogin/InputLogin"
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit"
import Auth from "../helpers/Auth"

interface IState {
  email: string
}

export default function CheckOTP() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")

  useEffect(() => {
    const state = location.state as IState
    if (!state.email) {
      toast.warning(
        "Hmmm, it seems that you are on the wrong track.",
        toastConfig.warning()
      )
      navigate("/login")
    } else {
      setEmail(state.email)
    }
  }, [])

  const handleCheckOTP = async (event: FormEvent) => {
    event.preventDefault()

    try {
      await toast.promise(
        Auth.checkOTP(email, otp),
        {
          pending: "SignIn...",
          success: "SignIn Success!",
          error: {
            render: (err: any) => `Hmmm, wrong OTP code.`
          }
        },
        toastConfig.promises()
      )
      localStorage.setItem("isLogin", "true")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <form onSubmit={handleCheckOTP}>
              <InputLogin
                type="text"
                placeholder="OTP"
                handleFunction={setOTP}
              />
              <div className="mt-6">
                <ButtonSubmit text="Sign in" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
