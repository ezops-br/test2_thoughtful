import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import toastConfig from "../helpers/toastConfig"
import InputLogin from "../components/InputLogin/InputLogin"
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit"
import Auth from "../helpers/Auth"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
      await toast.promise(
        Auth.signIn(email),
        {
          pending: "SignIn...",
          success: "Redirect OTP...",
          error: {
            render: (err: any) => `This just happened: ${err.data.message}`
          }
        },
        toastConfig.promises()
      )
      navigate("/checkOTP", {
        state: {
          email
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <form onSubmit={handleLogin}>
              <InputLogin
                type="email"
                placeholder="E-mail"
                handleFunction={setEmail}
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
