import type { IUser } from "./user.interface"

export enum EAddressType {
  "PERSONAL",
  "WORK",

}

export enum EProvince {
  "QC",
  "ON",
  "BC",
  "AB",
  "MB",
  "SK",
  "NS",
  "NB",
  "NL",
  "PE",
  "NT",
  "NU",
  "YT"
}

export enum ECountry {
  "CA",


}

export interface IAddress {
  id?: number
  type: EAddressType
  streetNumber: string
  streetName: string
  city: string
  province: EProvince
  country: ECountry
  user: IUser
}
