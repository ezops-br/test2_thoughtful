import { model } from "dynamoose"
import OTP from "../schemas/OTP"

const DBOTP = model(process.env.TABLE_NAME, OTP)

export { DBOTP }
