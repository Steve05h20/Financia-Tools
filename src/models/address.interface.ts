import type { IUser } from "./user.interface"

enum EAddressType {
  "PERSONAL",
  "WORK",

}

enum EProvince {
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

enum ECountry {
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
