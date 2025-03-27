import type { IUser } from "./user.interface"

export enum EFieldOfStudy {
  INFORMATIQUE = 'Informatique',
  INGENIERIE = 'Ingénerie',
  SANTE = 'Santé',
  DROIT = 'Droit',
  SCIENCES = 'Sciences',
  SCIENCES_SOCIALES = 'Sciences sociales',
  ARTS = 'Arts et design',
  EDUCATION = 'Éducation',
  COMMUNICATION = 'Communication'
}

export interface ISchoolDetails {
  id?: number
  schoolName: string
  fieldOfStudy: string
  startDate: Date
  projectedEndDate?: Date
  user:IUser
}
