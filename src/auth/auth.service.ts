import { Injectable } from "@nestjs/common";
import { SignUpRequestDTO } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp(dto: SignUpRequestDTO) {
    console.log({ dto })
  }

  signIn() {
    return 'Sign In'
  }
}