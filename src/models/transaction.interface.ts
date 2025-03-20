import type { IUser } from "./user.interface"

export enum EFrequency {
  Daily = 1,
  Weekly = 7,
  BiWeekly = 14,
  Monthly = 30,
  Unlimited = -1
}

export enum EType {
  REVENUE = "Revenue",
  EXPENSE = "Expense"
}

export interface ITransaction {
  id?: number
  description?: string
  category?: string
  isDone: boolean
  type: EType
  amount: number
  startDate: Date
  endDate?: Date
  frequency: EFrequency
  user: IUser
}


