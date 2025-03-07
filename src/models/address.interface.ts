import type { IUser } from "./user.interface"


enum EProvince {
  "QC",
  //  ici on doit metre les autres provinces ??
}

enum ECountry {
  "CA",

  //  ici on doit metre les autres pays ??


}

export interface IAddress {
  id?: number
  type: string
  streetNumber: string
  streetName: string
  city: string
  province: EProvince
  country: ECountry
  user: IUser
}
