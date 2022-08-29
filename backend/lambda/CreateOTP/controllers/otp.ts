import { APIGatewayProxyEvent } from "aws-lambda"
import SenseLogs from "senselogs"

import Messages from "/opt/nodejs/messages/messages"
import DB from "/opt/nodejs/aws/db/DB"
import SES from "/opt/nodejs/aws/ses/ses"
import conditions from "/opt/nodejs/aws/db/conditions/conditions"
import { ICreateOTP } from "/opt/nodejs/interface/controllers"
import generateOTP from "/opt/nodejs/helpers/generateOTP"

const log = new SenseLogs()

const controller = {
  create: async (event: APIGatewayProxyEvent) => {
    try {
      if (event.body === null) return Messages.error(404, "Body Empty")
      const body = JSON.parse(event.body) as ICreateOTP
      const hasEmail = await DB.get(
        "OTP",
        conditions.equal({
          filter: "email",
          eq: body.email
        })
      )
      if (!hasEmail) {
        const codeOTP = generateOTP()
        await DB.create("OTP", {
          email: body.email,
          otp: codeOTP
        })
        await SES.sendEmail(body.email, codeOTP)
        log.info("Create OTP and Send Email")
      } else {
        await SES.sendEmail(body.email, hasEmail.otp)
        log.info("Get OTP and Send Email")
      }
      return Messages.success("true")
    } catch (error: any) {
      log.error(error)
      return Messages.error(500, JSON.stringify(error))
    }
  }
}

export default controller
