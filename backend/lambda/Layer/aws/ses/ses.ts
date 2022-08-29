import SenseLogs from "senselogs"
import { SESV2 } from "aws-sdk"

const log = new SenseLogs()
const SES = new SESV2()

const controllerSES = {
  sendEmail: async (email: string, otp: string) => {
    try {
      const params = {
        Content: {
          Simple: {
            Body: {
              Text: {
                Data: `Code OTP: ${otp}`
              }
            },
            Subject: {
              Data: "Code OTP"
            }
          }
        },
        Destination: {
          ToAddresses: [email]
        },
        FromEmailAddress: "gabriel.dutra@ezops.com.br"
      }

      const data = await SES.sendEmail(params).promise()
      log.info(JSON.stringify(data))
      return true
    } catch (error: any) {
      log.error(error)
      return false
    }
  }
}

export default controllerSES
