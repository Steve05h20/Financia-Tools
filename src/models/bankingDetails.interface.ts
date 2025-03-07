import type { IUser } from "./user.interface"

export interface IBankingDetails {
id?: number
institutionName:string
accountinfo: string
loaninfo?: string
other?: string
user: IUser
}
