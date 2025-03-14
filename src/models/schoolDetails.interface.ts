import type { IUser } from "./user.interface"

export enum EFieldOfStudy {
  'informatique',
  'ingenerie',
  'sante',
  'droit',
  'sciences',
  'sciencesSociales',
  'arts',
  'education',
  'communication'
}

export interface ISchoolDetails {
  id?: number
  schoolName: string
  fieldOfStudy: string
  startDate: Date
  projectedEndDate?: Date
  user:IUser
}
