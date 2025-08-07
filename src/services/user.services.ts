// src/services/AuthService.ts
import { PostgresDataSource } from "../config/database";
import { User } from "../models/user";
import { encrypt } from "../helpers/encrypt";
import { UserSignupDTO, UserAddDTO } from "../dto/user.dto";
// import { Address } from "../models/Address";
// import { AddressDTO } from "../dto/address.dto";
import { plainToClass } from "class-transformer";
import { sendUserMail } from "../utils/mailer";

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
    user.invited_by = userDto.invited_by;

    const savedUser = await userRepository.save(user);

    return savedUser;
  }

  static async invite(userDto: UserAddDTO, userID:string) {
    // const existingUser = await userRepository.findOne({
    //   where: { email: userDto.email },
    // });
    //  if (existingUser) {
    //   return false;
    // }

    // const existingAdmin = await userRepository.findOne({
    //   where: [
    //     { email: userDto.from_email },
     
    //   ],
    // });

    // console.log(
    //   "existingAdmin",
    //   existingAdmin,
    //   existingAdmin.role === "admin",
    //   existingAdmin.id
    // );
   
    // if (existingAdmin && existingAdmin.role === "admin") {
    //   const user = new User();
    //   const hashedPassword = await encrypt.encryptpass(userDto.password);
    //   const currentPassword= userDto.password;
    //   console.log("currentPassword",currentPassword);
    //   user.name = userDto.name;
    //   user.email = userDto.email;
    //   user.password_hash = hashedPassword;
    //   user.role = userDto.role;
    //   user.invited_by = existingAdmin.id;

    //   const savedUser = await userRepository.save(user);
    //   const from: string = existingAdmin.email;
    //   const to: string = user.email;
    //   const subject: string = `You are invited to TodoBuddy`;
    //   const mailTemplate: string = `<html>
    //   <p>name :${ user.name}</p>
    //   <p>email :${ user.email}</p>
    //   <p>password :${currentPassword}</p>
    //   </html>`

    //   sendUserMail( from, to, subject, mailTemplate);
    //   return savedUser;
    // }


    //------------------or--------------------------
 const existingUser1 = await userRepository.findOne({
      where: { email: userDto.email },
    });
   

    const existingAdmin1 = await userRepository.findOne({
      where: [
        { id: userID},
     
      ],
    });

     if (existingAdmin1 && existingAdmin1.role === "admin") {
      const user = new User();
      const hashedPassword = await encrypt.encryptpass(userDto.password);
      const currentPassword= userDto.password;
      user.name = userDto.name;
      user.email = userDto.email;
      user.password_hash = hashedPassword;
      user.role = userDto.role;
      user.invited_by = existingAdmin1.id;

      const savedUser = await userRepository.save(user);
      const from: string = existingAdmin1.email;
      const to: string = user.email;
      const subject: string = `You are invited to TodoBuddy`;
      const mailTemplate: string = `<html>
      <p>name :${ user.name}</p>
      <p>email :${ user.email}</p>
      <p>password :${currentPassword}</p>
      </html>`

      sendUserMail( from, to, subject, mailTemplate);
      return savedUser;
    }
    return false;
  }

  static async getAllUsers() {
  
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
