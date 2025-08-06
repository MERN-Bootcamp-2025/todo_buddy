// src/services/AuthService.ts
import { PostgresDataSource } from "../config/database";
import { User } from "../models/user";
import { encrypt } from "../helpers/encrypt";
import { UserSignupDTO } from "../dto/user.dto";
// import { Address } from "../models/Address";
// import { AddressDTO } from "../dto/address.dto";
import { plainToClass } from "class-transformer";

const userRepository = PostgresDataSource.getRepository(User);
// const addressRepository = PostgresDataSource.getRepository(Address);

export class UserService {
  static async login(email: string, password_input: string) {
    //find user
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    //compair password
    const isPasswordValid = encrypt.comparepassword(
      user.password_hash,
      password_input
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload = { userId: user.id };

    const accessToken = encrypt.generateToken(payload);
    const userId = user.id;
    return { userId, accessToken, user };
  }

  static async signup(userDto: UserSignupDTO) {
    const existingUser = await userRepository.findOne({
      where: { email: userDto.email },
    });

    if (existingUser) {
      return false;
    }

    const user = new User();
    const hashedPassword = await encrypt.encryptpass(userDto.password);
    user.name = userDto.name;
    user.email = userDto.email;
    user.password_hash = hashedPassword;
    user.role = userDto.role;
  
    // user.provider_status = userDto.provider_status;

    const savedUser = await userRepository.save(user);


    return savedUser;
  }

  static async getAllUsers() {
    console.log("dklfdnf ffhjjf");
    return await userRepository.find();
  }
  static async getUserById(id: string) {
    return await userRepository.findOne({
      where: { id },
    });
  }
    static async getUsers() {
    return await userRepository.find();
  }
}
