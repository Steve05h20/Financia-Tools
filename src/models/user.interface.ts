import type { IAddress } from "./address.interface"
import type { IBankingDetails } from "./bankingDetails.interface"
import type { ISchoolDetails } from "./schoolDetails.interface"
import type { ITransaction } from "./transaction.interface"

export interface IUser {
  id?: number | undefined
  firstName: string,
  lastName?: string | undefined,
  birthDate?: Date | string | undefined,
  isActive: boolean,
  phone?: string | undefined,
  email: string,
  password: string,
  addresses?: IAddress[]
  transactions?: ITransaction[]
  schoolDetails?: ISchoolDetails[]
  bankingDetails?: IBankingDetails[]
}
