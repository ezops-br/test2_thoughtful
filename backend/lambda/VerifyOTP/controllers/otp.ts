import { APIGatewayProxyEvent } from "aws-lambda"
import SenseLogs from "senselogs"

import Messages from "/opt/nodejs/messages/messages"
import DB from "/opt/nodejs/aws/db/DB"
import conditions from "/opt/nodejs/aws/db/conditions/conditions"
import { IVerifyOTP } from "/opt/nodejs/interface/controllers"
import messages from "/opt/nodejs/messages/messages"

const log = new SenseLogs()

const controller = {
  verify: async (event: APIGatewayProxyEvent) => {
    try {
      if (event.body === null) return Messages.error(404, "Body Empty")
      const body = JSON.parse(event.body) as IVerifyOTP
      const hasEmail = await DB.get(
        "OTP",
        conditions.equal({
          filter: "email",
          eq: body.email
        })
      )
      console.log(hasEmail)
      if (!hasEmail) {
        return Messages.error(404, "Not Found email")
      }
      if (hasEmail.otp === body.otp) {
        await DB.delete("OTP", { email: body.email })
        return Messages.success("true")
      } else {
        return messages.error(401, "The otp-code is not the same.")
      }
    } catch (error: any) {
      log.error(error)
      return Messages.error(500, error)
    }
  }
}

export default controller
