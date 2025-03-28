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

export const fieldOfStudyDisplayNames = {
  [EFieldOfStudy.INFORMATIQUE]: 'Informatique',
  [EFieldOfStudy.INGENIERIE]: 'Ingénerie',
  [EFieldOfStudy.SANTE]: 'Santé',
  [EFieldOfStudy.DROIT]: 'Droit',
  [EFieldOfStudy.SCIENCES]: 'Sciences',
  [EFieldOfStudy.SCIENCES_SOCIALES]: 'Sciences sociales',
  [EFieldOfStudy.ARTS]: 'Arts et design',
  [EFieldOfStudy.EDUCATION]: 'Éducation',
  [EFieldOfStudy.COMMUNICATION]: 'Communication'
}

export interface ISchoolDetails {
  id?: number
  schoolName: string
  fieldOfStudy: string
  startDate: Date | string /* ajout string API date-string */
  projectedEndDate?: Date | string /* ajout string API date-string */
  user:IUser
}
