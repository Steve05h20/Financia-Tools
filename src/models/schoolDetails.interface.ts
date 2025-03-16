import type { IUser } from "./user.interface"

export enum EFieldOfStudy {
  INFORMATIQUE = 'informatique',
  INGENIERIE = 'ingenerie',
  SANTE = 'sante',
  DROIT = 'droit',
  SCIENCES = 'sciences',
  SCIENCES_SOCIALES = 'sciencesSociales',
  ARTS = 'arts',
  EDUCATION = 'education',
  COMMUNICATION = 'communication'
}

export interface ISchoolDetails {
  id?: number
  schoolName: string
  fieldOfStudy: string
  startDate: Date
  projectedEndDate?: Date
  user:IUser
}
