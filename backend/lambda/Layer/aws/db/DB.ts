import SenseLogs from "senselogs"

import { Condition } from "dynamoose/dist/Condition"

import { IChoice } from "../../interface/db"
import { DBOTP } from "./model/model"

const dbChoice = {
  OTP: DBOTP
}

const log = new SenseLogs()

const controllerDB = {
  get: async (choice: IChoice, condition: Condition) => {
    const db = dbChoice[choice]
    try {
      const data = (await db.query(condition).exec()).toJSON()
      if (!data || data.length === 0) return false
      log.info(`I take the data from the ${choice} filter`)
      return data[0]
    } catch (error: any) {
      log.error(error)
      return false
    }
  },

  create: async (choice: IChoice, data: any) => {
    const db = dbChoice[choice]
    try {
      await db.create(data)
      log.info(`Created in ${choice}`)
      return true
    } catch (error: any) {
      log.error(error)
      return false
    }
  },

  delete: async (choice: IChoice, filter: any) => {
    const db = dbChoice[choice]
    try {
      await db.delete(filter)
      log.info(`Deleted in the ${choice} with the ${filter} condition`)
      return true
    } catch (error: any) {
      log.error(error)
      return false
    }
  }
}

export default controllerDB
