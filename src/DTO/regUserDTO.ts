import { IsEmail, IsString } from "class-validator";


export class RegUserDTO {
  name: string
  email: string
  password: string
}