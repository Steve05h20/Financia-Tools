import type { IUser } from "./user.interface"

export enum EAddressType {
  PERSONAL = 'PERSONAL',
  WORK = 'WORK',
}

export enum EProvince {
  QUEBEC = "QC",
  ONTARIO = "ON",
  BRITISH_COLUMBIA = "BC",
  ALBERTA = "AB",
  MANITOBA = "MB",
  SASKATCHEWAN = "SK",
  NOVA_SCOTIA = "NS",
  NEW_BRUNSWICK = "NB",
  NEWFOUNDLAND_LABRADOR = "NL",
  PRINCE_EDWARD_ISLAND = "PE",
  NORTHWEST_TERRITORIES = "NT",
  NUNAVUT = "NU",
  YUKON = "YT"
}

export enum ECountry {
  CANADA = "CA",
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
