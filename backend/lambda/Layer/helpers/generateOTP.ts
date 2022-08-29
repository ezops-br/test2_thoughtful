import { randomBytes } from "crypto"

export default function generateId() {
  return randomBytes(12).toString("hex")
}
