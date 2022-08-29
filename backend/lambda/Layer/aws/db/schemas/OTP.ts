import { Schema } from "dynamoose"

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  }
})

export default OTPSchema
