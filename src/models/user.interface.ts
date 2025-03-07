import type { IAddress } from "./address.interface"
import type { IBankingDetails } from "./bankingDetails.interface"
import type { ISchoolDetails } from "./schoolDetails.interface"
import type { ITransaction } from "./transaction.interface"

export interface IUser {
  id?: number
  firstName: string,
  lastName?: string,
  birthDate?: Date,
  isActive: boolean,
  phone?: string,
  email: string,
  password: string,
  addresses?: IAddress[]
  transactions?: ITransaction[]
  schoolDetails?: ISchoolDetails[]
  bankingDetails?: IBankingDetails[]
}
