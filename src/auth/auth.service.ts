import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SignInRequestDTO, SignUpRequestDTO, UserResponseDTO } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: SignUpRequestDTO) {
    try {
      await this.prisma.user.create({
        data:{
          email: dto.email,
          password: await argon.hash(dto.password)
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code == 'P2002') {
        throw new ForbiddenException('Email is already taken');
      }

      throw error;
    }
  }

  async signIn(dto: SignInRequestDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    if (!await argon.verify(user.password, dto.password)) {
      throw new UnauthorizedException('Incorrect password');
    }

    return UserResponseDTO.create(user);
  }
}