import { IsEmail, IsString } from "class-validator";


export class LoginDTO {
  email: string
  password: string
}