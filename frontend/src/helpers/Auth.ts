import api from "./api"

const Auth = {
  signIn: async (email: string) => {
    return await api("otp/create", "post", {
      email
    })
  },
  checkOTP: async (email: string, otp: string) => {
    return await api("otp/verify", "post", {
      email,
      otp
    })
  }
}

export default Auth
