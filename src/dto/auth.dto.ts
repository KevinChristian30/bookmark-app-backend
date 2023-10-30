import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpRequestDTO  {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}