import { IsEmail, IsString } from "class-validator";


export class RegUserDTO {
  @IsString()
  name: string
  @IsEmail()
  email: string
  @IsString()
  password: string
}