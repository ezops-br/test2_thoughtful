import axios from "axios"

export interface IFunType {
  [name: string]: Function
}

async function api(url: string, type: string, data: any) {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  const funType: IFunType = {
    async post() {
      try {
        const result = await api.post(url, data)
        return result.data
      } catch (error) {
        throw error
      }
    }
  }
  const result = await funType[type]()
  return result
}

export default api
