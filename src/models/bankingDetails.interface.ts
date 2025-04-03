import type { IUser } from "./user.interface"

export interface IBankingDetails {
id?: number
institutionName:string
accountInfo: string //Correction typo accountinfo
loanInfo?: string //Correction typo loaninfo
other?: string
user: IUser
}
