import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda"

export interface ICreateOTP {
  email: string
}

export interface IVerifyOTP {
  email: string
  otp: string
}
