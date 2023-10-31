import { User } from "@prisma/client";

export class UserResponseDTO {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;

  static create(user: User) {
    return {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
}