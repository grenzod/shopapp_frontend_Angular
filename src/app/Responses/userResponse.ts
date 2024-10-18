import { Role } from "../Models/role"

export interface UserResponse {
    id: number
    address: string
    active: boolean
    fullname: string
    date_of_birth: Date
    phone_number: string
    facebook_account_id: number
    google_account_id: number
    role: Role
}