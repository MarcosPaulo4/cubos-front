import { api } from "./client"

export const UserAPI = {
  create: async (name: string, email: string, password: string) => {
    const res = await api.post("/users", { name, email, password })
    return res.data.user
  }
}