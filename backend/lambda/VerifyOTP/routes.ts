import otp from "./controllers/otp"

interface Routes {
  [route: string]: Function
}

export default (path: string): Function => {
  const routes: Routes = {
    "/otp/verify": otp.verify
  }
  return routes[path]
}
