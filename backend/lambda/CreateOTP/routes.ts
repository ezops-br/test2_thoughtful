import otp from "./controllers/otp"

interface Routes {
  [route: string]: Function
}

export default (path: string): Function => {
  const routes: Routes = {
    "/otp/create": otp.create
  }
  return routes[path]
}
