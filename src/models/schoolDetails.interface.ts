import type { IUser } from "./user.interface"

export interface ISchoolDetails {
  id?: number
  schoolName: string
  fieldOfStudy: string
  startDate: Date
  projectedEndDate?: Date
  user:IUser
}
