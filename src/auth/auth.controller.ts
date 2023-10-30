import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpRequestDTO } from "src/dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: SignUpRequestDTO) {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  signIn() {
    return this.authService.signIn();
  }
}