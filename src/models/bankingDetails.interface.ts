import type { IUser } from "./user.interface"

export interface IBankingDetails {
id?: number
institutionName:string
accountInfo: string //Correction typo accountinfo
loaninfo?: string
other?: string
user: IUser
}
