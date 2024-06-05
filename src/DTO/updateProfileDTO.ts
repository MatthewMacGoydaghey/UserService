import { IsMimeType } from "@nestjs/class-validator"
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator"

export class UpdProfileDTO {
  @IsOptional()
  @IsString()
  surname: string
  @IsOptional()
  @IsEmail()
  email: string
  @IsOptional()
  @IsString()
  gender: "male" | "female"
  @IsOptional()
  @IsString()
  photo: string
  @IsOptional()
  @IsString()
  user: string
}


